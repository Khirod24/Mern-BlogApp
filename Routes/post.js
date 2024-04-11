const express = require("express");
const router = express.Router();
// const Post = require('../Models/Post.js')
const postController = require('../Controllers/postControl');

router.get('/',postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id',postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id',postController.deletePost);

module.exports= router;

// //GET all posts
// router.get("/", async(req,res)=>{
//    try {
//     const posts= await Post.find();
//     res.json(posts)   
//     }catch (error) {
//         res.status(500).json({message:error.message});   
//     }
// })

// //POST(create) new post
// router.post("/", async(req,res)=>{
//     const post = new Post({
//         title:req.body.title,
//         content:req.body.content,
//     })
//     try{
//         const newPost= await post.save();
//         res.status(201).json(newPost);
//     }catch(error){res.status(400).json({message:error.message})}
// })

// module.exports= router;