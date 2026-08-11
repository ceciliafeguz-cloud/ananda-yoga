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

// Lógica del Carrito
let carrito = [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarritoUI();
  alert(`¡Agregaste ${nombre} al carrito!`);
}

function actualizarCarritoUI() {
  const contador = document.getElementById("carrito-contador");
  const lista = document.getElementById("lista-carrito");
  const totalElem = document.getElementById("total-precio");

  contador.textContent = carrito.length;

  if (carrito.length === 0) {
    lista.innerHTML = "<p>El carrito está vacío.</p>";
    totalElem.textContent = "0";
    return;
  }

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    total += item.precio;
    lista.innerHTML += `
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <span>${item.nombre}</span>
        <strong>$${item.precio.toLocaleString("es-AR")}</strong>
      </div>
    `;
  });

  totalElem.textContent = total.toLocaleString("es-AR");
}

// Modal Carrito
const modalCarrito = document.getElementById("modal-carrito");
const btnCarrito = document.getElementById("btn-carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");

btnCarrito.onclick = () => modalCarrito.style.display = "flex";
cerrarCarrito.onclick = () => modalCarrito.style.display = "none";

// Enviar a WhatsApp
document.getElementById("btn-comprar-whatsapp").onclick = () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let mensaje = "¡Hola Cecilia! Quiero inscribirme a las siguientes clases online:\n\n";
  let total = 0;

  carrito.forEach(item => {
    mensaje += `• ${item.nombre}: $${item.precio.toLocaleString("es-AR")}\n`;
    total += item.precio;
  });

  mensaje += `\n*Total a abonar:* $${total.toLocaleString("es-AR")}`;

  const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
};

// Guardar en Firestore
document.addEventListener("DOMContentLoaded", function () {
  const formSalud = document.getElementById("form-salud");
  const btnEnviar = document.getElementById("btn-enviar");
  const mensajeEstado = document.getElementById("mensaje-estado");

  if (formSalud) {
    formSalud.addEventListener("submit", async function (e) {
      e.preventDefault();

      btnEnviar.disabled = true;
      btnEnviar.textContent = "Guardando...";

      const datosAlumno = {
        nombre: document.getElementById("nombre").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        nivel: document.getElementById("nivel").value,
        patologias: document.getElementById("patologias").value.trim(),
        fechaRegistro: new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })
      };

      try {
        await db.collection("fichas_salud").add(datosAlumno);
        mensajeEstado.textContent = "¡Ficha de Salud enviada con éxito!";
        mensajeEstado.className = "mensaje-estado exito";
        formSalud.reset();
      } catch (error) {
        console.error("Error al guardar:", error);
        alert("Ocurrió un error al guardar la ficha.");
      } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar Ficha de Salud";
      }
    });
  }
});