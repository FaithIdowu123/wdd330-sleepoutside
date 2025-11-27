(function () {
  function swap(url, size) {
    return url.replace(/~\d{3}(?=\.)/, `~${size}`);
  }

  function update() {
    const w = window.innerWidth;
    document.querySelectorAll("img").forEach(img => {
      const src = img.getAttribute("src");
      if (!src || !/~\d{3}\.(jpg|jpeg|png|webp)$/i.test(src)) return;

      const size = w <= 600 ? "320" : w <= 1024 ? "500" : "800";
      const newSrc = swap(src, size);

      if (img.src !== newSrc) img.src = newSrc;
    });
  }

  update();
  window.addEventListener("resize", () => setTimeout(update, 150));
})();