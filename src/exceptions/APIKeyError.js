class APIKeyError extends Error {
	constructor(message) {
		super(message);
		this.name = 'APIKeyError';
	}
}

export default APIKeyError;
