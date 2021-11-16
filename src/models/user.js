import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: [true, 'Nome Não Informado']
    },
    email:{
        type: String,
        required:[true, 'Senha Não Informada']
    },
    password:{
        type: String,
        require: [true, 'Senha Não Informada']
    },
    register: {
        type: Date,
        default: Date.now,
      },
});

export default mongoose.model('User', user);