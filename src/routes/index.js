import TemperatureRoutes from '../apiServices/Temperature/routes';

const register = (app) => {
	app.route(TemperatureRoutes.DefaultRoute);
	app.route(TemperatureRoutes.CustomRoute);
};

export { register };
