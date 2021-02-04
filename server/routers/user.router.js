import express from "express";
import userController from "../controllers/user.controller";

const UserRouters = express.Router();

UserRouters.post("/user/type-client/add", userController.addUser);
UserRouters.get("/user/type-client/users", userController.userList);
UserRouters.put("/user/type-client/order/:id", userController.orderMade);

export default UserRouters;