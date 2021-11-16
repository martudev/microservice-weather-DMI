// docs: https://www.fastify.io/docs/latest/Routes/

import { DefaultHandler, CustomHandler } from './controller';

const DefaultRoute = {
	method: 'GET',
	url: '/temperature',
	handler: DefaultHandler,
};

const CustomRoute = {
	method: 'GET',
	url: '/temperature/custom',
	schema: {
		querystring: {
			lat: { type: 'integer' },
			lon: { type: 'integer' },
		},
	},
	handler: CustomHandler,
};

module.exports = { DefaultRoute, CustomRoute };
