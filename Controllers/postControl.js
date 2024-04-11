const Post= require('../Models/Post.js');

const postController = {
    //get all blog posts
    getAllPosts: async(req,res)=>{
        try {
         const posts= await Post.find();
         res.json(posts)   
         }catch (error) {
             res.status(500).json({message:error.message});   
         }},
    createPost: async(req,res)=>{
        const post = new Post({
            title:req.body.title,
            content:req.body.content,
        })
        try{
            const newPost= await post.save();
            res.status(201).json(newPost);
        }catch(error){res.status(400).json({message:error.message})}
    },

}

module.exports = postController;