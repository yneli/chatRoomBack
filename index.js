import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from 'http';
import { Server } from "socket.io";
import { CreateRoom, JoinRoom } from "./controllers/RoomController.js";

mongoose.connect("mongodb+srv://Admin:Qwe12345@cluster0.dnz9j0y.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("DB Ok"))
.catch((err) => console.log("DB ERROR", err));

const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);
httpServer.listen(process.env.PORT || 4000, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Server OK');
});
const io = new Server(httpServer, {
    cors: {
      origin: "*",
    }
  });

io.on('connect',socket => {
      socket.on("join", (roomId) => socket.join(roomId));
      socket.on("message", (data) => io.to(data?.roomId).emit("message", data?.input));
});

app.post("/createRoom", CreateRoom);
app.post("/JoinRoom", JoinRoom);
