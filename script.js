const products = [
  {
    name: "麥香紅茶",
    price: 15,
    image: "https://web.hocom.tw/Uploads/Product/148624_483501185433.jpg"
  },
  {
    name: "麥香綠茶",
    price: 15,
    image: "https://web.hocom.tw/Uploads/Product/s/25003/148630_374577231671.jpg"
  },
  {
    name: "麥香奶茶",
    price: 15,
    image: "https://web.hocom.tw/Uploads/Product/s/25003/148632_742701449649.jpg"
  },
  {
    name: "特上紅茶",
    price: 35,
    image: "https://img.yec.tw/zp/MerchandiseImages/de9855922d-Gd-5169846.jpg"
  },
  {
    name: "滿漢大餐蔥燒牛肉麵",
    price: 40,
    image: "https://cs-a.ecimg.tw/items/DBAY10A900HSAQB/001001_1725516647.jpg"
  },
  {
    name: "來一客鮮蝦魚板",
    price: 40,
    image: "https://shoptaiwan.us/cdn/shop/products/image_8af03874-7bfc-4751-9a3a-236e35615d3b_512x512.jpg?v=1661241883"
  },
  {
    name: "來一客牛肉蔬菜",
    price: 40,
    image: "https://mall.iopenmall.tw/website/uploads_product/website_9920/P0992005735027_3_48745670.jpeg?hash=50348"
  },
  {
    name: "來一客韓式泡菜",
    price: 40,
    image: "https://shoptaiwan.us/cdn/shop/products/image_b5427701-c7b8-42bd-b4f1-95468500f188_600x600.jpg?v=1661241898"
  },
  {
    name: "來一客川辣牛肉",
    price: 40,
    image: "https://online.carrefour.com.tw/on/demandware.static/-/Sites-carrefour-tw-m-inner/default/dw73f69a96/images/large/1450104500124_NR_00.png"
  },
  {
    name: "大乾麵蔥燒牛肉",
    price: 40,
    image: "https://eatfoodgod.com/wp-content/uploads/2024/05/c-22.webp"
  },
  {
    name: "樂事原味",
    price: 40,
    image: "https://online.carrefour.com.tw/on/demandware.static/-/Sites-carrefour-tw-m-inner/default/dw66ab0e68/images/large/1402006800101.png"
  },
  {
    name: "卡拉姆久",
    price: 40,
    image: "https://b2eimg.pxec.com.tw/00154559/827eedb36bbe48b2aa15fe38f4c01194.jpg"
  },
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

const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=yourstoreemail@example.com&su=${subject}&body=${body}`;

window.open(gmailURL, "_blank");
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
