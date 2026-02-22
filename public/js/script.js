// validation
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})();


// toggle
document.addEventListener("DOMContentLoaded", () => {

  const toggleBtn = document.getElementById("themeToggle");

  // saved
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  // click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {

      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
      }

    });
  }

});