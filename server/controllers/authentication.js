import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../configs/config';
import Bcryptjs from "bcryptjs";
import Freelancer from "../models/Freelancer"

const login = async (req, res) => {
  try {
    let user = await Freelancer.findOne({
      "email": req.body.email
    }).exec()

    if (!user)
      return res.status('401').json({
        error: "User not found"
      })

    if (!Bcryptjs.compareSync(req.body.password, user.password)) {
        return res.json({error : "Invalid password : Please verify your password"})      
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 99999
    })

    return res.json({
      token,
      user: {_id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email},
      status : "authorized"
    })
  } catch (err) {
    console.log(err)
    return res.status('401').json({
      error: "Cannot sign in!"
    })

  }
}

const logout = (req, res) => {
  res.clearCookie("t")
  return res.status(200).json({
    message: "Logout successfully!"
  })
}

const signinRequire = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['RS256']
})

export default {
  login,
  logout,
  signinRequire
}
