const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');
const Editora = require('./editoraModel');
const Genero = require('./generoModel');
const { list } = require('./usuarioModel');

const Livro = sequelize.define('Livro', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "O título não pode estar vazio" },
      len: {
        args: [1, 255],
        msg: "O título deve ter entre 1 e 255 caracteres"
      }
    }
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "O autor não pode estar vazio" }
    }
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "O preço deve ser um número" },
      min: {
        args: [0],
        msg: "O preço deve ser um número positivo"
      },
      notNull: { msg: "O preco não pode estar vazio" }
    }
  }
});

Livro.belongsTo(Editora.Model, {
  foreignKey: 'editora'
})
Editora.Model.hasMany(Livro, {foreignKey: 'editora'})

Livro.belongsTo(Genero.Model, {
  foreignKey: 'genero'
})
Genero.Model.hasMany(Livro, {foreignKey: 'genero'})

module.exports = {
  getById: async function(id) {
    const livro = await Livro.findByPk(id);
    return livro
  },

  list: async function (limit, offset) {
    const livros = await Livro.findAndCountAll({ limit, offset });
    return livros.rows
  },

  listAll: async function () {
    const livros = await Livro.findAll();
    return livros;
  },

  save: async function (titulo, autor, preco, editora, genero) {
    const livro = await Livro.create({titulo, autor, preco, editora, genero})
    return livro
  },

  update: async function (id, obj) {
    let livro = await Livro.findByPk(id)
    if (!livro) {
      return false
    }

    Object.keys(obj).forEach(key => livro[key] = obj[key])
    await livro.save()
    return livro
  },

  delete: async function (id) {
    const livro = await Livro.findByPk(id)
    if (!livro) {
      return false
    }

    livro.destroy()
    return livro
  },

  bulkCreate: async function (obj) {
    const livros = await Livro.bulkCreate(obj)
    return livros
  },

  Model: Livro
};