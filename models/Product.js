import mongoose, { Mongoose, ObjectId, Schema } from "mongoose";

const Product = mongoose.model("Product", new Schema({
	id: ObjectId,
	name: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	price: {
		type: Number,
		require: true
	},
	discountPercentage: {
		type: Number,
		require: true,
	},
	stock: {
		type: Number,
		require: true
	},
	brand: {
		type: String,
		require: true
	},
	thumbnail: {
		type: String,
		require: false
	},
	images: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Image",
			},
			url: {
				type: String,
				require: false
			},
			caption: {
				type: String,
				require: false
			}
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
}))

export default Product;

