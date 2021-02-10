import mongoose from 'mongoose';

const Schema = mongoose.Schema

const SingleImage = new Schema({
    filename : {type : String},
    upladed : {type : Date}
})
export default mongoose.model('Single_photo_profile', SingleImage)