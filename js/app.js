// Se utilizan las constantes en lugar de variables para los elementos del DOM que no van a cambiar.
const shopContent = document.querySelector("#shopContent");
const verCarrito = document.querySelector("#verCarrito");
const modalContainer = document.querySelector("#modalContainer");
const cantidadCarrito = document.querySelector("#cantidadCarrito");

// Se utiliza la función "let" para las variables que pueden cambiar, y se les asigna un valor inicial.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Se utiliza una función async/await para obtener los datos de la tienda desde el archivo "data.json".
const getProducts = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    // Se utiliza el método map() en lugar de forEach() para crear un nuevo array de elementos HTML.
    const productsHTML = data.map((product) => {
      const content = document.createElement("div");
      content.classList.add("card");
      content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>
      `;

      const comprar = document.createElement("button");
      comprar.innerText = "Comprar";
      comprar.classList.add("comprar");

      // Se utiliza el método bind() para pasar el objeto "product" como argumento a la función "agregarAlCarrito".
      comprar.addEventListener("click", agregarAlCarrito.bind(null, product));

      content.append(comprar);

      return content;
    });

    // Se utiliza el método append() en lugar de innerHTML para agregar los elementos HTML al contenedor de la tienda.
    shopContent.append(...productsHTML);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};

// Se llama a la función para obtener los productos de la tienda.
getProducts();



// Se define la función "agregarAlCarrito" para agregar un producto al carrito de compras.
const agregarAlCarrito = (product) => {
  const index = carrito.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    // Si el producto ya está en el carrito, se aumenta su cantidad en 1.
    carrito[index].cantidad++;
  } else {
    // Si el producto no está en el carrito, se agrega al carrito con una cantidad de 1.
    carrito.push({ ...product, cantidad: 1 });
  }

  // Se actualiza el contador del carrito y se guarda el carrito en el localStorage.
  carritoCounter();
  saveLocal();
};

//set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Se define la función "carritoCounter" para actualizar el contador del carrito.
/*const carritoCounter = () => {
  cantidadCarrito.innerText = carrito.reduce((acc, item) => acc + item.cantidad, 0);
};*/

// Se define la función "pintarCarrito" para mostrar los productos en el carrito de compras.
/*const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");
  modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito de compras</h1>
    <button class="modal-header-button">X</button>
  `;




  closeButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
}*/
