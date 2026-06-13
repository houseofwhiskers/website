/* ════════════════════════════════════════════════════════════
   HOUSE OF WHISKERS — shared app script
   Catalog • persistent cart • injected header/footer/drawer
   ════════════════════════════════════════════════════════════ */
(function () {
"use strict";

/* ── CATEGORY NAV ─────────────────────────────────────────── */
const CATS = {
  cats: [
    { key: "nutrition",   label: "Premium Nutrition" },
    { key: "treats",      label: "Treats & Chews" },
    { key: "beds",        label: "Beds & Retreats" },
    { key: "toys",        label: "Toys & Enrichment" },
    { key: "litter",      label: "Litter & Hygiene" },
    { key: "accessories", label: "Accessories" },
  ],
  dogs: [
    { key: "nutrition",   label: "Premium Nutrition" },
    { key: "treats",      label: "Treats & Chews" },
    { key: "beds",        label: "Beds & Resting" },
    { key: "toys",        label: "Toys & Enrichment" },
    { key: "accessories", label: "Collars & Leads" },
    { key: "grooming",    label: "Grooming" },
  ],
};

/* ── CATALOG ──────────────────────────────────────────────── */
const CATALOG = [
  // CATS
  { id:"c1",  pet:"cats", cat:"nutrition", emoji:"🐟", brand:"Royal Canin", name:"Persian Adult Dry Cat Food — 2kg", price:38.99, was:null,   r:4.9, rv:843,  badge:null,      bt:null,   desc:"A breed-specific formula shaped for the Persian jaw, supporting skin, coat and easy digestion." },
  { id:"c2",  pet:"cats", cat:"nutrition", emoji:"🌿", brand:"Advance", name:"Sensitive Adult Dry Cat Food — 6kg", price:89.00, was:134.99, r:4.8, rv:291,  badge:"Sale",    bt:"rose", desc:"Single novel-protein recipe for cats with delicate tummies. Salmon, rice and not much else." },
  { id:"c3",  pet:"cats", cat:"nutrition", emoji:"🥩", brand:"Ziwi Peak", name:"Air-Dried Lamb Cat Food — 1kg", price:54.99, was:null,   r:4.8, rv:210,  badge:"Premium", bt:"dark", desc:"Gently air-dried free-range lamb. Ninety-two percent meat, organs and bone — nothing it can't pronounce." },
  { id:"c4",  pet:"cats", cat:"nutrition", emoji:"🥫", brand:"Fancy Feast", name:"Royale Wet Cat Food Variety — 24pk", price:28.99, was:null,   r:4.6, rv:612,  badge:null,      bt:null,   desc:"Twenty-four tins of small-batch, gravy-forward indulgence. Served, naturally, on demand." },
  { id:"c5",  pet:"cats", cat:"treats", emoji:"🦴", brand:"Ziwi Peak", name:"Air-Dried Beef Cat Treats — 85g", price:19.99, was:null,   r:4.8, rv:521,  badge:null,      bt:null,   desc:"One ingredient. That's the whole pitch. Grass-fed beef, air-dried, irrationally beloved." },
  { id:"c6",  pet:"cats", cat:"treats", emoji:"🍥", brand:"Dine", name:"Creamy Treats Tuna — 4pk", price:6.49,  was:null,   r:4.7, rv:388,  badge:"New",     bt:"dark", desc:"Lickable tuna purée in single-serve tubes. The fastest way to a cat's grudging affection." },
  { id:"c7",  pet:"cats", cat:"beds", emoji:"🛏️", brand:"Snooza", name:"Orthopaedic Calming Cat Bed — M", price:129.99,was:179.99, r:4.7, rv:389,  badge:"Sale",    bt:"rose", desc:"A memory-foam base wrapped in a raised, faux-fur rim. Engineered for the eighteen-hour workday." },
  { id:"c8",  pet:"cats", cat:"beds", emoji:"🐈", brand:"Catit", name:"Vesper Cat Tree Tower", price:189.00,was:null,   r:4.6, rv:142,  badge:null,      bt:null,   desc:"Walnut veneer, sisal scratch posts and a top-deck cushion. Furniture that earns its floor space." },
  { id:"c9",  pet:"cats", cat:"beds", emoji:"🌞", brand:"K&H", name:"Heated Window Perch", price:79.99, was:null,   r:4.5, rv:98,   badge:null,      bt:null,   desc:"A suction-mounted sunbeam with a gentle internal warmer. Prime real estate, now climate-controlled." },
  { id:"c10", pet:"cats", cat:"toys", emoji:"🎯", brand:"Kong", name:"Cat Wobbler Interactive Toy", price:24.99, was:null,   r:4.9, rv:672,  badge:"New",     bt:"dark", desc:"A treat-dispensing wobble toy that turns dinner into a problem worth solving." },
  { id:"c11", pet:"cats", cat:"toys", emoji:"🌀", brand:"Catit", name:"Senses 2.0 Circuit Ball Track", price:34.99, was:null,   r:4.7, rv:254,  badge:null,      bt:null,   desc:"A modular ball circuit they'll bat at for hours — and you'll re-route just to feel clever." },
  { id:"c12", pet:"cats", cat:"toys", emoji:"🔴", brand:"PetSafe", name:"Bolt Automatic Laser Toy", price:44.99, was:null,   r:4.4, rv:131,  badge:null,      bt:null,   desc:"A randomised laser that does the chasing for you. Fifteen-minute auto shut-off included." },
  { id:"c13", pet:"cats", cat:"litter", emoji:"🪨", brand:"Breeder Celect", name:"Recycled Paper Cat Litter — 30L", price:24.99, was:null,   r:4.8, rv:430,  badge:"Eco",     bt:"leaf", desc:"Highly absorbent recycled-paper pellets. Low dust, low tracking, low drama." },
  { id:"c14", pet:"cats", cat:"litter", emoji:"🚽", brand:"Catit", name:"Hooded Cat Litter Box", price:49.99, was:null,   r:4.6, rv:176,  badge:null,      bt:null,   desc:"A roomy hooded box with a carbon filter and swing door. Privacy for them, less mess for you." },
  { id:"c15", pet:"cats", cat:"accessories", emoji:"🍽️", brand:"Catit", name:"Pixi Smart Feeder — 3L", price:89.99, was:null,   r:4.5, rv:214,  badge:null,      bt:null,   desc:"App-scheduled portions with a six-meal hopper. Breakfast at 5am, without you being awake for it." },
  { id:"c16", pet:"cats", cat:"accessories", emoji:"🎀", brand:"Rogz", name:"Reflective Safety Cat Collar", price:12.99, was:null,   r:4.7, rv:289,  badge:null,      bt:null,   desc:"A breakaway buckle and reflective stitching. Style with a built-in escape clause." },
  { id:"c17", pet:"cats", cat:"accessories", emoji:"🧶", brand:"House of Whiskers", name:"Hand-Knit Cat Jumper", price:22.99, was:null,   r:4.5, rv:77,   badge:null,      bt:null,   desc:"Merino-blend knit for the discerning, faintly outraged cat. Worn briefly, photographed forever." },

  // DOGS
  { id:"d1",  pet:"dogs", cat:"nutrition", emoji:"🍗", brand:"Prime100", name:"SPD Kangaroo & Pumpkin Roll — 2kg", price:26.99, was:null,   r:4.8, rv:1166, badge:"Au Made", bt:"leaf", desc:"Single-protein, single-veg fresh roll for sensitive dogs. Australian kangaroo, gently cooked." },
  { id:"d2",  pet:"dogs", cat:"nutrition", emoji:"🌾", brand:"Black Hawk", name:"Adult Lamb & Rice Dry Food — 10kg", price:109.00,was:129.00, r:4.8, rv:720,  badge:"Sale",    bt:"rose", desc:"A complete everyday kibble with real lamb, rice and no artificial anything." },
  { id:"d3",  pet:"dogs", cat:"nutrition", emoji:"🐔", brand:"Ivory Coat", name:"Grain-Free Chicken Dry Food — 13kg", price:129.99,was:null,   r:4.7, rv:355,  badge:null,      bt:null,   desc:"Grain-free chicken with chickpeas, coconut oil and Aussie-grown botanicals." },
  { id:"d4",  pet:"dogs", cat:"nutrition", emoji:"🥩", brand:"Ziwi Peak", name:"Air-Dried Beef Dog Food — 1kg", price:59.99, was:null,   r:4.9, rv:280,  badge:"Premium", bt:"dark", desc:"Ninety-six percent beef, organs and bone. Calorie-dense, ridiculously palatable." },
  { id:"d5",  pet:"dogs", cat:"treats", emoji:"🦷", brand:"Greenies", name:"Dental Chew Sticks — 28pk", price:22.99, was:null,   r:4.7, rv:540,  badge:null,      bt:null,   desc:"Chewy texture that scrubs as they gnaw. Vet-favourite for the under-the-couch breath." },
  { id:"d6",  pet:"dogs", cat:"treats", emoji:"🦴", brand:"Ziwi Peak", name:"Venison Dog Treats — 85g", price:18.99, was:null,   r:4.8, rv:301,  badge:null,      bt:null,   desc:"Air-dried free-range venison. A high-value reward for when 'sit' actually happens." },
  { id:"d7",  pet:"dogs", cat:"treats", emoji:"🥜", brand:"Blackdog", name:"Peanut Butter Training Bites", price:9.99,  was:null,   r:4.6, rv:212,  badge:"New",     bt:"dark", desc:"Small, soft, low-cal bites built for rapid-fire training. Tail-wag guaranteed." },
  { id:"d8",  pet:"dogs", cat:"beds", emoji:"🛋️", brand:"Snooza", name:"Big Dog Sofa Bed — L", price:159.99,was:199.99, r:4.8, rv:410,  badge:"Sale",    bt:"rose", desc:"A bolstered foam sofa with a washable cover. The good couch, finally, for them." },
  { id:"d9",  pet:"dogs", cat:"beds", emoji:"🏠", brand:"Kazoo", name:"Cave Calming Dog Bed", price:99.99, was:null,   r:4.6, rv:188,  badge:null,      bt:null,   desc:"A hooded nest for burrowers and the gently anxious. Plush, enveloping, instantly claimed." },
  { id:"d10", pet:"dogs", cat:"toys", emoji:"🟥", brand:"Kong", name:"Classic Rubber Dog Toy — L", price:19.99, was:null,   r:4.9, rv:1320, badge:null,      bt:null,   desc:"The indestructible original. Stuff it, freeze it, and reclaim your afternoon." },
  { id:"d11", pet:"dogs", cat:"toys", emoji:"🎾", brand:"Chuckit", name:"Ultra Ball Launcher Set", price:29.99, was:null,   r:4.8, rv:654,  badge:null,      bt:null,   desc:"A high-bounce ball plus launcher for no-bend, long-throw fetch. Your shoulder thanks you." },
  { id:"d12", pet:"dogs", cat:"toys", emoji:"🪢", brand:"Kazoo", name:"Rope Tug Bundle — 3pk", price:16.99, was:null,   r:4.5, rv:143,  badge:null,      bt:null,   desc:"Chunky cotton ropes for tug, toss and dental floss-by-stealth." },
  { id:"d13", pet:"dogs", cat:"accessories", emoji:"🦮", brand:"EzyDog", name:"Neo Classic Dog Collar", price:24.99, was:null,   r:4.7, rv:276,  badge:null,      bt:null,   desc:"A neoprene-lined collar that's soft, waterproof and quietly very tough." },
  { id:"d14", pet:"dogs", cat:"accessories", emoji:"🔗", brand:"Rogz", name:"Reflective Dog Lead — 1.8m", price:21.99, was:null,   r:4.7, rv:198,  badge:null,      bt:null,   desc:"A reflective webbing lead with a padded handle for the dark-o'clock walks." },
  { id:"d15", pet:"dogs", cat:"grooming", emoji:"🧴", brand:"Aussie Naturals", name:"Oatmeal Soothing Shampoo — 500ml", price:17.99, was:null,   r:4.6, rv:233,  badge:null,      bt:null,   desc:"Colloidal oatmeal and aloe for itchy skin and that just-groomed cloud of smug." },
  { id:"d16", pet:"dogs", cat:"grooming", emoji:"🧹", brand:"FURminator", name:"Slicker Deshedding Brush", price:39.99, was:null,   r:4.8, rv:489,  badge:null,      bt:null,   desc:"Reaches the undercoat to lift loose fur before it lifts your sofa. Eerily satisfying." },
];

/* ── HELPERS ──────────────────────────────────────────────── */
const money = (n) => "$" + Number(n).toFixed(2);
const memberSaveStr = (p) => "Members save " + money(p.price * 0.10);
const findProduct = (id) => CATALOG.find((p) => p.id === id);
const qp = (k) => new URLSearchParams(location.search).get(k);
const catLabel = (pet, key) => ((CATS[pet] || []).find((c) => c.key === key) || {}).label || key;

/* ── CART (localStorage) ──────────────────────────────────── */
const CART_KEY = "how_cart_v1";
function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); renderDrawer(); }
function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
function cartSubtotal() { return getCart().reduce((s, i) => { const p = findProduct(i.id); return s + (p ? p.price * i.qty : 0); }, 0); }
function cartMemberSave() { return getCart().reduce((s, i) => { const p = findProduct(i.id); return s + (p ? p.price * 0.10 * i.qty : 0); }, 0); }
function addToCart(id, qty) {
  qty = qty || 1;
  const c = getCart();
  const e = c.find((x) => x.id === id);
  if (e) e.qty += qty; else c.push({ id: id, qty: qty });
  saveCart(c);
  const p = findProduct(id);
  toast('"' + (p ? p.brand : "Item") + '" added to cart');
  openCart();
}
function setQty(id, qty) {
  let c = getCart();
  const e = c.find((x) => x.id === id);
  if (!e) return;
  e.qty = qty;
  if (e.qty <= 0) c = c.filter((x) => x.id !== id);
  saveCart(c);
}
function removeFromCart(id) { saveCart(getCart().filter((x) => x.id !== id)); }
function clearCart() { localStorage.removeItem(CART_KEY); updateCartCount(); renderDrawer(); }
function updateCartCount() {
  const n = cartCount();
  document.querySelectorAll(".cart-count").forEach((b) => {
    b.textContent = n; b.classList.toggle("on", n > 0);
  });
}

