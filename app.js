const express = require("express")
require("dotenv").config()

const app = express()
app.use(express.json())

const install = require('./controllers/installController')
const usuariosRoutes = require('./routes/usuarios')
const livrosRoutes = require('./routes/livros')
const editorasRoutes = require('./routes/editoras')
const generosRoutes = require('./routes/generos')

app.use('/install', install)
app.use('/api', usuariosRoutes);
app.use('/api', livrosRoutes)
app.use('/api', editorasRoutes)
app.use('/api', generosRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
});