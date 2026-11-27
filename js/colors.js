console.log("COLORS FILE V5 RUNNING");
(function () {
  var VARIANTS = {};

  VARIANTS[1] = [
    { name: "Navy Blue", hex: "#1f3864", image: "assets/img/p01-atlas-28.jpg" },
    {
      name: "White",
      hex: "#f2f0eb",
      image: "assets/img/p03-atlas-28-white.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p04-atlas-28-black.jpg",
    },
    {
      name: "Pastel Pink",
      hex: "#f4c2d0",
      image: "assets/img/p02-atlas-28-pink.jpg",
    },
    {
      name: "Silver Grey",
      hex: "#b8bcc4",
      image: "assets/img/p05-atlas-28-silver.jpg",
    },
  ];

  VARIANTS[2] = [
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p01-winfield-28-navy.jpg",
    },
    {
      name: "White",
      hex: "#f2f0eb",
      image: "assets/img/p02-winfield-28-white.jpg",
    },
    {
      name: "Dark Emerald Green",
      hex: "#0b5d3b",
      image: "assets/img/p03-winfield-28-emerald.jpg",
    },
    {
      name: "Glossy Charcoal Grey",
      hex: "#36454f",
      image: "assets/img/p04-winfield-28-charcoal.jpg",
    },
    { name: "Black", hex: "#151515", image: "assets/img/p05-winfield-28.jpg" },
  ];

  VARIANTS[4] = [
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p01-helium-25-burgundy.jpg",
    },
    {
      name: "Pure White",
      hex: "#ffffff",
      image: "assets/img/p02-helium-25-white.jpg",
    },
    {
      name: "Royal Blue",
      hex: "#2a4fd6",
      image: "assets/img/p03-helium-25-royal.jpg",
    },
    {
      name: "Chocolate Brown",
      hex: "#4a2c1a",
      image: "assets/img/p04-helium-25-brown.jpg",
    },
    { name: "Teal", hex: "#1f7a7a", image: "assets/img/p05-helium-25.jpg" },
  ];

  VARIANTS[3] = [
    {
      name: "Rose Gold",
      hex: "#b76e79",
      image: "assets/img/p01-moonlight-24.jpg",
    },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p02-moonlight-24-navy.jpg",
    },
    {
      name: "Glossy Black",
      hex: "#111111",
      image: "assets/img/p03-moonlight-24-black.jpg",
    },
    {
      name: "Light Lavender",
      hex: "#c8b6e2",
      image: "assets/img/p04-moonlight-24-lavender.jpg",
    },
    {
      name: "Light Blue",
      hex: "#a7c7e7",
      image: "assets/img/p05-moonlight-24-lightblue.jpg",
    },
  ];

  VARIANTS[5] = [
    {
      name: "Mushroom Taupe",
      hex: "#a89888",
      image: "assets/img/p01-metro-tote.jpg",
    },
    {
      name: "Camel Brown",
      hex: "#b5651d",
      image: "assets/img/p02-metro-tote.jpg",
    },
    {
      name: "Deep Teal",
      hex: "#0f5257",
      image: "assets/img/p03-metro-tote-teal.jpg",
    },
    {
      name: "Deep Burgundy",
      hex: "#5c1020",
      image: "assets/img/p04-metro-tote-burgundy.jpg",
    },
    { name: "Tan", hex: "#d2b48c", image: "assets/img/p05-metro-tote-tan.jpg" },
  ];

  VARIANTS[20] = [
    { name: "Yellow", hex: "#f9d423", image: "assets/img/p1-kids-dino.jpg" },
    {
      name: "Sky Blue",
      hex: "#87ceeb",
      image: "assets/img/p2-kids-dino-skyblue.jpg",
    },
    {
      name: "Soft Pink",
      hex: "#f8c8dc",
      image: "assets/img/p3-kids-dino-pink.jpg",
    },
    {
      name: "Mint Green",
      hex: "#98e0c0",
      image: "assets/img/p4-kids-dino-mint.jpg",
    },
    {
      name: "Lavender",
      hex: "#c8b6e2",
      image: "assets/img/p5-kids-dino-lavender.jpg",
    },
    {
      name: "Peach",
      hex: "#ffcba4",
      image: "assets/img/p6-kids-dino-peach.jpg",
    },
  ];

  VARIANTS[6] = [
    { name: "Grey", hex: "#8a8d91", image: "assets/img/p01-weekender.jpg" },
    {
      name: "Moss Green",
      hex: "#6b7a3a",
      image: "assets/img/p02-weekender-moss.jpg",
    },
    {
      name: "Clay",
      hex: "#b5694a",
      image: "assets/img/p03-weekender-clay.jpg",
    },
    {
      name: "Glacier Blue",
      hex: "#a9d4e8",
      image: "assets/img/p04-weekender-glacier.jpg",
    },
    {
      name: "Ivory",
      hex: "#f5f0e1",
      image: "assets/img/p05-weekender-ivory.jpg",
    },
  ];

  VARIANTS[7] = [
    { name: "Raw Silk", hex: "#d9c9a3", image: "assets/img/p01-messenger.jpg" },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p02-messenger-oldrose.jpg",
    },
    {
      name: "Rose Wood",
      hex: "#65000b",
      image: "assets/img/p03-messenger-rosewood.jpg",
    },
    {
      name: "Moonlit Teal",
      hex: "#2f6f73",
      image: "assets/img/p04-messenger-teal.jpg",
    },
    {
      name: "Purple",
      hex: "#6a3d9a",
      image: "assets/img/p05-messenger-purple.jpg",
    },
    {
      name: "Olive",
      hex: "#6b6b2f",
      image: "assets/img/p06-messenger-olive.jpg",
    },
  ];

  VARIANTS[9] = [
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p01-trail-backpack.jpg",
    },
    {
      name: "Dusty Salmon",
      hex: "#e0958a",
      image: "assets/img/p02-trail-backpack-salmon.jpg",
    },
    {
      name: "Almond Brown",
      hex: "#a67b5b",
      image: "assets/img/p03-trail-backpack-almond.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p04-trail-backpack-olive.jpg",
    },
    {
      name: "Mahogany",
      hex: "#4a1c13",
      image: "assets/img/p05-trail-backpack-mahogany.jpg",
    },
    {
      name: "Bluebell",
      hex: "#6c7fd1",
      image: "assets/img/p06-trail-backpack-bluebell.jpg",
    },
  ];

  VARIANTS[18] = [
    {
      name: "Green",
      hex: "#2f4f2f",
      image: "assets/img/p1-weekender-canvas.jpg",
    },
    {
      name: "Mahogany",
      hex: "#4a1c13",
      image: "assets/img/p2-weekender-canvas-mahogany.jpg",
    },
    {
      name: "Muted Terracotta",
      hex: "#c0785a",
      image: "assets/img/p3-weekender-canvas-terracotta.jpg",
    },
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p4-weekender-canvas-twilight.jpg",
    },
    {
      name: "Sand Stone",
      hex: "#cdbfa3",
      image: "assets/img/p5-weekender-canvas-sandstone.jpg",
    },
  ];

  VARIANTS[24] = [
    {
      name: "Apricot Cream",
      hex: "#fbd5b5",
      image: "assets/img/p1-hiking-pack.jpg",
    },
    {
      name: "Plum Wine",
      hex: "#5d1f3a",
      image: "assets/img/p2-hiking-pack-wine.jpg",
    },
    {
      name: "Soft Aquamarine",
      hex: "#7fd1c7",
      image: "assets/img/p3-hiking-pack-aqua.jpg",
    },
    {
      name: "Warm Taupe",
      hex: "#9c8878",
      image: "assets/img/p4-hiking-pack-taupe.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p5-hiking-pack-black.jpg",
    },
    {
      name: "Orange",
      hex: "#f07a1a",
      image: "assets/img/p6-hiking-pack-orange.jpg",
    },
  ];

  VARIANTS[17] = [
    { name: "Blue", hex: "#2f5fb3", image: "assets/img/p1-maxlite-26.jpg" },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p2-maxlite-26-black.jpg",
    },
    {
      name: "White",
      hex: "#f2f0eb",
      image: "assets/img/p3-maxlite-26-white.jpg",
    },
    {
      name: "Faded Peony",
      hex: "#e8b4bc",
      image: "assets/img/p4-maxlite-26-peony.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p5-maxlite-26-olive.jpg",
    },
  ];

  VARIANTS[11] = [
    {
      name: "Slate Blue",
      hex: "#5b6f8a",
      image: "assets/img/p1-everyday-backpack.jpg",
    },
    {
      name: "Blue / White",
      hex: "#3a6ea5",
      image: "assets/img/p2-everyday-backpack-bluewhite.jpg",
    },
    {
      name: "Soft Olive / Cream",
      hex: "#8a9a5b",
      image: "assets/img/p3-everyday-backpack-olivecream.jpg",
    },
    {
      name: "Black / Tan",
      hex: "#151515",
      image: "assets/img/p4-everyday-backpack-blacktan.jpg",
    },
    {
      name: "Deep Burgundy",
      hex: "#5c1020",
      image: "assets/img/p5-everyday-backpack-burgundy.jpg",
    },
    {
      name: "Sand Beige",
      hex: "#d8c7a5",
      image: "assets/img/p6-everyday-backpack-sand.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p7-everyday-backpack-black.jpg",
    },
  ];

  VARIANTS[8] = [
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p01-elevation-duffel.jpg",
    },
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p02-elevation-duffel-twilight.jpg",
    },
    {
      name: "Fern Green",
      hex: "#4f7942",
      image: "assets/img/p03-elevation-duffel-fern.jpg",
    },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p04-elevation-duffel-oldrose.jpg",
    },
    {
      name: "Sandstone",
      hex: "#cdbfa3",
      image: "assets/img/p05-elevation-duffel-sandstone.jpg",
    },
    {
      name: "Dusky Orchid",
      hex: "#a67bb0",
      image: "assets/img/p06-elevation-duffel-orchid.jpg",
    },
  ];

  VARIANTS[44] = [
    {
      name: "Rose Gold",
      hex: "#b76e79",
      image: "assets/img/p1-kids-unicorn.jpg",
    },
    {
      name: "Pink",
      hex: "#f48fb1",
      image: "assets/img/p2-kids-unicorn-pink.jpg",
    },
    {
      name: "Lavender",
      hex: "#c8b6e2",
      image: "assets/img/p3-kids-unicorn-lavender.jpg",
    },
    {
      name: "Mint Green",
      hex: "#98e0c0",
      image: "assets/img/p4-kids-unicorn-mint.jpg",
    },
    {
      name: "Sky Blue",
      hex: "#87ceeb",
      image: "assets/img/p5-kids-unicorn-skyblue.jpg",
    },
  ];

  VARIANTS[10] = [
    {
      name: "Raw Silk",
      hex: "#d9c9a3",
      image: "assets/img/p1-urban-groove.jpg",
    },
    {
      name: "Blue",
      hex: "#2f5fb3",
      image: "assets/img/p2-urban-groove-blue.jpg",
    },
    {
      name: "Mahogany",
      hex: "#4a1c13",
      image: "assets/img/p3-urban-groove-mahogany.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p4-urban-groove-olive.jpg",
    },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p5-urban-groove-oldrose.jpg",
    },
    {
      name: "Dusky Orchid",
      hex: "#a67bb0",
      image: "assets/img/p6-urban-groove-orchid.jpg",
    },
  ];

  VARIANTS[12] = [
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p1-heritage-backpack-oldrose.jpg",
    },
    {
      name: "Chocolate Brown",
      hex: "#4a2c1a",
      image: "assets/img/p2-heritage-backpack.jpg",
    },
    {
      name: "Dusky Orchid",
      hex: "#a67bb0",
      image: "assets/img/p3-heritage-backpack-orchid.jpg",
    },
    {
      name: "Raw Silk",
      hex: "#d9c9a3",
      image: "assets/img/p4-heritage-backpack-rawsilk.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p5-heritage-backpack-olive.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p6-heritage-backpack-black.jpg",
    },
  ];

  VARIANTS[13] = [
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p1-aero-carryon-black.jpg",
    },
    { name: "White", hex: "#f2f0eb", image: "assets/img/p2-aero-carryon.jpg" },
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p3-aero-carryon-twilight.jpg",
    },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p4-aero-carryon-oldrose.jpg",
    },
    {
      name: "Rose Garnet",
      hex: "#8e2f45",
      image: "assets/img/p5-aero-carryon-garnet.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p6-aero-carryon-olive.jpg",
    },
  ];

  VARIANTS[14] = [
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p1-omni-24-twilight.jpg",
    },
    { name: "Silver", hex: "#b8bcc4", image: "assets/img/p2-omni-24.jpg" },
    { name: "Black", hex: "#151515", image: "assets/img/p3-omni-24-black.jpg" },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p4-omni-24-oldrose.jpg",
    },
    {
      name: "Rose Garnet",
      hex: "#8e2f45",
      image: "assets/img/p5-omni-24-garnet.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p6-omni-24-olive.jpg",
    },
  ];

  VARIANTS[15] = [
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p1-soundbox-28-twilight.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p2-soundbox-28-black.jpg",
    },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p3-soundbox-28-oldrose.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p4-soundbox-28-olive.jpg",
    },
    {
      name: "Deep Teal",
      hex: "#0f5257",
      image: "assets/img/p5-soundbox-28-teal.jpg",
    },
    {
      name: "Raw Silk",
      hex: "#d9c9a3",
      image: "assets/img/p6-soundbox-28-rawsilk.jpg",
    },
    {
      name: "Dusky Orchid",
      hex: "#a67bb0",
      image: "assets/img/p7-soundbox-28-orchid.jpg",
    },
  ];

  VARIANTS[16] = [
    {
      name: "Champagne",
      hex: "#e8d5b0",
      image: "assets/img/p1-chatelet-21.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p2-chatelet-21-black.jpg",
    },
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p3-chatelet-21-twilight.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p4-chatelet-21-olive.jpg",
    },
    {
      name: "Raw Silk",
      hex: "#d9c9a3",
      image: "assets/img/p5-chatelet-21-rawsilk.jpg",
    },
  ];

  VARIANTS[19] = [
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p1-garment-bag-twilight.jpg",
    },
    { name: "Black", hex: "#151515", image: "assets/img/p2-garment-bag.jpg" },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p3-garment-bag-olive.jpg",
    },
    {
      name: "Mahogany",
      hex: "#4a1c13",
      image: "assets/img/p4-garment-bag-mahogany.jpg",
    },
    {
      name: "Sage",
      hex: "#9caf88",
      image: "assets/img/p5-garment-bag-sage.jpg",
    },
  ];

  VARIANTS[21] = [
    { name: "Grey", hex: "#8a8d91", image: "assets/img/p1-camera-sling.jpg" },
    {
      name: "Raw Silk",
      hex: "#d9c9a3",
      image: "assets/img/p2-camera-sling-rawsilk.jpg",
    },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p3-camera-sling-oldrose.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p4-camera-sling-black.jpg",
    },
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p5-camera-sling-twilight.jpg",
    },
  ];

  VARIANTS[22] = [
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p1-laptop-sleeve.jpg",
    },
    {
      name: "White",
      hex: "#f2f0eb",
      image: "assets/img/p2-laptop-sleeve-white.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p3-laptop-sleeve-black.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p4-laptop-sleeve-olive.jpg",
    },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p5-laptop-sleeve-oldrose.jpg",
    },
    {
      name: "Cocoa Bean",
      hex: "#4b2e24",
      image: "assets/img/p6-laptop-sleeve-cocoa.jpg",
    },
  ];

  VARIANTS[23] = [
    {
      name: "Cocoa Bean",
      hex: "#4b2e24",
      image: "assets/img/p1-executive-tote.jpg",
    },
    {
      name: "White",
      hex: "#f2f0eb",
      image: "assets/img/p2-executive-tote-white.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p3-executive-tote-black.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p4-executive-tote-olive.jpg",
    },
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p5-executive-tote-twilight.jpg",
    },
    {
      name: "Raw Silk",
      hex: "#d9c9a3",
      image: "assets/img/p6-executive-tote-rawsilk.jpg",
    },
  ];

  VARIANTS[34] = [
    {
      name: "Charcoal / Black",
      hex: "#36454f",
      image: "assets/img/p1-campus-backpack-charcoal.jpg",
    },
    {
      name: "Navy",
      hex: "#1f3864",
      image: "assets/img/p2-campus-backpack.jpg",
    },
    {
      name: "Soft Olive / Black",
      hex: "#8a9a5b",
      image: "assets/img/p3-campus-backpack-olive.jpg",
    },
    {
      name: "Old Rose / Black",
      hex: "#c08081",
      image: "assets/img/p4-campus-backpack-oldrose.jpg",
    },
    {
      name: "White",
      hex: "#f2f0eb",
      image: "assets/img/p5-campus-backpack-white.jpg",
    },
  ];

  VARIANTS[33] = [
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p1-summit-30l-black.jpg",
    },
    {
      name: "White",
      hex: "#f2f0eb",
      image: "assets/img/p2-summit-30l-white.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p3-summit-30l.jpg",
    },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p4-summit-30l-oldrose.jpg",
    },
    {
      name: "Cocoa Bean",
      hex: "#4b2e24",
      image: "assets/img/p5-summit-30l-cocoa.jpg",
    },
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p6-summit-30l-twilight.jpg",
    },
  ];

  VARIANTS[27] = [
    { name: "Black", hex: "#151515", image: "assets/img/p1-crew-22.jpg" },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p2-crew-22-navy.jpg",
    },
    {
      name: "Charcoal Grey",
      hex: "#36454f",
      image: "assets/img/p3-crew-22-charcoal.jpg",
    },
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p4-crew-22-burgundy.jpg",
    },
    {
      name: "Olive Green",
      hex: "#556b2f",
      image: "assets/img/p5-crew-22-olive.jpg",
    },
    {
      name: "Chocolate Brown",
      hex: "#4a2c1a",
      image: "assets/img/p6-crew-22-brown.jpg",
    },
  ];

  VARIANTS[28] = [
    {
      name: "Charcoal Grey",
      hex: "#36454f",
      image: "assets/img/p1-belmont-26-charcoal.jpg",
    },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p2-belmont-26-navy.jpg",
    },
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p3-belmont-26-burgundy.jpg",
    },
    {
      name: "Teal",
      hex: "#1f7a7a",
      image: "assets/img/p4-belmont-26-teal.jpg",
    },
    {
      name: "Sand Beige",
      hex: "#d8c7a5",
      image: "assets/img/5-belmont-26-sand.jpg",
    },
  ];

  VARIANTS[29] = [
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p1-chic-crossbody-black.jpg",
    },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p2-chic-crossbody-navy.jpg",
    },
    {
      name: "Olive Green",
      hex: "#556b2f",
      image: "assets/img/p3-chic-crossbody-olive.jpg",
    },
    {
      name: "Charcoal Grey",
      hex: "#36454f",
      image: "assets/img/p4-chic-crossbody-charcoal.jpg",
    },
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p5-chic-crossbody-burgundy.jpg",
    },
    {
      name: "Tan Brown",
      hex: "#a67b5b",
      image: "assets/img/p6-chic-crossbody-26.jpg",
    },
  ];

  VARIANTS[39] = [
    {
      name: "Tan Brown",
      hex: "#a67b5b",
      image: "assets/img/p1-platinum-25-tan.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p2-platinum-25-black.jpg",
    },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p3-platinum-25-navy.jpg",
    },
    {
      name: "Olive Green",
      hex: "#556b2f",
      image: "assets/img/p4-platinum-25-olive.jpg",
    },
    {
      name: "Charcoal Grey",
      hex: "#36454f",
      image: "assets/img/p5-platinum-25-charcoal.jpg",
    },
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p6-platinum-25-burgundy.jpg",
    },
  ];

  VARIANTS[30] = [
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p1-voltage-duffel.jpg",
    },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p2-voltage-duffel-navy.jpg",
    },
    {
      name: "Charcoal Grey",
      hex: "#36454f",
      image: "assets/img/p3-voltage-duffel-charcoal.jpg",
    },
    {
      name: "Olive Green",
      hex: "#556b2f",
      image: "assets/img/p4-voltage-duffel-olive.jpg",
    },
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p5-voltage-duffel-burgundy.jpg",
    },
    {
      name: "Tan Brown",
      hex: "#a67b5b",
      image: "assets/img/p6-voltage-duffel-tan.jpg",
    },
  ];

  VARIANTS[31] = [
    {
      name: "Dark Tan",
      hex: "#8b5a2b",
      image: "assets/img/p1-urban-briefcase.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p2-urban-briefcase-black.jpg",
    },
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p3-urban-briefcase-burgundy.jpg",
    },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p4-urban-briefcase-navy.jpg",
    },
    {
      name: "Olive Green",
      hex: "#556b2f",
      image: "assets/img/p5-urban-briefcase-olive.jpg",
    },
  ];

  VARIANTS[32] = [
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p1-chic-mini-backpack-black.jpg",
    },
    {
      name: "Chocolate Brown",
      hex: "#4a2c1a",
      image: "assets/img/p2-chic-mini-backpack-brown.jpg",
    },
    {
      name: "White",
      hex: "#f2f0eb",
      image: "assets/img/p3-chic-mini-backpack-white.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p4-chic-mini-backpack-olive.jpg",
    },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p5-chic-mini-backpack-oldrose.jpg",
    },
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p6-chic-mini-backpack-twilight.jpg",
    },
  ];

  VARIANTS[35] = [
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p1-skyline-20-navy.jpg",
    },
    { name: "Black", hex: "#151515", image: "assets/img/p2-skyline-20.jpg" },
    {
      name: "Charcoal Grey",
      hex: "#36454f",
      image: "assets/img/p3-skyline-20-charcoal.jpg",
    },
    {
      name: "White",
      hex: "#f2f0eb",
      image: "assets/img/p4-skyline-20-white.jpg",
    },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p5-skyline-20-oldrose.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p6-skyline-20-olive.jpg",
    },
  ];

  VARIANTS[36] = [
    { name: "Navy Blue", hex: "#1f3864", image: "assets/img/p1-aspire-28.jpg" },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p2-aspire-28-black.jpg",
    },
    {
      name: "Charcoal Grey",
      hex: "#36454f",
      image: "assets/img/p3-aspire-28-charcoal.jpg",
    },
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p4-aspire-28-burgundy.jpg",
    },
    {
      name: "Olive Green",
      hex: "#556b2f",
      image: "assets/img/p5-aspire-28-olive.jpg",
    },
  ];

  VARIANTS[37] = [
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p1-turenne-30-black.jpg",
    },
    { name: "Grey", hex: "#8a8d91", image: "assets/img/p2-turenne-30.jpg" },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p3-turenne-30-navy.jpg",
    },
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p4-turenne-30-burgundy.jpg",
    },
    {
      name: "Sand Beige",
      hex: "#d8c7a5",
      image: "assets/img/p5-turenne-30-sand.jpg",
    },
  ];

  VARIANTS[38] = [
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p1-bon-air-set-black.jpg",
    },
    {
      name: "Grey",
      hex: "#8a8d91",
      image: "assets/img/p2-bon-air-set-grey.jpg",
    },
    {
      name: "Burgundy Red",
      hex: "#800020",
      image: "assets/img/p3-bon-air-set-burgundy.jpg",
    },
    {
      name: "Teal",
      hex: "#1f7a7a",
      image: "assets/img/p4-bon-air-set-teal.jpg",
    },
    {
      name: "Blue",
      hex: "#2f5fb3",
      image: "assets/img/p5-bon-air-set-blue.jpg",
    },
  ];

  VARIANTS[43] = [
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p1-executive-rolling.jpg",
    },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p2-executive-rolling-navy.jpg",
    },
    {
      name: "Charcoal Grey",
      hex: "#36454f",
      image: "assets/img/p3-executive-rolling-charcoal.jpg",
    },
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p4-executive-rolling-burgundy.jpg",
    },
    {
      name: "Olive Green",
      hex: "#556b2f",
      image: "assets/img/p5-executive-rolling-olive.jpg",
    },
  ];

  VARIANTS[45] = [
    { name: "Green", hex: "#3d6b35", image: "assets/img/p1-heritage-28.jpg" },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p2-heritage-28-black.jpg",
    },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p3-heritage-28-navy.jpg",
    },
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p4-heritage-28-burgundy.jpg",
    },
    {
      name: "Sand Beige",
      hex: "#d8c7a5",
      image: "assets/img/p5-heritage-28-sand.jpg",
    },
  ];

  VARIANTS[46] = [
    {
      name: "Grey",
      hex: "#8a8d91",
      image: "assets/img/p1-explorer-26-grey.jpg",
    },
    { name: "Olive", hex: "#6b7c3f", image: "assets/img/p2-explorer-26.jpg" },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p3-explorer-26-black.jpg",
    },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p4-explorer-26-navy.jpg",
    },
    {
      name: "Tan Brown",
      hex: "#a67b5b",
      image: "assets/img/p5-explorer-26-tan.jpg",
    },
  ];

  VARIANTS[40] = [
    {
      name: "Cocoa Bean",
      hex: "#4b2e24",
      image: "assets/img/p1-voyager-22-cocoa.jpg",
    },
    {
      name: "White",
      hex: "#f2f0eb",
      image: "assets/img/p2-voyager-22-white.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p3-voyager-22-black.jpg",
    },
    {
      name: "Soft Olive",
      hex: "#8a9a5b",
      image: "assets/img/p4-voyager-22-olive.jpg",
    },
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p5-voyager-22-twilight.jpg",
    },
    {
      name: "Raw Silk",
      hex: "#d9c9a3",
      image: "assets/img/p6-voyager-22-rawsilk.jpg",
    },
  ];

  VARIANTS[41] = [
    {
      name: "Grey",
      hex: "#8a8d91",
      image: "assets/img/p1-underseat-16-grey.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p2-underseat-16-black.jpg",
    },
    {
      name: "Twilight Blue",
      hex: "#4a5d8a",
      image: "assets/img/p3-underseat-16-twilight.jpg",
    },
    {
      name: "Raw Silk",
      hex: "#d9c9a3",
      image: "assets/img/p4-underseat-16-rawsilk.jpg",
    },
    {
      name: "Old Rose",
      hex: "#c08081",
      image: "assets/img/p5-underseat-16-oldrose.jpg",
    },
  ];

  VARIANTS[42] = [
    {
      name: "Burgundy",
      hex: "#800020",
      image: "assets/img/p1-blush-24-burgundy.jpg",
    },
    {
      name: "Black",
      hex: "#151515",
      image: "assets/img/p2-blush-24-black.jpg",
    },
    {
      name: "Navy Blue",
      hex: "#1f3864",
      image: "assets/img/p3-blush-24-navy.jpg",
    },
    {
      name: "Charcoal Grey",
      hex: "#36454f",
      image: "assets/img/p4-blush-24-charcoal.jpg",
    },
    {
      name: "Olive Green",
      hex: "#556b2f",
      image: "assets/img/p5-blush-24-olive.jpg",
    },
    {
      name: "Tan Brown",
      hex: "#a67b5b",
      image: "assets/img/p6-blush-24-tan.jpg",
    },
  ];

  window.BRONX_VARIANTS = VARIANTS;

  var id = +new URLSearchParams(location.search).get("id");
  var list = VARIANTS[id];
  if (!list) return;

  var css = document.createElement("style");
  css.textContent =
    "#pdSwatches{display:flex !important;align-items:center;gap:12px;flex-wrap:wrap}" +
    "#pdSwatches .swatch.cv{width:40px;height:40px;border-radius:50%;border:2px solid #d8cfc0;cursor:pointer;padding:0;" +
    "transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}" +
    "#pdSwatches .swatch.cv:hover{transform:translateY(-3px);box-shadow:0 8px 18px rgba(16,35,63,.25)}" +
    "#pdSwatches .swatch.cv.active{border-color:#c69a5b;box-shadow:0 0 0 3px rgba(198,154,91,.45)}";
  document.head.appendChild(css);

  function fileName(p) {
    return String(p || "")
      .split("?")[0]
      .split("/")
      .pop();
  }

  function build() {
    var sw = document.getElementById("pdSwatches");
    var img = document.getElementById("pdImage");
    if (!sw || !img) return;
    if (sw.getAttribute("data-cv") === "1") return;
    if (!img.getAttribute("src") || !sw.children.length) return;
    sw.setAttribute("data-cv", "1");
    sw.innerHTML = "";

    var lbl = document.createElement("span");
    lbl.style.cssText = "width:100%;font-weight:700;font-size:.9rem";
    sw.appendChild(lbl);

    var btns = [];

    function setActive(i) {
      for (var k = 0; k < btns.length; k++)
        btns[k].classList.toggle("active", k === i);
      lbl.textContent = "Colour: " + list[i].name;
      img.style.scale = list[i].zoom || 1;
    }

    function pick(i) {
      var c = list[i];
      var t = new Image();
      t.onload = function () {
        img.src = c.image;
        setActive(i);
      };
      t.onerror = function () {
        if (typeof toast === "function")
          toast(c.name + " ki image abhi add nahi hui.");
      };
      t.src = c.image;
    }

    list.forEach(function (c, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "swatch cv";
      b.title = c.name;
      b.style.backgroundColor = c.hex;
      b.addEventListener("click", function () {
        pick(i);
      });
      sw.appendChild(b);
      btns.push(b);
    });

    function startDefault() {
      var current = fileName(img.getAttribute("src"));
      var first = new Image();
      first.onload = function () {
        img.src = list[0].image;
        setActive(0);
      };
      first.onerror = function () {
        var idx = -1;
        for (var k = 0; k < list.length; k++) {
          if (fileName(list[k].image) === current) {
            idx = k;
            break;
          }
        }
        setActive(idx >= 0 ? idx : 0);
      };
      first.src = list[0].image;
    }

    var want = (
      new URLSearchParams(location.search).get("color") || ""
    ).toLowerCase();
    var wi = -1;
    for (var w = 0; w < list.length; w++) {
      if (list[w].name.toLowerCase() === want) {
        wi = w;
        break;
      }
    }
    if (wi < 0) {
      startDefault();
      return;
    }
    var c = list[wi],
      t = new Image();
    t.onload = function () {
      img.src = c.image;
      setActive(wi);
    };
    t.onerror = startDefault;
    t.src = c.image;
  }

  setInterval(build, 300);
})();
