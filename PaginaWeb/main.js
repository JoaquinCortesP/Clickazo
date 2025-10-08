/* main.js
   Archivo unificado para Clickazo
   -> Registra, valida, autentica, maneja contacto y sesión.
   Comentarios incluidos para tu informe.
*/

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------
     UTIL: mostrar mensajes
     ----------------------- */
  function alertaTemporal(mensaje, tipo = "info", tiempo = 2000) {
    const cont = document.createElement("div");
    cont.className = `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-4`;
    cont.style.zIndex = 1080;
    cont.textContent = mensaje;
    document.body.appendChild(cont);
    setTimeout(() => cont.remove(), tiempo);
  }

  /* =========================
     CONTACTO: validación y UI
     - Formulario con id #formContacto
     - Muestra mensaje dentro de #resultado
     ========================= */
  const formContacto = document.getElementById("formContacto");
  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = (document.getElementById("nombre")||{}).value?.trim() || "";
      const correo = (document.getElementById("correo")||{}).value?.trim() || "";
      const mensaje = (document.getElementById("mensaje")||{}).value?.trim() || "";
      const resultado = document.getElementById("resultado");

      // validaciones simples
      if (!nombre || !correo || !mensaje) {
        if (resultado) { resultado.textContent = "⚠️ Por favor completa todos los campos."; resultado.style.color = "#c53030"; }
        return;
      }
      if (!correo.includes("@")) {
        if (resultado) { resultado.textContent = "⚠️ Ingresa un correo válido."; resultado.style.color = "#c53030"; }
        return;
      }

      // éxito
      if (resultado) { resultado.textContent = `✅ ¡Gracias por tu mensaje, ${nombre}!`; resultado.style.color = "#15803d"; }
      formContacto.reset();
    });
  }

  /* =========================
     REGISTRO: validar y guardar usuario (localStorage)
     - Formulario id #registroForm
     - Guarda en 'usuarios' (array) para permitir varios registros
     ========================= */
  const registroForm = document.getElementById("registroForm");
  if (registroForm) {
    // validación en tiempo real
    registroForm.addEventListener("input", validarRegistro);
    registroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validarRegistro()) return;

      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const password = document.getElementById("password").value.trim();

      // obtener array usuarios del localStorage o crear uno nuevo
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

      // verificar si ya existe el correo
      if (usuarios.some(u => u.correo === correo)) {
        alertaTemporal("⚠️ Este correo ya está registrado", "warning");
        return;
      }

      usuarios.push({ nombre, correo, password });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alertaTemporal("Registro exitoso 🎉", "success");
      setTimeout(() => window.location.href = "login.html", 1200);
    });
  }

  function validarRegistro() {
    let valido = true;
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirmPassword");

    // nombre mínimo 3
    if (nombre) {
      const err = document.getElementById("errorNombre");
      if (nombre.value.trim().length < 3) { if (err) err.textContent = "El nombre debe tener al menos 3 caracteres."; valido = false; }
      else if (err) err.textContent = "";
    }

    // correo válido con regex simple
    if (correo) {
      const err = document.getElementById("errorCorreo");
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(correo.value.trim())) { if (err) err.textContent = "Formato de correo inválido."; valido = false; }
      else if (err) err.textContent = "";
    }

    // password mínimo 8
    if (password) {
      const err = document.getElementById("errorPassword");
      if (password.value.trim().length < 8) { if (err) err.textContent = "La contraseña debe tener al menos 8 caracteres."; valido = false; }
      else if (err) err.textContent = "";
    }

    // confirmar contraseña
    if (confirm) {
      const err = document.getElementById("errorConfirmPassword");
      if (password && confirm.value.trim() !== password.value.trim()) { if (err) err.textContent = "Las contraseñas no coinciden."; valido = false; }
      else if (err) err.textContent = "";
    }

    return valido;
  }

  /* =========================
     LOGIN: autenticar usando usuarios[] en localStorage
     - Formulario id #loginForm
     - Guarda 'usuarioActivo' en localStorage para indicar sesión activa
     ========================= */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const correo = (document.getElementById("loginCorreo")||{}).value?.trim() || "";
      const pass = (document.getElementById("loginPassword")||{}).value?.trim() || "";

      // validación básica
      let ok = true;
      if (!correo) { document.getElementById("errorLoginCorreo").textContent = "El correo es obligatorio."; ok = false; } else document.getElementById("errorLoginCorreo").textContent = "";
      if (!pass) { document.getElementById("errorLoginPassword").textContent = "La contraseña es obligatoria."; ok = false; } else document.getElementById("errorLoginPassword").textContent = "";
      if (!ok) return;

      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
      const usuario = usuarios.find(u => u.correo === correo && u.password === pass);

      if (!usuario) {
        alertaTemporal("Correo o contraseña incorrectos ❌", "danger");
        return;
      }

      // sesión activa
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      alertaTemporal(`Bienvenido ${usuario.nombre} 🎉`, "success");
      setTimeout(() => window.location.href = "index.html", 900);
    });
  }

  /* =========================
     CERRAR SESIÓN
     - Busca botón con id #cerrarSesion
     - Elimina usuarioActivo y redirige a login
     ========================= */
  const cerrarBtn = document.getElementById("cerrarSesion");
  if (cerrarBtn) {
    cerrarBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      alertaTemporal("Sesión cerrada 👋", "info");
      setTimeout(() => window.location.href = "login.html", 700);
    });
  }

  /* =========================
     PEQUEÑA UX: mostrar si hay usuario activo (opcional)
     - Reemplaza botones de login/register si hay sesión
     ========================= */
  (function actualizarUIporSesion(){
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
    if (!usuarioActivo) return;
    // ejemplo: mostrar alerta de bienvenida al cargar index
    if (location.pathname.endsWith("index.html") || location.pathname.endsWith("/") ) {
      // no molestar cada vez: solo mostrar si venimos del login (puedes modificar lógica)
    }
  })();

}); // DOMContentLoaded

  