// Netlify Function: create a Stripe Checkout Session from the cart.
// No npm dependencies — calls the Stripe REST API directly with fetch.
// The Stripe SECRET key is read from the STRIPE_SECRET_KEY environment
// variable (set in Netlify → Site configuration → Environment variables),
// so it never reaches the browser.

// Server-side price table (source of truth — prevents the client from
// tampering with prices). Amounts are in cents (AUD).
const PRICES = {
  "c1": {
    "name": "Royal Canin Persian Adult Dry Cat Food — 2kg",
    "amount": 3899
  },
  "c2": {
    "name": "Advance Sensitive Adult Dry Cat Food — 6kg",
    "amount": 8900
  },
  "c3": {
    "name": "Ziwi Peak Air-Dried Lamb Cat Food — 1kg",
    "amount": 5499
  },
  "c4": {
    "name": "Fancy Feast Royale Wet Cat Food Variety — 24pk",
    "amount": 2899
  },
  "c5": {
    "name": "Ziwi Peak Air-Dried Beef Cat Treats — 85g",
    "amount": 1999
  },
  "c6": {
    "name": "Dine Creamy Treats Tuna — 4pk",
    "amount": 649
  },
  "c7": {
    "name": "Snooza Orthopaedic Calming Cat Bed — M",
    "amount": 12999
  },
  "c8": {
    "name": "Catit Vesper Cat Tree Tower",
    "amount": 18900
  },
  "c9": {
    "name": "K&H Heated Window Perch",
    "amount": 7999
  },
  "c10": {
    "name": "Kong Cat Wobbler Interactive Toy",
    "amount": 2499
  },
  "c11": {
    "name": "Catit Senses 2.0 Circuit Ball Track",
    "amount": 3499
  },
  "c12": {
    "name": "PetSafe Bolt Automatic Laser Toy",
    "amount": 4499
  },
  "c13": {
    "name": "Breeder Celect Recycled Paper Cat Litter — 30L",
    "amount": 2499
  },
  "c14": {
    "name": "Catit Hooded Cat Litter Box",
    "amount": 4999
  },
  "c15": {
    "name": "Catit Pixi Smart Feeder — 3L",
    "amount": 8999
  },
  "c16": {
    "name": "Rogz Reflective Safety Cat Collar",
    "amount": 1299
  },
  "c17": {
    "name": "House of Whiskers Hand-Knit Cat Jumper",
    "amount": 2299
  },
  "d1": {
    "name": "Prime100 SPD Kangaroo & Pumpkin Roll — 2kg",
    "amount": 2699
  },
  "d2": {
    "name": "Black Hawk Adult Lamb & Rice Dry Food — 10kg",
    "amount": 10900
  },
  "d3": {
    "name": "Ivory Coat Grain-Free Chicken Dry Food — 13kg",
    "amount": 12999
  },
  "d4": {
    "name": "Ziwi Peak Air-Dried Beef Dog Food — 1kg",
    "amount": 5999
  },
  "d5": {
    "name": "Greenies Dental Chew Sticks — 28pk",
    "amount": 2299
  },
  "d6": {
    "name": "Ziwi Peak Venison Dog Treats — 85g",
    "amount": 1899
  },
  "d7": {
    "name": "Blackdog Peanut Butter Training Bites",
    "amount": 999
  },
  "d8": {
    "name": "Snooza Big Dog Sofa Bed — L",
    "amount": 15999
  },
  "d9": {
    "name": "Kazoo Cave Calming Dog Bed",
    "amount": 9999
  },
  "d10": {
    "name": "Kong Classic Rubber Dog Toy — L",
    "amount": 1999
  },
  "d11": {
    "name": "Chuckit Ultra Ball Launcher Set",
    "amount": 2999
  },
  "d12": {
    "name": "Kazoo Rope Tug Bundle — 3pk",
    "amount": 1699
  },
  "d13": {
    "name": "EzyDog Neo Classic Dog Collar",
    "amount": 2499
  },
  "d14": {
    "name": "Rogz Reflective Dog Lead — 1.8m",
    "amount": 2199
  },
  "d15": {
    "name": "Aussie Naturals Oatmeal Soothing Shampoo — 500ml",
    "amount": 1799
  },
  "d16": {
    "name": "FURminator Slicker Deshedding Brush",
    "amount": 3999
  }
};

const SHIPPING = {
  standard: { name: "Standard delivery (2–4 business days)", amount: 995 },
  express:  { name: "Express delivery (1–2 business days)",  amount: 1495 },
};
const FREE_OVER = 14900; // free standard shipping over $149

// Flatten nested params into Stripe's form-encoded format
function encode(obj, prefix, out) {
  out = out || [];
  for (const key in obj) {
    const val = obj[key];
    const k = prefix ? prefix + "[" + key + "]" : key;
    if (val !== null && typeof val === "object") encode(val, k, out);
    else out.push(encodeURIComponent(k) + "=" + encodeURIComponent(val));
  }
  return out;
}

export default async (request) => {
  if (request.method !== "POST")
    return new Response("Method not allowed", { status: 405 });

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret)
    return Response.json({ error: "not_configured" }, { status: 503 });

  let body;
  try { body = await request.json(); } catch { body = {}; }
  const items = Array.isArray(body.items) ? body.items : [];
  const shipMethod = SHIPPING[body.shipping] ? body.shipping : "standard";
  if (!items.length)
    return Response.json({ error: "empty_cart" }, { status: 400 });

  // Build line items from the trusted server-side price table
  const params = { mode: "payment", line_items: {} };
  let i = 0, subtotal = 0;
  for (const it of items) {
    const p = PRICES[it.id];
    const qty = Math.max(1, Math.min(99, parseInt(it.qty, 10) || 1));
    if (!p) continue;
    subtotal += p.amount * qty;
    params.line_items[i++] = {
      quantity: qty,
      price_data: {
        currency: "aud",
        unit_amount: p.amount,
        product_data: { name: p.name },
      },
    };
  }
  if (i === 0) return Response.json({ error: "no_valid_items" }, { status: 400 });

  // Shipping (free standard over the threshold)
  const ship = SHIPPING[shipMethod];
  const shipAmount = shipMethod === "standard" && subtotal >= FREE_OVER ? 0 : ship.amount;
  params.line_items[i++] = {
    quantity: 1,
    price_data: {
      currency: "aud",
      unit_amount: shipAmount,
      product_data: { name: shipAmount === 0 ? "Free standard delivery" : ship.name },
    },
  };

  const origin = request.headers.get("origin") || "https://houseofwhiskers.com.au";
  params.success_url = origin + "/confirmation.html?paid=1&session_id={CHECKOUT_SESSION_ID}";
  params.cancel_url  = origin + "/cart.html?cancelled=1";
  params.shipping_address_collection = { allowed_countries: { 0: "AU" } };
  params.automatic_tax = { enabled: false };

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encode(params).join("&"),
  });
  const data = await res.json();
  if (!res.ok) {
    return Response.json(
      { error: "stripe_error", detail: data.error ? data.error.message : "unknown" },
      { status: 502 }
    );
  }
  return Response.json({ url: data.url });
};
