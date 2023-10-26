import { userRepository } from "../repositories/index.js";

const create = async (req, res) => {

	// Destructuring Request object
	const { username, email, password } = req.body;
	try {
		// Call action cua Repository (DAO)
		const newUser = await userRepository.create({ username, email, password });
		return res.status(201).json({
			message: 'Create successfully.',
			data: newUser
		})
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const userInfo = await userRepository.login({ email, password });
		return res.status(200).json(userInfo);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

export default {
	create,
	login
}