const mongoose= require('mongoose');
const Like = require('./Like');
const Comment= require('./Comment')
const Schema= mongoose.Schema;

const postSchema= new Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'Like'}],
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    date:{type:Date, default:Date.now()},
})

const Post= mongoose.model('Post',postSchema);

module.exports = Post;