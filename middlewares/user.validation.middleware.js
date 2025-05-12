import { USER } from '../models/user.js';

const isGmail = (email) =>
	typeof email === 'string' && /^[\w.+-]+@gmail\.com$/.test(email);
const isPhoneValid = (phone) =>
	typeof phone === 'string' && /^\+380\d{9}$/.test(phone);
const isPasswordValid = (password) =>
	typeof password === 'string' && password.length >= 4;

const createUserValid = (req, res, next) => {
	const user = req.body;

	const allowedFields = Object.keys(USER).filter((key) => key !== 'id');
	const requiredFields = allowedFields;

	const hasAllFields = requiredFields.every(
		(field) => user[field] !== undefined
	);
	const hasNoExtraFields = Object.keys(user).every((field) =>
		allowedFields.includes(field)
	);
	const hasNoId = user.id === undefined;

	const isValid =
		hasAllFields &&
		hasNoExtraFields &&
		hasNoId &&
		isGmail(user.email) &&
		isPhoneValid(user.phone) &&
		isPasswordValid(user.password);

	if (!isValid) {
		return res.status(400).json({ error: 'Invalid user data' });
	}

	next();
};

const updateUserValid = (req, res, next) => {
	const user = req.body;

	const allowedFields = Object.keys(USER).filter((key) => key !== 'id');
	const keys = Object.keys(user);

	if (user.id !== undefined) {
		return res.status(400).json({ error: "Field 'id' is not allowed" });
	}

	if (keys.length === 0) {
		return res
			.status(400)
			.json({ error: 'At least one field must be provided' });
	}

	const hasOnlyAllowedFields = keys.every((key) => allowedFields.includes(key));
	if (!hasOnlyAllowedFields) {
		return res.status(400).json({ error: 'Some fields are not allowed' });
	}

	if (user.email && !isGmail(user.email)) {
		return res
			.status(400)
			.json({ error: 'Invalid email format (must be gmail)' });
	}

	if (user.phone && !isPhoneValid(user.phone)) {
		return res.status(400).json({ error: 'Invalid phone format' });
	}

	if (user.password && !isPasswordValid(user.password)) {
		return res
			.status(400)
			.json({ error: 'Password must be at least 4 characters' });
	}

	next();
};

export { createUserValid, updateUserValid };
