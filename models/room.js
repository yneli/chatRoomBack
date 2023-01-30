import mongoose from 'mongoose';
const RoomSchema = new mongoose.Schema({
    admin: {
      type: String,
      required: true,
    },
    user: {
        type: String,
        required: false,
    },
    idRoom: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);
export default mongoose.model('Room', RoomSchema);