const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');

const Usuario = sequelize.define('Usuario', {
  nomeUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      arg: true,
      msg: 'Já existe um usuário com esse nomeUsuario'
    },
    validate: {
      notNull: { msg: "O nomeUsuario não pode estar vazio" }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "A senha não pode estar vazia" },
    }
  },
  idade: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: { msg: "A idade deve ser um número inteiro" }
    }
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: { msg: "O email deve ser um email válido" }
    }
  },
  papel: {
    type: DataTypes.ENUM('admin', 'usuario'),
    defaultValue: 'usuario'
  }
});

module.exports = {
  list: async function () {
    const usuarios = await Usuario.findAll()
    return usuarios
  },

  save: async function (nomeUsuario, senha, idade, email, papel) {
    const usuario = await Usuario.create({
      nomeUsuario, senha, idade, email, papel
    })
    return usuario
  },

  update: async function (id, obj) {
    let usuario = await Usuario.findByPk(id)
    if (!usuario) {
      return false
    }

    Object.keys(obj).forEach(key => usuario[key] = obj[key])
    await usuario.save()
    return usuario
  },

  delete: async function (id) {
    const usuario = await Usuario.findByPk(id)
    return usuario.destroy()
  },

  getByNomeUsuario: async function (nome) {
    return await Usuario.findOne({
      where: {
        nomeUsuario: nome
      }
    })
  },

  getById: async function(id) {
    return await Usuario.findByPk(id)
  },

  bulkCreate: async function (obj) {
    const usuarios = await Usuario.bulkCreate(obj)
    return usuarios
  },

  Model: Usuario
};

