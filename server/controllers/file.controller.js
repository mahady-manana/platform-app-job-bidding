import path from "path"
import fs from "fs"
import Single from "../models/photo.single";


const CURRENT_WORKING_DIR = process.cwd()
const uploadFile = async (req, res, next) => {
	try {
		const file = req.file;
		const fileInfo = await new Single({
				filename : file.filename,
				uploadDate : Date.now(),
			})
			fileInfo.save()
                    .then(file => {
                    res.status(200).json("File uploaded successfully!")
                    })
                    .catch(error => {
                    res.json({error : 'something went wrong!'})
                    })
	} catch(error) {
		res.json({error : 'something went wrong!'})
	}
}

const getMedia = async (req, res, next) => {
	try {
		await Single.find((error, file) => {
			if (error) {
				res.status(404).json(error)
			}
			res.json(file)
		})
	} catch(error) {
		next(error)
	}
}

// const getOneFile = async (req, res, next) => {
// 	try {
// 		await Single.find(req.params.filename, (error, file) => {
// 			if (error) {
// 				res.status(404).json(error)
// 			}
// 			res.send(file)
// 		})
// 	} catch(error) {
// 		next(error)
// 	}
// }

// const removeFile = async (req, res, next) => {
// 	try {
// 		await Single.findByIdAndDelete(req.params.id, (error, file) => {

// 			if (error || !file) {
// 				throw new TypeError("Delete error : ", error)
// 			} else {
// 				fs.unlink(path.join(CURRENT_WORKING_DIR, "./public/uploads/profile/" + file.filename), error => {
// 					if (error) {
// 						throw new TypeError("File dir error : ", error)
// 					} else {
// 						res.send("File deleted successfully")
// 					}
// 				})
// 			}
// 		})
// 	} catch(error) {
// 		next(error)
// 	}
// }

export default {
	uploadFile,
	getMedia
}