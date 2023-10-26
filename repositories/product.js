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
		const listProduct = await Product.find().skip(startIndex).limit(size);
		return listProduct;
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

export default {
	create,
	listProduct,
	detail
}