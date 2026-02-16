//  Highlight active page in navbar

// function highlightActivePage() {
//   const currentPage = window.location.pathname.split("/").pop() || "index.html";

//   const navLinks = document.querySelectorAll(".menu a");

//   navLinks.forEach((link) => {
//     const href = link.getAttribute("href");

//     // Check if link matches current page
//     if (
//       href === currentPage ||
//       (currentPage === "" && href === "index.html") ||
//       (currentPage === "index.html" && href === "index.html")
//     ) {
//       // Add active classes
//       link.classList.add("active", "text-primary", "font-bold");
//     } else {
//       // Remove active classes
//       link.classList.remove("active", "text-primary", "font-bold");
//     }
//   });
// }

function highlightActivePage() {
  // Get full current URL
  const currentURL = window.location.href;
  const currentPath = window.location.pathname;

  console.log("Full URL:", currentURL);
  console.log("Path:", currentPath);

  // Get all nav links
  const navLinks = document.querySelectorAll(".menu a[href]");

  navLinks.forEach((link) => {
    // Remove active classes
    link.classList.remove("active", "text-primary", "font-bold");

    const href = link.getAttribute("href");
    const fullLinkURL = new URL(href, window.location.origin).href;

    // Check multiple conditions
    const isActive =
      currentURL === fullLinkURL ||
      currentURL.endsWith(href) ||
      currentPath.endsWith(href) ||
      (href === "index.html" &&
        (currentPath === "/" || currentPath === "/index.html")) ||
      (href === "/" && (currentPath === "/" || currentPath === "/index.html"));

    if (isActive) {
      link.classList.add("active", "text-primary", "font-bold");
      console.log("Active:", href);
    }
  });
}

// Call on page load
document.addEventListener("DOMContentLoaded", highlightActivePage);

// Call on page load
document.addEventListener("DOMContentLoaded", highlightActivePage);

// Call on page load
document.addEventListener("DOMContentLoaded", highlightActivePage);

//  Handle newsletter subscription

function initNewsletterForm() {
  const forms = document.querySelectorAll("section form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;

      if (email) {
        // Show success message
        showToast(`Successfully subscribed with ${email}!`, "success");

        // Clear input
        emailInput.value = "";

        // In real app, you would send this to your backend
        console.log("Newsletter subscription:", email);
      }
    });
  });
}

// Call on page load
document.addEventListener("DOMContentLoaded", function () {
  initNewsletterForm();
});

// Global
let currentCategory = "all";
let allProducts = [];

document.addEventListener("DOMContentLoaded", function () {
  // Check which page we're on
  const isProductsPage = document.getElementById("productsContainer") !== null;
  const isTrendingSection =
    document.getElementById("trendingProducts") !== null;

  if (isProductsPage) {
    // Products page initialization
    initProductsPage();
  } else if (isTrendingSection) {
    // Home page initialization
    initHomePage();
  }

  // Initialize cart
  initCart();
});

/**
 * Initialize Products Page
 */
async function initProductsPage() {
  // console.log("Initializing Products Page...");

  // Load categories first
  await loadCategories();

  // Load all products initially
  await loadProducts("all");
}

/**
 * Initialize Trending Section
 */
async function initHomePage() {
  // console.log("Initializing Home Page...");

  // Load top 3 products for trending section
  await loadTrendingProducts();
}

/**
 * Load and display categories as filter buttons
 */
async function loadCategories() {
  const categoryContainer = document.getElementById("categoryButtons");

  if (!categoryContainer) {
    console.log("Category container not found");
    return;
  }

  try {
    // Fetch categories from API
    const categories = await getAllCategories();

    // Clear existing buttons
    categoryContainer.innerHTML = "";

    // Add "All" button first
    const allButton = createCategoryButton("all", "All Products", true);
    categoryContainer.appendChild(allButton);

    // Add category buttons
    categories.forEach((category) => {
      const button = createCategoryButton(
        category,
        formatCategoryName(category),
        false,
      );
      categoryContainer.appendChild(button);
    });

    // console.log("Categories loaded successfully");
  } catch (error) {
    // console.error("Error loading categories:", error);
    showError("Failed to load categories");
  }
}

