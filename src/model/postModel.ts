import { DataTypes, Model } from "sequelize";
import db from '../config/db.config'

interface PostAttributes {
    id: string;
    UserId:string;
    desc:string;
    img:string;
}

export  class PostInstance extends Model<PostAttributes>{}

PostInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    UserId:{
        type:DataTypes.STRING,
    },
    desc:{
        type:DataTypes.STRING, 
    },
    img:{
        type:DataTypes.STRING, 
    },
    },{
    sequelize:db,
    tableName:'post'
});

