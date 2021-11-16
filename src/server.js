import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Fastify from 'fastify';
const qs = require('qs');

class Server {
	fastify;
	port;

	constructor({ port = process.env.PORT || 3000 } = {}) {
		this.fastify = Fastify({
			logger: false,
			querystringParser: (str) => qs.parse(str),
		});
		this.port = port;
	}

	async start() {
		try {
			await this.fastify.listen(this.port);
		} catch (err) {
			this.fastify.log.error(err);
			process.exit(1);
		}
	}
}

export { Server };
