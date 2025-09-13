document.getElementById("formContacto").addEventListener("submit", function(event) {
  event.preventDefault();

  let nombre = document.getElementById("nombre").value.trim();
  let correo = document.getElementById("correo").value.trim();
  let mensaje = document.getElementById("mensaje").value.trim();
  let resultado = document.getElementById("resultado");


  if (nombre === "" || correo === "" || mensaje === "") {
    resultado.innerHTML = "⚠️ Por favor completa todos los campos.";
    resultado.style.color = "red";
  } else if (!correo.includes("@")) {
    resultado.innerHTML = "⚠️ Ingresa un correo válido.";
    resultado.style.color = "red";
  } else {
    resultado.innerHTML = "✅ ¡Gracias por tu mensaje, " + nombre + "!";
    resultado.style.color = "green";
    document.getElementById("formContacto").reset();
  }

});

