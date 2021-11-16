require('dotenv').config();

import Fastify from 'fastify';
import qs from 'qs';

const app = Fastify({
	logger: true,
	querystringParser: (str) => qs.parse(str),
});

export default app;
