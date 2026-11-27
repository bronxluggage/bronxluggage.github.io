# Bronx Luggage — eProject
 
A responsive, **multi-page** luggage shopping website built with **HTML5, CSS3 and vanilla JavaScript**. No build step, no framework and no backend. Open `index.html` (or run it with VS Code Live Server) and it works.
 
## How to run
 
1. Unzip the project folder.
2. Open the folder in VS Code, right-click `index.html` and choose **Open with Live Server**. (You can also just double-click `index.html`.)
Tested on Chrome and Edge. Responsive down to small phone screens.
 
## Project structure
 
```
bronx-luggage/
├── index.html        Home (hero video, categories, featured products, recently viewed)
├── shop.html         Shop: all products with filters, search and sorting
├── product.html      Product detail page (?id=N): specs, colours, 360° viewer, related items
├── cart.html         Cart page + checkout (COD or card) + downloadable receipt
├── track.html        Order tracking with live progress and animations
├── whats-new.html    New arrival: Bronx Ride-On Smart Suitcase (7 colours)
├── brands.html       Brand highlights
├── gallery.html      Photo gallery with lightbox
├── studio.html       3D Studio: spin, zoom and inspect every suitcase
├── reviews.html      Customer reviews (moving cards, add / edit / delete)
├── about.html        About Us
├── contact.html      Contact Us
├── sitemap.html      Sitemap page (plus sitemap.xml)
├── css/style.css     All styling
├── js/script.js      Shared logic: catalogue, filters, cart, wishlist, compare,
│                     checkout, receipt, tracking, chatbot, animations
├── data/
│   ├── products.json       Main product catalogue
│   └── more-products.json  Extra products (merged in at load time)
├── assets/img/, assets/video/   Product photos, hero image, hero background video
├── sitemap.xml
├── README.md         This file
└── REPORT.md         Project report
```
 
> If your JavaScript file is named differently (for example `js/app.js`), update the name in the structure above.
 
## Catalogue
 
- **44 products** across 5 brands: Bronx, Samsonite, American Tourister, Delsey, Travelpro.
- Categories: **Luggage, Bags, Backpacks**, plus **Men / Women** filters.
- Products have **colour variants** (16 colour families), each with its own image.
- **Bronx Ride-On Smart Suitcase** (electric, cabin size, TSA lock, USB charging, 7 colours) on the What's New page. Its colour variants are kept out of the shop count, so the store always shows 44 products.
- Data is loaded with `fetch()` from `data/products.json` and `data/more-products.json`. An embedded fallback copy keeps the shop working if the fetch fails.
## Features
 
### Shopping
- **Shop filters:** category tabs, gender, brand, colour (dropdown and swatches), size, price range slider, live search with suggestions, and sorting.
- **Cart:** add from any card, cart drawer on every page, full cart page, quantity +/−, remove, free-shipping progress (free over $99, otherwise $9.99). The product photo flies into the cart when added.
- **Wishlist:** ♥ on any card, drawer with quantity controls and "Add to Cart", saved in the browser and synced across tabs.
- **Compare:** up to 3 products side by side, with remove buttons.
- **Quick view**, **recently viewed** (last 4), **colour swatches** on product pages that show the same product in that colour.
- **Checkout:** name, email, phone and address validation; payment by **Cash on Delivery** or **Debit/Credit card** (VISA, Mastercard, AMEX formatting and checks).
- **Receipt:** after ordering, a receipt pops up (customer details, product details, order summary, payment method) with a **Download as PDF** button.
### Order tracking
- Orders are saved in the browser with an order number like `BX-12345678`.
- `track.html` shows a live progress bar, a 4-step timeline (Order Placed, Packed, Shipped, Delivered), estimated delivery, order details, **Track on Map** and **Contact Courier** buttons.
### Chatbot (Bronx Support)
- Floating robot button with a "Hi! Can I help you?" bubble.
- Understands **English and Roman Urdu**, and fixes small typos.
- Finds products by colour, brand, size, budget ("under $100"), gender or use (gym, school, office, hiking...), and shows counts such as "top 6 of 44".
- Gives price, weight, size, colour and warranty for a named product, **compares two products**, can **add to cart / wishlist**, shows your cart and past orders.
- Answers shipping, returns, payment, warranty, care, TSA lock, airline cabin size and trip-length questions.
- **Track order** flow: asks for the order number, finds it and opens the tracking page. If you ask something else instead, it switches topic and does not keep asking for an order number.
- Knows about the **electric Ride-On suitcase** (colours, price, features) with a "Learn more" link.
- Small talk, jokes and greetings. Quick-reply chips for common questions.
### 3D and visuals
- **3D Studio:** 3/4 Hero, Front, Side, Wheels & Trim and Spin views, drag to rotate, scroll to zoom, double-click to reset, thumbnails to switch suitcase.
- **360° viewer** on product pages, drag-to-rotate and zoom on product cards.
- Image comparison slider, hero background video, animated preloader with progress ring, scroll-reveal animations, magnetic buttons, glass-style header, count-up statistics, brand marquee, back-to-top rocket.
- **Dark / light mode** (saved).
- **Guide tour** (floating guide that walks through the store).
- Reviews page with moving review cards; you can edit or delete your own reviews.
- What's New page with colour picker, quantity selector and "Order now" scroll animation.
### Site-wide
- Live **date, time and location** ticker, **visitor counter**, toast notifications.
- Sticky navigation with a **Shop** dropdown (mobile-friendly), active-page highlighting.
- Responsive layout for phones, tablets and desktops.
## Pages vs. project brief
 
| Requirement | Where it is |
|---|---|
| Homepage with logo, navigation, hero banner | `index.html` |
| Categories: Luggage, Bags, Backpacks, Men, Women | Home category cards + shop tabs (`?category=`, `?gender=`) |
| Product images, descriptions, specs, prices, brands, ratings | Product cards and `product.html?id=N` |
| Filters: size, colour, price, brand (+ search, sort) | Filter bar on `shop.html` |
| Brand highlights | `brands.html` |
| Image gallery | `gallery.html` with lightbox |
| Feedback / reviews | `reviews.html` |
| About Us / Contact Us | `about.html` / `contact.html` |
| Sitemap | `sitemap.html` + `sitemap.xml` |
| Live date, time, location, visitor counter | Top ticker bar |
| Shopping cart | Drawer on every page + `cart.html` |
| Hover 3D effects, loading spinner | Product cards, 3D Studio, preloader |
 
## Assumptions
 
- Frontend only: no backend, database or real payments. Checkout is a demonstration and no money is taken.
- Orders, cart, wishlist, reviews and theme are saved in the browser (localStorage) on that device only.
- Prices are in USD. Product photos are AI-generated studio shots created for this project.
- The visitor counter counts visits on the same browser, not global traffic.
- Geolocation needs the visitor's permission; if denied, the ticker shows a fallback message.
## Student details
 
- Student name: _[add your name here]_
- Batch / roll no.: _[add here]_
- Institute: Aptech (ADSE)
 