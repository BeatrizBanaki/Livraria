const express = require('express');
const router = express.Router();
const sequelize = require('../helpers/bd');

const Usuario = require('../model/usuarioModel');
const Livro = require('../model/livroModel');
const Editora = require('../model/editoraModel');
const Genero = require('../model/generoModel')

router.get('/', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    let usuarios = await Usuario.bulkCreate([
      { nomeUsuario: 'admin', senha: 'admin', papel: 'admin' },
      { nomeUsuario: 'usuario1', senha: 'usuario1', papel: 'usuario' }
    ]);

    let editoras = await Editora.bulkCreate([
      { nome: 'Editora Bloomsbury Publishing' },
      { nome: 'Editora Intrínseca' },
      { nome: 'Editora HarperCollins Brasil' },
      { nome: 'Editora Nova Fronteira' },
      { nome: 'Editora Paulus Editora' }
    ]);

    let generos = await Genero.bulkCreate([
      { nome: 'Ficção', subgenero: 'Medieval' },
      { nome: 'Ficção', subgenero: 'Espacial' },
      { nome: 'Romance' },
      { nome: 'Terror', subgenero: 'Realista' },
      { nome: 'Poesia', subgenero: 'Brasileira' }
    ]);

    let livros = await Livro.bulkCreate([
      { titulo: 'Livro 1', autor: 'Autor 1', preco: 10, editora: 1, genero: 1 },
      { titulo: 'Livro 2', autor: 'Autor 2', preco: 15, editora: 1, genero: 2 },
      { titulo: 'Livro 3', autor: 'Autor 3', preco: 20, editora: 2, genero: 1 },
      { titulo: 'Livro 4', autor: 'Autor 4', preco: 40, editora: 3, genero: 5 },
      { titulo: 'Livro 5', autor: 'Autor 5', preco: 60, editora: 5, genero: 4 }
    ]);
    res.json({ status: true, editoras, generos, livros, usuarios })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao instalar o banco de dados' });
  }
});

module.exports = router;