import { DataTypes, Model } from "sequelize";
import db from '../config/db.config'

interface MessageAtrributes{
    id:string;
    message:string;
    from:string;
    to:string;
    sender:string;
   
}

export  class MessageInstance extends Model<MessageAtrributes>{}

MessageInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'message is required'
            },
            notEmpty:{
                msg:"please provide a message"
            }
        }
    },
 
    from:{
        type:DataTypes.STRING,
        allowNull:false,
      
    },
    to:{
        type:DataTypes.STRING,
        allowNull:false,
       
    },
    sender:{
        type:DataTypes.STRING,
        allowNull:false
    },
 

},{
    sequelize:db,
    tableName:'message'
});
