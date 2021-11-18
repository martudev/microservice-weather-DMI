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