function createCategoryButton(category, displayName, isActive) {
  const button = document.createElement("button");
  button.className = `btn ${isActive ? "btn-primary" : "btn-outline"} btn-sm category-btn`;
  button.textContent = displayName;
  button.dataset.category = category;

  // Add click event listener
  button.addEventListener("click", function () {
    // Update active state
    setActiveCategory(this);

    // Load products for this category
    currentCategory = category;
    loadProducts(category);
  });

  return button;
}

function formatCategoryName(category) {
  // Convert "men's clothing" to "Men's Clothing"
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function setActiveCategory(activeButton) {
  // Remove active class from all buttons
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });

  // Add active class to clicked button
  activeButton.classList.remove("btn-outline");
  activeButton.classList.add("btn-primary");
}

async function loadProducts(category = "all") {
  const productsContainer = document.getElementById("productsContainer");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const emptyState = document.getElementById("emptyState");

  if (!productsContainer) {
    console.log("Products container not found");
    return;
  }

  try {
    // Show loading spinner
    showLoading();

    // Hide empty state
    if (emptyState) emptyState.classList.add("hidden");

    // Fetch products
    let products;
    if (category === "all") {
      products = await getAllProducts();
    } else {
      products = await getProductsByCategory(category);
    }

    allProducts = products;
    productsContainer.innerHTML = "";

    if (products.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      hideLoading();
      return;
    }

    // Create and append product cards
    products.forEach((product) => {
      const card = createProductCard(product);
      productsContainer.appendChild(card);
    });

    // console.log(`Loaded ${products.length} products`);
  } catch (error) {
    // console.error("Error loading products:", error);
    showError("Failed to load products");
  } finally {
    // Hide loading spinner
    hideLoading();
  }
}

/**
 * Load trending products
 */
async function loadTrendingProducts() {
  const trendingContainer = document.getElementById("trendingProducts");
  const loadingSpinner = document.getElementById("loadingSpinner");

  if (!trendingContainer) return;

  try {
    if (loadingSpinner) loadingSpinner.classList.remove("hidden");

    const products = await getAllProducts();

    // Get top 3 products by rating
    const topProducts = products
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 3);

    // Clear container
    trendingContainer.innerHTML = "";

    // Create and append cards
    topProducts.forEach((product) => {
      const card = createProductCard(product);
      trendingContainer.appendChild(card);
    });

    // console.log("Trending products loaded");
  } catch (error) {
    // console.error("Error loading trending products:", error);
  } finally {
    // Hide loading
    if (loadingSpinner) loadingSpinner.classList.add("hidden");
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className =
    "card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300";

  // Truncate title if too long
  const truncatedTitle =
    product.title.length > 50
      ? product.title.substring(0, 50) + "..."
      : product.title;

  // Generate star rating HTML
  const stars = generateStarRating(product.rating.rate);

  card.innerHTML = `
    <figure class="px-4 pt-4 h-48 flex items-center justify-center bg-gray-100 p-3">
      <img 
        src="${product.image}" 
        alt="${product.title}" 
        class="rounded-xl h-full object-contain hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </figure>
    <div class="card-body">
      <!-- Category Badge -->
      <span class="badge badge-primary badge-sm">${formatCategoryName(product.category)}</span>
      
      <!-- Product Title -->
      <h2 class="card-title text-base h-12 line-clamp-2" title="${product.title}">
        ${truncatedTitle}
      </h2>
      
      <!-- Rating -->
      <div class="flex items-center gap-2 my-1">
        <div>
          ${stars}
        </div>
        <span class="text-sm text-gray-600">
          ${product.rating.rate} (${product.rating.count})
        </span>
      </div>
      
      <!-- Price -->
      <p class="text-2xl font-bold text-primary">$${product.price.toFixed(2)}</p>
      
      <!-- Action Buttons -->
      <div class="card-actions justify-between mt-4">
        <button 
          onclick="showProductDetails(${product.id})" 
          class="btn btn-outline btn-sm flex-1"
        >
          <i class="fa-solid fa-eye"></i>
          Details
        </button>
        <button 
          onclick="addToCart(${product.id})" 
          class="btn btn-primary btn-sm flex-1"
        >
          <i class="fa-solid fa-cart-plus"></i>
          Add to Cart
        </button>
      </div>
    </div>
  `;

  return card;
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let stars = "";

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa-solid fa-star text-warning"></i>';
  }

  // Half star
  if (hasHalfStar) {
    stars += '<i class="fa-solid fa-star-half-stroke text-warning"></i>';
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="fa-regular fa-star text-warning"></i>';
  }

  return stars;
}

