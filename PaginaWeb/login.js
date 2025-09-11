document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const clave = document.getElementById("clave").value.trim();

    if (correo === "" || clave === "") {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.correo === correo && u.clave === clave);

    if (!usuario) {
      alert("❌ Usuario no registrado o datos incorrectos.");
    } else {
      alert(✅ Bienvenido, ${usuario.nombre});
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      window.location.href = "index.html"; 
    }
  });
});