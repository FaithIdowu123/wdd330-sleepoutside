import {getLocalStorage, alertMessage} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const ExternalService = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  console.log(formData);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const Items = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return Items;
}

export default class CheckoutProcess {
    constructor(key, outputselector) {
        this.key = key;
        this.outputselector = outputselector;
        this.list = [];
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.total = 0;
        this.items = 0;
    }

    init(){
        this.cartItems = getLocalStorage(this.key) || [];
        if (this.cartItems.length === 0) {
            document.querySelector(this.outputselector).innerHTML = `<h2>Your cart is empty</h2>`;
            return;
        } else {
            this.calculateSubTotal();
        }
        
    }

    calculateSubTotal() {
        this.cartItems.forEach(item => {
            this.subtotal += item.FinalPrice * (item.quantity || 1);
        });
        this.calculateTax();
    }

    calculateTax() {
        this.tax = 6/100 * this.subtotal;
        this.calculateShipping(this.cartItems);
    }

    calculateShipping() {
        this.cartItems.forEach(item => {
            this.items += (item.quantity || 1);
            console.log(this.items);
        });
        this.shipping = ((this.items - 1) * 2) + 10;
        this.calculateTotal(this.cartItems);
    }

    calculateTotal() {
        this.total = this.subtotal + this.tax + this.shipping;
        this.renderCheckoutSummary(this.cartItems);
    }

    renderCheckoutSummary() {
        document.querySelector(this.outputselector).innerHTML = `
        <h2>Order Summary</h2>
        <p>Items: ${this.items}</p>
        <p>Subtotal: $${this.subtotal.toFixed(2)}</p>
        <p>Tax: $${this.tax.toFixed(2)}</p>
        <p>Shipping: $${this.shipping.toFixed(2)}</p>
        <p>Total: $${this.total.toFixed(2)}</p>`;
    }

    async checkout() {
        const formElement = document.forms[0];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        console.log(order);

        try {
            const response = await ExternalService.checkout(order);
            localStorage.removeItem("so-cart"); 
            window.location.href = "../checkout/success.html";
        } catch (err) {
            console.error("Checkout failed:", err);
            alertMessage(err.message || "Something went wrong, please try again.");
        }
    }
}