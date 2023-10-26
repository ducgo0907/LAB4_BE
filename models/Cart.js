import mongoose, { ObjectId, Schema } from "mongoose";

const Cart = mongoose.model("Cart", new Schema({
	id: ObjectId,
	discountTotal: {
		type: Number,
		require: true
	},
	totalProduct: {
		type: Number,
		require: true
	},
	totalQuantity: {
		type: Number,
		require: true
	},
	totalPrice: {
		type: Number,
		require: true
	},
	products: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
			name: {
				type: String,
				require: false
			},
			price: {
				type: Number,
				require: false
			},
			quantity: {
				type: Number,
				require: false
			},
			discountPercentage: {
				type: Number,
				require: false
			},
			total: {
				type: Number,
				require: false
			}
		}
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
}))

export default Cart;

