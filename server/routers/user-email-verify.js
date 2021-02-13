import express from 'express';
import SendMail from '../controllers/email.verification';

const SendMailRouter = express.Router();

SendMailRouter.post('/user/post/email/verify/', SendMail)

export default SendMailRouter;