import Freelancer from "../models/Freelancer";
import ClientCompany from '../models/ClientCompany'; 

export const Checking = async (req, res,next) => {
  try {
    let freelancer = await Freelancer.findOne({
      "email": req.body.email
    }).exec()
    let client = await ClientCompany.findOne({
        "email": req.body.email
      }).exec()

    if (freelancer) {
      return res.status(200).json({
        error: "Email already used (As a Freelancer) : Try to login or use another address email."
      })
    }
      
    if (client) {
      return res.status(200).json({
        error: "Email already used (As Client or Company) : Try to login or use another address email."
      })
    }
    
    if (!freelancer && !client) {
        return res.status(200).json({
          message : 'USER_AUTH_TO_CREATE_ACCOUNT'
        })
    }

  } catch (err) {
    console.log(err)
    return res.status('401').json({
      error: "Something went wrong : Please try again later!"
    })
  }
}
