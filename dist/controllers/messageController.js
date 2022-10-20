"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.addMessage = void 0;
const messageModel_1 = require("../model/messageModel");
const uuid_1 = require("uuid");
const sequelize_1 = require("sequelize");
async function addMessage(req, res, next) {
    try {
        const id = (0, uuid_1.v4)();
        const user = await messageModel_1.MessageInstance.create({
            id: id,
            message: req.body.message,
            from: req.body.from,
            to: req.body.to,
            sender: req.body.from,
        });
        return res.status(201).json({
            status: "true",
            msg: "You have successfully created a user",
            user
        });
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to add message',
            route: '/addMessage'
        });
    }
}
exports.addMessage = addMessage;
// export async function getMessages(
//     req:Request,
// res:Response,
// next:NextFunction
// ) {
// }
async function getMessages(req, res, next) {
    try {
        const { from, to } = req.body;
        const messages = await messageModel_1.MessageInstance.findAll({
            where: {
                [sequelize_1.Op.or]: [{ [sequelize_1.Op.and]: [{ from: from }, { to: to }] },
                    { [sequelize_1.Op.and]: [{ to: from }, { from: to }] }]
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
            order: [['updatedAt', 'ASC']]
        });
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message,
            };
        });
        res.json(projectedMessages);
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/getMessages"
        });
    }
}
exports.getMessages = getMessages;
