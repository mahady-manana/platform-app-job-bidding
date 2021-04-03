import ClientCompany from "../models/ClientCompany";
import Bcryptjs from "bcryptjs";

const add = async (req, res, next) => {

    req.body.password = Bcryptjs.hashSync(req.body.password, 10)
    
    const user = new ClientCompany(req.body)
    try {
        await user.save()
        return res.status(200).json({message : "Signin up successfully, Your account is now active!"})
    } catch (error) {
        return res.json({error : "Something went wrong, please try again later!", message_error : error})
    }
}
const addPhoto = async (req, res, next) => {

    await ClientCompany.findByIdAndUpdate(req.params.id, {
        photo : req.body.photo,
    }, error => {
        if (error) {
            return res.json({error : error + 'this the error'})
        }
        return res.json({message : "Updated successfully!"})
    })
}
const completeUpdate = async (req, res, next) => {

    await ClientCompany.findByIdAndUpdate(req.params.id, {$set : {
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    company : req.body.company,
    company_address : req.body.company_address,
    description : req.body.description,
    user_id : req.body.user_id,
    phone : req.body.phone,
    skill : req.body.skill,
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
        await ClientCompany.findById(req.params.id, (error, user) => {
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
    await ClientCompany.find((error, user) => {
        if (error || !user) {
            res.json({error : "Unable to list ClientCompany."})
        }
        res.json(user)
    })
}
// const addToCart = async (req, res, next) => {
//     try {
//         await ClientCompany.findByIdAndUpdate({_id : req.params.id}, {
//             $addToSet : {
//                 "card" : {
//                     item : req.body.item
//                 }
//             }
//         }, {new : true}, (error, user) => {
//             if (error) {
//                 return res.json({error : "An error is raised. Try again later!"})
//             }
//             return res.json({message : "Added to card!"})
//         })
//     } catch (error) {
//         return res.json({error : "Unable to add to card."})
//     }
// }
// const updateCart = (req, res, next) => {
//     try {
//         await ClientCompany.findByIdAndUpdate({_id : req.params.id}, {
//             $pull : {
//                 "card" : {
//                     item : req.body.item
//                 }
//             }
//         }, {new : true}, (error, user) => {
//             if (error) {
//                 return res.json({error : "An error is raised. Try again later!"})
//             }
//             return res.json({message : "Card updated!"})
//         })
//     } catch (error) {
//         return res.json({error : "Cannot update card!"})
//     }
// }
const orderMade = async (req, res, next) => {
    try {
        await ClientCompany.findByIdAndUpdate({_id : req.params.id}, {
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