import mongoose from "mongoose";

const Schema  = mongoose.Schema

const Freelancer = new Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    email : {
        type : String,
        index : {unique : true, sparse : true}
    },
    password : {type : String},
    user_id : {type : String},
    phone : {type : Number},
    city : {type : String},
    country : {type : String},
    star : {type : Number},
    job_title : {type : String},
    hourly_rate : {type : String},
    skill : [],
    description : {type : String},
    languages : {type : String},
    joining_date : {type : Date},
    experience : [
        {
            title : {type : String},
            company : {type : String},
            description : {type : String},
            date_bg : {type : Date},
            date_end : {type : Date},
        }
    ],
    education : [
        {
            degree : {type : String},
            school : {type : String},
            description : {type : String},
            date_bg : {type : Date},
            date_end : {type : Date},
        }
    ],
    job : [
        {
            item : {type : String},
            status : {type : String}
        }
    ],
    facebook : {type : String},
    linkedin : {type : String},
    twitter : {type : String},
    github : {type : String},
})

export default mongoose.model("User_type_workers_123456789", Freelancer)