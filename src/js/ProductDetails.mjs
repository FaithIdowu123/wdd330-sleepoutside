import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log("Loaded product:", this.product);
    document.querySelector(".breadcrumb").textContent = `${this.product.Category}`
  
    this.renderProductDetails()
    document.getElementById("addToCart")
    .addEventListener("click", this.addProductToCart.bind(this));
  }
  addProductToCart() {
    let push = true
    const alert = document.createElement("div");
    alert.className = "alert";
    try {
      const cartItems = getLocalStorage("so-cart") || [];
      cartItems.forEach(item => {
        if (item.Id === this.product.Id) {
          if (!item.quantity) {
            item.quantity = 1;
          }
          item.quantity += 1;
          alert.innerHTML = `<p>Product added to cart!</p>`;
          push = false;
        }
      });
      if (push == true){
        cartItems.push(this.product);
      }
      setLocalStorage("so-cart", cartItems);
      alert.innerHTML = `<p>Product added to cart!</p>`;
    } catch (error) {
      alert.innerHTML = `<p>Error adding product to cart.</p>`;
    }
    const main = document.querySelector("main");
    main.prepend(alert);
    window.scrollTo(0, 0);
  }
  renderProductDetails() {
    productdisplaytemplate(this.product);
  }
}
function productdisplaytemplate(product){
  document.querySelector("h3").textContent = product.Brand.Name;
  document.querySelector("h2").textContent = product.NameWithoutBrand;
  document.querySelector("img.divider").src = product.Images.PrimaryLarge;
  document.querySelector("img.divider").alt = product.NameWithoutBrand;
  document.querySelector(".product-card__old").textContent = "Regular Price: $" + product.SuggestedRetailPrice;
  document.querySelector(".product-card__discount").textContent = "Amount Saved: $" + (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
  document.querySelector(".product-card__price").textContent = "Sale Price: $" + product.FinalPrice;
  document.querySelector(".product__color").textContent = product.Colors.ColorName;
  document.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = product.Id;
}