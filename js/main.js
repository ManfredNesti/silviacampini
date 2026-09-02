/* main.js — solo il menu mobile (progressive enhancement).
   Il sito funziona anche senza JavaScript; questo serve solo ad aprire/chiudere
   il menu a tendina sui cellulari. */
(function () {
  "use strict";

  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!nav || !toggle) return;

  toggle.addEventListener("click", function () {
    const isOpen = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  // Chiudi il menu quando si clicca una voce (utile sul cellulare)
  nav.querySelectorAll(".nav__links a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();
