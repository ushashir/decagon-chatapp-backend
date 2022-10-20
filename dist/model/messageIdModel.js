"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageIdInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class MessageIdInstance extends sequelize_1.Model {
}
exports.MessageIdInstance = MessageIdInstance;
MessageIdInstance.init({
    sender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    from: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'message is required'
            },
            notEmpty: {
                msg: "please provide a message"
            }
        }
    },
    to: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: db_config_1.default,
    tableName: 'messageId'
});
