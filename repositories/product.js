import Product from "../models/Product.js";

const create = async ({ name, description, price, discountPercentage, stock, brand,
	thumbnail }) => {
	try {
		const newProduct = await Product.create({
			name, description, price, discountPercentage, stock, brand, thumbnail
		})
		return newProduct;
	} catch (error) {
		throw new Error(error);
	}
}

const listProduct = async (startIndex, size) => {
	try {
		const listProduct = await Product.find({stock: { $gt: 0 }}).skip(startIndex).limit(size);
		const totalProduct = await Product.countDocuments();
		return {
			data: listProduct,
			totalProduct
		};
	} catch (error) {
		throw new Error(error);
	}
}

const detail = async (id) => {
	const product = await Product.findById(id)
		.populate({
			path: "comments",
			populate: {
				path: 'user',
				select: 'username'
			}
		});
	if (!product) {
		return "Product don't existed!";
	}
	return product;
}

const getComments = async (id) => {
	try {
		const product = await Product.findById(id)
		.populate({
			path: 'comments',
			populate: {
				path: 'user'
			}
		});
		return product.comments;
	} catch (error) {
		throw new Error(error);
	}
}

export default {
	create,
	listProduct,
	detail,
	getComments
}