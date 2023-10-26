import Image from "../models/Image.js";
import Product from "../models/Product.js";
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

const updatePushToProduct = async ({ id, url, caption, path, productId }) => {
	try {
		const image = await Image.findById(id).exec();
		if (!image) {
			throw new Error("Image don't existed!!");
		}
		image.url = url;
		image.caption = caption;
		image.path = path;
		await image.save();
		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			{
				$push: {
					images: {
						id: image._id.toString(),
						url: url,
						caption: caption
					}
				}
			},
			{ new: true }
		);
		if (!updatedProduct) {
			throw new Error("Product not found!");
		}
		return image;
	} catch (error) {
		throw new Error(error);
	}
}

export default {
	create,
	update,
	getDirFile,
	updatePushToProduct
}