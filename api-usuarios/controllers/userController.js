const Usuario = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.registrar = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  const existe = await Usuario.findOne({ correo });
  if (existe) return res.status(400).json({ msg: 'El correo ya está registrado' });

  const hash = await bcrypt.hash(contraseña, 10);
  const nuevoUsuario = new Usuario({ nombre, correo, contraseña: hash });
  await nuevoUsuario.save();
  res.status(201).json({ msg: 'Usuario creado correctamente' });
};

// Login
exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;
  const usuario = await Usuario.findOne({ correo });
  if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

  const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!esValido) return res.status(401).json({ msg: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

// CRUD
exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

exports.obtenerUsuario = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
};

exports.actualizarUsuario = async (req, res) => {
  await Usuario.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: 'Usuario actualizado' });
};

exports.eliminarUsuario = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Usuario eliminado' });
};