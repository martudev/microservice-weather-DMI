import axios from 'axios';

class Temperature {
	static async get({ lat = 0, lon = 0 } = {}) {
		const req = await axios.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`,
		);
		return req.data;
	}
}

export { Temperature };
