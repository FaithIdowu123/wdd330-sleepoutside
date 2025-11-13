import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

let totalPrice = 0;
let number = 0;

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  number = 0;
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  removeFromCart();
}

function cartItemTemplate(item) {
  totalPrice += item.FinalPrice;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button id="remove-cart" dataset="${number}">Remove</button>
</li>`;
  number += 1;
  return newItem;
}

renderCartContents();
document.querySelector(".cart-total").textContent =
  "Total: $" + totalPrice.toFixed(2);

loadHeaderFooter();

function removeFromCart() {
  const buttons = document.querySelectorAll("#remove-cart");
  buttons.forEach((button) =>
    button.addEventListener("click", function (event) { 
      const itemId = event.target.getAttribute("dataset");
      console.log(itemId);
      let cartItems = getLocalStorage("so-cart") || [];
      cartItems.splice(itemId, 1);
      localStorage.setItem("so-cart", JSON.stringify(cartItems));
      totalPrice = 0; // Reset total price before re-rendering
      renderCartContents();
      document.querySelector(".cart-total").textContent =
        "Total: $" + totalPrice.toFixed(2);
    })
  );
}

