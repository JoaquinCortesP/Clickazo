const registroForm = document.getElementById("registroForm");

registroForm.addEventListener("input", () => {
  validarFormulario();
});

registroForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validarFormulario()) {
    localStorage.setItem("usuario", JSON.stringify({
      nombre: document.getElementById("nombre").value,
      correo: document.getElementById("correo").value,
      password: document.getElementById("password").value
    }));
    alert("Registro exitoso 🎉");
    window.location.href = "login.html";
  }
});

function validarFormulario() {
  let valido = true;

  // Nombre
  const nombre = document.getElementById("nombre").value.trim();
  const errorNombre = document.getElementById("errorNombre");
  if (nombre.length < 3) {
    errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
    valido = false;
  } else {
    errorNombre.textContent = "";
  }

  // Correo
  const correo = document.getElementById("correo").value.trim();
  const errorCorreo = document.getElementById("errorCorreo");
  const regexCorreo = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!regexCorreo.test(correo)) {
    errorCorreo.textContent = "Formato de correo inválido.";
    valido = false;
  } else {
    errorCorreo.textContent = "";
  }

  // Contraseña
  const password = document.getElementById("password").value.trim();
  const errorPassword = document.getElementById("errorPassword");
  if (password.length < 8) {
    errorPassword.textContent = "La contraseña debe tener al menos 8 caracteres.";
    valido = false;
  } else {
    errorPassword.textContent = "";
  }

  // Confirmar contraseña
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const errorConfirmPassword = document.getElementById("errorConfirmPassword");
  if (confirmPassword !== password || confirmPassword === "") {
    errorConfirmPassword.textContent = "Las contraseñas no coinciden.";
    valido = false;
  } else {
    errorConfirmPassword.textContent = "";
  }

  return valido;
}