/* ── PRODUCT CARD (shared) ────────────────────────────────── */
function productCard(p) {
  return (
    '<div class="pcard">' +
      (p.badge ? '<span class="pbadge ' + (p.bt || "dark") + '">' + p.badge + "</span>" : "") +
      '<button class="pwish" onclick="event.stopPropagation();HOW.toast(\'Saved to Wishlist\')">♡</button>' +
      '<a href="product.html?id=' + p.id + '" style="display:block">' +
        '<div class="pimg">' + p.emoji + "</div>" +
      "</a>" +
      '<div class="pbody">' +
        '<div class="pbrand">' + p.brand + "</div>" +
        '<a href="product.html?id=' + p.id + '"><div class="pname">' + p.name + "</div></a>" +
        '<div class="pstars">' +
          '<span class="stars-row">' + "★".repeat(Math.round(p.r)) + "☆".repeat(5 - Math.round(p.r)) + "</span>" +
          '<span class="rcount">' + p.r + " (" + p.rv.toLocaleString() + ")</span>" +
        "</div>" +
        '<div class="pprice">' +
          '<span class="price-now">' + money(p.price) + "</span>" +
          (p.was ? '<span class="price-was">' + money(p.was) + "</span>" : "") +
          '<span class="price-save">' + memberSaveStr(p) + "</span>" +
        "</div>" +
        '<button class="btn-add" onclick="HOW.add(\'' + p.id + '\')">Add to Cart</button>' +
      "</div>" +
    "</div>"
  );
}
function renderGrid(el, list) {
  if (!el) return;
  el.innerHTML = list.length
    ? list.map(productCard).join("")
    : '<div class="empty-state" style="grid-column:1/-1"><div class="es-icon">🔍</div><p>No products found. <a href="shop.html" style="color:var(--sand-dk);text-decoration:underline">Browse the full store</a>.</p></div>';
}

