/* ===== SITE CONFIG – edit text, images, categories here ===== */
const SITE = {
  images: {
    about: "https://plus.unsplash.com/premium_photo-1664303816628-2c3f28be369d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    before: "https://images.unsplash.com/photo-1789889979709-73e6719435f3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    after: "https://images.unsplash.com/photo-1701421047855-d7bafd8d6f69?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  services: [
    /* DEMO – publish only confirmed services */
    {
      t: "Kitchen Cabinet Installation",
      d: "Professional installation of kitchen cabinetry with attention to alignment, spacing, and finishing.",
      img: "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      t: "Bathroom Vanity Installation",
      d: "Cabinet and vanity installation for bathroom renovation projects.",
      img: "https://images.unsplash.com/photo-1661107259637-4e1c55462428?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      t: "Closet & Storage Solutions",
      d: "Installation of cabinetry and storage systems designed for practical everyday use.",
      img: "https://images.unsplash.com/photo-1791140842017-ff731195de5c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      t: "Commercial Cabinetry",
      d: "Cabinet installation for suitable commercial interiors and business spaces.",
      img: "https://images.unsplash.com/photo-1700809887584-0798672b1d48?q=80&w=1062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
  ],
  projects: [
    /* DEMO placeholders – replace with real photos */
    {
      t: "Featured Kitchen Project",
      c: "Kitchen",
      d: "Demo content. Replace with a real project.",
      img: "https://images.unsplash.com/photo-1759239572496-4ec13e7643d6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      t: "Kitchen Installation",
      c: "Kitchen",
      d: "Demo content.",
      img: "https://plus.unsplash.com/premium_photo-1683133825889-7f8dd0b5817f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      t: "Bathroom Vanity",
      c: "Bathroom",
      d: "Demo content.",
      img: "https://images.unsplash.com/photo-1630699376443-a79cea41ed80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      t: "Storage Cabinetry",
      c: "Storage",
      d: "Demo content.",
      img: "https://images.unsplash.com/photo-1783125126717-b3f6942c2014?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
  ],
  why: [
    ["fa-magnifying-glass", "Attention to Detail"],
    ["fa-ruler-combined", "Careful Alignment & Finishing"],
    ["fa-comments", "Professional Communication"],
    ["fa-broom", "Practical, Clean Installation"],
    ["fa-map-location-dot", "Service Across Toronto & the GTA"],
    ["fa-puzzle-piece", "Focus on Fit and Function"],
  ],
  formEndpoint: "" /* e.g. a Formspree URL; leave empty to use WhatsApp */,
  whatsapp: "14168349285",
};
const $ = (s, r = document) => r.querySelector(s);
const imgTag = (src, alt) =>
  src
    ? `<img src="${src}" alt="${alt}" loading="lazy" width="800" height="500" onerror="this.remove()">`
    : "";
const ph = (src, alt) =>
  `<div class="ph">${imgTag(src, alt)}<span>Image: ${src || "add photo"}</span></div>`;
/* images */
document.querySelectorAll("[data-img]").forEach((el) => {
  const s = SITE.images[el.dataset.img];
  if (s)
    el.insertAdjacentHTML(
      "afterbegin",
      imgTag(s, "AM Installations project photo"),
    );
});
/* services */
$("#svcGrid").innerHTML = SITE.services
  .map(
    (s) =>
      `<article class="card rv">${ph(s.img, s.t)}<div class="body"><h3>${s.t}</h3><p>${s.d}</p><a class="q" href="#contact">Request a Quote <i class="fa-solid fa-arrow-right"></i></a></div></article>`,
  )
  .join("");
/* why */
$("#whyGrid").innerHTML = SITE.why
  .map(
    (w) =>
      `<div class="card rv"><i class="fa-solid ${w[0]}"></i><h3>${w[1]}</h3></div>`,
  )
  .join("");
/* projects + filters */
const cats = ["All", ...new Set(SITE.projects.map((p) => p.c))];
let cur = "All";
function drawP() {
  $("#pGrid").innerHTML = SITE.projects
    .filter((p) => cur == "All" || p.c == cur)
    .map(
      (p) =>
        `<article class="card">${ph(p.img, p.t)}<div class="body"><span class="cat">${p.c}</span><h3>${p.t}</h3><p>${p.d}</p></div></article>`,
    )
    .join("");
  $("#filters").innerHTML = cats
    .map((c) => `<button aria-pressed="${c == cur}">${c}</button>`)
    .join("");
  document.querySelectorAll("#filters button").forEach(
    (b) =>
      (b.onclick = () => {
        cur = b.textContent;
        drawP();
      }),
  );
}
drawP();
/* header + menu */
const hdr = $("#hdr"),
  nav = $("#nav"),
  bg = $("#burger");
addEventListener("scroll", () => hdr.classList.toggle("solid", scrollY > 40), {
  passive: true,
});
function tog(o) {
  nav.classList.toggle("open", o);
  bg.setAttribute("aria-expanded", o);
  document.body.style.overflow = o ? "hidden" : "";
  bg.innerHTML = `<i class="fa-solid ${o ? "fa-xmark" : "fa-bars"}"></i>`;
}
bg.onclick = () => tog(!nav.classList.contains("open"));
nav.querySelectorAll("a").forEach((a) => (a.onclick = () => tog(false)));
addEventListener("keydown", (e) => {
  if (e.key == "Escape") tog(false);
});
addEventListener("resize", () => {
  if (innerWidth > 960 && nav.classList.contains("open")) tog(false);
});
/* reveal */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));
/* card tilt (desktop only, motion allowed) */
if (
  matchMedia("(hover:hover) and (prefers-reduced-motion:no-preference)").matches
) {
  document.addEventListener("mousemove", (e) => {
    const c = e.target.closest && e.target.closest(".card");
    if (!c) return;
    const r = c.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  document.addEventListener(
    "mouseout",
    (e) => {
      const c = e.target.closest && e.target.closest(".card");
      if (c && !c.contains(e.relatedTarget)) c.style.transform = "";
    },
    true,
  );
}
/* before/after */
$("#rng").oninput = (e) => {
  const v = e.target.value;
  $("#aft").style.clipPath = `inset(0 0 0 ${v}%)`;
  $("#bar").style.left = v + "%";
};
/* process line */
const st = $("#steps");
function pl() {
  const r = st.getBoundingClientRect(),
    p = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / r.height));
  st.style.setProperty("--p", p);
}
addEventListener("scroll", pl, { passive: true });
addEventListener("resize", pl);
pl();
/* form */
const f = $("#form");
let busy = false;
function chk(el, msg, ok) {
  const er = el.parentNode.querySelector(".err");
  el.setAttribute("aria-invalid", !ok);
  er.textContent = ok ? "" : msg;
  return ok;
}
f.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  if (busy || $("#hp").value) return;
  const ok = [
    chk($("#n"), "Enter your full name.", $("#n").value.trim()),
    chk(
      $("#e"),
      "Enter a valid email address.",
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#e").value),
    ),
    chk($("#p"), "Enter your phone number.", $("#p").value.trim().length > 6),
    chk($("#d"), "Describe your project.", $("#d").value.trim()),
  ].every(Boolean);
  if (!ok) return;
  const data = {
    name: $("#n").value,
    email: $("#e").value,
    phone: $("#p").value,
    type: $("#t").value,
    location: $("#l").value,
    contact: $("#m").value,
    message: $("#d").value,
  };
  busy = true;
  if (SITE.formEndpoint) {
    try {
      const r = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      $("#status").textContent = r.ok
        ? "Thank you. Your request was sent and we will be in touch."
        : "Sending failed. Please call or use WhatsApp.";
      if (r.ok) f.reset();
    } catch {
      $("#status").textContent = "Network error. Please call or use WhatsApp.";
    }
    busy = false;
    return;
  }
  const msg = `Hello AM Installations Inc, I would like a quote.\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nProject: ${data.type}\nLocation: ${data.location}\nPreferred contact: ${data.contact}\nDetails: ${data.message}`;
  open(
    `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`,
    "_blank",
    "noopener",
  );
  busy = false;
});
$("#yr").textContent = new Date().getFullYear();