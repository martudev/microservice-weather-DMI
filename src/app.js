// --- Used because @babel/polyfill was deprecated on v7.4 ---
import 'core-js/stable';
import 'regenerator-runtime/runtime';

require('dotenv').config();

import { Temperature } from './apiServices/Temperature';
import Fastify from 'fastify';
import qs from 'qs';

const app = Fastify({
	logger: true,
	querystringParser: (str) => qs.parse(str),
});

app.get('/', async () => {
	try {
		const {
			timezone,
			lat,
			lon,
			current: { temp },
		} = await Temperature.get({ lat: -36.2449366, lon: -57.8939405 });
		return {
			timezone: timezone,
			lat: lat,
			lon: lon,
			temp: temp,
			more_than_15dg: temp > 15,
		};
	} catch (e) {
		console.log(e.response.data);
		return e.response.data;
	}
});

app.get('/custom', async (request) => {
	if (Object.keys(request.query).length === 0)
		throw new Error('No query params. ej: lat, lon');
	const temperature = new Temperature({
		lat: request.query.lat,
		lon: request.query.lon,
	});
	try {
		const {
			timezone,
			lat,
			lon,
			current: { temp },
		} = await temperature.get();
		return {
			timezone: timezone,
			lat: lat,
			lon: lon,
			temp: temp,
			more_than_15dg: temp > 15,
		};
	} catch (e) {
		console.log(e.response.data);
		return e.response.data;
	}
});

export default app;
