import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.mjs";
loadHeaderFooter();

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, element);

productList.init();
Alert.loadAndShowAlerts();
