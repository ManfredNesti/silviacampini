/* cookie-consent.js
   Gestione del consenso ai cookie (best practice Garante Privacy):
   - Nessun cookie di terze parti viene attivato prima del consenso.
   - La mappa Google si carica SOLO dopo "Accetta".
   - "Rifiuta" ha la stessa evidenza di "Accetta".
   - La scelta è memorizzata in localStorage (dato tecnico di prima parte).
   - Dal footer ("Gestisci cookie") si può cambiare idea in qualsiasi momento.
   Il banner viene creato via JS così è identico su tutte le pagine. */
(function () {
  "use strict";

  var KEY = "cookie-consent"; // valori: "accepted" | "rejected"

  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  /* Carica la mappa Google dentro il contenitore segnaposto */
  function loadMaps() {
    document.querySelectorAll("[data-map-embed]").forEach(function (box) {
      if (box.dataset.loaded === "true") return;
      var iframe = document.createElement("iframe");
      iframe.src = box.dataset.mapSrc;
      iframe.title = box.dataset.mapTitle || "Mappa";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "0";
      box.innerHTML = "";
      box.appendChild(iframe);
      box.dataset.loaded = "true";
    });
  }

  /* Mostra il segnaposto (mappa non caricata) */
  function showPlaceholders() {
    // I segnaposti sono già nell'HTML; nulla da fare se non è stato dato il consenso.
  }

  /* --- Banner --- */
  function buildBanner() {
    var banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Informativa cookie");
    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<p class="cookie-banner__text">' +
          'Questo sito usa solo cookie tecnici necessari. Per mostrare la <strong>mappa interattiva</strong> ' +
          'usiamo Google Maps, che imposta cookie di terze parti: vengono attivati solo con il tuo consenso. ' +
          'Leggi la <a href="cookie-policy.html">Cookie Policy</a> e la <a href="privacy.html">Privacy Policy</a>.' +
        '</p>' +
        '<div class="cookie-banner__actions">' +
          '<button type="button" class="btn btn--sm" data-cc="reject">Rifiuta</button>' +
          '<button type="button" class="btn btn--sm" data-cc="accept">Accetta</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('[data-cc="accept"]').addEventListener("click", function () {
      setConsent("accepted"); banner.remove(); loadMaps();
    });
    banner.querySelector('[data-cc="reject"]').addEventListener("click", function () {
      setConsent("rejected"); banner.remove();
    });
    return banner;
  }

  function openBanner() {
    if (!document.querySelector(".cookie-banner")) buildBanner();
  }

  /* Pulsante "Accetta e mostra la mappa" dentro il segnaposto */
  function wireInlineAccept() {
    document.querySelectorAll("[data-map-accept]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setConsent("accepted");
        var b = document.querySelector(".cookie-banner");
        if (b) b.remove();
        loadMaps();
      });
    });
  }

  /* Link "Gestisci cookie" nel footer */
  function wireManageLinks() {
    document.querySelectorAll("[data-cookie-manage]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); openBanner(); });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireInlineAccept();
    wireManageLinks();

    var consent = getConsent();
    if (consent === "accepted") {
      loadMaps();
    } else if (consent === "rejected") {
      showPlaceholders();
    } else {
      openBanner(); // prima visita: chiedi il consenso
    }
  });
})();
