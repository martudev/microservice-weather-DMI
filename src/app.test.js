import supertest from 'supertest';
import app from './app';

describe('End Points', () => {
	const api = supertest(app.server);

	it('GET `/` route --> 404 found', async () => {
		await app.ready();
		await api.get('/').expect(404);
	});

	it('GET `/temperature` route --> json format', async () => {
		await app.ready();
		const response = await api
			.get('/temperature')
			.expect('Content-Type', /application\/json/)
			.expect(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				timezone: expect.any(String),
				lat: expect.any(Number),
				lon: expect.any(Number),
				temp: expect.any(Number),
				more_than_15dg: expect.any(Boolean),
			}),
		);
	});

	it('(1) GET `/temperature/custom` route --> json format', async () => {
		await app.ready();
		const queryParameters = { lat: 10, lon: 10 };
		const response = await api
			.get('/temperature/custom')
			.query(queryParameters)
			.expect('Content-Type', /application\/json/)
			.expect(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				timezone: expect.any(String),
				lat: expect.any(Number),
				lon: expect.any(Number),
				temp: expect.any(Number),
				more_than_15dg: expect.any(Boolean),
			}),
		);
	});

	it('(2) GET `/temperature/custom` route --> json format', async () => {
		await app.ready();
		const queryParameters = { lat: 1000000, lon: 10 };
		await api
			.get('/temperature/custom')
			.query(queryParameters)
			.expect('Content-Type', /application\/json/)
			.expect(400);
	});

	it('(3) GET `/temperature/custom` route --> json format', async () => {
		await app.ready();
		const queryParameters = { lat: 'error', lon: 'error' };
		await api
			.get('/temperature/custom')
			.query(queryParameters)
			.expect('Content-Type', /application\/json/)
			.expect(400);
	});

	it('(4) GET `/temperature/custom` route --> json format', async () => {
		await app.ready();
		const queryParameters = { lon: 10 };
		const response = await api
			.get('/temperature/custom')
			.query(queryParameters)
			.expect('Content-Type', /application\/json/)
			.expect(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				timezone: expect.any(String),
				lat: expect.any(Number),
				lon: expect.any(Number),
				temp: expect.any(Number),
				more_than_15dg: expect.any(Boolean),
			}),
		);
	});

	it('(5) GET `/temperature/custom` route --> json format', async () => {
		await app.ready();
		const queryParameters = { lat: 10 };
		const response = await api
			.get('/temperature/custom')
			.query(queryParameters)
			.expect('Content-Type', /application\/json/)
			.expect(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				timezone: expect.any(String),
				lat: expect.any(Number),
				lon: expect.any(Number),
				temp: expect.any(Number),
				more_than_15dg: expect.any(Boolean),
			}),
		);
	});

	it('(6) GET `/temperature/custom` route --> json format', async () => {
		await app.ready();
		const queryParameters = {};
		await api
			.get('/temperature/custom')
			.query(queryParameters)
			.expect('Content-Type', /application\/json/)
			.expect(500);
	});

	it('(7) GET `/temperature/custom` route --> json format', async () => {
		await app.ready();
		const queryParameters = { lat: { test: 'example' }, lon: 10 };
		await api
			.get('/temperature/custom')
			.query(queryParameters)
			.expect('Content-Type', /application\/json/)
			.expect(400);
	});
});

describe('Testing enviroment variables', () => {
	const OLD_OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

	beforeEach(() => {
		jest.resetModules();
	});

	test('GET /temperature && /temperature/custom | removing `OPEN_WEATHER_API_KEY` api key', async () => {
		const api = supertest(app.server);
		await app.ready();
		delete process.env.OPEN_WEATHER_API_KEY;

		await api.get('/temperature').expect(500);
		await api
			.get('/temperature/custom')
			.query({ lat: 10, long: 10 })
			.expect(500);
	});

	test('GET /temperature && /temperature/custom | setting a not valid `OPEN_WEATHER_API_KEY` api key', async () => {
		const api = supertest(app.server);
		await app.ready();
		process.env.OPEN_WEATHER_API_KEY = 'not_valid_api_key';

		await api.get('/temperature').expect(401);
		await api
			.get('/temperature/custom')
			.query({ lat: 10, long: 10 })
			.expect(401);
	});

	test('setting `NODE_ENV` to `production`', async () => {
		process.env.NODE_ENV = 'production';
		process.env.OPEN_WEATHER_API_KEY = OLD_OPEN_WEATHER_API_KEY;
		const supertest = await require('supertest');
		const app = await require('./app').default;
		const api = supertest(app.server);
		await app.ready();

		await api.get('/temperature').expect(200);
		await api
			.get('/temperature/custom')
			.query({ lat: 10, long: 10 })
			.expect(200);
	});

	test('setting `NODE_ENV` to `development`', async () => {
		process.env.NODE_ENV = 'development';
		process.env.OPEN_WEATHER_API_KEY = OLD_OPEN_WEATHER_API_KEY;
		const supertest = await require('supertest');
		const app = await require('./app').default;
		const api = supertest(app.server);
		await app.ready();

		await api.get('/temperature').expect(200);
		await api
			.get('/temperature/custom')
			.query({ lat: 10, long: 10 })
			.expect(200);
	});
});
