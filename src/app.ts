import 'dotenv/config'
import createError from 'http-errors';
import express from "express"
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from "node:http"
import cors from "cors"
import { Server } from "socket.io"
import usersRoute from "./routes/usersRoute"
import messageRoute from "./routes/messageRoute"
import postRoute  from "./routes/postRoute"
import db from './config/db.config'
import { any } from 'joi';

const app = express()
app.use(logger('dev'))
app.use(cookieParser());
app.use(cors());



db.sync().then(() => {
    console.log('Database connected on port 5000');
  }).catch(err => {
    console.log(err)
  });
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }));

app.use("/api/auth",usersRoute)
app.use("/api/messages", messageRoute);
app.use("/api/posts",postRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  

const server = app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`)
})
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
})


 var onlineUsers = new Map()

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
    