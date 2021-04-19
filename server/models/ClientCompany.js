import mongoose from "mongoose";

const Schema  = mongoose.Schema

const ClientCompany = new Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    company : {type : String}, 
    email : {
        type : String,
        index : {unique : true, sparse : true}
    },
    company_address : {type : String}, 
    description :{type : String}, 
    password : {type : String},
    user_id : {type : String},
    photo : {type : String},
    skill : [],
    phone : {type : Number},
    city : {type : String},
    country : {type : String},
    star : {type : Number},
    joined : {type : String},
    job : [
        {
            ref : {type : String},
        }
    ],
    facebook : {type : String},
    linkedin : {type : String},
    twitter : {type : String},
    github : {type : String},
    type : {type : String, default : 'client'},
})
export default mongoose.model("User_type_clientOrCompany_1a2345", ClientCompany)