import express from 'express';
import mongoose from 'mongoose';
import Busboy from 'busboy';
import aws from '../services/aws.js';


import UserAndFriend from '../models/relationship/userAndFriend.js';
import Friend from '../models/friend.js';

const router = express.Router();

router.post('/add/:id', async(req, res) => {

    var busboy = new Busboy({ headers: req.headers });

    busboy.on('finish', async () => {

        try{

            const friendId = mongoose.Types.ObjectId();
            let photo = '';

            if (req.files) {
                const file = req.files.photo;

                const nameParts = file.name.split('.');
                const fileName = `${friendId}.${nameParts[nameParts.length - 1]}`;
                photo = `friend/${fileName}`;

                const response = await aws.uploadToS3(
                    file,
                    photo
                    //, acl = https://docs.aws.amazon.com/pt_br/AmazonS3/latest/dev/acl-overview.html
                  );

                if(response.error){
                    res.json({error: true, message:response.message})
                    return false;
                }
                
            }

            const friend = await new Friend({
                ...req.body,
                _id: friendId,
                photo,
              }).save();
            const relation = await new UserAndFriend({
                userId: req.params.id,
                friendId
              }).save(); 
            
            res.json({error: false, friend, relation});
    
        }catch(err){
            res.json({error: true, message: err.message});
        }             
    });

    req.pipe(busboy);

});

router.post('/update/:id/:status', async(req, res) => {
    try{

        const {id, status} = req.params;

        if(status == "A" ){
            await Friend.findByIdAndUpdate(id, {...req.body});
        }else{
            await UserAndFriend.findOneAndUpdate({friendId:{$eq: id}}, {status: "I"});
        }
   
        res.json({error: false});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});

router.get('/all/:id', async(req, res) => {
    try{

        const {id} = req.params;

        const data = await UserAndFriend.find({userId: {$eq: id}, status: {$eq: "A"}}).populate({path:'friendId' ,select: 'name photo email birthDate'});

        res.json({error: false, data});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});

export default router;