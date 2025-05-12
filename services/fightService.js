import { fightRepository } from '../repositories/fightRepository.js';

class FightersService {
	async getAllFights() {
		try {
			return await fightRepository.getAll();
		} catch (err) {
			throw new Error('Error fetching fights: ' + err.message);
		}
	}
	async getFightById(id) {
		try {
			return await fightRepository.getById(id);
		} catch (err) {
			throw new Error('Error fetching fight: ' + err.message);
		}
	}
	async createFight(fightData) {
		try {
			return await fightRepository.create(fightData);
		} catch (err) {
			throw new Error('Error creating fight: ' + err.message);
		}
	}

	async updateFight(id, fightData) {
		try {
			return await fightRepository.update(id, fightData);
		} catch (err) {
			throw new Error('Error updating fight: ' + err.message);
		}
	}
	async deleteFight(id) {
		try {
			return await fightRepository.delete(id);
		} catch (err) {
			throw new Error('Error deleting fight: ' + err.message);
		}
	}
}

const fightersService = new FightersService();

export { fightersService };
