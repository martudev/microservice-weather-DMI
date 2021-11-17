import { Temperature } from '.';
import lodash from 'lodash';
import APIKeyError from '../../exceptions/APIKeyError';

const DefaultHandler = async (request, reply) => {
	try {
		const {
			timezone,
			lat,
			lon,
			current: { temp },
		} = await Temperature.get({ lat: -33.1242434, lon: -64.41223 });
		return {
			timezone: timezone,
			lat: lat,
			lon: lon,
			temp: temp,
			more_than_15dg: temp > 15,
		};
	} catch (e) {
		if (e instanceof APIKeyError) {
			console.log(e);
			reply.code(500).send({
				code: 500,
				message: 'An error occurred with an invalid api key',
			});
		} else {
			console.log(e.response.data);
			reply.code(e.response.status).send(e.response.data);
		}
	}
};

const CustomHandler = async (request, reply) => {
	// It seemed better to use the query params since it was a simple example
	// with few fields, besides that it would be tested from the web browser without
	// any graphical UI interface.
	if (lodash.isEmpty(request.query))
		throw new Error('No query params. ej: lat, lon');
	try {
		const {
			timezone,
			lat,
			lon,
			current: { temp },
		} = await Temperature.get({
			lat: request.query.lat,
			lon: request.query.lon,
		});
		return {
			timezone: timezone,
			lat: lat,
			lon: lon,
			temp: temp,
			more_than_15dg: temp > 15,
		};
	} catch (e) {
		if (e instanceof APIKeyError) {
			console.log(e);
			reply.code(500).send({
				code: 500,
				message: 'An error occurred with an invalid api key',
			});
		} else {
			console.log(e.response.data);
			reply.code(e.response.status).send(e.response.data);
		}
	}
};

export { DefaultHandler, CustomHandler };
