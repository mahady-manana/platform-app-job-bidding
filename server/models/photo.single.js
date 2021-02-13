import mongoose from 'mongoose';

const Schema = mongoose.Schema

const SingleImage = new Schema({
    filename : {type : String},
    upladed : {type : Date},
    photo_sign : {type : String}
})
export default mongoose.model('Single_photo_profile', SingleImage)