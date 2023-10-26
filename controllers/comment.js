import { commentRepository } from "../repositories/index.js";

const create = async (req, res) => {
	const { productId, title, body, userId } = req.body;
	try {
		const newComment = await commentRepository.create({ productId, title, body, userId });
		return res.status(201).json({ newComment });
	} catch (error) {
		return res.status(500).json(error.toString());
	}
}

const view = async () => {

}

export default {
	create,
	view
}