import mongoose, { ObjectId, Schema } from "mongoose";

const User = mongoose.model("User", new Schema(
	{
		id: ObjectId,
		username: {
			type: String,
			require: true
		},
		password: {
			type: String,
			require: true
		},
		email: {
			type: String,
			require: true
		}
	}))

export default User;

