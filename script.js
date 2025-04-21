
const contenido = {
  
  menu: `
  <h2 class="temporada1">Menú</h2>
  <div class="imagenes">
    <img src="ensalada.jpg" alt="Ensalada">
    <p>Ensalada - L.35.00</p>
    <button class="botonesc" onclick="agregarAlCarrito('Ensalada', 35.00)">Agregar</button>
  </div>
  <div class="imagenes">
    <img src="nachos.jpg" alt="Nachos">
    <p>Nachos - L.28.50</p>
    <button class="botonesc" onclick="agregarAlCarrito('Nachos', 28.50)">Agregar</button>
  </div>
`,
  temporada: `
    <h2 class= "temporada1">Platos de Temporada</h2>
    <div class= "imagenes">
      <img src="ensalada2.jpg" alt="papas" width="100">
      <p>Papas - L.20.00</p>
      <button class="botonesc" onclick="agregarAlCarrito('Papas', 20.00)">Agregar</button>
    </div>
    <div class= "imagenes">
      <img src="nachos2.jpg" alt="Pollo" width="100">
      <p>Pollo Frito - L.60.00</p>
      <button class="botonesc" onclick="agregarAlCarrito('Pollo Frito', 60.00)">Agregar</button>
    </div>
  `,
  refrescos:
  `
    <h2 class= "temporada1">Refrescos</h2>
    <div class= "imagenes">
      <img src="pepsi.jpg" alt="pepsi" width="100">
      <p>Pepsi - L.23.00</p>
      <button class="botonesc" onclick="agregarAlCarrito('Pepsi', 23.00)">Agregar</button>
    </div>
    <div class= "imagenes">
      <img src="coca.jpg" alt="Coca-cola" width="100">
      <p>Coca Cola - L.25.00</p>
      <button class="botonesc" onclick="agregarAlCarrito('Coca-Cola', 25.00)">Agregar</button>
    </div>
  `,
  batidos:
  `
    <h2 class= "temporada1">Batidos</h2>
    <div class= "imagenes">
      <img src="chocolate.jpg" alt="Batido de Chocolate" width="100">
      <p>Batido de Chocolate - L.40.00</p>
      <button class="botonesc" onclick="agregarAlCarrito('Batido de Chocolate', 40.00)">Agregar</button>
    </div>
    <div class= "imagenes">
      <img src="fresa.jpg" alt="Batido de Fresa" width="100">
      <p>Batido de Fresa - L.45.00</p>
      <button class="botonesc" onclick="agregarAlCarrito('Batido de Fresa', 45.00)">Agregar</button>
    </div>
  `,
  promociones:
  `
    <h2 class= "temporada1">Promociones</h2>
    <div class= "imagenes">
      <img src="promocion.jpg" alt="Dos Hamburguesas" width="100">
          <p>Dos Hamburguesas - L.55.00</p>
      <button class="botonesc" onclick="agregarAlCarrito('Dos Hamburguesas', 55.00)">Agregar</button>
    </div>
    <div class= "imagenes">
      <img src="promocion2.jpg" alt="Dos Pizzas" width="100">
          <p>Dos Pizzas - L.115.00</p>
      <button class="botonesc" onclick="agregarAlCarrito('Dos Pizzas', 115.00)">Agregar</button>
    </div>
  `,
};

function mostrarSeccion(seccion) {
  document.getElementById('seccion-contenido').innerHTML = contenido[seccion];
}

const carrito = [];

function agregarAlCarrito(producto, precio) {
 carrito.push({ producto, precio });
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total-pedido');

  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.producto} - $${item.precio.toFixed(2)}`;
    lista.appendChild(li);
    total += item.precio;
  });

  totalElemento.textContent = `Total: $${total.toFixed(2)}`;
}

function enviarPedido() {
  fetch('guardar_pedido.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pedido: carrito })
  })
  .then(response => response.text())
  .then(data => {
    alert('Pedido enviado: ' + data);
    carrito.length = 0;
    actualizarCarrito();
  })
  .catch(error => console.error('Error:', error));
}