/* ── CHROME (header / footer / drawer / toast) ────────────── */
function navDropdown(pet) {
  return (
    '<div class="drop">' +
      '<div class="drop-head">Shop by need</div>' +
      CATS[pet].map((c) => '<a href="shop.html?pet=' + pet + '&cat=' + c.key + '">' + c.label + "</a>").join("") +
      "<hr/>" +
      '<a href="shop.html?pet=' + pet + '">View all ' + (pet === "cats" ? "Cat" : "Dog") + " products</a>" +
    "</div>"
  );
}

function headerHTML(active) {
  const on = (k) => (active === k ? ' style="color:var(--ink)"' : "");
  return (
    '<div class="announce"><strong>Free delivery</strong> on orders over $149 &nbsp;·&nbsp; <a href="club.html">Join The Whisker Club — free membership</a></div>' +
    '<div class="util-bar">' +
      '<div class="util-left"><span>🐾 <a href="about.html">Australia\'s online store for cats &amp; dogs</a></span></div>' +
      '<div class="util-right">' +
        '<span><span class="util-pill">Whisker Club</span>&nbsp; Members save up to 10% every day</span>' +
        '<a href="account.html?view=signin">Sign In</a>' +
        '<a href="club.html">Join Free</a>' +
      "</div>" +
    "</div>" +
    '<header class="site-header"><div class="header-inner">' +
      '<a href="index.html" class="logo"><div class="logo-mark">🐾</div><div class="logo-text">' +
        '<span class="logo-top">House of Whiskers</span><span class="logo-sub">houseofwhiskers.com.au</span></div></a>' +
      '<button class="hamburger" id="hambBtn" aria-label="Menu"><span></span><span></span><span></span></button>' +
      "<nav><ul class=\"main-nav\">" +
        '<li><a href="shop.html?pet=cats"' + on("cats") + ">Cats</a>" + navDropdown("cats") + "</li>" +
        '<li><a href="shop.html?pet=dogs"' + on("dogs") + ">Dogs</a>" + navDropdown("dogs") + "</li>" +
        '<li><a href="shop.html"' + on("shop") + '>Shop All</a></li>' +
        '<li><a href="journal.html"' + on("journal") + '>Journal</a>' +
          '<div class="drop"><a href="journal.html">All articles</a><a href="about.html">Our Story</a><a href="club.html">Whisker Club</a></div></li>' +
      "</ul></nav>" +
      '<div class="header-actions">' +
        '<form class="search-box" role="search" onsubmit="return HOW.search(event)">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' +
          '<input id="siteSearch" type="search" placeholder="Search the store…" autocomplete="off" />' +
        "</form>" +
        '<button class="icon-btn" onclick="HOW.openCart()" aria-label="Cart">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' +
          '<span class="cart-count">0</span></button>' +
        '<a class="icon-btn" href="account.html" aria-label="Account">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></a>' +
      "</div>" +
    "</div></header>" +
    // mobile nav
    '<div class="mob-ov" id="mobOv"></div>' +
    '<nav class="mob-nav" id="mobNav"><div class="mob-logo">House of Whiskers</div>' +
      '<a href="shop.html?pet=cats">Cats</a><a href="shop.html?pet=dogs">Dogs</a>' +
      '<a href="shop.html">Shop All</a><a href="journal.html">Journal</a>' +
      '<a href="club.html">Whisker Club</a><a href="about.html">Our Story</a>' +
      '<a href="account.html">My Account</a><a href="cart.html">Cart</a></nav>'
  );
}

