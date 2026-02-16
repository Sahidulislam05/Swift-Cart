// Base API URL
const BASE_URL = "https://fakestoreapi.com";

async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error("Error fetching products:", error);
    showError("Failed to load products. Please try again.");
    return [];
  }
}

async function getAllCategories() {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error("Error fetching categories:", error);
    return [];
  }
}

async function getProductsByCategory(category) {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);

    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error("Error fetching products by category:", error);
    showError("Failed to load products. Please try again.");
    return [];
  }
}

async function getProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error("Error fetching product:", error);
    showError("Failed to load product details.");
    return null;
  }
}

function showError(message) {
  // Create toast notification
  const toast = document.createElement("div");
  toast.className = "toast toast-top toast-end z-50";
  toast.innerHTML = `
    <div class="alert alert-error">
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
