import { DataTypes, Model } from "sequelize";
import db from '../config/db.config'
import {MessageInstance} from './messageModel'
interface UsersAtrributes{
    id:string;
    username:string;
    email:string;
    password:string;
    isAvatarImageSet:boolean;
    avatarImage:string;
}

export  class UserInstance extends Model<UsersAtrributes>{}

UserInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:'username is required'
            },
            notEmpty:{
                msg:"please provide a username"
            }
        }
    },
 
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:'email is required'
            },
            isEmail:{
                msg:'please provide a valid Email'
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'password is required'
            },
            notEmpty:{
                msg:'please provide a valid password'
            }
        }
    },
    isAvatarImageSet:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
     
    },
    avatarImage:{
        type:DataTypes.STRING,
        allowNull:false,
       defaultValue:""
    } 
},{
    sequelize:db,
    tableName:'user'
});

// UserInstance.hasMany(MessageInstance, {foreignKey:'sender',
// as:'message'
// })

// MessageInstance.belongsTo(UserInstance,{foreignKey:'sender',
// as:'user'}) 
