const Comment = require('../Models/Comment');
const Post = require('../Models/Post');

const commentPost = async(req,res)=>{
    try{
        const {postId} = req.params;
        const {userId,text} = req.body;
        //FINDING POST
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:'POST NOT FOUND'})
        }
        //CHECK FOR LIKE BY EXISTING USER
        if(post.comments.includes(userId)){
            return res.status(400).json({message:'YOU ALREADY COMMENTED ON THE POST'})
        }
        //SAVING POST AND COMMENT
        const comment = new Comment({postId,userId,text});
        post.comments.push(userId);
        await comment.save();
        await post.save();
        res.json({message:'COMMENT ADDED SUCCESSFULLY'});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports = commentPost;