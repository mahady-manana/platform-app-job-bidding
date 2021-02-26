import express from 'express'
import Auth from '../controllers/authentication'
import FreelancerController from '../controllers/freelancer.controller';

const AuthFreelancerRouter = express.Router()

AuthFreelancerRouter.post('/user/worker/auth/signin', Auth.login);
AuthFreelancerRouter.get("/user/worker/auth/signout", Auth.logout);
AuthFreelancerRouter.get("/user/worker/auth/:id", Auth.signinRequire, FreelancerController.readOne);

export default AuthFreelancerRouter;
