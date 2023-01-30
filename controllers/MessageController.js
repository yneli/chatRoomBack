import RoomModel from "../models/room.js";

export const Message = async(req, res) => { 
    try {  
        const doc = new RoomModel({
            idRoom: req.body.idRoom,
            user: req.body.user,
        });
        const chat = await doc.save();
        const posts = await RoomModel.find({idRoom: req.body.idRoom}).populate('idRoom').exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "не удалось создать комнату",
        });
      }};