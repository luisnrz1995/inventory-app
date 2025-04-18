// === LOGIN ===
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;

    try {
      const res = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        window.location.href = 'inventario.html';
      } else {
        alert(data.msg || 'Credenciales incorrectas');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  });
}

// === REGISTRO ===
const registroForm = document.getElementById('registroForm');

if (registroForm) {
  registroForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
      const res = await fetch('http://localhost:3000/api/usuarios/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, contraseña })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registro exitoso. Ahora inicia sesión.');
        window.location.href = 'index.html';
      } else {
        alert(data.msg || 'No se pudo registrar el usuario');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  });
}