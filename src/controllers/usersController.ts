import express,{Request,Response,NextFunction} from "express"
import { UserInstance } from "../model/userModel"
import {v4 as uuid} from 'uuid'
import { registerSchema,options,loginSchema } from "../utils/utils"
import { Op } from "sequelize"
import bcrypt from 'bcrypt'
export async function register(
req:Request,
res:Response,
next:NextFunction) {
    console.log(req.body)
    const id = uuid()
    try{ 
        
        const validationResult = registerSchema.validate(req.body,options)
        if( validationResult.error){
            console.log(validationResult.error.details)
            return res.status(400).json({
               Error:validationResult.error.details[0].message
            })
         }
        const duplicatEmail = await UserInstance.findOne({where:{email:req.body.email}})
        if(duplicatEmail){
         return res.status(409).json({
            msg:"Email is used, please change email"
         })  
        }

        const username = await UserInstance.findOne({where:{username:req.body.username}})

        if(username){
         return res.status(409).json({
            msg:"username  is used"
         })
        }
        
       const passwordHash = await bcrypt.hash(req.body.password,8)
       const user = await UserInstance.create({ 
          id:id,
          username:req.body.username,
          email:req.body.email,
          password:passwordHash,
          isAvatarImageSet:req.body.isAvatarImageSet,
          avatarImage:req.body.avatarImage
        
        })
        
       return res.status(201).json({
           status:"true",
           msg:"You have successfully created a user",
           user
       })
    }catch(err){
        console.log(err)
       res.status(500).json({
        
        msg:'failed to register',
        route:'/register' 
       })
    }


}

export async function login(
    req:Request,
    res:Response,
    next:NextFunction) {
       
        
   try{ 
       const validationResult = loginSchema.validate(req.body,options)
       if( validationResult.error){
          return res.status(400).json({
             Error:validationResult.error.details[0].message
          })
       }
       const user = await UserInstance.findOne({
         where:{username:req.body.username}  
      }) as unknown as {[key:string]:string}
        
      
      const validUser = await bcrypt.compare(req.body.password, user.password);

      if(!validUser){

         res.status(401).json({
            message:"Password do not match"
        })
      }

      if(validUser){
         
         return res.status(200).json({
             status:"true",
             message:"Successfully logged In",
             user

         })
      }

}catch(err){
    
   res.status(500).json({
    msg:'failed to login',
    route:'/login'
   })
}   
}

export async function setAvatar(
    req:Request,
    res:Response,
    next:NextFunction) {
        
        try {
            const id = req.params.id;
            const avatarImage = req.body.image;
           
        const record = await UserInstance.findOne({where: {id}})
        if(!record){
          return res.status(404).json({
             Error:"Cannot find existing user",
          })
        }
        
       
        const userData = await record.update({
            isAvatarImageSet: true,
            avatarImage:avatarImage
          
        }) as unknown as {[key:string]:string}
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
          });
        
        }catch(err){
            
           res.status(500).json({
            
            msg:'failed to update avater',
            route:'/setAvatar' 
           })
        }
    
    
    }

    export async function getAllUsers(
        req: Request,
        res: Response,
        next: NextFunction
      ) {
        try {
            const {id} = req.params
           const users = await UserInstance.findAll(
            {where:{ id:{ [Op.ne]:id}}}
            );
         
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({
            msg: "failed to get all users",
            route: "/getAllUsers",
          }); 
        }
      }

