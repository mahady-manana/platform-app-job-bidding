import mongoose from "mongoose";

const Schema  = mongoose.Schema

const JobPosted = new Schema({
    title : {type : String},
    description : {type : String},
    skill : {type : String},
    period : {type : String},
    money : {type : String},
    poster : {type : String}, 
    bidder : {type : String},
    ref : {type : String},
    date : {type : String},
})
export default mongoose.model("JobPosted_models", JobPosted)