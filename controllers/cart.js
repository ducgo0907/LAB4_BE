import { cartRepository } from "../repositories/index.js";

const create = async (req, res) => {
	const { userId } = req.body;
	try {
		const newCart = await cartRepository.create({ userId });
		return res.status(200).json({ newCart });
	} catch (error) {
		return res.status(500).json(error.toString());
	}
}

const addProduct = async (req, res) => {
	const { productId, cartId, quantity } = req.body;
	try {
		const quantityTotal = parseInt(quantity);
		const result = await cartRepository.addProduct({ productId, cartId, quantity: quantityTotal });
		return res.status(200).json({ message: result });
	} catch (error) {
		return res.status(500).json(error.toString());
	}
}

const addCustomProduct = async (req, res) => {
	const { productId, cartId, quantity } = req.body;
	try {
		const quantityTotal = parseInt(quantity);
		const result = await cartRepository.addCustomProduct({ productId, cartId, quantity: quantityTotal });
		return res.status(200).json({ message: result });
	} catch (error) {
		return res.status(500).json(error.toString());
	}
}

const view = async (req, res) => {
	const { id } = req.params;
	try {
		const cart = await cartRepository.view(id);
		return res.status(200).json({ message: "Success", data: cart });
	} catch (error) {
		return res.status(500).json(error.toString());
	}
}

const all = async (req, res) => {
	const userId  = req.userID;
	console.log(userId);
	try {
		const listCart = await cartRepository.all(userId);
		return res.status(200).json({ message: "Success", data: listCart });
	} catch (error) {
		return res.status(500).json(error.toString());
	}
}


const remove = async (req, res) => {
	const { productId, cartId } = req.body;
	try {
		const cart = await cartRepository.remove(productId, cartId);
		return res.status(200).json({ cart });
	} catch (error) {
		return res.status(500).json(error.toString());
	}

}
export default {
	create,
	view,
	addProduct,
	all,
	addCustomProduct,
	remove
}