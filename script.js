const products = [
  {
    name: "Instant Noodles",
    price: 45,
    image: "https://via.placeholder.com/300x200?text=Instant+Noodles"
  },
  {
    name: "Potato Chips",
    price: 35,
    image: "https://via.placeholder.com/300x200?text=Potato+Chips"
  },
  {
    name: "Chocolate Milk",
    price: 50,
    image: "https://via.placeholder.com/300x200?text=Chocolate+Milk"
  },
  {
    name: "Cookies",
    price: 40,
    image: "https://via.placeholder.com/300x200?text=Cookies"
  }
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartItemsContainer = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const copyBtn = document.getElementById("copyBtn");

function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;

    productsContainer.appendChild(card);
  });
}

function addToCart(index) {
  cart.push(products[index]);
  renderCart();
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Cart is empty</p>`;
    subtotalElement.textContent = "$0.00";
    return;
  }

  cartItemsContainer.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function generateOrderText() {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const notes = document.getElementById("notes").value.trim();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return null;
  }

  let orderText = `New Order\n\n`;
  orderText += `Full name: ${fullName}\n`;
  orderText += `Email: ${email}\n`;
  orderText += `Shipping address: ${address}\n`;
  orderText += `Notes: ${notes || "None"}\n\n`;
  orderText += `Items:\n`;

  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price;
    orderText += `- ${item.name} - $${item.price.toFixed(2)}\n`;
  });

  orderText += `\nSubtotal: $${subtotal.toFixed(2)}\n`;

  return orderText;
}

checkoutBtn.addEventListener("click", () => {
  const orderText = generateOrderText();
  if (!orderText) return;

  const subject = encodeURIComponent("New Order - Justan Online Store");
  const body = encodeURIComponent(orderText);

  window.location.href = `mailto:yourstoreemail@example.com?subject=${subject}&body=${body}`;
});

copyBtn.addEventListener("click", async () => {
  const orderText = generateOrderText();
  if (!orderText) return;

  try {
    await navigator.clipboard.writeText(orderText);
    alert("Order text copied!");
  } catch (error) {
    alert("Failed to copy order text.");
  }
});

renderProducts();
renderCart();