function footerHTML() {
  const col = (pet, title) =>
    '<div class="foot-col"><h4>' + title + "</h4><ul>" +
      CATS[pet].map((c) => '<li><a href="shop.html?pet=' + pet + "&cat=" + c.key + '">' + c.label + "</a></li>").join("") +
    "</ul></div>";
  return (
    "<footer><div class=\"foot-inner\"><div class=\"foot-top\">" +
      '<div class="foot-brand"><div class="foot-logo">House of Whiskers</div>' +
        '<div class="foot-url">houseofwhiskers.com.au</div>' +
        '<p class="foot-tagline">Australia\'s most curated online store for cats and dogs. Premium food, beds, toys and accessories — delivered to your door.</p>' +
        '<div class="socials"><a href="https://www.instagram.com/houseofwhiskers1" class="sbtn" target="_blank">📸</a>' +
          '<a href="#" class="sbtn">f</a><a href="#" class="sbtn">𝕏</a><a href="#" class="sbtn">▶</a></div></div>' +
      col("cats", "Shop Cats") +
      col("dogs", "Shop Dogs") +
      '<div class="foot-col"><h4>Help</h4><ul>' +
        '<li><a href="help.html">Delivery &amp; Returns</a></li><li><a href="account.html">Track My Order</a></li>' +
        '<li><a href="help.html">Repeat Delivery</a></li><li><a href="help.html">Price Match</a></li>' +
        '<li><a href="contact.html">Contact Us</a></li><li><a href="help.html">FAQs</a></li></ul></div>' +
      '<div class="foot-col"><h4>About</h4><ul>' +
        '<li><a href="about.html">Our Story</a></li><li><a href="about.html">Sustainability</a></li>' +
        '<li><a href="contact.html">Careers</a></li><li><a href="journal.html">Journal</a></li>' +
        '<li><a href="club.html">Whisker Club</a></li></ul></div>' +
    "</div><div class=\"foot-bottom\">" +
      "<div>© 2026 House of Whiskers Pty Ltd · ABN 12 345 678 901 · All rights reserved.</div>" +
      '<div class="foot-legal"><a href="legal.html?doc=privacy">Privacy Policy</a><a href="legal.html?doc=terms">Terms of Use</a>' +
        '<a href="legal.html?doc=accessibility">Accessibility</a><a href="legal.html?doc=cookies">Cookie Preferences</a></div>' +
    "</div></div></footer>"
  );
}

