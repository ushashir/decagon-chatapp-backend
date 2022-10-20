"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'username is required'
            },
            notEmpty: {
                msg: "please provide a username"
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'email is required'
            },
            isEmail: {
                msg: 'please provide a valid Email'
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'password is required'
            },
            notEmpty: {
                msg: 'please provide a valid password'
            }
        }
    },
    isAvatarImageSet: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    avatarImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    }
}, {
    sequelize: db_config_1.default,
    tableName: 'user'
});
// UserInstance.hasMany(MessageInstance, {foreignKey:'sender',
// as:'message'
// })
// MessageInstance.belongsTo(UserInstance,{foreignKey:'sender',
// as:'user'}) 
