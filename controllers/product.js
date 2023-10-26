import { productRepository } from "../repositories/index.js";

const create = async (req, res) => {
	const { name, description, price, discountPercentage,
		stock, brand, thumbnail } = req.body;
	try {
		const newProduct = await productRepository.create({
			name, description, price, discountPercentage,
			stock, brand, thumbnail
		});
		res.status(201).json({
			message: "Created product successfully",
			data: newProduct
		})
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const listProduct = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const size = parseInt(req.query.size) || 5;
	const startIndex = (page - 1) * size;
	try {
		const listProduct = await productRepository.listProduct(startIndex, size);
		res.status(200).json({
			message: "Get list post successfully",
			data: listProduct
		})
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const detail = async (req, res) => {
	const { id } = req.params;
	try {
		const productDetail = await productRepository.detail(id);
		return res.status(200).json({ product: productDetail });
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

export default {
	create,
	listProduct,
	detail
}