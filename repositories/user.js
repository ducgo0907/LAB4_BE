import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const create = async ({ username, email, password }) => {
	// Kiem tra su ton tai cua User
	const existingUser = await User.findOne({ email }).exec();
	if (existingUser != null) {
		throw new Error("User is existed");
	}
	const hashPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_KEY));
	
	// Goi user model de thao tac du lieu
	const newUser = await User.create({
		username,
		email,
		password: hashPassword
	});
	return {
		...newUser._doc,
		password: 'Not Show'
	}
}

const login = async ({ email, password }) => {
	try {
		const loginUser = await User.findOne({ email }).exec();

		if (!loginUser) {
			throw new Error('User not found');
		}
		const passwordIsValid = bcrypt.compareSync(password, loginUser.password);

		if (!passwordIsValid) {
			throw new Error('Password invalid');
		}
		const jwtSecret = process.env.SECRET_KEY_JWT;
		const token = jwt.sign({ id: loginUser._id, username: loginUser.username, email: loginUser.email }, jwtSecret, {
			algorithm: 'HS256',
			expiresIn: 86400
		});
		return {
			id: loginUser._id,
			name: loginUser.username,
			email: loginUser.email,
			accessToken: token
		}
	} catch (error) {
		throw new Error(error);
	}
}

export default {
	create,
	login
};