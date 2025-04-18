const express = require('express');
const router = express.Router();
const productoCtrl = require('../controllers/productoController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, productoCtrl.crearProducto);
router.get('/', auth, productoCtrl.obtenerProductos);
router.get('/:id', auth, productoCtrl.obtenerProductoPorId);
router.put('/:id', auth, productoCtrl.actualizarProducto);
router.delete('/:id', auth, productoCtrl.eliminarProducto);

module.exports = router;