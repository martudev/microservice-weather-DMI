// --- Used because @babel/polyfill was deprecated on v7.4 ---
import 'core-js/stable';
import 'regenerator-runtime/runtime';

require('dotenv').config();

import { Server } from './server';
import { Temperature } from './Temperature';

const server = new Server();

server.fastify.get('/', async () => {
	const temperature = new Temperature({ lat: -36.2449366, lon: -57.8939405 });
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
});

server.fastify.get('/custom', async (request) => {
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

server.start();
