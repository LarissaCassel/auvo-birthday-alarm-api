import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const friend = new Schema({
    name:{
        type: String,
        required: [true, 'Nome Não Informado']
    },
    email:{
        type: String,
        required:[true, 'E-Mail Não Informada']
    },
    birthDate:{
        type: String,
        require: [true, 'Data de Nascimento Não Informada']
    },
    photo:{
        type: String
    },
    register: {
        type: Date,
        default: Date.now,
      },
});

export default mongoose.model('Friend', friend);