function drawerHTML() {
  return (
    '<div class="cart-overlay" id="cartOv"></div>' +
    '<div class="cart-drawer" id="cartDrawer">' +
      '<div class="cart-hd"><h3>Your Cart</h3><button class="cart-x" onclick="HOW.closeCart()">×</button></div>' +
      '<div class="cart-bd" id="cartBd"></div>' +
      '<div class="cart-ft" id="cartFt" style="display:none">' +
        '<div class="cart-total-row"><span class="ct-lbl">Subtotal</span><span class="ct-val" id="cartTot">$0.00</span></div>' +
        '<a class="btn-chk" href="checkout.html" style="display:block;text-align:center;text-decoration:none">Checkout</a>' +
        '<a class="btn-cont" href="cart.html" style="display:block;text-align:center;text-decoration:none">View Cart</a>' +
      "</div>" +
    "</div>" +
    '<div class="toast" id="toast"></div>'
  );
}

function renderDrawer() {
  const bd = document.getElementById("cartBd");
  const ft = document.getElementById("cartFt");
  if (!bd) return;
  const cart = getCart();
  if (!cart.length) {
    bd.innerHTML = '<div class="cart-empty-s"><div class="ci">🛒</div><p>Your cart is empty.<br><small>Add something exceptional.</small></p></div>';
    if (ft) ft.style.display = "none";
    return;
  }
  bd.innerHTML = cart.map((it) => {
    const p = findProduct(it.id);
    if (!p) return "";
    return (
      '<div class="ci-row">' +
        '<div class="ci-thumb">' + p.emoji + "</div>" +
        '<div class="ci-info">' +
          '<div class="ci-name">' + p.brand + " " + p.name.split("—")[0].trim() + "</div>" +
          '<div class="ci-price">' + money(p.price) + "</div>" +
          '<div class="ci-qty">' +
            '<button class="qbtn" onclick="HOW.setQty(\'' + p.id + "'," + (it.qty - 1) + ')">−</button>' +
            '<span class="qn">' + it.qty + "</span>" +
            '<button class="qbtn" onclick="HOW.setQty(\'' + p.id + "'," + (it.qty + 1) + ')">+</button>' +
            '<span class="ci-rm" onclick="HOW.remove(\'' + p.id + '\')">Remove</span>' +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }).join("");
  document.getElementById("cartTot").textContent = money(cartSubtotal());
  if (ft) ft.style.display = "block";
}

function openCart() { const d = document.getElementById("cartDrawer"), o = document.getElementById("cartOv"); if (d) { renderDrawer(); d.classList.add("on"); o.classList.add("on"); document.body.style.overflow = "hidden"; } }
function closeCart() { const d = document.getElementById("cartDrawer"), o = document.getElementById("cartOv"); if (d) { d.classList.remove("on"); o.classList.remove("on"); document.body.style.overflow = ""; } }

/* ── TOAST ────────────────────────────────────────────────── */
let tTimer;
function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg; el.classList.add("on");
  clearTimeout(tTimer);
  tTimer = setTimeout(() => el.classList.remove("on"), 2800);
}

