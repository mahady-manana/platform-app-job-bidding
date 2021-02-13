import express from "express"
import mediaCntrl from "../controllers/file.controller"
import multerCntrl from "../controllers/multer"
const SinglePhotoRouter = express.Router()

SinglePhotoRouter.post("/photo-profile/medias/upload", multerCntrl, mediaCntrl.uploadFile)
SinglePhotoRouter.get("/photo-profile/medias/files", mediaCntrl.getMedia)
// SinglePhotoRouter.get("/photo-profile/medias/:filename", mediaCntrl.getOneFile)
// SinglePhotoRouter.delete("/photo-profile/medias/:id", mediaCntrl.removeFile)

export default SinglePhotoRouter;