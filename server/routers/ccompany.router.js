import express from "express";
import CCompanyController from "../controllers/clientcompany.controllers";
// import authContrl from '../controllers/authentication';
const CCompanyRouter = express.Router();

CCompanyRouter.post("/user/type-ccompany/tp2/add", CCompanyController.add);
CCompanyRouter.get("/user/type-ccompany/tp2/users", CCompanyController.List);
CCompanyRouter.put("/user/type-ccompany/tp2/order/:id", CCompanyController.orderMade);
// CCompanyRouter.get("/user/worker/auth/:id", authContrl.hasAuthorization, CCompanyController.readOne);
// CCompanyRouter.put("/user/type-ccompany/tp2/full/:id", authContrl.hasAuthorization, CCompanyController.completeUpdate);

export default CCompanyRouter;