const mongoose= require("mongoose");
const Post = require("./Post");
const User = require("./User");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    postId:{type:mongoose.Schema.Types.ObjectId, ref:'Post', required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;