import express from "express";
import FreelancerController from "../controllers/freelancer.controller";
import authContrl from '../controllers/authentication';
const FreelancerRouter = express.Router();

FreelancerRouter.post("/user/type-freelancer/tp3/add", FreelancerController.add);
FreelancerRouter.get("/user/type-freelancer/tp3/users", FreelancerController.List);
FreelancerRouter.put("/user/type-freelancer/tp3/order/:id", FreelancerController.orderMade);
FreelancerRouter.get("/user/worker/type-freelancer/tp3/auth/:id", authContrl.hasAuthorization, FreelancerController.readOne);
FreelancerRouter.put("/user/type-freelancer/tp3/full/:id", authContrl.hasAuthorization, FreelancerController.completeUpdate);
FreelancerRouter.put("/user/type-freelancer/tp3/photo/:id", authContrl.hasAuthorization, FreelancerController.addPhoto);

export default FreelancerRouter;