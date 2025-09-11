 document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");
  const resultado = document.getElementById("resultado");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || correo === "" || mensaje === "") {
      resultado.textContent = "⚠️ Por favor completa todos los campos.";
      resultado.style.color = "red";
    } else if (!correo.includes("@")) {
      resultado.textContent = "⚠️ Ingresa un correo válido.";
      resultado.style.color = "red";
    } else {
      resultado.textContent = `✅ ¡Gracias por tu mensaje, ${nombre}!`;
      resultado.style.color = "green";

      form.reset();
    }
  });
});