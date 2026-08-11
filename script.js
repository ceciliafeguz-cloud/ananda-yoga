// Configuración Firebase
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

// Carrito de compras
let carrito = [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarUI();
  alert(`¡Agregaste ${nombre} a tu carrito!`);
}

function actualizarUI() {
  const contador = document.getElementById("carrito-contador");
  const lista = document.getElementById("lista-carrito");
  const totalText = document.getElementById("total-precio");

  contador.textContent = carrito.length;

  if (carrito.length === 0) {
    lista.innerHTML = '<p class="empty-msg">El carrito está vacío.</p>';
    totalText.textContent = "0";
    return;
  }

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    total += item.precio;
    lista.innerHTML += `
      <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
        <span>${item.nombre}</span>
        <strong>$${item.precio.toLocaleString("es-AR")}</strong>
      </div>
    `;
  });

  totalText.textContent = total.toLocaleString("es-AR");
}

// Abrir / Cerrar Modal
const modal = document.getElementById("modal-carrito");
document.getElementById("btn-carrito").onclick = () => modal.style.display = "flex";
document.getElementById("cerrar-carrito").onclick = () => modal.style.display = "none";

// Enviar a WhatsApp
document.getElementById("btn-comprar-whatsapp").onclick = () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let texto = "¡Hola Cecilia! Quiero consultar e inscribirme a:\n\n";
  let total = 0;

  carrito.forEach(item => {
    texto += `• ${item.nombre}: $${item.precio.toLocaleString("es-AR")}\n`;
    total += item.precio;
  });

  texto += `\n*Total:* $${total.toLocaleString("es-AR")}`;

  window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
};

// Guardar Ficha en Firestore
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
        mensajeEstado.textContent = "¡Ficha de Salud guardada con éxito!";
        mensajeEstado.className = "status-msg exito";
        form.reset();
      } catch (err) {
        console.error(err);
        alert("Ocurrió un error al guardar la ficha.");
      } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Guardar Ficha de Salud";
      }
    });
  }
});