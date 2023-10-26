import Comment from "../models/Comment.js"
import Product from "../models/Product.js";

const create = async ({ userId, title, body, productId }) => {
	const comment = await Comment.create({ user: userId, title, body })
	await Product.findByIdAndUpdate(productId, { $push: { comments: comment._id } })
	const commentWithUser = await comment.populate({
		path: 'user',
		select: 'username'
	});
	return commentWithUser;
}

const view = async () => {

}

export default {
	create,
	view
}