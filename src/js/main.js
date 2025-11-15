import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.mjs";

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
loadHeaderFooter();

const productList = new ProductList("tents", dataSource, element);

productList.init();
Alert.loadAndShowAlerts();
