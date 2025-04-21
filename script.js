const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

function renderCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  cart.push(product);
  
  sessionStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}


function removeFromCart(productId) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

productList.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
