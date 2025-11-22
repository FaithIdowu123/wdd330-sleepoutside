document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list");

  const observer = new MutationObserver(() => {
    document.querySelectorAll(".product-card").forEach((card) => {
      const priceElement = card.querySelector(".product-card__price");

      if (!priceElement) return;

      const prices = priceElement.textContent.match(/\d+(\.\d{2})?/g);

      if (!prices || prices.length < 2) return;

      const [suggestedPrice, finalPrice] = prices.map(parseFloat);

      if (finalPrice < suggestedPrice) {
        card.classList.add("highlight");

        const discountPercentage = (
          ((suggestedPrice - finalPrice) / suggestedPrice) *
          100
        ).toFixed(0);

        let discountLabel = card.querySelector(".discount-label");
        if (!discountLabel) {
          discountLabel = document.createElement("span");
          discountLabel.classList.add("discount-label", "highlight");
          card.appendChild(discountLabel);
        }

        discountLabel.textContent = `${discountPercentage}% OFF`;

        priceElement.innerHTML = `<span class="old-price">$${suggestedPrice.toFixed(2)}</span> $${finalPrice.toFixed(2)}`;
      }
    });
  });

  observer.observe(productList, { childList: true, subtree: true });
});
