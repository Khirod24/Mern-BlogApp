const User = require('../Models/User');

const userController={
    registerUser: async(req,res)=>{
        try{
            const {username, email, password}= req.body;
            const user = new User({username, email, password});
            await user.save();
            res.status(201).json({message:'USER REGISTERED SUCCESSFULLY'});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    },
    loginUser:async(req,res)=>{
        //LOGIN A USER
    },
}

module.exports = userController;