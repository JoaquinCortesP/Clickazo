const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const correo = document.getElementById("loginCorreo").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  let valido = true;

  if (correo === "") {
    document.getElementById("errorLoginCorreo").textContent = "El correo es obligatorio.";
    valido = false;
  } else {
    document.getElementById("errorLoginCorreo").textContent = "";
  }

  if (password === "") {
    document.getElementById("errorLoginPassword").textContent = "La contraseña es obligatoria.";
    valido = false;
  } else {
    document.getElementById("errorLoginPassword").textContent = "";
  }

  if (!valido) return;

  if (usuario && usuario.correo === correo && usuario.password === password) {
    alert("Bienvenido " + usuario.nombre + " 🎉");
    window.location.href = "index.html";
  } else {
    alert("Correo o contraseña incorrectos ❌");
  }
});