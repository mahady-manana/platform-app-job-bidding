import express from 'express'
import AuthFreelancer from '../controllers/authentication-freelancer'
import AuthCCom from "../controllers/authentication.ccompany";
const AuthUserRouter = express.Router()

AuthUserRouter.post('/user/worker/auth/v3/signin', AuthFreelancer.login);
AuthUserRouter.get("/user/worker/auth/v3/signout", AuthFreelancer.logout);
AuthUserRouter.post('/user/ccompany/auth/v2/signin', AuthCCom.login);
AuthUserRouter.get('/user/ccompany/auth/v2/signout', AuthCCom.logout);

export default AuthUserRouter;
