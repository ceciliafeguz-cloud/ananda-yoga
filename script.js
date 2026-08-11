// Configuración de Firebase con tus claves de proyecto
const firebaseConfig = {
  apiKey: "AIzaSyBc0kjAWGV8gdPK_3HdLWFA5_U-W5PXU5I",
  authDomain: "ananda-yoga-sd.firebaseapp.com",
  projectId: "ananda-yoga-sd",
  storageBucket: "ananda-yoga-sd.firebasestorage.app",
  messagingSenderId: "273098326430",
  appId: "1:273098326430:web:99a85dde4234be314cd68f",
  measurementId: "G-EFVKREVYDH"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Manejo de la Ficha de Salud
document.addEventListener("DOMContentLoaded", function () {
  const formSalud = document.getElementById("form-salud");
  const btnEnviar = document.getElementById("btn-enviar");
  const mensajeEstado = document.getElementById("mensaje-estado");

  if (formSalud) {
    formSalud.addEventListener("submit", async function (e) {
      e.preventDefault(); // Evita que la página se recargue

      // Deshabilitar botón temporalmente
      btnEnviar.disabled = true;
      btnEnviar.textContent = "Guardando Ficha...";
      mensajeEstado.className = "mensaje-estado";
      mensajeEstado.style.display = "none";

      // Capturar los valores del formulario
      const datosAlumno = {
        nombre: document.getElementById("nombre").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        nivel: document.getElementById("nivel").value,
        patologias: document.getElementById("patologias").value.trim(),
        fechaRegistro: new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })
      };

      try {
        // Guardar en la colección 'fichas_salud' de Firestore
        await db.collection("fichas_salud").add(datosAlumno);

        // Mostrar mensaje de éxito en pantalla
        mensajeEstado.textContent = "¡Ficha de Salud enviada y guardada con éxito!";
        mensajeEstado.classList.add("exito");

        // Limpiar formulario
        formSalud.reset();

      } catch (error) {
        console.error("Error al guardar en Firestore:", error);
        mensajeEstado.textContent = "Ocurrió un error al enviar. Por favor intenta de nuevo.";
        mensajeEstado.classList.add("error");
      } finally {
        // Restablecer botón
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar Ficha de Salud";
      }
    });
  }
});