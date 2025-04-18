const token = localStorage.getItem('token');
const API_URL = 'http://localhost:4000/api/productos';

// Redirigir si no hay token (usuario no autenticado)
if (!token) {
  alert('Debes iniciar sesión');
  window.location.href = 'index.html';
}

let productoEditando = null;

// === Cargar productos del usuario ===
async function cargarProductos() {
  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    const productos = await res.json();
    const tabla = document.getElementById('tablaProductos');
    tabla.innerHTML = '';

    productos.forEach(producto => {
      tabla.innerHTML += `
        <tr>
          <td>${producto.nombre}</td>
          <td>${producto.descripcion || '-'}</td>
          <td>$${producto.precio.toFixed(2)}</td>
          <td>${producto.disponible ? '✅' : '❌'}</td>
          <td>
            <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
              <button class="btn btn-sm btn-warning" onclick="editarProducto('${producto._id}')">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${producto._id}')">Eliminar</button>
            </div>
          </td>
        </tr>
      `;
    });

  } catch (error) {
    alert('Error al cargar productos');
  }
}

// === Guardar o actualizar producto ===
document.getElementById('formProducto').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const disponible = document.getElementById('disponible').checked;

  const payload = { nombre, descripcion, precio, disponible };

  try {
    const res = await fetch(
      productoEditando ? `${API_URL}/${productoEditando}` : API_URL,
      {
        method: productoEditando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert(productoEditando ? 'Producto actualizado' : 'Producto guardado');
      e.target.reset();
      productoEditando = null;
      document.querySelector('#formProducto button').textContent = 'Guardar producto';
      cargarProductos();
    } else {
      alert(data.msg || 'Error al guardar producto');
    }
  } catch (error) {
    alert('Error de conexión con el servidor');
  }
});

// === Eliminar producto del usuario ===
async function eliminarProducto(id) {
  if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    if (res.ok) {
      alert('Producto eliminado');
      cargarProductos();
    } else {
      alert('No se pudo eliminar el producto');
    }
  } catch (err) {
    alert('Error al eliminar el producto');
  }
}

// === Editar producto ===
async function editarProducto(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    const producto = await res.json();

    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('disponible').checked = producto.disponible;

    productoEditando = producto._id;
    document.querySelector('#formProducto button').textContent = 'Actualizar producto';

  } catch (err) {
    alert('Error al cargar producto para editar');
  }
}

// === Inicializar ===
cargarProductos();