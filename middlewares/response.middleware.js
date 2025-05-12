const responseMiddleware = (req, res, next) => {
	if (res.err) {
		if (res.err.isValidationError) {
			return res.status(400).json({
				error: true,
				message: res.err.message || 'Bad request',
			});
		}
		if (res.err.isNotFound) {
			return res.status(404).json({
				error: true,
				message: res.err.message || 'Not found',
			});
		}
		return res.status(500).json({
			error: true,
			message: res.err.message || 'Something went wrong',
		});
	}
	if (res.data) {
		return res.status(200).json({
			data: res.data,
		});
	}
	next();
};

export { responseMiddleware };
