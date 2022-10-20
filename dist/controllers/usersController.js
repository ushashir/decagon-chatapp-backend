"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.setAvatar = exports.login = exports.register = void 0;
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function register(req, res, next) {
    console.log(req.body);
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            console.log(validationResult.error.details);
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const duplicatEmail = await userModel_1.UserInstance.findOne({ where: { email: req.body.email } });
        if (duplicatEmail) {
            return res.status(409).json({
                msg: "Email is used, please change email"
            });
        }
        const username = await userModel_1.UserInstance.findOne({ where: { username: req.body.username } });
        if (username) {
            return res.status(409).json({
                msg: "username  is used"
            });
        }
        const passwordHash = await bcrypt_1.default.hash(req.body.password, 8);
        const user = await userModel_1.UserInstance.create({
            id: id,
            username: req.body.username,
            email: req.body.email,
            password: passwordHash,
            isAvatarImageSet: req.body.isAvatarImageSet,
            avatarImage: req.body.avatarImage
        });
        return res.status(201).json({
            status: "true",
            msg: "You have successfully created a user",
            user
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'failed to register',
            route: '/register'
        });
    }
}
exports.register = register;
async function login(req, res, next) {
    try {
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const user = await userModel_1.UserInstance.findOne({
            where: { username: req.body.username }
        });
        const validUser = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!validUser) {
            res.status(401).json({
                message: "Password do not match"
            });
        }
        if (validUser) {
            return res.status(200).json({
                status: "true",
                message: "Successfully logged In",
                user
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to login',
            route: '/login'
        });
    }
}
exports.login = login;
async function setAvatar(req, res, next) {
    try {
        const id = req.params.id;
        const avatarImage = req.body.image;
        const record = await userModel_1.UserInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing user",
            });
        }
        const userData = await record.update({
            isAvatarImageSet: true,
            avatarImage: avatarImage
        });
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to update avater',
            route: '/setAvatar'
        });
    }
}
exports.setAvatar = setAvatar;
async function getAllUsers(req, res, next) {
    try {
        const { id } = req.params;
        const users = await userModel_1.UserInstance.findAll({ where: { id: { [sequelize_1.Op.ne]: id } } });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to get all users",
            route: "/getAllUsers",
        });
    }
}
exports.getAllUsers = getAllUsers;
