import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import { cartItemTemplate } from "./shoppingcart.mjs";

let totalPrice = 0;

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.FinalPrice),
    0)
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}



renderCartContents();
document.querySelector(".cart-total").textContent =
  "Total: $" + totalPrice.toFixed(2);

loadHeaderFooter();
