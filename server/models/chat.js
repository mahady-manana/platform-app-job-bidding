import mongoose from 'mongoose';

const Schema = mongoose.Schema

const Chat = new Schema({
    senderID : {type : String},
    message : {type : String},
    recever : {type : String}
})

export default mongoose.model('Chat_message', Chat)
