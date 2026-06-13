/* =====================================================================
   Compassion Plus Hope — shared site behaviour
   Injects the shared header / footer / partner modal so there is ONE
   source of truth, then wires navigation, the modal and the form.
   ===================================================================== */
(function () {
  "use strict";

  /* ---- Central config ---- */
  var CONFIG = {
    paypal: "https://www.paypal.com/donate/?hosted_button_id=DW37UVCMRA8RA",
    email: "compassionplushope@gmail.com",
    // Web3Forms access key tied to compassionplushope@gmail.com.
    web3formsKey: "89ea0a8e-4739-4cbb-b317-dcfa879c6cfe"
  };

  /* Resolve asset prefix so the site works from /, subpages and locally */
  var ROOT = (function () {
    var s = document.currentScript && document.currentScript.src;
    if (!s) return "";
    return s.replace(/assets\/js\/site\.js.*$/, "");
  })();

  var NAV = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "rwanda.html", label: "Rwanda", key: "rwanda" },
    { href: "ukraine.html", label: "Ukraine", key: "ukraine" },
    { href: "about.html", label: "About", key: "about" }
  ];

  var page = document.body.getAttribute("data-page") || "";

  function logoMarkup(onDark) {
    var i = ROOT + "assets/icons/";
    return (
      '<span class="logo__art">' +
      '<img class="lp-icon-3" src="' + i + 'lg-icon-3.svg" alt="">' +
      '<img class="lp-icon-2" src="' + i + 'lg-icon-2.svg" alt="">' +
      '<img class="lp-icon-4" src="' + i + 'lg-icon-4.svg" alt="">' +
      '<img class="lp-icon-1" src="' + i + 'lg-icon-1.svg" alt="">' +
      '<img class="lp-text-1" src="' + i + 'lg-text-1.svg" alt="">' +
      '<img class="lp-text-2" src="' + i + 'lg-text-2.svg" alt="">' +
      "</span>"
    );
  }

  /* ---- Header ---- */
  function renderHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;
    var links = NAV.map(function (n) {
      var cur = n.key === page ? ' aria-current="page"' : "";
      return '<a href="' + ROOT + n.href + '"' + cur + ">" + n.label + "</a>";
    }).join("");

    mount.innerHTML =
      '<header class="nav" id="nav">' +
      '<div class="nav__inner">' +
      '<a class="logo" href="' + ROOT + 'index.html" aria-label="Compassion Plus Hope home">' +
      logoMarkup(false) +
      "</a>" +
      '<nav class="nav__links" aria-label="Primary">' + links + "</nav>" +
      '<div class="nav__cta">' +
      '<a class="btn btn--primary btn--sm" href="' + CONFIG.paypal + '" target="_blank" rel="noopener" data-donate>Donate</a>' +
      '<button class="nav__toggle" type="button" aria-label="Open menu" aria-expanded="false"><span></span></button>' +
      "</div>" +
      "</div>" +
      "</header>";

    var nav = document.getElementById("nav");
    var toggle = nav.querySelector(".nav__toggle");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Footer ---- */
  function renderFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;
    var navLinks = NAV.concat([{ href: "#", label: "Donate", donate: true }])
      .map(function (n) {
        if (n.donate) return '<a href="' + CONFIG.paypal + '" target="_blank" rel="noopener" data-donate>Donate</a>';
        return '<a href="' + ROOT + n.href + '">' + n.label + "</a>";
      })
      .join("");

    mount.innerHTML =
      '<footer class="footer">' +
      '<div class="footer__grid">' +
      '<div class="footer__col">' +
      '<a class="logo logo--on-dark logo--sm" href="' + ROOT + 'index.html" aria-label="Compassion Plus Hope home">' +
      logoMarkup(true) +
      "</a>" +
      '<p class="footer__about">Compassion Plus Hope is a registered 501(c)(3) nonprofit organization. Our mission is to restore dignity through faith-driven humanitarian action.</p>' +
      '<p class="footer__tag">501(c)(3) Nonprofit Organization</p>' +
      "</div>" +
      '<div class="footer__col"><h4>Navigate</h4>' + navLinks + "</div>" +
      '<div class="footer__col"><h4>Contact</h4>' +
      '<a href="mailto:' + CONFIG.email + '">' + CONFIG.email + "</a>" +
      '<a href="tel:+15550000000">+1 (555) 000-0000</a>' +
      "<p>WhatsApp</p></div>" +
      '<div class="footer__col"><h4>Follow Us</h4>' +
      '<a href="#" rel="noopener">Facebook</a>' +
      '<a href="#" rel="noopener">Instagram</a>' +
      '<a href="#" rel="noopener">YouTube</a>' +
      '<a class="btn btn--primary btn--sm" style="margin-top:12px" href="' + CONFIG.paypal + '" target="_blank" rel="noopener" data-donate>Donate Now</a>' +
      "</div>" +
      "</div>" +
      '<div class="footer__bottom">' +
      "<span>© " + new Date().getFullYear() + " Compassion Plus Hope. All rights reserved.</span>" +
      "<span>Privacy Policy · Terms of Use</span>" +
      "</div>" +
      "</footer>";
  }

  /* ---- Partner modal ---- */
  function renderModal() {
    var mount = document.getElementById("site-modal");
    if (!mount) return;
    mount.innerHTML =
      '<div class="modal" id="partner-modal" role="dialog" aria-modal="true" aria-labelledby="partner-title">' +
      '<div class="modal__dialog">' +
      '<h2 class="modal__title" id="partner-title">Become a partner</h2>' +
      '<form id="partner-form" novalidate>' +
      '<input type="hidden" name="access_key" value="' + CONFIG.web3formsKey + '">' +
      '<input type="hidden" name="subject" value="New partner enquiry — Compassion Plus Hope">' +
      '<input type="hidden" name="from_name" value="Compassion Plus Hope website">' +
      '<input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">' +
      '<div class="field"><label for="pf-name">Full name</label>' +
      '<input id="pf-name" name="name" type="text" placeholder="Full Name" required></div>' +
      '<div class="field"><label for="pf-email">Email</label>' +
      '<input id="pf-email" name="email" type="email" placeholder="your-email@domain.com" required></div>' +
      '<div class="field"><label for="pf-org">Organization</label>' +
      '<input id="pf-org" name="organization" type="text" placeholder="Organization name"></div>' +
      '<div class="field"><label for="pf-msg">Description</label>' +
      '<textarea id="pf-msg" name="message" placeholder="Describe how you can help us"></textarea></div>' +
      '<div class="modal__actions">' +
      '<button type="button" class="btn btn--secondary" data-close-modal>Cancel</button>' +
      '<button type="submit" class="btn btn--primary">Send</button>' +
      "</div>" +
      '<p class="modal__status" id="pf-status" role="status"></p>' +
      "</form>" +
      "</div></div>";

    wireModal();
  }

  function wireModal() {
    var modal = document.getElementById("partner-modal");
    if (!modal) return;
    var form = document.getElementById("partner-form");
    var status = document.getElementById("pf-status");

    function open() { modal.classList.add("is-open"); document.body.classList.add("no-scroll"); var f = modal.querySelector("input"); if (f) f.focus(); }
    function close() { modal.classList.remove("is-open"); document.body.classList.remove("no-scroll"); }

    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-open-partner]")) { e.preventDefault(); open(); }
      if (e.target.closest("[data-close-modal]")) { close(); }
      if (e.target === modal) close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "modal__status";
      status.textContent = "Sending…";

      if (CONFIG.web3formsKey.indexOf("REPLACE_WITH") === 0) {
        status.className = "modal__status is-error";
        status.textContent = "Form not configured yet. Please email " + CONFIG.email + ".";
        return;
      }

      var data = Object.fromEntries(new FormData(form).entries());
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            status.className = "modal__status is-ok";
            status.textContent = "Thank you! We'll be in touch soon.";
            form.reset();
            setTimeout(close, 2200);
          } else {
            throw new Error(res.message || "error");
          }
        })
        .catch(function () {
          status.className = "modal__status is-error";
          status.textContent = "Something went wrong. Please email " + CONFIG.email + ".";
        });
    });
  }

  /* ---- Donate links: make sure every CTA points at PayPal ---- */
  function wireDonateLinks() {
    document.querySelectorAll("[data-donate]").forEach(function (a) {
      a.setAttribute("href", CONFIG.paypal);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }

  function init() {
    renderHeader();
    renderFooter();
    renderModal();
    wireDonateLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.CPH_CONFIG = CONFIG;
})();
