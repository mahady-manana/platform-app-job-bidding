import express from 'express'
import { Checking } from '../controllers/checking_signup';

const CheckerSignupRouter = express.Router()

CheckerSignupRouter.post('/user/all/checker/v1/signup/', Checking);

export default CheckerSignupRouter;
