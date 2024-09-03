const swaggerAutogen = require('swagger-autogen')();
const path = require('path');

const outputFile = path.join(__dirname, 'swagger-output.json');
const endpoints = [
  './routes/usuarios.js',
  './routes/livros.js',
  './routes/generos.js',
  './routes/editoras.js',
  './routes/promocoes.js'
]

const doc = {
  info: {
    title: 'Todolist API',
    description: 'Documentação da API para o projeto Todolist REST',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpoints, doc).then(() => {
  require('./app');
});
