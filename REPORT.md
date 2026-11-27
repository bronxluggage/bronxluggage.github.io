# Bronx Luggage — Project Report
 
 
---
 
 
## 1. Problem Definition
 
 
Travellers who shop for luggage online face cluttered listings, missing specifications and no easy way to compare products by size, colour, price or brand.
 
 
Bronx Luggage solves this with a multi-page store that has a curated catalogue of **44 products across 5 brands**, clear photos, specifications, prices and ratings, plus filters, a shopping cart, checkout with a downloadable receipt, order tracking, a support chatbot and a reviews page. The whole site is responsive and works on desktop and mobile.
 
 
### Objectives
 
 
1. Build a responsive multi-page e-commerce website for Bronx Luggage.
2. Let visitors browse by category (Luggage, Bags, Backpacks, Men, Women) and filter by size, colour, price and brand.
3. Show full product details (image, description, specifications, price, brand, rating, colours).
4. Provide a working cart and wishlist with quantities and totals.
5. Provide a checkout with Cash on Delivery or card, and a receipt that can be downloaded as a PDF.
6. Let customers track their order with a live progress timeline.
7. Provide a chatbot that answers store questions in English and Roman Urdu.
8. Include brand highlights, a gallery, reviews, About, Contact and a sitemap.
9. Display a live date, time and location ticker and a visitor counter.
---
 
 
## 2. Design Specifications
 
 
**Technology:** HTML5, CSS3 and vanilla JavaScript. Product data is stored in JSON (`data/products.json` and `data/more-products.json`). There is no framework and no backend.
 
 
**Design language:** deep navy (`#10233f`) and warm gold (`#c69a5b`) on a cream background, which gives a premium travel-retail look. Headings use a serif face and body text uses the system sans-serif stack. Cards have soft shadows and lift on hover, and sections fade in on scroll. A dark mode is available.
 
 
### Pages (13)
 
 
| # | Page | Purpose |
|---|---|---|
| 1 | `index.html` | Home: hero video, categories, featured products, recently viewed |
| 2 | `shop.html` | Shop: filters, search, sorting and the product grid |
| 3 | `product.html?id=N` | Product details: photo, colours, specs, 360° viewer, related products |
| 4 | `cart.html` | Cart, checkout (COD or card) and receipt |
| 5 | `track.html` | Order tracking with live progress |
| 6 | `whats-new.html` | New arrival: Bronx Ride-On Smart Suitcase in 7 colours |
| 7 | `brands.html` | Brand highlights |
| 8 | `gallery.html` | Photo gallery with lightbox |
| 9 | `studio.html` | 3D Studio: rotate, zoom and inspect every suitcase |
| 10 | `reviews.html` | Customer reviews (add, edit, delete) |
| 11 | `about.html` | About Us |
| 12 | `contact.html` | Contact details and message form |
| 13 | `sitemap.html` | Sitemap page (plus `sitemap.xml`) |
 
 
Every page shares the same header (with cart, wishlist and track icons), footer, live ticker and chatbot button.
 
 
### Responsive behaviour
 
 
- The product grid is 4 columns on desktop, then 3, 2 and 1 column on phones.
- The navigation collapses into a hamburger menu on small screens, and the Shop dropdown opens as a sliding panel.
- Filter controls wrap and stack on small screens.
- The chat bubble, hero text and recently viewed cards are adjusted for mobile.
---
 
 
## 3. Main Features
 
 
### 3.1 Catalogue and shopping
 
 
- **44 products** from Bronx, Samsonite, American Tourister, Delsey and Travelpro.
- **Colour variants:** each product can have several colours (16 colour families), and each colour shows its own image.
- **Bronx Ride-On Smart Suitcase:** an electric, cabin-size suitcase with a TSA lock and USB charging, available in 7 colours. Its colour variants are kept out of the shop count, so the store always shows 44 products.
- **Filters:** category tabs, gender, brand, colour (dropdown and swatches), size, price range slider, live search with suggestions, and sorting.
- **Cart:** add from any card, cart drawer on every page, quantity controls, remove, free shipping over $99 (otherwise $9.99). The product photo flies into the cart when it is added.
- **Wishlist:** saved in the browser, with a drawer that has quantity controls and an Add to Cart button.
- **Compare:** up to 3 products side by side, with remove buttons.
- **Quick view** and **recently viewed** (last 4 products).
### 3.2 Checkout and receipt
 
 
- Form validation for name, email, phone and address.
- Payment by **Cash on Delivery** or **Debit/Credit card** (VISA, Mastercard and AMEX detection, card number, expiry and CVV checks).
- A **receipt** pops up after the order with customer details, product details, order summary and payment method, and a **Download** button that saves it as a PDF.
### 3.3 Order tracking
 
 
- Every order gets a number like `BX-12345678` and is saved in the browser.
- `track.html` shows a moving progress bar, a 4-step timeline (Order Placed, Packed, Shipped, Delivered), the estimated delivery date, order details, a **Track on Map** button and a **Contact Courier** button.
### 3.4 Chatbot (Bronx Support)
 
 
- Understands **English and Roman Urdu** and corrects small typing mistakes.
- Finds products by colour, brand, size, budget, gender or use (gym, school, office, hiking and more) and shows counts such as "top 6 of 44".
- Gives price, weight, size, colours and warranty for a named product, compares two products, and can add items to the cart or wishlist.
- Answers shipping, returns, payment, warranty, care, TSA lock, airline cabin size and trip-length questions.
- Has a **track order** flow, and switches topic if the visitor asks something else instead of an order number.
- Knows about the electric Ride-On suitcase and links to the What's New page.
- Includes small talk, greetings and quick-reply buttons.
### 3.5 3D and visual effects
 
 
- **3D Studio** with Hero, Front, Side, Wheels & Trim and Spin views, drag to rotate, scroll to zoom and thumbnails to switch suitcase.
- **360° viewer** on product pages, and drag-to-rotate and zoom on product cards.
- Image comparison slider, hero background video, animated preloader with a progress ring, scroll reveal, magnetic buttons, glass-style header, count-up statistics, brand marquee and a back-to-top rocket.
- Dark and light mode, guide tour, toast notifications.
### 3.6 Site-wide
 
 
- Live date, time and location ticker and a visitor counter.
- Sticky navigation with active-page highlighting.
- Reviews page with moving cards where customers can edit or delete their own reviews.
---
 
 
## 4. Flowcharts
 
 
### 4.1 Shop and filter flow
 
 
```
Visitor opens index.html
  → script loads data/products.json and data/more-products.json
    (fallback: embedded catalogue)
  → products render in the grid
  → visitor picks a category tab, filter or search text
  → getFiltered() applies category, gender, brand, size, colour,
    price range and search, then sorts
  → grid re-renders with matching products (or an empty state)
```
 
 
### 4.2 Cart, checkout and tracking flow
 
 
```
Click "Add to Cart" → item saved in the cart (localStorage)
  → cart badge updates, toast confirms
  → open the cart drawer or cart.html → change quantity / remove item
  → subtotal updates, free-shipping note at $99+
  → checkout form → validation (name, email, phone, address, card if chosen)
  → order placed → order saved (BX-number), cart cleared
  → receipt pops up → Download PDF
  → "Track Order" opens track.html?order=BX-number
  → live progress bar and timeline
```
 
 
### 4.3 Chatbot flow
 
 
```
Visitor types a message or taps a quick-reply button
  → text is cleaned, language detected (English / Roman Urdu), typos fixed
  → order number found?  → find the order → open track page
  → waiting for an order number and a new topic arrives?
        → drop the tracking state and answer the new topic
  → product name, colour, brand, budget or use found?
        → show matching products (with the correct count)
  → FAQ topic (shipping, returns, payment, warranty...)?
        → show the answer
  → otherwise → friendly fallback with popular products
```
 
 
### 4.4 Review flow
 
 
```
Fill the review form → validate name, email, message length
  → valid: save in localStorage, show in the moving review cards,
           show a "Thank You" popup
  → invalid: show an inline error and keep the form data
  → later: customer can edit or delete their own review
```
 
 
---
 
 
## 5. Data Flow Diagram
 
 
### Level 0 (context)
 
 
```
                ┌─────────────────────┐
   Visitor ────▶│   Bronx Luggage     │────▶  Product catalogue (JSON files)
 (browse,       │   website           │────▶  Cart, wishlist, compare (localStorage)
  filter,       │                     │────▶  Orders (localStorage)
  buy, track,   │                     │────▶  Reviews (localStorage)
  chat, review) │                     │────▶  Live ticker (Date + Geolocation API)
                └─────────────────────┘
```
 
 
### Level 1 processes
 
 
1.0 Browse catalogue
 
