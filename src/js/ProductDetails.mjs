import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

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
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
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
  document.querySelector(".product-card__price").textContent = "$" + product.FinalPrice;
  document.querySelector(".product__color").textContent = product.Colors.ColorName;
  document.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = product.Id;
}