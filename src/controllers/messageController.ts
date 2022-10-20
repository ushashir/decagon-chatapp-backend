import express,{Request,Response,NextFunction} from "express"
import { MessageInstance } from "../model/messageModel"
import {v4 as uuid} from 'uuid'
import { Op } from "sequelize"

export async function addMessage(
req:Request,
res:Response,
next:NextFunction) {
    
    
    try{ 
        const id = uuid()

       const user = await MessageInstance.create({ 
          id:id,
          message:req.body.message,
          from:req.body.from,
          to:req.body.to,
          sender:req.body.from,

        })
        
       return res.status(201).json({
           status:"true",
           msg:"You have successfully created a user",
           user
       })
    }catch(err){
        
       res.status(500).json({
        
        msg:'failed to add message',
        route:'/addMessage' 
       })
    }


}

// export async function getMessages(
//     req:Request,
// res:Response,
// next:NextFunction
// ) {
    
// }
export async function getMessages(req:Request, res:Response, next:NextFunction) {
    try{ 
        const {from,to } = req.body;
       const messages = await MessageInstance.findAll({
        where: {
            [Op.or]:[{[Op.and]:[{from: from},{to:to}]},
            {[Op.and]:[{to:from},{from:to}]}]
            // [Op.and]: [
            //     { from: from },
            //     { to: to }
            //   ]
            // from:from,
            // to:to

        // await MessageInstance.findAll({
        //   where: {
            
        //   }  
        // })
       },
         order:[['updatedAt','ASC']]
        })
        const projectedMessages = messages.map((msg:any) => {
            return {
              fromSelf: msg.sender.toString() === from,
              message: msg.message,
            };
          }) 
          res.json(projectedMessages);

  }catch(error){
   
     res.status(500).json({
        msg:"failed to read",
        route:"/getMessages"
     })
  }
  
  }