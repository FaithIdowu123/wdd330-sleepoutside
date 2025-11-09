import {
  getLocalStorage,
  renderListWithTemplate,
  setLocalStorage,
} from "./utils.mjs";

let totalPrice = 0;
let arrayIndex = -1;
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  totalPrice += item.FinalPrice;
  arrayIndex += 1;
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
  <p id="${item.arrayIndex}"</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  const ex = document.querySelector(`#${CSS.escape(item.Id)}`);
  return newItem;
}

renderCartContents();
document.querySelector(".cart-total").textContent = "Total: $" + totalPrice;

function checkId(evt) {
  let cart = JSON.parse(localStorage.getItem("so-cart"));
  cart.forEach((element) => {
    if (element.Id === evt.target.id) {
      // console.log(element)
      // element.innerHTML = "";
      // setLocalStorage("so.cart", element)
      // renderListWithTemplate(element, this.element, cart)

      console.log("element matches!");

      // The following code is the add item to so-cart.
      console.log(cart.length);
      cart = cart.filter((i) => i.Id != evt.target.id);
      console.log(cart.length);
      setLocalStorage("so-cart", cart);
      console.log(cart);
      renderCartContents();
      cartItemTemplate(cart);

      document.querySelector(".cart-total").textContent =
        "Total: $" + totalPrice;

      // addProductToCart();

      // function addProductToCart() {
      //   const cartItems = getLocalStorage("so-cart") || [];
      //   cartItems.push(element);
      //   setLocalStorage("so-cart", cartItems);
      // };
    }
  });
}

const listItems = document
  .querySelector(".product-list")
  .addEventListener("click", checkId);
const an = document.querySelector(".cart-card divider");
