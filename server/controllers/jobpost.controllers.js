import JobPosted from "../models/JobPosted";
import Bcryptjs from "bcryptjs";

const add = async (req, res, next) => {

    const job = new JobPosted(req.body)
    try {
        await job.save()
        return res.status(200).json({message : "Signin up successfully, Your account is now active!"})
    } catch (error) {
        return res.json({error : "Something went wrong, please try again later!", message_error : error})
    }
}
const bidding = async (req, res, next) => {

    await JobPosted.findByIdAndUpdate(req.params.id, {$set : {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        company : req.body.company,
        description : req.body.description,
        user_id : req.body.user_id,
        photo : req.body.photo,
        phone : req.body.phone,
        city : req.body.city,
        country : req.body.country,
        star : req.body.star,
        job : req.body.job,
        facebook : req.body.facebook,
        linkedin : req.body.linkedin,
        twitter : req.body.twitter,
        github : req.body.github,
    }},{upsert:true}, error => {
        if (error) {
            return res.json({error : error + 'this the error'})
        }
        return res.json({message : "Updated successfully!"})
    })
}
const readOne = async (req, res, next) => {
    try {
        await JobPosted.findById(req.params.id, (error, job) => {
                if (error || !job) {
                    res.json({error : "User not found!"})
                }
                return res.json(job)
        })
    } catch (error) {
        next(error)
    }
}
const List = async (req, res, next) => {
    await JobPosted.find((error, jobs) => {
        if (error || !jobs) {
            res.json({error : "Unable to list JobPosted."})
        }
        res.json(jobs)
    })
}
export default {
    add,
    bidding,
    List,
    readOne,
}