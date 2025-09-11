document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const clave = document.getElementById("clave").value.trim();
    const confirmar = document.getElementById("confirmar").value.trim();

    if (nombre === "" || correo === "" || clave === "" || confirmar === "") {
      alert("⚠️ Todos los campos son obligatorios.");
    } else if (!correo.includes("@")) {
      alert("⚠️ Ingresa un correo válido.");
    } else if (clave.length < 6) {
      alert("⚠️ La contraseña debe tener al menos 6 caracteres.");
    } else if (clave !== confirmar) {
      alert("⚠️ Las contraseñas no coinciden.");
    } else {
      // Guardar usuario en localStorage
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      
      // Verificar si ya existe
      const existe = usuarios.find(u => u.correo === correo);
      if (existe) {
        alert("⚠️ Este correo ya está registrado.");
        return;
      }

      usuarios.push({ nombre, correo, clave });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("✅ Registro exitoso. ¡Bienvenido a Clickazo!");
      form.reset();
      window.location.href = "login.html"; 
    }
  });
});