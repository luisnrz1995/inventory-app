const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

// 🔒 Rutas específicas primero
router.post('/registrar', userCtrl.registrar);
router.post('/login', userCtrl.login);

// CRUD después
router.get('/', userCtrl.obtenerUsuarios);
router.get('/:id', userCtrl.obtenerUsuario);
router.put('/:id', userCtrl.actualizarUsuario);
router.delete('/:id', userCtrl.eliminarUsuario);

module.exports = router;