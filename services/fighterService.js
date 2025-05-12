import { fighterRepository } from '../repositories/fighterRepository.js';

class FighterService {
	async getAllFighters() {
		try {
			const fighters = await fighterRepository.getAll();
			return fighters;
		} catch (err) {
			throw new Error('Error fetching fighters: ' + err.message);
		}
	}

	async getFighterById(id) {
		try {
			const fighter = await fighterRepository.getOne({ id });
			return fighter;
		} catch (err) {
			throw new Error('Error fetching fighter: ' + err.message);
		}
	}

	async createFighter(fighterData) {
		try {
			const newFighter = await fighterRepository.create(fighterData);
			return newFighter;
		} catch (err) {
			throw new Error('Error creating fighter: ' + err.message);
		}
	}

	async updateFighter(id, fighterData) {
		try {
			const updatedFighter = await fighterRepository.update(id, fighterData);
			return updatedFighter;
		} catch (err) {
			throw new Error('Error updating fighter: ' + err.message);
		}
	}

	async deleteFighter(id) {
		try {
			const deletedFighter = await fighterRepository.delete(id);
			return deletedFighter;
		} catch (err) {
			throw new Error('Error deleting fighter: ' + err.message);
		}
	}
}

const fighterService = new FighterService();

export { fighterService };
