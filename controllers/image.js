import { imageRepository } from "../repositories/index.js";
import { __dirname } from "../server.js";


const create = async (req, res) => {
	const image = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
	try {
		if (!image) return res.sendStatus(400);
		const listImg = [];
		const promises = image.map(async (img) => {
			const newImage = await imageRepository.create({ caption: img.name });
			const imageArr = img.mimetype.split("/");
			img.mv(__dirname + '/upload/' + newImage._id + "." + imageArr[1]);
			const updateImage = await imageRepository.update({
				id: newImage._id.toString(),
				url: process.env.BASE_URL + '/image/' + newImage._id,
				caption: img.name,
				path: '/upload/' + newImage._id + "." + imageArr[1]
			});
			listImg.push(updateImage);
		});

		// Wait for all promises to resolve
		await Promise.all(promises);

		return res.status(200).json({ images: listImg });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
}

const detail = async (req, res) => {
	const { id } = req.params;
	try {
		const dirFile = await imageRepository.getDirFile(id);
		return res.sendFile(dirFile);
	} catch (error) {
		return res.status(500).json(error.toString());
	}
}

export default {
	create,
	detail
}