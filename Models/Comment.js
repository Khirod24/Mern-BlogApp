const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    postId:{type:mongoose.Schema.Types.ObjectId, ref:'Post', required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    text: {type:String, required:true}
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;