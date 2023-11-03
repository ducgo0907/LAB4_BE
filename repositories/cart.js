import Cart from "../models/Cart.js"
import Product from "../models/Product.js";

const create = async ({ userId }) => {
	try {
		const newCart = await Cart.create({ discountTotal: 0, totalProduct: 0, totalQuantity: 0, totalPrice: 0, user: userId });
		return newCart;
	} catch (error) {
		throw new Error(error.toString());
	}
}

const addCustomProduct = async ({ productId, cartId, quantity }) => {
	try {
		const cart = await Cart.findById(cartId);
		const product = await Product.findById(productId);
		if (!product) {
			return "Product you add that is not existed";
		}
		if (!cart) {
			return "Cart is not existed";
		}
		let existedProduct = cart.products.find((cProduct) => cProduct._id.toString() === productId);
		if (product.stock + existedProduct.quantity < quantity) {
			return `Product don't have enough ${quantity} product. Current stock now: ${product.stock}`
		}
		let totalQuantity = existedProduct ? quantity - existedProduct.quantity : quantity;
		let discountTotal = product.discountPercentage * totalQuantity * product.price / 100;
		let totalProduct = product.price * totalQuantity;
		let totalPrice = product.price * totalQuantity * (100 - product.discountPercentage) / 100;
		if (existedProduct) {
			existedProduct.quantity += totalQuantity;
			existedProduct.total += totalPrice;
		} else {
			cart.products.push({
				id: product._id,
				name: product.name,
				price: product.price,
				quantity: quantity,
				discountPercentage: product.discountPercentage,
				total: totalPrice
			});
		}
		cart.discountTotal += discountTotal;
		cart.totalProduct += totalProduct;
		cart.totalQuantity += totalQuantity;
		cart.totalPrice += totalPrice;
		product.stock -= totalQuantity;
		await cart.save();
		await product.save();
		return "Successfully!";
	} catch (error) {
		throw new Error(error.toString());
	}
}

const addProduct = async ({ productId, cartId, quantity, type }) => {
	try {
		const cart = await Cart.findById(cartId);
		const product = await Product.findById(productId);
		if (!product) {
			return "Product you add that is not existed";
		}
		if (product.stock < quantity) {
			return `Product don't have enough ${quantity} product. Current stock now: ${product.stock}`
		}
		if (!cart) {
			return "Cart is not existed";
		}
		let existedProduct = cart.products.find((cProduct) => cProduct._id.toString() === productId);

		let totalQuantity = quantity;
		let discountTotal = product.discountPercentage * totalQuantity * product.price / 100;
		let totalProduct = product.price * totalQuantity;
		let totalPrice = product.price * totalQuantity * (100 - product.discountPercentage) / 100;
		if (existedProduct) {
			existedProduct.quantity += totalQuantity;
			existedProduct.total += totalPrice;
		} else {
			cart.products.push({
				id: product._id,
				name: product.name,
				price: product.price,
				quantity: quantity,
				discountPercentage: product.discountPercentage,
				total: totalPrice
			});
		}
		cart.discountTotal += discountTotal;
		cart.totalProduct += totalProduct;
		cart.totalQuantity += totalQuantity;
		cart.totalPrice += totalPrice;
		product.stock -= totalQuantity;
		await cart.save();
		await product.save();
		return "Successfully!";
	} catch (error) {
		throw new Error(error.toString());
	}
}

const view = async (cartId) => {
	const cart = await Cart.findById(cartId);
	if (!cart) {
		return "Cart not existed!";
	}
	return cart;
}

const remove = async (productId, cartId) => {
	const cart = await Cart.findById(cartId);
	const currentProduct = await Product.findById(productId);
	const product = cart.products.find(product => product._id.toString() === productId);
	let totalQuantity = product.quantity;
	let discountTotal = product.discountPercentage * totalQuantity * product.price / 100;
	let totalProduct = product.price * totalQuantity;
	let totalPrice = product.price * totalQuantity * (100 - product.discountPercentage) / 100;
	cart.products = cart.products.filter(product => product._id.toString() !== productId);
	cart.discountTotal -= discountTotal;
	cart.totalProduct -= totalProduct;
	cart.totalQuantity -= totalQuantity;
	cart.totalPrice -= totalPrice;
	currentProduct.stock += product.quantity;
	await currentProduct.save();
	await cart.save();
	return cart;
}


const all = async (userId) => {
	console.log(userId);
	const listCart = await Cart.find({user: userId}).lean();
	for (const cart of listCart) {
		for (const product of cart.products) {
			const cProduct = await Product.findById(product._id);
			product.thumbnail = cProduct.thumbnail;
		}
	}
	return listCart;
};

export default {
	create,
	view,
	addProduct,
	all,
	addCustomProduct,
	remove
}