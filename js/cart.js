let cart = [];

function initCart() {
  loadCartFromStorage();
  updateCartUI();
}

function loadCartFromStorage() {
  const savedCart = localStorage.getItem("swiftcart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (error) {
      console.error("Error loading cart:", error);
      cart = [];
    }
  }
}

function saveCartToStorage() {
  localStorage.setItem("swiftcart", JSON.stringify(cart));
}

async function addToCart(productId) {
  // Check if product already exists in cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    // Increase quantity
    existingItem.quantity += 1;
    showToast("Product quantity increased!", "success");
  } else {
    // Fetch product details
    const product = await getProductById(productId);

    if (!product) {
      showToast("Failed to add product", "error");
      return;
    }

    // Add to cart
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    showToast("Product added to cart!", "success");
  }

  // Save and update UI
  saveCartToStorage();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
  showToast("Product removed from cart", "info");
}

function increaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += 1;
    saveCartToStorage();
    updateCartUI();
  }
}

function decreaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      saveCartToStorage();
      updateCartUI();
    } else {
      // If quantity is 1, remove the item
      removeFromCart(productId);
    }
  }
}

function updateCartUI() {
  updateCartCount();
  displayCartItems();
  calculateTotal();
}

/**
 * Update cart count badge in navbar
 */
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBadge = document.getElementById("cartCount");

  if (cartBadge) {
    cartBadge.textContent = totalItems;

    if (totalItems === 0) {
      cartBadge.classList.add("hidden");
    } else {
      cartBadge.classList.remove("hidden");
    }
  }
}

/**
 * Display cart items in cart modal
 */
function displayCartItems() {
  const cartContainer = document.getElementById("cartItems");

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="text-center py-10">
        <i class="fa-solid fa-cart-shopping text-6xl text-gray-300 mb-4"></i>
        <p class="text-xl text-gray-500">Your cart is empty</p>
        <a href="products.html" class="btn btn-primary mt-4">Start Shopping</a>
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = createCartItemElement(item);
    cartContainer.appendChild(cartItem);
  });
}

function createCartItemElement(item) {
  const div = document.createElement("div");
  div.className = "flex items-center gap-4 border-b pb-4";

  div.innerHTML = `
    <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain rounded">
    <div class="flex-1">
      <h3 class="font-semibold text-sm line-clamp-2">${item.title}</h3>
      <p class="text-primary font-bold mt-1">$${item.price.toFixed(2)}</p>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="decreaseQuantity(${item.id})" class="btn btn-xs btn-circle btn-outline">
        <i class="fa-solid fa-minus"></i>
      </button>
      <span class="font-bold text-lg w-8 text-center">${item.quantity}</span>
      <button onclick="increaseQuantity(${item.id})" class="btn btn-xs btn-circle btn-outline">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
    <button onclick="removeFromCart(${item.id})" class="btn btn-sm btn-error btn-circle">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  return div;
}

/**
 * Calculate and display cart total
 */
function calculateTotal() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const totalElement = document.getElementById("cartTotal");
  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
}

/**
 * Open cart modal
 */
function openCartModal() {
  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.showModal();
  }
}

function showToast(message, type = "success") {
  const alertClass =
    type === "success"
      ? "alert-success"
      : type === "error"
        ? "alert-error"
        : "alert-info";

  const toast = document.createElement("div");
  toast.className = "toast toast-top toast-end z-50";
  toast.innerHTML = `
    <div class="alert ${alertClass}">
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

// Initialize cart when page loads
document.addEventListener("DOMContentLoaded", initCart);
