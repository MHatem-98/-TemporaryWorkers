(function () {
  const open = () => document.body.classList.add("sidebar-open");
  const close = () => document.body.classList.remove("sidebar-open");
  document.querySelectorAll("[data-sidebar-open]").forEach((button) => button.addEventListener("click", open));
  document.querySelectorAll("[data-sidebar-close]").forEach((button) => button.addEventListener("click", close));
  document.getElementById("sidebar-backdrop")?.addEventListener("click", close);
})();
