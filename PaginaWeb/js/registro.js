document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.getElementById("registroForm");

  registroForm.addEventListener("input", validarFormulario);

  registroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const usuario = {
        nombre: document.getElementById("nombre").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        password: document.getElementById("password").value.trim(),
      };

      localStorage.setItem("usuario", JSON.stringify(usuario));
      mostrarAlerta("Registro exitoso 🎉", "success");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    }
  });

  function validarFormulario() {
    let valido = true;

    // Nombre
    const nombre = document.getElementById("nombre");
    const errorNombre = document.getElementById("errorNombre");
    if (nombre.value.trim().length < 3) {
      errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
      nombre.classList.add("is-invalid");
      valido = false;
    } else {
      errorNombre.textContent = "";
      nombre.classList.remove("is-invalid");
      nombre.classList.add("is-valid");
    }

    // Correo
    const correo = document.getElementById("correo");
    const errorCorreo = document.getElementById("errorCorreo");
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo.value.trim())) {
      errorCorreo.textContent = "Formato de correo inválido.";
      correo.classList.add("is-invalid");
      valido = false;
    } else {
      errorCorreo.textContent = "";
      correo.classList.remove("is-invalid");
      correo.classList.add("is-valid");
    }

    // Password
    const password = document.getElementById("password");
    const errorPassword = document.getElementById("errorPassword");
    if (password.value.trim().length < 8) {
      errorPassword.textContent = "La contraseña debe tener al menos 8 caracteres.";
      password.classList.add("is-invalid");
      valido = false;
    } else {
      errorPassword.textContent = "";
      password.classList.remove("is-invalid");
      password.classList.add("is-valid");
    }

    // Confirmar password
    const confirmPassword = document.getElementById("confirmPassword");
    const errorConfirmPassword = document.getElementById("errorConfirmPassword");
    if (confirmPassword.value.trim() !== password.value.trim()) {
      errorConfirmPassword.textContent = "Las contraseñas no coinciden.";
      confirmPassword.classList.add("is-invalid");
      valido = false;
    } else {
      errorConfirmPassword.textContent = "";
      confirmPassword.classList.remove("is-invalid");
      confirmPassword.classList.add("is-valid");
    }

    return valido;
  }

  function mostrarAlerta(mensaje, tipo) {
    const div = document.createElement("div");
    div.className = `alert alert-${tipo} mt-3 text-center`;
    div.textContent = mensaje;
    registroForm.appendChild(div);
    setTimeout(() => div.remove(), 2000);
  }
});
