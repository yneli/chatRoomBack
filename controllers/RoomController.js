import RoomModel from "../models/room.js";

export const CreateRoom = async(req, res) => { 
    try {  
        const doc = new RoomModel({
            idRoom: req.body.idRoom,
            admin: req.body.admin,
            user: "",
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

// export const JoinRoom = async(req, res) => {
//     try {
//         const 
//     } catch (error) {
        
//     }
// }

export const JoinRoom = async(req, res) => {
    try {
        const roomId = req.body.idRoom;
        await RoomModel.updateOne(
            {
                idRoom: roomId,
            },
            {
              user: req.body.user
            },
          );
      
          res.json({
            success: true,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: 'Не удалось обновить статью',
          });
        }
      };
