// --- Used because @babel/polyfill was deprecated on v7.4 ---
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import app from './app';
import './routes';

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await app.listen(port);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
