import express from 'express'
import Auth from "../controllers/authentication";
const AuthUserRouter = express.Router()

AuthUserRouter.post('/user/all/auth/v1/signin', Auth.login);
AuthUserRouter.get("/user/all/auth/v1/signout", Auth.logout);

export default AuthUserRouter;
