import { Router } from 'express';
import { fightersService } from '../services/fightService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const fights = await fightersService.getAllFights();
		res.data = fights;
	} catch (err) {
		res.err = err;
	} finally {
		next();
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const fight = await fightersService.getFightById(req.params.id);
		if (!fight) {
			throw new Error('Fight not found');
		}
		res.data = fight;
	} catch (err) {
		res.err = err;
	} finally {
		next();
	}
});

router.post('/', async (req, res, next) => {
	try {
		const fightData = req.body;
		const newFight = await fightersService.createFight(fightData);
		res.data = newFight;
	} catch (err) {
		res.err = err;
	} finally {
		next();
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const fightData = req.body;
		const updatedFight = await fightersService.updateFight(
			req.params.id,
			fightData
		);
		if (!updatedFight) {
			throw new Error('Fight not found');
		}
		res.data = updatedFight;
	} catch (err) {
		res.err = err;
	} finally {
		next();
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const deletedFight = await fightersService.deleteFight(req.params.id);
		if (!deletedFight) {
			throw new Error('Fight not found');
		}
		res.data = { message: 'Fight deleted successfully' };
	} catch (err) {
		res.err = err;
	} finally {
		next();
	}
});

router.use(responseMiddleware);

export { router };
