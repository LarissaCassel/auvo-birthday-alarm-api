import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user.js';

const router = express.Router();

//ADD USER 
router.post('/add', async(req, res) => {
    try{
        const { email, pass} = req.body; 
        const exist = await User.findOne({email: {$eq: email}});

        if(exist) throw new Error('E-Mail Já Cadastrado Anteriormente, Faça Login');
           
        const password = await bcrypt.hash(pass, 10);
        await new User({...req.body, password}).save();

        res.json({error: false});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
//LOGIN
router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;

        const userLogin = await User.findOne({email: {$eq: email} });
        if(!userLogin) throw new Error('Email Incorreto');

        const comparePassword = await bcrypt.compare(password, userLogin.password);
        if(!comparePassword) throw new Error('Senha Incorreta');

        res.json({error: false, userLogin});


    }catch(err){
        res.json({error: true, message: err.message})
    }
});

export default router;