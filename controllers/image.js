import { imageRepository } from "../repositories/index.js";
import { __dirname } from "../server.js";
import { v2 as cloudinary } from 'cloudinary'
import multiparty from 'multiparty'

const detail = async (req, res) => {
	const { id } = req.params;
	try {
		const dirFile = await imageRepository.getDirFile(id);
		return res.sendFile(dirFile);
	} catch (error) {
		return res.status(500).json(error.toString());
	}
}

const create = async (req, res) => {
	const urls = [];
	const form = new multiparty.Form();
	form.parse(req, async function (err, fields, files) {
		const options = {
			use_filename: true,
			unique_filename: false,
			overwrite: true,
			folder: "/lab4",
		};
		if(!fields.file){
			return res.status(500).json({message: "You must post an image!"})
		}
		const { productId } = fields;
		const filesData = fields.file;
		for (let i = 0; i < filesData.length; i++) {
			const imagePath = filesData[i];
			try {
				if (imagePath !== undefined) {
					const result = await cloudinary.uploader.upload(imagePath, options);
					urls.push(result.secure_url);
					// Tao moi anh
					if(!productId){
						await imageRepository.create({ url: result.secure_url, path: result.public_id, caption: result.asset_id });
					}else{
						await imageRepository.createPushToProduct({url: result.secure_url, path: result.public_id, caption: result.asset_id, productId})
					}
					if (i === filesData.length - 1 && !!result.secure_url) {
						return res.status(200).json({ images: urls });
					}
				}
			} catch (error) {
				console.error(error);
				return res.status(400);
			}
		}
	});
}

export default {
	create,
	detail,
}