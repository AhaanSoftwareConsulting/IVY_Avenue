
  const API_URL =
    "https://recording.ahaanmedia.com/wp-json/wp/v2/product?_embed&per_page=5&order=asc&orderby=date";

  // MANUAL PRICES (order must match API order)
  const MANUAL_PRICES = [335, 325, 220, 180,140];

  async function loadProducts() {
    try {
      const res = await fetch(API_URL);
       products = await res.json();

      const grid = document.getElementById("product-grid");
      grid.innerHTML = "";

      products.forEach((product, index) => {
        const image =
          product._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/400x500";

        const title = product.title.rendered;

        const desc = product.excerpt?.rendered
          ? product.excerpt.rendered.replace(/<[^>]*>/g, "")
          : "";

        const price = MANUAL_PRICES[index] || 0;

        grid.innerHTML += `
          <div class="group">
            <div class="w-40 h-40 overflow-hidden bg-gray-100">
              <img
                src="${image}"
                alt="${title}"
                class="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            <h3 class="mt-4 font-display text-lg font-medium">
              ${title}
            </h3>

            <p class="mt-2 font-raleway text-sm text-gray-600 ">
              ${desc}
            </p>

            <p class="mt-3 font-raleway font-semibold text-lg">
              $${price.toLocaleString()}
            </p>

           
             <button  onclick="addToCart({
                id: ${product.id},
                title: \`${title}\`,
                price: ${price},
                image: '${image}'
              })" class=" mt-4 relative w-[180px] h-[56px] group
         flex items-center justify-center">
                            <!-- SVG shape -->
                            <svg class="absolute inset-0 w-full h-full" viewBox="0 0 180 56" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M90 0.5C114.817 0.5 137.266 3.58114 153.493 8.55078C161.61 11.0365 168.142 13.9868 172.634 17.2393C177.137 20.4999 179.5 23.9946 179.5 27.5625C179.5 31.1304 177.137 34.6251 172.634 37.8857C168.142 41.1382 161.61 44.0885 153.493 46.5742C137.266 51.5439 114.817 54.625 90 54.625C65.1826 54.625 42.7343 51.5439 26.5068 46.5742C18.3901 44.0885 11.8582 41.1382 7.36621 37.8857C2.86295 34.6251 0.5 31.1304 0.5 27.5625C0.5 23.9946 2.86295 20.4999 7.36621 17.2393C11.8582 13.9868 18.3901 11.0365 26.5068 8.55078C42.7343 3.58114 65.1826 0.5 90 0.5Z"
                                    fill="#F4F4F4" stroke="#1A1817" class="group-hover:fill-[#1A1817] transition" />
                            </svg>

                            <!-- Button text -->
                            <span class="relative z-10 font-raleway  font-medium text-base tracking-wide text-[#1A1817]
           group-hover:text-white transition">
                              Add To Cart
                            </span>
                        </button>
          </div>
        `;
      });
    } catch (err) {
      console.error("Product API error:", err);
    }
  }

  loadProducts();
  document.body.classList.add("products-loaded");

