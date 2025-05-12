import { Router } from 'express';
import { authService } from '../services/authService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

router.post(
	'/login',
	(req, res, next) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				throw new Error('Email and password are required');
			}

			const user = authService.login(email, password);

			if (!user) {
				throw new Error('Invalid email or password');
			}
			res.data = data;
		} catch (err) {
			res.err = err;
		} finally {
			next();
		}
	},
	responseMiddleware
);

export { router };
