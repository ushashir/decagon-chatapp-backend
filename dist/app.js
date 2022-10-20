"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
const postRoute_1 = __importDefault(require("./routes/postRoute"));
const db_config_1 = __importDefault(require("./config/db.config"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
db_config_1.default.sync().then(() => {
    console.log('Database connected on port 5000');
}).catch(err => {
    console.log(err);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/auth", usersRoute_1.default);
app.use("/api/messages", messageRoute_1.default);
app.use("/api/posts", postRoute_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});
var onlineUsers = new Map();
io.on("connection", (socket) => {
    var chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});
