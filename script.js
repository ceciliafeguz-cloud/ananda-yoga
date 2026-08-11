// Configuración de Firebase con tus claves
const firebaseConfig = {
  apiKey: "AIzaSyBc0kjAWGV8gdPK_3HdLWFA5_U-W5PXU5I",
  authDomain: "ananda-yoga-sd.firebaseapp.com",
  projectId: "ananda-yoga-sd",
  storageBucket: "ananda-yoga-sd.firebasestorage.app",
  messagingSenderId: "273098326430",
  appId: "1:273098326430:web:99a85dde4234be314cd68f",
  measurementId: "G-EFVKREVYDH"
};

// Inicializar Firebase y Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para guardar la Ficha de Salud en la Base de Datos
const formSalud = document.getElementById("form-salud");

if (formSalud) {
  formSalud.addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita recargar la página

    // Capturar datos del formulario
    const datosAlumno = {
      nombre: document.getElementById("nombre").value,
      telefono: document.getElementById("telefono").value,
      nivel: document.getElementById("nivel").value,
      patologias: document.getElementById("patologias").value,
      fechaRegistro: new Date().toISOString()
    };

    try {
      // Guardar en la colección "fichas_salud" de Firestore
      await db.collection("fichas_salud").add(datosAlumno);
      alert("¡Ficha de Salud enviada y guardada con éxito!");
      formSalud.reset();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Ocurrió un error al enviar la ficha. Inténtalo de nuevo.");
    }
  });
}

// --- CARRITO DE COMPRAS VIA WHATSAPP ---
let carrito = [];

function agregarAlCarrito(nombreClase, precio) {
  carrito.push({ nombre: nombreClase, precio: precio });
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  const lista = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total-carrito');
  
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio}`;
    lista.appendChild(li);
  });

  totalElemento.textContent = total;
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) {
    alert('El carrito está vacío. Selecciona alguna clase primero.');
    return;
  }

  // REEMPLAZA ESTE NÚMERO POR TU WHATSAPP CON CÓDIGO DE PAÍS (Ej: 5493794123456)
  const numeroTelefono = "5493794123456"; 
  
  let mensaje = "Hola Cecilia! Quisiera reservar las siguientes clases online:\n\n";
  let total = 0;

  carrito.forEach(item => {
    mensaje += `• ${item.nombre}: $${item.precio}\n`;
    total += item.precio;
  });

  mensaje += `\n*Total a abonar:* $${total}`;

  const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}