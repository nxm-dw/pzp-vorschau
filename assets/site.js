// PZP — Navigation. Ohne Bibliotheken, ohne Fremdaufrufe.
(() => {
  // Untermenü Leistungen: Disclosure-Muster, Escape und Klick außerhalb schließen
  const knopf = document.querySelector(".mega-knopf");
  const mega = document.getElementById("mega");
  if (knopf && mega) {
    const li = knopf.closest("li");
    const setze = (offen) => {
      knopf.setAttribute("aria-expanded", String(offen));
      mega.hidden = !offen;
    };
    knopf.addEventListener("click", () => setze(mega.hidden));
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && !mega.hidden) { setze(false); knopf.focus(); }
    });
    document.addEventListener("click", (ev) => { if (!li.contains(ev.target)) setze(false); });
    li.addEventListener("focusout", (ev) => { if (ev.relatedTarget && !li.contains(ev.relatedTarget)) setze(false); });
  }

  // Mobiles Menü: natives <dialog> macht den Rest der Seite inert und hält den Fokus
  const menue = document.getElementById("menue");
  const auf = document.querySelector(".menue-knopf");
  if (menue && auf) {
    auf.addEventListener("click", () => {
      menue.showModal();
      auf.setAttribute("aria-expanded", "true");
    });
    menue.querySelector(".menue-zu").addEventListener("click", () => menue.close());
    menue.addEventListener("close", () => { auf.setAttribute("aria-expanded", "false"); auf.focus(); });
    menue.addEventListener("click", (ev) => { if (ev.target === menue) menue.close(); });
    menue.querySelectorAll("a[href^='#']").forEach((a) => a.addEventListener("click", () => menue.close()));
  }
})();
