import app from '../app';

import TemperatureRoutes from '../apiServices/Temperature/routes';

app.route(TemperatureRoutes.DefaultRoute);
app.route(TemperatureRoutes.CustomRoute);
