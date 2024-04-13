const Like = require('../Models/Like');
const Post = require('../Models/Post');

const likePost = async(req,res)=>{
    try{
        const {postId} = req.params;
        const {userId} = req.body;
        
        //FINDING POST
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:'POST NOT FOUND'})
        }
        //CHECK FOR LIKE BY EXISTING USER
        if(post.likes.includes(userId)){
            return res.status(400).json({message:'YOU ALREADY LIKED THE POST'})
        }
        //SAVE THE POST
        const like = new Like({postId, userId});
        post.likes.push(userId);
        await like.save();
        await post.save();
        res.json({message:'POST LIKED SUCCESSFULLY'});
    }catch(err){
        res.status(500).json({message:err.message})
    }
};

module.exports = likePost;