async function showProductDetails(productId) {
  const modal = document.getElementById("productModal");
  const modalContent = document.getElementById("modalContent");

  if (!modal || !modalContent) {
    console.error("Modal elements not found");
    return;
  }

  try {
    // Show loading in modal
    modalContent.innerHTML = `
      <div class="flex justify-center items-center w-full py-20">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>
    `;

    // Open modal
    modal.showModal();

    // Fetch product details
    const product = await getProductById(productId);

    if (!product) {
      modalContent.innerHTML = `
        <div class="text-center py-10">
          <p class="text-error">Failed to load product details</p>
        </div>
      `;
      return;
    }

    // Generate star rating
    const stars = generateStarRating(product.rating.rate);

    // Populate modal with product details
    modalContent.innerHTML = `
      <!-- Product Image -->
      <div class="flex-shrink-0 w-full md:w-1/2">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          class="w-full h-96 object-contain bg-white rounded-lg p-4"
        />
      </div>
      
      <!-- Product Info -->
      <div class="flex-1 flex flex-col gap-4">
        <!-- Category Badge -->
        <span class="badge badge-primary w-fit">${formatCategoryName(product.category)}</span>
        
        <!-- Title -->
        <h3 class="text-2xl font-bold">${product.title}</h3>
        
        <!-- Rating -->
        <div class="flex items-center gap-2">
          <div>
            ${stars}
          </div>
          <span class="text-sm text-gray-600">
            ${product.rating.rate} out of 5 (${product.rating.count} reviews)
          </span>
        </div>
        
        <!-- Price -->
        <div class="text-3xl font-bold text-primary">
          $${product.price.toFixed(2)}
        </div>
        
        <!-- Description -->
        <div class="border-t pt-4">
          <h4 class="font-semibold mb-2">Description:</h4>
          <p class="text-gray-600 leading-relaxed">${product.description}</p>
        </div>
        
        <!-- Action Button -->
        <button 
          onclick="addToCart(${product.id}); document.getElementById('productModal').close();" 
          class="btn btn-primary btn-block mt-auto"
        >
          <i class="fa-solid fa-cart-plus"></i>
          Add to Cart
        </button>
      </div>
    `;
  } catch (error) {
    console.error("Error showing product details:", error);
    modalContent.innerHTML = `
      <div class="text-center py-10">
        <p class="text-error">Failed to load product details</p>
      </div>
    `;
  }
}

/**
 * Show loading spinner
 */
function showLoading() {
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (loadingSpinner) {
    loadingSpinner.classList.remove("hidden");
  }
}

/**
 * Hide loading spinner
 */
function hideLoading() {
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (loadingSpinner) {
    loadingSpinner.classList.add("hidden");
  }
}

/**
 * Scroll to top of page smoothly
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add scroll to top functionality when user scrolls down
window.addEventListener("scroll", function () {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (scrollBtn) {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.remove("hidden");
    } else {
      scrollBtn.classList.add("hidden");
    }
  }
});
