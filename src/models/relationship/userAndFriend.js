import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userAndFriend = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuário é obrigatório'],
  },
  friendId: {
    type: mongoose.Types.ObjectId,
    ref: 'Friend',
    required: [true, 'FriendId é obrigatório'],
  },
  status:{
    type: String,
    enum:['A', 'I'],
    default: 'A'
},
  register: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('UserAndFriend', userAndFriend);