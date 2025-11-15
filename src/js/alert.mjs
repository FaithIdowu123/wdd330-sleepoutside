export default class Alert {
  constructor(alerts) {
    this.alerts = alerts;
  }

  render() {
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    this.alerts.forEach((alertData) => {
      const alertP = document.createElement("p");
      alertP.textContent = alertData.message;
      alertP.style.backgroundColor = alertData.background;
      alertP.style.color = alertData.color;
      alertP.style.padding = "10px";
      alertP.style.margin = "5px";
      alertP.style.borderRadius = "5px";

      alertSection.appendChild(alertP);
    });

    return alertSection;
  }

  insertToDOM() {
    const mainElement = document.querySelector("main");
    const alertSection = this.render();
    mainElement.prepend(alertSection);
  }

  static loadAndShowAlerts() {
    fetch("../json/alerts.json")
      .then((response) => response.json())
      .then((alerts) => {
        const alertInstance = new Alert(alerts);
        alertInstance.insertToDOM();
      })
      .catch((error) => console.error("Error loading alerts file:", error));
  }
}


