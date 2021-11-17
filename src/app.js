require('dotenv').config();

import Fastify from 'fastify';
import qs from 'qs';
import { register } from './routes';

const logger = process.env.NODE_ENV === 'test' ? false : true;

const app = Fastify({
	logger: logger,
	querystringParser: (str) => qs.parse(str),
});

register(app);

export default app;
