import Users from "../models/user";
import Bcryptjs from "bcryptjs";

const addUser = async (req, res, next) => {

    req.body.password = Bcryptjs.hashSync(req.body.password, 10)
    const user = new Users(req.body)
    try {
        await user.save()
        return res.status(200).json({message : "Signin up successfully, Your account is now active!"})
    } catch (error) {
        return res.json({error : "Something went wrong, please try again later!"})
    }
}
const readOne = async (req, res, next) => {
    try {
        await Users.findById(req.params.id, (error, user) => {
                if (error || !user) {
                    res.json({error : "User not found!"})
                }
                res.json(user)
        })
    } catch (error) {
        next(error)
    }
}
const userList = async (req, res, next) => {
    await Users.find((error, user) => {
        if (error || !user) {
            res.json({error : "Unable to list users."})
        }
        res.json(user)
    })
}
// const addToCart = async (req, res, next) => {
//     try {
//         await Users.findByIdAndUpdate({_id : req.params.id}, {
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
//         await Users.findByIdAndUpdate({_id : req.params.id}, {
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
        await Users.findByIdAndUpdate({_id : req.params.id}, {
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
    addUser,
    readOne,
    userList,
    // addToCart,
    // updateCart,
    orderMade
}