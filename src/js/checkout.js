import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
loadHeaderFooter();

const cartItems = getLocalStorage("so-cart") || [];
const orderbtn = document.querySelector("#placeorder");
const checkout = new CheckoutProcess("so-cart", "#order-summary");
checkout.init();

orderbtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (cartItems.length === 0) {
    window.scrollTo(0, 0);
    alert(
      "Your cart is empty. Please add items to your cart before placing an order.",
    );
    return;
  } else {
    const form = document.forms[0];
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    checkout.checkout();
  }
});
