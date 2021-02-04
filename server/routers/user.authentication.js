import express from 'express'
import Auth from '../controllers/authentication'
import userController from '../controllers/user.controller';

const AuthRouter = express.Router()

AuthRouter.post('/user/worker/auth/signin', Auth.login);
AuthRouter.get("/user/worker/auth/signout", Auth.logout);
AuthRouter.get("/user/worker/auth/:id", Auth.signinRequire, userController.readOne);

export default AuthRouter;
