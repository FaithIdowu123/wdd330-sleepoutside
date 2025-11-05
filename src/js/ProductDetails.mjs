export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.getElementById('addToCart')
    .addEventListener('click', this.addToCart.bind(this));
  }
  addProductToCart(product) {
        setLocalStorage("so-cart", product);
  }
  
}