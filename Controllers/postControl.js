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
    getPostById: async(req,res)=>{
        const id= req.params.id;
        try{
            const post= await Post.findById(id);
            if(!post){return res.status(404).json({message:'POST NOT FOUND'})};
            res.json(post);
        }catch(error){res.status(500).json({message:error.message})};
    },

    updatePost: async(req,res)=>{
        const id= req.params.id;
        try{
            const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new:true});
            if(!updatedPost){return res.status(404).json({message:'POST NOT FOUND AND UPDATED'})}
            res.json(updatedPost);
        }catch(error){res.status(500).json({message:error.message})};
    },

    deletePost: async(req,res)=>{
        const id = req.params.id;
        try{
            const deletedPost = await Post.findByIdAndDelete(id);
            if(!deletedPost){res.status(404).json({message: 'POST NOT FOUND'})}
            res.json({deletedPost,message:'POST DELETED SUCCESSFULLY'});
        }catch(error){res.status(500).json({message:error.message})};
    }
}

module.exports = postController;