/* ── SEARCH ───────────────────────────────────────────────── */
function search(e) {
  e.preventDefault();
  const v = (document.getElementById("siteSearch").value || "").trim();
  location.href = "shop.html?q=" + encodeURIComponent(v);
  return false;
}
function searchCatalog(q) {
  q = (q || "").toLowerCase();
  return CATALOG.filter((p) => (p.name + " " + p.brand + " " + p.cat).toLowerCase().includes(q));
}

/* ── MOUNT ────────────────────────────────────────────────── */
function mountChrome(active) {
  const top = document.getElementById("site-top");
  const bot = document.getElementById("site-bottom");
  if (top) top.innerHTML = headerHTML(active);
  if (bot) bot.innerHTML = footerHTML();
  document.body.insertAdjacentHTML("beforeend", drawerHTML());

  const hb = document.getElementById("hambBtn");
  if (hb) hb.addEventListener("click", () => {
    document.getElementById("mobNav").classList.toggle("on");
    document.getElementById("mobOv").classList.toggle("on");
  });
  const mo = document.getElementById("mobOv");
  if (mo) mo.addEventListener("click", () => {
    document.getElementById("mobNav").classList.remove("on");
    mo.classList.remove("on");
  });
  const co = document.getElementById("cartOv");
  if (co) co.addEventListener("click", closeCart);

  // preset search box from query
  const q = qp("q");
  const sb = document.getElementById("siteSearch");
  if (sb && q) sb.value = q;

  updateCartCount();
  renderDrawer();
}

/* ── PUBLIC API ───────────────────────────────────────────── */
window.HOW = {
  CATALOG, CATS,
  money, memberSaveStr, findProduct, qp, catLabel,
  getCart, cartCount, cartSubtotal, cartMemberSave,
  add: addToCart, setQty, remove: removeFromCart, clearCart,
  productCard, renderGrid, searchCatalog,
  openCart, closeCart, toast, search,
  mountChrome,
};
})();
