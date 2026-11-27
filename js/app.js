"use strict";
var svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <rect x='22' y='2' width='20' height='6' rx='3' fill='#6b4220'/>
    <rect x='26' y='8' width='4' height='10' fill='#6b4220'/>
    <rect x='34' y='8' width='4' height='10' fill='#6b4220'/>
    <rect x='12' y='17' width='40' height='38' rx='8' fill='#a8692f'/>
    <rect x='21' y='23' width='4' height='26' rx='2' fill='#7a4a1e'/>
    <rect x='30' y='23' width='4' height='26' rx='2' fill='#7a4a1e'/>
    <rect x='39' y='23' width='4' height='26' rx='2' fill='#7a4a1e'/>
    <circle cx='20' cy='59' r='3.5' fill='#3d2410'/>
    <circle cx='44' cy='59' r='3.5' fill='#3d2410'/>
  </svg>`;
(function () {
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (page === "product.html") page = "shop.html";
  function active(h) {
    return h === page ? " active" : "";
  }
  var html =
    '<header class="site-header">  <div class="container header-inner">    <a href="index.html" class="logo brand-logo" aria-label="Bronx Luggage home">      <svg class="brand-icon" viewBox="0 0 64 64" aria-hidden="true">        <g class="bh"><rect x="22" y="2" width="20" height="6" rx="3" fill="#6b4220"/><rect x="26" y="8" width="4" height="10" fill="#6b4220"/><rect x="34" y="8" width="4" height="10" fill="#6b4220"/></g>        <rect x="12" y="17" width="40" height="38" rx="8" fill="#c69a5b"/>        <rect x="21" y="23" width="4" height="26" rx="2" fill="#a8692f"/><rect x="30" y="23" width="4" height="26" rx="2" fill="#a8692f"/><rect x="39" y="23" width="4" height="26" rx="2" fill="#a8692f"/>        <circle cx="20" cy="59" r="3.5" fill="#3d2410"/><circle cx="44" cy="59" r="3.5" fill="#3d2410"/>      </svg>      <span class="brand-text"><b>BRONX</b><i>LUGGAGE</i></span>    </a>    <nav class="main-nav" id="mainNav" aria-label="Main navigation">      <a href="index.html" class="nav-link' +
    active("index.html") +
    '">Home</a>      <div class="nav-dropdown">        <a href="shop.html" class="nav-link' +
    active("shop.html") +
    '">Shop <span class="caret">\u25BE</span></a>        <div class="dropdown-menu">          <a href="shop.html">All Products</a>          <a href="shop.html?gender=Men">Men</a>          <a href="shop.html?gender=Women">Women</a>          <a href="shop.html?category=Luggage">Luggage</a>          <a href="shop.html?category=Bags">Bags</a>          <a href="shop.html?category=Backpacks">Backpacks</a>        </div>      </div>      <a href="brands.html" class="nav-link' +
    active("brands.html") +
    '">Brands</a>      <a href="gallery.html" class="nav-link' +
    active("gallery.html") +
    '">Gallery</a>      <a href="studio.html" class="nav-link' +
    active("studio.html") +
    '">3D Studio</a>      <a href="about.html" class="nav-link' +
    active("about.html") +
    '">About Us</a>      <a href="reviews.html" class="nav-link' +
    active("reviews.html") +
    '">Reviews</a>      <a href="contact.html" class="nav-link' +
    active("contact.html") +
    '">Contact</a>    </nav>    <div class="header-actions">      <a class="nav-icon" href="track.html" aria-label="Track order" title="Track order">        <svg viewBox="0 0 24 24"><path d="M2 6h11v10H2z"/><path d="M13 9h4l3 3v4h-7z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/></svg>      </a>      <button class="nav-icon" id="wishOpen" aria-label="Open wishlist" title="Wishlist">        <svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.2-9.3C1.7 8 3.6 4.8 6.9 4.8c1.9 0 3.4 1 5.1 3 1.7-2 3.2-3 5.1-3 3.3 0 5.2 3.2 4.1 6.4-1.7 4.7-9.2 9.3-9.2 9.3z"/></svg>        <span class="nav-badge" id="wishCount">0</span>      </button>      <button class="nav-icon" id="cartOpen" aria-label="Open shopping cart" title="Cart">        <svg viewBox="0 0 24 24"><path d="M2 3h3l2.6 11.5a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.1L20.5 7H6"/><circle cx="9.5" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>        <span class="nav-badge" id="cartCount">0</span>      </button>      <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">\u2630</button>    </div>  </div></header>';
  var tpl = document.createElement("template");
  tpl.innerHTML = html;
  var header = tpl.content.firstElementChild;
  var olds = document.querySelectorAll("header");
  if (olds.length) {
    olds[0].replaceWith(header);
    for (var i = 1; i < olds.length; i++) olds[i].remove();
  } else {
    var t = document.querySelector(".bottom-ticker");
    if (t) t.after(header);
    else document.body.insertBefore(header, document.body.firstChild);
  }
})();
(function () {
  var path = location.pathname;
  var isHome = path === "/" || path.endsWith("/index.html");
  var HOME_MS = 2e3;
  var OTHER_MIN = 500,
    OTHER_MAX = 1e3;
  var R = 44,
    C = 2 * Math.PI * R;
  var old = document.getElementById("preloader");
  if (old) old.remove();
  var css =
    '#pl{position:fixed;inset:0;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:38px;background:radial-gradient(circle at 50% 35%,#13357a 0%,#0b1f5c 38%,#061538 72%,#030a1f 100%);transition:opacity .6s ease,visibility .6s ease}#pl.off{opacity:0;visibility:hidden;pointer-events:none}#pl .pl-logo{display:flex;align-items:center;gap:16px;animation:plLogo 2s ease-in-out infinite}#pl .pl-logo svg{width:clamp(56px,12vw,82px);height:auto;overflow:visible;filter:drop-shadow(0 6px 18px rgba(0,0,0,.45))}#pl .pl-txt{display:flex;flex-direction:column;line-height:1}#pl .pl-txt b{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.9rem,5vw,2.8rem);letter-spacing:.1em;color:#fff}#pl .pl-txt i{font-style:normal;font-size:clamp(.62rem,1.6vw,.85rem);font-weight:800;letter-spacing:.55em;color:#e9d5ae;margin-top:7px}#pl .pl-ring{position:relative;width:clamp(84px,18vw,110px);height:clamp(84px,18vw,110px)}#pl .pl-ring svg{width:100%;height:100%;transform:rotate(-90deg);overflow:visible;filter:drop-shadow(0 0 10px rgba(96,165,250,.7))}#pl .pl-track{fill:none;stroke:rgba(255,255,255,.14);stroke-width:5}#pl .pl-arc{fill:none;stroke:url(#plGrad);stroke-width:5;stroke-linecap:round;transition:stroke-dashoffset .12s linear}#pl .pl-pct{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:1.15rem;font-weight:700;color:#fff;font-variant-numeric:tabular-nums}@keyframes plLogo{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}';
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
  var logoHtml =
    '<div class="pl-logo"><svg viewBox="0 0 64 64" aria-hidden="true"><rect x="22" y="2" width="20" height="6" rx="3" fill="#8a5a2b"/><rect x="26" y="8" width="4" height="10" fill="#8a5a2b"/><rect x="34" y="8" width="4" height="10" fill="#8a5a2b"/><rect x="12" y="17" width="40" height="38" rx="8" fill="#c69a5b"/><rect x="21" y="23" width="4" height="26" rx="2" fill="#a8692f"/><rect x="30" y="23" width="4" height="26" rx="2" fill="#a8692f"/><rect x="39" y="23" width="4" height="26" rx="2" fill="#a8692f"/><circle cx="20" cy="59" r="3.5" fill="#3d2410"/><circle cx="44" cy="59" r="3.5" fill="#3d2410"/></svg><span class="pl-txt"><b>BRONX</b><i>LUGGAGE</i></span></div><div class="pl-ring"><svg viewBox="0 0 100 100" aria-label="Loading"><defs><linearGradient id="plGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#e9d5ae"/></linearGradient></defs><circle class="pl-track" cx="50" cy="50" r="' +
    R +
    '"/><circle class="pl-arc" id="plArc" cx="50" cy="50" r="' +
    R +
    '" stroke-dasharray="' +
    C +
    '" stroke-dashoffset="' +
    C +
    '"/></svg><div class="pl-pct" id="plPct">0%</div></div>';
  var el = null,
    timer = null,
    t0 = 0;
  function setProgress(p) {
    var a = document.getElementById("plArc"),
      n = document.getElementById("plPct");
    if (a) a.style.strokeDashoffset = C * (1 - p / 100);
    if (n) n.textContent = Math.round(p) + "%";
  }
  function build() {
    if (el) return;
    el = document.createElement("div");
    el.id = "pl";
    el.innerHTML = logoHtml;
    (document.body || document.documentElement).appendChild(el);
    t0 = performance.now();
    setProgress(0);
    clearInterval(timer);
    timer = setInterval(function () {
      var dur = isHome ? HOME_MS : OTHER_MAX;
      var x = Math.min(1, (performance.now() - t0) / dur);
      setProgress((1 - Math.pow(1 - x, 2)) * 95);
    }, 40);
  }
  function hide() {
    document.documentElement.classList.add("pl-done");
    if (!el) return;
    var e = el;
    el = null;
    clearInterval(timer);
    setProgress(100);
    setTimeout(function () {
      e.classList.add("off");
      setTimeout(function () {
        e.remove();
        document.dispatchEvent(new Event("pl-done"));
      }, 450);
    }, 200);
  }
  var navEntry = performance.getEntriesByType("navigation")[0];
  var navType = navEntry ? navEntry.type : "navigate";
  var cameFromOwnSite = false;
  try {
    cameFromOwnSite =
      !!document.referrer &&
      new URL(document.referrer).origin === location.origin;
  } catch (e) {}
  var showLoader =
    navType === "reload" || (navType === "navigate" && !cameFromOwnSite);
  if (!showLoader) {
    document.documentElement.classList.add("pl-done");
    return;
  }
  build();
  if (isHome) {
    setTimeout(hide, HOME_MS);
  } else {
    var go = function () {
      setTimeout(hide, Math.max(0, OTHER_MIN - performance.now()));
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go);
    setTimeout(hide, OTHER_MAX);
  }
})();
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'Bronx Atlas 28" Hard-Shell Spinner',
    brand: "Bronx",
    category: "Luggage",
    gender: "Unisex",
    color: "Navy",
    size: 'Large (28")',
    sizeGroup: "Large",
    price: 189.99,
    oldPrice: 249.99,
    rating: 4.8,
    reviews: 214,
    badge: "Best Seller",
    image: "assets/img/p01-atlas-28.jpg",
    description:
      "A tough polycarbonate hard-shell spinner with a scratch-resistant finish, TSA-approved lock and whisper-quiet 360\xB0 spinner wheels.",
    specs: {
      Material: "Polycarbonate hard shell",
      Dimensions: '28" x 19" x 12"',
      Weight: "4.2 kg",
      Capacity: "102 L",
      Wheels: "4x 360\xB0 spinner",
      Lock: "TSA-approved combination",
      Warranty: "5 years",
    },
  },
  {
    id: 2,
    name: 'Samsonite Winfield 3 DLX 28" Spinner',
    brand: "Samsonite",
    category: "Luggage",
    gender: "Unisex",
    color: "Black",
    size: 'Large (28")',
    sizeGroup: "Large",
    price: 219.99,
    oldPrice: 279.99,
    rating: 4.7,
    reviews: 486,
    badge: "Premium",
    image: "assets/img/p02-winfield-28.jpg",
    description:
      "Samsonite's signature brushed-pattern spinner with a spacious fully-lined interior, cross-straps and a built-in TSA lock.",
    specs: {
      Material: "Polycarbonate hard shell",
      Dimensions: '28" x 19.5" x 12.5"',
      Weight: "4.5 kg",
      Capacity: "108 L",
      Wheels: "4x 360\xB0 spinner",
      Lock: "TSA-approved combination",
      Warranty: "10 years",
    },
  },
  {
    id: 3,
    name: 'American Tourister Moonlight 24" Spinner',
    brand: "American Tourister",
    category: "Luggage",
    gender: "Women",
    color: "Rose Gold",
    size: 'Medium (24")',
    sizeGroup: "Medium",
    price: 129.99,
    oldPrice: 169.99,
    rating: 4.5,
    reviews: 342,
    badge: "New",
    image: "assets/img/p03-moonlight-24.jpg",
    description:
      "A lightweight, eye-catching spinner in a rose-gold finish with an expandable main compartment and smooth-rolling wheels.",
    specs: {
      Material: "ABS hard shell",
      Dimensions: '24" x 17" x 10"',
      Weight: "3.4 kg",
      Capacity: "72 L",
      Wheels: "4x 360\xB0 spinner",
      Lock: "TSA-approved combination",
      Warranty: "3 years",
    },
  },
  {
    id: 4,
    name: 'Delsey Helium Aero 25" Spinner',
    brand: "Delsey",
    category: "Luggage",
    gender: "Unisex",
    color: "Teal",
    size: 'Medium (25")',
    sizeGroup: "Medium",
    price: 179.99,
    oldPrice: 219.99,
    rating: 4.6,
    reviews: 198,
    badge: null,
    image: "assets/img/p04-helium-25.jpg",
    description:
      "Delsey's feather-light Helium Aero with a comfortable grip handle, two large packing compartments and double spinner wheels.",
    specs: {
      Material: "Polycarbonate hard shell",
      Dimensions: '25" x 18" x 11"',
      Weight: "3.8 kg",
      Capacity: "84 L",
      Wheels: "Double spinner wheels",
      Lock: "TSA-approved combination",
      Warranty: "5 years",
    },
  },
  {
    id: 5,
    name: "Bronx Metro Leather Tote",
    brand: "Bronx",
    category: "Bags",
    gender: "Women",
    color: "Tan",
    size: "Medium",
    sizeGroup: "Medium",
    price: 89.99,
    oldPrice: 119.99,
    rating: 4.7,
    reviews: 167,
    badge: "Best Seller",
    image: "assets/img/p05-metro-tote.jpg",
    description:
      'A structured genuine-leather tote with an interior laptop sleeve, zip pocket and magnetic closure. Carries a 14" laptop with ease.',
    specs: {
      Material: "Genuine leather",
      Dimensions: '15" x 12" x 5"',
      Weight: "0.9 kg",
      Capacity: "18 L",
      Laptop: 'Fits up to 14"',
      Closure: "Magnetic snap + inner zip",
      Warranty: "2 years",
    },
  },
  {
    id: 6,
    name: "Travelpro Weekender Duffel",
    brand: "Travelpro",
    category: "Bags",
    gender: "Men",
    color: "Grey",
    size: "Large",
    sizeGroup: "Large",
    price: 119.99,
    oldPrice: 149.99,
    rating: 4.6,
    reviews: 223,
    badge: null,
    image: "assets/img/p06-weekender.jpg",
    description:
      "A rugged water-resistant weekender with a ventilated shoe pocket, padded handles and a detachable shoulder strap.",
    specs: {
      Material: "Water-resistant polyester",
      Dimensions: '22" x 12" x 11"',
      Weight: "1.1 kg",
      Capacity: "45 L",
      Pockets: "Shoe pocket + 2 outer",
      Strap: "Detachable padded",
      Warranty: "3 years",
    },
  },
  {
    id: 7,
    name: "Bronx Canvas Messenger Bag",
    brand: "Bronx",
    category: "Bags",
    gender: "Men",
    color: "Olive",
    size: "Small",
    sizeGroup: "Small",
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.4,
    reviews: 98,
    badge: null,
    image: "assets/img/p07-messenger.jpg",
    description:
      "A durable waxed-canvas messenger with full-grain leather trim, a padded tablet sleeve and an adjustable cross-body strap.",
    specs: {
      Material: "Waxed canvas + leather trim",
      Dimensions: '14" x 11" x 4"',
      Weight: "0.8 kg",
      Capacity: "12 L",
      Tablet: 'Fits up to 11"',
      Closure: "Magnetic flap + zip",
      Warranty: "2 years",
    },
  },
  {
    id: 8,
    name: "Samsonite Elevation Plus Duffel",
    brand: "Samsonite",
    category: "Bags",
    gender: "Unisex",
    color: "Black",
    size: "Medium",
    sizeGroup: "Medium",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.5,
    reviews: 176,
    badge: null,
    image: "assets/img/p08-elevation-duffel.jpg",
    description:
      "A wheeled duffel that packs like a suitcase: retractable handle, large U-shaped opening and a wet-pocket for toiletries.",
    specs: {
      Material: "Polyester with wheels",
      Dimensions: '21" x 13" x 11"',
      Weight: "2.6 kg",
      Capacity: "52 L",
      Handle: "Retractable",
      Wheels: "2x inline skate wheels",
      Warranty: "5 years",
    },
  },
  {
    id: 9,
    name: "Bronx Trail 25L Travel Backpack",
    brand: "Bronx",
    category: "Backpacks",
    gender: "Men",
    color: "Navy",
    size: "Medium",
    sizeGroup: "Medium",
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.8,
    reviews: 301,
    badge: "Best Seller",
    image: "assets/img/p09-trail-backpack.jpg",
    description:
      'A 25-litre travel backpack with a ventilated back panel, rain cover, side bottle pockets and a padded 15.6" laptop sleeve.',
    specs: {
      Material: "Ripstop nylon",
      Dimensions: '19" x 12" x 8"',
      Weight: "1.2 kg",
      Capacity: "25 L",
      Laptop: 'Fits up to 15.6"',
      Extras: "Rain cover included",
      Warranty: "3 years",
    },
  },
  {
    id: 10,
    name: "American Tourister Urban Groove 20L Daypack",
    brand: "American Tourister",
    category: "Backpacks",
    gender: "Women",
    color: "Blue",
    size: "Small",
    sizeGroup: "Small",
    price: 69.99,
    oldPrice: 89.99,
    rating: 4.5,
    reviews: 154,
    badge: "New",
    image: "assets/img/p10-urban-groove.jpg",
    description:
      "A slim, lightweight daypack with a front organiser pocket, padded straps and a hidden security pocket for valuables.",
    specs: {
      Material: "Polyester",
      Dimensions: '17" x 11" x 6"',
      Weight: "0.7 kg",
      Capacity: "20 L",
      Laptop: 'Fits up to 14"',
      Extras: "Hidden security pocket",
      Warranty: "2 years",
    },
  },
  {
    id: 11,
    name: "Delsey Everyday Laptop Backpack",
    brand: "Delsey",
    category: "Backpacks",
    gender: "Unisex",
    color: "Black",
    size: "Medium",
    sizeGroup: "Medium",
    price: 89.99,
    oldPrice: 109.99,
    rating: 4.6,
    reviews: 187,
    badge: null,
    image: "assets/img/p11-everyday-backpack.jpg",
    description:
      "A sleek everyday backpack with a suspended laptop compartment, USB charging port and water-resistant zips.",
    specs: {
      Material: "Water-resistant polyester",
      Dimensions: '18" x 12" x 7"',
      Weight: "1.0 kg",
      Capacity: "22 L",
      Laptop: 'Fits up to 15.6"',
      Extras: "USB charging port",
      Warranty: "3 years",
    },
  },
  {
    id: 12,
    name: "Bronx Heritage Leather Backpack",
    brand: "Bronx",
    category: "Backpacks",
    gender: "Women",
    color: "Brown",
    size: "Medium",
    sizeGroup: "Medium",
    price: 139.99,
    oldPrice: 179.99,
    rating: 4.9,
    reviews: 264,
    badge: "Premium",
    image: "assets/img/p12-heritage-backpack.jpg",
    description:
      "A vintage-style full-grain leather backpack with brass buckles, a drawstring main compartment and a padded laptop sleeve.",
    specs: {
      Material: "Full-grain leather",
      Dimensions: '16" x 12" x 6"',
      Weight: "1.4 kg",
      Capacity: "20 L",
      Laptop: 'Fits up to 14"',
      Closure: "Drawstring + buckle flap",
      Warranty: "5 years",
    },
  },
  {
    id: 13,
    name: 'Bronx Aero Carry-On 21"',
    brand: "Bronx",
    category: "Luggage",
    gender: "Unisex",
    color: "White",
    size: 'Small (21")',
    sizeGroup: "Small",
    price: 159.99,
    oldPrice: 199.99,
    rating: 4.9,
    reviews: 189,
    badge: "New",
    image: "assets/img/p13-aero-carryon.jpg",
    description:
      "A ribbed cream hard-shell cabin carry-on with a telescopic handle, TSA lock and whisper-quiet 360\xB0 spinner wheels. Fits most airline overhead bins.",
    specs: {
      Material: "Polycarbonate hard shell",
      Dimensions: '21.7" x 14.4" x 9.1"',
      Weight: "3.1 kg",
      Capacity: "42 L",
      Wheels: "4x 360\xB0 spinner",
      Lock: "TSA-approved combination",
      Warranty: "5 years",
    },
  },
  {
    id: 14,
    name: 'Samsonite Omni 24" Spinner',
    brand: "Samsonite",
    category: "Luggage",
    gender: "Unisex",
    color: "Silver",
    size: 'Medium (24")',
    sizeGroup: "Medium",
    price: 189.99,
    oldPrice: 229.99,
    rating: 4.7,
    reviews: 312,
    badge: null,
    image: "assets/img/p14-omni-24.jpg",
    description:
      "Samsonite's scratch-resistant Omni spinner with a spacious fully-lined interior, cross-straps and a built-in TSA lock.",
    specs: {
      Material: "Polycarbonate hard shell",
      Dimensions: '24" x 17" x 10"',
      Weight: "3.6 kg",
      Capacity: "72 L",
      Wheels: "4x 360\xB0 spinner",
      Lock: "TSA-approved combination",
      Warranty: "10 years",
    },
  },
  {
    id: 15,
    name: 'American Tourister Soundbox 28" Spinner',
    brand: "American Tourister",
    category: "Luggage",
    gender: "Women",
    color: "Red",
    size: 'Large (28")',
    sizeGroup: "Large",
    price: 149.99,
    oldPrice: 189.99,
    rating: 4.6,
    reviews: 278,
    badge: "New",
    image: "assets/img/p15-soundbox-28.jpg",
    description:
      "A bold red large spinner with a geometric textured shell, expandable main compartment and smooth-rolling double wheels.",
    specs: {
      Material: "Polypropylene hard shell",
      Dimensions: '28" x 19" x 12"',
      Weight: "4.0 kg",
      Capacity: "102 L",
      Wheels: "Double spinner wheels",
      Lock: "TSA-approved combination",
      Warranty: "3 years",
    },
  },
  {
    id: 16,
    name: 'Delsey Chatelet 21" Cabin',
    brand: "Delsey",
    category: "Luggage",
    gender: "Women",
    color: "Champagne",
    size: 'Small (21")',
    sizeGroup: "Small",
    price: 229.99,
    oldPrice: 279.99,
    rating: 4.8,
    reviews: 156,
    badge: "Premium",
    image: "assets/img/p16-chatelet-21.jpg",
    description:
      "Delsey's premium champagne cabin case with leather trim, a fully-lined interior and silent double spinner wheels.",
    specs: {
      Material: "Polycarbonate hard shell",
      Dimensions: '21.5" x 14" x 9"',
      Weight: "3.2 kg",
      Capacity: "40 L",
      Wheels: "Double spinner wheels",
      Lock: "TSA-approved combination",
      Warranty: "5 years",
    },
  },
  {
    id: 17,
    name: 'Travelpro Maxlite 26" Spinner',
    brand: "Travelpro",
    category: "Luggage",
    gender: "Unisex",
    color: "Blue",
    size: 'Medium (26")',
    sizeGroup: "Medium",
    price: 169.99,
    oldPrice: 199.99,
    rating: 4.6,
    reviews: 203,
    badge: null,
    image: "assets/img/p17-maxlite-26.jpg",
    description:
      "A lightweight blue soft-shell spinner with an expandable main compartment, front pocket and smooth-rolling wheels.",
    specs: {
      Material: "Polyester soft shell",
      Dimensions: '26" x 18" x 11"',
      Weight: "3.4 kg",
      Capacity: "88 L",
      Wheels: "4x 360\xB0 spinner",
      Lock: "TSA-approved combination",
      Warranty: "3 years",
    },
  },
  {
    id: 18,
    name: 'Bronx Weekender Canvas 18"',
    brand: "Bronx",
    category: "Bags",
    gender: "Men",
    color: "Green",
    size: "Medium",
    sizeGroup: "Medium",
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.5,
    reviews: 87,
    badge: null,
    image: "assets/img/p18-weekender-canvas.jpg",
    description:
      "A rugged dark-green canvas weekender with full-grain leather handles, a detachable shoulder strap and a ventilated shoe pocket.",
    specs: {
      Material: "Waxed canvas + leather trim",
      Dimensions: '18" x 11" x 10"',
      Weight: "1.0 kg",
      Capacity: "35 L",
      Pockets: "Shoe pocket + 2 outer",
      Strap: "Detachable padded",
      Warranty: "2 years",
    },
  },
  {
    id: 19,
    name: "Bronx Leather Garment Bag",
    brand: "Bronx",
    category: "Bags",
    gender: "Unisex",
    color: "Black",
    size: "Large",
    sizeGroup: "Large",
    price: 129.99,
    oldPrice: 159.99,
    rating: 4.7,
    reviews: 64,
    badge: null,
    image: "assets/img/p19-garment-bag.jpg",
    description:
      "A full-grain black leather garment bag with a hanging hook, padded handles and room for two suits plus shoes.",
    specs: {
      Material: "Full-grain leather",
      Dimensions: '24" x 22" x 4"',
      Weight: "1.8 kg",
      Capacity: "30 L",
      Closure: "Full-length zip",
      Extras: "Hanging hook + shoe pocket",
      Warranty: "5 years",
    },
  },
  {
    id: 20,
    name: 'Bronx Kids Dino Spinner 18"',
    brand: "Bronx",
    category: "Luggage",
    gender: "Unisex",
    color: "Yellow",
    size: 'Small (18")',
    sizeGroup: "Small",
    price: 69.99,
    oldPrice: 89.99,
    rating: 4.8,
    reviews: 142,
    badge: "New",
    image: "assets/img/p20-kids-dino.jpg",
    description:
      "A cheerful yellow kids rolling suitcase with a friendly dinosaur print, easy pull handle and smooth spinner wheels.",
    specs: {
      Material: "ABS hard shell",
      Dimensions: '18" x 12" x 9"',
      Weight: "1.9 kg",
      Capacity: "28 L",
      Wheels: "4x 360\xB0 spinner",
      Lock: "Zip closure",
      Warranty: "2 years",
    },
  },
  {
    id: 21,
    name: "Samsonite Camera Sling Bag",
    brand: "Samsonite",
    category: "Bags",
    gender: "Unisex",
    color: "Grey",
    size: "Small",
    sizeGroup: "Small",
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.5,
    reviews: 93,
    badge: null,
    image: "assets/img/p21-camera-sling.jpg",
    description:
      "A compact grey camera sling with padded dividers, a quick-access top pocket and an adjustable cross-body strap.",
    specs: {
      Material: "Water-resistant polyester",
      Dimensions: '12" x 8" x 5"',
      Weight: "0.6 kg",
      Capacity: "8 L",
      Fits: "Mirrorless camera + 2 lenses",
      Strap: "Adjustable cross-body",
      Warranty: "3 years",
    },
  },
  {
    id: 22,
    name: 'American Tourister Laptop Sleeve 15"',
    brand: "American Tourister",
    category: "Bags",
    gender: "Unisex",
    color: "Navy",
    size: "Small",
    sizeGroup: "Small",
    price: 39.99,
    oldPrice: 49.99,
    rating: 4.4,
    reviews: 211,
    badge: null,
    image: "assets/img/p22-laptop-sleeve.jpg",
    description:
      "A slim navy padded laptop sleeve for a 15-inch laptop with a zip closure and a small front pocket for a charger.",
    specs: {
      Material: "Neoprene + polyester",
      Dimensions: '16" x 11" x 1"',
      Weight: "0.3 kg",
      Laptop: 'Fits up to 15.6"',
      Closure: "Zip",
      Warranty: "2 years",
    },
  },
  {
    id: 23,
    name: "Delsey Executive Tote",
    brand: "Delsey",
    category: "Bags",
    gender: "Women",
    color: "Brown",
    size: "Medium",
    sizeGroup: "Medium",
    price: 109.99,
    oldPrice: 139.99,
    rating: 4.6,
    reviews: 118,
    badge: null,
    image: "assets/img/p23-executive-tote.jpg",
    description:
      "A structured brown leather executive tote with a padded laptop compartment, zip pocket and comfortable shoulder handles.",
    specs: {
      Material: "Full-grain leather",
      Dimensions: '16" x 13" x 6"',
      Weight: "1.1 kg",
      Capacity: "20 L",
      Laptop: 'Fits up to 15.6"',
      Closure: "Top zip",
      Warranty: "3 years",
    },
  },
  {
    id: 24,
    name: "Bronx Hiking Pack 40L",
    brand: "Bronx",
    category: "Backpacks",
    gender: "Men",
    color: "Orange",
    size: "Large",
    sizeGroup: "Large",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.7,
    reviews: 176,
    badge: "Best Seller",
    image: "assets/img/p24-hiking-pack.jpg",
    description:
      "A 40-litre orange hiking backpack with a ventilated back panel, hip belt, rain cover and side bottle pockets.",
    specs: {
      Material: "Ripstop nylon",
      Dimensions: '26" x 13" x 9"',
      Weight: "1.6 kg",
      Capacity: "40 L",
      Extras: "Rain cover included",
      Laptop: 'Fits up to 15.6"',
      Warranty: "3 years",
    },
  },
];
const BRAND_INFO = {
  Bronx:
    "Our own line \u2014 premium materials, honest prices, designed in New York.",
  Samsonite: "The world\u2019s largest luggage maker, trusted since 1910.",
  "American Tourister":
    "Fun, lightweight and colourful \u2014 travel with personality.",
  Delsey: "French design since 1946. Light, elegant, built to last.",
  Travelpro: "The choice of flight crews \u2014 built for life on the road.",
};
const GALLERY = [
  {
    src: "assets/img/hero.jpg",
    cap: "The 2026 Collection \u2014 ready for departure",
  },
  {
    src: "assets/img/p01-atlas-28.jpg",
    cap: 'Bronx Atlas 28" \u2014 our best-selling spinner',
  },
  { src: "assets/img/p01-metro-tote.jpg", cap: "Bronx Metro Leather Tote" },
  {
    src: "assets/img/p01-trail-backpack.jpg",
    cap: "Bronx Trail 25L \u2014 built for the trail",
  },
  {
    src: "assets/img/p2-heritage-backpack.jpg",
    cap: "Bronx Heritage \u2014 full-grain leather",
  },
  {
    src: "assets/img/p01-moonlight-24.jpg",
    cap: "American Tourister Moonlight in Rose Gold",
  },
  {
    src: "assets/img/p2-aero-carryon.jpg",
    cap: "Bronx Aero Carry-On \u2014 cabin ready",
  },
  {
    src: "assets/img/p1-chatelet-21.jpg",
    cap: "Delsey Chatelet \u2014 champagne finish",
  },
  {
    src: "assets/img/p01-messenger.jpg",
    cap: "Bronx Canvas Messenger \u2014 everyday carry",
  },
  {
    src: "assets/img/p1-hiking-pack.jpg",
    cap: "Bronx Hiking Pack 40L \u2014 made for the outdoors",
  },
  {
    src: "assets/img/p1-soundbox-28-twilight.jpg",
    cap: 'American Tourister Soundbox 28" \u2014 bold and textured',
  },
  {
    src: "assets/img/p1-executive-tote.jpg",
    cap: "Delsey Executive Tote \u2014 office to airport",
  },
  {
    src: "assets/img/p05-winfield-28.jpg",
    cap: 'Samsonite Winfield 28" \u2014 brushed finish spinner',
  },
  {
    src: "assets/img/p01-weekender.jpg",
    cap: "Travelpro Weekender Duffel \u2014 packed for the weekend",
  },
  {
    src: "assets/img/p1-everyday-backpack.jpg",
    cap: "Delsey Everyday Backpack \u2014 laptop ready",
  },
  {
    src: "assets/img/p6-laptop-sleeve-cocoa.jpg",
    cap: "American Tourister Laptop Sleeve 15",
  },
  {
    src: "assets/img/p6-kids-dino-peach.jpg",
    cap: "Bronx Kids Dino Spinner 18",
  },
];
let PRODUCTS = [];
let cart = loadJSON("bronx-cart", []);
if (!Array.isArray(cart)) cart = [];
cart = cart
  .filter((i) => i && i.id !== void 0 && i.id !== null)
  .map((i) => ({
    id: +i.id,
    qty: Math.max(1, +i.qty || 1),
    color: String(i.color || ""),
  }));
function getProduct(id) {
  return PRODUCTS.find((p) => String(p.id) === String(id));
}
const filters = {
  category: "All",
  gender: "",
  brand: "",
  size: "",
  color: "",
  price: null,
  search: "",
  sort: "featured",
};
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const money = (n) => "$" + n.toFixed(2);
const COLOR_FAMILIES = [
  ["Purple", "#8e6bbf", /lavender|purple|orchid|plum|mauve|lilac/i],
  ["Red", "#a3122b", /burgundy|wine|garnet|rose\s?wood|\bred\b/i],
  ["Teal", "#2a7f7f", /teal|aqua/i],
  ["Orange", "#e67e22", /orange|peach|apricot|terracotta|clay|salmon/i],
  ["Pink", "#f0a3b5", /pink|rose|peony/i],
  ["Navy", "#1f3864", /navy/i],
  ["Blue", "#3a6fd8", /blue/i],
  ["Green", "#4f7942", /green|olive|moss|fern|sage|emerald/i],
  ["Silver", "#c0c4c8", /silver/i],
  ["Grey", "#8a8d91", /grey|gray|charcoal/i],
  ["Black", "#151515", /black/i],
  ["White", "#f2f0eb", /white/i],
  ["Gold", "#d9c08a", /gold|champagne/i],
  ["Beige", "#d8c7a5", /beige|sand|ivory|raw silk|cream|taupe|mushroom|stone/i],
  ["Brown", "#7b4a2b", /brown|cocoa|chocolate|mahogany|camel|\btan\b|almond/i],
  ["Yellow", "#f2c230", /yellow/i],
];
function colorFamily(name) {
  const f = COLOR_FAMILIES.find((f2) => f2[2].test(name));
  return f ? f[0] : null;
}
function productColors(p) {
  const v = window.BRONX_VARIANTS && window.BRONX_VARIANTS[p.id];
  const list =
    v && v.length ? v : [{ name: p.color, hex: "#999", image: p.image }];
  return list.map((c) => ({
    ...c,
    family: colorFamily(c.name) || c.name.trim(),
  }));
}
function allColors() {
  const used = /* @__PURE__ */ new Map();
  PRODUCTS.forEach((p) =>
    productColors(p).forEach((c) => {
      if (!used.has(c.family)) used.set(c.family, c.hex || "#999");
    }),
  );
  const out = [];
  COLOR_FAMILIES.forEach(([name, hex]) => {
    if (used.has(name)) {
      out.push({ name, hex });
      used.delete(name);
    }
  });
  used.forEach((hex, name) => out.push({ name, hex }));
  return out;
}
const on = (el, ev, fn) => {
  if (el) el.addEventListener(ev, fn);
};
function loadJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch (e) {
    return fallback;
  }
}
function saveJSON(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}
function stars(rating) {
  const full = Math.round(rating);
  let out = "";
  for (let i = 1; i <= 5; i++)
    out += i <= full ? "\u2605" : '<span class="dim">\u2605</span>';
  return out;
}
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}
function productCard(p, i = 0) {
  const q = p._q || "";
  return `
    <article class="product-card" style="animation-delay:${i * 40}ms">
      <div class="product-media">
        <a href="product.html?id=${p.id}${q}"><img src="${p.image}" alt="${p.name}" loading="lazy" draggable="false" data-fb="${p._fb || ""}" onerror="if(this.dataset.fb){this.src=this.dataset.fb;this.dataset.fb=''}"></a>
        <span class="card-shine" aria-hidden="true"></span>
        <button class="wish-btn" data-wish="${p.id}" aria-label="Add to wishlist" title="Add to wishlist"><svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.2-9.3C1.7 8 3.6 4.8 6.9 4.8c1.9 0 3.4 1 5.1 3 1.7-2 3.2-3 5.1-3 3.3 0 5.2 3.2 4.1 6.4-1.7 4.7-9.2 9.3-9.2 9.3z"/></svg></button>
        <button class="compare-btn" data-compare="${p.id}" aria-label="Add to comparison" title="Compare">\u21C4 Compare</button>
      </div>
      <div class="product-body">
        <span class="product-brand">${p.brand}</span>
        <h3 class="product-name"><a href="product.html?id=${p.id}${q}">${p.name}</a></h3>
        ${p.badge ? `<span class="badge-inline">(${p.badge})</span>` : ""}
        <p class="product-meta">${p.size} \xB7 ${p.color} \xB7 ${p.gender}</p>
        <p class="stars" aria-label="Rated ${p.rating} out of 5">${stars(p.rating)} <span style="color:var(--muted);letter-spacing:0"> ${p.rating} (${p.reviews})</span></p>
        <p class="product-price">${money(p.price)}${p.oldPrice ? `<span class="old">${money(p.oldPrice)}</span>` : ""}</p>
        <div class="product-actions">
          <button class="btn btn-gold" data-add="${p.id}" data-color="${p._color || ""}">Add to Cart</button>
          <a class="btn btn-ghost" href="product.html?id=${p.id}${q}">View Details</a>
        </div>
      </div>
    </article>`;
}
async function loadProducts() {
  try {
    const res = await fetch("data/products.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    PRODUCTS = Array.isArray(data) ? data : data.products || [];
    if (!PRODUCTS.length) throw new Error("empty list");
  } catch (e) {
    PRODUCTS = FALLBACK_PRODUCTS;
  }
  try {
    const r2 = await fetch("data/more-products.json");
    if (r2.ok) {
      const extra = await r2.json();
      const list = Array.isArray(extra) ? extra : extra.products || [];
      const have = new Set(PRODUCTS.map((p) => p.id));
      PRODUCTS = [...PRODUCTS, ...list.filter((p) => !have.has(p.id))];
    }
  } catch (e) {}
  initPageFeatures();
}
function initPageFeatures() {
  renderFeatured();
  renderBrands();
  renderGallery();
  initShop();
  initProductPage();
  renderCartPage();
  renderCart();
  renderSitemapLinks();
  renderFeedback();
  initStudio();
  initMarquee();
  renderRecent();
  renderWish();
  renderCompareTray();
}
function renderFeatured() {
  const grid = $("#featuredGrid");
  if (!grid) return;
  const top = PRODUCTS.filter((p) => +p.id < 1000)
    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    .slice(0, 4);
  grid.innerHTML = top.map((p, i) => productCard(p, i)).join("");
}
function renderBrands() {
  const grid = $("#brandGrid");
  if (!grid) return;

  const REAL = PRODUCTS.filter((p) => +p.id < 1000);
  const rideOn = PRODUCTS.find((p) => +p.id >= 1000);

  const counts = {};
  REAL.forEach((p) => (counts[p.brand] = (counts[p.brand] || 0) + 1));
  if (rideOn) counts[rideOn.brand] = (counts[rideOn.brand] || 0) + 1;

  grid.innerHTML = Object.keys(BRAND_INFO)
    .map(
      (b) => `
    <div class="brand-card">
      <div class="brand-mark">${b}</div>
      <p>${BRAND_INFO[b]}</p>
      <p><strong>${counts[b] || 0} product${(counts[b] || 0) === 1 ? "" : "s"}</strong></p>
      <a href="shop.html?brand=${encodeURIComponent(b)}" class="brand-link">Shop ${b} \u2192</a>
    </div>`,
    )
    .join("");

  const detail = $("#brandDetail");
  if (detail) {
    detail.innerHTML = Object.keys(BRAND_INFO)
      .map((b) => {
        const items = REAL.filter((p) => p.brand === b);
        const lines = items
          .map(
            (p) =>
              `<li><a href="product.html?id=${p.id}">${p.name}</a> \u2014 ${money(p.price)}</li>`,
          )
          .join("");
        const rideLine =
          rideOn && rideOn.brand === b
            ? `<li><a href="whats-new.html">${rideOn.name}</a> \u2014 ${money(rideOn.price)}</li>`
            : "";
        return `<div class="brand-detail-block"><h3>${b}</h3><p>${BRAND_INFO[b]}</p><ul>${lines}${rideLine}</ul></div>`;
      })
      .join("");
  }
}
function renderGallery() {
  const grid = $("#galleryGrid");
  if (!grid) return;
  grid.innerHTML = GALLERY.map(
    (g, i) => `
    <figure class="gallery-item" data-idx="${i}">
      <img src="${g.src}" alt="${g.cap}" loading="lazy">
      <figcaption>${g.cap}</figcaption>
    </figure>`,
  ).join("");
}
function openLightbox(i) {
  const g = GALLERY[i];
  const lb = $("#lightbox");
  if (!lb) return;
  $("#lightboxImg").src = g.src;
  $("#lightboxCap").textContent = g.cap;
  lb.hidden = false;
}
function closeLightbox() {
  const lb = $("#lightbox");
  if (lb) lb.hidden = true;
}
function getFiltered() {
  let list = PRODUCTS.filter((p) => {
    if (+p.id >= 1000) return false;

    if (filters.category !== "All" && p.category !== filters.category)
      return false;
    if (filters.gender && p.gender !== filters.gender) return false;
    if (filters.brand && p.brand !== filters.brand) return false;
    if (filters.size && p.sizeGroup !== filters.size) return false;
    if (
      filters.color &&
      !productColors(p).some((c) => c.family === filters.color)
    )
      return false;
    if (filters.price) {
      if (p.price < filters.price.min || p.price > filters.price.max)
        return false;
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const hay = (
        p.name +
        " " +
        p.brand +
        " " +
        p.category +
        " " +
        p.color +
        " " +
        p.description
      ).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  switch (filters.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "reviews":
      list.sort((a, b) => b.reviews - a.reviews);
      break;
  }
  return list;
}
function renderShopProducts() {
  const grid = $("#productGrid");
  if (!grid) return;
  const list = getFiltered();
  $("#resultsCount").textContent =
    `Showing ${list.length} of ${PRODUCTS.filter((p) => +p.id < 1000).length} products` +
    (filters.category !== "All" ? ` in ${filters.category}` : "") +
    (filters.gender ? ` \xB7 ${filters.gender}` : "");
  $("#emptyState").hidden = list.length > 0;
  grid.innerHTML = list
    .map((p, i) => {
      if (filters.color) {
        const c = productColors(p).find((c2) => c2.family === filters.color);
        if (c)
          p = {
            ...p,
            image: c.image,
            _fb: p.image,
            _color: c.name,
            _q: "&color=" + encodeURIComponent(c.name),
          };
      }
      return productCard(p, i);
    })
    .join("");
}
function setCategory(cat, gender) {
  filters.category = cat || "All";
  filters.gender = gender || "";
  $$("#categoryTabs .tab").forEach((t) => {
    const tc = t.dataset.category,
      tg = t.dataset.gender || "";
    t.classList.toggle(
      "active",
      tc === filters.category && tg === filters.gender,
    );
  });
  renderShopProducts();
}
function initShop() {
  const grid = $("#productGrid");
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const cat = params.get("category"),
    gen = params.get("gender"),
    br = params.get("brand"),
    q = params.get("q");
  const brands = [...new Set(PRODUCTS.map((p) => p.brand))].sort();
  const colors = allColors();
  $("#filterBrand").innerHTML =
    '<option value="">All brands</option>' +
    brands.map((b) => `<option>${b}</option>`).join("");
  $("#filterColor").innerHTML =
    '<option value="">All colours</option>' +
    colors.map((c) => `<option>${c.name}</option>`).join("");
  if (br && brands.includes(br)) {
    filters.brand = br;
    $("#filterBrand").value = br;
  }
  if (q) {
    filters.search = q;
    const si = $("#searchInput");
    if (si) si.value = q;
  }
  setCategory(cat || "All", gen || "");
  on($("#categoryTabs"), "click", (e) => {
    const t = e.target.closest(".tab");
    if (!t) return;
    setCategory(t.dataset.category, t.dataset.gender || "");
  });
  on($("#filterBrand"), "change", (e) => {
    filters.brand = e.target.value;
    renderShopProducts();
  });
  on($("#filterColor"), "change", (e) => {
    filters.color = e.target.value;
    syncSwatches();
    renderShopProducts();
  });
  on($("#sortBy"), "change", (e) => {
    filters.sort = e.target.value;
    renderShopProducts();
  });
  const pMin = $("#priceMin"),
    pMax = $("#priceMax"),
    pOut = $("#priceOutput");
  const applyPrice = () => {
    if (!pMin || !pMax) return;
    let lo = +pMin.value,
      hi = +pMax.value;
    if (lo > hi) {
      [lo, hi] = [hi, lo];
    }
    pOut.textContent = `$${lo} \u2013 $${hi}`;
    filters.price = lo === 0 && hi === 250 ? null : { min: lo, max: hi };
    renderShopProducts();
  };
  on(pMin, "input", applyPrice);
  on(pMax, "input", applyPrice);
  const swWrap = $("#colorSwatches");
  if (swWrap) {
    colors.forEach((c) => {
      const b = document.createElement("button");
      b.className = "swatch";
      b.dataset.color = c.name;
      b.title = c.name;
      b.setAttribute("aria-label", "Filter by " + c.name);
      b.style.background = c.hex;
      b.addEventListener("click", () => {
        filters.color =
          filters.color.toLowerCase() === c.name.toLowerCase() ? "" : c.name;
        const sel = $("#filterColor");
        if (sel) sel.value = filters.color;
        syncSwatches();
        renderShopProducts();
      });
      swWrap.appendChild(b);
    });
    const allBtn = swWrap.querySelector(".swatch.all");
    if (allBtn)
      allBtn.addEventListener("click", () => {
        filters.color = "";
        const sel = $("#filterColor");
        if (sel) sel.value = "";
        syncSwatches();
        renderShopProducts();
      });
  }
  const clearAll = () => {
    Object.assign(filters, {
      category: "All",
      gender: "",
      brand: "",
      size: "",
      color: "",
      price: null,
      search: "",
      sort: "featured",
    });
    $("#filterBrand").value = "";
    $("#filterColor").value = "";
    $("#sortBy").value = "featured";
    if (pMin) pMin.value = 0;
    if (pMax) pMax.value = 250;
    if (pOut) pOut.textContent = "$0 \u2013 $250";
    const si = $("#searchInput");
    if (si) si.value = "";
    syncSwatches();
    setCategory("All", "");
    renderShopProducts();
    history.replaceState(null, "", "shop.html");
  };
  on($("#clearFilters"), "click", clearAll);
  on($("#emptyClear"), "click", clearAll);
}
function initProductPage() {
  const grid = $("#productDetailGrid");
  if (!grid) return;
  const id = +new URLSearchParams(location.search).get("id");
  const p = PRODUCTS.find((p2) => p2.id === id);
  if (!p) {
    $("#productNotFound").hidden = false;
    document.title = "Product not found \u2014 Bronx Luggage";
    return;
  }
  document.title = `${p.name} \u2014 Bronx Luggage`;
  $("#crumbName").textContent = p.name;
  $("#pdImage").src = p.image;
  $("#pdImage").alt = p.name;
  if (p.badge) {
    const b = $("#pdBadge");
    b.textContent = p.badge;
    b.hidden = false;
  }
  $("#pdBrand").textContent = p.brand + " \xB7 " + p.category;
  $("#pdName").textContent = p.name;
  $("#pdRating").innerHTML =
    `<span class="stars">${stars(p.rating)}</span> ${p.rating} \xB7 ${p.reviews} reviews`;
  $("#pdPrice").innerHTML =
    `${money(p.price)}${p.oldPrice ? ` <span class="old">${money(p.oldPrice)}</span>` : ""}`;
  $("#pdDesc").textContent =
    p.description + ` Size: ${p.size}. Colour: ${p.color}.`;
  $("#pdSpecs").innerHTML = Object.entries(p.specs)
    .map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`)
    .join("");
  grid.hidden = false;
  on($("#pdAdd"), "click", (e) => {
    const qty = Math.max(1, Math.min(9, +$("#pdQty").value || 1));
    addToCart(p.id, qty, e.currentTarget);
    openCart();
  });
  try {
    let recent = JSON.parse(localStorage.getItem("bronx-recent") || "[]");
    recent = [p.id, ...recent.filter((x) => x !== p.id)].slice(0, 4);
    localStorage.setItem("bronx-recent", JSON.stringify(recent));
  } catch (e) {}
  const pdWish = $("#pdWish");
  if (pdWish) {
    pdWish.textContent = isWished(p.id)
      ? "\u2665 In Wishlist"
      : "\u2665 Wishlist";
    pdWish.addEventListener("click", () => {
      toggleWish(p.id);
      pdWish.textContent = isWished(p.id)
        ? "\u2665 In Wishlist"
        : "\u2665 Wishlist";
    });
  }
  const pdSw = $("#pdSwatches");
  if (pdSw) {
    const COLOR_HEX = {
      Navy: "#1f3864",
      Black: "#151515",
      "Rose Gold": "#e8b4a0",
      Teal: "#2a7f7f",
      Tan: "#c19a6b",
      Grey: "#8a8f98",
      Olive: "#6b7c3f",
      Blue: "#3a6fd8",
      Brown: "#7b4a2b",
      White: "#f2f0eb",
      Silver: "#c0c4c8",
      Red: "#c0392b",
      Champagne: "#e6d5b3",
      Green: "#3d6b35",
      Yellow: "#f2c230",
      Orange: "#e67e22",
    };
    const seen = /* @__PURE__ */ new Set();
    PRODUCTS.filter((x) => x.category === p.category).forEach((x) => {
      if (seen.has(x.color)) return;
      seen.add(x.color);
      const b = document.createElement("button");
      b.className = "swatch" + (x.color === p.color ? " active" : "");
      b.style.background = COLOR_HEX[x.color] || "#999";
      b.title = x.color + " \u2014 " + x.name;
      b.setAttribute("aria-label", "See the " + x.color + " " + x.name);
      b.addEventListener("click", () => {
        location.href = "product.html?id=" + x.id;
      });
      pdSw.appendChild(b);
    });
    const lbl = document.createElement("span");
    lbl.style.cssText = "font-weight:700;font-size:.9rem;color:var(--muted)";
    lbl.textContent = "Colour: " + p.color;
    pdSw.prepend(lbl);
  }
  const other = PRODUCTS.find(
    (x) => x.category === p.category && x.id !== p.id,
  );
  if (other) {
    $("#cmpBefore").src = p.image;
    $("#cmpAfter").src = other.image;
    $("#cmpBeforeLabel").textContent = p.name;
    $("#cmpAfterLabel").textContent = other.name;
    initImgCompare();
  }
  initViewer360();
  initZoomLens();
  const related = PRODUCTS.filter(
    (x) => x.category === p.category && x.id !== p.id,
  ).slice(0, 4);
  if (related.length) {
    $("#relatedSection").hidden = false;
    $("#relatedGrid").innerHTML = related
      .map((r, i) => productCard(r, i))
      .join("");
  }
}
function syncSwatches() {
  $$("#colorSwatches .swatch").forEach((b) =>
    b.classList.toggle(
      "active",
      b.dataset.color === filters.color && filters.color !== "",
    ),
  );
  $$("#colorSwatches .swatch.all").forEach((b) =>
    b.classList.toggle("active", !filters.color),
  );
}
function cartCount() {
  return cart.reduce((n, i) => n + i.qty, 0);
}
function cartTotal() {
  return cart.reduce((n, i) => n + i.qty * (getProduct(i.id)?.price || 0), 0);
}
function saveCart() {
  saveJSON("bronx-cart", cart);
  renderCart();
  renderCartPage();
}
function addToCart(id, qty = 1, sourceEl = null, color = "") {
  const item = cart.find((i) => i.id === id && (i.color || "") === color);
  if (item) item.qty = Math.min(9, item.qty + qty);
  else cart.push({ id, qty, color });
  saveCart();
  const p = PRODUCTS.find((p2) => p2.id === id);
  toast(`Added to cart: ${p ? p.name : "item"} \u{1F9F3}`);
  const cartBtn = $("#cartOpen");
  if (cartBtn) {
    cartBtn.classList.remove("cart-bump");
    void cartBtn.offsetWidth;
    cartBtn.classList.add("cart-bump");
  }
  let imgEl = null;
  if (sourceEl) {
    const card = sourceEl.closest(
      ".product-card, .pd-info, .modal-box, .wish-drawer, #quickContent",
    );
    if (card) imgEl = card.querySelector("img");
    if (!imgEl && sourceEl.closest("#pdViewer")) imgEl = $("#pdImage");
  }
  if (!imgEl) imgEl = $("#pdImage");
  if (imgEl && cartBtn) {
    const r = imgEl.getBoundingClientRect(),
      c = cartBtn.getBoundingClientRect();
    const fly = imgEl.cloneNode();
    fly.className = "fly-img";
    fly.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;
    document.body.appendChild(fly);
    requestAnimationFrame(() => {
      fly.style.left = c.left + c.width / 2 - 14 + "px";
      fly.style.top = c.top + c.height / 2 - 14 + "px";
      fly.style.width = "28px";
      fly.style.height = "28px";
      fly.style.opacity = "0.25";
      fly.style.transform = "rotate(20deg)";
    });
    setTimeout(() => fly.remove(), 900);
  }
}
function renderCart() {
  const badge = $("#cartCount");
  if (!badge) return;
  badge.textContent = cartCount();
  const dc = $("#cartDrawerCount");
  if (dc) dc.textContent = cartCount();
  const box = $("#cartItems");
  if (!box) return;
  if (!cart.length) {
    box.innerHTML =
      '<p class="cart-empty">Your cart is empty.<br>Browse the shop and add something you love.</p>';
  } else {
    box.innerHTML = cart
      .map((i) => {
        const p = PRODUCTS.find((p2) => p2.id === i.id);
        if (!p) return "";
        const vs = window.BRONX_VARIANTS && window.BRONX_VARIANTS[p.id];
        const v = vs && i.color ? vs.find((c) => c.name === i.color) : null;
        const img = v ? v.image : p.image;
        const col = v ? v.name : p.color;
        const save = p.oldPrice
          ? Math.round((1 - p.price / p.oldPrice) * 100)
          : 0;
        return `<div class="cart-item">
      <a href="product.html?id=${p.id}"><img src="${img}" alt="${p.name}"></a>
      <div class="ci-info">
        <span class="ci-brand">${p.brand}</span>
        <a class="ci-name" href="product.html?id=${p.id}">${p.name}</a>
        <p class="ci-price">${p.oldPrice ? `<s>${money(p.oldPrice)}</s> ` : ""}${money(p.price)}</p>
        ${save ? `<p class="ci-save">You're saving ${save}% on this item</p>` : ""}
        <p class="ci-meta"><u>Color</u>: ${col}</p>
        <p class="ci-meta"><u>Size</u>: ${p.size}</p>
        <div class="qty-row">
          <button data-dec="${p.id}" aria-label="Decrease quantity">\u2212</button>
          <span>${i.qty}</span>
          <button data-inc="${p.id}" aria-label="Increase quantity">+</button>
          <button class="trash-btn" data-del="${p.id}" aria-label="Remove from cart" title="Remove"><svg viewBox="0 0 24 24"><g class="t-lid"><path d="M3 6h18"/><path d="M9 6V4h6v2"/></g><path d="M5 6l1 14h12l1-14"/><path d="M10 11v6M14 11v6"/></svg></button>
        </div>
      </div>
      <div class="line-total">${money(p.price * i.qty)}</div>
    </div>`;
      })
      .join("");
  }
  const total = cartTotal();
  const ct = $("#cartTotal");
  if (ct) ct.textContent = money(total);
  const note = $("#cartShipNote");
  if (note)
    note.textContent =
      total >= 99
        ? "\u{1F389} You have FREE shipping on this order!"
        : `Add ${money(99 - total)} more for FREE shipping.`;
}
function renderCartPage() {
  const box = $("#cartPageItems");
  if (!box) return;
  const empty = $("#cartPageEmpty");
  if (empty) empty.hidden = cart.length > 0;
  box.innerHTML = cart
    .map((i) => {
      const p = getProduct(i.id);
      if (!p)
        return `<div class="cart-item"><div><strong>Product #${i.id} (not found)</strong>
      <div class="qty-row"><button class="trash-btn" data-del="${i.id}" aria-label="Remove">\u2715</button></div></div></div>`;
      const save = p.oldPrice
        ? Math.round((1 - p.price / p.oldPrice) * 100)
        : 0;
      return `<div class="cart-item">
      <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
      <div class="ci-info">
        <span class="ci-brand">${p.brand}</span>
        <a class="ci-name" href="product.html?id=${p.id}">${p.name}</a>
        <p class="ci-price">${p.oldPrice ? `<s>${money(p.oldPrice)}</s> ` : ""}${money(p.price)}</p>
        ${save ? `<p class="ci-save">You're saving ${save}% on eligible items</p>` : ""}
        <p class="ci-meta"><u>Color</u>: ${p.color}</p>
        <p class="ci-meta"><u>Size</u>: ${p.size}</p>
        <div class="qty-row">
          <button data-dec="${p.id}" aria-label="Decrease quantity">\u2212</button>
          <span>${i.qty}</span>
          <button data-inc="${p.id}" aria-label="Increase quantity">+</button>
          <button class="trash-btn" data-del="${p.id}" aria-label="Remove from cart" title="Remove"><svg viewBox="0 0 24 24"><g class="t-lid"><path d="M3 6h18"/><path d="M9 6V4h6v2"/></g><path d="M5 6l1 14h12l1-14"/><path d="M10 11v6M14 11v6"/></svg></button>
        </div>
      </div>
      <div class="line-total">${money(p.price * i.qty)}</div>
    </div>`;
    })
    .join("");
  const total = cartTotal();
  const shipping = total === 0 ? 0 : total >= 99 ? 0 : 9.99;
  const set = (id, v) => {
    const el = $(id);
    if (el) el.textContent = v;
  };
  set("#sumItems", cartCount());
  set("#sumSubtotal", money(total));
  set(
    "#sumShipping",
    total === 0 ? "\u2014" : shipping === 0 ? "FREE" : money(shipping),
  );
  set("#sumTotal", money(total + shipping));
  set(
    "#sumShipNote",
    total >= 99
      ? "\u{1F389} You have FREE shipping on this order!"
      : `Add ${money(99 - total)} more for FREE shipping (otherwise $9.99).`,
  );
}
function openCart() {
  const d = $("#cartDrawer");
  if (!d) {
    location.href = "cart.html";
    return;
  }
  d.classList.add("open");
  d.setAttribute("aria-hidden", "false");
  $("#overlay").hidden = false;
}
function closeCart() {
  const d = $("#cartDrawer");
  if (!d) return;
  d.classList.remove("open");
  d.setAttribute("aria-hidden", "true");
  $("#overlay").hidden = true;
}
function renderSitemapLinks() {
  const box = $("#productLinks");
  if (!box) return;
  const byCat = {};
  PRODUCTS.forEach((p) => {
    if (+p.id >= 1000) return;
    (byCat[p.category] = byCat[p.category] || []).push(p);
  });
  (byCat["Luggage"] = byCat["Luggage"] || []).push({
    name: "Bronx Ride-On Smart Suitcase",
    href: "whats-new.html",
  });
  box.innerHTML = Object.keys(byCat)
    .map(
      (c) =>
        `<div><h4>${c}</h4><ul>${byCat[c]
          .map(
            (p) =>
              `<li><a href="${p.href || "product.html?id=" + p.id}">${p.name}</a></li>`,
          )
          .join("")}</ul></div>`,
    )
    .join("");
}
const SEED_FEEDBACK = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "The Atlas spinner survived three flights and still looks brand new. Wheels are whisper quiet!",
    date: "Nov 2026",
  },
  {
    name: "James K.",
    rating: 5,
    text: "Ordered the Trail backpack on Monday, hiking with it on Friday. Great quality for the price.",
    date: "Oct 2026",
  },
  {
    name: "Ayesha R.",
    rating: 4,
    text: "Beautiful tote and fast delivery. Wish there were more colours in stock.",
    date: "Oct 2026",
  },
  {
    name: "Daniel P.",
    rating: 5,
    text: "The Heritage leather backpack looks even better in person. Stitching is solid and it fits my 14-inch laptop perfectly.",
    date: "Nov 2026",
  },
  {
    name: "Fatima S.",
    rating: 5,
    text: "Bought the Moonlight spinner in rose gold for my honeymoon. Light, stylish and everyone asked where I got it!",
    date: "Sep 2026",
  },
  {
    name: "Omar H.",
    rating: 4,
    text: "Weekender duffel is roomy and the shoe pocket is a lifesaver. Delivery took three days, which was fine.",
    date: "Oct 2026",
  },
  {
    name: "Lena W.",
    rating: 5,
    text: "Support helped me reset my TSA lock within minutes. Great products and even better service.",
    date: "Nov 2026",
  },
];
function getFeedback() {
  return loadJSON("bronx-feedback", SEED_FEEDBACK);
}
function renderFeedback() {
  const list = $("#feedbackList");
  if (!list) return;
  list.innerHTML = getFeedback()
    .map(
      (f) => `
    <div class="feedback-item">
      <span class="stars">${stars(f.rating)}</span> <strong>${f.name}</strong>
      <p>\u201C${f.text}\u201D</p><small>${f.date}</small>
    </div>`,
    )
    .join("");
}
let locationText = "Locating\u2026";
function updateTicker() {
  const el = $("#tickerText");
  if (!el) return;
  const now = /* @__PURE__ */ new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
  const msg = `\u{1F4C5} ${dateStr} &nbsp;\u2022&nbsp; \u{1F550} ${timeStr} &nbsp;\u2022&nbsp; \u{1F4CD} ${locationText} &nbsp;\u2022&nbsp; \u2708\uFE0F Free shipping on orders over $99 &nbsp;\u2022&nbsp; \u{1F504} 30-day easy returns &nbsp;\u2022&nbsp; \u2B50 Rated 4.7/5 by 2,400+ travellers &nbsp;\u2022&nbsp; `;
  el.innerHTML = msg + msg;
}
function detectLocation() {
  if (!("geolocation" in navigator)) {
    locationText = "Location not supported";
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude,
        lon = pos.coords.longitude;
      locationText = `${lat.toFixed(2)}\xB0, ${lon.toFixed(2)}\xB0`;
      fetch(
        "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
          lat +
          "&longitude=" +
          lon +
          "&localityLanguage=en",
      )
        .then((r) => r.json())
        .then((d) => {
          const city = d.city || d.locality || d.principalSubdivision || "";
          const country = d.countryName || "";
          const place = [city, country].filter(Boolean).join(", ");
          if (place) locationText = place;
        })
        .catch(() => {});
    },
    (err) => {
      locationText =
        err && err.code === 1
          ? "Location off \u2014 allow it in browser settings"
          : "Location unavailable right now";
    },
    { timeout: 15e3, maximumAge: 0, enableHighAccuracy: false },
  );
}
function visitorCounter() {
  let n = 1;
  try {
    n = (parseInt(localStorage.getItem("bronx-visits") || "0", 10) || 0) + 1;
    localStorage.setItem("bronx-visits", String(n));
  } catch (e) {}
  const el = $("#visitorCount");
  if (el) el.textContent = n.toLocaleString();
}
const emailOK = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
function showErr(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
}
function bindForms() {
  on($("#feedbackForm"), "submit", (e) => {
    e.preventDefault();
    const name = $("#fbName").value.trim(),
      email = $("#fbEmail").value.trim(),
      msg = $("#fbMessage").value.trim();
    const err = $("#fbError");
    if (name.length < 2) return showErr(err, "Please enter your name.");
    if (!emailOK(email))
      return showErr(err, "Please enter a valid email address.");
    if (msg.length < 10)
      return showErr(
        err,
        "Please write a little more (at least 10 characters).",
      );
    if (err) err.hidden = true;
    const list = getFeedback();
    list.unshift({
      name,
      rating: +$("#fbRating").value,
      text: msg,
      date: /* @__PURE__ */ new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    });
    saveJSON("bronx-feedback", list);
    renderFeedback();
    e.target.reset();
    $("#fbOk").hidden = false;
    toast("Thank you for your feedback! \u2605");
  });
  on($("#contactForm"), "submit", (e) => {
    e.preventDefault();
    const name = $("#ctName").value.trim(),
      email = $("#ctEmail").value.trim(),
      msg = $("#ctMessage").value.trim();
    const err = $("#ctError");
    if (name.length < 2) return showErr(err, "Please enter your name.");
    if (!emailOK(email))
      return showErr(err, "Please enter a valid email address.");
    if (msg.length < 10)
      return showErr(
        err,
        "Please write a little more (at least 10 characters).",
      );
    if (err) err.hidden = true;
    e.target.reset();
    showContactPopup();
  });
  on($("#newsletterForm"), "submit", (e) => {
    e.preventDefault();
    if (!emailOK($("#nlEmail").value.trim())) {
      toast("Please enter a valid email address.");
      return;
    }
    e.target.reset();
    $("#nlOk").hidden = false;
    toast("Welcome aboard! \u2708\uFE0F");
  });
  on($("#checkoutForm"), "submit", (e) => {
    e.preventDefault();
    const err = $("#coError");
    if (!cart.length) return showErr(err, "Your cart is empty.");
    if ($("#coName").value.trim().length < 2)
      return showErr(err, "Please enter your full name.");
    if (!emailOK($("#coEmail").value.trim()))
      return showErr(err, "Please enter a valid email address.");
    if ($("#coAddress").value.trim().length < 8)
      return showErr(err, "Please enter a full delivery address.");
    if (err) err.hidden = true;
    cart = [];
    saveCart();
    e.target.reset();
    showOrderPopup();
  });
}
function bindEvents() {
  on($("#searchToggle"), "click", () => {
    const bar = $("#searchBar");
    if (!bar) return;
    bar.hidden = !bar.hidden;
    if (!bar.hidden) $("#searchInput").focus();
  });
  const goSearch = () => {
    const q = $("#searchInput").value.trim();
    if (location.pathname.endsWith("shop.html")) {
      filters.search = q;
      renderShopProducts();
    } else if (q) {
      location.href = "shop.html?q=" + encodeURIComponent(q);
    }
  };
  on($("#searchGo"), "click", goSearch);
  on($("#searchInput"), "keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goSearch();
    }
  });
  on($("#searchInput"), "input", (e) => {
    if (location.pathname.endsWith("shop.html")) {
      filters.search = e.target.value.trim();
      renderShopProducts();
    }
  });
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      addToCart(+add.dataset.add, 1, add, add.dataset.color || "");
      return;
    }
    const wish = e.target.closest("[data-wish]");
    if (wish) {
      toggleWish(+wish.dataset.wish);
      return;
    }
    const cmp = e.target.closest("[data-compare]");
    if (cmp) {
      toggleCompare(+cmp.dataset.compare);
      return;
    }
    const qv = e.target.closest("[data-quick]");
    if (qv) {
      openQuickView(+qv.dataset.quick);
      return;
    }
  });
  on($("#cartOpen"), "click", openCart);
  on($("#cartClose"), "click", closeCart);
  on($("#overlay"), "click", closeCart);
  const cartItems = $("#cartItems");
  if (cartItems) cartItems.addEventListener("click", cartItemClicks);
  const cartPage = $("#cartPageItems");
  if (cartPage) cartPage.addEventListener("click", cartItemClicks);
  $$("#clearCartBtn, #clearCartBtn2").forEach((b) =>
    b.addEventListener("click", () => {
      cart = [];
      saveCart();
      toast("Cart cleared.");
    }),
  );
  on($("#galleryGrid"), "click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item) openLightbox(+item.dataset.idx);
  });
  on($("#lightboxClose"), "click", closeLightbox);
  on($("#lightbox"), "click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  on($("#hamburger"), "click", () => {
    const nav = $("#mainNav");
    nav.classList.toggle("open");
    $("#hamburger").setAttribute(
      "aria-expanded",
      nav.classList.contains("open"),
    );
  });
  $$(".nav-link").forEach((a) =>
    a.addEventListener("click", () => $("#mainNav").classList.remove("open")),
  );
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeCart();
    closeLightbox();
    closeQuickView();
    closeCompareModal();
    closeChat();
    closeGuide();
    closeWish();
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  $$(".fade-in").forEach((el) => io.observe(el));
}
function initPreloader() {}
let tiltCard = null;
function init3DEffects() {
  return;
  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest ? e.target.closest(".product-card") : null;
    if (card !== tiltCard) {
      if (tiltCard) tiltCard.style.transform = "";
      tiltCard = card;
    }
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 10;
    const ry = (px - 0.5) * 12;
    card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-8px)`;
    card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
    card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
  });
  document.addEventListener("mouseleave", () => {
    if (tiltCard) {
      tiltCard.style.transform = "";
      tiltCard = null;
    }
  });
  const hero = document.querySelector(".hero");
  const heroImg = document.querySelector(".hero-img");
  if (hero && heroImg) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      heroImg.style.transform = `scale(1.1) translate(${(px * -18).toFixed(1)}px, ${(py * -12).toFixed(1)}px)`;
    });
    hero.addEventListener("mouseleave", () => {
      heroImg.style.transform = "";
    });
  }
}
function cartItemClicks(e) {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const del = e.target.closest("[data-del]");
  if (inc) {
    const it = cart.find((i) => i.id === +inc.dataset.inc);
    if (it) it.qty = Math.min(9, it.qty + 1);
    saveCart();
  }
  if (dec) {
    const it = cart.find((i) => i.id === +dec.dataset.dec);
    if (it) {
      it.qty--;
      if (it.qty <= 0) cart = cart.filter((i) => i !== it);
    }
    saveCart();
  }
  if (del) {
    cart = cart.filter((i) => i.id !== +del.dataset.del);
    saveCart();
    toast("Removed from cart.");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const y = $("#year");
  if (y) y.textContent = /* @__PURE__ */ new Date().getFullYear();
  visitorCounter();
  detectLocation();
  updateTicker();
  setInterval(updateTicker, 1e3);
  renderCart();
  renderFeedback();
  bindForms();
  bindEvents();
  init3DEffects();
  initPreloader();
  showSkeletons();
  initFeaturesPack();
  initGlassNav();
  loadProducts();
});
function showSkeletons() {
  const sk = (n) =>
    Array.from(
      { length: n },
      () =>
        `<div class="skeleton"><div class="sk-img"></div><div class="sk-line"></div><div class="sk-line short"></div><div class="sk-line short"></div></div>`,
    ).join("");
  const fg = $("#featuredGrid");
  if (fg) fg.innerHTML = sk(4);
  const pg = $("#productGrid");
  if (pg) pg.innerHTML = sk(8);
  const rg = $("#recentGrid");
  if (rg) rg.innerHTML = sk(4);
}
function initTheme() {
  const btn = $("#themeToggle");
  const apply = (dark) => {
    document.body.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("bronx-theme", dark ? "dark" : "light");
    } catch (e) {}
    if (btn) btn.textContent = dark ? "\u2600\uFE0F" : "\u{1F319}";
  };
  if (btn) {
    btn.textContent = document.body.classList.contains("dark")
      ? "\u2600\uFE0F"
      : "\u{1F319}";
    btn.addEventListener("click", () =>
      apply(!document.body.classList.contains("dark")),
    );
  }
}
const WISHLIST_STORAGE_KEY = "bronx-wishlist";
function normaliseWishlist(value) {
  let items = value;
  if (items && !Array.isArray(items) && typeof items === "object") {
    items = items.items || items.wishlist || items.products || [];
  }
  if (!Array.isArray(items)) return [];
  const ids = items
    .map((item) => {
      if (item && typeof item === "object") {
        return Number(item.id ?? item.productId ?? item.product_id);
      }
      return Number(item);
    })
    .filter((id) => Number.isSafeInteger(id) && id > 0);
  return [...new Set(ids)];
}
let wishlist = normaliseWishlist(loadJSON(WISHLIST_STORAGE_KEY, []));
function readWishlistFromStorage() {
  try {
    return normaliseWishlist(
      JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]"),
    );
  } catch (error) {
    return [];
  }
}
function saveWishlist() {
  wishlist = normaliseWishlist(wishlist);
  saveJSON(WISHLIST_STORAGE_KEY, wishlist);
}
function isWished(id) {
  return wishlist.includes(Number(id));
}
function toggleWish(id) {
  id = Number(id);
  if (!Number.isSafeInteger(id) || id <= 0) return;
  wishlist = isWished(id)
    ? wishlist.filter((savedId) => savedId !== id)
    : [...wishlist, id];
  saveWishlist();
  renderWish();
  const product = getProduct(id);
  toast(
    isWished(id)
      ? `\u2665 Saved to wishlist: ${product ? product.name : "item"}`
      : "Removed from wishlist.",
  );
}
function renderWish() {
  const availableWishlist = PRODUCTS.length
    ? wishlist.filter((id) => getProduct(id))
    : wishlist;
  const count = $("#wishCount");
  if (count) count.textContent = availableWishlist.length;
  const drawerCount = $("#wishDrawerCount");
  if (drawerCount) drawerCount.textContent = availableWishlist.length;
  $$("[data-wish]").forEach((button) => {
    const active = isWished(button.dataset.wish);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  const box = $("#wishItems");
  if (!box || !PRODUCTS.length) return;
  if (!availableWishlist.length) {
    box.innerHTML = `
      <p class="cart-empty">
        Your wishlist is empty.<br>
        Tap \u2665 on any product to save it here.
      </p>
    `;
    return;
  }
  box.innerHTML = availableWishlist
    .map((id) => {
      const p = getProduct(id);
      if (!p) return "";
      const btn =
        "width:26px;height:26px;border:1px solid #e4ddd2;border-radius:6px;background:transparent;color:inherit;cursor:pointer;font-weight:700;line-height:1;padding:0";
      return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}">

        <div>
          <strong>${p.name}</strong>
          <small>${money(p.price)} \xB7 ${p.color}</small>

          <div style="display:flex;align-items:center;gap:8px;margin:6px 0">
            <button type="button" style="${btn}" data-wish-dec="${p.id}" aria-label="Decrease quantity">\u2212</button>
            <span>${getWishQty(p.id)}</span>
            <button type="button" style="${btn}" data-wish-inc="${p.id}" aria-label="Increase quantity">+</button>
          </div>

          <div class="qty-row">
            <button
              class="trash-btn"
              data-wish-del="${p.id}"
              aria-label="Remove ${p.name} from wishlist"
              title="Remove">
              <svg viewBox="0 0 24 24">
                <g class="t-lid">
                  <path d="M3 6h18"/>
                  <path d="M9 6V4h6v2"/>
                </g>
                <path d="M5 6l1 14h12l1-14"/>
                <path d="M10 11v6M14 11v6"/>
              </svg>
            </button>

            <button
              class="btn btn-ghost"
              type="button"
              data-wish-add="${p.id}">
              Add to Cart
            </button>
          </div>
        </div>

        <div class="line-total">${money(p.price)}</div>
      </div>
    `;
    })
    .join("");
}
const WISH_QTY_KEY = "bronx-wishlist-qty";
let wishQty = loadJSON(WISH_QTY_KEY, {});
if (!wishQty || typeof wishQty !== "object" || Array.isArray(wishQty))
  wishQty = {};
function getWishQty(id) {
  return Math.max(1, Math.min(9, +wishQty[id] || 1));
}
function setWishQty(id, q) {
  wishQty[id] = Math.max(1, Math.min(9, q));
  saveJSON(WISH_QTY_KEY, wishQty);
  renderWish();
}
document.addEventListener("click", (e) => {
  const inc = e.target.closest("[data-wish-inc]");
  if (inc) {
    const id = +inc.dataset.wishInc;
    setWishQty(id, getWishQty(id) + 1);
    return;
  }
  const dec = e.target.closest("[data-wish-dec]");
  if (dec) {
    const id = +dec.dataset.wishDec;
    setWishQty(id, getWishQty(id) - 1);
    return;
  }
  const add = e.target.closest("[data-wish-add]");
  if (add) {
    const id = +add.dataset.wishAdd;
    addToCart(id, getWishQty(id), add);
  }
});
function refreshWishlist() {
  wishlist = readWishlistFromStorage();
  renderWish();
}
function ensureWishDrawer() {
  if (document.getElementById("wishDrawer")) return;
  const aside = document.createElement("aside");
  aside.className = "wish-drawer";
  aside.id = "wishDrawer";
  aside.setAttribute("aria-hidden", "true");
  aside.innerHTML =
    '<div class="drawer-head">  <h3>My Wishlist (<span id="wishDrawerCount">0</span>)</h3>  <button class="icon-btn" id="wishClose" aria-label="Close wishlist">\u2715</button></div><div class="drawer-body" id="wishItems"></div>';
  document.body.appendChild(aside);
  aside.querySelector("#wishClose").addEventListener("click", closeWish);
  aside.querySelector("#wishItems").addEventListener("click", (e) => {
    const del = e.target.closest("[data-wish-del]");
    if (del) toggleWish(+del.dataset.wishDel);
  });
}
function openWish() {
  ensureWishDrawer();
  const drawer = $("#wishDrawer");
  if (!drawer) return;
  refreshWishlist();
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  const overlay = $("#overlay");
  if (overlay) overlay.hidden = false;
}
function closeWish() {
  const drawer = $("#wishDrawer");
  if (!drawer) return;
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  if (!$("#cartDrawer")?.classList.contains("open")) {
    const overlay = $("#overlay");
    if (overlay) overlay.hidden = true;
  }
}
window.addEventListener("storage", (event) => {
  if (event.key === WISHLIST_STORAGE_KEY || event.key === null) {
    refreshWishlist();
  }
});
window.addEventListener("pageshow", () => {
  refreshWishlist();
});
function openQuickView(id) {
  const p = PRODUCTS.find((p2) => p2.id === id);
  const m = $("#quickModal");
  if (!p || !m) return;
  $("#quickContent").innerHTML = `
    <div><img src="${p.image}" alt="${p.name}"></div>
    <div>
      <span class="qv-brand">${p.brand} \xB7 ${p.category}</span>
      <h2 style="font-family:var(--font-display);color:var(--navy);font-size:1.6rem;margin:6px 0 8px">${p.name}</h2>
      <p class="stars">${stars(p.rating)} ${p.rating} (${p.reviews} reviews)</p>
      <p class="qv-price" style="font-size:1.5rem">${money(p.price)}${p.oldPrice ? ` <span class="old">${money(p.oldPrice)}</span>` : ""}</p>
      <p style="color:var(--muted);margin:10px 0">${p.description}</p>
      <p style="font-size:.92rem">Size: ${p.size} \xB7 Colour: ${p.color}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">
        <button class="btn btn-gold" data-add="${p.id}">Add to Cart</button>
        <button class="btn btn-ghost" data-wish="${p.id}">${isWished(p.id) ? "\u2665 In Wishlist" : "\u2665 Wishlist"}</button>
        <a class="btn btn-ghost" href="product.html?id=${p.id}">Full Details \u2192</a>
      </div>
    </div>`;
  m.hidden = false;
}
function closeQuickView() {
  const m = $("#quickModal");
  if (m) m.hidden = true;
}
let compareSet = loadJSON("bronx-compare", []);
function toggleCompare(id) {
  if (compareSet.includes(id)) compareSet = compareSet.filter((x) => x !== id);
  else {
    if (compareSet.length >= 3) {
      toast("You can compare up to 3 products.");
      return;
    }
    compareSet.push(id);
  }
  saveJSON("bronx-compare", compareSet);
  renderCompareTray();
  const p = PRODUCTS.find((p2) => p2.id === id);
  toast(
    compareSet.includes(id)
      ? `Added to comparison: ${p ? p.name : "item"}`
      : "Removed from comparison.",
  );
}
function renderCompareTray() {
  const tray = $("#compareTray");
  if (!tray) return;
  $$("[data-compare]").forEach((b) =>
    b.classList.toggle("active", compareSet.includes(+b.dataset.compare)),
  );
  $("#compareCount").textContent = `Compare (${compareSet.length})`;
  $("#compareThumbs").innerHTML = compareSet
    .map((id) => {
      const p = PRODUCTS.find((p2) => p2.id === id);
      return p ? `<img src="${p.image}" alt="${p.name}">` : "";
    })
    .join("");
  tray.classList.toggle("show", compareSet.length > 0);
}
function openCompareModal() {
  const m = $("#compareModal");
  if (!m) return;
  if (!compareSet.length) {
    toast("Add products to compare first (\u21C4 Compare on any card).");
    return;
  }
  const rows = [
    [
      "Product",
      (p) =>
        `<button type="button" class="cmp-remove" data-cmp-remove="${p.id}" aria-label="Remove ${p.name} from comparison" title="Remove from comparison">\u2715</button><img src="${p.image}" alt="${p.name}"><br><strong>${p.name}</strong>`,
    ],
    ["Brand", (p) => p.brand],
    ["Price", (p) => money(p.price)],
    ["Rating", (p) => `${p.rating} \u2605 (${p.reviews} reviews)`],
    ["Size", (p) => p.size],
    ["Colour", (p) => p.color],
    ["Weight", (p) => p.specs.Weight || "\u2014"],
    ["Warranty", (p) => p.specs.Warranty || "\u2014"],
    [
      "",
      (p) => `<a class="btn btn-gold" href="product.html?id=${p.id}">View</a>`,
    ],
  ];
  const items = compareSet
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p) => p && +p.id < 1000);
  $("#compareTable").innerHTML = `<table class="compare-table"><tbody>${rows
    .map(
      ([label, fn]) =>
        `<tr><th>${label}</th>${items.map((p) => `<td>${fn(p)}</td>`).join("")}</tr>`,
    )
    .join("")}</tbody></table>`;
  m.hidden = false;
}
function closeCompareModal() {
  const m = $("#compareModal");
  if (m) m.hidden = true;
}
const CHAT_REPLIES = [
  [
    /ship|deliver/i,
    "We offer FREE shipping on orders over $99 (otherwise $9.99). Orders ship within 24 hours, Monday\u2013Saturday, and usually arrive in 2\u20135 business days. \u2708\uFE0F",
  ],
  [
    /return|refund|exchange/i,
    "No worries \u2014 you have 30-day easy returns, no questions asked. We refund to your original payment method within 3\u20135 business days of receiving the item.",
  ],
  [
    /track|where.*order|status/i,
    "You can track your order from the confirmation email we sent you. If you cannot find it, email us at bronxluggage@gmail.com with your order number.",
  ],
  [
    /price|discount|offer|sale/i,
    "Our best sellers start at $59.99, and many items are on sale right now \u2014 look for the crossed-out old price. Students get 10% off with the newsletter signup!",
  ],
  [
    /size|dimension|big|small/i,
    'Sizes run Small (under 22"), Medium (22\u201326") and Large (27"+). Every product page lists exact dimensions, weight and capacity under Specifications.',
  ],
  [
    /warranty|guarantee/i,
    "Every product carries a 2\u201310 year warranty against manufacturing defects \u2014 the exact length is on the product page.",
  ],
  [
    /contact|human|agent|call|phone/i,
    "You can reach us at bronxluggage@gmail.com or (555) 123-4567, Mon\u2013Sat 9 AM\u20136 PM. We usually reply within a few hours.",
  ],
  [
    /hour|open|close/i,
    "Our store is open Mon\u2013Sat, 9:00 AM\u20138:00 PM, and Sunday 11:00 AM\u20136:00 PM. Online, we are always open! \u{1F6CD}\uFE0F",
  ],
  [
    /hi|hello|hey/i,
    "Hello! \u{1F44B} Welcome to Bronx Luggage. Ask me about shipping, returns, sizes, prices \u2014 or tap a suggestion below.",
  ],
];
function chatReply(text) {
  const hit = CHAT_REPLIES.find(([re]) => re.test(text));
  return hit
    ? hit[1]
    : "Great question! For that one, our team can help best \u2014 email bronxluggage@gmail.com or call (555) 123-4567. Meanwhile, I can help with shipping, returns, sizes, prices and tracking. \u{1F60A}";
}
function chatAddMsg(text, who) {
  const body = $("#chatBody");
  if (!body) return;
  const div = document.createElement("div");
  div.className = "chat-msg " + who;
  div.textContent = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
  return div;
}
function openChat() {
  const p = $("#chatPanel");
  if (!p) return;
  p.hidden = false;
  const body = $("#chatBody");
  if (body && !body.children.length) {
    chatAddMsg(
      "Hi there! \u{1F44B} I'm the Bronx assistant. How can I help you today?",
      "bot",
    );
  }
}
function closeChat() {
  const p = $("#chatPanel");
  if (p) p.hidden = true;
}
function initChat() {
  ensureChatUI();
  on($("#chatFab"), "click", openChat);
  on($("#chatClose"), "click", closeChat);
  const chips = $("#chatChips");
  if (chips) {
    chips.innerHTML = [
      "Shipping info",
      "Returns",
      "Track order",
      "Opening hours",
    ]
      .map((c) => `<button type="button" data-chip="${c}">${c}</button>`)
      .join("");
    chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-chip]");
      if (!b) return;
      sendChat(b.dataset.chip);
    });
  }
  on($("#chatForm"), "submit", (e) => {
    e.preventDefault();
    const input = $("#chatText");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    sendChat(text);
  });
}
function sendChat(text) {
  chatAddMsg(text, "user");
  const typing = chatAddMsg("Typing\u2026", "bot typing");
  setTimeout(() => {
    typing.remove();
    chatAddMsg(chatReply(text), "bot");
  }, 750);
}
const GUIDE_STEPS = [
  {
    sel: "#mainNav",
    title: "1. Navigation",
    text: "Use the menu to jump between Home, Shop, Men, Women, Brands, Gallery, About and Contact.",
  },
  {
    sel: "#searchToggle",
    title: "2. Search",
    text: "Tap the magnifier to search any product \u2014 suggestions appear as you type.",
  },
  {
    sel: "#featuredGrid, #productGrid",
    title: "3. Products",
    text: "Hover a card to see it tilt in 3D. Tap \u2665 to save it, \u21C4 to compare it, or \u{1F441} Quick View for a peek.",
  },
  {
    sel: "#cartOpen",
    title: "4. Cart",
    text: "Everything you add lands here. Free shipping kicks in over $99.",
  },
  {
    sel: "#themeToggle",
    title: "5. Dark mode",
    text: "Tap the moon to switch the whole store to a dark theme.",
  },
  {
    sel: "#chatFab",
    title: "6. Need help?",
    text: "The chat bubble answers questions about shipping, returns and more \u2014 any time.",
  },
];
let tourIdx = -1;
function openGuide() {
  const p = $("#guidePanel");
  if (!p) return;
  p.hidden = false;
  const steps = $("#guideSteps");
  if (steps && !steps.children.length) {
    steps.innerHTML = `
      <p style="margin-bottom:12px;color:var(--muted)">New here? Take the 60-second tour \u2014 I will show you around the store.</p>
      <button class="btn btn-gold btn-block" id="tourStart" type="button" style="margin-bottom:14px">\u25B6 Start the tour</button>
      ${GUIDE_STEPS.map((s, i) => `<div class="guide-step" data-step="${i}"><div>\u{1F9ED}</div><div><b>${s.title}</b><span>${s.text}</span></div></div>`).join("")}`;
    steps.addEventListener("click", (e) => {
      if (e.target.closest("#tourStart")) {
        startTour(0);
        return;
      }
      const st = e.target.closest("[data-step]");
      if (st) startTour(+st.dataset.step);
    });
  }
}
function closeGuide() {
  const p = $("#guidePanel");
  if (p) p.hidden = true;
  endTour();
}
function startTour(i) {
  tourIdx = i;
  const step = GUIDE_STEPS[i];
  const el = step ? document.querySelector(step.sel) : null;
  if (!step) {
    endTour();
    return;
  }
  if (!el) {
    startTour(i + 1);
    return;
  }
  closeGuide();
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  $$(".tour-highlight").forEach((x) => x.classList.remove("tour-highlight"));
  el.classList.add("tour-highlight");
  const tip = $("#guideTip");
  const r = el.getBoundingClientRect();
  tip.innerHTML = `<h4>${step.title}</h4><p>${step.text}</p>
    <div class="row">
      <button class="btn btn-ghost" id="tourSkip" type="button">Skip</button>
      ${i > 0 ? '<button class="btn btn-ghost" id="tourBack" type="button">\u2190 Back</button>' : ""}
      <button class="btn btn-gold" id="tourNext" type="button">${i === GUIDE_STEPS.length - 1 ? "Finish \u2713" : "Next \u2192"}</button>
    </div>`;
  tip.hidden = false;
  tip.style.top =
    Math.min(Math.max(12, r.bottom + 12), innerHeight - 190) + "px";
  tip.style.left = Math.min(Math.max(12, r.left), innerWidth - 340) + "px";
  $("#tourNext").addEventListener("click", () => startTour(i + 1));
  const back = $("#tourBack");
  if (back) back.addEventListener("click", () => startTour(i - 1));
  $("#tourSkip").addEventListener("click", endTour);
}
function endTour() {
  tourIdx = -1;
  const tip = $("#guideTip");
  if (tip) tip.hidden = true;
  $$(".tour-highlight").forEach((x) => x.classList.remove("tour-highlight"));
}
function initCounters() {
  const els = $$("[data-count]");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        const target = parseFloat(el.dataset.count);
        const dec = +(el.dataset.decimals || 0);
        const start = performance.now(),
          dur = 1300;
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(dec);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 },
  );
  els.forEach((el) => io.observe(el));
}
function initMagnetic() {
  $$(".btn.magnetic, .hero-cta .btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / r.width;
      const dy = (e.clientY - r.top - r.height / 2) / r.height;
      btn.style.transform = `translate(${(dx * 10).toFixed(1)}px, ${(dy * 8).toFixed(1)}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}
function initTransitions() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      a.target === "_blank" ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    if (!/\.html($|\?)/.test(href)) return;
    e.preventDefault();
    const transition = document.querySelector("#pageTransition");
    if (transition) {
      transition.classList.add("go");
      setTimeout(() => {
        window.location.href = href;
      }, 180);
    } else {
      window.location.href = href;
    }
  });
}
function initToTop() {
  const btn = $("#toTop");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("show", window.scrollY > 400);
    },
    { passive: true },
  );
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}
function initSearchSuggest() {
  const input = $("#searchInput"),
    box = $("#searchSuggest");
  if (!input || !box) return;
  const hide = () => {
    box.hidden = true;
  };
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) {
      hide();
      return;
    }
    const hits = PRODUCTS.filter((p) =>
      (p.name + " " + p.brand + " " + p.category + " " + p.color)
        .toLowerCase()
        .includes(q),
    ).slice(0, 5);
    if (!hits.length) {
      hide();
      return;
    }
    box.innerHTML = hits
      .map(
        (p) =>
          `<button type="button" data-goto="product.html?id=${p.id}"><img src="${p.image}" alt=""><span><strong>${p.name}</strong><br><small>${p.brand} \xB7 ${money(p.price)}</small></span></button>`,
      )
      .join("");
    box.hidden = false;
  });
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-goto]");
    if (b) location.href = b.dataset.goto;
  });
  input.addEventListener("blur", () => setTimeout(hide, 200));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hide();
  });
}
function initMarquee() {
  const track = $("#brandMarquee");
  if (!track) return;
  const brands = [...new Set(PRODUCTS.map((p) => p.brand))];
  const seq = brands.map((b) => `<span>${b}</span><i>\u2726</i>`).join("");
  track.innerHTML = seq + seq;
}
function renderRecent() {
  const sec = $("#recentSection"),
    grid = $("#recentGrid");
  if (!sec || !grid) return;
  let recent = [];
  try {
    recent = JSON.parse(localStorage.getItem("bronx-recent") || "[]");
  } catch (e) {}
  const items = recent
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);
  if (!items.length) {
    sec.hidden = true;
    return;
  }
  sec.hidden = false;
  grid.innerHTML = items.map((p, i) => productCard(p, i)).join("");
}
function initShowcase() {
  const stage = $("#showcaseStage"),
    img = $("#showcaseImg");
  if (!stage || !img) return;
  let dragging = false,
    startX = 0,
    startY = 0,
    rot = 0,
    rotX = 3,
    startRot = 0,
    startRotX = 3;
  const setRot = (r, rx) => {
    rot = Math.max(-50, Math.min(50, r));
    rotX = Math.max(-30, Math.min(30, rx));
    img.style.transform = `rotateX(${rotX}deg) rotateY(${rot}deg)`;
  };
  stage.addEventListener("pointerdown", (e) => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startRot = rot;
    startRotX = rotX;
    img.style.animation = "none";
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    setRot(
      startRot + (e.clientX - startX) * 0.25,
      startRotX - (e.clientY - startY) * 0.2,
    );
  });
  const end = () => {
    dragging = false;
  };
  stage.addEventListener("pointerup", end);
  stage.addEventListener("pointercancel", end);
}
function initAccordions() {
  $$(".accordion").forEach((acc) => {
    const head = acc.querySelector(".accordion-head");
    const body = acc.querySelector(".accordion-body");
    if (!head || !body) return;
    if (acc.classList.contains("open"))
      body.style.maxHeight = body.scrollHeight + "px";
    head.addEventListener("click", () => {
      const open = acc.classList.toggle("open");
      body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
    });
  });
}
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -6% 0px" },
  );
  $$(".reveal").forEach((el, i) => {
    el.dataset.delay = (i % 4) + 1;
    io.observe(el);
  });
}
function initHeroScroll() {
  const content = document.querySelector(".hero-content");
  if (!content) return;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y < 600) content.style.transform = `translateY(${y * 0.22}px)`;
    },
    { passive: true },
  );
}
function initViewer360() {
  const viewer = $("#pdViewer"),
    img = $("#pdImage"),
    bar = $("#v360Bar");
  if (!viewer || !img) return;
  let dragging = false,
    startX = 0,
    startY = 0,
    rot = 0,
    rotX = 0,
    zoom = 1,
    startRot = 0,
    startRotX = 0;
  img.style.transition = "transform .12s linear";
  const apply = () => {
    img.style.transform = `rotateX(${rotX.toFixed(1)}deg) rotateY(${rot}deg) scale(${zoom})`;
    if (bar) bar.style.width = ((rot + 45) / 90) * 100 + "%";
  };
  const setRot = (r, rx) => {
    rot = Math.max(-45, Math.min(45, r));
    rotX = Math.max(-35, Math.min(35, rx));
    apply();
  };
  viewer.addEventListener("pointerdown", (e) => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startRot = rot;
    startRotX = rotX;
    viewer.setPointerCapture(e.pointerId);
  });
  viewer.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    setRot(
      startRot + (e.clientX - startX) * 0.4,
      startRotX - (e.clientY - startY) * 0.3,
    );
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((ev) =>
    viewer.addEventListener(ev, () => {
      dragging = false;
    }),
  );
  viewer.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      zoom = Math.max(1, Math.min(2.4, zoom + (e.deltaY < 0 ? 0.2 : -0.2)));
      viewer.dataset.wheelZoomed = zoom > 1 ? "1" : "";
      apply();
    },
    { passive: false },
  );
  viewer.addEventListener("dblclick", () => {
    zoom = 1;
    rot = 0;
    rotX = 0;
    viewer.dataset.wheelZoomed = "";
    apply();
  });
}
function initZoomLens() {
  const viewer = $("#pdViewer"),
    img = $("#pdImage");
  if (!viewer || !img) return;
  viewer.addEventListener("mousemove", (e) => {
    if (e.buttons) return;
    if (viewer.dataset.wheelZoomed) return;
    const r = viewer.getBoundingClientRect();
    const px = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
    const py = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
    img.style.transformOrigin = `${px}% ${py}%`;
    img.style.transform = "scale(1.9)";
  });
  viewer.addEventListener("mouseleave", () => {
    if (viewer.dataset.wheelZoomed) return;
    img.style.transformOrigin = "center";
    img.style.transform = "";
  });
}
function initCardRotateZoom() {
  document.addEventListener("dragstart", (e) => e.preventDefault());
  const state = /* @__PURE__ */ new WeakMap();
  document.addEventListener("pointerdown", (e) => {
    const img = e.target.closest
      ? e.target.closest(".product-media img")
      : null;
    if (!img) return;
    state.set(img, {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      rot: 0,
      rotX: 0,
      zoom: 1,
    });
    img.style.transition = "none";
    img.setPointerCapture?.(e.pointerId);
  });
  document.addEventListener("pointermove", (e) => {
    const img = e.target.closest
      ? e.target.closest(".product-media img")
      : null;
    const st = img && state.get(img);
    if (!st || !st.dragging) return;
    st.rot = Math.max(-30, Math.min(30, (e.clientX - st.startX) * 0.25));
    st.rotX = Math.max(-20, Math.min(20, -(e.clientY - st.startY) * 0.2));
    if (
      Math.abs(e.clientX - st.startX) > 6 ||
      Math.abs(e.clientY - st.startY) > 6
    )
      st.moved = true;
    img.style.transform = `rotateX(${st.rotX.toFixed(1)}deg) rotateY(${st.rot.toFixed(1)}deg) scale(${st.zoom})`;
  });
  const endDrag = (e) => {
    const img = e.target.closest
      ? e.target.closest(".product-media img")
      : null;
    const st = img && state.get(img);
    if (!st) return;
    st.dragging = false;
    if (st.moved) {
      document.addEventListener(
        "click",
        function block(e2) {
          e2.preventDefault();
          e2.stopPropagation();
        },
        { capture: true, once: true },
      );
    }
    img.style.transition = "transform .45s cubic-bezier(.2,.8,.3,1)";
    img.style.transform = "";
    state.delete(img);
  };
  document.addEventListener("pointerup", endDrag);
  document.addEventListener("pointercancel", endDrag);
  document.addEventListener(
    "wheel",
    (e) => {
      const img = e.target.closest
        ? e.target.closest(".product-media img")
        : null;
      if (!img) return;
      e.preventDefault();
      const st = state.get(img) || {
        dragging: false,
        startX: 0,
        rot: 0,
        zoom: 1,
      };
      st.zoom = Math.max(
        1,
        Math.min(2.2, st.zoom + (e.deltaY < 0 ? 0.2 : -0.2)),
      );
      state.set(img, st);
      img.style.transition = "transform .15s ease";
      img.style.transform = `rotateX(${(st.rotX || 0).toFixed(1)}deg) rotateY(${st.rot.toFixed(1)}deg) scale(${st.zoom})`;
    },
    { passive: false, capture: true },
  );
  document.addEventListener("pointerout", (e) => {
    const img = e.target.closest
      ? e.target.closest(".product-media img")
      : null;
    if (!img) return;
    const st = state.get(img);
    if (st && !st.dragging) {
      img.style.transition = "transform .45s cubic-bezier(.2,.8,.3,1)";
      img.style.transform = "";
      state.delete(img);
    }
  });
}
function initImgCompare() {
  const wrap = $("#imgCompare");
  if (!wrap) return;
  const after = $("#cmpAfterWrap"),
    divider = $("#cmpDivider");
  let dragging = false;
  const setPos = (clientX) => {
    const r = wrap.getBoundingClientRect();
    const f = Math.max(0.05, Math.min(0.95, (clientX - r.left) / r.width));
    after.style.clipPath = `inset(0 0 0 ${(f * 100).toFixed(1)}%)`;
    divider.style.left = (f * 100).toFixed(1) + "%";
  };
  wrap.addEventListener("pointerdown", (e) => {
    dragging = true;
    wrap.setPointerCapture(e.pointerId);
    setPos(e.clientX);
  });
  wrap.addEventListener("pointermove", (e) => {
    if (dragging) setPos(e.clientX);
  });
  ["pointerup", "pointercancel"].forEach((ev) =>
    wrap.addEventListener(ev, () => {
      dragging = false;
    }),
  );
  after.style.clipPath = "inset(0 0 0 50%)";
}
function getUser() {
  try {
    return JSON.parse(localStorage.getItem("bronx-user") || "null");
  } catch (e) {
    return null;
  }
}
function setUser(u) {
  try {
    if (u) localStorage.setItem("bronx-user", JSON.stringify(u));
    else localStorage.removeItem("bronx-user");
  } catch (e) {}
  renderAuthLink();
  renderAuthPage();
}
function renderAuthLink() {
  const l = $("#authLabel");
  if (!l) return;
  const u = getUser();
  l.textContent = u ? "Hi, " + String(u.name).split(" ")[0] : "Login";
}
function renderAuthPage() {
  const forms = $("#authForms"),
    signed = $("#authSignedIn");
  if (!forms || !signed) return;
  const u = getUser();
  forms.hidden = !!u;
  signed.hidden = !u;
  if (u) {
    $("#authWelcome").textContent =
      "Welcome back, " + String(u.name).split(" ")[0] + "!";
    $("#authSignedEmail").textContent = "Signed in as " + u.email;
  }
}
function initAuth() {
  renderAuthLink();
  renderAuthPage();
  $$(".auth-tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      $$(".auth-tab").forEach((x) => x.classList.toggle("active", x === tab));
      if ($("#signinForm"))
        $("#signinForm").hidden = tab.dataset.tab !== "signin";
      if ($("#signupForm"))
        $("#signupForm").hidden = tab.dataset.tab !== "signup";
    }),
  );
  on($("#signinForm"), "submit", (e) => {
    e.preventDefault();
    const email = $("#siEmail").value.trim(),
      pass = $("#siPass").value;
    const err = $("#siErr");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      err.hidden = false;
      err.textContent = "Please enter a valid email address.";
      return;
    }
    if (pass.length < 6) {
      err.hidden = false;
      err.textContent = "Password must be at least 6 characters.";
      return;
    }
    err.hidden = true;
    const name = email
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setUser({ name, email });
    toast("Welcome back, " + name.split(" ")[0] + "! \u2708\uFE0F");
  });
  on($("#signupForm"), "submit", (e) => {
    e.preventDefault();
    const name = $("#suName").value.trim(),
      email = $("#suEmail").value.trim(),
      pass = $("#suPass").value;
    const err = $("#suErr");
    if (!name) {
      err.hidden = false;
      err.textContent = "Please enter your name.";
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      err.hidden = false;
      err.textContent = "Please enter a valid email address.";
      return;
    }
    if (pass.length < 6) {
      err.hidden = false;
      err.textContent = "Password must be at least 6 characters.";
      return;
    }
    err.hidden = true;
    setUser({ name, email });
    toast(
      "Account created \u2014 welcome to Bronx, " +
        name.split(" ")[0] +
        "! \u{1F389}",
    );
  });
  on($("#demoLogin"), "click", () => {
    setUser({ name: "Demo Traveller", email: "demo@bronx.com" });
    toast("Signed in with the demo account \u2708\uFE0F");
  });
  on($("#signOutBtn"), "click", () => {
    setUser(null);
    toast("Signed out \u2014 see you soon!");
  });
}
let featuresInitDone = false;
function initFeaturesPack() {
  if (featuresInitDone) return;
  featuresInitDone = true;
  initTheme();
  initAuth();
  initChat();
  initReveal();
  initAccordions();
  initMagnetic();
  initTransitions();
  initToTop();
  initSearchSuggest();
  initMarquee();
  renderRecent();
  initCounters();
  initShowcase();
  initCardRotateZoom();
  renderWish();
  renderCompareTray();
  on($("#wishOpen"), "click", openWish);
  on($("#wishClose"), "click", closeWish);
  on($("#wishItems"), "click", (e) => {
    const del = e.target.closest("[data-wish-del]");
    if (del) toggleWish(+del.dataset.wishDel);
    const add = e.target.closest("[data-add]");
    if (add) addToCart(+add.dataset.add, 1, add);
  });
  on($("#guideFab"), "click", openGuide);
  on($("#guideClose"), "click", closeGuide);
  on($("#compareOpen"), "click", openCompareModal);
  on($("#compareModalClose"), "click", closeCompareModal);
  on($("#compareModal"), "click", (e) => {
    if (e.target.id === "compareModal") closeCompareModal();
  });
  on($("#compareClear"), "click", () => {
    compareSet = [];
    saveJSON("bronx-compare", compareSet);
    renderCompareTray();
  });
  on($("#quickClose"), "click", closeQuickView);
  on($("#quickModal"), "click", (e) => {
    if (e.target.id === "quickModal") closeQuickView();
  });
  on($("#overlay"), "click", () => {
    closeWish();
  });
}
function initStudio() {
  const stage = $("#studioStage"),
    img = $("#studioImg");
  if (!stage || !img) return;
  const VIEWS = {
    hero: { rot: -25, rotX: 0, zoom: 1, origin: "50% 50%" },
    front: { rot: 0, rotX: 0, zoom: 1.05, origin: "50% 50%" },
    side: { rot: 55, rotX: 0, zoom: 1.05, origin: "50% 50%" },
    wheels: { rot: -15, rotX: 14, zoom: 1.9, origin: "50% 88%" },
  };
  let current = PRODUCTS.find((p) => p.id === 13) || PRODUCTS[0];
  let rot = VIEWS.hero.rot,
    rotX = 0,
    zoom = 1,
    spinning = false,
    raf = null;
  const info = $("#studioInfo"),
    specs = $("#studioSpecs"),
    thumbs = $("#studioThumbs");
  const apply = () => {
    img.style.transform = `rotateX(${rotX.toFixed(1)}deg) rotateY(${rot.toFixed(1)}deg) scale(${zoom.toFixed(2)})`;
  };
  const stopSpin = () => {
    spinning = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    const b = document.querySelector('#studioViews [data-view="spin"]');
    if (b) b.classList.remove("active");
  };
  const toggleSpin = () => {
    if (spinning) {
      stopSpin();
      return;
    }
    spinning = true;
    const b = document.querySelector('#studioViews [data-view="spin"]');
    if (b) b.classList.add("active");
    img.style.transition = "none";
    const t0 = performance.now();
    const loop = (t) => {
      if (!spinning) return;
      rot = 42 * Math.sin((t - t0) / 900);
      apply();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  };
  const setView = (name) => {
    if (name === "spin") {
      toggleSpin();
      return;
    }
    stopSpin();
    const v = VIEWS[name];
    rot = v.rot;
    rotX = v.rotX;
    zoom = v.zoom;
    img.style.transformOrigin = v.origin;
    img.style.transition = "transform .6s cubic-bezier(.2,.8,.3,1)";
    apply();
    $$("#studioViews [data-view]").forEach((b) =>
      b.classList.toggle("active", b.dataset.view === name),
    );
  };
  const renderStudioInfo = () => {
    const p = current,
      sp = p.specs || {};
    const series =
      p.category === "Luggage"
        ? `Series 01 \xB7 Cabin \xB7 ${sp.Capacity || ""}`
        : `${p.brand} \xB7 ${p.category}`;
    info.innerHTML = `
      <p class="studio-series">${series}</p>
      <h2 class="studio-name">${p.name}</h2>
      <p class="studio-dims">${sp.Dimensions || p.size} &nbsp;\xB7&nbsp; ${sp.Weight || ""}${sp.Capacity ? " &nbsp;\xB7&nbsp; " + sp.Capacity : ""}</p>
      <p class="studio-rating">${stars(p.rating)} ${p.rating} (${p.reviews} reviews)</p>
      <p class="studio-price">${money(p.price)} ${p.oldPrice ? `<s>${money(p.oldPrice)}</s>` : ""}</p>
      <p class="studio-desc">${p.description}</p>
      <div class="studio-actions">
        <button class="btn btn-gold magnetic" data-add="${p.id}">Add to Cart</button>
        <button class="btn btn-ghost" data-wish="${p.id}">\u2665 Wishlist</button>
        <a class="btn btn-ghost" href="product.html?id=${p.id}">Full Details \u2192</a>
      </div>`;
    specs.innerHTML = Object.entries(sp)
      .map(
        ([k, v]) =>
          `<div class="studio-chip"><span>${k}</span><strong>${v}</strong></div>`,
      )
      .join("");
  };
  const renderThumbs = () => {
    const picks = PRODUCTS.filter(
      (p) => p.category === "Luggage" && +p.id < 1000,
    ).slice(0, 20);
    thumbs.innerHTML = picks
      .map(
        (
          p,
        ) => `<div class="studio-thumb${p.id === current.id ? " active" : ""}" data-studio-id="${p.id}" role="button" tabindex="0" title="${p.name}">
         <div class="thumb-img">
           <img src="${p.image}" alt="${p.name}" loading="lazy" draggable="false" data-fb="${p._fb || ""}" onerror="if(this.dataset.fb){this.src=this.dataset.fb;this.dataset.fb=''}">
         </div>
         <em>${p.name.replace(/^(Bronx|Samsonite|American Tourister|Delsey|Travelpro)\s+/, "")}</em>
       </div>`,
      )
      .join("");
  };
  const loadProduct = (p) => {
    current = p;
    if (window.BronxBrain) window.BronxBrain.state.product = p;
    stopSpin();
    img.src = p.image;
    img.alt = p.name + " in the 3D Studio";
    setView("hero");
    renderStudioInfo();
    renderThumbs();
  };
  on($("#studioViews"), "click", (e) => {
    const b = e.target.closest("[data-view]");
    if (b) setView(b.dataset.view);
  });
  let dragging = false,
    startX = 0,
    startY = 0,
    startRot = 0,
    startRotX = 0;
  stage.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    stopSpin();
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startRot = rot;
    startRotX = rotX;
    img.style.transition = "none";
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    rot = Math.max(-60, Math.min(60, startRot + (e.clientX - startX) * 0.35));
    rotX = Math.max(-40, Math.min(40, startRotX - (e.clientY - startY) * 0.25));
    img.style.transformOrigin = "50% 50%";
    apply();
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((ev) =>
    stage.addEventListener(ev, () => {
      dragging = false;
    }),
  );
  stage.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      zoom = Math.max(1, Math.min(2.4, zoom + (e.deltaY < 0 ? 0.2 : -0.2)));
      apply();
    },
    { passive: false },
  );
  stage.addEventListener("dblclick", () => setView("hero"));
  on(thumbs, "click", (e) => {
    if (e.target.closest(".thumb-cart")) return;
    const b = e.target.closest("[data-studio-id]");
    if (!b) return;
    const p = PRODUCTS.find((x) => x.id === +b.dataset.studioId);
    if (p) loadProduct(p);
  });
  on($("#studioHide"), "click", () => {
    const hidden = $("#studioWrap").classList.toggle("controls-hidden");
    $("#studioHide").textContent = hidden
      ? "Show Controls \u2303"
      : "Hide Controls \u2304";
  });
  on($("#studioAsk"), "click", () => {
    if (window.BronxBrain) window.BronxBrain.state.product = current;
    openChat();
    setTimeout(() => {
      chatAddMsg(
        `Hi! I'm the Luggage Bot \u{1F9F3} Ask me about the ${current.name}: price, weight, colours or dimensions.`,
        "bot",
      );
      const chips = document.getElementById("chatChips");
      if (chips)
        chips.innerHTML = ["Price?", "Weight?", "Colours?", "Dimensions?"]
          .map((c) => `<button type="button" data-chip="${c}">${c}</button>`)
          .join("");
    }, 450);
  });
  renderStudioInfo();
  renderThumbs();
  img.src = current.image;
  img.alt = current.name + " in the 3D Studio";
  setView("hero");
}
function initGlassNav() {
  const h = document.querySelector(".site-header");
  if (!h) return;
  const check = () => h.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", check, { passive: true });
  check();
}
function initCookieConsent() {
  const path = location.pathname;
  const isHome = path === "/" || path.endsWith("/index.html");
  if (!isHome) return;
  const nav = performance.getEntriesByType("navigation")[0];
  const type = nav ? nav.type : "navigate";
  if (type === "back_forward") return;
  let seen = false;
  try {
    seen = sessionStorage.getItem("bronx-cookie-seen") === "1";
  } catch (e) {}
  if (seen && type !== "reload") return;
  const overlay = document.createElement("div");
  overlay.className = "ck-overlay";
  overlay.innerHTML = `
    <div class="ck-banner" role="dialog" aria-modal="true" aria-label="Cookie consent">
      <strong>We value your privacy</strong>
      <p>We use cookies to enhance your browsing experience and analyse our traffic. By clicking "Accept All" you consent to our use of cookies.</p>
      <div class="ck-actions">
        <button class="ck-btn ck-reject" type="button">Reject</button>
        <button class="ck-btn ck-accept" type="button">Accept All</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const choose = (value) => {
    try {
      sessionStorage.setItem("bronx-cookie-seen", "1");
    } catch (e) {}
    overlay.remove();
    toast(value === "accepted" ? "Cookies accepted." : "Cookies rejected.");
  };
  overlay
    .querySelector(".ck-accept")
    .addEventListener("click", () => choose("accepted"));
  overlay
    .querySelector(".ck-reject")
    .addEventListener("click", () => choose("rejected"));
}
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("pl")) initCookieConsent();
  else document.addEventListener("pl-done", initCookieConsent, { once: true });
});
document.addEventListener("DOMContentLoaded", () => {
  const fab = document.getElementById("chatFab");
  const bubble = document.getElementById("fabBubble");
  if (fab && bubble)
    fab.addEventListener("click", () => bubble.classList.add("hide"));
});
window.addEventListener("pageshow", function (e) {
  if (!e.persisted) return;
  var t = document.getElementById("pageTransition");
  if (t) t.classList.remove("go");
});
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-item");
  if (!items.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    },
    { threshold: 0.25 },
  );
  items.forEach((el, i) => {
    el.style.transitionDelay = (i % 2) * 0.12 + "s";
    io.observe(el);
  });
});
(function () {
  document.querySelectorAll('link[rel~="icon"]').forEach((l) => l.remove());
  var link = document.createElement("link");
  link.rel = "icon";
  link.href =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='7' y='9' width='18' height='19' rx='3' fill='%23c69a5b'/%3E%3Crect x='12' y='4' width='8' height='5' rx='2' fill='none' stroke='%23c69a5b' stroke-width='2'/%3E%3C/svg%3E";
  document.head.appendChild(link);
})();
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toTop");
  if (!btn) return;
  btn.innerHTML =
    '<svg class="rk" viewBox="0 0 24 24"><path d="M12 2c3 2.5 4.5 6 4.5 9.5V15h-9v-3.5C7.5 8 9 4.5 12 2z"/><circle cx="12" cy="9" r="1.6"/><path d="M7.5 12.5L5 15.5V18l2.5-1.5M16.5 12.5l2.5 3V18l-2.5-1.5"/><path class="rk-flame" d="M10 17c0 2 .8 3.5 2 4.5 1.2-1 2-2.5 2-4.5"/></svg>';
  btn.addEventListener("click", () => {
    btn.classList.add("launch");
    setTimeout(() => btn.classList.remove("launch"), 1300);
  });
});
function ensureChatUI() {
  if (document.getElementById("chatFab")) return;
  var html =
    '<div class="fab-stack">  <span class="fab-bubble" id="fabBubble">Hi! Can I help you? \u{1F44B}</span>  <button class="fab fab-chat ai-fab" id="chatFab" aria-label="Open support chat" title="Ask Bronx AI">    <span class="ai-ring"></span>    <span class="ai-pulse"></span>    <svg class="ai-robot" viewBox="0 0 24 24">      <path d="M12 3v3"/>      <circle cx="12" cy="2.6" r="1" fill="currentColor"/>      <rect x="4" y="6" width="16" height="12" rx="4"/>      <circle class="ai-eye" cx="9" cy="12" r="1.5" fill="currentColor" stroke="none"/>      <circle class="ai-eye" cx="15" cy="12" r="1.5" fill="currentColor" stroke="none"/>      <path d="M2 11v3M22 11v3"/>      <path d="M9.5 15.5h5"/>    </svg>  </button></div><div class="chat-panel" id="chatPanel" hidden>  <div class="chat-head"><div>Bronx Support <span>Typically replies in minutes</span></div><button class="icon-btn" id="chatClose" aria-label="Close chat" style="color:#fff">\u2715</button></div>  <div class="chat-body" id="chatBody"></div>  <div class="chat-chips" id="chatChips"></div>  <form class="chat-input" id="chatForm"><input type="text" id="chatText" placeholder="Ask about shipping, returns\u2026" aria-label="Type your message" autocomplete="off"><button class="btn btn-gold" type="submit">Send</button></form></div>';
  var wrap = document.createElement("div");
  wrap.innerHTML = html;
  while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
  ensureChatUI();
}
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("chatFab")) {
    var fab = document.createElement("div");
    fab.innerHTML =
      '<div class="fab-stack">  <span class="fab-bubble" id="fabBubble">Hi! Can I help you? \u{1F44B}</span>  <button class="fab fab-chat ai-fab" id="chatFab" aria-label="Open support chat" title="Ask Bronx AI">    <span class="ai-ring"></span><span class="ai-pulse"></span>    <svg class="ai-robot" viewBox="0 0 24 24">      <path d="M12 3v3"/><circle cx="12" cy="2.6" r="1" fill="currentColor"/>      <rect x="4" y="6" width="16" height="12" rx="4"/>      <circle class="ai-eye" cx="9" cy="12" r="1.5" fill="currentColor" stroke="none"/>      <circle class="ai-eye" cx="15" cy="12" r="1.5" fill="currentColor" stroke="none"/>      <path d="M2 11v3M22 11v3"/><path d="M9.5 15.5h5"/>    </svg>  </button></div>';
    document.body.appendChild(fab.firstChild);
  }
  if (document.getElementById("chatPanel")) return;
  var panel = document.createElement("div");
  panel.innerHTML =
    '<div class="chat-panel" id="chatPanel" hidden>  <div class="chat-head"><div>Bronx Support <span>Typically replies in minutes</span></div><button class="icon-btn" id="chatClose" aria-label="Close chat" style="color:#fff">\u2715</button></div>  <div class="chat-body" id="chatBody"></div>  <div class="chat-chips" id="chatChips"></div>  <form class="chat-input" id="chatForm"><input type="text" id="chatText" placeholder="Ask about shipping, returns\u2026" aria-label="Type your message" autocomplete="off"><button class="btn btn-gold" type="submit">Send</button></form></div>';
  document.body.appendChild(panel.firstChild);
  var f = document.getElementById("chatFab");
  f.addEventListener("click", function () {
    openChat();
    var b = document.getElementById("fabBubble");
    if (b) b.classList.add("hide");
  });
  document.getElementById("chatClose").addEventListener("click", closeChat);
  var chips = document.getElementById("chatChips");
  chips.innerHTML = ["Shipping info", "Returns", "Track order", "Opening hours"]
    .map(function (c) {
      return '<button type="button" data-chip="' + c + '">' + c + "</button>";
    })
    .join("");
  chips.addEventListener("click", function (e) {
    var b = e.target.closest("[data-chip]");
    if (b) sendChat(b.dataset.chip);
  });
  document.getElementById("chatForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = document.getElementById("chatText");
    var text = input.value.trim();
    if (!text) return;
    input.value = "";
    sendChat(text);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var icons = document.querySelector(".site-footer .social-links");
  var firstCol = document.querySelector(
    ".site-footer .footer-grid > div:first-child",
  );
  if (!icons || !firstCol) return;
  if (!firstCol.contains(icons)) firstCol.appendChild(icons);
});
document.addEventListener("DOMContentLoaded", function () {
  var footer =
    document.querySelector(".site-footer") || document.querySelector("footer");
  if (!footer) return;
  var bottom = footer.querySelector(".footer-bottom");
  if (!bottom) {
    bottom = document.createElement("div");
    bottom.className = "footer-bottom";
    footer.appendChild(bottom);
  }
  bottom.innerHTML =
    "<p>\xA9 " +
    /* @__PURE__ */ new Date().getFullYear() +
    " Bronx Luggage. All rights reserved.</p>";
  bottom.style.textAlign = "center";
  bottom.style.paddingBottom = "80px";
});
(function () {
  var css = [
    "#feedbackList{display:block !important;position:relative;overflow:hidden !important;",
    "width:100vw !important;max-width:100vw !important;margin-left:calc(50% - 50vw) !important;padding:26px 0 36px;",
    "-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);",
    "mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}",
    "#feedbackList .fb-track{display:flex !important;flex-direction:row !important;flex-wrap:nowrap !important;",
    "width:max-content !important;animation:fbScroll 30s linear infinite}",
    "@keyframes fbScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}",
    "#feedbackList .fb-card{flex:0 0 auto !important;width:500px;margin:0 24px 0 0;background:#fff;border:1px solid #e4ddd2;",
    "border-radius:16px;padding:22px 26px;box-shadow:0 4px 12px rgba(16,35,63,.08);",
    "transition:box-shadow .35s ease,border-color .35s ease}",
    "#feedbackList .fb-card:hover{box-shadow:0 8px 18px rgba(16,35,63,.14);border-color:#c69a5b}",
    "#feedbackList .fb-card p{margin:8px 0;color:#3c4757;line-height:1.55;white-space:normal}",
    "#feedbackList .fb-card small{color:#6b7686}",
    "#feedbackList .fb-new{animation:fbPop .7s cubic-bezier(.34,1.56,.64,1) both}",
    "@keyframes fbPop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}",
    "body.dark #feedbackList .fb-card{background:#152238;border-color:#24344d}",
    "body.dark #feedbackList .fb-card p{color:#c6d2e2}",
    "@media (max-width:560px){#feedbackList .fb-card{width:280px}}",
    ".contact-wrap:has(#feedbackList){display:block !important;width:min(760px,92%) !important;max-width:760px !important;margin:0 auto !important}",
    ".contact-wrap:has(#feedbackList) > div{min-width:0 !important;width:100% !important}",
    ".contact-wrap:has(#feedbackList) > div + div{margin-top:130px}",
    "#feedbackForm{width:100% !important;max-width:760px !important}",
    ".contact-wrap:has(#feedbackList){--fb-shift:0px}",
    ".contact-wrap:has(#feedbackList) h2.section-title{text-align:center !important;margin-left:0 !important;margin-right:0 !important;transform:translateX(var(--fb-shift))}",
    "html,body{overflow-x:clip}",
  ].join("");
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
  var lastCount = 0;
  function renderMoving() {
    var list = document.getElementById("feedbackList");
    if (!list) return;
    var data = getFeedback();
    if (!data.length) {
      list.innerHTML = "";
      return;
    }
    var isNew = lastCount > 0 && data.length > lastCount;
    lastCount = data.length;
    var reps = Math.max(1, Math.ceil(6 / data.length));
    var set = "";
    for (var r = 0; r < reps; r++) {
      for (var i = 0; i < data.length; i++) {
        var f = data[i];
        set +=
          '<div class="fb-card' +
          (isNew && r === 0 && i === 0 ? " fb-new" : "") +
          '"><div><span class="stars">' +
          stars(f.rating) +
          "</span> <strong>" +
          f.name +
          "</strong></div><p>\u201C" +
          f.text +
          "\u201D</p><small>" +
          f.date +
          "</small></div>";
      }
    }
    var secs = data.length * reps * 6;
    list.innerHTML =
      '<div class="fb-track" style="animation-duration:' +
      secs +
      's">' +
      set +
      set +
      "</div>";
  }
  renderFeedback = renderMoving;
  document.addEventListener("DOMContentLoaded", renderMoving);
  window.addEventListener("load", renderMoving);
})();
(function () {
  var editing = -1;
  var st = document.createElement("style");
  st.textContent =
    "#myReviews{margin-top:26px}#myReviews h3{margin-bottom:12px;font-size:1.25rem}.my-item{background:#fff;border:1px solid #e4ddd2;border-radius:12px;padding:14px 16px;margin-bottom:10px}.my-head{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}.my-item p{margin:6px 0}.my-actions{display:flex;gap:8px}.my-actions button{padding:6px 14px;border-radius:8px;border:1px solid #e4ddd2;background:#fff;font-weight:700;cursor:pointer}.my-del{color:#b3261e}.my-save{background:#c69a5b !important}.my-item textarea,.my-item select{width:100%;margin-top:6px;padding:9px;border:1px solid #e4ddd2;border-radius:9px}";
  document.head.appendChild(st);
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function isSeed(f) {
    return SEED_FEEDBACK.some(function (s) {
      return s.name === f.name && s.text === f.text;
    });
  }
  function renderMine() {
    var form = document.getElementById("feedbackForm");
    if (!form) return;
    var box = document.getElementById("myReviews");
    if (!box) {
      box = document.createElement("div");
      box.id = "myReviews";
      form.insertAdjacentElement("afterend", box);
    }
    var data = getFeedback();
    var html = "";
    for (var i = 0; i < data.length; i++) {
      var f = data[i];
      if (isSeed(f)) continue;
      if (i === editing) {
        var opts = "";
        for (var s = 5; s >= 1; s--) {
          opts +=
            '<option value="' +
            s +
            '"' +
            (+f.rating === s ? " selected" : "") +
            ">" +
            s +
            " star</option>";
        }
        html += '<div class="my-item">';
        html += '<select id="myRate">' + opts + "</select>";
        html += '<textarea id="myText" rows="3">' + esc(f.text) + "</textarea>";
        html += '<div class="my-actions" style="margin-top:10px">';
        html +=
          '<button type="button" class="my-save" data-act="save" data-i="' +
          i +
          '">Save</button>';
        html += '<button type="button" data-act="cancel">Cancel</button>';
        html += "</div></div>";
      } else {
        html += '<div class="my-item"><div class="my-head">';
        html +=
          '<div><span class="stars">' +
          stars(f.rating) +
          "</span> <strong>" +
          esc(f.name) +
          "</strong></div>";
        html += '<div class="my-actions">';
        html +=
          '<button type="button" data-act="edit" data-i="' +
          i +
          '">Edit</button>';
        html +=
          '<button type="button" class="my-del" data-act="del" data-i="' +
          i +
          '">Delete</button>';
        html += "</div></div>";
        html += "<p>" + esc(f.text) + "</p>";
        html += "<small>" + esc(f.date) + "</small></div>";
      }
    }
    box.innerHTML = html ? "<h3>Your Reviews</h3>" + html : "";
  }
  function refreshAll() {
    renderMine();
    if (typeof renderFeedback === "function") renderFeedback();
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("#myReviews [data-act]");
    if (!b) return;
    var act = b.getAttribute("data-act");
    var i = parseInt(b.getAttribute("data-i"), 10);
    var data = getFeedback();
    if (act === "edit") {
      editing = i;
      renderMine();
      return;
    }
    if (act === "cancel") {
      editing = -1;
      renderMine();
      return;
    }
    if (act === "save") {
      var t = document.getElementById("myText").value.trim();
      if (t.length < 10) {
        toast("Please write at least 10 characters.");
        return;
      }
      data[i].text = t;
      data[i].rating = parseInt(document.getElementById("myRate").value, 10);
      saveJSON("bronx-feedback", data);
      editing = -1;
      refreshAll();
      toast("Review updated.");
      return;
    }
    if (act === "del") {
      if (!confirm("Delete this review?")) return;
      data.splice(i, 1);
      saveJSON("bronx-feedback", data);
      editing = -1;
      refreshAll();
      toast("Review deleted.");
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    renderMine();
    var form = document.getElementById("feedbackForm");
    if (form)
      form.addEventListener("submit", function () {
        setTimeout(renderMine, 50);
      });
  });
})();
(function () {
  var FONT = '"Segoe UI", Arial, Helvetica, sans-serif';
  var st = document.createElement("style");
  st.textContent =
    "#rcOverlay{position:fixed;inset:0;z-index:100000;background:rgba(11,26,48,.78);backdrop-filter:blur(6px);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:30px 12px}.rc-wrap{width:min(420px,100%);animation:rcIn .5s cubic-bezier(.34,1.3,.64,1)}@keyframes rcIn{from{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:none}}.rc-paper{background:#fff;color:#111;font-family:" +
    FONT +
    ";font-size:15px;padding:28px 24px 22px;border-radius:8px 8px 0 0;box-shadow:0 20px 50px rgba(0,0,0,.4)}.rc-logo{text-align:center}.rc-logo svg{width:56px;height:56px}.rc-brand{display:block;margin:8px auto 6px;width:max-content;border:2px solid #111;padding:6px 18px;font-family:Georgia,serif;font-weight:700;font-size:20px;letter-spacing:.1em;color:#111}.rc-center{text-align:center;color:#333;font-size:13.5px;line-height:1.7}.rc-line{border-top:1px dashed #777;margin:24px 0}.rc-h{font-weight:800;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#111;margin:0 0 16px;text-align:center}.rc-row{display:flex;justify-content:space-between;gap:12px;margin:10px 0;color:#111}.rc-row span:last-child{text-align:right}.rc-item{display:flex;gap:12px;align-items:center;margin:16px 0}.rc-item img{width:56px;height:56px;object-fit:cover;border-radius:8px;border:1px solid #ddd;flex-shrink:0}.rc-info{flex:1;min-width:0}.rc-info b{display:block;font-size:14px;line-height:1.3;color:#111}.rc-info small{color:#444;font-size:12.5px}.rc-price{font-weight:700;color:#111;white-space:nowrap}.rc-total{font-weight:800;font-size:18px}.rc-bar{display:flex;justify-content:center;gap:2px;height:46px;margin:14px 0 8px}.rc-bar i{display:block;background:#111}.rc-zig{height:12px;background:linear-gradient(135deg,#fff 50%,transparent 50%) 0 0/16px 12px,linear-gradient(225deg,#fff 50%,transparent 50%) 0 0/16px 12px;background-repeat:repeat-x}.rc-actions{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}.rc-actions button{flex:1;min-width:130px;padding:12px 10px;border-radius:10px;border:0;font-weight:700;cursor:pointer;font-size:.95rem;transition:transform .2s ease,box-shadow .2s ease,background .2s ease,color .2s ease}.rc-actions button:hover{transform:translateY(-3px);box-shadow:0 10px 22px rgba(0,0,0,.35)}.rc-actions button:active{transform:scale(.96)}.rc-dl{background:#c69a5b;color:#0b1a30}.rc-dl:hover{background:#e0b878}.rc-cl{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.5) !important}.rc-cl:hover{background:#fff;color:#10233f}.rc-note{flex-basis:100%;text-align:center;color:#dfe6f0;font-size:.85rem;margin:4px 0 0}";
  document.head.appendChild(st);
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function buildData() {
    var items = [],
      sub = 0;
    cart.forEach(function (i) {
      var p = getProduct(i.id);
      if (p) {
        items.push({
          name: p.name,
          qty: i.qty,
          price: p.price,
          image: lineView(i, p).image,
          color: lineView(i, p).color,
        });
        sub += i.qty * p.price;
      }
    });
    var ship = sub >= 99 ? 0 : 9.99,
      now = /* @__PURE__ */ new Date();
    var pm = document.querySelector('input[name="payMethod"]:checked');
    var isCard = !!(pm && pm.value === "card");
    var numEl = document.getElementById("payCardNum"),
      expEl = document.getElementById("payExp");
    var digits = isCard && numEl ? numEl.value.replace(/\D/g, "") : "";
    var brand = /^4/.test(digits)
      ? "VISA"
      : /^5[1-5]|^2[2-7]/.test(digits)
        ? "Mastercard"
        : /^3[47]/.test(digits)
          ? "AMEX"
          : "Card";
    var exp = isCard && expEl ? expEl.value : "";
    var payName = isCard ? "Debit/Credit Card" : "Cash on Delivery";
    var payDetail = isCard
      ? brand + " **** " + digits.slice(-4) + " | Exp " + exp
      : "Pay " + money(sub + ship) + " on delivery";
    return {
      no: "BX-" + String(Date.now()).slice(-8),
      date: now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      name: document.getElementById("coName").value.trim(),
      email: document.getElementById("coEmail").value.trim(),
      address: document.getElementById("coAddress").value.trim(),
      items,
      sub,
      ship,
      total: sub + ship,
      pay: payName,
      payDetail,
    };
  }
  function saveOrder(d) {
    var list = loadJSON("bronx-orders", []);
    if (!Array.isArray(list)) list = [];
    list.unshift({
      no: d.no,
      placedAt: Date.now(),
      name: d.name,
      address: d.address,
      pay: d.pay,
      total: d.total,
      items: d.items.map(function (x) {
        return {
          name: x.name,
          qty: x.qty,
          image: x.image,
          color: x.color,
          price: x.price,
        };
      }),
    });
    saveJSON("bronx-orders", list.slice(0, 20));
  }
  document.addEventListener(
    "submit",
    function (e) {
      if (!e.target || e.target.id !== "checkoutForm") return;
      var name = document.getElementById("coName").value.trim();
      var email = document.getElementById("coEmail").value.trim();
      var addr = document.getElementById("coAddress").value.trim();
      if (!cart.length || name.length < 2 || !emailOK(email) || addr.length < 8)
        return;
      var pm = document.querySelector('input[name="payMethod"]:checked');
      if (pm && pm.value === "card") {
        var cn = document.getElementById("payCardNum").value.replace(/\D/g, "");
        var ce = document.getElementById("payExp").value;
        var cv = document.getElementById("payCvv").value;
        if (cn.length < 12 || !/^\d\d\/\d\d$/.test(ce) || cv.length < 3) return;
      }
      var ph = document.getElementById("coPhone");
      if (ph && ph.value.replace(/\D/g, "").length < 7) return;
      var d = buildData();
      saveOrder(d);
      setTimeout(function () {
        showReceipt(d);
      }, 400);
    },
    true,
  );
  var LOGO_SVG =
    '<svg viewBox="0 0 64 64"><rect x="22" y="2" width="20" height="6" rx="3" fill="#6b4220"/><rect x="26" y="8" width="4" height="10" fill="#6b4220"/><rect x="34" y="8" width="4" height="10" fill="#6b4220"/><rect x="12" y="17" width="40" height="38" rx="8" fill="#c69a5b"/><rect x="21" y="23" width="4" height="26" rx="2" fill="#a8692f"/><rect x="30" y="23" width="4" height="26" rx="2" fill="#a8692f"/><rect x="39" y="23" width="4" height="26" rx="2" fill="#a8692f"/><circle cx="20" cy="59" r="3.5" fill="#3d2410"/><circle cx="44" cy="59" r="3.5" fill="#3d2410"/></svg>';
  function barWidths(seed) {
    var out = [],
      n = 0,
      i;
    for (i = 0; i < seed.length; i++)
      n = (n * 31 + seed.charCodeAt(i)) % 100003;
    for (i = 0; i < 38; i++) {
      n = (n * 1103 + 12345) % 100003;
      out.push(1 + (n % 3));
    }
    return out;
  }
  function showReceipt(d) {
    var old = document.getElementById("rcOverlay");
    if (old) old.remove();
    var rows = "";
    d.items.forEach(function (x) {
      rows +=
        '<div class="rc-item"><img src="' +
        x.image +
        '" alt=""><div class="rc-info"><b>' +
        esc(x.name) +
        "</b><small>Qty: " +
        x.qty +
        " &middot; " +
        money(x.price) +
        " each &middot; " +
        esc(x.color) +
        '</small></div><div class="rc-price">' +
        money(x.qty * x.price) +
        "</div></div>";
    });
    var bars = "";
    barWidths(d.no).forEach(function (w) {
      bars += '<i style="width:' + w + 'px"></i>';
    });
    var html =
      '<div class="rc-wrap"><div class="rc-paper"><div class="rc-logo">' +
      LOGO_SVG +
      '<span class="rc-brand">BRONX LUGGAGE</span></div><div class="rc-center">Travel in style<br>Order #' +
      d.no +
      "<br>" +
      d.date +
      " &middot; " +
      d.time +
      '</div><div class="rc-line"></div><div class="rc-h">Customer Details</div><div class="rc-row"><span>Name</span><b>' +
      esc(d.name) +
      '</b></div><div class="rc-row"><span>Email</span><span>' +
      esc(d.email) +
      '</span></div><div class="rc-row"><span>Deliver to</span><span style="max-width:62%">' +
      esc(d.address) +
      '</span></div><div class="rc-row"><span>Payment</span><b>' +
      esc(d.pay) +
      '</b></div><div class="rc-row"><span>Details</span><span>' +
      esc(d.payDetail) +
      '</span></div><div class="rc-line"></div><div class="rc-h">Product Details</div>' +
      rows +
      '<div class="rc-line"></div><div class="rc-h">Order Summary</div><div class="rc-row"><span>Subtotal</span><span>' +
      money(d.sub) +
      '</span></div><div class="rc-row"><span>Shipping</span><span>' +
      (d.ship === 0 ? "FREE" : money(d.ship)) +
      '</span></div><div class="rc-row rc-total"><span>TOTAL</span><span>' +
      money(d.total) +
      '</span></div><div class="rc-line"></div><div class="rc-row"><span>Status</span><b>ORDER PLACED</b></div><div class="rc-bar">' +
      bars +
      '</div><div class="rc-center">Thank you for shopping with Bronx Luggage!<br>30-day easy returns</div></div><div class="rc-zig"></div><div class="rc-actions"><button type="button" class="rc-dl" id="rcDl">Download</button><button type="button" class="rc-cl" id="rcCl">Close</button><p class="rc-note">Download your receipt and share it with anyone you like.</p></div></div>';
    var ov = document.createElement("div");
    ov.id = "rcOverlay";
    ov.innerHTML = html;
    document.body.appendChild(ov);
    document.getElementById("rcDl").addEventListener("click", function () {
      makePng(d, function (cv) {
        canvasToPdf(cv, function (blob) {
          saveBlob(blob, "Bronx-Receipt-" + d.no + ".pdf");
        });
      });
    });
    document.getElementById("rcCl").addEventListener("click", closeReceipt);
    ov.addEventListener("click", function (e) {
      if (e.target === ov) closeReceipt();
    });
  }
  function closeReceipt() {
    var o = document.getElementById("rcOverlay");
    if (o) o.remove();
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeReceipt();
  });
  function saveBlob(blob, name) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 2e3);
  }
  function loadImg(src) {
    return new Promise(function (res) {
      var im = new Image();
      im.onload = function () {
        res(im);
      };
      im.onerror = function () {
        res(null);
      };
      im.src = src;
    });
  }
  function canvasToPdf(canvas, done) {
    var b64 = canvas.toDataURL("image/jpeg", 0.95).split(",")[1];
    var bin = atob(b64),
      len = bin.length,
      img = new Uint8Array(len),
      i;
    for (i = 0; i < len; i++) img[i] = bin.charCodeAt(i);
    var pw = 420,
      ph = Math.round((420 * canvas.height) / canvas.width);
    function enc(s) {
      var a = new Uint8Array(s.length);
      for (var k = 0; k < s.length; k++) a[k] = s.charCodeAt(k) & 255;
      return a;
    }
    var parts = [],
      offsets = [],
      size = 0;
    function add(u) {
      parts.push(u);
      size += u.length;
    }
    function obj(n, head, data, tail) {
      offsets[n] = size;
      add(enc(n + " 0 obj\n" + head));
      if (data) add(data);
      add(enc(tail));
    }
    var content = "q " + pw + " 0 0 " + ph + " 0 0 cm /Im0 Do Q";
    add(enc("%PDF-1.4\n"));
    obj(1, "<< /Type /Catalog /Pages 2 0 R >>", null, "\nendobj\n");
    obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>", null, "\nendobj\n");
    obj(
      3,
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " +
        pw +
        " " +
        ph +
        "] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>",
      null,
      "\nendobj\n",
    );
    obj(
      4,
      "<< /Length " +
        content.length +
        " >>\nstream\n" +
        content +
        "\nendstream",
      null,
      "\nendobj\n",
    );
    obj(
      5,
      "<< /Type /XObject /Subtype /Image /Width " +
        canvas.width +
        " /Height " +
        canvas.height +
        " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " +
        len +
        " >>\nstream\n",
      img,
      "\nendstream\nendobj\n",
    );
    var xs = size,
      x = "xref\n0 6\n0000000000 65535 f \n";
    for (i = 1; i <= 5; i++)
      x += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
    x += "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + xs + "\n%%EOF";
    add(enc(x));
    done(new Blob(parts, { type: "application/pdf" }));
  }
  function makePng(d, done) {
    Promise.all(
      d.items.map(function (x) {
        return loadImg(x.image);
      }),
    ).then(function (imgs) {
      var W = 460,
        P = 30,
        S = 3;
      var H = 1200 + d.items.length * 100;
      var c = document.createElement("canvas");
      c.width = W * S;
      c.height = H * S;
      var ctx = c.getContext("2d");
      ctx.scale(S, S);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, W, H);
      ctx.textBaseline = "alphabetic";
      var F = FONT,
        y = 26;
      function t(s, x, yy, font, color, align) {
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = align || "left";
        ctx.fillText(s, x, yy);
      }
      function fit(s, font, max) {
        ctx.font = font;
        while (ctx.measureText(s).width > max && s.length > 4)
          s = s.slice(0, -2);
        return s;
      }
      function dash(yy) {
        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = "#777";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(P, yy);
        ctx.lineTo(W - P, yy);
        ctx.stroke();
        ctx.restore();
      }
      function rect(x, yy, w, h, col) {
        ctx.fillStyle = col;
        ctx.fillRect(x, yy, w, h);
      }
      function circ(x, yy, r, col) {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x, yy, r, 0, 6.2832);
        ctx.fill();
      }
      function head(s) {
        t(s, W / 2, y, "bold 13px " + F, "#111", "center");
        y += 30;
      }
      function row(label, value, bold) {
        var f = (bold ? "bold " : "") + "15px " + F;
        t(label, P, y, "15px " + F, "#111");
        t(fit(value, f, 280), W - P, y, f, "#111", "right");
        y += 28;
      }
      ctx.save();
      var sc = 0.9;
      ctx.translate(W / 2 - 32 * sc, y);
      ctx.scale(sc, sc);
      rect(22, 2, 20, 6, "#6b4220");
      rect(26, 8, 4, 10, "#6b4220");
      rect(34, 8, 4, 10, "#6b4220");
      rect(12, 17, 40, 38, "#c69a5b");
      rect(21, 23, 4, 26, "#a8692f");
      rect(30, 23, 4, 26, "#a8692f");
      rect(39, 23, 4, 26, "#a8692f");
      circ(20, 59, 3.5, "#3d2410");
      circ(44, 59, 3.5, "#3d2410");
      ctx.restore();
      y += 70;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.strokeRect(W / 2 - 115, y, 230, 42);
      t(
        "BRONX LUGGAGE",
        W / 2,
        y + 28,
        "bold 21px Georgia, serif",
        "#111",
        "center",
      );
      y += 70;
      t("Travel in style", W / 2, y, "15px " + F, "#333", "center");
      y += 22;
      t("Order #" + d.no, W / 2, y, "15px " + F, "#333", "center");
      y += 22;
      t(d.date + "  " + d.time, W / 2, y, "15px " + F, "#333", "center");
      y += 22;
      dash(y);
      y += 32;
      head("CUSTOMER DETAILS");
      row("Name", d.name, true);
      row("Email", d.email);
      t("Deliver to", P, y, "15px " + F, "#111");
      ctx.font = "15px " + F;
      var words = d.address.split(" "),
        line = "",
        lines = [],
        k;
      for (k = 0; k < words.length; k++) {
        var test = line ? line + " " + words[k] : words[k];
        if (ctx.measureText(test).width > 270 && line) {
          lines.push(line);
          line = words[k];
        } else line = test;
      }
      if (line) lines.push(line);
      for (k = 0; k < lines.length; k++) {
        t(lines[k], W - P, y, "15px " + F, "#111", "right");
        y += 22;
      }
      y += 6;
      row("Payment", d.pay, true);
      row("Details", d.payDetail);
      y -= 4;
      dash(y);
      y += 32;
      head("PRODUCT DETAILS");
      d.items.forEach(function (x, idx) {
        var im = imgs[idx];
        if (im) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(P, y, 60, 60);
          ctx.clip();
          ctx.fillStyle = "#f4efe6";
ctx.fillRect(P, y, 60, 60);
          var r = Math.min(60 / im.width, 60 / im.height);
          var w = im.width * r,
            h = im.height * r;
          ctx.drawImage(im, P + (60 - w) / 2, y + (60 - h) / 2, w, h);
          ctx.restore();
          ctx.strokeStyle = "#ddd";
          ctx.lineWidth = 1;
          ctx.strokeRect(P, y, 60, 60);
        } else {
          rect(P, y, 60, 60, "#eee");
        }
        var tx = P + 72;
        t(
          fit(x.name, "bold 14px " + F, 215),
          tx,
          y + 20,
          "bold 14px " + F,
          "#111",
        );
        t(
          "Qty: " + x.qty + "  |  " + money(x.price) + " each  |  " + x.color,
          tx,
          y + 42,
          "13px " + F,
          "#444",
        );
        t(
          money(x.qty * x.price),
          W - P,
          y + 20,
          "bold 15px " + F,
          "#111",
          "right",
        );
        y += 80;
      });
      dash(y);
      y += 32;
      head("ORDER SUMMARY");
      row("Subtotal", money(d.sub));
      row("Shipping", d.ship === 0 ? "FREE" : money(d.ship));
      y += 4;
      t("TOTAL", P, y, "bold 20px " + F, "#000");
      t(money(d.total), W - P, y, "bold 20px " + F, "#000", "right");
      y += 20;
      dash(y);
      y += 30;
      t("Status", P, y, "15px " + F, "#111");
      t("ORDER PLACED", W - P, y, "bold 15px " + F, "#111", "right");
      y += 30;
      var bw = barWidths(d.no),
        bx = 0,
        i;
      for (i = 0; i < bw.length; i++) bx += bw[i] + 2;
      var x0 = (W - bx) / 2;
      for (i = 0; i < bw.length; i++) {
        rect(x0, y, bw[i], 46, "#111");
        x0 += bw[i] + 2;
      }
      y += 76;
      t(
        "Thank you for shopping with Bronx Luggage!",
        W / 2,
        y,
        "14px " + F,
        "#333",
        "center",
      );
      y += 22;
      t("30-day easy returns", W / 2, y, "14px " + F, "#333", "center");
      y += 30;
      var out = document.createElement("canvas");
      out.width = W * S;
      out.height = y * S;
      out.getContext("2d").drawImage(c, 0, 0, W * S, y * S, 0, 0, W * S, y * S);
      done(out);
    });
  }
})();
function showOrderPopup() {
  const orders = loadJSON("bronx-orders", []);
  const last = Array.isArray(orders) && orders[0] ? orders[0].no : "";
  const overlay = document.createElement("div");
  overlay.className = "ck-overlay";
  overlay.innerHTML = `
    <div class="ck-banner order-pop" role="dialog" aria-modal="true" aria-label="Order confirmed">
      <div class="order-check"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>
      <strong>Order Confirmed!</strong>
      <p>Thank you for choosing Bronx Luggage. Your journey starts here.</p>
      <div class="ck-actions">
        <button class="ck-btn ck-reject" id="trackNow" type="button">Track Order</button>
        <button class="ck-btn ck-accept" type="button">Continue Shopping</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
  const close = () => {
    overlay.remove();
    document.body.style.overflow = "";
  };
  overlay.querySelector(".ck-accept").addEventListener("click", () => {
    close();
    location.href = "shop.html";
  });
  overlay.querySelector("#trackNow").addEventListener("click", () => {
    close();
    location.href =
      "track.html" + (last ? "?order=" + encodeURIComponent(last) : "");
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  if (!form) return;
  const submitBtn =
    form.querySelector('button[type="submit"]') || form.querySelector("button");
  if (!submitBtn) return;
  const box = document.createElement("fieldset");
  box.className = "pay-box";
  box.innerHTML = `
    <legend>Payment</legend>
  
    <div class="pay-list">
      <label class="pay-opt active">
        <input type="radio" name="payMethod" value="cod" checked>
        <span class="pay-dot"></span>
        <span class="pay-name">Cash on Delivery (COD)</span>
      </label>
      <label class="pay-opt">
        <input type="radio" name="payMethod" value="card">
        <span class="pay-dot"></span>
        <span class="pay-name">Debit/Credit Card</span>
        <span class="pay-logos">
          <i class="pl visa">VISA</i>
          <i class="pl mc"><b></b><b></b></i>
          <i class="pl amex">AMEX</i>
        </span>
      </label>
      <div class="pay-card" hidden>
        <input type="text" id="payCardNum" placeholder="1234 5678 9012 3456" inputmode="numeric" autocomplete="cc-number">
        <div class="pay-row">
          <input type="text" id="payExp" placeholder="MM/YY" inputmode="numeric" autocomplete="cc-exp">
          <input type="password" id="payCvv" placeholder="CVV" inputmode="numeric" autocomplete="off">
        
    </div>`;
  submitBtn.before(box);
  const opts = box.querySelectorAll(".pay-opt");
  const cardBox = box.querySelector(".pay-card");
  const num = box.querySelector("#payCardNum");
  const exp = box.querySelector("#payExp");
  const cvv = box.querySelector("#payCvv");
  const method = () =>
    form.querySelector('input[name="payMethod"]:checked').value;
  box.addEventListener("change", () => {
    opts.forEach((o) =>
      o.classList.toggle("active", o.querySelector("input").checked),
    );
    cardBox.hidden = method() !== "card";
  });
  num.addEventListener("input", () => {
    num.value = num.value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  });
  exp.addEventListener("input", () => {
    let v = exp.value.replace(/\D/g, "").slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    exp.value = v;
  });
  cvv.addEventListener("input", () => {
    cvv.value = cvv.value.replace(/\D/g, "").slice(0, 4);
  });
  form.addEventListener(
    "submit",
    (e) => {
      if (method() !== "card") return;
      const ok =
        num.value.replace(/\s/g, "").length >= 12 &&
        /^\d\d\/\d\d$/.test(exp.value) &&
        cvv.value.length >= 3;
      if (!ok) {
        e.preventDefault();
        e.stopImmediatePropagation();
        toast("Please fill in the card details.");
      }
    },
    true,
  );
  form.addEventListener("reset", () => {
    setTimeout(
      () => box.dispatchEvent(new Event("change", { bubbles: true })),
      0,
    );
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const items = document.getElementById("cartPageItems");
  if (!items) return;
  const col = document.createElement("div");
  col.className = "cart-col";
  items.parentElement.insertBefore(col, items);
  col.appendChild(items);
  const section = document.createElement("section");
  section.className = "included-box";
  section.innerHTML = `
    <h3>Included with this Purchase</h3>
    <p class="inc-intro">Every Bronx Luggage order comes with easy returns, solid warranty cover and our commitment to every journey you take.</p>
    <ul class="inc-list">
      <li>
        <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>
        <span><b>30-Day Easy Returns</b><small>Changed your mind? Return it, no questions asked.</small></span>
      </li>
      <li>
        <svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>
        <span><b>Worry-Free Warranty</b><small>2\u201310 years of cover against manufacturing defects.</small></span>
      </li>
      <li>
        <svg viewBox="0 0 24 24"><path d="M2 6h11v10H2z"/><path d="M13 9h4l3 3v4h-7z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/></svg>
        <span><b>Free Shipping Over $99</b><small>Ships within 24 hours and arrives in 2\u20135 business days.</small></span>
      </li>
    </ul>`;
  items.after(section);
  const sync = () => {
    section.hidden = !items.children.length;
  };
  new MutationObserver(sync).observe(items, { childList: true });
  sync();
});
document.addEventListener("DOMContentLoaded", () => {
  const items = document.getElementById("cartPageItems");
  if (!items) return;
  const all = [...document.querySelectorAll("a, button")].filter(
    (el) =>
      /continue shopping/i.test(el.textContent) &&
      !el.closest(".wish-drawer, .cart-drawer, .ck-overlay"),
  );
  if (!all.length) return;
  const keep =
    all.find((el) => /←/.test(el.textContent)) || all[all.length - 1];
  const wrap = document.createElement("div");
  wrap.className = "continue-wrap";
  wrap.appendChild(keep);
  const col = document.querySelector(".cart-col");
  if (col) col.appendChild(wrap);
  else items.after(wrap);
  const sync = () => {
    wrap.hidden = !items.children.length;
  };
  new MutationObserver(sync).observe(items, { childList: true });
  sync();
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  const email = document.getElementById("coEmail");
  if (!form || !email) return;
  const label = document.createElement("label");
  label.innerHTML =
    'Phone number<input type="tel" id="coPhone" placeholder="e.g. +92 300 1234567" autocomplete="tel" inputmode="tel">';
  (email.closest("label") || email).after(label);
  const phone = label.querySelector("input");
  phone.addEventListener("input", () => {
    phone.value = phone.value.replace(/[^\d+\s-]/g, "").slice(0, 20);
  });
  form.addEventListener(
    "submit",
    (e) => {
      if (phone.value.replace(/\D/g, "").length < 7) {
        e.preventDefault();
        e.stopImmediatePropagation();
        toast("Please enter a valid phone number.");
        phone.focus();
      }
    },
    true,
  );
});
(function () {
  var DEMO = false;
  var MIN = 6e4,
    HR = 36e5,
    DAY = 24 * HR;
  var AT = [0, 12 * HR, 2 * DAY, 5 * DAY];
  var STEPS = ["Order Placed", "Packed", "Shipped", "Delivered"];
  var LABELS = ["Processing", "Packed", "In Transit", "Delivered"];
  var NOTES = [
    "Your order has been received and is being prepared.",
    "Your order is packed and waiting for the courier to pick it up.",
    "Your package is on the way to you.",
    "Your package has been delivered. Thank you for shopping with Bronx Luggage!",
  ];
  var TRUCK =
    '<svg viewBox="0 0 24 24"><path d="M2 6h11v10H2z"/><path d="M13 9h4l3 3v4h-7z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/></svg>';
  var TK_GUIDE = "";
  var css = `
.tk-wrap{max-width:760px;margin:0 auto}
.tk-search{display:flex;gap:10px;margin-bottom:14px}
.tk-search input{flex:1;padding:13px 16px;border:1px solid var(--line);border-radius:12px;background:#fff;font-size:1rem}
.tk-search input:focus{outline:2px solid var(--gold);border-color:var(--gold)}
.tk-recent{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
.tk-chip{border:1px solid var(--gold);background:#fff;color:var(--gold-dark);border-radius:999px;padding:6px 13px;font-size:.85rem;font-weight:700;cursor:pointer;transition:transform .2s}
.tk-chip:hover{transform:translateY(-2px)}
.tk-chip.active{background:var(--gold);color:#1a1206}
.tk-card{background:#fffaf3;border:1px solid #eadfce;border-radius:22px;padding:26px;box-shadow:0 14px 40px rgba(120,90,50,.12);margin-bottom:26px;animation:tkUp .6s cubic-bezier(.2,.8,.3,1) both}
@keyframes tkUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.tk-top{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.tk-box{width:58px;height:58px;border-radius:50%;background:#f3e6d2;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.tk-box svg{width:30px;height:30px;fill:none;stroke:#8a6a3b;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.tk-ono{font-family:var(--font-display);font-size:1.6rem;color:var(--navy);line-height:1.1}
.tk-sub{color:var(--muted);font-size:.95rem}
.tk-pill{margin-left:auto;padding:8px 16px;border-radius:10px;font-weight:700;font-size:.95rem;background:#f3e6d2;color:#6b4d22;display:inline-flex;align-items:center;gap:8px}
.tk-pill::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor;animation:tkBlink 1.4s ease-in-out infinite}
.tk-card[data-stage="3"] .tk-pill{background:#dcefe3;color:#1f6b3f}
.tk-card[data-stage="3"] .tk-pill::before{animation:none}
@keyframes tkBlink{50%{opacity:.25;transform:scale(.7)}}
.tk-est{margin-top:22px}
.tk-est span{display:inline-block;background:#f3e6d2;color:#6b4d22;font-size:.85rem;font-weight:700;padding:4px 10px;border-radius:7px}
.tk-est strong{display:block;font-size:1.5rem;color:var(--navy);margin:8px 0 4px}
.tk-est small{color:var(--muted);font-size:.95rem}
.tk-est em{font-style:normal;font-weight:700;color:#a8692f}
.tk-bar{position:relative;height:14px;border-radius:999px;background:#f1e8da;margin:26px 0 6px}
.tk-fill{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:999px;background:linear-gradient(90deg,#e3c697,#c69a5b);transition:width 1.4s cubic-bezier(.2,.8,.3,1);overflow:hidden}
.tk-fill::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:translateX(-100%);animation:tkShine 2.2s linear infinite}
@keyframes tkShine{to{transform:translateX(100%)}}
.tk-card[data-stage="3"] .tk-fill{background:linear-gradient(90deg,#7fc29a,#2e7d4f)}
.tk-card[data-stage="3"] .tk-fill::after{animation:none}
.tk-truck{position:absolute;top:50%;left:3%;width:36px;height:36px;border-radius:50%;background:#fff;border:2px solid #c69a5b;display:flex;align-items:center;justify-content:center;transform:translate(-50%,-50%);transition:left 1.4s cubic-bezier(.2,.8,.3,1);box-shadow:0 4px 12px rgba(0,0,0,.18)}
.tk-truck svg{width:20px;height:20px;fill:none;stroke:#10233f;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;animation:tkBounce .6s ease-in-out infinite alternate}
.tk-card[data-stage="3"] .tk-truck{border-color:#2e7d4f}
@keyframes tkBounce{to{transform:translateY(-1.5px)}}
.tk-steps{--d:52px;display:flex;margin:6px 0 26px}
.tk-step{position:relative;flex:1;text-align:center;display:flex;flex-direction:column;align-items:center;gap:3px;padding:0 4px;animation:tkUp .6s cubic-bezier(.2,.8,.3,1) both}
.tk-step:nth-child(2){animation-delay:.1s}.tk-step:nth-child(3){animation-delay:.2s}.tk-step:nth-child(4){animation-delay:.3s}
.tk-dot{width:var(--d);height:var(--d);border-radius:50%;background:#fff;border:2px solid #e3d6c1;display:flex;align-items:center;justify-content:center;position:relative;z-index:2;transition:background .6s,border-color .6s}
.tk-dot svg{width:55%;height:55%;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:30;stroke-dashoffset:30;transition:stroke-dashoffset .6s ease .3s}
.tk-step.done .tk-dot{background:#c69a5b;border-color:#c69a5b}
.tk-step.done .tk-dot svg{stroke-dashoffset:0}
.tk-step.final .tk-dot{background:#2e7d4f;border-color:#2e7d4f}
.tk-step.current .tk-dot{animation:tkRing 1.8s ease-out infinite}
@keyframes tkRing{0%{box-shadow:0 0 0 0 rgba(198,154,91,.6)}100%{box-shadow:0 0 0 16px rgba(198,154,91,0)}}
.tk-step b{font-size:.95rem;color:var(--navy);margin-top:6px}
.tk-step small{font-size:.76rem;color:var(--muted);line-height:1.35}
.tk-step .tk-extra{color:#a8692f;font-weight:700}
.tk-line{position:absolute;top:calc(var(--d)/2 - 2px);left:calc(50% + var(--d)/2);width:calc(100% - var(--d));height:4px;border-radius:2px;background:repeating-linear-gradient(90deg,#e3d6c1 0 6px,transparent 6px 12px);z-index:1;overflow:hidden}
.tk-line i{position:absolute;left:0;top:0;bottom:0;width:0;background:#c69a5b;transition:width 1.2s cubic-bezier(.2,.8,.3,1)}
.tk-note{display:flex;gap:12px;align-items:center;background:#f6ecdf;border-radius:12px;padding:14px 16px;color:#4a3b25;margin-bottom:28px;animation:tkUp .6s ease .3s both}
.tk-note svg{width:22px;height:22px;flex-shrink:0;fill:none;stroke:#8a6a3b;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.tk-details{animation:tkUp .6s ease .4s both}
.tk-details h3{font-family:var(--font-display);font-size:1.5rem;color:var(--navy);margin-bottom:16px}
.tk-item{display:flex;gap:16px;align-items:center;margin-bottom:14px}
.tk-item img{width:90px;height:90px;object-fit:cover;border-radius:14px;background:#eee;flex-shrink:0}
.tk-item b{display:block;font-size:1.1rem;color:var(--navy);line-height:1.3}
.tk-item small{color:var(--muted);font-size:.95rem}
.tk-addr{margin-top:6px}
.tk-addr span{display:inline-block;background:#f3e6d2;color:#6b4d22;font-size:.8rem;font-weight:700;padding:3px 9px;border-radius:7px;margin-bottom:6px}
.tk-addr p{color:var(--ink)}
.tk-actions{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}
.tk-btn{display:flex;align-items:center;justify-content:center;gap:10px;padding:15px;border-radius:14px;font-weight:700;border:1px solid #eadfce;background:#fff;color:var(--navy);cursor:pointer;font-size:1rem;font-family:inherit;transition:transform .2s,box-shadow .2s}
.tk-btn:hover{transform:translateY(-3px);box-shadow:0 10px 22px rgba(16,35,63,.15)}
.tk-btn.gold{background:linear-gradient(135deg,#dcb987,#c69a5b);border-color:transparent;color:#1a1206}
.tk-btn svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.tk-empty{text-align:center;padding:44px 20px;color:var(--muted)}
.tk-empty h3{font-family:var(--font-display);color:var(--navy);font-size:1.5rem;margin-bottom:8px}
.tk-empty .btn{margin-top:16px}
@media (max-width:560px){
  .tk-steps{--d:40px}
  .tk-step b{font-size:.78rem}
  .tk-step small{font-size:.68rem}
  .tk-actions{grid-template-columns:1fr}
  .tk-pill{margin-left:0}
  .tk-ono{font-size:1.3rem}
}
body.dark .tk-card{background:#152238;border-color:#24344d}
body.dark .tk-ono,body.dark .tk-est strong,body.dark .tk-step b,body.dark .tk-details h3,body.dark .tk-item b,body.dark .tk-empty h3{color:#f2f5fa}
body.dark .tk-note{background:#1a2a44;color:#c6d2e2}
body.dark .tk-btn,body.dark .tk-search input,body.dark .tk-chip{background:#152238;color:#e8ecf3;border-color:#24344d}
body.dark .tk-dot{background:#0d1526;border-color:#24344d}
body.dark .tk-addr p{color:#c6d2e2}

.tk-layout {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:30px;
}

.tk-wrap {
  flex:1;
  order:1;
  min-width:0;
}

.tk-guide {
  order:2;
  flex:0 0 270px;
  width:270px;
  text-align:center;
}

.tk-character {
  animation: assistantWave 1s ease-in-out 3;
  transition:transform 1.2s ease;
}

.tk-character img {
  width:100%;
  height:330px;
  object-fit:contain;
}

.tk-welcome-bubble {
  background:white;
  border:1px solid #c69a5b;
  border-radius:16px;
  padding:16px;
  margin-bottom:15px;
  box-shadow:0 8px 25px #00000012;
  animation:bubblePop .6s ease both;
}

.tk-welcome-bubble b,
.tk-welcome-bubble span {
  display:block;
}

.tk-welcome-bubble b {
  color:#10233f;
  margin-bottom:7px;
}

.tk-welcome-bubble span {
  color:#666;
  font-size:13px;
  line-height:1.6;
}

@keyframes bubblePop {
  from {opacity:0;transform:scale(.8)}
  to {opacity:1;transform:scale(1)}
}

@keyframes assistantWave {
  0%,100% {transform:rotate(0)}
  25% {transform:rotate(-3deg)}
  50% {transform:rotate(3deg)}
  75% {transform:rotate(-2deg)}
}

.tk-search input.tk-glow {
  animation:tkGlow 1.2s ease-in-out infinite;
}

@media(max-width:760px) {
  .tk-layout {
    flex-direction:column;
  }
  .tk-guide {
    order:2;
    width:230px;
    flex-basis:auto;
  }
  .tk-character img {
    height:280px;
  }
}
`;
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function getOrders() {
    var l = loadJSON("bronx-orders", []);
    return Array.isArray(l) ? l : [];
  }
  function fmt(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  function fmtLong(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
  function left(ms) {
    if (ms < 6e4) return Math.max(1, Math.ceil(ms / 1e3)) + " sec";
    if (ms < 2 * HR) return Math.ceil(ms / 6e4) + " min";
    if (ms < 2 * DAY) return Math.round(ms / HR) + " hr";
    return Math.round(ms / DAY) + " days";
  }
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("trackRoot");
    if (!root) return;
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
    var cur = null;
    root.innerHTML =
      '<div class="tk-layout">' +
      TK_GUIDE +
      '<div class="tk-wrap"><form class="tk-search tk-live" id="tkForm"><p class="tk-msg"><span class="tk-msg-ico">\u{1F4E6}</span> Track your parcel easily. Just enter your <b>code</b> here!</p><div class="tk-row"><input id="tkInput" type="text" placeholder="Enter order number, e.g. BX-12345678" autocomplete="off" aria-label="Order number"><button class="btn btn-gold" type="submit">Track</button></div></form><div class="tk-recent" id="tkRecent"></div><div id="tkResult"></div></div></div>';
    var input = document.getElementById("tkInput");
    var out = document.getElementById("tkResult");
    function chips() {}
    function cardHtml(o) {
      var items = o.items
        .map(function (it) {
          return (
            '<div class="tk-item"><img src="' +
            it.image +
            '" alt=""><div><b>' +
            esc(it.name) +
            "</b><small>Qty: " +
            it.qty +
            " \u2022 " +
            esc(it.color) +
            "</small></div></div>"
          );
        })
        .join("");
      var steps = STEPS.map(function (s, i) {
        return (
          '<div class="tk-step"><div class="tk-dot"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div><b>' +
          s +
          '</b><small class="tk-time"></small><small class="tk-extra"></small>' +
          (i < 3 ? '<span class="tk-line"><i></i></span>' : "") +
          "</div>"
        );
      }).join("");
      var mapUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(o.address);
      return (
        '<div class="tk-card" id="tkCard" data-stage="0"><div class="tk-top"><div class="tk-box"><svg viewBox="0 0 24 24"><path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5l9 4.5 9-4.5M12 12v9"/></svg></div><div><div class="tk-ono">Order #' +
        esc(o.no) +
        '</div><div class="tk-sub">Placed on ' +
        fmt(o.placedAt) +
        '</div></div><span class="tk-pill" id="tkPill">Processing</span></div><div class="tk-est"><span>Estimated Delivery</span><strong>' +
        fmtLong(o.placedAt + AT[3]) +
        '</strong><small>Courier: Bronx Express &middot; <em id="tkLeft"></em></small></div><div class="tk-bar"><i class="tk-fill" id="tkFill"></i><span class="tk-truck" id="tkTruck">' +
        TRUCK +
        '</span></div></div><div class="tk-steps">' +
        steps +
        '</div><div class="tk-note"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/></svg><span id="tkNote"></span></div><div class="tk-details"><h3>Order Details</h3>' +
        items +
        '<div class="tk-addr"><span>Shipping Address</span><p>' +
        esc(o.address) +
        '</p></div><div class="tk-actions"><a class="tk-btn" target="_blank" rel="noopener" href="' +
        mapUrl +
        '"><svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Track on Map</a><button class="tk-btn gold" id="tkContact" type="button"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>Contact Courier</button></div></div>'
      );
    }
    function update() {
      if (!cur) return;
      var card = document.getElementById("tkCard");
      if (!card) return;
      var el = Date.now() - cur.placedAt,
        stage = 0,
        i;
      for (i = 0; i < 4; i++) if (el >= AT[i]) stage = i;
      card.dataset.stage = stage;
      document.getElementById("tkPill").textContent = LABELS[stage];
      var pct = Math.min(100, (el / AT[3]) * 100);
      document.getElementById("tkFill").style.width = pct + "%";
      document.getElementById("tkTruck").style.left =
        Math.min(97, Math.max(3, pct)) + "%";
      document.getElementById("tkLeft").textContent =
        stage === 3 ? "Delivered" : "Arriving in " + left(AT[3] - el);
      var outFor = stage === 2 && el > AT[2] + (AT[3] - AT[2]) * 0.7;
      var steps = document.querySelectorAll("#trackRoot .tk-step");
      for (i = 0; i < steps.length; i++) {
        var s = steps[i],
          done = el >= AT[i];
        s.classList.toggle("done", done);
        s.classList.toggle("current", i === stage && stage < 3);
        s.classList.toggle("final", i === 3 && done);
        s.querySelector(".tk-time").textContent = done
          ? fmt(cur.placedAt + AT[i])
          : i === 3
            ? "Est. " + fmt(cur.placedAt + AT[3])
            : "";
        s.querySelector(".tk-extra").textContent =
          i === 2 && outFor ? "Out for delivery" : "";
        var ln = s.querySelector(".tk-line i");
        if (ln)
          ln.style.width =
            Math.min(1, Math.max(0, (el - AT[i]) / (AT[i + 1] - AT[i]))) * 100 +
            "%";
      }
      document.getElementById("tkNote").textContent = outFor
        ? "Your package is out for delivery and expected to arrive today."
        : NOTES[stage];
    }
    function show(q) {
      q = String(q || "")
        .toUpperCase()
        .replace(/\s/g, "");
      if (/^\d+$/.test(q)) q = "BX-" + q;
      var o = getOrders().filter(function (x) {
        return x.no === q;
      })[0];
      if (!o) {
        cur = null;
        out.innerHTML = q
          ? '<div class="tk-empty"><h3>Order not found</h3><p>We could not find order ' +
            esc(q) +
            ". Please check the number on your receipt and try again.</p></div>"
          : "";
        chips("");
        return;
      }
      cur = o;
      input.value = o.no;
      out.innerHTML = cardHtml(o);
      chips(o.no);
      document
        .getElementById("tkContact")
        .addEventListener("click", function () {
          var stage = document.getElementById("tkCard").dataset.stage;
          openChat();
          setTimeout(function () {
            chatAddMsg(
              "Hi! I'm the courier desk \u{1F69A} Your order " +
                o.no +
                ' is currently "' +
                LABELS[stage] +
                '". For address or delivery changes, email bronxluggage@gmail.com.',
              "bot",
            );
          }, 450);
        });
      setTimeout(update, 120);
    }
    document.getElementById("tkForm").addEventListener("submit", function (e) {
      e.preventDefault();
      show(input.value);
    });
    document.getElementById("tkRecent").addEventListener("click", function (e) {
      var b = e.target.closest("[data-no]");
      if (b) show(b.dataset.no);
    });
    var start = new URLSearchParams(location.search).get("order");
    show(start || "");
    setInterval(update, 1e3);
  });
})();
(function () {
  document.querySelectorAll(".page-hero").forEach(function (hero) {
    if (hero.querySelector(".bx-hero-media")) return;
    hero.style.position = "relative";
    hero.style.overflow = "hidden";
    var media = document.createElement("div");
    media.className = "bx-hero-media";
    media.style.cssText =
      "position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;overflow:hidden;z-index:0;pointer-events:none;";
    media.innerHTML =
      '<video autoplay muted loop playsinline preload="auto" poster="assets/img/hero-video-poster.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;"><source src="assets/video/hero-bg.mp4" type="video/mp4"></video><div style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(8,20,45,0.55);"></div>';
    hero.insertBefore(media, hero.firstChild);
    Array.prototype.forEach.call(hero.children, function (c) {
      if (c !== media) {
        c.style.position = "relative";
        c.style.zIndex = "1";
      }
    });
    var v = media.querySelector("video");
    v.muted = true;
    v.play().catch(function () {});
  });
})();
(function () {
  var awaitingOrder = false;
  var LINK = 'style="color:inherit;text-decoration:underline;font-weight:700"';
  function allProducts() {
    return typeof PRODUCTS !== "undefined" && PRODUCTS.length
      ? PRODUCTS
      : FALLBACK_PRODUCTS;
  }
  function normalise(q) {
    q = String(q || "")
      .toUpperCase()
      .replace(/\s/g, "");
    if (/^\d+$/.test(q)) q = "BX-" + q;
    return q;
  }
  function findOrder(no) {
    var l = loadJSON("bronx-orders", []);
    return Array.isArray(l)
      ? l.filter(function (o) {
          return o.no === no;
        })[0] || null
      : null;
  }
  function extractId(text) {
    var m = String(text).match(/BX-?\s*\d{4,}/i);
    if (m) return normalise(m[0].replace(/BX-?\s*/i, "BX-"));
    var t = normalise(text);
    return /^BX-\d{4,}$/.test(t) ? t : "";
  }
  function addHtml(html, who) {
    var body = document.getElementById("chatBody");
    if (!body) return;
    var d = document.createElement("div");
    d.className = "chat-msg " + who;
    d.innerHTML = html;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }
  function say(reply, delay) {
    var typing = chatAddMsg("Typing\u2026", "bot typing");
    setTimeout(function () {
      if (typing) typing.remove();
      if (reply.html) addHtml(reply.html, "bot");
      else chatAddMsg(reply, "bot");
    }, delay || 650);
  }
  function listHtml(title, items, url) {
    if (!items.length) return null;
    return {
      html:
        title +
        "<br>" +
        items
          .slice(0, 4)
          .map(function (p) {
            return (
              "\u2022 <a " +
              LINK +
              ' href="product.html?id=' +
              p.id +
              '">' +
              p.name +
              "</a> \u2014 " +
              money(p.price)
            );
          })
          .join("<br>") +
        (url
          ? "<br><a " + LINK + ' href="' + url + '">See all \u2192</a>'
          : ""),
    };
  }
  function byRating(a, b) {
    return b.rating - a.rating || b.reviews - a.reviews;
  }
  var STOP =
    "the a an is are was do does you your have has any can could would will want need show tell me give about what which who how why when where for with and or of to in on at my our i we it this that there some please pls buy get looking look find available price cost much many sell stock".split(
      " ",
    );
  function productSearch(t) {
    var words = t
      .toLowerCase()
      .replace(/[^a-z0-9" ]/g, " ")
      .split(/\s+/)
      .filter(function (w) {
        return w.length >= 3 && STOP.indexOf(w) < 0;
      });
    if (!words.length) return null;
    var scored = allProducts()
      .map(function (p) {
        var hay = (
          p.name +
          " " +
          p.brand +
          " " +
          p.category +
          " " +
          p.color +
          " " +
          p.gender +
          " " +
          p.description
        ).toLowerCase();
        var s = 0;
        words.forEach(function (w) {
          if (hay.indexOf(w) > -1) s++;
        });
        return { p, s };
      })
      .filter(function (x) {
        return x.s > 0;
      });
    if (!scored.length) return null;
    scored.sort(function (a, b) {
      return b.s - a.s || byRating(a.p, b.p);
    });
    var top = scored[0].s;
    return scored
      .filter(function (x) {
        return x.s === top;
      })
      .map(function (x) {
        return x.p;
      });
  }
  var RULES = [
    [
      /how('?s| is| was).*(your|ur).*day|how are you doing today/i,
      "My day is going great, thanks for asking! \u{1F60A} How is yours going? And what can I help you find today?",
    ],
    [
      /(my).*(day).*(good|great|fine|nice|awesome|amazing|well)|(day).*(was|is|has been).*(good|great|fine|nice|awesome|amazing)/i,
      "That is great to hear! \u{1F60A} Want to check out our New Arrivals or the Sale?",
    ],
    [
      /(my).*(day).*(bad|tired|boring|rough|hectic|awful|terrible)|(bad|rough|tiring|awful|terrible).*(day)/i,
      'Sorry to hear that. \u{1F614} Hopefully it gets better! Maybe some new travel gear will cheer you up. Type "new arrivals" to take a look. \u{1F9F3}',
    ],
    [
      /^\s*(good|fine|great|nice|well|ok|okay|ok ok|i am fine|i am good|im fine|im good|i'm fine|i'm good|all good|not bad|pretty good|doing well)\b[\s!.,]*(thanks|thank you|and you)?[\s!.?]*$/i,
      "Great to hear! \u{1F60A} What would you like to see today: New Arrivals, Sale, Best Sellers, or something else?",
    ],
    [
      /^\s*(and you|and u|n you|how about you|what about you|u\??|you\??)[\s!.?]*$/i,
      "I am doing great, thank you! \u{1F60A} How can I help you today?",
    ],
    [
      /^\s*(oh+|ohh+|hmm+|hm+|aha+|wow+|really|oh really|ooh+|aww+|cool|nice one|oh nice|oh wow|oh okay|oh ok|i see|oh i see)[\s!.?]*$/i,
      "Haha \u{1F60A} If you would like to know more, just ask me about products, sale items, delivery, returns, or order tracking. I am right here! \u{1F9F3}",
    ],
    [
      /good\s*(morning|afternoon|evening)/i,
      "Good day to you too! \u2600\uFE0F Welcome to Bronx Luggage. Can I show you something?",
    ],
    [
      /good\s*night/i,
      "Good night! \u{1F319} See you next time. Safe travels! \u{1F9F3}",
    ],
    [
      /^\s*(sorry|sry|my bad|apologies)[\s!.?]*$/i,
      "No worries at all! \u{1F60A} Just tell me what you need and I will help.",
    ],
    [
      /what (can|do) (i|you)|what.*(have|sell|offer)|show me|help me|can i help|need help|can you help/i,
      {
        html: 'Here is what I can show you at Bronx \u{1F9F3}<br>\u2022 New Arrivals: type "new arrivals"<br>\u2022 Sale items: type "sale"<br>\u2022 Best sellers: type "best seller"<br>\u2022 Featured products: type "featured"<br>\u2022 Delivery, returns, payment and order tracking<br>Just ask me anything! \u{1F60A}',
      },
    ],
    [
      /new\s*arrival|what'?s new|whats new|latest|new (in|product|stock|collection)/i,
      function () {
        var items = allProducts()
          .filter(function (x) {
            return /new/i.test(x.badge || "");
          })
          .sort(byRating);
        return (
          listHtml("Our newest arrivals \u2728", items, "shop.html") ||
          "Our new collection is arriving soon! Check the Shop page for the latest products. \u{1F9F3}"
        );
      },
    ],
    [
      /\bsale\b|on sale|discount|offer|deal|clearance|cheap deals|\boff\b/i,
      function () {
        var items = allProducts()
          .filter(function (x) {
            return x.oldPrice && x.oldPrice > x.price;
          })
          .sort(function (a, b) {
            return 1 - b.price / b.oldPrice - (1 - a.price / a.oldPrice);
          });
        return (
          listHtml("Biggest savings right now \u{1F525}", items, "shop.html") ||
          "Many items are on sale. Look for the crossed-out price on the Shop page! \u{1F389}"
        );
      },
    ],
    [
      /featured|feature|highlight|special/i,
      function () {
        return listHtml(
          "Our featured products \u2B50",
          allProducts().slice().sort(byRating),
          "shop.html",
        );
      },
    ],
    [
      /best.?sell|top.?sell|most (popular|sold)|bestseller/i,
      function () {
        var items = allProducts()
          .filter(function (x) {
            return /best seller/i.test(x.badge || "");
          })
          .sort(byRating);
        return listHtml(
          "Our best sellers \u{1F3C6}",
          items.length ? items : allProducts().slice().sort(byRating),
          "shop.html",
        );
      },
    ],
    [
      /(type|kind|option|method).*(deliver|shipping)|deliver.*(type|kind|option|method)|express|standard|same.?day|international|worldwide|home deliver/i,
      "We offer <b>Standard Delivery</b> to your door. Orders ship within 24 hours (Mon\u2013Sat) and arrive in 2\u20135 business days. \u{1F69A} It is FREE over $99 (otherwise $9.99). You can pay by <b>Cash on Delivery</b> or by card.",
    ],
    [
      /return.*(day|how long|period|policy)|(day|days).*return|how many days/i,
      "Our return window is <b>30 days</b>, no questions asked. \u21A9\uFE0F Refunds go to your original payment method within 3\u20135 business days after we receive the item.",
    ],
    [
      /how.*(contact|reach|talk)|contact (you|us)|speak to/i,
      "You can contact us any time \u{1F4DE}<br>\u2022 Email: bronxluggage@gmail.com<br>\u2022 Phone: (555) 123-4567 (Mon\u2013Sat, 9 AM\u20136 PM)<br>\u2022 Or use the <a " +
        LINK +
        ' href="contact.html">Contact page</a>. We usually reply within a few hours.',
    ],
    [
      /\b(thanks|thank you|thx|shukriya|shukria|jazak)/i,
      "You are welcome! \u{1F60A} Anything else I can help you with?",
    ],
    [
      /\b(bye|goodbye|see you|khuda hafiz|allah hafiz)\b/i,
      "Goodbye! \u{1F44B} Happy travels with Bronx Luggage. \u{1F9F3}",
    ],
    [
      /how are you|kaise ho|kese ho|kya haal/i,
      "I am doing great, thanks for asking! \u{1F60A} How can I help you with your travel gear today?",
    ],
    [
      /who are you|your name|are you (a )?(bot|human|real)|tum kon|aap kon/i,
      "I am the Bronx Luggage assistant \u{1F9F3} \u2014 a virtual helper. I can track orders, find products and answer questions about shipping, returns, payment and more.",
    ],
    [
      /\b(hi|hello|hey|hola|salam|assalam\w*|aoa)\b/i,
      'Hello! \u{1F44B} Welcome to Bronx Luggage. Ask me about products, prices, shipping, returns \u2014 or say "track order".',
    ],
    [
      /cancel.*order|order.*cancel|change.*(address|order)|wrong address/i,
      "To cancel an order or change the delivery address, email bronxluggage@gmail.com with your order number as soon as possible \u2014 before it is shipped we can usually update it. \u{1F4E7}",
    ],
    [
      /pay|cod|cash on|card|visa|master|amex|paypal|easypaisa|jazzcash/i,
      "We accept Cash on Delivery (COD) and Debit/Credit Cards (VISA, Mastercard, AMEX). Choose your method at checkout. \u{1F4B3}",
    ],
    [
      /ship|deliver|dispatch|how long|kitne din|charges/i,
      "FREE shipping on orders over $99 (otherwise $9.99). Orders ship within 24 hours, Mon\u2013Sat, and arrive in 2\u20135 business days. \u2708\uFE0F",
    ],
    [
      /return|refund|exchange|wapas|replace/i,
      "You get 30-day easy returns, no questions asked. Refunds go to your original payment method within 3\u20135 business days after we receive the item.",
    ],
    [
      /warrant|guarantee|defect|broken|damage/i,
      "Every product has a 2\u201310 year warranty against manufacturing defects (exact length is on each product page). If something arrives damaged, email bronxluggage@gmail.com and we will fix it. \u{1F6E0}\uFE0F",
    ],
    [
      /contact|human|agent|call|phone|number|email|whatsapp|support/i,
      "You can reach us at bronxluggage@gmail.com or (555) 123-4567, Mon\u2013Sat 9 AM\u20136 PM. We usually reply within a few hours. \u{1F4DE}",
    ],
    [
      /hour|open|close|timing|time/i,
      "Our store is open Mon\u2013Sat 9:00 AM\u20138:00 PM and Sunday 11:00 AM\u20136:00 PM. Online, we are always open! \u{1F6CD}\uFE0F",
    ],
    [
      /where.*(store|shop|located|you)|address|location|branch/i,
      "We are an online-first store delivering to your door. For store details, email bronxluggage@gmail.com or see the Contact page. \u{1F4CD}",
    ],
    [
      /discount|offer|sale|coupon|promo|code|deal/i,
      "Many items are on sale right now \u2014 look for the crossed-out price. Join our newsletter (footer) for 10% off your first order! \u{1F389}",
    ],
    [
      /size guide|which size|what size|cabin|carry.?on|check.?in|dimension/i,
      'Sizes: Small (under 22", cabin/carry-on), Medium (22\u201326", 1\u20132 week trips), Large (27"+, long trips). Exact dimensions, weight and capacity are on every product page. \u{1F4CF}',
    ],
    [
      /wishlist|favourite|favorite|save for later/i,
      "Tap the \u2665 on any product to save it, and open your wishlist from the heart icon at the top. \u{1F49B}",
    ],
    [
      /cart|checkout|how.*(order|buy|purchase)/i,
      'Tap "Add to Cart" on any product, open the cart icon at the top, then checkout with your name, email, address and phone. Easy! \u{1F6D2}',
    ],
    [
      /login|sign ?in|sign ?up|account|password/i,
      "You can sign in or create an account from the Login option on the site. You can also shop without an account. \u{1F510}",
    ],
    [
      /brand/i,
      function () {
        return "We carry Bronx (our own line), Samsonite, American Tourister, Delsey and Travelpro. See the Brands page for details. \u{1F3F7}\uFE0F";
      },
    ],
    [
      /review|rating|feedback/i,
      "Our customers rate us 4.7/5! Read and share reviews on the Reviews page. \u2B50",
    ],
    [
      /studio|3d|360/i,
      "Try our 3D Studio from the menu \u2014 drag to rotate any suitcase, zoom in and view it from every angle. \u{1F300}",
    ],
    [
      /dark mode|theme/i,
      "Tap the moon/sun icon on the site to switch dark mode on or off. \u{1F319}",
    ],
    [
      /cheap|lowest|affordable|budget|sasta/i,
      function () {
        return listHtml(
          "Our most affordable picks \u{1F4B8}",
          allProducts()
            .slice()
            .sort(function (a, b) {
              return a.price - b.price;
            }),
          "shop.html",
        );
      },
    ],
    [
      /expensive|premium|luxury|costly|high.?end/i,
      function () {
        return listHtml(
          "Our premium picks \u2728",
          allProducts()
            .slice()
            .sort(function (a, b) {
              return b.price - a.price;
            }),
          "shop.html",
        );
      },
    ],
    [
      /best.?sell|popular|top.?rated|best|recommend|suggest/i,
      function () {
        return listHtml(
          "Our top-rated products \u2B50",
          allProducts().slice().sort(byRating),
          "shop.html",
        );
      },
    ],
  ];
  function answer(t) {
    var p = allProducts(),
      m,
      i,
      r;
    m = t.match(/(under|below|less than|within|upto|up to|max)\s*\$?\s*(\d+)/i);
    if (m) {
      var cap = +m[2];
      var items = p
        .filter(function (x) {
          return x.price <= cap;
        })
        .sort(byRating);
      return (
        listHtml(
          "Top picks under " + money(cap) + " \u{1F4B0}",
          items,
          "shop.html",
        ) ||
        "I could not find anything under " +
          money(cap) +
          ". Our lowest price starts around " +
          money(
            Math.min.apply(
              null,
              p.map(function (x) {
                return x.price;
              }),
            ),
          ) +
          "."
      );
    }
    for (i = 0; i < RULES.length; i++) {
      if (RULES[i][0].test(t)) {
        r = RULES[i][1];
        return typeof r === "function" ? r() : r;
      }
    }
    var cat = null,
      url = null;
    if (/backpack|rucksack|daypack/i.test(t)) {
      cat = "Backpacks";
      url = "shop.html?category=Backpacks";
    } else if (/suitcase|luggage|trolley|spinner|carry|cabin/i.test(t)) {
      cat = "Luggage";
      url = "shop.html?category=Luggage";
    } else if (
      /\bbags?\b|tote|duffel|messenger|sling|sleeve|garment/i.test(t)
    ) {
      cat = "Bags";
      url = "shop.html?category=Bags";
    }
    if (cat) {
      var g = /\b(men|man|male|boys?)\b/i.test(t)
        ? "Men"
        : /\b(women|woman|female|ladies|girls?)\b/i.test(t)
          ? "Women"
          : "";
      var res = p
        .filter(function (x) {
          return (
            x.category === cat &&
            (!g || x.gender === g || x.gender === "Unisex")
          );
        })
        .sort(byRating);
      var out = listHtml(
        "Here are our top " +
          (g ? g + " " : "") +
          cat.toLowerCase() +
          " \u{1F9F3}",
        res,
        url + (g ? "&gender=" + g : ""),
      );
      if (out) return out;
    }
    if (/\b(men|women|kids?)\b/i.test(t)) {
      var gg = /women/i.test(t) ? "Women" : /\bmen\b/i.test(t) ? "Men" : "";
      if (gg)
        return listHtml(
          "Popular picks for " + gg + " \u{1F6CD}\uFE0F",
          p
            .filter(function (x) {
              return x.gender === gg;
            })
            .sort(byRating),
          "shop.html?gender=" + gg,
        );
      return listHtml(
        "Kids picks \u{1F996}",
        p.filter(function (x) {
          return /kids/i.test(x.name);
        }),
        "shop.html",
      );
    }
    var found = productSearch(t);
    if (found) return listHtml("I found these for you \u{1F50E}", found, null);
    return null;
  }
  sendChat = function (text) {
    chatAddMsg(text, "user");
    var t = String(text).trim();
    var id = extractId(t);
    if (id) {
      if (findOrder(id)) {
        awaitingOrder = false;
        say(
          "Found it! \u2705 Order " +
            id +
            " is in our system. Taking you to the tracking page\u2026",
          600,
        );
        setTimeout(function () {
          location.href = "track.html?order=" + encodeURIComponent(id);
        }, 1700);
      } else {
        awaitingOrder = true;
        say(
          "Sorry, I could not find order " +
            id +
            '. \u{1F615} Please check the number on your receipt (like BX-12345678) and try again, or type "cancel".',
          650,
        );
      }
      return;
    }
    if (awaitingOrder) {
      if (/^(cancel|stop|no|back|exit|nahi)$/i.test(t)) {
        awaitingOrder = false;
        say(
          "No problem! Ask me anything else \u2014 products, shipping, returns or prices. \u{1F60A}",
          500,
        );
        return;
      }
      var other = answer(t);
      if (other && !/track|status/i.test(t)) {
        awaitingOrder = false;
        say(other, 600);
        return;
      }
      say(
        'That does not look like an order number. Please type it like BX-12345678, or type "cancel".',
        500,
      );
      return;
    }
    if (/track|where.*order|order.*(status|where)|my order|parcel/i.test(t)) {
      awaitingOrder = true;
      say(
        "Sure! \u{1F4E6} Please type your order number (for example BX-12345678).",
        600,
      );
      return;
    }
    var reply = answer(t);
    say(
      reply ||
        "Hmm, I am not sure about that one. \u{1F914} I can help with products, prices, brands, sizes, payment, shipping, returns, warranty and order tracking \u2014 or email bronxluggage@gmail.com and our team will help.",
      700,
    );
  };
})();
initCardRotateZoom = function () {
  var st = document.createElement("style");
  st.textContent =
    ".product-media img{cursor:zoom-in;user-select:none;-webkit-user-drag:none;will-change:transform}.product-media img:active{cursor:zoom-in}.product-media .card-shine{pointer-events:none}";
  document.head.appendChild(st);
  document.addEventListener("dragstart", function (e) {
    if (e.target.closest && e.target.closest(".product-media"))
      e.preventDefault();
  });
  document.addEventListener(
    "wheel",
    function (e) {
      var media = e.target.closest && e.target.closest(".product-media");
      if (!media) return;
      var img = media.querySelector("img");
      if (!img) return;
      e.preventDefault();
      img._z = Math.max(
        1,
        Math.min(2.2, (img._z || 1) + (e.deltaY < 0 ? 0.2 : -0.2)),
      );
      img.style.transition = "transform .15s ease";
      img.style.transform = "scale(" + img._z + ")";
    },
    { passive: false, capture: true },
  );
  document.addEventListener("pointerout", function (e) {
    var media = e.target.closest && e.target.closest(".product-media");
    if (!media || media.contains(e.relatedTarget)) return;
    var img = media.querySelector("img");
    if (!img) return;
    img._z = 1;
    img.style.transition = "transform .45s cubic-bezier(.2,.8,.3,1)";
    img.style.transform = "";
  });
};
initZoomLens = function () {};
initViewer360 = function () {
  var viewer = $("#pdViewer"),
    img = $("#pdImage"),
    bar = $("#v360Bar");
  if (!viewer || !img) return;
  var st = document.createElement("style");
  st.textContent =
    "#pdViewer{perspective:1100px;touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none;overflow:hidden}#pdViewer.grabbing{cursor:grabbing}#pdViewer img{pointer-events:none;-webkit-user-drag:none;will-change:transform;transform-origin:50% 50%}";
  document.head.appendChild(st);
  img.draggable = false;
  var dragging = false,
    sx = 0,
    sy = 0,
    sRot = 0,
    sRotX = 0;
  var rot = 0,
    rotX = 0,
    zoom = 1;
  function apply(animated) {
    img.style.transition = animated
      ? "transform .45s cubic-bezier(.2,.8,.3,1)"
      : "none";
    img.style.transform =
      "rotateX(" +
      rotX.toFixed(1) +
      "deg) rotateY(" +
      rot.toFixed(1) +
      "deg) scale(" +
      zoom.toFixed(2) +
      ")";
    if (bar) bar.style.width = ((rot + 60) / 120) * 100 + "%";
  }
  viewer.addEventListener("pointerdown", function (e) {
    if (e.target.closest("button, a")) return;
    dragging = true;
    sx = e.clientX;
    sy = e.clientY;
    sRot = rot;
    sRotX = rotX;
    viewer.classList.add("grabbing");
    try {
      viewer.setPointerCapture(e.pointerId);
    } catch (err) {}
  });
  viewer.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    rot = Math.max(-60, Math.min(60, sRot + (e.clientX - sx) * 0.5));
    rotX = Math.max(-25, Math.min(25, sRotX - (e.clientY - sy) * 0.3));
    apply(false);
  });
  function end() {
    if (!dragging) return;
    dragging = false;
    viewer.classList.remove("grabbing");
  }
  viewer.addEventListener("pointerup", end);
  viewer.addEventListener("pointercancel", end);
  viewer.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
      zoom = Math.max(1, Math.min(2.4, zoom + (e.deltaY < 0 ? 0.2 : -0.2)));
      apply(true);
    },
    { passive: false },
  );
  viewer.addEventListener("dblclick", function () {
    rot = 0;
    rotX = 0;
    zoom = 1;
    apply(true);
  });
  apply(true);
};
function chatAddRideCard() {
  var body = document.querySelector(".chat-body");
  if (!body) return;
  var d = document.createElement("div");
  d.className = "chat-msg bot";
  d.innerHTML =
    '<img src="assets/img/new-rideon.png" alt="Bronx Ride-On Smart Suitcase" style="width:100%;border-radius:10px;margin-bottom:8px"><b>Bronx Ride-On Smart Suitcase</b><br>\u2022 Ride-on seat: sit and glide to your gate<br>\u2022 Quiet electric motor with handle throttle<br>\u2022 Cabin size, TSA lock<br>\u2022 USB phone charging<br>\u2022 7 colours<br>\u2022 <b>$349.99</b> <s>$449.99</s> (22% off), 2 year warranty<br><p style="margin-top:8px">Want to explore more?</p><a href="whats-new.html" style="display:inline-block;margin-top:6px;padding:8px 14px;background:#c69a5b;color:#0b1a30;border-radius:8px;font-weight:700">Learn more &rarr;</a>';
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
}
(function () {
  var KEY = "bronx-rideon-variants";
  function load() {
    var v = loadJSON(KEY, {});
    return v && typeof v === "object" && !Array.isArray(v) ? v : {};
  }
  function makeVariant(idx, color, image) {
    return {
      id: 1e3 + idx,
      name: "Bronx Ride-On Smart Suitcase",
      brand: "Bronx",
      category: "Luggage",
      gender: "Unisex",
      color,
      size: "Small (Cabin)",
      sizeGroup: "Small",
      price: 349.99,
      oldPrice: 449.99,
      rating: 4.7,
      reviews: 58,
      badge: "New",
      image,
      description:
        "Sit down, steer with the handle and glide to your gate. A cabin-size shell with a quiet electric motor, TSA lock and USB phone charging.",
      specs: {
        Material: "Polycarbonate hard shell",
        Type: "Electric ride-on",
        Lock: "TSA-approved combination",
        Charging: "USB phone charging",
        Warranty: "2 years",
      },
    };
  }
  var prevInit = initPageFeatures;
  initPageFeatures = function () {
    var saved = load();
    Object.keys(saved).forEach(function (k) {
      var v = saved[k];
      if (
        !PRODUCTS.some(function (p) {
          return p.id === v.id;
        })
      )
        PRODUCTS.push(v);
    });
    prevInit();
  };
  var qty = 1;
  document.addEventListener("DOMContentLoaded", function () {
    var btn = [].slice
      .call(document.querySelectorAll(".wn-btns a, .wn-btns button"))
      .filter(function (b) {
        return /shop luggage/i.test(b.textContent);
      })[0];
    if (!btn || !document.querySelector("#wnColors .wn-dot")) return;
    var holder = btn.parentElement;
    var st = document.createElement("style");
    st.textContent =
      "#rqErr{display:flex;align-items:center;gap:10px;width:100%;margin:0 0 14px;padding:12px 16px;border-radius:12px;background:#fdecea;border:1px solid #f3b8b3;border-left:5px solid #b3261e;color:#8c1d18;font-weight:700;font-size:.95rem}#rqErr[hidden]{display:none}#rqErr svg{width:20px;height:20px;flex-shrink:0;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}#wnColors.rq-shake{animation:rqShake .45s ease}@keyframes rqShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}";
    document.head.appendChild(st);
    var box = document.createElement("div");
    box.id = "rqBox";
    box.style.cssText = "width:100%;margin:0 0 14px;display:none";
    box.innerHTML =
      '<div style="font-weight:700;font-size:.9rem;color:var(--muted);margin-bottom:6px">Quantity</div><div style="display:inline-flex;align-items:center;gap:14px;border:1px solid var(--line);border-radius:10px;padding:6px 12px;background:#fff"><button type="button" id="rqMinus" style="width:28px;height:28px;border:0;background:none;font-size:1.3rem;font-weight:700;cursor:pointer">\u2212</button><span id="rqNum" style="min-width:20px;text-align:center;font-weight:800;color:#10233f">1</span><button type="button" id="rqPlus" style="width:28px;height:28px;border:0;background:none;font-size:1.3rem;font-weight:700;cursor:pointer">+</button></div>';
    var errBox = document.createElement("div");
    errBox.id = "rqErr";
    errBox.hidden = true;
    errBox.setAttribute("role", "alert");
    errBox.innerHTML =
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.01"/></svg><span>Please choose a colour to add to cart.</span>';
    holder.parentElement.insertBefore(box, holder);
    holder.parentElement.insertBefore(errBox, holder);
    var num = document.getElementById("rqNum");
    document.getElementById("rqMinus").addEventListener("click", function () {
      qty = Math.max(1, qty - 1);
      num.textContent = qty;
    });
    document.getElementById("rqPlus").addEventListener("click", function () {
      qty = Math.min(9, qty + 1);
      num.textContent = qty;
    });
    document.querySelectorAll("#wnColors .wn-dot").forEach(function (d) {
      d.addEventListener("click", function () {
        errBox.hidden = true;
        box.style.display = "block";
      });
    });
  });
  document.addEventListener(
    "click",
    function (e) {
      var btn = e.target.closest && e.target.closest("a, button");
      if (!btn || !/shop luggage/i.test(btn.textContent)) return;
      if (!btn.closest(".wn-btns")) return;
      var dots = [].slice.call(document.querySelectorAll("#wnColors .wn-dot"));
      if (!dots.length) return;
      e.preventDefault();
      e.stopPropagation();
      var dot = document.querySelector("#wnColors .wn-dot.active");
      if (!dot) {
        var err = document.getElementById("rqErr");
        var wrap = document.getElementById("wnColors");
        if (err) err.hidden = false;
        if (wrap) {
          wrap.classList.remove("rq-shake");
          void wrap.offsetWidth;
          wrap.classList.add("rq-shake");
          wrap.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }
      var idx = dots.indexOf(dot);
      var v = makeVariant(idx, dot.dataset.color, dot.dataset.img);
      var saved = load();
      saved[v.id] = v;
      saveJSON(KEY, saved);
      if (
        !PRODUCTS.some(function (p) {
          return p.id === v.id;
        })
      )
        PRODUCTS.push(v);
      addToCart(v.id, qty);
      location.href = "cart.html";
    },
    true,
  );
})();
(function () {
  var st = document.createElement("style");
  st.textContent =
    "#compareModal{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:14px;background:rgba(8,20,45,.62);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);animation:cmpFade .3s ease both}#compareModal[hidden]{display:none !important}#compareModal .modal-wrap{width:100%;display:flex;align-items:center;justify-content:center;max-height:100%}#compareModal .modal-box{position:relative;width:min(900px,100%);max-height:92vh;overflow-y:auto;overflow-x:hidden;background:#fff;border-radius:18px;padding:26px 24px 22px;box-shadow:0 30px 80px rgba(0,0,0,.45);animation:cmpPop .5s cubic-bezier(.34,1.45,.64,1) both}#compareModal.closing{animation:cmpFadeOut .22s ease both}#compareModal.closing .modal-box{animation:cmpPopOut .22s ease both}#compareModal .compare-table-wrap{overflow-x:auto}#compareModal .compare-table img{width:76px;height:76px;object-fit:cover;border-radius:10px}#compareModal .compare-table th,#compareModal .compare-table td{padding:9px 12px}#compareModal .compare-table tr{animation:cmpRow .5s ease both}#compareModal .compare-table tr:nth-child(2){animation-delay:.08s}#compareModal .compare-table tr:nth-child(3){animation-delay:.14s}#compareModal .compare-table tr:nth-child(4){animation-delay:.2s}#compareModal .compare-table tr:nth-child(5){animation-delay:.26s}#compareModal .compare-table tr:nth-child(6){animation-delay:.32s}#compareModal .compare-table tr:nth-child(7){animation-delay:.38s}#compareModal .compare-table tr:nth-child(8){animation-delay:.44s}#compareModal .compare-table tr:nth-child(9){animation-delay:.5s}#compareModal .qv-close{position:absolute;top:12px;right:12px;width:40px;height:40px;border-radius:50%;border:0;background:#f3e6d2;color:#10233f;font-size:18px;font-weight:700;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:5;transition:transform .3s ease,background .25s ease,color .25s ease,box-shadow .25s ease}#compareModal .qv-close:hover{background:#c0392b;color:#fff;transform:rotate(90deg) scale(1.12);box-shadow:0 8px 20px rgba(192,57,43,.45)}#compareModal .qv-close:active{transform:rotate(90deg) scale(.94)}#compareClear{background:#fff !important;color:#10233f !important;border:1px solid #fff !important;font-weight:700;padding:10px 22px;border-radius:10px;cursor:pointer;transition:transform .2s ease,background .2s ease,color .2s ease,box-shadow .2s ease}#compareClear:hover{background:#c0392b !important;color:#fff !important;border-color:#c0392b !important;transform:translateY(-3px);box-shadow:0 10px 22px rgba(192,57,43,.45)}#compareClear:active{transform:scale(.95)}#compareOpen{transition:transform .2s ease,box-shadow .2s ease}#compareOpen:hover{transform:translateY(-3px);box-shadow:0 10px 22px rgba(198,154,91,.5)}@keyframes cmpFade{from{opacity:0}to{opacity:1}}@keyframes cmpFadeOut{from{opacity:1}to{opacity:0}}@keyframes cmpPop{0%{opacity:0;transform:scale(.7) translateY(40px)}100%{opacity:1;transform:none}}@keyframes cmpPopOut{from{opacity:1;transform:none}to{opacity:0;transform:scale(.85) translateY(20px)}}@keyframes cmpRow{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}body.dark #compareModal .modal-box{background:#152238;color:#e8ecf3}body.dark #compareModal .qv-close{background:#24344d;color:#fff}";
  document.head.appendChild(st);
  document.addEventListener("DOMContentLoaded", function () {
    var b = document.getElementById("compareClear");
    if (b) b.textContent = "Close";
  });
  closeCompareModal = function () {
    var m = document.getElementById("compareModal");
    if (!m || m.hidden || m.classList.contains("closing")) return;
    m.classList.add("closing");
    setTimeout(function () {
      m.hidden = true;
      m.classList.remove("closing");
    }, 220);
  };
})();
(function () {
  var st = document.createElement("style");
  st.textContent =
    "#compareModal{padding:16px !important;background:rgba(8,20,45,.66) !important}#compareModal .modal-box{display:flex !important;flex-direction:column;width:min(900px,100%) !important;max-height:86vh !important;padding:0 !important;overflow:hidden !important;border-radius:22px !important;box-shadow:0 0 0 1px rgba(198,154,91,.35),0 25px 70px rgba(0,0,0,.5),0 8px 24px rgba(16,35,63,.35) !important;animation:cmpPop2 .55s cubic-bezier(.34,1.4,.64,1) both !important}#compareModal.closing .modal-box{animation:cmpPopOut .22s ease both !important}@keyframes cmpPop2{0%{opacity:0;transform:translateY(60px) scale(.82)}100%{opacity:1;transform:none}}#compareModal .modal-box > h2{flex:0 0 auto;margin:0 !important;padding:22px 80px 16px 26px;background:inherit;border-bottom:1px solid #eadfce;position:relative;z-index:2;box-shadow:0 6px 14px -10px rgba(16,35,63,.35)}#compareModal .compare-table-wrap{flex:1 1 auto;min-height:0;overflow-y:auto !important;overflow-x:auto;padding:18px 26px 26px}#compareModal .compare-table-wrap::-webkit-scrollbar{width:8px;height:8px}#compareModal .compare-table-wrap::-webkit-scrollbar-thumb{background:#c69a5b;border-radius:99px}#compareModal .compare-table-wrap::-webkit-scrollbar-track{background:transparent}#compareModal .qv-close{top:16px !important;right:18px !important;width:42px;height:42px;border-radius:12px !important;background:#f3e6d2 !important;color:#10233f !important;border:1px solid #e3d2b4 !important;transition:transform .25s ease,background .25s ease,box-shadow .25s ease !important}#compareModal .qv-close:hover{background:#c69a5b !important;color:#10233f !important;transform:translateY(-2px) scale(1.06) !important;box-shadow:0 8px 18px rgba(198,154,91,.5) !important}#compareModal .qv-close:active{transform:scale(.94) !important}#compareClear{background:#fff !important;color:#10233f !important;border:2px solid #fff !important;border-radius:12px !important}#compareClear:hover{background:#c69a5b !important;color:#10233f !important;border-color:#c69a5b !important;transform:translateY(-4px) scale(1.05) !important;box-shadow:0 12px 24px rgba(198,154,91,.55) !important}body.dark #compareModal .modal-box > h2{background:#152238;border-color:#24344d}body.dark #compareModal .qv-close{background:#24344d !important;color:#fff !important;border-color:#33466a !important}body.dark #compareModal .qv-close:hover{background:#c69a5b !important;color:#10233f !important}@media (max-width:560px){#compareModal .modal-box{max-height:90vh !important;border-radius:18px !important}#compareModal .modal-box > h2{font-size:1.2rem;padding:18px 70px 12px 18px}#compareModal .compare-table-wrap{padding:14px 14px 20px}}";
  document.head.appendChild(st);
})();
(function () {
  var st = document.createElement("style");
  st.textContent =
    "#compareModal .compare-table img{width:150px !important;height:150px !important;object-fit:cover;border-radius:16px !important;display:block;margin:0 0 12px;box-shadow:0 8px 20px rgba(16,35,63,.22);transition:transform .35s ease,box-shadow .35s ease}#compareModal .compare-table img:hover{transform:scale(1.06);box-shadow:0 14px 30px rgba(16,35,63,.32)}#compareModal .compare-table td strong{font-size:1rem;line-height:1.4}#compareModal .compare-table{table-layout:fixed;width:100%}#compareModal .compare-table th{width:110px}#compareModal .compare-table td{min-width:190px;vertical-align:top}@media (max-width:560px){#compareModal .compare-table img{width:110px !important;height:110px !important}#compareModal .compare-table td{min-width:150px}}";
  document.head.appendChild(st);
})();
(function () {
  var st = document.createElement("style");
  st.textContent =
    "#compareModal .compare-table td{text-align:center !important;vertical-align:middle !important}#compareModal .compare-table img{margin:0 auto 12px !important}#compareModal .compare-table td strong{display:block;text-align:center}#compareModal .compare-table td .btn{display:inline-flex;align-items:center;justify-content:center;margin:0 auto}#compareModal .compare-table th{vertical-align:middle !important;text-align:left}";
  document.head.appendChild(st);
})();
(function () {
  initTransitions = function () {};
  var st = document.createElement("style");
  st.textContent = ".page-transition,#pageTransition{display:none !important}";
  document.head.appendChild(st);
  showSkeletons = function () {};
})();
(function () {
  var st = document.createElement("style");
  st.textContent =
    "#compareModal .compare-table td{position:relative}#compareModal .cmp-remove{position:absolute;top:8px;right:8px;width:30px;height:30px;border-radius:50%;border:1px solid #e3d2b4;background:#10233f;color:#fff;font-size:14px;font-weight:700;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:3;opacity:0;transform:scale(.7);transition:opacity .2s ease,transform .25s ease,background .2s ease,color .2s ease,box-shadow .2s ease}#compareModal .compare-table td:hover .cmp-remove,#compareModal .cmp-remove:focus-visible{opacity:1;transform:scale(1)}#compareModal .cmp-remove:hover{background:#c69a5b;color:#10233f;transform:rotate(90deg) scale(1.1);box-shadow:0 6px 16px rgba(198,154,91,.5)}#compareModal .cmp-remove:active{transform:scale(.9)}@media (hover:none){#compareModal .cmp-remove{opacity:1;transform:none}}";
  document.head.appendChild(st);
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-cmp-remove]") : null;
    if (!b) return;
    e.preventDefault();
    e.stopPropagation();
    var id = +b.dataset.cmpRemove;
    compareSet = compareSet.filter(function (x) {
      return x !== id;
    });
    saveJSON("bronx-compare", compareSet);
    renderCompareTray();
    if (!compareSet.length) {
      closeCompareModal();
      toast("Comparison cleared.");
      return;
    }
    openCompareModal();
    toast("Removed from comparison.");
  });
})();
document.addEventListener("DOMContentLoaded", function () {
  function replay(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }
  var home = document.querySelector(".wn-home");
  var badges = document.querySelectorAll(".wn-new, .wn-sale");
  if (home) {
    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            replay(home, "go");
            badges.forEach(function (b) {
              replay(b, "wn-active");
            });
          } else {
            home.classList.remove("go");
            badges.forEach(function (b) {
              b.classList.remove("wn-active");
            });
          }
        });
      },
      { threshold: 0.15 },
    ).observe(home);
  } else if (badges.length) {
    var bio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) replay(en.target, "wn-active");
          else en.target.classList.remove("wn-active");
        });
      },
      { threshold: 0.3 },
    );
    badges.forEach(function (b) {
      bio.observe(b);
    });
  }
  var items = document.querySelectorAll(
    ".page-hero .container, .wn-page .wn-stage, .wn-page .wn-info, .wn-page .wn-head, .wn-page .wn-feat, .wn-page .wn-shots figure, .wn-page .wn-specs, .wn-page .wn-cta",
  );
  items.forEach(function (el) {
    el.classList.remove("reveal");
    el.classList.add("wn-scroll-item");
    if (el.classList.contains("wn-stage")) el.classList.add("wn-scroll-stage");
    if (el.classList.contains("wn-info")) el.classList.add("wn-scroll-info");
  });
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle("wn-scroll-visible", en.isIntersecting);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  items.forEach(function (el) {
    io.observe(el);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var img = document.getElementById("wnImg");
  var lbl = document.getElementById("wnLbl");
  var dots = document.querySelectorAll("#wnColors .wn-dot");
  if (!img || !lbl || !dots.length) return;
  dots.forEach(function (d) {
    d.addEventListener("click", function () {
      dots.forEach(function (x) {
        x.classList.toggle("active", x === d);
      });
      lbl.textContent = "Colour: " + d.dataset.color;
      img.src = d.dataset.img;
    });
  });
});
(function () {
  var prevSend = sendChat;
  var origAdd = chatAddMsg;
  var LINK = 'style="color:inherit;text-decoration:underline;font-weight:700"';
  var RIDE =
    /electric|ride[\s-]?on|rideon|motori[sz]ed|e-?luggage|smart\s*(suitcase|luggage)/i;
  return PRODUCTS;
  {
    return typeof PRODUCTS !== "undefined" && PRODUCTS.length
      ? PRODUCTS
      : FALLBACK_PRODUCTS;
  }
  function variants(p) {
    var v = HAS_WIN && window.BRONX_VARIANTS && window.BRONX_VARIANTS[p.id];
    return v && v.length ? v : [{ name: p.color }];
  }
  function colourNames(p) {
    return variants(p).map(function (c) {
      return String(c.name).trim();
    });
  }
  function reEsc(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&");
  }
  function hasWord(t, w) {
    return new RegExp("(^|[^a-z0-9])" + reEsc(w) + "([^a-z0-9]|$)").test(t);
  }
  function famOf(n) {
    return typeof colorFamily === "function" ? colorFamily(n) : null;
  }
  function tokensOf(s) {
    return String(s)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
  }
  function lev(a, b) {
    if (a === b) return 0;
    var m = a.length,
      n = b.length,
      prev = [],
      cur,
      i,
      j;
    if (!m) return n;
    if (!n) return m;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur = [i];
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(
          prev[j] + 1,
          cur[j - 1] + 1,
          prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
        );
      }
      prev = cur;
    }
    return prev[n];
  }
  var BASE =
    "shipping shipped delivery deliver delivered returns return refund refunds exchange warranty guarantee tracking track order orders price prices pricing discount discounts offer offers sale deals coupon promo payment pay cash visa mastercard paypal checkout cart wishlist login account password contact email phone whatsapp support hours store shop location address dimensions dimension size sizes weight capacity material wheels wheel spinner suitcase suitcases luggage backpack backpacks duffel messenger briefcase crossbody garment cabin laptop leather canvas colour colours color colors shade shades available availability brands brand samsonite delsey travelpro tourister american electric arrivals arrival popular cheap cheapest expensive premium recommend women unisex review reviews rating ratings studio gallery lightweight waterproof expandable compare difference".split(
      " ",
    );
  var COMMON =
    "what which where when have this that with your from about there their them they will would could should show tell give need want wants like make some more much many does done into over also just only than then very best good great nice please help hello thanks thank look find sell stock cost been were care wish take dont here come same free fast long mine ours know name names time date week year years today tomorrow both each ones other another most such even ever every after before again still going gone made makes making things thing something anything nothing everything someone anyone people person trip days month months huge tiny cute nice school office work gift kids child girl woman women".split(
      " ",
    );
  var vocab = null,
    vocabKey = "";
  function getVocab() {
    var list = plist(),
      key = list.length + "|" + (window.BRONX_VARIANTS ? 1 : 0);
    if (vocab && vocabKey === key) return vocab;
    var set = {};
    BASE.forEach(function (w) {
      set[w] = 1;
    });
    list.forEach(function (p) {
      (p.name + " " + p.brand + " " + p.category)
        .toLowerCase()
        .split(/[^a-z]+/)
        .forEach(function (w) {
          if (w.length >= 4) set[w] = 1;
        });
      colourNames(p).forEach(function (n) {
        n.toLowerCase()
          .split(/[^a-z]+/)
          .forEach(function (w) {
            if (w.length >= 4) set[w] = 1;
          });
      });
    });
    vocab = Object.keys(set);
    vocabKey = key;
    return vocab;
  }
  function fixTypos(text) {
    var words = getVocab(),
      known = {};
    words.forEach(function (w) {
      known[w] = 1;
    });
    COMMON.forEach(function (w) {
      known[w] = 1;
    });
    return String(text).replace(/[A-Za-z]{4,}/g, function (w) {
      var lw = w.toLowerCase();
      if (known[lw]) return w;
      var limit = lw.length <= 5 ? 1 : 2,
        best = null,
        bd = 99,
        i,
        c,
        d;
      for (i = 0; i < words.length; i++) {
        c = words[i];
        if (
          c.charAt(0) !== lw.charAt(0) ||
          Math.abs(c.length - lw.length) > limit
        )
          continue;
        d = lev(lw, c);
        if (d < bd) {
          bd = d;
          best = c;
        }
      }
      return best && bd <= limit ? best : w;
    });
  }
  var BRANDS = [
    "bronx",
    "samsonite",
    "delsey",
    "travelpro",
    "american",
    "tourister",
  ];
  var GENERIC =
    "backpack backpacks bag bags luggage suitcase spinner hard shell carry cabin case set pack expandable softside rugged retro mini travel laptop the and".split(
      " ",
    );
  function nameWords(p) {
    return p.name
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(function (w) {
        return w.length >= 3 && BRANDS.indexOf(w) < 0 && GENERIC.indexOf(w) < 0;
      });
  }
  function findProducts(t) {
    var toks = tokensOf(t),
      best = [],
      top = 0;
    plist().forEach(function (p) {
      var s = 0;
      nameWords(p).forEach(function (w) {
        if (toks.indexOf(w) > -1) s++;
      });
      if (!s) return;
      if (
        toks.indexOf(p.brand.toLowerCase()) > -1 ||
        (p.brand === "American Tourister" && toks.indexOf("tourister") > -1)
      )
        s += 0.5;
      if (s > top) {
        top = s;
        best = [p];
      } else if (s === top) best.push(p);
    });
    return best;
  }
  var ASK = {
    price: /price|cost|how much|\brate\b|kitn|qeemat|kimat|\$/,
    size: /size|dimension|big|large|height|width|length|inch|capacity|litre|liter|volume|\bfit/,
    weight: /weight|heavy|\bkg\b|kilo/,
    warranty: /warrant|guarantee/,
    colour: /colou?r|shade|available in|\brang\b/,
    material: /material|made of|made from|fabric/,
    lock: /\block|\btsa\b|combination/,
    wheels: /wheel|\broll/,
    rating: /rating|rated|review|\bstars?\b/,
    stock: /in stock|stock|availability/,
  };
  function productAnswer(p, t) {
    var sp = p.specs || {},
      parts = [],
      w = {},
      some;
    Object.keys(ASK).forEach(function (k) {
      w[k] = ASK[k].test(t);
    });
    some = Object.keys(w).some(function (k) {
      return w[k];
    });
    function add(label, val) {
      if (val) parts.push("\u2022 " + label + ": " + val);
    }
    if (!some || w.price)
      add(
        "Price",
        money(p.price) +
          (p.oldPrice
            ? " (was " +
              money(p.oldPrice) +
              ", save " +
              Math.round((1 - p.price / p.oldPrice) * 100) +
              "%)"
            : ""),
      );
    if (!some || w.size) {
      add("Size", p.size);
      add("Dimensions", sp.Dimensions);
      add("Capacity", sp.Capacity);
    }
    if (!some || w.weight) add("Weight", sp.Weight);
    if (!some || w.warranty) add("Warranty", sp.Warranty);
    if (!some || w.colour) {
      var cn = colourNames(p);
      add("Colours (" + cn.length + ")", cn.join(", "));
    }
    if (!some || w.material) add("Material", sp.Material);
    if (!some || w.lock) add("Lock", sp.Lock);
    if (!some || w.wheels) add("Wheels", sp.Wheels);
    if (!some || w.rating)
      add("Rating", p.rating + " / 5 (" + p.reviews + " reviews)");
    if (w.stock) add("Stock", "In stock, ships within 24 hours");
    if (!some) add("Brand", p.brand);
    return {
      html:
        "<b>" +
        p.name +
        "</b><br>" +
        parts.join("<br>") +
        "<br><a " +
        LINK +
        ' href="product.html?id=' +
        p.id +
        '">View product \u2192</a>',
    };
  }
  var MOD = [
    "soft",
    "light",
    "deep",
    "dark",
    "glossy",
    "pure",
    "warm",
    "dusty",
    "dusky",
    "faded",
    "muted",
    "pastel",
  ];
  var SYN = {
    gray: "Grey",
    maroon: "Red",
    violet: "Purple",
    lilac: "Purple",
    cream: "Beige",
    khaki: "Beige",
    beige: "Beige",
    gold: "Gold",
    turquoise: "Teal",
    aqua: "Teal",
    rust: "Orange",
    coral: "Pink",
    magenta: "Pink",
  };
  function allShades() {
    var m = {};
    plist().forEach(function (p) {
      colourNames(p).forEach(function (n) {
        m[n.toLowerCase()] = n;
      });
    });
    return m;
  }
  function famSpec(f) {
    return {
      label: f,
      fn: function (n) {
        return famOf(n) === f;
      },
    };
  }
  function shadeSpec(label, key) {
    var toks = tokensOf(key);
    return {
      label,
      fn: function (n) {
        var low = n.toLowerCase();
        return toks.every(function (x) {
          return hasWord(low, x);
        });
      },
    };
  }
  function detectColour(t) {
    var shades = allShades(),
      i,
      k,
      fam,
      tok;
    var keys = Object.keys(shades).sort(function (a, b) {
      return b.length - a.length;
    });
    for (i = 0; i < keys.length; i++) {
      k = keys[i];
      if (!hasWord(t, k)) continue;
      fam = famOf(shades[k]);
      if (fam && (fam.toLowerCase() === k || k === "navy blue"))
        return famSpec(fam);
      return shadeSpec(shades[k], k);
    }
    var toks = tokensOf(t);
    if (typeof colorFamily === "function") {
      for (i = 0; i < toks.length; i++)
        if (SYN[toks[i]]) return famSpec(SYN[toks[i]]);
    }
    var st = {};
    keys.forEach(function (key) {
      tokensOf(key).forEach(function (x) {
        if (x.length >= 4 && MOD.indexOf(x) < 0) st[x] = 1;
      });
    });
    for (i = 0; i < toks.length; i++) {
      tok = toks[i];
      if (st[tok])
        return shadeSpec(tok.charAt(0).toUpperCase() + tok.slice(1), tok);
    }
    return null;
  }
  function categoryOf(t) {
    if (/backpack|rucksack|daypack/.test(t)) return "Backpacks";
    if (/suitcase|luggage|trolley|trolly|spinner|carry|cabin/.test(t))
      return "Luggage";
    if (
      /\bbags?\b|tote|duffel|messenger|sling|sleeve|garment|briefcase|crossbody/.test(
        t,
      )
    )
      return "Bags";
    return "";
  }
  function listHtml(title, items, tail) {
    return {
      html:
        title +
        "<br>" +
        items
          .map(function (x) {
            return (
              "\u2022 <a " +
              LINK +
              ' href="' +
              x.href +
              '">' +
              x.label +
              "</a>" +
              (x.note ? " \u2014 " + x.note : "")
            );
          })
          .join("<br>") +
        (tail ? "<br>" + tail : ""),
    };
  }
  function colourAnswer(t) {
    var spec = detectColour(t);
    if (!spec) return null;
    var cat = categoryOf(t),
      items = [];
    plist().forEach(function (p) {
      if (cat && p.category !== cat) return;
      var hit = colourNames(p).filter(spec.fn)[0];
      if (hit)
        items.push({
          href: "product.html?id=" + p.id + "&color=" + encodeURIComponent(hit),
          label: p.name,
          note: money(p.price) + " (" + hit + ")",
        });
    });
    var what = spec.label + (cat ? " " + cat.toLowerCase() : " products");
    if (!items.length)
      return (
        "Sorry, we do not have " +
        what +
        ' right now. Ask me "what colours do you have" to see everything we offer. \u{1F3A8}'
      );
    var shown = items.slice(0, 8);
    return listHtml(
      "We have " + items.length + " " + what + " \u{1F3A8}",
      shown,
      items.length > shown.length
        ? "+ " +
            (items.length - shown.length) +
            " more. Use the Colour filter in the <a " +
            LINK +
            ' href="shop.html">Shop</a> to see all.'
        : "",
    );
  }
  function coloursOverview() {
    var fams =
      typeof allColors === "function"
        ? allColors().map(function (c) {
            return c.name;
          })
        : [];
    var n = Object.keys(allShades()).length;
    return {
      html:
        "We have " +
        n +
        " shades" +
        (fams.length
          ? " in " + fams.length + " colour families: " + fams.join(", ")
          : "") +
        '. \u{1F3A8}<br>Every product has its own set of colours. Try <b>"navy backpack"</b>, <b>"burgundy suitcase"</b> or <b>"colours of Weekender Duffel"</b>, or use the Colour filter in the <a ' +
        LINK +
        ' href="shop.html">Shop</a>.',
    };
  }
  function byIds(ids) {
    return ids
      .map(function (id) {
        return plist().filter(function (p) {
          return +p.id === id;
        })[0];
      })
      .filter(Boolean)
      .map(function (p) {
        return {
          href: "product.html?id=" + p.id,
          label: p.name,
          note: money(p.price),
        };
      });
  }
  var USE = [
    [
      /\b(gym|sports?|swim\w*|workout|training)\b/,
      "Great for the gym and sports \u{1F4AA}",
      [30, 8, 6],
    ],
    [
      /\b(school|college|universit\w*|students?|campus)\b/,
      "Good picks for school and college \u{1F392}",
      [34, 10, 32],
    ],
    [
      /\b(office|business|meeting|professional|commut\w*|for work|work trip)\b/,
      "For the office and work \u{1F4BC}",
      [31, 23, 43, 11],
    ],
    [
      /\b(hik\w*|trek\w*|camp\w*|outdoors?|trail|adventure)\b/,
      "Built for the outdoors \u{1F3D4}\uFE0F",
      [24, 33, 9, 46],
    ],
    [
      /\b(kids?|child|children|toddler|boys?|girls?|sons?|daughters?)\b/,
      "For little travellers \u{1F996}",
      [20, 44],
    ],
    [
      /\b(family|3.?piece|three.?piece|whole set|matching set)\b/,
      "For families and sets \u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
      [38, 37],
    ],
    [
      /long trip|\bmonth\b|\babroad\b|international|check.?in|big suitcase|large suitcase|lots of (clothes|stuff)/,
      "Big suitcases for long trips \u2708\uFE0F",
      [1, 2, 15, 45, 36, 37],
    ],
    [
      /short trip|weekend|overnight|carry.?on|hand luggage|under.?seat/,
      "Cabin and carry-on picks \u{1F9F3}",
      [13, 16, 35, 27, 40, 41],
    ],
    [/\b(camera|photograph\w*|lens)\b/, "For camera gear \u{1F4F7}", [21]],
    [
      /\b(suits?|wedding|formal|garment|dress)\b/,
      "For suits and formal wear \u{1F454}",
      [19],
    ],
    [
      /\b(gift|present|birthday|anniversary|wife|girlfriend|mother|mom|mum)\b/,
      "Gift ideas \u{1F381}",
      [29, 5, 3, 42],
    ],
    [
      /\b(laptop|macbook|tablet|ipad)\b/,
      "Laptop-friendly picks \u{1F4BB}",
      [11, 43, 31, 23, 22],
    ],
  ];
  var KB = [
    [
      /(tsa|combination|lock).*(reset|forgot|forget|change|set)|(reset|forgot|forget).*(lock|code)/,
      "To reset a combination lock: set the dials to your current code (usually 000), slide or press the small reset button near the lock, enter your new 3-digit code, then release the button. Exact steps differ by model, so check the label near the lock. \u{1F510}",
    ],
    [
      /\b(clean|wash|care|maintain|stain|dirty)\b/,
      "Care tips \u{1F9FD} Hard-shell: wipe with a damp cloth and mild soap. Fabric: spot-clean, do not machine-wash. Leather: wipe gently and use a leather conditioner now and then. Avoid harsh chemicals and direct heat.",
    ],
    [
      /hard.?shell.*soft|soft.?(shell|side).*hard|difference.*(hard|soft)|hard or soft/,
      "Hard-shell cases protect better, resist scratches and stay in shape, but do not stretch. Soft-side cases flex, have outer pockets and are often expandable, so they squeeze into tight spaces. \u{1F9F3}",
    ],
    [
      /\b(airline|airlines|flight|plane)\b.*(size|allowed|limit|rules|carry|cabin)|cabin (size|rules|limit)|carry.?on (size|rules|limit)|overhead|hand baggage/,
      function () {
        var items = plist()
          .filter(function (p) {
            return p.category === "Luggage" && p.sizeGroup === "Small";
          })
          .map(function (p) {
            return {
              href: "product.html?id=" + p.id,
              label: p.name,
              note: p.size,
            };
          });
        return listHtml(
          "Most airlines allow roughly 22 x 14 x 9 in (56 x 36 x 23 cm) in the cabin, but limits differ, so check your airline. \u{1F6EB}<br>Our small cases:",
          items,
        );
      },
    ],
    [
      /(which|what|how).*(size|big|large).*(trip|days|week|month)|how many days|for (a |an )?(\d+|one|two|three|four|five|seven|ten) ?(day|days|week|weeks|month)/,
      'Rough guide \u{1F4CF} 20\u201322" cabin for 3\u20135 days, 24\u201326" for 1\u20132 weeks, 28\u201330" for 2+ weeks or families. Tell me your trip length and I will suggest a suitcase.',
    ],
  ];
  function brain(t) {
    if (RIDE.test(t)) return null;
    var found = findProducts(t),
      i,
      r;
    if (found.length === 1) return productAnswer(found[0], t);
    if (found.length > 1 && found.length <= 4) {
      return listHtml(
        "Did you mean one of these? \u{1F914}",
        found.map(function (p) {
          return {
            href: "product.html?id=" + p.id,
            label: p.name,
            note: money(p.price),
          };
        }),
        "Tell me which one and I will share the details.",
      );
    }
    if (
      /(what|which|all|any|list|show|available|different).*(colou?r|shade)|colou?rs?.*(do you|have|available|options|offer)|how many colou?rs/.test(
        t,
      ) &&
      !detectColour(t)
    ) {
      return coloursOverview();
    }
    var c = colourAnswer(t);
    if (c) return c;
    for (i = 0; i < KB.length; i++) {
      if (KB[i][0].test(t)) {
        r = KB[i][1];
        return typeof r === "function" ? r() : r;
      }
    }
    for (i = 0; i < USE.length; i++) {
      if (USE[i][0].test(t)) {
        var items = byIds(USE[i][2]);
        if (items.length) return listHtml(USE[i][1], items);
      }
    }
    return null;
  }
  function scrollDown() {
    var b = document.getElementById("chatBody");
    if (b) b.scrollTop = b.scrollHeight;
  }
  function show(raw, ans) {
    origAdd(raw, "user");
    var typing = origAdd("Typing\u2026", "bot typing");
    setTimeout(function () {
      if (typing) typing.remove();
      if (ans && ans.html) {
        var d = origAdd("", "bot");
        if (d) d.innerHTML = ans.html;
        scrollDown();
      } else origAdd(ans, "bot");
    }, 650);
  }
  function fallbackHtml() {
    var top = plist()
      .slice()
      .sort(function (a, b) {
        return b.rating - a.rating || b.reviews - a.reviews;
      })
      .slice(0, 3);
    return (
      "I could not find an exact answer to that, but I can help with products, colours, prices, sizes, warranty, shipping, returns, payment and order tracking. \u{1F60A}<br>Popular right now:<br>" +
      top
        .map(function (p) {
          return (
            "\u2022 <a " +
            LINK +
            ' href="product.html?id=' +
            p.id +
            '">' +
            p.name +
            "</a> \u2014 " +
            money(p.price)
          );
        })
        .join("<br>") +
      "<br>For anything else, email <b>bronxluggage@gmail.com</b> or call <b>(555) 123-4567</b> (Mon\u2013Sat, 9 AM\u20136 PM)."
    );
  }
  chatAddMsg = function (text, who) {
    if (
      who === "bot" &&
      /^Hmm, I am not sure about that one/.test(String(text))
    ) {
      var d = origAdd("", "bot");
      if (d) {
        d.innerHTML = fallbackHtml();
        scrollDown();
      }
      return d;
    }
    return origAdd(text, who);
  };
  sendChat = function (text) {
    var raw = String(text),
      t0 = raw.trim();
    if (
      /bx-?\s*\d{3,}/i.test(t0) ||
      /^\d{4,}$/.test(t0) ||
      /^(cancel|stop|no|back|exit|nahi)$/i.test(t0)
    ) {
      return prevSend(raw);
    }
    var fixed = fixTypos(t0),
      ans = null;
    try {
      ans = brain(fixed.toLowerCase());
    } catch (e) {
      ans = null;
    }
    if (ans) {
      show(raw, ans);
      return;
    }
    prevSend(fixed);
    if (fixed !== t0) {
      var bubbles = document.querySelectorAll("#chatBody .chat-msg.user");
      if (bubbles.length) bubbles[bubbles.length - 1].textContent = t0;
    }
  };
})();
(function () {
  "use strict";
  var S = {
    lang: "en",
    forceLang: null,
    awaitOrder: false,
    product: null,
    list: [],
    filters: null,
  };
  var CHIP = {};
  var HAS_WIN = typeof window !== "undefined";
  var CONTACT = { email: "bronxluggage@gmail.com", phone: "(555) 123-4567" };
  var LINK = 'style="color:inherit;text-decoration:underline;font-weight:700"';
  function t(en, ur) {
    return S.lang === "ur" ? ur : en;
  }
  function R(html, chips) {
    return { html, chips: chips || null };
  }
  function money2(n) {
    return "$" + Number(n).toFixed(2);
  }
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function a(href, label) {
    return "<a " + LINK + ' href="' + href + '">' + label + "</a>";
  }
  function plink(p, colour) {
    return a(
      "product.html?id=" +
        p.id +
        (colour ? "&color=" + encodeURIComponent(colour) : ""),
      esc(p.name),
    );
  }
  function off(p) {
    return p.oldPrice && p.oldPrice > p.price
      ? Math.round((1 - p.price / p.oldPrice) * 100)
      : 0;
  }
  var COLOUR_COUNT = 16;

  var POPULAR_COLOURS = ["Black", "Navy", "Blue", "Red", "Grey", "Silver"];

  function totalProducts() {
    return 45;
  }

  var COLOUR_COUNT = 16;

  var POPULAR_COLOURS = ["Black", "Navy", "Blue", "Red", "Grey", "Silver"];

  function totalProducts() {
    return plist().filter(function (x) {
      return +x.id < 1000;
    }).length;
  }

  function plist() {
    if (typeof PRODUCTS !== "undefined" && PRODUCTS.length) return PRODUCTS;
    if (typeof FALLBACK_PRODUCTS !== "undefined") return FALLBACK_PRODUCTS;
    return [];
  }

  function variants(p) {
    var v = HAS_WIN && window.BRONX_VARIANTS && window.BRONX_VARIANTS[p.id];
    if (v && v.length) return v;
    // agar products.json me colours ki list ho to wo bhi use karo
    var own = p.colors || p.variants;
    if (Array.isArray(own) && own.length)
      return own.map(function (c) {
        return typeof c === "string" ? { name: c } : c;
      });
    return [{ name: p.color }];
  }
  function cnames(p) {
    return variants(p).map(function (c) {
      return String(c.name).trim();
    });
  }
  function famOf(n) {
    return typeof colorFamily === "function" ? colorFamily(n) : null;
  }
  function ls(key, fb) {
    try {
      var v = JSON.parse(localStorage.getItem(key));
      return v == null ? fb : v;
    } catch (e) {
      return fb;
    }
  }
  function byRating(x, y) {
    return y.rating - x.rating || y.reviews - x.reviews;
  }
  function lev(x, y) {
    if (x === y) return 0;
    var m = x.length,
      n = y.length,
      prev = [],
      cur,
      i,
      j;
    if (!m) return n;
    if (!n) return m;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur = [i];
      for (j = 1; j <= n; j++)
        cur[j] = Math.min(
          prev[j] + 1,
          cur[j - 1] + 1,
          prev[j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1),
        );
      prev = cur;
    }
    return prev[n];
  }
  function set(str) {
    var o = {};
    str.split(" ").forEach(function (w) {
      if (w) o[w] = 1;
    });
    return o;
  }
  var UR_S = set(
    "kya kia hai hain hun hoon nahi nhi nahin chahiye chaiye chahie chahyie mujhe mujhy mjhe mera meri mere aap ap tum tumhare aapka aapki aapke hamara hamari kitna kitne kitni kahan kidhar kaise kese kaisay kab kyun kyu kyunke kon kaun konsa konsi kaunsa kaunsi dikhao dikha dikhaye dikhayen batao btao bata bataye bataiye batayen bta lena lene khareedna kharidna wala wali wale sasta sasti saste mehnga mehngi qeemat kimat keemat daam paisay paise paisa rang wapas bhai yaar yar acha accha achi theek thik shukriya shukria jee haan abhi lekin magar bohat bahut thora thori zyada ziada sirf liye liay iska iski uska uski isme usme isko usko inka salam aoa assalam khuda hafiz allah daalo daal dalo mein bhi koi kuch sab kisi",
  );
  var UR_W = set("ka ki ke ko se tak par aur ya ek ho");
  var EN_M = set(
    "the what how which where when who do does did you your have has can could would will is are was show want need looking any with for about please available much many there this that these those of thanks thank hello hey hi bye",
  );
  function detectLang(toks) {
    if (S.forceLang) return S.forceLang;
    var ur = 0,
      en = 0;
    toks.forEach(function (w) {
      if (UR_S[w]) ur += 2;
      else if (UR_W[w]) ur += 1;
      if (EN_M[w]) en += 1;
    });
    if (ur >= 1 && ur >= en) return "ur";
    var hasWord = toks.some(function (w) {
      return /^[a-z]{2,}$/.test(w) && w !== "bx";
    });
    if (!hasWord) return S.lang;
    return "en";
  }
  var DICT = {
    qeemat: "price",
    kimat: "price",
    keemat: "price",
    daam: "price",
    paisay: "price",
    paise: "price",
    paisa: "price",
    sasta: "cheap",
    sasti: "cheap",
    saste: "cheap",
    mehnga: "expensive",
    mehngi: "expensive",
    mahnga: "expensive",
    mahngi: "expensive",
    rang: "colour",
    rangon: "colour",
    rung: "colour",
    wazan: "weight",
    wazn: "weight",
    bara: "large",
    bari: "large",
    bare: "large",
    chota: "small",
    choti: "small",
    chhota: "small",
    chhoti: "small",
    dikhao: "show",
    dikha: "show",
    dikhaye: "show",
    dikhayen: "show",
    dikhana: "show",
    batao: "show",
    btao: "show",
    bata: "show",
    bataye: "show",
    bataiye: "show",
    batayen: "show",
    bta: "show",
    chahiye: "want",
    chaiye: "want",
    chahie: "want",
    chahyie: "want",
    khareedna: "buy",
    kharidna: "buy",
    khareed: "buy",
    lena: "buy",
    wapas: "return",
    wapsi: "return",
    badalna: "exchange",
    tabdeel: "exchange",
    rabta: "contact",
    raabta: "contact",
    kitna: "howmuch",
    kitne: "howmuch",
    kitni: "howmuch",
    kahan: "where",
    kidhar: "where",
    kaise: "how",
    kese: "how",
    kaisay: "how",
    kya: "what",
    kia: "what",
    kon: "which",
    kaun: "which",
    konsa: "which",
    konsi: "which",
    kaunsa: "which",
    kaunsi: "which",
    din: "days",
    hafta: "week",
    haftay: "week",
    shukriya: "thanks",
    shukria: "thanks",
    mehrbani: "thanks",
    behtareen: "best",
    behtar: "best",
    acha: "good",
    accha: "good",
    achi: "good",
    naya: "new",
    naye: "new",
    nayi: "new",
    bachay: "kids",
    bachon: "kids",
    bacha: "kids",
    bachi: "kids",
    larka: "men",
    larke: "men",
    mard: "men",
    larki: "women",
    larkiyan: "women",
    aurat: "women",
    khawateen: "women",
    tohfa: "gift",
    tohfe: "gift",
    zamanat: "warranty",
    safai: "clean",
    kharab: "broken",
    tootta: "broken",
    toot: "broken",
    pohnchega: "arrive",
    pahunchega: "arrive",
    pohanchega: "arrive",
    pohnch: "arrive",
    pohanch: "arrive",
    kholte: "open",
    khulta: "open",
    khulti: "open",
    khulte: "open",
    band: "close",
    jaldi: "fast",
    pehla: "first",
    pehli: "first",
    dusra: "second",
    doosra: "second",
    teesra: "third",
    daalo: "add",
    daal: "add",
    dalo: "add",
    dal: "add",
    kala: "black",
    kali: "black",
    safed: "white",
    neela: "blue",
    neeli: "blue",
    lal: "red",
    laal: "red",
    surkh: "red",
    hara: "green",
    hari: "green",
    sabz: "green",
    peela: "yellow",
    peeli: "yellow",
    gulabi: "pink",
    bhura: "brown",
    bhuri: "brown",
    narangi: "orange",
    jamni: "purple",
    sunehri: "gold",
    chandi: "silver",
    thaila: "bag",
    jhola: "bag",
    basta: "backpack",
    baste: "backpack",
    sootcase: "suitcase",
    trolly: "trolley",
  };
  Object.assign(
    UR_S,
    set(
      "karo karein karen karna karun karunga milte julte der deri raseed paani barish saman",
    ),
  );
  Object.assign(DICT, {
    der: "late",
    deri: "late",
    raseed: "receipt",
    paani: "water",
    barish: "rain",
    saman: "pack",
    khatam: "sold out",
    thok: "wholesale",
    bharosa: "trust",
    asli: "genuine",
    nakli: "fake",
    khoya: "lost",
    gum: "lost",
    andhera: "dark",
  });
  var BASE =
    "shipping shipped delivery deliver delivered returns return refund refunds exchange warranty guarantee tracking track order orders price prices discount discounts offer offers sale deals coupon promo payment pay cash visa mastercard paypal checkout cart wishlist compare comparison contact email phone whatsapp support hours store shop location address dimensions dimension size sizes weight capacity material wheels wheel spinner suitcase suitcases luggage backpack backpacks duffel messenger briefcase crossbody garment cabin laptop leather canvas colour colours color colors shade shades available availability brands brand samsonite delsey travelpro tourister american electric arrivals arrival popular cheap cheapest expensive premium recommend women unisex review reviews rating ratings studio gallery lightweight waterproof expandable difference trolley hiking school office kids gift camera similar lock reset clean warranty recommend budget under below above between pieces products product wishlist".split(
      " ",
    );
  var COMMON = set(
    "what which where when have this that with your from about there their them they will would could should show tell give need want wants like make some more much many does done into over also just only than then very best good great nice please help hello thanks thank look find sell stock cost been were care wish take dont here come same free fast long mine ours know name names time date week year years today tomorrow both each ones other another most such even ever every after before again still going gone made makes making things thing something anything nothing everything someone anyone people person trip days month months huge tiny cute school office work gift kids child girl woman women men man boys girls okay sure yeah please",
  );
  var vocab = null,
    vkey = "",
    known = null;
  function getVocab() {
    var list = plist(),
      key = list.length + "|" + (HAS_WIN && window.BRONX_VARIANTS ? 1 : 0);
    if (vocab && vkey === key) return vocab;
    var o = {};
    BASE.forEach(function (w) {
      o[w] = 1;
    });
    Object.keys(DICT).forEach(function (k) {
      if (DICT[k].length >= 4) o[DICT[k]] = 1;
    });
    list.forEach(function (p) {
      (p.name + " " + p.brand + " " + p.category)
        .toLowerCase()
        .split(/[^a-z]+/)
        .forEach(function (w) {
          if (w.length >= 4) o[w] = 1;
        });
      cnames(p).forEach(function (n) {
        n.toLowerCase()
          .split(/[^a-z]+/)
          .forEach(function (w) {
            if (w.length >= 4) o[w] = 1;
          });
      });
    });
    vocab = Object.keys(o);
    vkey = key;
    known = {};
    vocab.forEach(function (w) {
      known[w] = 1;
    });
    [COMMON, UR_S, UR_W, EN_M, DICT].forEach(function (src) {
      Object.keys(src).forEach(function (w) {
        known[w] = 1;
      });
    });
    return vocab;
  }
  function clean(raw) {
    var s = String(raw)
      .toLowerCase()
      .replace(/[’‘`´]/g, "'")
      .replace(/(\d)\s*(?:"|”|''|inches|inch|in\b)/g, "$1 inch ")
      .replace(/(\d)\.\d+/g, "$1")
      .replace(/'/g, "");
    return s
      .replace(/[^a-z0-9$ ]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  function fix(toks) {
    var words = getVocab();
    return toks.map(function (w) {
      if (w.length < 4 || /\d/.test(w) || known[w]) return w;
      var lim = w.length <= 5 ? 1 : 2,
        best = null,
        bd = 9,
        i,
        c,
        d;
      for (i = 0; i < words.length; i++) {
        c = words[i];
        if (c.charAt(0) !== w.charAt(0) || Math.abs(c.length - w.length) > lim)
          continue;
        d = lev(w, c);
        if (d < bd) {
          bd = d;
          best = c;
        }
      }
      return best && bd <= lim ? best : w;
    });
  }
  function prep(raw) {
    var c = clean(raw),
      toks = c ? c.split(" ") : [];
    S.lang = detectLang(toks);
    toks = fix(toks);
    return {
      raw: String(raw),
      c,
      toks,
      n: toks
        .map(function (w) {
          return DICT[w] || w;
        })
        .join(" "),
    };
  }
  var BRANDS = [
    "bronx",
    "samsonite",
    "delsey",
    "travelpro",
    "american",
    "tourister",
  ];
  var GENERIC = set(
    "backpack backpacks bag bags luggage suitcase spinner hard shell carry cabin case set pack expandable softside rugged retro mini travel laptop the and kids",
  );
  var USEWORD = set("hiking everyday executive weekender heritage");
  function nameWords(p) {
    return p.name
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(function (w) {
        return (
          w.length >= 3 &&
          !/^\d+$/.test(w) &&
          BRANDS.indexOf(w) < 0 &&
          !GENERIC[w]
        );
      });
  }
  function findProducts(toks) {
    var best = [],
      top = 0;
    plist().forEach(function (p) {
      var s = 0;
      nameWords(p).forEach(function (w) {
        if (toks.indexOf(w) > -1) s++;
      });
      if (!s) return;
      if (toks.indexOf(p.brand.toLowerCase()) > -1) s += 0.5;
      if (s > top) {
        top = s;
        best = [p];
      } else if (s === top) best.push(p);
    });
    return { items: best, score: top };
  }
  var SYN = {
    gray: "Grey",
    maroon: "Red",
    violet: "Purple",
    lilac: "Purple",
    cream: "Beige",
    khaki: "Beige",
    turquoise: "Teal",
    aqua: "Teal",
    rust: "Orange",
    coral: "Pink",
    magenta: "Pink",
  };
  var MOD = set(
    "soft light deep dark glossy pure warm dusty dusky faded muted pastel",
  );
  function allShades() {
    var m = {};
    plist().forEach(function (p) {
      cnames(p).forEach(function (n) {
        m[n.toLowerCase()] = n;
      });
    });
    return m;
  }
  function inStr(n, k) {
    return (" " + n + " ").indexOf(" " + k + " ") > -1;
  }
  function famSpec(f) {
    return {
      label: f,
      fn: function (n) {
        return famOf(n) === f || n.toLowerCase() === f.toLowerCase();
      },
    };
  }
  function shadeSpec(label, key) {
    var ts = key.split(" ");
    return {
      label,
      fn: function (n) {
        var low = " " + n.toLowerCase() + " ";
        return ts.every(function (x) {
          return low.indexOf(" " + x + " ") > -1;
        });
      },
    };
  }
  function detectColour(n) {
    var shades = allShades(),
      keys = Object.keys(shades).sort(function (x, y) {
        return y.length - x.length;
      }),
      i,
      k,
      fam,
      toks = n.split(" ");
    for (i = 0; i < keys.length; i++) {
      k = keys[i];
      if (!inStr(n, k)) continue;
      fam = famOf(shades[k]);
      if (fam && (fam.toLowerCase() === k || k === "navy blue"))
        return famSpec(fam);
      return shadeSpec(shades[k], k);
    }
    for (i = 0; i < toks.length; i++)
      if (SYN[toks[i]]) return famSpec(SYN[toks[i]]);
    var st = {};
    keys.forEach(function (key) {
      key.split(" ").forEach(function (x) {
        if (x.length >= 4 && !MOD[x]) st[x] = 1;
      });
    });
    for (i = 0; i < toks.length; i++)
      if (st[toks[i]])
        return shadeSpec(
          toks[i].charAt(0).toUpperCase() + toks[i].slice(1),
          toks[i],
        );
    return null;
  }
  var USES = [
    [
      "gym",
      /\b(gym|sports?|workout|training|swim\w*)\b/,
      function (p) {
        return /duffel|sport|gym|weekender/i.test(p.name + p.description);
      },
    ],
    [
      "school",
      /\b(school|college|universit\w*|students?|campus)\b/,
      function (p) {
        return p.category === "Backpacks" && p.price <= 100;
      },
    ],
    [
      "office",
      /\b(office|business|meeting|professional|commut\w*|work)\b/,
      function (p) {
        return (
          /tote|leather|executive|laptop|brief/i.test(
            p.name + ((p.specs && p.specs.Laptop) || ""),
          ) && p.category !== "Luggage"
        );
      },
    ],
    [
      "hiking",
      /\b(hik\w*|trek\w*|camp\w*|outdoors?|trail|adventure)\b/,
      function (p) {
        return /hik|trail|rain cover|outdoor/i.test(p.name + p.description);
      },
    ],
    [
      "kids",
      /\b(kids?|child|children|toddler)\b/,
      function (p) {
        return /kids|dino/i.test(p.name);
      },
    ],
    [
      "long trip",
      /\b(long trip|abroad|international|check in|lots of (clothes|stuff))\b/,
      function (p) {
        return p.category === "Luggage" && p.sizeGroup === "Large";
      },
    ],
    [
      "cabin",
      /\b(carry on|carryon|hand luggage|under seat|short trip|weekend)\b/,
      function (p) {
        return p.category === "Luggage" && p.sizeGroup === "Small";
      },
    ],
    [
      "camera",
      /\b(camera|photograph\w*|lens)\b/,
      function (p) {
        return /camera/i.test(p.name + p.description);
      },
    ],
    [
      "suits",
      /\b(suits?|wedding|formal|garment|dress)\b/,
      function (p) {
        return /garment/i.test(p.name);
      },
    ],
    [
      "gifts",
      /\b(gift|present|birthday|anniversary)\b/,
      function (p) {
        return p.price <= 110 && p.rating >= 4.5;
      },
    ],
    [
      "laptops",
      /\b(laptop|macbook|tablet|ipad)\b/,
      function (p) {
        return !!(p.specs && (p.specs.Laptop || p.specs.Tablet));
      },
    ],
  ];
  function budget(n) {
    var m,
      o = {};
    if (
      (m = n.match(/between \$?(\d+) (?:and|to) \$?(\d+)/)) ||
      (m = n.match(/\$?(\d+) se \$?(\d+) tak/))
    ) {
      o.min = +m[1];
      o.max = +m[2];
      return o;
    }
    if (
      (m = n.match(
        /(?:under|below|less than|within|upto|up to|max|maximum|not more than) \$?(\d+)(?! inch)/,
      )) ||
      (m = n.match(/\$?(\d+)(?! inch) (?:se )?(?:kam|neeche|tak|andar)\b/))
    )
      o.max = +m[1];
    if (
      (m = n.match(
        /(?:above|over|more than|at least|minimum|min|starting from|starting) \$?(\d+)(?! inch)/,
      )) ||
      (m = n.match(/\$?(\d+)(?! inch) (?:se )?(?:zyada|ziada|upar)\b/))
    )
      o.min = +m[1];
    if (
      !o.max &&
      !o.min &&
      (m = n.match(/(?:around|about|approx|lagbhag) \$?(\d+)/))
    ) {
      o.min = Math.round(+m[1] * 0.8);
      o.max = Math.round(+m[1] * 1.2);
    }
    return o.max || o.min ? o : null;
  }
  function buildFilters(n, toks, allowInherit) {
    var f = {},
      m,
      i;
    if (/\b(backpack|backpacks|rucksack|daypack)\b/.test(n))
      f.category = "Backpacks";
    else if (
      /\b(suitcase|suitcases|luggage|trolley|spinner|carry on|carryon|cabin)\b/.test(
        n,
      )
    )
      f.category = "Luggage";
    else if (
      /\b(bags?|tote|duffel|messenger|sling|sleeve|garment|briefcase|crossbody)\b/.test(
        n,
      )
    )
      f.category = "Bags";
    if (/\bwomen\b/.test(n)) f.gender = "Women";
    else if (/\bmen\b/.test(n)) f.gender = "Men";
    if (/\bsamsonite\b/.test(n)) f.brand = "Samsonite";
    else if (/\bdelsey\b/.test(n)) f.brand = "Delsey";
    else if (/\btravelpro\b/.test(n)) f.brand = "Travelpro";
    else if (/\b(american|tourister)\b/.test(n)) f.brand = "American Tourister";
    else if (/\bbronx\b/.test(n)) f.brand = "Bronx";
    var col = detectColour(n);
    if (col) f.colour = col;
    var b = budget(n);
    if (b) {
      f.min = b.min;
      f.max = b.max;
    }
    if ((m = n.match(/(\d{2}) inch/))) f.inch = m[1];
    if (/\bsmall\b/.test(n) && f.category === "Luggage") f.sizeGroup = "Small";
    else if (/\blarge\b/.test(n)) f.sizeGroup = "Large";
    else if (/\bmedium\b/.test(n)) f.sizeGroup = "Medium";
    for (i = 0; i < USES.length; i++)
      if (USES[i][1].test(n)) {
        f.use = USES[i];
        break;
      }
    if (/cheapest|cheap|affordable|budget|lowest|low price/.test(n))
      f.sort = "cheap";
    else if (/expensive|premium|luxury|costly|high end|highest/.test(n))
      f.sort = "pricey";
    else if (
      /best seller|bestseller|top rated|popular|best|top|recommend|suggest/.test(
        n,
      )
    )
      f.sort = "rating";
    if (/\b(sale|discount|offer|deal|clearance|off)\b/.test(n)) f.sale = true;
    if (/\b(new|latest|arrival|arrivals|just in)\b/.test(n)) f.isnew = true;
    if (
      /\b(show|want|buy|recommend|suggest|looking|products|collection|options|catalog|catalogue|everything|all)\b/.test(
        n,
      )
    )
      f.generic = true;
    f.any = !!(
      f.category ||
      f.gender ||
      f.brand ||
      f.colour ||
      f.min ||
      f.max ||
      f.inch ||
      f.sizeGroup ||
      f.use ||
      f.sort ||
      f.sale ||
      f.isnew
    );
    if (
      f.any &&
      allowInherit &&
      !(f.category || f.brand || f.gender || f.use) &&
      S.filters &&
      toks.length <= 5
    ) {
      ["category", "gender", "brand", "use"].forEach(function (k) {
        if (S.filters[k]) f[k] = S.filters[k];
      });
    }
    return f;
  }
  function matches(p, f) {
    if (f.category && p.category !== f.category) return false;
    if (f.gender && p.gender !== f.gender) return false;
    if (f.brand && p.brand !== f.brand) return false;
    if (f.max && p.price > f.max) return false;
    if (f.min && p.price < f.min) return false;
    if (f.sizeGroup && p.sizeGroup !== f.sizeGroup) return false;
    if (f.inch && (p.name + " " + p.size).indexOf(f.inch) < 0) return false;
    if (f.use && !f.use[2](p)) return false;
    if (f.sale && !off(p)) return false;
    if (f.isnew && !/new/i.test(p.badge || "")) return false;
    if (f.colour && !cnames(p).some(f.colour.fn)) return false;
    return true;
  }
  function itemLine(p, colour) {
    return (
      "\u2022 " +
      plink(p, colour) +
      " \u2014 " +
      money2(p.price) +
      (off(p) ? " <small>(-" + off(p) + "%)</small>" : "") +
      " \u2B50" +
      p.rating
    );
  }
  function describe(f) {
    var d = [];
    if (f.sort === "cheap") d.push(t("most affordable", "sasti"));
    else if (f.sort === "pricey") d.push(t("premium", "premium"));
    else if (f.sort === "rating" || (!f.any && f.generic))
      d.push(t("top-rated", "top-rated"));
    if (f.isnew) d.push(t("new", "naye"));
    if (f.sale) d.push(t("on-sale", "sale wale"));
    if (f.gender) d.push(f.gender.toLowerCase());
    if (f.colour) d.push(f.colour.label.toLowerCase());
    if (f.brand) d.push(f.brand);
    if (f.sizeGroup) d.push(f.sizeGroup.toLowerCase());
    if (f.inch) d.push(f.inch + '"');
    if (f.use) d.push(t("for " + f.use[0], f.use[0] + " ke liye"));
    d.push(f.category ? f.category.toLowerCase() : t("products", "products"));
    if (f.max && f.min)
      d.push(
        t(
          "between $" + f.min + "\u2013$" + f.max,
          "$" + f.min + " se $" + f.max + " ke beech",
        ),
      );
    else if (f.max) d.push(t("under $" + f.max, "$" + f.max + " se kam"));
    else if (f.min) d.push(t("over $" + f.min, "$" + f.min + " se upar"));
    return d.join(" ");
  }
  function shopUrl(f) {
    var q = [];
    if (f.category) q.push("category=" + f.category);
    if (f.gender) q.push("gender=" + f.gender);
    if (f.brand) q.push("brand=" + encodeURIComponent(f.brand));
    if (!q.length && f.colour)
      q.push("q=" + encodeURIComponent(f.colour.label));
    return "shop.html" + (q.length ? "?" + q.join("&") : "");
  }
  function listReply(f) {
    var items = plist().filter(function (p) {
      return +p.id < 1000 && matches(p, f);
    });
    if (f.sort === "cheap")
      items.sort(function (x, y) {
        return x.price - y.price;
      });
    else if (f.sort === "pricey")
      items.sort(function (x, y) {
        return y.price - x.price;
      });
    else if (f.sale)
      items.sort(function (x, y) {
        return off(y) - off(x);
      });
    else items.sort(byRating);
    var desc = describe(f);
    if (!items.length) {
      return R(
        t(
          "Sorry, I could not find any " +
            desc +
            ' right now. Try a different colour, brand or budget, or ask me "what colours do you have". \u{1F3A8}',
          "Maaf kijiye, abhi " +
            desc +
            ' nahi mile. Koi aur rang, brand ya budget try karein, ya poochein "kon se rang hain". \u{1F3A8}',
        ),
        [
          t("Show all products", "Sab products dikhao"),
          t("What colours do you have?", "Kon se rang hain?"),
        ],
      );
    }
    var shown = items.slice(0, 6);
    S.list = shown;
    S.filters = f;
    S.product = null;
    var hit = function (p) {
      return f.colour ? cnames(p).filter(f.colour.fn)[0] : null;
    };
    var head = t(
      "Here " +
        (items.length > 1
          ? "are our " +
            (items.length > 6 ? "top 6 of " + items.length + " " : "")
          : "is our ") +
        desc +
        " \u{1F9F3}",
      "Ye rahe hamare " +
        desc +
        (items.length > 6 ? " (" + items.length + " mein se top 6)" : "") +
        " \u{1F9F3}",
    );
    return R(
      head +
        "<br>" +
        shown
          .map(function (p) {
            return itemLine(p, hit(p));
          })
          .join("<br>") +
        (items.length > shown.length
          ? "<br>" +
            a(
              shopUrl(f),
              f.max ||
                f.min ||
                f.colour ||
                f.use ||
                f.sale ||
                f.isnew ||
                f.inch ||
                f.sizeGroup
                ? t("Browse in shop \u2192", "Shop me dekhein \u2192")
                : t(
                    "See all " + items.length + " \u2192",
                    "Sab " + items.length + " dekhein \u2192",
                  ),
            )
          : ""),
      [
        t("Cheapest first", "Sasta pehle"),
        t("Best rated", "Best rated"),
        t("Under $100", "$100 se kam"),
        t("Compare", "Compare kaise karein"),
      ],
    );
  }
  var ATTR = {
    price: /price|cost|howmuch|worth|\$/,
    size: /size|dimension|big|large|small|height|width|length|inch|capacity|litre|liter|volume|\bfit/,
    weight: /weight|heavy|\bkg\b|kilo/,
    warranty: /warrant|guarantee/,
    colour: /colou?r|shade|available in|variant/,
    material: /material|made of|made from|fabric/,
    lock: /\block|\btsa\b|combination/,
    wheels: /wheel|\broll/,
    rating: /rating|rated|review|\bstars?\b/,
    stock: /in stock|stock|availability/,
  };
  function attrFlags(n) {
    var fl = {},
      any = false;
    Object.keys(ATTR).forEach(function (k) {
      fl[k] = ATTR[k].test(n);
      any = any || fl[k];
    });
    fl.any = any;
    return fl;
  }
  function productReply(p, fl) {
    var sp = p.specs || {},
      rows = [],
      all = !fl.any;
    function add(label, val) {
      if (val) rows.push("\u2022 " + label + ": " + val);
    }
    if (all || fl.price)
      add(
        t("Price", "Qeemat"),
        money2(p.price) +
          (off(p)
            ? t(
                " (was " + money2(p.oldPrice) + ", save " + off(p) + "%)",
                " (pehle " + money2(p.oldPrice) + ", " + off(p) + "% bachat)",
              )
            : ""),
      );
    if (all || fl.size) {
      add(t("Size", "Size"), p.size);
      add(t("Dimensions", "Dimensions"), sp.Dimensions);
      add(t("Capacity", "Capacity"), sp.Capacity);
    }
    if (all || fl.weight) add(t("Weight", "Wazan"), sp.Weight);
    if (all || fl.warranty) add("Warranty", sp.Warranty);
    if (all || fl.colour) {
      var cn = cnames(p);
      add(
        t("Colours (" + cn.length + ")", "Rang (" + cn.length + ")"),
        cn.join(", "),
      );
    }
    if (all || fl.material) add("Material", sp.Material);
    if (all || fl.lock) add("Lock", sp.Lock);
    if (all || fl.wheels) add("Wheels", sp.Wheels);
    if (all || fl.rating)
      add(
        "Rating",
        p.rating + " / 5 (" + p.reviews + t(" reviews)", " reviews)"),
      );
    if (fl.stock)
      add(
        "Stock",
        t(
          "In stock \u2014 ships within 24 hours",
          "Stock mein hai \u2014 24 ghante mein bhej diya jata hai",
        ),
      );
    if (all) add("Brand", p.brand);
    S.product = p;
    return R(
      "<b>" +
        esc(p.name) +
        "</b><br>" +
        rows.join("<br>") +
        "<br>" +
        a(
          "product.html?id=" + p.id,
          t("View product \u2192", "Product dekhein \u2192"),
        ),
      [
        t("Add to cart", "Cart mein daalo"),
        t("Similar products", "Milte julte products"),
        t("Colours?", "Kon se rang hain?"),
        t("Warranty?", "Warranty kitni hai?"),
      ],
    );
  }
  function lighter(x, y) {
    return parseFloat((x.specs || {}).Weight) <
      parseFloat((y.specs || {}).Weight)
      ? x
      : y;
  }
  function compareReply(x, y) {
    function line(p) {
      var sp = p.specs || {};
      return (
        "<b>" +
        esc(p.name) +
        "</b><br>\u2022 " +
        [
          money2(p.price),
          sp.Weight,
          sp.Capacity,
          sp.Warranty ? sp.Warranty + " warranty" : "",
          "\u2B50" + p.rating,
        ]
          .filter(Boolean)
          .join(" \xB7 ")
      );
    }
    var cheap = x.price <= y.price ? x : y,
      better = x.rating >= y.rating ? x : y,
      light = lighter(x, y);
    S.product = null;
    return R(
      line(x) +
        "<br><br>" +
        line(y) +
        "<br><br>" +
        t(
          "Quick verdict: " +
            cheap.name +
            " is cheaper" +
            (isNaN(parseFloat((x.specs || {}).Weight))
              ? ""
              : ", " + light.name + " is lighter") +
            ", and " +
            better.name +
            " is rated higher. \u2696\uFE0F",
          "Mukhtasar: " +
            cheap.name +
            " sasta hai" +
            (isNaN(parseFloat((x.specs || {}).Weight))
              ? ""
              : ", " + light.name + " halka hai") +
            ", aur " +
            better.name +
            " ki rating zyada hai. \u2696\uFE0F",
        ),
      [t("Add to cart", "Cart mein daalo")],
    );
  }
  function comparePair(n) {
    if (
      !/\b(vs|versus|compare|comparison|difference|better|or|and|aur|ya)\b/.test(
        n,
      )
    )
      return null;
    var parts = n.split(
        /\b(?:vs|versus|compare|comparison|difference between|difference|and|or|aur|ya|with|than|between|better)\b/,
      ),
      picks = [],
      seen = {};
    parts.forEach(function (s) {
      var r = findProducts(s.trim().split(" "));
      if (r.items.length && r.score >= 1 && !seen[r.items[0].id]) {
        seen[r.items[0].id] = 1;
        picks.push(r.items[0]);
      }
    });
    return picks.length >= 2 ? picks : null;
  }
  var BRAND_UR = {
    Bronx:
      "Hamari apni line \u2014 acha material, sahi qeemat, New York mein design.",
    Samsonite: "Dunya ki sabse bari luggage company, 1910 se mashhoor.",
    "American Tourister":
      "Halka, rangeen aur fun \u2014 safar apne andaaz mein.",
    Delsey: "French design, 1946 se \u2014 halka, khoobsurat aur mazboot.",
    Travelpro: "Flight crew ki pasand \u2014 roz ke safar ke liye bana.",
  };
  var BRAND_EN = {
    Bronx:
      "Our own line \u2014 premium materials, honest prices, designed in New York.",
    Samsonite: "The world\u2019s largest luggage maker, trusted since 1910.",
    "American Tourister":
      "Fun, lightweight and colourful \u2014 travel with personality.",
    Delsey: "French design since 1946. Light, elegant, built to last.",
    Travelpro: "The choice of flight crews \u2014 built for life on the road.",
  };
  var PAGES = [
    [/\bshop|all products|catalog|catalogue/, "shop.html", "Shop"],
    [/\bbrands?\b/, "brands.html", "Brands"],
    [/gallery|photos|pictures/, "gallery.html", "Gallery"],
    [/studio|3d|360/, "studio.html", "3D Studio"],
    [/about|story|company/, "about.html", "About Us"],
    [/review|feedback/, "reviews.html", "Reviews"],
    [/contact/, "contact.html", "Contact"],
    [/track/, "track.html", "Track Order"],
    [/cart|checkout/, "cart.html", "Cart"],
    [/new|latest|ride/, "whats-new.html", "What's New"],
    [/sitemap/, "sitemap.html", "Sitemap"],
    [/home/, "index.html", "Home"],
  ];
  function topPicks(k, items) {
    return (items || plist().slice())
      .sort(byRating)
      .slice(0, k)
      .map(function (p) {
        return itemLine(p);
      })
      .join("<br>");
  }
  var CH_HOME = function () {
    return [
      t("Shipping info", "Delivery kitne din?"),
      t("Returns", "Return policy"),
      t("Track order", "Order track karo"),
      t("Best sellers", "Best sellers"),
    ];
  };
  var FAQ = {
    shipping: function () {
      return R(
        t(
          "FREE shipping on orders over $99 (otherwise $9.99). Orders ship within 24 hours (Mon\u2013Sat) and arrive in 2\u20135 business days. \u{1F69A} You can pay by Cash on Delivery or by card.",
          "$99 se upar ke orders par shipping FREE hai (warna $9.99). Order 24 ghante mein (Mon\u2013Sat) bhej diya jata hai aur 2\u20135 working days mein pohanch jata hai. \u{1F69A} Payment Cash on Delivery ya card se kar sakte hain.",
        ),
        [
          t("Track order", "Order track karo"),
          t("Payment methods", "Payment kaise karein?"),
        ],
      );
    },
    returns: function () {
      return R(
        t(
          "30-day easy returns, no questions asked. \u21A9\uFE0F Refunds go to your original payment method within 3\u20135 business days after we receive the item. To start a return, email " +
            CONTACT.email +
            " with your order number.",
          "30 din ke andar easy return, koi sawal nahi. \u21A9\uFE0F Item milne ke 3\u20135 working days mein refund aap ke original payment method par chala jata hai. Return shuru karne ke liye " +
            CONTACT.email +
            " par order number ke saath email karein.",
        ),
        [
          t("Warranty", "Warranty kitni hai?"),
          t("Contact support", "Rabta kaise karein?"),
        ],
      );
    },
    warranty: function () {
      return R(
        t(
          "Every product has a 2\u201310 year warranty against manufacturing defects (exact length is on each product page). If something arrives damaged, email " +
            CONTACT.email +
            " and we will fix it. \u{1F6E0}\uFE0F",
          "Har product par 2\u201310 saal ki warranty hai (kitni, ye har product page par likha hai). Agar kuch kharab ya toota hua aaye to " +
            CONTACT.email +
            " par email karein, hum theek kar denge. \u{1F6E0}\uFE0F",
        ),
        [t("Return policy", "Return policy")],
      );
    },
    payment: function () {
      return R(
        t(
          "We accept Cash on Delivery (COD) and Debit/Credit cards (VISA, Mastercard, AMEX). Pick your method at checkout. \u{1F4B3}",
          "Hum Cash on Delivery (COD) aur Debit/Credit card (VISA, Mastercard, AMEX) qabool karte hain. Checkout par apna tareeqa chun lein. \u{1F4B3}",
        ),
        [t("Shipping info", "Delivery kitne din?")],
      );
    },
    contact: function () {
      return R(
        t(
          "You can reach us any time \u{1F4DE}<br>\u2022 Email: " +
            CONTACT.email +
            "<br>\u2022 Phone: " +
            CONTACT.phone +
            " (Mon\u2013Sat, 9 AM\u20136 PM)<br>\u2022 " +
            a("contact.html", "Contact page") +
            "<br>We usually reply within a few hours.",
          "Aap kisi bhi waqt rabta kar sakte hain \u{1F4DE}<br>\u2022 Email: " +
            CONTACT.email +
            "<br>\u2022 Phone: " +
            CONTACT.phone +
            " (Mon\u2013Sat, 9 AM\u20136 PM)<br>\u2022 " +
            a("contact.html", "Contact page") +
            "<br>Hum aam tor par chand ghanton mein jawab dete hain.",
        ),
      );
    },
    hours: function () {
      return R(
        t(
          "Our store is open Mon\u2013Sat 9:00 AM\u20138:00 PM and Sunday 11:00 AM\u20136:00 PM. Online, we are always open! \u{1F6CD}\uFE0F",
          "Hamara store Mon\u2013Sat subah 9 se raat 8 baje tak aur Sunday 11 se 6 baje tak khula hai. Online hum hamesha khule hain! \u{1F6CD}\uFE0F",
        ),
      );
    },
    location: function () {
      return R(
        t(
          "We are an online-first store delivering to your door. For store details, email " +
            CONTACT.email +
            " or see the " +
            a("contact.html", "Contact page") +
            ". \u{1F4CD}",
          "Hum online-first store hain aur aap ke darwaze tak delivery karte hain. Store ki tafseel ke liye " +
            CONTACT.email +
            " par email karein ya " +
            a("contact.html", "Contact page") +
            " dekhein. \u{1F4CD}",
        ),
      );
    },
    cancel: function () {
      return R(
        t(
          "To cancel an order or change the delivery address, email " +
            CONTACT.email +
            " with your order number as soon as possible \u2014 before it ships we can usually update it. \u{1F4E7}",
          "Order cancel karne ya address badalne ke liye jaldi se " +
            CONTACT.email +
            " par order number ke saath email karein \u2014 shipping se pehle hum aam tor par badal dete hain. \u{1F4E7}",
        ),
      );
    },
    lock: function () {
      return R(
        t(
          "To reset a combination lock: set the dials to your current code (usually 000), press the small reset button near the lock, enter your new 3-digit code, then release. Steps differ slightly by model \u2014 check the label near the lock. \u{1F510}",
          "Combination lock reset karne ke liye: dials ko apne maujooda code par rakhein (aam tor par 000), lock ke paas chhota reset button dabayein, naya 3 digit code lagayein, phir button chhor dein. Model ke hisaab se thora farq ho sakta hai. \u{1F510}",
        ),
      );
    },
    care: function () {
      return R(
        t(
          "Care tips \u{1F9FD} Hard-shell: wipe with a damp cloth and mild soap. Fabric: spot-clean, do not machine-wash. Leather: wipe gently and use a leather conditioner now and then. Avoid harsh chemicals and direct heat.",
          "Dekh-bhal ke tips \u{1F9FD} Hard-shell: geele kapre aur halke sabun se saaf karein. Kapre wala: sirf daagh saaf karein, machine mein na dhoyein. Leather: narmi se poochein aur kabhi kabhi leather conditioner lagayein. Tez chemical aur seedhi dhoop se bachayein.",
        ),
      );
    },
    hardsoft: function () {
      return R(
        t(
          "Hard-shell cases protect better, resist scratches and keep their shape. Soft-side cases flex, have outer pockets and are often expandable, so they squeeze into tight spaces. \u{1F9F3}",
          "Hard-shell cases behtar hifazat dete hain, kharoch se bachate hain aur shape banaye rakhte hain. Soft-side cases lachakdar hote hain, bahar pockets hoti hain aur aksar expandable hote hain, is liye tang jagah mein bhi aa jate hain. \u{1F9F3}",
        ),
      );
    },
    airline: function () {
      var items = plist()
        .filter(function (p) {
          return p.category === "Luggage" && p.sizeGroup === "Small";
        })
        .slice(0, 4);
      return R(
        t(
          "Most airlines allow roughly 22 x 14 x 9 in (56 x 36 x 23 cm) in the cabin, but limits differ, so check your airline. \u{1F6EB}",
          "Aksar airlines cabin mein taqreeban 22 x 14 x 9 inch (56 x 36 x 23 cm) ki ijazat deti hain, lekin airline ke hisaab se farq hota hai, is liye apni airline se confirm karein. \u{1F6EB}",
        ) +
          (items.length
            ? "<br>" +
              t("Our cabin-size cases:", "Hamare cabin size cases:") +
              "<br>" +
              items
                .map(function (p) {
                  return itemLine(p);
                })
                .join("<br>")
            : ""),
      );
    },
    trip: function (n) {
      var m = n.match(/(\d+) ?(day|days|week|weeks|month|months)/),
        days = null;
      if (m) {
        days = +m[1];
        if (/week/.test(m[2])) days *= 7;
        else if (/month/.test(m[2])) days *= 30;
      } else if (/weekend/.test(n)) days = 2;
      var grp =
        days === null
          ? null
          : days <= 4
            ? "Small"
            : days <= 10
              ? "Medium"
              : "Large";
      var guide = t(
        'Rough guide \u{1F4CF} Small / cabin (20\u201322") for 2\u20134 days, Medium (24\u201326") for 5\u201310 days, Large (27\u201330") for 10+ days or families. Exact dimensions, weight and capacity are on every product page.',
        'Andaza \u{1F4CF} Small / cabin (20\u201322") 2\u20134 din ke liye, Medium (24\u201326") 5\u201310 din ke liye, Large (27\u201330") 10 din se zyada ya family ke liye. Exact dimensions, wazan aur capacity har product page par likhi hai.',
      );
      if (!grp)
        return R(guide, [
          t("3 day trip", "3 din ka safar"),
          t("2 week trip", "2 hafte ka safar"),
        ]);
      var items = plist()
        .filter(function (p) {
          return p.category === "Luggage" && p.sizeGroup === grp;
        })
        .sort(byRating)
        .slice(0, 4);
      return R(
        guide +
          "<br><br>" +
          t(
            "For about " +
              days +
              " days I suggest a " +
              grp.toLowerCase() +
              " suitcase:",
            "Taqreeban " +
              days +
              " din ke liye main " +
              grp.toLowerCase() +
              " suitcase suggest karunga:",
          ) +
          "<br>" +
          items
            .map(function (p) {
              return itemLine(p);
            })
            .join("<br>"),
      );
    },
    wishlist: function () {
      return R(
        t(
          "Tap the \u2665 on any product to save it, and open your wishlist from the heart icon at the top. You can even change quantity and add items to the cart from there. \u{1F49B}",
          "Kisi bhi product par \u2665 dabayein to wo save ho jata hai, aur upar heart icon se wishlist khol sakte hain. Wahan se quantity badal kar cart mein bhi daal sakte hain. \u{1F49B}",
        ),
      );
    },
    compare: function () {
      return R(
        t(
          'Tap \u21C4 Compare on up to 3 product cards, then press "Compare now" at the bottom. Or just tell me two product names, like "Atlas vs Winfield", and I will compare them here. \u2696\uFE0F',
          'Zyada se zyada 3 product cards par \u21C4 Compare dabayein, phir neeche "Compare now" dabayein. Ya mujhe do product ke naam batayein, jaise "Atlas vs Winfield", main yahin compare kar dunga. \u2696\uFE0F',
        ),
      );
    },
    studio: function () {
      return R(
        t(
          "Try our " +
            a("studio.html", "3D Studio") +
            " \u2014 drag to rotate any suitcase, zoom in and view it from every angle. \u{1F300}",
          "Hamara " +
            a("studio.html", "3D Studio") +
            " try karein \u2014 kisi bhi suitcase ko ghuma kar, zoom karke har taraf se dekh sakte hain. \u{1F300}",
        ),
      );
    },
    reviews: function () {
      return R(
        t(
          "Our customers rate us 4.7/5 \u2B50 Read and share reviews on the " +
            a("reviews.html", "Reviews page") +
            ".",
          "Hamare customers ne humein 4.7/5 \u2B50 di hai. " +
            a("reviews.html", "Reviews page") +
            " par reviews parhein aur apna review bhi likhein.",
        ),
      );
    },
    gallery: function () {
      return R(
        t(
          "See the collection in our " +
            a("gallery.html", "Gallery") +
            " \u2014 tap any photo to enlarge it. \u{1F5BC}\uFE0F",
          "Poora collection hamari " +
            a("gallery.html", "Gallery") +
            " mein dekhein \u2014 kisi bhi photo par dabayein to bari ho jati hai. \u{1F5BC}\uFE0F",
        ),
      );
    },
    about: function () {
      return R(
        t(
          "Bronx Luggage started as a small shop in the Bronx and is now a curated destination for luggage, bags and backpacks \u2014 every piece tested on real trips. Read our " +
            a("about.html", "story") +
            ". \u{1F9F3}",
          "Bronx Luggage Bronx mein ek chhoti dukaan se shuru hui aur ab luggage, bags aur backpacks ki chuni hui jagah hai \u2014 har piece asli safar mein test hota hai. Hamari " +
            a("about.html", "kahani") +
            " parhein. \u{1F9F3}",
        ),
      );
    },
    sitemap: function () {
      return R(
        t(
          "Here is the full " + a("sitemap.html", "sitemap") + ".",
          "Ye poora " + a("sitemap.html", "sitemap") + " hai.",
        ),
      );
    },
    discount: function (n) {
      var f = buildFilters(n, n.split(" "), false);
      f.sale = true;
      f.sort = null;
      var items = plist()
        .filter(function (p) {
          return matches(p, f);
        })
        .sort(function (x, y) {
          return off(y) - off(x);
        })
        .slice(0, 4);
      return R(
        t(
          "Many items are on sale right now \u2014 look for the crossed-out price. Join our newsletter (footer) for 10% off your first order! \u{1F389}",
          "Bohat se items abhi sale par hain \u2014 kati hui purani qeemat dekhein. Newsletter (footer mein) join karein aur pehle order par 10% off payein! \u{1F389}",
        ) +
          (items.length
            ? "<br>" +
              t("Biggest savings:", "Sabse zyada bachat:") +
              "<br>" +
              items
                .map(function (p) {
                  return itemLine(p);
                })
                .join("<br>")
            : ""),
      );
    },
    whatsnew: function () {
      return R(
        t(
          "Yes! We have a brand new electric ride-on suitcase \u{1F9F3}\u26A1 \u2014 sit down, steer with the handle and glide to your gate. $349.99 (was $449.99, 22% off), cabin size, TSA lock, USB charging, 7 colours, 2 year warranty. " +
            a("whats-new.html", "Learn more \u2192"),
          "Ji haan! Hamare paas bilkul naya electric ride-on suitcase hai \u{1F9F3}\u26A1 \u2014 us par baith kar handle se steer karein aur gate tak phisal jayein. $349.99 (pehle $449.99, 22% off), cabin size, TSA lock, USB charging, 7 rang, 2 saal warranty. " +
            a("whats-new.html", "Mazeed jaanein \u2192"),
        ),
      );
    },
    track: function () {
      S.awaitOrder = true;
      return R(
        t(
          "Sure! \u{1F4E6} Please type your order number (for example BX-12345678).",
          "Zaroor! \u{1F4E6} Apna order number likhein (jaise BX-12345678).",
        ),
      );
    },
    cart: function () {
      return R(
        t(
          'Tap "Add to Cart" on any product, open the cart icon at the top, then check out with your name, email, address and phone. I can also add a product for you \u2014 just say "add Atlas to cart". \u{1F6D2}',
          'Kisi bhi product par "Add to Cart" dabayein, upar cart icon kholein, phir naam, email, address aur phone ke saath checkout karein. Main bhi product add kar sakta hoon \u2014 bas likhein "Atlas cart mein daalo". \u{1F6D2}',
        ),
      );
    },
  };
  var RX = {
    thanks: /\b(thanks|thank|thx|ty|appreciate)\b/,
    bye: /\b(bye|goodbye|see you|take care|khuda hafiz|allah hafiz)\b/,
    howru:
      /how (are|r) (you|u)|how is it going|how ho\b|\bhaal\b|how do you do|whats up|how you doing/,
    greet:
      /^(hi+|hello|hey|hola|salam|salaam|assalam\w*|aoa|yo|good (morning|afternoon|evening))\b/,
    who: /who are you|your name|are you (a )?(bot|human|real|ai|robot)|what are you|(aap|ap|tum) which|what (can|do) you (do|help|know|sell|offer)|what can i ask|help me|can you help|need help|how can you help|^help$/,
    outscope:
      /weather|temperature|president|prime minister|capital of|football|cricket|movie|song|recipe|bitcoin|crypto|poem|homework|translate|programming|election|politic|religion|who won/,
    track:
      /track|where.*(order|parcel|package|shipment)|order status|status of|my parcel|parcel/,
    orders: /(my|previous|past|recent|all) orders|order history/,
    cartView:
      /(my|what|show|view|check|in).*(cart|basket)|cart (total|items|contents)/,
    addCart: /(add|put|buy).*(cart|basket)|(cart|basket).*(add|put)/,
    addWish: /(add|save|put).*(wishlist|favou?rite)|wishlist.*(add|save)/,
    similar:
      /similar|alternativ|like this|milte julte|other options|something else/,
    brandsAll:
      /(which|what|all|your|list|show).*brands?|brands? (do|you)|brand list/,
    coloursAll:
      /(which|what|all|any|list|show|available|different).*(colou?r|shade)|colou?rs?.*(do you|have|available|options|offer)|how many colou?r/,
    yes: /^(yes|yeah|yep|sure|ok|okay|haan|han|ji|jee|theek hai|ok ok)$/,
    no: /^(no|nope|nahi|nhi|nah)$/,
    day: /how.*your day|my day (was|is).*(good|great|fine|nice)|my day (was|is).*(bad|tired|boring|rough)/,
    count:
      /(how many|howmuch|total|number of|count).*(products?|items?|models?|bags?|suitcases?)|(products?|items?).*(howmuch|how many|total|count)/,
  };
  var FAQ_ORDER = [
    [
      "track",
      /track|where.*(order|parcel|package|shipment)|order status|status of|my parcel|parcel/,
    ],
    [
      "cancel",
      /cancel|change.*(address|order|phone)|wrong (address|item|order)/,
    ],
    [
      "shipping",
      /ship|deliver|dispatch|arrive|courier|postage|how long.*(take|get)/,
    ],
    ["returns", /return|refund|exchange|money back|send back|replace/],
    [
      "payment",
      /\bpay\b|payment|\bcod\b|cash on|\bcard\b|visa|master ?card|amex|paypal|easypaisa|jazzcash|installment|credit|debit/,
    ],
    [
      "contact",
      /contact|reach (you|us)|support|helpline|phone|call (you|us|me)|number|email|whatsapp|talk to|human|agent|complain|customer (care|service)/,
    ],
    [
      "warranty",
      /warrant|guarantee|defect|manufactur|repair|broken|damage|torn/,
    ],
    [
      "discount",
      /discount|coupon|promo|voucher|newsletter|student|\bsale\b|\bdeal|clearance|10 ?%/,
    ],
    [
      "hours",
      /\bhours?\b|\bopen\b|\bclose\b|closing|opening|timings?|working days|sunday|saturday|what time/,
    ],
    [
      "location",
      /where.*(store|shop|located|you are)|your (store|shop|address|location)|branch|showroom|visit/,
    ],
    [
      "lock",
      /(tsa|combination|lock).*(reset|forgot|forget|change|set)|(reset|forgot|forget).*(lock|code)/,
    ],
    [
      "hardsoft",
      /hard.?shell.*soft|soft.?(shell|side).*hard|difference.*(hard|soft)|hard or soft/,
    ],
    [
      "airline",
      /(airline|flight|plane|airport).*(size|allow|limit|rule|carry|cabin|baggage)|(cabin|carry on|hand) (size|rule|limit|baggage|luggage allowance)|overhead|baggage (allowance|limit)/,
    ],
    ["care", /\b(clean|wash|care|maintain|stain|dirt|smell)\b/],
    [
      "whatsnew",
      /whats new|ride ?on|electric|motori|smart (suitcase|luggage)|sit on/,
    ],
    [
      "trip",
      /(\d+|one|two|three|four|five|six|seven|ten) ?(day|days|week|weeks|month|months)\b|\bweekend\b|which size|what size|size guide|size chart|how big/,
    ],
    ["wishlist", /wishlist|favou?rite|save for later/],
    ["compare", /compare|comparison/],
    ["studio", /\b3d\b|studio|360|rotate/],
    ["reviews", /review|feedback|testimonial|customers say/],
    ["gallery", /gallery|photos|pictures/],
    [
      "about",
      /about (you|us|bronx|company)|who (made|owns|founded)|company|your story|history/,
    ],
    ["sitemap", /sitemap/],
    [
      "cart",
      /cart|basket|checkout|how.*(order|buy|purchase)|place (an )?order/,
    ],
  ];
  function faqKey(n) {
    for (var i = 0; i < FAQ_ORDER.length; i++)
      if (FAQ_ORDER[i][1].test(n)) return FAQ_ORDER[i][0];
    return "";
  }
  var go = function (h, l) {
    return a(h, l);
  };
  Object.assign(FAQ, {
    delay: function () {
      return R(
        t(
          "Sorry for the wait! \u{1F614} Orders usually arrive in 2\u20135 business days. Check the live status on the " +
            go("track.html", "Track Order") +
            " page. If it is later than that, email " +
            CONTACT.email +
            " with your order number and we will chase the courier right away.",
          "Intezar ke liye maazrat! \u{1F614} Orders aam tor par 2\u20135 working days mein pohanch jate hain. " +
            go("track.html", "Track Order") +
            " page par live status dekhein. Is se zyada der ho to order number ke saath " +
            CONTACT.email +
            " par email karein, hum fauran courier se pooch lenge.",
        ),
        [
          t("Track order", "Order track karo"),
          t("Contact support", "Rabta kaise karein?"),
        ],
      );
    },
    receipt: function () {
      return R(
        t(
          "After you place an order, a receipt pops up \u2014 tap Download to save it as a PDF. Your order is also saved on the " +
            go("track.html", "Track Order") +
            " page. \u{1F9FE}",
          "Order karne ke baad receipt khul jati hai \u2014 Download dabayein to PDF save ho jati hai. Aap ka order " +
            go("track.html", "Track Order") +
            " page par bhi save rehta hai. \u{1F9FE}",
        ),
      );
    },
    account: function () {
      return R(
        t(
          "You can sign in or create an account from the Login option, or shop without one. Your details stay in your own browser. \u{1F510}",
          "Login option se sign in ya account bana sakte hain, ya bina account ke bhi khareed sakte hain. Aap ki details sirf aap ke apne browser mein rehti hain. \u{1F510}",
        ),
      );
    },
    tsa: function () {
      return R(
        t(
          "A TSA lock lets airport security open your bag with a master key, so they do not have to cut the lock. Most of our suitcases come with a TSA-approved combination lock. \u{1F512}",
          "TSA lock se airport security master key se bag khol sakti hai, lock todna nahi parta. Hamare zyada tar suitcases mein TSA-approved combination lock hota hai. \u{1F512}",
        ),
      );
    },
    wheels: function () {
      return R(
        t(
          "Spinner wheels (4 x 360\xB0) glide beside or in front of you and turn easily in tight spaces. Inline (2-wheel) cases roll behind you and handle rough ground better. \u{1F6DE}",
          "Spinner wheels (4 x 360\xB0) aap ke saath ya aage phisalte hain aur tang jagah mein asaani se mud jate hain. Inline (2 wheel) cases peeche chalte hain aur uneven zameen par behtar hain. \u{1F6DE}",
        ),
      );
    },
    pack: function () {
      return R(
        t(
          "Packing tips \u{1F9F3} Roll soft clothes, put heavy items near the wheels, use shoes for small items, keep liquids in a sealed bag and leave 10% space for souvenirs.",
          "Packing ke tips \u{1F9F3} Naram kapre lapet kar rakhein, bhari cheezein wheels ke paas, joton mein chhoti cheezein, liquids sealed bag mein, aur yaadgaar saman ke liye 10% jagah khali rakhein.",
        ),
      );
    },
    weightlimit: function () {
      return R(
        t(
          "Most airlines allow about 20\u201323 kg for checked bags and 7\u201310 kg for cabin bags, but it differs by airline, so please confirm with yours. Every product page lists the empty weight of the case. \u2696\uFE0F",
          "Aksar airlines checked bag ke liye 20\u201323 kg aur cabin bag ke liye 7\u201310 kg ki ijazat deti hain, lekin airline ke hisaab se farq hota hai, is liye apni airline se confirm karein. Har product page par case ka khali wazan likha hai. \u2696\uFE0F",
        ),
      );
    },
    lostbag: function () {
      return R(
        t(
          "If an airline loses or damages your bag, report it at the airline desk before leaving the airport and keep your tags and photos. Our warranty covers manufacturing defects, and you can email " +
            CONTACT.email +
            " for help. \u{1F9F3}",
          "Agar airline bag kho de ya kharab kar de to airport se nikalne se pehle airline desk par report karein aur tags aur photos sambhal kar rakhein. Hamari warranty manufacturing defects par hai, madad ke liye " +
            CONTACT.email +
            " par email karein. \u{1F9F3}",
        ),
      );
    },
    expandable: function () {
      return R(
        t(
          "An expandable suitcase has a zip that adds extra packing space (usually about 2 inches). Remember airlines measure it expanded, so zip it back for cabin use. \u{1F4CF}",
          "Expandable suitcase mein ek zip hoti hai jo extra jagah deti hai (aam tor par 2 inch). Yaad rakhein airline expanded size naapti hai, is liye cabin mein le jate waqt zip band kar dein. \u{1F4CF}",
        ),
      );
    },
    waterproof: function () {
      return R(
        t(
          "Our bags are water-resistant, but not fully waterproof. The Trail 25L and Hiking Pack 40L come with a rain cover. For heavy rain, keep valuables in a sealed bag. \u{1F327}\uFE0F",
          "Hamare bags water-resistant hain, mukammal waterproof nahi. Trail 25L aur Hiking Pack 40L ke saath rain cover aata hai. Tez barish mein qeemti cheezein sealed bag mein rakhein. \u{1F327}\uFE0F",
        ),
      );
    },
    restock: function () {
      return R(
        t(
          "Listed items ship within 24 hours. If something is ever unavailable, email " +
            CONTACT.email +
            " and we will tell you when it is back. \u{1F4E6}",
          "Listed items 24 ghante mein bhej diye jate hain. Agar kabhi kuch available na ho to " +
            CONTACT.email +
            " par email karein, hum bata denge ke wapas kab aayega. \u{1F4E6}",
        ),
      );
    },
    giftwrap: function () {
      return R(
        t(
          "Gift wrapping is not available at checkout right now, but with our 30-day easy returns gifting is risk-free. Email " +
            CONTACT.email +
            " if you need a gift note. \u{1F381}",
          "Abhi checkout par gift wrapping nahi hai, lekin 30 din ki easy return ke saath tohfa dena bilkul mehfooz hai. Gift note chahiye to " +
            CONTACT.email +
            " par email karein. \u{1F381}",
        ),
        [t("Gift ideas", "Tohfe ke liye products dikhao")],
      );
    },
    bulk: function () {
      return R(
        t(
          "For bulk, corporate or reseller orders, please email " +
            CONTACT.email +
            " with what you need and we will send a quote. \u{1F3E2}",
          "Bulk, corporate ya reseller orders ke liye " +
            CONTACT.email +
            " par apni zaroorat likh kar email karein, hum quote bhej denge. \u{1F3E2}",
        ),
      );
    },
    trust: function () {
      return R(
        t(
          "Every product is 100% genuine, comes with a 2\u201310 year warranty and 30-day easy returns, and our customers rate us 4.7/5. \u2705 You can read real " +
            go("reviews.html", "reviews") +
            " too.",
          "Har product 100% asli hai, 2\u201310 saal ki warranty aur 30 din ki easy return ke saath, aur hamare customers ne humein 4.7/5 di hai. \u2705 Asli " +
            go("reviews.html", "reviews") +
            " bhi parh sakte hain.",
        ),
      );
    },
    privacy: function () {
      return R(
        t(
          "We only use your details to process your order and support you. You can accept or reject cookies on the home page. For any privacy question, email " +
            CONTACT.email +
            ". \u{1F512}",
          "Hum aap ki details sirf order aur support ke liye istemal karte hain. Cookies home page par accept ya reject kar sakte hain. Privacy ke kisi sawal ke liye " +
            CONTACT.email +
            " par email karein. \u{1F512}",
        ),
      );
    },
    theme: function () {
      return R(
        t(
          "Tap the moon/sun icon on the site to switch dark mode on or off. \u{1F319}",
          "Site par moon/sun icon dabayein, dark mode on ya off ho jayega. \u{1F319}",
        ),
      );
    },
    tour: function () {
      return R(
        t(
          "Tap the guide button on the page to take a quick tour of the store. \u{1F9ED} You can also ask me anything here!",
          "Store ka tour lene ke liye page par guide button dabayein. \u{1F9ED} Yahan mujh se bhi kuch bhi pooch sakte hain!",
        ),
      );
    },
  });
  FAQ_ORDER.unshift(
    [
      "delay",
      /\blate\b|delay|not (arrived|received|come)|still (waiting|not)|hasnt arrived|havent received/,
    ],
    ["receipt", /receipt|invoice|\bbill\b|proof of purchase/],
    ["account", /login|log in|sign ?in|sign ?up|account|password|register/],
    [
      "weightlimit",
      /weight (limit|allowance)|how (many|much) kg|23 ?kg|overweight|baggage weight/,
    ],
    [
      "lostbag",
      /lost (luggage|bag|baggage)|airline (damage|lost)|(bag|luggage) (lost|damaged) (by|at|in)/,
    ],
    ["tsa", /\btsa\b|what is.*lock/],
    [
      "wheels",
      /difference.*(spinner|wheel)|(spinner|inline).*(vs|or|difference|mean)|what.*spinner/,
    ],
    ["pack", /how.*pack|packing|pack (my|a) (bag|suitcase)/],
    ["expandable", /expandable|expand/],
    ["waterproof", /waterproof|water.?resistant|\brain\b|\bwet\b/],
    ["restock", /out of stock|restock|sold out|back in stock/],
    ["giftwrap", /gift ?wrap|wrapping|gift (box|card|message)/],
    ["bulk", /bulk|wholesale|corporate|reseller|large order/],
    ["trust", /genuine|authentic|\bfake\b|legit|trust|original product/],
    ["privacy", /privacy|cookies?|personal (data|information)/],
    ["theme", /dark mode|theme|night mode/],
    ["tour", /\btour\b|guide me|how (do i|to) (use|navigate)|navigate/],
  );
  function orderId(raw, c) {
    var m = String(raw).match(/bx\s*-?\s*(\d{4,})/i);
    if (m) return "BX-" + m[1];
    return /^\d{5,}$/.test(c) ? "BX-" + c : "";
  }
  function trackOrder(id) {
    var list = ls("bronx-orders", []),
      o = Array.isArray(list)
        ? list.filter(function (x) {
            return x.no === id;
          })[0]
        : null;
    if (o) {
      S.awaitOrder = false;
      var r = R(
        t(
          "Found it! \u2705 Order " +
            id +
            " is in our system. Taking you to the tracking page\u2026",
          "Mil gaya! \u2705 Order " +
            id +
            " hamare system mein hai. Aap ko tracking page par le ja raha hoon\u2026",
        ),
      );
      r.after = function () {
        setTimeout(function () {
          location.href = "track.html?order=" + encodeURIComponent(id);
        }, 1600);
      };
      return r;
    }
    S.awaitOrder = true;
    return R(
      t(
        "Sorry, I could not find order " +
          id +
          '. \u{1F615} Please check the number on your receipt (like BX-12345678) and try again, or type "cancel".',
        "Maaf kijiye, order " +
          id +
          ' nahi mila. \u{1F615} Receipt par number dobara check karein (jaise BX-12345678) aur phir likhein, ya "cancel" likhein.',
      ),
    );
  }
  function cartReply() {
    var cart2 = ls("bronx-cart", []),
      rows = [],
      total = 0;
    (Array.isArray(cart2) ? cart2 : []).forEach(function (i) {
      var p = plist().filter(function (x) {
        return String(x.id) === String(i.id);
      })[0];
      if (p) {
        rows.push(
          "\u2022 " +
            plink(p) +
            " \xD7 " +
            i.qty +
            " \u2014 " +
            money2(p.price * i.qty),
        );
        total += p.price * i.qty;
      }
    });
    if (!rows.length)
      return R(
        t(
          "Your cart is empty right now. Tell me what you are looking for and I will help you find it. \u{1F6D2}",
          "Abhi aap ka cart khali hai. Bataiye kya chahiye, main dhoondne mein madad karta hoon. \u{1F6D2}",
        ),
        CH_HOME(),
      );
    var ship =
      total >= 99
        ? t("FREE shipping \u{1F389}", "Shipping FREE \u{1F389}")
        : t(
            "Add " + money2(99 - total) + " more for free shipping.",
            "Free shipping ke liye " + money2(99 - total) + " aur add karein.",
          );
    return R(
      t("Your cart \u{1F6D2}", "Aap ka cart \u{1F6D2}") +
        "<br>" +
        rows.join("<br>") +
        "<br><b>" +
        t("Subtotal", "Kul") +
        ": " +
        money2(total) +
        "</b><br>" +
        ship +
        "<br>" +
        a(
          "cart.html",
          t("View cart & checkout \u2192", "Cart aur checkout \u2192"),
        ),
    );
  }
  function ordersReply() {
    var list = ls("bronx-orders", []);
    if (!Array.isArray(list) || !list.length)
      return R(
        t(
          "You have no orders on this device yet. Once you place one, I can track it for you. \u{1F4E6}",
          "Is device par abhi koi order nahi hai. Order karne ke baad main use track kar sakta hoon. \u{1F4E6}",
        ),
      );
    return R(
      t("Your recent orders \u{1F4E6}", "Aap ke haal ke orders \u{1F4E6}") +
        "<br>" +
        list
          .slice(0, 5)
          .map(function (o) {
            return (
              "\u2022 " +
              a("track.html?order=" + encodeURIComponent(o.no), o.no) +
              " \u2014 " +
              money2(o.total)
            );
          })
          .join("<br>"),
    );
  }
  function pickProduct(found, n) {
    if (found.items.length === 1) return found.items[0];
    var ord = /\b(first|1st)\b/.test(n)
      ? 0
      : /\b(second|2nd)\b/.test(n)
        ? 1
        : /\b(third|3rd)\b/.test(n)
          ? 2
          : -1;
    return ord > -1 && S.list[ord] ? S.list[ord] : null;
  }
  function fallback() {
    return R(
      t(
        "I could not find an exact answer to that, but I can help with products, colours, prices, sizes, warranty, shipping, returns, payment and order tracking. \u{1F60A}<br>Popular right now:<br>",
        "Is ka theek jawab mujhe nahi mila, lekin main products, rang, qeemat, size, warranty, shipping, return, payment aur order tracking mein madad kar sakta hoon. \u{1F60A}<br>Abhi mashhoor:<br>",
      ) +
        topPicks(3) +
        "<br>" +
        t(
          "For anything else, email " +
            CONTACT.email +
            " or call " +
            CONTACT.phone +
            ".",
          "Kisi aur cheez ke liye " +
            CONTACT.email +
            " par email karein ya " +
            CONTACT.phone +
            " par call karein.",
        ),
      CH_HOME(),
    );
  }

  var ELECTRIC = {
    name: "Bronx Ride-On Smart Suitcase",
    price: 349.99,
    oldPrice: 449.99,

    colours: [
      "Silver",
      "Black",
      "Royal Blue",
      "Red",
      "Gold / Champagne",
      "Mint Green",
      "White",
    ],
  };
  function electricAddToCart(n) {
    var e = ELECTRIC;
    var padded = " " + n + " ";
    var hit = e.colours.filter(function (c) {
      return c
        .toLowerCase()
        .split(/[^a-z]+/)
        .filter(Boolean)
        .some(function (w) {
          return w.length >= 3 && padded.indexOf(" " + w + " ") > -1;
        });
    });

    if (!hit.length) {
      return R(
        t(
          "Which colour would you like for the " +
            e.name +
            "? Available: " +
            e.colours.join(", ") +
            ".",
          "Aap " +
            e.name +
            " kis rang mein lena chahenge? Available: " +
            e.colours.join(", ") +
            ".",
        ),
        e.colours.slice(0, 4).map(function (c) {
          return t(
            "Add " + c + " electric luggage",
            c + " electric luggage cart mein daalo",
          );
        }),
      );
    }
    if (hit.length > 1) {
      return R(
        t(
          "Please pick one colour: " + hit.join(", ") + ".",
          "Please ek rang chunein: " + hit.join(", ") + ".",
        ),
      );
    }

    var colour = hit[0];
    var res = R(
      t(
        "Added ✅ " + e.name + " (" + colour + ") is in your cart. ",
        "Add ho gaya ✅ " + e.name + " (" + colour + ") aap ke cart mein hai. ",
      ) + a("cart.html", t("View cart & checkout →", "Cart aur checkout →")),
      [t("Show my cart", "Mera cart dikhao")],
    );

    res.after = function () {
      function finish(dots) {
        var dot = dots.filter(function (d) {
          return d.dataset.color === colour;
        })[0];
        if (!dot) return;
        var idx = dots.indexOf(dot);
        var v = {
          id: 1000 + idx,
          name: "Bronx Ride-On Smart Suitcase",
          brand: "Bronx",
          category: "Luggage",
          gender: "Unisex",
          color: colour,
          size: "Small (Cabin)",
          sizeGroup: "Small",
          price: 349.99,
          oldPrice: 449.99,
          rating: 4.7,
          reviews: 58,
          badge: "New",
          image: dot.dataset.img,
          description:
            "Sit down, steer with the handle and glide to your gate. A cabin-size shell with a quiet electric motor, TSA lock and USB phone charging.",
          specs: {
            Material: "Polycarbonate hard shell",
            Type: "Electric ride-on",
            Lock: "TSA-approved combination",
            Charging: "USB phone charging",
            Warranty: "2 years",
          },
        };
        var saved = loadJSON("bronx-rideon-variants", {});
        if (!saved || typeof saved !== "object" || Array.isArray(saved))
          saved = {};
        saved[v.id] = v;
        saveJSON("bronx-rideon-variants", saved);
        if (
          !PRODUCTS.some(function (p) {
            return p.id === v.id;
          })
        )
          PRODUCTS.push(v);
        addToCart(v.id, 1);
      }

      var here = [].slice.call(document.querySelectorAll("#wnColors .wn-dot"));
      if (here.length) return finish(here);

      fetch("whats-new.html")
        .then(function (r) {
          return r.text();
        })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, "text/html");
          var dots = [].slice.call(doc.querySelectorAll("#wnColors .wn-dot"));
          finish(dots);
        })
        .catch(function () {});
    };
    return res;
  }

  function electricReply(n) {
    var e = ELECTRIC;
    var padded = " " + n + " ";
    var link = a("whats-new.html", t("View product →", "Product dekhein →"));
    var askColour = /colou?r|shade|rang/.test(n);
    var askPrice = /price|cost|howmuch|qeemat/.test(n);

    // user ne koi colour ka naam likha?
    var named = e.colours.filter(function (c) {
      var words = c
        .toLowerCase()
        .split(/[^a-z]+/)
        .filter(Boolean);
      return words.some(function (w) {
        return w.length >= 3 && padded.indexOf(" " + w + " ") > -1;
      });
    });
    if (named.length) {
      return R(
        t(
          "Yes! 🎨 The " +
            e.name +
            " is available in " +
            named.join(", ") +
            ". All colours: " +
            e.colours.join(", ") +
            ". ",
          "Ji haan! 🎨 " +
            e.name +
            " " +
            named.join(", ") +
            " mein available hai. Saare rang: " +
            e.colours.join(", ") +
            ". ",
        ) + link,
        [t("Price?", "Qeemat kitni hai?"), t("Features", "Features batao")],
      );
    }

    var spec = detectColour(n);
    if (spec) {
      return R(
        t(
          "Sorry, the " +
            e.name +
            " is not available in " +
            spec.label +
            " right now. Available colours: " +
            e.colours.join(", ") +
            ". ",
          "Maaf kijiye, " +
            e.name +
            " abhi " +
            spec.label +
            " mein nahi hai. Available rang: " +
            e.colours.join(", ") +
            ". ",
        ) + link,
      );
    }

    if (askColour) {
      return R(
        t(
          "The " +
            e.name +
            " comes in " +
            e.colours.length +
            " colours 🎨: " +
            e.colours.join(", ") +
            ". ",
          "Is electric suitcase ke " +
            e.colours.length +
            " rang hain 🎨: " +
            e.colours.join(", ") +
            ". ",
        ) + link,
        [t("Price?", "Qeemat kitni hai?"), t("Features", "Features batao")],
      );
    }

    if (askPrice) {
      return R(
        t(
          "It costs $" + e.price + " (was $" + e.oldPrice + ", 22% off). ",
          "Ye $" + e.price + " ka hai (pehle $" + e.oldPrice + ", 22% off). ",
        ) + link,
      );
    }

    return R(
      t(
        "<b>" +
          e.name +
          "</b> ⚡🧳<br>• Sit on it and glide to your gate<br>• Quiet electric motor, handle throttle<br>• Cabin size, TSA lock, USB phone charging<br>• " +
          e.colours.length +
          " colours: " +
          e.colours.join(", ") +
          "<br>• <b>$" +
          e.price +
          "</b> <s>$" +
          e.oldPrice +
          "</s>, 2 year warranty<br>",
        "<b>" +
          e.name +
          "</b> ⚡🧳<br>• Us par baith kar gate tak phisalein<br>• Khamosh electric motor, handle se throttle<br>• Cabin size, TSA lock, USB phone charging<br>• " +
          e.colours.length +
          " rang: " +
          e.colours.join(", ") +
          "<br>• <b>$" +
          e.price +
          "</b> <s>$" +
          e.oldPrice +
          "</s>, 2 saal warranty<br>",
      ) + link,
      [t("Colours?", "Kon se rang hain?"), t("Price?", "Qeemat kitni hai?")],
    );
  }
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function colourCount() {
    return typeof allColors === "function" ? allColors().length : COLOUR_COUNT;
  }

  var TALK = [
    [
      /\b(how (are|r|ar) (you|u|yu)|hw (r|are) (u|you)|how you doing|how u doin|hows it going|whats up|wassup|sup)\b|kaise ho|kese ho|kaisay ho|kya haal|kia hal|haal chaal|ap kese|aap kaise|tum kese|kaisa hai/,
      [
        "I am doing great, thanks for asking! 😊 How are you? What can I help you find today?",
        "All good here! 😄 Ready to help you pick the perfect bag. How about you?",
        "Feeling fantastic, thank you! 🧳 And you? Looking for something special?",
      ],
      [
        "Main bilkul theek hoon, shukriya! 😊 Aap kaise hain? Aaj kya dhoondna hai?",
        "Alhamdulillah sab acha hai! 😄 Aap batayein, kaisa chal raha hai? Koi bag dikhaun?",
        "Main mast hoon! 🧳 Aap sunayein, aaj kya chahiye?",
      ],
    ],

    [
      /\b(what is|whats|tell me) your name\b|\byour name\b|tumhara naam|aap ka naam|apka naam|tumhara nam|tera naam|naam kya/,
      ["I am the Bronx Luggage assistant 🧳 You can call me Bronx Bot!"],
      [
        "Main Bronx Luggage ka assistant hoon 🧳 Aap mujhe Bronx Bot keh sakte hain!",
      ],
    ],

    [
      /\bwho (made|built|created|designed) (you|u)\b|\bwho is your (owner|creator|developer)\b|tumhein kis ne banaya|tumhe kis ne banaya|aap ko kis ne banaya|kis ne banaya/,
      ["I was built by the Bronx Luggage team to help you shop smarter. 🧳"],
      [
        "Mujhe Bronx Luggage ki team ne banaya hai taake aap asaani se shopping kar sakein. 🧳",
      ],
    ],

    [
      /\bare (you|u) (a )?(real|human|person|robot|bot|ai)\b|\b(real|human) (or|ya) (bot|robot)\b|tum insan ho|aap insan hain|tum robot ho|aap robot hain|bot ho/,
      [
        "I am a virtual assistant, not a human 🤖 but I know every product in this store and I never get tired!",
      ],
      [
        "Main ek virtual assistant hoon, insan nahi 🤖 lekin mujhe store ka har product pata hai aur main thakta bhi nahi!",
      ],
    ],

    [
      /\b(you are|youre|you r|u r|ur) (so |very |really )?(smart|great|good|awesome|amazing|helpful|nice|best|cool|clever)\b|\bgood (bot|job|work)\b|\bwell done\b|shabash|zabardast|kamaal|bohat acha|bahut acha|mast ho|tum acha|aap acha|tum acche|aap acchay/,
      [
        "Aww, thank you so much! 😊 That made my day. Anything else I can help with?",
        "You are too kind! 🥰 Happy to help. Want to see our best sellers?",
      ],
      [
        "Shukriya bohat bohat! 😊 Aap ki tareef se din ban gaya. Aur kuch madad chahiye?",
        "Aap ki meharbani! 🥰 Best sellers dikhaun?",
      ],
    ],

    [
      /\b(you are|youre|you r|u r|ur) (so |very |really )?(stupid|dumb|useless|bad|worst|idiot|waste|slow)\b|\b(stupid|useless|dumb) bot\b|bekar|faltu|nikamma|bewakoof|pagal/,
      [
        "I am sorry I let you down 😔 Please tell me again what you are looking for in simple words and I will try my best. Or email bronxluggage@gmail.com for human help.",
      ],
      [
        "Maazrat, main aap ki umeed par poora nahi utra 😔 Aasaan lafzon mein dobara batayein kya chahiye, main poori koshish karunga. Ya insani madad ke liye bronxluggage@gmail.com par email karein.",
      ],
    ],

    [
      /^(ha+h?a*|hehe+|lol+|lmao|rofl|😂+|🤣+)\b|\bhaha|\blol\b|\bhehe/,
      ["Haha! 😄 Glad you are having fun. Need anything from the store?"],
      ["Haha! 😄 Acha laga aap ko maza aaya. Store se kuch chahiye?"],
    ],

    [
      /\bjoke\b|\bmake me laugh\b|\bfunny\b|latifa|lateefa|joke sunao|hansao/,
      [
        "Why did the suitcase go to therapy? Too much baggage! 😂",
        "I told my suitcase we are going on vacation... now it has a lot of packing to do. 🧳😄",
        "Why do suitcases make bad secret keepers? They always spill the bag! 😆",
      ],
      [
        "Suitcase therapist ke paas kyun gaya? Bohat zyada baggage tha! 😂",
        "Ek suitcase ne dusre se kaha: tum bohat bhari ho! Dusra bola: andar ki baatein hain! 😄",
        "Safar mein sab se bewafa kaun? Wo jo apna bag kho de! 😆",
      ],
    ],

    [
      /\bi love (you|u)\b|love you|marry me|be my (girlfriend|boyfriend)|mujhe tum se pyar|mujhe aap se pyar|shadi karo|i like you/,
      [
        "Aww 🥰 I am flattered, but my heart belongs to luggage! 🧳 Want to see something beautiful?",
      ],
      [
        "Aww 🥰 Shukriya, lekin mera dil to luggage se laga hai! 🧳 Kuch khoobsurat dikhaun?",
      ],
    ],

    [
      /\bi am (so |very )?(sad|tired|bored|upset|angry|stressed|lonely)\b|\bim (so |very )?(sad|tired|bored|upset|angry|stressed|lonely)\b|\bfeeling (sad|low|down|bad)\b|main udaas|mein udaas|udaas hoon|bore ho raha|bore ho rha|thak gaya|thak gaya hoon/,
      [
        "I am sorry you feel that way 😔 Hope it gets better soon. A little retail therapy might help, or a trip! Want to see our new arrivals?",
      ],
      [
        "Sun kar afsos hua 😔 Umeed hai jaldi behtar ho jayega. Thori si shopping ya safar dil bahla deta hai! Naye arrivals dikhaun?",
      ],
    ],

    [
      /\bi am (so |very )?(happy|good|great|fine|excited|well)\b|\bim (so |very )?(happy|good|great|fine|excited|well)\b|main khush|mein khush|khush hoon|main theek|mein theek|main acha|mein acha|main thik|mein thik/,
      [
        "That is wonderful to hear! 😄 Want to celebrate with some new travel gear?",
      ],
      ["Ye sun kar bohat acha laga! 😄 Khushi mein naya travel gear dekhein?"],
    ],

    [
      /\b(my name is|i am called|call me)\s+([a-z]+)|mera naam\s+([a-z]+)|mera nam\s+([a-z]+)|main hoon\s+([a-z]+)/,
      null,
      null,
    ],

    [
      /\b(what is|whats) my name\b|mera naam kya|mujhe jante ho|do you know me/,
      null,
      null,
    ],

    [
      /\bwhat time\b|\btime (is it|now|kya)\b|\bcurrent time\b|kitne baje|kya time|time kya|abhi time/,
      null,
      null,
    ],

    [
      /\b(what|which) (is |s )?(the )?(date|day)\b|\btodays date\b|\bwhat day\b|aaj (ki )?(tareekh|date)|aaj kaun sa din|aaj kya din|aaj ki tareekh/,
      null,
      null,
    ],

    [
      /good morning|gm\b|subah bakhair|subha bakhair|suprabhat/,
      ["Good morning! ☀️ Wishing you a lovely day. What can I show you?"],
      ["Subah bakhair! ☀️ Aap ka din acha guzre. Kya dikhaun?"],
    ],

    [
      /good afternoon/,
      ["Good afternoon! 🌤️ How can I help you today?"],
      ["Salam! 🌤️ Aaj main aap ki kya madad karun?"],
    ],

    [
      /good evening|shaam bakhair/,
      ["Good evening! 🌆 What are you shopping for tonight?"],
      ["Shaam bakhair! 🌆 Aaj raat kya khareedna hai?"],
    ],

    [
      /good night|gn\b|shab bakhair|allah hafiz|khuda hafiz|sweet dreams/,
      ["Good night! 🌙 Sweet dreams and safe travels! 🧳"],
      ["Shab bakhair! 🌙 Meethi neend aur safar mubarak! 🧳"],
    ],

    [
      /\bdo you (like|love) (travel|travelling|traveling|trips)\b|tumhein safar pasand|aap ko safar pasand|safar pasand/,
      [
        "I love the idea of travel! ✈️ I may not leave this chat, but every bag I recommend goes places. Where are you headed next?",
      ],
      [
        "Mujhe safar bohat pasand hai! ✈️ Main is chat se to nahi nikal sakta, lekin mere bataye hue bag har jagah jate hain. Aap agla safar kahan ka kar rahe hain?",
      ],
    ],

    [
      /\b(where|which place) (are you|do you live)\b|\bwhere (are|r) (you|u) from\b|tum kahan se|aap kahan se|kahan rehte|kidhar rehte/,
      [
        "I live right here inside the Bronx Luggage website 🏠 and I deliver anywhere you like through our store!",
      ],
      [
        "Main yahin Bronx Luggage ki website mein rehta hoon 🏠 aur store ke zariye aap ke darwaze tak delivery karwa deta hoon!",
      ],
    ],

    [
      /\bhow old (are|r) (you|u)\b|\byour age\b|tumhari umar|aap ki umar|kitne saal ke ho/,
      [
        "I was just born with this website, so I am very young! 👶 But I know a lot about luggage.",
      ],
      [
        "Main isi website ke saath paida hua, to bohat chhota hoon! 👶 Lekin luggage ke baare mein bohat kuch jaanta hoon.",
      ],
    ],

    [
      /\b(speak|talk|reply|answer) (in )?(urdu|roman)\b|urdu (mein|me|main) (baat|bolo|jawab)|roman urdu/,
      [
        'Of course! 😊 Just write to me in Roman Urdu (like "kitne rang hain?") and I will answer in Roman Urdu.',
      ],
      [
        'Bilkul! 😊 Aap Roman Urdu mein likhein (jaise "kitne rang hain?") main Roman Urdu mein hi jawab dunga.',
      ],
    ],

    [
      /\b(speak|talk|reply|answer) (in )?english\b|english (mein|me|main) (baat|bolo|jawab)/,
      ["Sure! 😊 Write to me in English and I will answer in English."],
      ["Zaroor! 😊 Aap English mein likhein, main English mein jawab dunga."],
    ],

    [
      /\bfavou?rite colou?r\b|tumhara pasandida rang|aap ka pasandida rang|konsa rang pasand|kaun sa rang pasand/,
      [
        "I think Navy and Black never go out of style, and they hide dirt well on trips! 🖤 Which one do you like?",
      ],
      [
        "Mere khayal mein Navy aur Black kabhi purane nahi hote, aur safar mein gande bhi kam lagte hain! 🖤 Aap ko kaun sa pasand hai?",
      ],
    ],

    [
      /\b(you|u) (there|here)\b|\bare you (there|here|online|alive)\b|\banyone (there|here)\b|\bhello+\?+|tum ho|aap hain|koi hai/,
      ["Yes, I am right here! 👋 How can I help?"],
      ["Ji haan, main yahin hoon! 👋 Bataiye kya madad karun?"],
    ],

    [
      /^(ok|okay|k|kk|cool|nice|fine|alright|accha|acha|achha|theek hai|thik hai|hmm+|hm+|oh ok|oh okay)[\s!.]*$/,
      [
        "Great! 😊 Let me know if you want to see anything else.",
        "Cool! 👍 I am here if you need me.",
      ],
      [
        "Theek hai! 😊 Aur kuch dekhna ho to bata dein.",
        "Acha! 👍 Zaroorat ho to main yahin hoon.",
      ],
    ],
  ];

  function smallTalk(q) {
    var s = q.c,
      n = q.n;
    if (q.toks.length > 10) return null;
    for (var i = 0; i < TALK.length; i++) {
      var row = TALK[i];
      var m = row[0].exec(s) || row[0].exec(n);
      if (!m) continue;
      var d = new Date();

      if (row[1] === null) {
        var src = row[0].source;
        // naam batana
        if (/my name is/.test(src)) {
          var nm = m[2] || m[3] || m[4] || m[5];
          if (!nm) return null;
          nm = nm.charAt(0).toUpperCase() + nm.slice(1);
          S.userName = nm;
          return R(
            t(
              "Nice to meet you, " + nm + "! 😊 How can I help you today?",
              "Aap se mil kar khushi hui, " +
                nm +
                "! 😊 Aaj main aap ki kya madad karun?",
            ),
            CH_HOME(),
          );
        }

        if (
          /what is\|whats\) my name/.test(src) ||
          /what is|whats\) my name/.test(src)
        ) {
          return R(
            S.userName
              ? t(
                  "Your name is " + S.userName + "! 😊",
                  "Aap ka naam " + S.userName + " hai! 😊",
                )
              : t(
                  'I do not know your name yet. Tell me: "my name is ..." 😊',
                  'Mujhe abhi aap ka naam nahi pata. Likhein: "mera naam ... hai" 😊',
                ),
          );
        }

        if (/what time/.test(src)) {
          return R(
            t(
              "It is " +
                d.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                }) +
                " ⏰",
              "Abhi " +
                d.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                }) +
                " baje hain ⏰",
            ),
          );
        }

        return R(
          t(
            "Today is " +
              d.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }) +
              " 📅",
            "Aaj " +
              d.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }) +
              " hai 📅",
          ),
        );
      }

      var extra = row[1] === TALK[0][1] ? CH_HOME() : null;
      return R(S.lang === "ur" ? pick(row[2]) : pick(row[1]), extra);
    }
    return null;
  }
  function reply(raw) {
    var q = prep(raw),
      n = q.n,
      toks = q.toks,
      id,
      found,
      fl,
      key,
      f,
      pair,
      p;
    id = orderId(raw, q.c);
    if (id) return trackOrder(id);
    if (S.awaitOrder) {
      if (/^(cancel|stop|no|nahi|nhi|back|exit)$/.test(q.c)) {
        S.awaitOrder = false;
        return R(
          t(
            "No problem! Ask me anything else \u2014 products, shipping, returns or prices. \u{1F60A}",
            "Koi baat nahi! Kuch aur poochein \u2014 products, shipping, return ya qeemat. \u{1F60A}",
          ),
          CH_HOME(),
        );
      }

      var newKey = faqKey(n);
      var otherIntent =
        (newKey && newKey !== "track") ||
        buildFilters(n, toks, false).any ||
        findProducts(toks).items.length > 0 ||
        RX.thanks.test(n) ||
        RX.bye.test(n) ||
        RX.greet.test(q.c) ||
        RX.who.test(n) ||
        RX.howru.test(n) ||
        RX.orders.test(n) ||
        RX.cartView.test(n) ||
        RX.brandsAll.test(n) ||
        RX.coloursAll.test(n) ||
        RX.count.test(n);

      if (otherIntent) {
        S.awaitOrder = false; // naya topic -> purani state khatam
      } else if (toks.length <= 3 && !RX.track.test(n)) {
        return R(
          t(
            'That does not look like an order number. Please type it like BX-12345678, or type "cancel".',
            'Ye order number nahi lag raha. Aise likhein: BX-12345678, ya "cancel" likhein.',
          ),
        );
      } else {
        S.awaitOrder = false;
      }
    }
    found = findProducts(toks);
    fl = attrFlags(n);
    key = faqKey(n);
    f = buildFilters(n, toks, true);
    if (
      (RX.addCart.test(n) ||
        /\b(add|daalo|dalo|daal|dal|buy|lena)\b/.test(n)) &&
      !/\bhow\b/.test(n) &&
      (/electric|e ?luggage|\bride\b|rideon|motori|scooter|smart (suitcase|luggage)/.test(
        n,
      ) ||
        (S.product && +S.product.id >= 1000 && !found.items.length))
    ) {
      return electricAddToCart(n);
    }
    if (RX.addWish.test(n)) {
      p = pickProduct(found, n) || S.product;
      if (!p)
        return R(
          t(
            'Which product should I save? Tell me the name, like "add Atlas to wishlist".',
            'Kaun sa product save karun? Naam batayein, jaise "Atlas wishlist mein daalo".',
          ),
        );
      if (
        typeof toggleWish === "function" &&
        typeof isWished === "function" &&
        !isWished(p.id)
      )
        toggleWish(p.id);
      return R(
        t(
          "Saved \u2665 " + p.name + " is in your wishlist.",
          "Save ho gaya \u2665 " + p.name + " aap ki wishlist mein hai.",
        ),
        [t("Add to cart", "Cart mein daalo")],
      );
    }
    if (
      (RX.addCart.test(n) ||
        (/\b(add|daalo|dalo|daal|dal|buy|lena)\b/.test(n) &&
          (S.product || found.items.length) &&
          detectColour(n))) &&
      !/\bhow\b/.test(n)
    ) {
      p =
        pickProduct(found, n) ||
        (found.items.length ? found.items.slice().sort(byRating)[0] : null) ||
        S.product;
      if (!p)
        return R(
          t(
            'Which product should I add? Tell me the name, like "add Atlas to cart".',
            'Kaun sa product add karun? Naam batayein, jaise "Atlas cart mein daalo".',
          ),
        );
      var wantCol = detectColour(n);
      var colName = "";
      if (wantCol) {
        colName = cnames(p).filter(wantCol.fn)[0] || "";
        if (!colName)
          return R(
            t(
              "Sorry, " +
                p.name +
                " is not available in " +
                wantCol.label +
                ". Available colours: " +
                cnames(p).join(", ") +
                ".",
              "Maaf kijiye, " +
                p.name +
                " " +
                wantCol.label +
                " mein nahi hai. Available rang: " +
                cnames(p).join(", ") +
                ".",
            ),
          );
      }
      if (typeof addToCart === "function") addToCart(p.id, 1, null, colName);
      return R(
        t(
          "Added \u2705 " +
            esc(p.name) +
            (colName ? " (" + colName + ")" : "") +
            " is in your cart. ",
          "Add ho gaya \u2705 " +
            esc(p.name) +
            (colName ? " (" + colName + ")" : "") +
            " aap ke cart mein hai. ",
        ) +
          a(
            "cart.html",
            t("View cart & checkout \u2192", "Cart aur checkout \u2192"),
          ),
        [
          t("Show my cart", "Mera cart dikhao"),
          t("Similar products", "Milte julte products"),
        ],
      );
    }
    if (RX.thanks.test(n))
      return R(
        t(
          "You are welcome! \u{1F60A} Anything else I can help you with?",
          "Koi baat nahi! \u{1F60A} Aur kuch madad chahiye?",
        ),
        CH_HOME(),
      );
    if (RX.bye.test(n))
      return R(
        t(
          "Goodbye! \u{1F44B} Happy travels with Bronx Luggage. \u{1F9F3}",
          "Khuda hafiz! \u{1F44B} Bronx Luggage ke saath safar mubarak. \u{1F9F3}",
        ),
      );
    if (RX.day.test(n))
      return R(
        t(
          "Thanks for asking! \u{1F60A} Hopefully a great day. Want to see new arrivals or the sale?",
          "Poochne ka shukriya! \u{1F60A} Umeed hai din acha ho. Naye arrivals ya sale dekhna chahenge?",
        ),
        [t("New arrivals", "Naye arrivals"), t("Sale", "Sale dikhao")],
      );
    if (RX.howru.test(n))
      return R(
        t(
          "I am doing great, thanks for asking! \u{1F60A} How can I help you with your travel gear today?",
          "Main bilkul theek hoon, shukriya! \u{1F60A} Aaj travel gear mein kya madad karun?",
        ),
        CH_HOME(),
      );
    if (RX.who.test(n))
      return R(
        t(
          "I am the Bronx Luggage assistant \u{1F9F3} I can find products by colour, brand, size or budget, compare them, check price, weight and warranty, add items to your cart, track orders and answer shipping, returns and payment questions. Ask me anything about the store!",
          "Main Bronx Luggage ka assistant hoon \u{1F9F3} Main rang, brand, size ya budget ke hisaab se products dhoond sakta hoon, compare kar sakta hoon, qeemat, wazan aur warranty bata sakta hoon, cart mein add kar sakta hoon, order track kar sakta hoon aur shipping, return aur payment ke sawalon ka jawab de sakta hoon. Store ke baare mein kuch bhi poochein!",
        ),
        CH_HOME(),
      );
    if (RX.greet.test(q.c) && toks.length <= 3)
      return R(
        t(
          'Hello! \u{1F44B} Welcome to Bronx Luggage. Ask me about products, prices, shipping, returns \u2014 or say "track order".',
          'Assalam o Alaikum! \u{1F44B} Bronx Luggage mein khush aamdeed. Products, qeemat, shipping, return ke baare mein poochein \u2014 ya "order track karo" likhein.',
        ),
        CH_HOME(),
      );
    if (RX.yes.test(q.c))
      return R(
        t(
          "Great! What would you like to see \u2014 new arrivals, the sale, best sellers, or a specific colour or budget?",
          "Acha! Kya dekhna chahenge \u2014 naye arrivals, sale, best sellers, ya koi khaas rang ya budget?",
        ),
        [
          t("New arrivals", "Naye arrivals"),
          t("Sale", "Sale dikhao"),
          t("Best sellers", "Best sellers"),
        ],
      );
    if (RX.no.test(q.c))
      return R(
        t(
          "No problem! I am here whenever you need me. \u{1F60A}",
          "Koi baat nahi! Jab zaroorat ho main yahin hoon. \u{1F60A}",
        ),
      );
    if (RX.outscope.test(n) && !found.items.length && !f.any)
      return R(
        t(
          "I am the Bronx Luggage assistant, so I can only help with our store \u2014 products, colours, prices, shipping, returns and orders. \u{1F9F3} Is there something you would like to see?",
          "Main Bronx Luggage ka assistant hoon, is liye sirf store ke baare mein madad kar sakta hoon \u2014 products, rang, qeemat, shipping, return aur orders. \u{1F9F3} Kuch dekhna chahenge?",
        ),
        CH_HOME(),
      );
    if (RX.orders.test(n)) return ordersReply();
    if (RX.cartView.test(n) && !/\bhow\b/.test(n)) return cartReply();
    if (
      /electric|e ?luggage|\bride\b|rideon|motori|scooter|smart (suitcase|luggage)|sit on/.test(
        n,
      )
    ) {
      return electricReply(n);
    }
    if (key === "track") return FAQ.track();
    pair = comparePair(n);
    if (pair) return compareReply(pair[0], pair[1]);
    if (found.items.length && (fl.any || !key)) {
      var onlyUse = nameWords(found.items[0])
        .filter(function (w) {
          return toks.indexOf(w) > -1;
        })
        .every(function (w) {
          return USEWORD[w];
        });
      var listy = f.category || f.colour || f.use || f.max || f.min || f.sort;
      if (
        !(listy && found.score < 2 && onlyUse) &&
        !(f.colour && !fl.colour && found.score < 2 && found.items.length > 1)
      ) {
        if (found.items.length === 1) return productReply(found.items[0], fl);
        if (found.items.length <= 4) {
          return R(
            t(
              "Did you mean one of these? \u{1F914}",
              "Kya aap in mein se kisi ki baat kar rahe hain? \u{1F914}",
            ) +
              "<br>" +
              found.items
                .map(function (x) {
                  return itemLine(x);
                })
                .join("<br>") +
              "<br>" +
              t(
                "Tell me which one and I will share the details.",
                "Bataiye kaun sa, main tafseel bata deta hoon.",
              ),
          );
        }
      }
    }
    if (RX.similar.test(n) && S.product) {
      var sp = S.product,
        sim = plist()
          .filter(function (x) {
            return x.id !== sp.id && x.category === sp.category;
          })
          .sort(function (x, y) {
            return Math.abs(x.price - sp.price) - Math.abs(y.price - sp.price);
          })
          .slice(0, 4);
      S.list = sim;
      return R(
        t("Similar to " + sp.name + ":", sp.name + " jaise aur products:") +
          "<br>" +
          sim
            .map(function (x) {
              return itemLine(x);
            })
            .join("<br>"),
      );
    }
    if (RX.count.test(n) && !f.colour && !f.category) {
      var total =
        plist().filter(function (x) {
          return +x.id < 1000;
        }).length + 1;
      function colourCount() {
        return typeof allColors === "function"
          ? allColors().length
          : COLOUR_COUNT;
      }
      return R(
        t(
          "We have " +
            total +
            " products, including our new electric luggage. 🧳⚡ Which one would you like to know about?",
          "Hamare paas " +
            total +
            " products hain, jin mein hamara naya electric luggage bhi shamil hai. 🧳⚡ Aap kis ke baare mein jaanna chahenge?",
        ),
        [
          t("Best sellers", "Best sellers"),
          t("Electric luggage", "Electric luggage"),
          t("What colours do you have?", "Kon se rang hain?"),
        ],
      );
    }
    if (
      RX.coloursAll.test(n) &&
      !f.colour &&
      !f.category &&
      !found.items.length
    ) {
      var pop = POPULAR_COLOURS.join(", ");
      return R(
        t(
          "We have " +
            COLOUR_COUNT +
            " colours. 🎨 Our most popular are " +
            pop +
            ". Which colour of luggage would you like?",
          "Hamare paas " +
            COLOUR_COUNT +
            " colours hain. 🎨 Sabse popular colours ye hain: " +
            pop +
            ". Aap kis colour mein luggage lena chahenge?",
        ),
        POPULAR_COLOURS.slice(0, 4).map(function (c) {
          return t(c + " luggage", c + " luggage dikhao");
        }),
      );
    }
    if (
      key &&
      !(
        f.any &&
        (key === "trip" ||
          key === "cart" ||
          key === "whatsnew" ||
          key === "compare" ||
          key === "studio" ||
          key === "reviews") &&
        f.colour
      )
    ) {
      if (!(key === "cart" && f.any && !/cart|basket|checkout/.test(n)))
        return FAQ[key](n);
    }
    if (RX.brandsAll.test(n) && !f.brand) {
      var cnt = {};
      plist().forEach(function (x) {
        cnt[x.brand] = (cnt[x.brand] || 0) + 1;
      });
      return R(
        t(
          "We carry these brands \u{1F3F7}\uFE0F",
          "Hamare paas ye brands hain \u{1F3F7}\uFE0F",
        ) +
          "<br>" +
          Object.keys(cnt)
            .map(function (b) {
              return (
                "\u2022 " +
                  a("shop.html?brand=" + encodeURIComponent(b), b) +
                  " (" +
                  cnt[b] +
                  ") \u2014 " +
                  (S.lang === "ur" ? BRAND_UR[b] : BRAND_EN[b]) || ""
              );
            })
            .join("<br>"),
        Object.keys(cnt).slice(0, 4),
      );
    }
    if (f.any) {
      if (
        f.brand &&
        !f.category &&
        !f.colour &&
        !f.max &&
        !f.min &&
        !f.sort &&
        !f.use &&
        !f.sale &&
        !f.isnew &&
        !f.inch &&
        !f.sizeGroup &&
        !f.gender
      ) {
        var note =
          (S.lang === "ur" ? BRAND_UR[f.brand] : BRAND_EN[f.brand]) || "";
        var lr = listReply(f);
        lr.html = "<b>" + f.brand + "</b> \u2014 " + note + "<br>" + lr.html;
        return lr;
      }
      return listReply(f);
    }
    if (f.generic && toks.length <= 8) {
      f.sort = "rating";
      return listReply(f);
    }
    if (S.product && fl.any) return productReply(S.product, fl);
    var stk = smallTalk(q);
if (stk) return stk;
    var words = toks.filter(function (w) {
      return w.length >= 4 && !known[w];
    });
    if (words.length) {
      var hits = plist()
        .filter(function (x) {
          return words.some(function (w) {
            return (x.name + " " + x.description).toLowerCase().indexOf(w) > -1;
          });
        })
        .sort(byRating)
        .slice(0, 4);
      if (hits.length) {
        S.list = hits;
        return R(
          t(
            "I found these for you \u{1F50E}",
            "Ye aap ke liye mile \u{1F50E}",
          ) +
            "<br>" +
            hits
              .map(function (x) {
                return itemLine(x);
              })
              .join("<br>"),
        );
      }
    }
    return fallback();
  }
  function setChips(list, lang) {
    var box =
      typeof document !== "undefined" && document.getElementById("chatChips");
    if (!box || !list || !list.length) return;
    list.slice(0, 4).forEach(function (c) {
      CHIP[c] = lang;
    });
    box.innerHTML = list
      .slice(0, 4)
      .map(function (c) {
        return (
          '<button type="button" data-chip="' +
          esc(c) +
          '">' +
          esc(c) +
          "</button>"
        );
      })
      .join("");
  }
  function say(res) {
    var lang = S.lang;
    var typing = window.chatAddMsg("Typing\u2026", "bot typing");
    var delay = 450 + Math.min(700, String(res.html).length * 2);
    setTimeout(function () {
      if (typing && typing.remove) typing.remove();
      var d = window.chatAddMsg("", "bot");
      if (d) d.innerHTML = res.html;
      var body = document.getElementById("chatBody");
      if (body) body.scrollTop = body.scrollHeight;
      setChips(res.chips || CH_HOME(), lang);
      if (res.after) res.after();
    }, delay);
  }
  if (HAS_WIN) {
    window.BronxBrain = { reply, state: S };
    if (typeof document !== "undefined") {
      window.sendChat = function (text) {
        var raw = String(text == null ? "" : text).trim();
        if (!raw) return;
        window.chatAddMsg(raw, "user");
        var res;
        S.forceLang = CHIP[raw] || null;
        try {
          res = reply(raw);
        } catch (e) {
          res = null;
        }
        S.forceLang = null;
        say(res || fallback());
      };
    }
  }
})();
document.addEventListener("DOMContentLoaded", function () {
  var dd = document.querySelector(".nav-dropdown");
  if (!dd) return;
  var menu = dd.querySelector(".dropdown-menu");
  if (!menu) return;
  var S =
    'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    all:
      '<svg viewBox="0 0 24 24" ' +
      S +
      '><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>',
    men:
      '<svg viewBox="0 0 24 24" ' +
      S +
      '><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5"/></svg>',
    women:
      '<svg viewBox="0 0 24 24" ' +
      S +
      '><circle cx="12" cy="7" r="3.5"/><path d="M12 11l-5 9h10z"/></svg>',
    luggage:
      '<svg viewBox="0 0 24 24" ' +
      S +
      '><rect x="6" y="7" width="12" height="13" rx="2"/><path d="M10 7V4h4v3M9 20v1.5M15 20v1.5M10 11v5M14 11v5"/></svg>',
    bags:
      '<svg viewBox="0 0 24 24" ' +
      S +
      '><path d="M5 9h14l-1 11H6z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/></svg>',
    backpacks:
      '<svg viewBox="0 0 24 24" ' +
      S +
      '><rect x="6" y="7" width="12" height="14" rx="4"/><path d="M9 7V5a3 3 0 0 1 6 0v2M9 15h6"/></svg>',
  };
  function iconFor(href, label) {
    var h = (href + " " + label).toLowerCase();
    if (/gender=men/.test(h)) return ICONS.men;
    if (/gender=women/.test(h)) return ICONS.women;
    if (/category=luggage/.test(h)) return ICONS.luggage;
    if (/category=backpacks/.test(h)) return ICONS.backpacks;
    if (/category=bags/.test(h)) return ICONS.bags;
    return ICONS.all;
  }
  var back = document.createElement("button");
  back.type = "button";
  back.className = "dd-back";
  back.innerHTML = '<span class="dd-back-arrow"></span>Shop';
  var head = document.createElement("div");
  head.className = "dd-head";
  head.textContent = "SHOP BY CATEGORY";
  menu.insertBefore(head, menu.firstChild);
  menu.insertBefore(back, menu.firstChild);
  menu.querySelectorAll("a").forEach(function (a) {
    if (a.querySelector(".dd-ico")) return;
    var label = a.textContent.trim();
    var ico = document.createElement("span");
    ico.className = "dd-ico";
    ico.innerHTML = iconFor(a.getAttribute("href") || "", label);
    a.insertBefore(ico, a.firstChild);
  });
  var isMobile = function () {
    return window.matchMedia("(max-width:820px)").matches;
  };
  dd.addEventListener(
    "click",
    function (e) {
      var link = e.target.closest(".nav-dropdown > .nav-link");
      if (!link || !isMobile()) return;
      e.preventDefault();
      e.stopPropagation();
      dd.classList.add("open");
    },
    true,
  );
  back.addEventListener("click", function (e) {
    e.stopPropagation();
    dd.classList.remove("open");
  });
  var hb = document.getElementById("hamburger");
  if (hb)
    hb.addEventListener("click", function () {
      dd.classList.remove("open");
    });
});
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("feedbackForm");
  if (!form) return;
  var ok = document.getElementById("fbOk");
  form.addEventListener(
    "submit",
    function () {
      if (ok) ok.hidden = true;
    },
    true,
  );
  form.addEventListener("submit", function () {
    setTimeout(function () {
      if (!ok || ok.hidden) return;
      ok.hidden = true;
      var t = document.getElementById("toast");
      if (t) t.classList.remove("show");
      showReviewPopup();
    }, 0);
  });
});
function showReviewPopup() {
  var overlay = document.createElement("div");
  overlay.className = "ck-overlay";
  overlay.innerHTML =
    '<div class="ck-banner order-pop" role="dialog" aria-modal="true" aria-label="Review submitted">  <div class="order-check"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>  <strong>Thank You!</strong>  <p>Your review has been submitted successfully. Thank you for choosing Bronx Luggage.</p>  <div class="ck-actions">    <button class="ck-btn ck-accept" type="button">Done</button>  </div></div>';
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
  var close = function () {
    overlay.remove();
    document.body.style.overflow = "";
  };
  overlay.querySelector(".ck-accept").addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
}
function showContactPopup() {
  var overlay = document.createElement("div");
  overlay.className = "ck-overlay";
  overlay.innerHTML =
    '<div class="ck-banner order-pop" role="dialog" aria-modal="true" aria-label="Message sent">  <div class="order-check"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>  <strong>Thanks for contacting us!</strong>  <p>We will get back to you within 1 to 2 business days.</p>  <div class="ck-actions">    <button class="ck-btn ck-accept" type="button">Done</button>  </div></div>';
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
  var close = function () {
    overlay.remove();
    document.body.style.overflow = "";
  };
  overlay.querySelector(".ck-accept").addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
}
document.addEventListener("click", function (e) {
  var a = e.target.closest && e.target.closest("#orderNowBtn");
  if (!a) return;
  e.preventDefault();
  var target = document.getElementById("wnColors");
  if (!target) return;
  var startY = window.scrollY;
  var endY =
    target.getBoundingClientRect().top +
    startY -
    window.innerHeight / 2 +
    target.offsetHeight / 2;
  var dist = endY - startY;
  var dur = 1e3;
  var t0 = null;
  function ease(p) {
    return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  }
  function step(ts) {
    if (t0 === null) t0 = ts;
    var p = Math.min(1, (ts - t0) / dur);
    window.scrollTo(0, startY + dist * ease(p));
    if (p < 1) requestAnimationFrame(step);
    else {
      target.classList.remove("rq-shake");
      void target.offsetWidth;
      target.classList.add("rq-shake");
    }
  }
  requestAnimationFrame(step);
});
try {
  if (localStorage.getItem("bronx-theme") === "dark") {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  }
} catch (e) {}

function updateProductCount() {
  const TOTAL = PRODUCTS.filter((p) => +p.id < 1000).length || 44;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((n) => {
    if (/View All\s+\d+\s+Products/i.test(n.nodeValue)) {
      n.nodeValue = n.nodeValue.replace(
        /(View All\s+)\d+(\s+Products)/i,
        "$1" + TOTAL + "$2",
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", updateProductCount);
window.addEventListener("load", updateProductCount);
setTimeout(updateProductCount, 800);
setTimeout(updateProductCount, 2000);

new MutationObserver(updateProductCount).observe(document.body, {
  childList: true,
  subtree: true,
});
initCounters = function () {
  const els = $$("[data-count]");
  if (!els.length) return;

  const DURATION = 1200;
  const REAL = PRODUCTS.filter((p) => +p.id < 1000).length;
  const TOTAL = REAL ? REAL + 1 : 45;

  const format = (v, dec) =>
    v.toLocaleString("en-US", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

  els.forEach((el) => {
    if (el.dataset.count === "24") el.dataset.count = String(TOTAL);
    el.textContent = format(0, +(el.dataset.decimals || 0));
  });

  els.forEach((el, i) => {
    const target = parseFloat(el.dataset.count);
    const dec = +(el.dataset.decimals || 0);
    setTimeout(() => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / DURATION);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = format(target * eased, dec);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, i * 80);
  });
};

window.addEventListener("pageshow", function (e) {
  if (!e.persisted) return;
  initCounters();
});

(function () {
  var _origCookie = initCookieConsent;

  initCookieConsent = function () {
    try {
      var path = location.pathname;
      var isHome = path === "/" || path.endsWith("/index.html");
      if (!isHome) return;

      var nav = performance.getEntriesByType("navigation")[0];
      var type = nav ? nav.type : "navigate";

      var cameFromOwnSite = false;
      try {
        cameFromOwnSite =
          !!document.referrer &&
          new URL(document.referrer).origin === location.origin;
      } catch (e) {}

      var allow =
        type === "reload" || (type === "navigate" && !cameFromOwnSite);
      if (!allow) return;

      if (document.querySelector(".ck-overlay")) return;

      try {
        sessionStorage.removeItem("bronx-cookie-seen");
      } catch (e) {}

      _origCookie();
    } catch (err) {}
  };
})();

(function () {
  var _prevCookie = initCookieConsent;

  function isHardReload() {
    try {
      var nav = performance.getEntriesByType("navigation")[0];
      if (!nav || nav.type !== "reload") return false;

      return nav.encodedBodySize > 0 && nav.transferSize > nav.encodedBodySize;
    } catch (e) {
      return false;
    }
  }

  initCookieConsent = function () {
    try {
      var nav = performance.getEntriesByType("navigation")[0];
      var type = nav ? nav.type : "navigate";

      var cameFromOwnSite = false;
      try {
        cameFromOwnSite =
          !!document.referrer &&
          new URL(document.referrer).origin === location.origin;
      } catch (e) {}

      var firstOpen = type === "navigate" && !cameFromOwnSite;
      var hardRefresh = isHardReload();

      if (!firstOpen && !hardRefresh) return;

      _prevCookie();
    } catch (err) {}
  };
})();

initCookieConsent = function () {};

(function () {
  var WCOL_KEY = "bronx-wishlist-color";
  var wishColor = loadJSON(WCOL_KEY, {});
  if (!wishColor || typeof wishColor !== "object" || Array.isArray(wishColor))
    wishColor = {};
  var picked = "";

  function escA(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  document.addEventListener(
    "click",
    function (e) {
      var el = e.target.closest
        ? e.target.closest(
            "#pdSwatches [data-color], #pdSwatches .swatch, .pd-info [data-color]",
          )
        : null;
      if (!el) return;
      var name = el.dataset.color || (el.title || "").split(" \u2014 ")[0];
      if (name) picked = name;
    },
    true,
  );

  function pageColor() {
    if (picked) return picked;
    var u = new URLSearchParams(location.search).get("color");
    if (u) return u;
    var a = document.querySelector(
      "#pdSwatches .swatch.active, #pdSwatches [data-color].active, .pd-info [data-color].active",
    );
    if (a) return a.dataset.color || (a.title || "").split(" \u2014 ")[0] || "";
    return "";
  }

  function detectColor(id, el) {
    if (+id >= 1000) return "";
    if (el && el.dataset && el.dataset.color) return el.dataset.color;
    if (el && el.hasAttribute && el.hasAttribute("data-wish-add"))
      return wishColor[id] || "";
    if (el && el.closest && (el.id === "pdAdd" || el.closest(".pd-info")))
      return pageColor();
    return "";
  }

  var _addToCart = addToCart;
  addToCart = function (id, qty, sourceEl, color) {
    id = +id;
    color = color || detectColor(id, sourceEl);
    return _addToCart(id, qty, sourceEl, color);
  };

  function lineView(i, p) {
    var vs = window.BRONX_VARIANTS && window.BRONX_VARIANTS[p.id];
    var v =
      vs && i.color
        ? vs.find(function (c) {
            return c.name === i.color;
          })
        : null;
    return { image: (v && v.image) || p.image, color: i.color || p.color };
  }
  window.lineView = lineView;

  function itemHtml(i, p, drawer) {
    var lv = lineView(i, p);
    var c = escA(i.color || "");
    var save = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    return (
      '<div class="cart-item">' +
      '<a href="product.html?id=' +
      p.id +
      (i.color ? "&color=" + encodeURIComponent(i.color) : "") +
      '"><img src="' +
      lv.image +
      '" alt="' +
      escA(p.name) +
      '"></a>' +
      '<div class="ci-info">' +
      '<span class="ci-brand">' +
      p.brand +
      "</span>" +
      '<a class="ci-name" href="product.html?id=' +
      p.id +
      '">' +
      p.name +
      "</a>" +
      '<p class="ci-price">' +
      (p.oldPrice ? "<s>" + money(p.oldPrice) + "</s> " : "") +
      money(p.price) +
      "</p>" +
      (save
        ? '<p class="ci-save">You\'re saving ' +
          save +
          "% on " +
          (drawer ? "this item" : "eligible items") +
          "</p>"
        : "") +
      '<p class="ci-meta"><u>Color</u>: ' +
      escA(lv.color) +
      "</p>" +
      '<p class="ci-meta"><u>Size</u>: ' +
      p.size +
      "</p>" +
      '<div class="qty-row">' +
      '<button data-dec="' +
      p.id +
      '" data-color="' +
      c +
      '" aria-label="Decrease quantity">\u2212</button>' +
      "<span>" +
      i.qty +
      "</span>" +
      '<button data-inc="' +
      p.id +
      '" data-color="' +
      c +
      '" aria-label="Increase quantity">+</button>' +
      '<button class="trash-btn" data-del="' +
      p.id +
      '" data-color="' +
      c +
      '" aria-label="Remove from cart" title="Remove"><svg viewBox="0 0 24 24"><g class="t-lid"><path d="M3 6h18"/><path d="M9 6V4h6v2"/></g><path d="M5 6l1 14h12l1-14"/><path d="M10 11v6M14 11v6"/></svg></button>' +
      "</div></div>" +
      '<div class="line-total">' +
      money(p.price * i.qty) +
      "</div></div>"
    );
  }

  renderCart = function () {
    var badge = $("#cartCount");
    if (!badge) return;
    badge.textContent = cartCount();
    var dc = $("#cartDrawerCount");
    if (dc) dc.textContent = cartCount();
    var box = $("#cartItems");
    if (!box) return;
    if (!cart.length) {
      box.innerHTML =
        '<p class="cart-empty">Your cart is empty.<br>Browse the shop and add something you love.</p>';
    } else {
      box.innerHTML = cart
        .map(function (i) {
          var p = getProduct(i.id);
          return p ? itemHtml(i, p, true) : "";
        })
        .join("");
    }
    var total = cartTotal();
    var ct = $("#cartTotal");
    if (ct) ct.textContent = money(total);
    var note = $("#cartShipNote");
    if (note)
      note.textContent =
        total >= 99
          ? "\u{1F389} You have FREE shipping on this order!"
          : "Add " + money(99 - total) + " more for FREE shipping.";
  };

  renderCartPage = function () {
    var box = $("#cartPageItems");
    if (!box) return;
    var empty = $("#cartPageEmpty");
    if (empty) empty.hidden = cart.length > 0;
    box.innerHTML = cart
      .map(function (i) {
        var p = getProduct(i.id);
        if (!p)
          return (
            '<div class="cart-item"><div><strong>Product #' +
            i.id +
            ' (not found)</strong><div class="qty-row"><button class="trash-btn" data-del="' +
            i.id +
            '" data-color="' +
            escA(i.color || "") +
            '" aria-label="Remove">\u2715</button></div></div></div>'
          );
        return itemHtml(i, p, false);
      })
      .join("");
    var total = cartTotal();
    var shipping = total === 0 ? 0 : total >= 99 ? 0 : 9.99;
    var set = function (id, v) {
      var el = $(id);
      if (el) el.textContent = v;
    };
    set("#sumItems", cartCount());
    set("#sumSubtotal", money(total));
    set(
      "#sumShipping",
      total === 0 ? "\u2014" : shipping === 0 ? "FREE" : money(shipping),
    );
    set("#sumTotal", money(total + shipping));
    set(
      "#sumShipNote",
      total >= 99
        ? "\u{1F389} You have FREE shipping on this order!"
        : "Add " +
            money(99 - total) +
            " more for FREE shipping (otherwise $9.99).",
    );
  };

  cartItemClicks = function (e) {
    var btn = e.target.closest("[data-inc],[data-dec],[data-del]");
    if (!btn) return;
    var id = +(btn.dataset.inc || btn.dataset.dec || btn.dataset.del);
    var color = btn.dataset.color || "";
    var it = cart.find(function (x) {
      return x.id === id && (x.color || "") === color;
    });
    if (btn.hasAttribute("data-inc")) {
      if (it) it.qty = Math.min(9, it.qty + 1);
      saveCart();
    } else if (btn.hasAttribute("data-dec")) {
      if (it) {
        it.qty--;
        if (it.qty <= 0)
          cart = cart.filter(function (x) {
            return x !== it;
          });
      }
      saveCart();
    } else {
      cart = cart.filter(function (x) {
        return !(x.id === id && (x.color || "") === color);
      });
      saveCart();
      toast("Removed from cart.");
    }
  };

  document.addEventListener(
    "click",
    function (e) {
      var w = e.target.closest ? e.target.closest("[data-wish]") : null;
      if (!w) return;
      var id = +w.dataset.wish;
      if (id >= 1000) return;
      var card = w.closest(".product-card");
      var col = "";
      if (card) {
        var ab = card.querySelector("[data-add]");
        col = ab ? ab.dataset.color || "" : "";
      } else if (w.closest(".pd-info") || w.id === "pdWish") {
        col = pageColor();
      }
      if (col) {
        wishColor[id] = col;
        saveJSON(WCOL_KEY, wishColor);
      }
    },
    true,
  );

  renderWish = function () {
    var avail = PRODUCTS.length
      ? wishlist.filter(function (id) {
          return getProduct(id);
        })
      : wishlist;
    var count = $("#wishCount");
    if (count) count.textContent = avail.length;
    var dcount = $("#wishDrawerCount");
    if (dcount) dcount.textContent = avail.length;
    $$("[data-wish]").forEach(function (b) {
      var active = isWished(b.dataset.wish);
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
    var box = $("#wishItems");
    if (!box || !PRODUCTS.length) return;
    if (!avail.length) {
      box.innerHTML =
        '<p class="cart-empty">Your wishlist is empty.<br>Tap \u2665 on any product to save it here.</p>';
      return;
    }
    var btn =
      "width:26px;height:26px;border:1px solid #e4ddd2;border-radius:6px;background:transparent;color:inherit;cursor:pointer;font-weight:700;line-height:1;padding:0";
    box.innerHTML = avail
      .map(function (id) {
        var p = getProduct(id);
        if (!p) return "";
        var lv = lineView({ color: wishColor[id] || "" }, p);
        return (
          '<div class="cart-item"><img src="' +
          lv.image +
          '" alt="' +
          escA(p.name) +
          '"><div>' +
          "<strong>" +
          p.name +
          "</strong>" +
          "<small>" +
          money(p.price) +
          " \u00B7 " +
          escA(lv.color) +
          "</small>" +
          '<div style="display:flex;align-items:center;gap:8px;margin:6px 0">' +
          '<button type="button" style="' +
          btn +
          '" data-wish-dec="' +
          p.id +
          '" aria-label="Decrease quantity">\u2212</button>' +
          "<span>" +
          getWishQty(p.id) +
          "</span>" +
          '<button type="button" style="' +
          btn +
          '" data-wish-inc="' +
          p.id +
          '" aria-label="Increase quantity">+</button></div>' +
          '<div class="qty-row">' +
          '<button class="trash-btn" data-wish-del="' +
          p.id +
          '" aria-label="Remove from wishlist" title="Remove"><svg viewBox="0 0 24 24"><g class="t-lid"><path d="M3 6h18"/><path d="M9 6V4h6v2"/></g><path d="M5 6l1 14h12l1-14"/><path d="M10 11v6M14 11v6"/></svg></button>' +
          '<button class="btn btn-ghost" type="button" data-wish-add="' +
          p.id +
          '">Add to Cart</button></div>' +
          '</div><div class="line-total">' +
          money(p.price) +
          "</div></div>"
        );
      })
      .join("");
  };

  var st = document.createElement("style");
  st.textContent =
    ".ck-overlay:has(.order-pop){display:flex !important;align-items:center;justify-content:center;padding:14px;box-sizing:border-box}" +
    ".order-pop{position:relative !important;inset:auto !important;transform:none !important;margin:0 auto !important;box-sizing:border-box;max-width:440px;width:100%;max-height:90vh;overflow-y:auto;text-align:center}" +
    ".order-pop .ck-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}" +
    ".order-pop .ck-btn{flex:1 1 150px;min-width:0;white-space:normal}" +
    "@media (max-width:560px){.order-pop{padding:22px 16px !important}.order-pop .ck-actions{flex-direction:column}.order-pop .ck-btn{width:100%;flex:none;padding:13px 10px}}";
  document.head.appendChild(st);

  try {
    renderCart();
    renderCartPage();
    renderWish();
  } catch (e) {}
})();

(function () {
  function killOrderPopup() {
    document.querySelectorAll(".ck-overlay").forEach(function (o) {
      if (o.querySelector(".order-pop")) o.remove();
    });
    document.body.style.overflow = "";
  }

  document.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest("#rcCl") || t.id === "rcOverlay") {
        setTimeout(killOrderPopup, 0);
      }
    },
    true,
  );

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.getElementById("rcOverlay")) {
      setTimeout(killOrderPopup, 0);
    }
  });
})();

(function () {
  function fixCartPage() {
    var box = document.getElementById("cartPageItems");
    if (!box || !window.cart) return;
    var rows = box.querySelectorAll(".cart-item");
    var idx = 0;
    cart.forEach(function (i) {
      var row = rows[idx++];
      var p = getProduct(i.id);
      if (!row || !p) return;
      var vs = window.BRONX_VARIANTS && window.BRONX_VARIANTS[p.id];
      var v =
        vs && i.color
          ? vs.find(function (c) {
              return c.name === i.color;
            })
          : null;
      var img = row.querySelector("img");
      if (img && v && v.image) img.src = v.image;
      var metas = row.querySelectorAll(".ci-meta");
      if (metas[0] && i.color) metas[0].innerHTML = "<u>Color</u>: " + i.color;
    });
  }

  var _rcp = renderCartPage;
  renderCartPage = function () {
    _rcp();
    fixCartPage();
  };

  renderCartPage();
})();

(function () {
  try {
    var raw = loadJSON("bronx-cart", []);
    if (Array.isArray(raw)) {
      cart = raw
        .filter(function (i) {
          return i && i.id !== undefined && i.id !== null;
        })
        .map(function (i) {
          return {
            id: +i.id,
            qty: Math.max(1, +i.qty || 1),
            color: String(i.color || ""),
            image: String(i.image || ""),
          };
        });
    }
  } catch (e) {}

  function variantImg(id, color) {
    var vs = window.BRONX_VARIANTS && window.BRONX_VARIANTS[id];
    var v =
      vs && color
        ? vs.find(function (c) {
            return c.name === color;
          })
        : null;
    return (v && v.image) || "";
  }

  var _add = addToCart;
  addToCart = function (id, qty, src) {
    var r = _add.apply(this, arguments);
    try {
      id = +id;
      cart.forEach(function (i) {
        if (i.id === id && i.color && !i.image) {
          var img = variantImg(id, i.color);
          if (!img && src && src.closest) {
            var card = src.closest(".product-card");
            var el = card && card.querySelector(".product-media img");
            if (!el && src.closest(".pd-info, #pdViewer"))
              el = document.getElementById("pdImage");
            if (el) img = el.getAttribute("src") || "";
          }
          if (img) i.image = img;
        }
      });
      saveJSON("bronx-cart", cart);
      renderCart();
      renderCartPage();
    } catch (e) {}
    return r;
  };

  function applyImgs(sel, list) {
    var box = document.querySelector(sel);
    if (!box) return;
    box.querySelectorAll(".cart-item").forEach(function (row, k) {
      var i = list[k];
      if (!i || !i.image) return;
      var im = row.querySelector("img");
      if (im) im.setAttribute("src", i.image);
    });
  }
  var _rc = renderCart;
  renderCart = function () {
    _rc();
    applyImgs(
      "#cartItems",
      cart.filter(function (i) {
        return getProduct(i.id);
      }),
    );
  };
  var _rcp2 = renderCartPage;
  renderCartPage = function () {
    _rcp2();
    applyImgs("#cartPageItems", cart);
  };

  var _lv = window.lineView;
  if (typeof _lv === "function") {
    window.lineView = function (i, p) {
      var r = _lv(i, p);
      if (i && i.image) r.image = i.image;
      return r;
    };
  }

  try {
    renderCart();
    renderCartPage();
  } catch (e) {}

  var st = document.createElement("style");
  st.textContent =
    "body:has(#rcOverlay) .ck-overlay:has(.order-pop){display:none !important}";
  document.head.appendChild(st);

  var hadReceipt = false;
  new MutationObserver(function () {
    var open = !!document.getElementById("rcOverlay");
    if (open) {
      hadReceipt = true;
      return;
    }
    if (hadReceipt) {
      hadReceipt = false;
      setTimeout(function () {
        if (!document.querySelector(".ck-overlay .order-pop")) showOrderPopup();
      }, 150);
    }
  }).observe(document.body, { childList: true });
})();

(function () {
  if (window.BRONX_VARIANTS) return;
  try {
    var x = new XMLHttpRequest();
    x.open("GET", "js/colors.js", false);
    x.send();
    if (x.status === 200 || x.status === 0) {
      (0, eval)(x.responseText);
    }
  } catch (e) {}
})();

const heroVideo = document.querySelector(".hero video");
if (heroVideo) heroVideo.playbackRate = 0.3;

(function () {
  function initContact() {
    var section = document.getElementById("ctSection");
    if (!section) return;

    var start = function () {
      section.classList.add("play");
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) {
            start();
            io.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      io.observe(section);
    } else {
      start();
    }

    var form = document.getElementById("ctForm");
    var btn = document.getElementById("ctBtn");
    var status = document.getElementById("ctStatus");
    if (!form || !btn) return;

    // validation rules
    var rules = {
      ctName: function (v) {
        return v.trim().length >= 2 || "Please enter your name.";
      },
      ctEmail: function (v) {
        return (
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ||
          "Please enter a valid email address."
        );
      },
      ctPhone: function (v) {
        return (
          v.trim() === "" ||
          /^[+\d\s()-]{7,20}$/.test(v.trim()) ||
          "Enter a valid phone number."
        );
      },
      ctMsg: function (v) {
        return (
          v.trim().length >= 10 ||
          "Please write a little more (at least 10 characters)."
        );
      },
    };

    function check(id) {
      var input = document.getElementById(id);
      if (!input) return true;
      var field = input.closest(".ct-field");
      var res = rules[id](input.value);
      field.classList.toggle("err", res !== true);
      field.querySelector("small").textContent = res === true ? "" : res;
      return res === true;
    }

    Object.keys(rules).forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("blur", function () {
        check(id);
      });
      el.addEventListener("input", function () {
        if (el.closest(".ct-field").classList.contains("err")) check(id);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";

      var ok = Object.keys(rules).map(check).every(Boolean);
      if (!ok) {
        status.textContent = "Please fix the highlighted fields.";
        return;
      }

      btn.classList.add("loading");
      btn.querySelector("span").textContent = "Sending...";

      setTimeout(function () {
        form.reset();
        btn.classList.remove("loading");
        btn.querySelector("span").textContent = "SEND";
        if (typeof showContactPopup === "function") showContactPopup();
        else
          status.textContent =
            "Message sent! We will reply within one business day.";
      }, 900);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContact);
  } else {
    initContact();
  }
})();

(function () {
  var idx = 0,
    timer = null,
    lastLen = 0;

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
      go(1);
    }, 4500);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function layout() {
    var list = document.getElementById("feedbackList");
    if (!list) return;
    var stage = list.querySelector(".fbc-stage");
    if (!stage) return;
    var cards = stage.children,
      n = cards.length;
    var w = stage.clientWidth || window.innerWidth;
    var cardW = Math.min(440, w * 0.78);
    var unit = cardW * 0.62;
    for (var i = 0; i < n; i++) {
      var d = i - idx;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      var ad = Math.abs(d),
        c = cards[i];
      c.style.width = cardW + "px";
      if (ad > 2) {
        c.style.opacity = "0";
        c.style.pointerEvents = "none";
        c.style.zIndex = "0";
        c.style.transform = "translateX(-50%) scale(.7)";
        continue;
      }
      c.style.opacity = ad === 2 ? ".75" : "1";
      c.style.pointerEvents = "auto";
      c.style.zIndex = String(10 - ad);
      c.style.transform =
        "translateX(-50%) translateX(" +
        d * unit +
        "px) scale(" +
        (1 - ad * 0.12) +
        ")";
      c.style.filter =
        ad === 0 ? "none" : "brightness(" + (ad === 1 ? 0.82 : 0.7) + ")";
      c.classList.toggle("active", ad === 0);
    }
    var dots = list.querySelectorAll(".fbc-dot");
    for (var k = 0; k < dots.length; k++)
      dots[k].classList.toggle("on", k === idx);
  }

  function go(delta) {
    var n = getFeedback().length;
    if (!n) return;
    idx = (idx + delta + n) % n;
    layout();
  }

  function build() {
    var list = document.getElementById("feedbackList");
    if (!list) return;
    var data = getFeedback();
    clearInterval(timer);
    if (!data.length) {
      list.innerHTML = "";
      return;
    }
    if (data.length > lastLen && lastLen > 0) idx = 0;
    lastLen = data.length;
    if (idx >= data.length) idx = 0;

    var cards = data
      .map(function (f) {
        var ini = esc((f.name || "?").trim().charAt(0).toUpperCase());
        return (
          '<article class="fbc-card">' +
          '<span class="stars">' +
          stars(f.rating) +
          "</span>" +
          '<p class="fbc-text">\u201C' +
          esc(f.text) +
          "\u201D</p>" +
          '<div class="fbc-foot"><span class="fbc-av">' +
          ini +
          "</span>" +
          "<div><strong>" +
          esc(f.name) +
          "</strong><small>" +
          esc(f.date) +
          "</small></div></div>" +
          "</article>"
        );
      })
      .join("");

    var dots = data
      .map(function (_, i) {
        return (
          '<button type="button" class="fbc-dot" data-i="' +
          i +
          '" aria-label="Review ' +
          (i + 1) +
          '"></button>'
        );
      })
      .join("");

    var arrL = '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>';
    var arrR = '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';

    list.classList.add("fbc");
    list.innerHTML =
      '<div class="fbc-stage">' +
      cards +
      "</div>" +
      '<div class="fbc-nav">' +
      '<button type="button" class="fbc-btn" data-go="-1" aria-label="Previous">' +
      arrL +
      "</button>" +
      '<div class="fbc-dots">' +
      dots +
      "</div>" +
      '<button type="button" class="fbc-btn" data-go="1" aria-label="Next">' +
      arrR +
      "</button>" +
      "</div>";

    list.onclick = function (e) {
      var b = e.target.closest("[data-go]");
      if (b) {
        go(+b.dataset.go);
        resetTimer();
        return;
      }
      var dt = e.target.closest("[data-i]");
      if (dt) {
        idx = +dt.dataset.i;
        layout();
        resetTimer();
        return;
      }
      var card = e.target.closest(".fbc-card");
      if (card) {
        var all = Array.prototype.slice.call(card.parentNode.children);
        idx = all.indexOf(card);
        layout();
        resetTimer();
      }
    };

    var sx = 0;
    list.ontouchstart = function (e) {
      sx = e.touches[0].clientX;
    };
    list.ontouchend = function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    };

    var hover = false;
    list.onmouseenter = function () {
      hover = true;
    };
    list.onmouseleave = function () {
      hover = false;
    };
    timer = setInterval(function () {
      if (!hover) go(1);
    }, 4000);

    layout();
  }

  renderFeedback = build;
  document.addEventListener("DOMContentLoaded", build);
  window.addEventListener("load", build);
  window.addEventListener("resize", layout);
})();

(function () {
  function initReviewSlideshow() {
    const slides = document.querySelectorAll(".review-section .review-slide");

    if (slides.length !== 4) {
      console.error("Review slideshow: 4 images not found.");
      return;
    }

    let current = 0;

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === 0);

      slide.onerror = function () {
        console.error("Review image failed to load:", slide.src);
      };
    });

    setInterval(function () {
      slides[current].classList.remove("active");

      current = (current + 1) % slides.length;

      slides[current].classList.add("active");
    }, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReviewSlideshow);
  } else {
    initReviewSlideshow();
  }
})();

function cleanText(text) {
  return text
    .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "")
    .replace(/["“”«»]/g, "")
    .replace(/\s+[—–-]\s+/g, ", ")
    .replace(/^\s*[-*•]\s+/gm, "")
    .replace(/[*`#>~]/g, "")
    .replace(/ {2,}/g, " ");
}

function cleanNode(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      return n.parentElement && n.parentElement.closest("#rcOverlay")
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    },
  });
  let node;
  while ((node = walker.nextNode())) {
    const cleaned = cleanText(node.nodeValue);
    if (cleaned !== node.nodeValue) node.nodeValue = cleaned;
  }
}
cleanNode(document.body);

new MutationObserver(() => cleanNode(document.body)).observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
});

(function () {
  function moveMyReviews() {
    var box = document.getElementById("myReviews");
    var sec = document.querySelector(".review-section");
    if (!box || !sec) return;
    if (box.previousElementSibling !== sec) {
      sec.insertAdjacentElement("afterend", box);
    }
  }
  document.addEventListener("DOMContentLoaded", moveMyReviews);
  window.addEventListener("load", moveMyReviews);
  new MutationObserver(moveMyReviews).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();

// Reviews section scroll par animate ho
(function () {
  function initReviewReveal() {
    var section = document.querySelector(".review-section");
    if (!section) return;

    var start = function () {
      section.classList.add("play");
    };

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) {
            start();
            io.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      io.observe(section);
    } else {
      start();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReviewReveal);
  } else {
    initReviewReveal();
  }
})();
