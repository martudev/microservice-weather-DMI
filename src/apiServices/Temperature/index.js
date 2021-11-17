import axios from 'axios';
import APIKeyError from '../../exceptions/APIKeyError';

class Temperature {
	static async get({ lat = 0, lon = 0 } = {}) {
		if (process.env.OPEN_WEATHER_API_KEY == null)
			throw new APIKeyError('OPEN_WEATHER_API_KEY is not defined');
		const req = await axios.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`,
		);
		return req.data;
	}
}

export { Temperature };
