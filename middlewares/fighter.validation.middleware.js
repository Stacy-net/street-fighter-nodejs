import { FIGHTER } from '../models/fighter.js';

const createFighterValid = (req, res, next) => {
	const { name, power, defense, health, id } = req.body;

	if (!name || !power || !defense) {
		return res.status(400).json({
			error: true,
			message: 'Fighter name, power, and defense are required.',
		});
	}

	if (typeof power !== 'number' || power < 1 || power > 100) {
		return res.status(400).json({
			error: true,
			message: 'Fighter power must be a number between 1 and 100.',
		});
	}

	if (typeof defense !== 'number' || defense < 1 || defense > 10) {
		return res.status(400).json({
			error: true,
			message: 'Fighter defense must be a number between 1 and 10.',
		});
	}

	if (health && (typeof health !== 'number' || health < 80 || health > 120)) {
		return res.status(400).json({
			error: true,
			message: 'Fighter health must be a number between 80 and 120.',
		});
	}

	const allowedFields = Object.keys(FIGHTER);
	for (const key in req.body) {
		if (!allowedFields.includes(key)) {
			return res.status(400).json({
				error: true,
				message: `Invalid field: ${key}`,
			});
		}
	}
	next();
};

const updateFighterValid = (req, res, next) => {
	const { name, power, defense, health } = req.body;

	if (!name && !power && !defense && !health) {
		return res.status(400).json({
			error: true,
			message: 'At least one field must be provided to update the fighter.',
		});
	}

	if (power && (typeof power !== 'number' || power < 1 || power > 100)) {
		return res.status(400).json({
			error: true,
			message: 'Fighter power must be a number between 1 and 100.',
		});
	}

	if (defense && (typeof defense !== 'number' || defense < 1 || defense > 10)) {
		return res.status(400).json({
			error: true,
			message: 'Fighter defense must be a number between 1 and 10.',
		});
	}

	if (health && (typeof health !== 'number' || health < 80 || health > 120)) {
		return res.status(400).json({
			error: true,
			message: 'Fighter health must be a number between 80 and 120.',
		});
	}

	const allowedFields = Object.keys(FIGHTER);
	for (const key in req.body) {
		if (!allowedFields.includes(key)) {
			return res.status(400).json({
				error: true,
				message: `Invalid field: ${key}`,
			});
		}
	}

	next();
};

export { createFighterValid, updateFighterValid };
