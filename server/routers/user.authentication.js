import express from 'express'
import Auth from '../controllers/authentication'

const AuthFreelancerRouter = express.Router()

AuthFreelancerRouter.post('/user/worker/auth/signin', Auth.login);
AuthFreelancerRouter.get("/user/worker/auth/signout", Auth.logout);

export default AuthFreelancerRouter;
