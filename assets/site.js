// PZP — Navigation. Ohne Bibliotheken, ohne Fremdaufrufe.
(() => {
  // Megamenü Leistungen: öffnet beim Hover (Maus) und per Knopf (Tastatur, Touch).
  // Escape, Klick außerhalb und Fokus außerhalb schließen.
  const knopf = document.querySelector(".mega-knopf");
  const mega = document.getElementById("mega");
  if (knopf && mega) {
    const li = knopf.closest("li");
    let timer;
    const setze = (offen) => {
      clearTimeout(timer);
      knopf.setAttribute("aria-expanded", String(offen));
      mega.hidden = !offen;
      li.classList.toggle("ist-offen", offen);
    };
    knopf.addEventListener("click", () => setze(mega.hidden));
    if (matchMedia("(hover: hover)").matches) {
      li.addEventListener("mouseenter", () => { clearTimeout(timer); timer = setTimeout(() => setze(true), 90); });
      li.addEventListener("mouseleave", () => { clearTimeout(timer); timer = setTimeout(() => setze(false), 220); });
    }
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
