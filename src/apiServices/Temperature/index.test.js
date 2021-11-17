import { async } from 'regenerator-runtime';
import { Temperature } from './index';

test('ApiService - Temperature', async () => {
	// Needed to import config from .env
	await require('../../app');
	const data = await Temperature.get();
	expect(data).toBeDefined();
});
