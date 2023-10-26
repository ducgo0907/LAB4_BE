import mongoose, { ObjectId, Schema } from "mongoose";

const Image = mongoose.model("Image", new Schema({
	id: ObjectId,
	url: {
		type: String,
		require: false
	},
	caption: {
		type: String,
		require: false
	},
	createdAt: {
		type: Date,
		require: false
	},
	path: {
		type: String,
		require: false
	}
}))

export default Image;

