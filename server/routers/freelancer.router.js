import express from "express";
import FreelancerController from "../controllers/freelancer.controller";

const FreelancerRouter = express.Router();

FreelancerRouter.post("/user/type-freelancer/tp3/add", FreelancerController.add);
FreelancerRouter.put("/user/type-freelancer/tp3/full/:email/", FreelancerController.completeUpdate);
FreelancerRouter.get("/user/type-freelancer/tp3/users", FreelancerController.List);
FreelancerRouter.put("/user/type-freelancer/tp3/order/:id", FreelancerController.orderMade);

export default FreelancerRouter;