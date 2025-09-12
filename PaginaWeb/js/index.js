document.addEventListener("DOMContentLoaded", () => {
  const cerrarBtn = document.getElementById("cerrarSesion");

  if (cerrarBtn) {
    cerrarBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      alert("👋 Sesión cerrada.");
      window.location.href = "login.html";
    });
  }
});