import multer from "multer"
import path from "path"

const CURRENT_WORKING_DIR = process.cwd()

const storage = multer.diskStorage({
	destination : path.join(CURRENT_WORKING_DIR, "/public/uploads/profile/"),
	filename : (req, file, callback) => {
		callback(null, "media-" + Date.now() + "-" + file.originalname.replace(/ /g, "-"))
	}
})

const upload = multer({storage : storage}).single("file")

export default upload;