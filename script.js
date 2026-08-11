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