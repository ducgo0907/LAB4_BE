import Image from "../models/Image.js";
import { __dirname } from "../server.js";

const create = async ({ caption }) => {
	try {
		const newImage = Image.create({ url: "", caption, path: "", createdAt: new Date() });
		return newImage;
	} catch (error) {
		throw new Error(error);
	}
}

const update = async ({ id, url, caption, path }) => {
	try {
		const image = await Image.findById(id).exec();
		if (!image) {
			throw new Error("Image don't existed!!");
		}
		image.url = url;
		image.caption = caption;
		image.path = path;
		return image.save();
	} catch (error) {
		throw new Error(error);
	}
}

const getDirFile = async (id) => {
	try {
		const image = await Image.findById(id);
		if (!image) {
			throw new Error("Image don't existed");
		}
		return __dirname + image.path;
	} catch (e) {
		throw new Error("Image don't existed");
	}

}

export default {
	create,
	update,
	getDirFile
}