import { Router } from 'express';
import { fighterService } from '../services/fighterService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';
import {
	createFighterValid,
	updateFighterValid,
} from '../middlewares/fighter.validation.middleware.js';

const router = Router();

router.get(
	'/',
	async (req, res, next) => {
		console.log('GET /api/fighters request received');
		try {
			const fighters = await fighterService.getAllFighters();
			res.data = fighters;
		} catch (err) {
			console.error('Error occurred:', err);
			res.err = err;
		} finally {
			next();
		}
	},
	responseMiddleware
);

router.get(
	'/:id',
	async (req, res, next) => {
		try {
			const fighter = await fighterService.getFighterById(req.params.id);
			if (!fighter) {
				throw new Error('Fighter not found');
			}
			res.data = fighter;
		} catch (err) {
			res.err = err;
		} finally {
			next();
		}
	},
	responseMiddleware
);

router.post(
	'/',
	createFighterValid,
	async (req, res, next) => {
		try {
			const fighterData = req.body;
			const newFighter = await fighterService.createFighter(fighterData);
			res.data = newFighter;
		} catch (err) {
			res.err = err;
		} finally {
			next();
		}
	},
	responseMiddleware
);

router.patch(
	'/:id',
	updateFighterValid,
	async (req, res, next) => {
		try {
			const fighterData = req.body;
			const updatedFighter = await fighterService.updateFighter(
				req.params.id,
				fighterData
			);
			if (!updatedFighter) {
				throw new Error('Fighter not found');
			}
			res.data = updatedFighter;
		} catch (err) {
			res.err = err;
		} finally {
			next();
		}
	},
	responseMiddleware
);

router.delete(
	'/:id',
	async (req, res, next) => {
		try {
			const deletedFighter = await fighterService.deleteFighter(req.params.id);
			if (!deletedFighter) {
				throw new Error('Fighter not found');
			}
			res.data = { message: 'Fighter deleted successfully' };
		} catch (err) {
			res.err = err;
		} finally {
			next();
		}
	},
	responseMiddleware
);

export { router };