2.0 Filter and search
 
3.0 View product details
 
4.0 Manage cart and wishlist
 
5.0 Checkout and receipt
 
6.0 Track order
 
7.0 Chat with the support bot
 
8.0 Submit and manage reviews
 
9.0 View gallery, brands and about
 
 
### Data stores
 
 
| Store | Content |
|---|---|
| D1 `data/products.json`, `data/more-products.json` | Products |
| D2 `bronx-cart` | Cart items |
| D3 `bronx-wishlist`, `bronx-wishlist-qty` | Wishlist and quantities |
| D4 `bronx-orders` | Placed orders |
| D5 `bronx-feedback` | Reviews |
| D6 `bronx-compare`, `bronx-recent` | Compare list and recently viewed |
| D7 `bronx-visits`, `bronx-theme` | Visitor count and theme |
 
 
---
 
 
## 6. Test Data
 
 
Tests marked **Pass** were checked in the browser. Tests marked **To verify** are new features: run them once and change the result to Pass.
 
 
### 6.1 Shop and products
 
 
| # | Test | Input | Expected | Result |
|---|---|---|---|---|
| 1 | Products load | Open `index.html` with Live Server | Featured products render | Pass |
| 2 | Category filter | Click the "Backpacks" tab | Only backpacks are shown | Pass |
| 3 | Gender filter | Open `shop.html?gender=Women` | Only women's and unisex products are shown | Pass |
| 4 | Combined filters | Brand = Bronx, Size = Medium | Only medium Bronx products | Pass |
| 5 | Price filter | Move the price slider | Grid narrows to the price range | Pass |
| 6 | Search | Type "leather" | Leather products only | Pass |
| 7 | Sort | Price: low to high | Cheapest product first | Pass |
| 8 | No results | Choose filters that match nothing | Empty state with a clear button | Pass |
| 9 | Colour swatch | Click the Navy swatch | Only products with navy shown, with the navy image | Pass |
| 10 | All-colours swatch | Filter by Red, then click "All" | Full grid returns | Pass |
| 11 | Product count button | Look at "View All N Products" on the home page | Shows 44 | To verify |
| 12 | Product page | Open `product.html?id=1` | Specs, colours, 360° viewer, related products | Pass |
| 13 | Colour swatch on product page | Click a colour | Same product shows in that colour | To verify |
 
 
### 6.2 Cart, wishlist, compare
 
 
| # | Test | Input | Expected | Result |
|---|---|---|---|---|
| 14 | Add to cart | Add a product twice | Badge = 2, subtotal correct | Pass |
| 15 | Cart quantity | Use +, − and remove | Totals update correctly | Pass |
| 16 | Free shipping note | Reach $99 | "FREE shipping" message appears | Pass |
| 17 | Wishlist | Tap ♥ on a card, reload the page | Count and products both stay | To verify |
| 18 | Wishlist quantity | Use + and − in the wishlist drawer | Quantity changes, Add to Cart uses it | To verify |
| 19 | Compare | Tap ⇄ on two cards, then Compare now | Side-by-side table | Pass |
| 20 | Compare remove | Click ✕ on a product in the table | Product is removed, table updates | To verify |
| 21 | Quick view | Open quick view on a card | Modal with price, rating and Add to Cart | Pass |
| 22 | Recently viewed | Open a product, go Home | It appears in Recently Viewed | Pass |
 
 
### 6.3 Checkout, receipt, tracking
 
 
| # | Test | Input | Expected | Result |
|---|---|---|---|---|
| 23 | Checkout validation | Leave the address empty | Inline error | Pass |
| 24 | Phone validation | Enter fewer than 7 digits | "Please enter a valid phone number" | To verify |
| 25 | COD order | Place an order with Cash on Delivery | Order confirmed, receipt shows "Cash on Delivery" | To verify |
| 26 | Card order | Choose card, enter details | Receipt shows card brand and last 4 digits | To verify |
| 27 | Card validation | Choose card with a short number | "Please fill in the card details" | To verify |
| 28 | Receipt PDF | Click Download on the receipt | A PDF file downloads | To verify |
| 29 | Track order | Click Track Order after ordering | Tracking page shows progress and timeline | To verify |
| 30 | Track wrong number | Enter a wrong BX number | "Order not found" message | To verify |
 
 
### 6.4 Chatbot
 
 
| # | Test | Input | Expected | Result |
|---|---|---|---|---|
| 31 | Shipping question | Ask "shipping" | Free shipping rule is shown | Pass |
| 32 | Roman Urdu | Ask "kitne rang hain?" | Reply in Roman Urdu | To verify |
| 33 | Typo fixing | Ask "backpak" | Understood as backpack | To verify |
| 34 | Product count | Ask "top rated products" | Shows "top 6 of 44" | To verify |
| 35 | Track then change topic | Tap Track order, then tap Returns | Bot answers about returns and does not ask for an order number again | To verify |
| 36 | Track order | Type a real order number | Bot finds it and opens the track page | To verify |
| 37 | Electric luggage | Ask "electric suitcase" | Summary with colours, price and Learn more link | To verify |
| 38 | Add to cart by chat | Say "add Atlas to cart" | Product is added to the cart | To verify |
 
 
### 6.5 3D Studio and effects
 
 
| # | Test | Input | Expected | Result |
|---|---|---|---|---|
| 39 | 3D Studio views | Click Front, Side, Wheels & Trim | View changes each time | Pass |
| 40 | Studio Spin | Click Spin | Suitcase swings left and right until stopped | Pass |
| 41 | Studio drag and zoom | Drag the photo, scroll over it | Rotates and zooms | Pass |
| 42 | Studio product switch | Click a thumbnail | Info card and photo change | Pass |
| 43 | 360° viewer | Drag the product photo | Rotates in 3D, double-click resets | Pass |
| 44 | Card drag and zoom | Drag a card photo, scroll over it | Rotates and zooms, a normal click still opens the product | Pass |
| 45 | Dark mode | Click the moon icon | Whole store switches to dark, choice is saved | Pass |
| 46 | Guide tour | Open the guide and start the tour | Highlighted step-by-step tour | Pass |
| 47 | Preloader | Load any page | Logo and progress ring show, then fade out | Pass |
| 48 | Back to top | Scroll down | Rocket button appears and returns to top | Pass |
 
 
### 6.6 Reviews and other pages
 
 
| # | Test | Input | Expected | Result |
|---|---|---|---|---|
| 49 | Review validation | Empty name or bad email | Inline error | Pass |
| 50 | Review submit | Valid review | Appears in the moving cards, "Thank You" popup shows | Pass |
| 51 | Edit and delete review | Use Edit and Delete under "Your Reviews" | Review text updates or is removed | To verify |
| 52 | Ticker | Load any page | Date and live clock tick | Pass |
| 53 | Geolocation denied | Block location permission | Fallback message shown | Pass |
| 54 | Visitor counter | Reload the page | Counter goes up by 1 | Pass |
| 55 | What's New colours | Open `whats-new.html`, pick a colour | Image and label change, quantity selector appears | To verify |
| 56 | Add Ride-On to cart without colour | Click Shop Luggage with no colour chosen | Red error message and shake | To verify |
| 57 | Mobile layout | 390 px viewport | 1-column grid, hamburger menu | Pass |
 
 
> **Note on the 360° viewer:** it rotates the single product photo in 3D with drag (left/right and up/down). It is a simulation, not multi-angle photography. On touch screens the viewers capture the touch, so a finger drag rotates the bag instead of scrolling the page.
 
 
---
 
 
## 7. Installation Instructions
 
 
1. Unzip the project folder.
2. Open the folder in VS Code and click **Go Live** (Live Server), or double-click `index.html`.
3. The site opens in Chrome, Edge, Firefox or Safari. No installation or internet connection is required, except for the location lookup in the ticker.
---
 
 
## 8. Limitations and Future Work
 
 
### Limitations
 
 
- Frontend only: there is no backend, real payment or real courier.
- Orders, cart, wishlist and reviews are saved in the browser of the same device only.
- Order tracking is a simulation that moves through the stages over time.
- Product photos are AI-generated studio shots, not supplier photography.
- The visitor counter is per device, not a global analytics count.
- The chatbot is rule-based (no real AI), so it only understands the topics it was programmed for.
### Future work
 
 
- Backend with a real database.
- Payment gateway and real courier tracking.
- A CMS for managing the catalogue.
- A smarter chatbot connected to a language model.
 