import jwt from 'jsonwebtoken';
import config from '../configs/config';
import Bcryptjs from "bcryptjs";
import ClientCompany from "../models/ClientCompany";

const login = async (req, res) => {
  try {
    let user = await ClientCompany.findOne({
      "email": req.body.email
    }).exec()

    if (!user)
      return res.status('401').json({
        error: "User not found : Verify your email address."
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
      user: {_id: user._id, type: user.type,firstname: user.firstname, lastname: user.lastname, company: user.company, email: user.email, photo : user.photo},
      status : "authorized"
    })
  } catch (err) {
    console.log(err)
    return res.status('401').json({
      error: "Something went wrong : Please try again later!"
    })
  }
}

const logout = (req, res) => {
  res.clearCookie("t")
  return res.status(200).json({
    message: "Logout successfully!"
  })
}

const hasAuthorization = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (bearer) {
      const token = bearer.split(' ')[1];

      jwt.verify(token, config.jwtSecret, (err, user) => {
          if (err) {
              return res.status(403).json("Status 403 e!");
          }
          next();
      });
  } else {
      res.status(401).json({error : 'Unauthorized user!'});
  }
};
export default {
  login,
  logout,
  hasAuthorization
}
