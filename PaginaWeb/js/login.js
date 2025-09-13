document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const correo = document.getElementById("loginCorreo");
    const password = document.getElementById("loginPassword");

    let valido = true;

    if (correo.value.trim() === "") {
      document.getElementById("errorLoginCorreo").textContent = "El correo es obligatorio.";
      correo.classList.add("is-invalid");
      valido = false;
    } else {
      document.getElementById("errorLoginCorreo").textContent = "";
      correo.classList.remove("is-invalid");
      correo.classList.add("is-valid");
    }

    if (password.value.trim() === "") {
      document.getElementById("errorLoginPassword").textContent = "La contraseña es obligatoria.";
      password.classList.add("is-invalid");
      valido = false;
    } else {
      document.getElementById("errorLoginPassword").textContent = "";
      password.classList.remove("is-invalid");
      password.classList.add("is-valid");
    }

    if (!valido) return;

    if (usuario && usuario.correo === correo.value.trim() && usuario.password === password.value.trim()) {
      mostrarAlerta("Bienvenido " + usuario.nombre + " 🎉", "success");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      mostrarAlerta("Correo o contraseña incorrectos ❌", "danger");
    }
  });

  function mostrarAlerta(mensaje, tipo) {
    const div = document.createElement("div");
    div.className = `alert alert-${tipo} mt-3 text-center`;
    div.textContent = mensaje;
    loginForm.appendChild(div);
    setTimeout(() => div.remove(), 2000);
  }
});
