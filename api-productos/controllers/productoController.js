const Producto = require('../models/productoModel');

// Crear producto asociado al usuario
exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto({ ...req.body, usuario: req.usuarioId });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(400).json({ msg: 'Error al crear producto', error: err.message });
  }
};

// Obtener solo productos del usuario autenticado
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ usuario: req.usuarioId });
    res.json(productos);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener productos' });
  }
};

// Obtener producto específico (propiedad del usuario)
exports.obtenerProductoPorId = async (req, res) => {
  const producto = await Producto.findOne({ _id: req.params.id, usuario: req.usuarioId });
  if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
  res.json(producto);
};

// Actualizar producto si pertenece al usuario
exports.actualizarProducto = async (req, res) => {
  const actualizado = await Producto.findOneAndUpdate(
    { _id: req.params.id, usuario: req.usuarioId },
    req.body,
    { new: true }
  );
  if (!actualizado) return res.status(404).json({ msg: 'No autorizado o producto no existe' });
  res.json(actualizado);
};

// Eliminar producto si pertenece al usuario
exports.eliminarProducto = async (req, res) => {
  const eliminado = await Producto.findOneAndDelete({ _id: req.params.id, usuario: req.usuarioId });
  if (!eliminado) return res.status(404).json({ msg: 'No autorizado o producto no existe' });
  res.json({ msg: 'Producto eliminado correctamente' });
};