import { userRepository } from '../repositories/userRepository.js';

class UserService {
	search(search) {
		const item = userRepository.getOne(search);
		if (!item) {
			return null;
		}
		return item;
	}

	async createUser(userData) {
		const existingUserByEmail = await userRepository.getOne({
			email: userData.email,
		});
		const existingUserByPhone = await userRepository.getOne({
			phone: userData.phone,
		});

		if (existingUserByEmail) {
			const err = new Error('User with this email already exists');
			err.isValidationError = true;
			throw err;
		}
		if (existingUserByPhone) {
			const err = new Error('User with this phone number already exists');
			err.isValidationError = true;
			throw err;
		}

		const newUser = await userRepository.create(userData);
		return newUser;
	}

	async updateUser(id, updateData) {
		const existingUser = await userRepository.getOne({ id });
		if (!existingUser) {
			const err = new Error('User not found');
			err.isNotFound = true;
			throw err;
		}

		const updatedUser = await userRepository.update(id, updateData);
		return updatedUser;
	}

	async deleteUser(id) {
		const existingUser = await userRepository.getOne({ id });
		if (!existingUser) {
			const err = new Error('User not found');
			err.isNotFound = true;
			throw err;
		}

		await userRepository.delete(id);
		return { message: 'User deleted successfully' };
	}

	async getAllUsers() {
		const users = await userRepository.getAll();
		return users;
	}

	async getUserById(id) {
		const user = await userRepository.getOne({ id });
		if (!user) {
			const err = new Error('User not found');
			err.isNotFound = true;
			throw err;
		}
		return user;
	}
}

const userService = new UserService();

export { userService };
