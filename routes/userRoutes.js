import { Router } from 'express';
import { userService } from '../services/userService.js';
import {
	createUserValid,
	updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

router.get(
	'/',
	async (req, res, next) => {
		try {
			const users = await userService.getAllUsers();
			res.data = users;
			next();
		} catch (err) {
			res.err = err;
			next();
		}
	},
	responseMiddleware
);

router.get(
	'/:id',
	async (req, res, next) => {
		try {
			const user = await userService.getUserById(req.params.id);
			if (!user) {
				res.status(404);
				res.err = { message: 'User not found' };
			} else {
				res.data = user;
			}
			next();
		} catch (err) {
			res.err = err;
			next();
		}
	},
	responseMiddleware
);

router.post(
	'/',
	createUserValid,
	async (req, res, next) => {
		try {
			const createdUser = await userService.createUser(req.body);
			res.data = createdUser;
			next();
		} catch (err) {
			res.err = err;
			next();
		}
	},
	responseMiddleware
);

router.patch(
	'/:id',
	updateUserValid,
	async (req, res, next) => {
		try {
			const updatedUser = await userService.updateUser(req.params.id, req.body);
			if (!updatedUser) {
				res.status(404);
				res.err = { message: 'User not found or update failed' };
			} else {
				res.data = updatedUser;
			}
			next();
		} catch (err) {
			res.err = err;
			next();
		}
	},
	responseMiddleware
);

router.delete(
	'/:id',
	async (req, res, next) => {
		try {
			const deletedUser = await userService.deleteUser(req.params.id);
			if (!deletedUser) {
				res.status(404);
				res.err = { message: 'User not found or delete failed' };
			} else {
				res.data = deletedUser;
			}
			next();
		} catch (err) {
			res.err = err;
			next();
		}
	},
	responseMiddleware
);

export { router };
