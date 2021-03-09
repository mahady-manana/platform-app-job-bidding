import Freelancer from "../models/Freelancer";
import Bcryptjs from "bcryptjs";

const add = async (req, res, next) => {

    req.body.password = Bcryptjs.hashSync(req.body.password, 10)
    
    const user = new Freelancer(req.body)
    try {
        await user.save()
        return res.status(200).json({message : "Signin up successfully, Your account is now active!"})
    } catch (error) {
        return res.json({error : "Something went wrong, please try again later!", message_error : error})
    }
}
const completeUpdate = async (req, res, next) => {

    await Freelancer.findByIdAndUpdate(req.params.id, {$set : {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        job_title : req.body.job_title,
        description : req.body.description,
        hourly_rate : req.body.hourly_rate,
        city : req.body.city,
        country : req.body.country,
        skill : req.body.skill,
        education : req.body.education,
        experience : req.body.experience,
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
const addPhoto = async (req, res, next) => {

    await Freelancer.findByIdAndUpdate(req.params.id, {
        photo : req.body.photo,
    }, error => {
        if (error) {
            return res.json({error : error + 'this the error'})
        }
        return res.json({message : "Updated successfully!"})
    })
}

const readOne = async (req, res, next) => {
    try {
        await Freelancer.findById(req.params.id, (error, user) => {
                if (error || !user) {
                    res.json({error : "User not found!"})
                }
                return res.json(user)
        })
    } catch (error) {
        next(error)
    }
}
const List = async (req, res, next) => {
    await Freelancer.find((error, user) => {
        if (error || !user) {
            res.json({error : "Unable to list Freelancer."})
        }
        res.json(user)
    })
}
const orderMade = async (req, res, next) => {
    try {
        await Freelancer.findByIdAndUpdate({_id : req.params.id}, {
            $addToSet : {
                "order" : {
                    item : req.body.item,
                    date : Date.now()
                }
            }
        }, {new : true}, (error, user) => {
            if (error) {
                return res.json({error : "An error is raised. Try again later!"})
            }
            return res.json({message : "This order is now closed!"})
        })
    } catch (error) {
        return res.json({error : "Something went wrong!"})
    }
}

export default {
    add,
    addPhoto,
    completeUpdate,
    List,
    readOne,
    orderMade
}