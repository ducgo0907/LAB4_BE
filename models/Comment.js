import mongoose, { ObjectId, Schema } from "mongoose";

const Comment = mongoose.model("Comment", new Schema(
	{
		id: ObjectId,
		title: {
			type: String,
			require: true
		},
		body: {
			type: String,
			require: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
))

export default Comment;

