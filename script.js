// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBc0kjAWGV8gdPK_3HdLWFA5_U-W5PXU5I",
  authDomain: "ananda-yoga-sd.firebaseapp.com",
  projectId: "ananda-yoga-sd",
  storageBucket: "ananda-yoga-sd.firebasestorage.app",
  messagingSenderId: "273098326430",
  appId: "1:273098326430:web:99a85dde4234be314cd68f",
  measurementId: "G-EFVKREVYDH"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



  

// Enviar a WhatsApp Cecilia (3794691806)
document.getElementById("btn-comprar-whatsapp").onclick = () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let texto = "Hola Cecilia, quiero inscribirme a las siguientes clases online:\n\n";
  let total = 0;

  carrito.forEach(item => {
    texto += `• ${item.nombre}: $${item.precio.toLocaleString("es-AR")}\n`;
    total += item.precio;
  });

  texto += `\n*Total a abonar:* $${total.toLocaleString("es-AR")}`;

  window.open(`https://wa.me/5493794691806?text=${encodeURIComponent(texto)}`, "_blank");
};

// Guardar Ficha en Firebase Firestore
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-salud");
  const btnEnviar = document.getElementById("btn-enviar");
  const mensajeEstado = document.getElementById("mensaje-estado");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      btnEnviar.disabled = true;
      btnEnviar.textContent = "Guardando...";

      const datos = {
        nombre: document.getElementById("nombre").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        nivel: document.getElementById("nivel").value,
        patologias: document.getElementById("patologias").value.trim(),
        fecha: new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })
      };

      try {
        await db.collection("fichas_salud").add(datos);
        mensajeEstado.textContent = "¡Ficha de Salud enviada con éxito!";
        mensajeEstado.className = "status-msg exito";
        form.reset();
      } catch (err) {
        console.error("Error al guardar en Firebase:", err);
        alert("Ocurrió un error al guardar la ficha.");
      } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Guardar Ficha de Salud";
      }
    });
  }
});