# microservice-weather-DMI

A microservice to know if the temperature of a city is greater or less than 15 degrees

## Getting started

Primero que nada necesitamos instalar las dependencias para correr nuestra app

```
npm install
```

Luego debemos crear un archvivo en la carpeta main, lo vamos a llamar `.env`, ahi necesitaremos nuestra **API_KEY** de [OpenWeather](https://openweathermap.org/). Y definiremos la siguiente variable de entorno.

```
OPEN_WEATHER_API_KEY=<my_key>
```

Para iniciar nuestra aplicacion lo podemos hacer corriendo el comando

```
npm start
```

## Tests

Para correr los test podemos usar el siguiente comando

```
npm test
```

Y si queremos correrlos con coverage

```
npm run test:coverage
```

## EndPoints

### http://localhost:3000/temperature

Obtiene un `json` que verifica que la temperatura sea mayor o menor a 15°C en la localidad de Rio Cuarto, Argentina.

### http://localhost:3000/temperature/custom

Obtiene un `json` que verifica que la temperatura sea mayor o menor a 15°C en cualquier parte del mundo. Le debes pasar dos parametros en la url, **lat**(latitude) y **lon**(longitude). Ej: `http://localhost:3000/temperature/custom?lat=-34.6158037&lon=-58.5033381` (Buenos aires, Argentina)
