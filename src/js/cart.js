import { getLocalStorage } from "./utils.mjs";

let totalPrice = 0;

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  totalPrice += item.FinalPrice;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p id="${item.Id}">X</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  const ex = document.querySelector(`#${CSS.escape(item.Id)}`);
  return newItem;
}

renderCartContents();
document.querySelector(".cart-total").textContent = "Total: $" + totalPrice;

const listItems = document.querySelector(".product-list").querySelectorAll("li");
listItems.forEach(x => {
  x.addEventListener("click", () => {
    console.log("you win!");
  });
})
const an = document.querySelector(".cart-card divider");
