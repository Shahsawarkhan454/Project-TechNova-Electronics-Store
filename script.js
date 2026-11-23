
/* 1. Products Array */

const products = [
    {
        id: 1,
        name: "Smartphone Pro",
        category: "Smartphones",
        price: 899,
        description: "Powerful smartphone with modern features.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        category: "Audio",
        price: 149,
        description: "Enjoy high-quality wireless sound.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30a?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Laptop Pro",
        category: "Accessories",
        price: 1299,
        description: "A laptop for work and productivity.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a8a6?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Smart Watch",
        category: "Accessories",
        price: 199,
        description: "Track your activities and daily routine.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        category: "Audio",
        price: 99,
        description: "Portable speaker with rich sound.",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Smartphone Mini",
        category: "Smartphones",
        price: 599,
        description: "Compact smartphone for everyday use.",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Wireless Earbuds",
        category: "Audio",
        price: 79,
        description: "Comfortable earbuds for music and calls.",
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Tablet",
        category: "Accessories",
        price: 499,
        description: "A lightweight tablet for entertainment.",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80"
    }
];


/* 2. Select HTML Elements */

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const notification = document.getElementById("notification");


/* 3. Variables */

let cart = 0;
let selectedCategory = "All";


/* 4. Display Products */

function displayProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {
        productGrid.innerHTML =
            '<p class="no-products">No products found.</p>';
        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}"
                 alt="${product.name}"
                 loading="lazy">

            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">$${product.price.toLocaleString()}</div>

                <button class="add-btn" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;

        productGrid.appendChild(card);
    });
}


/* 5. Add to Cart */

productGrid.addEventListener("click", function(event) {

    if (event.target.classList.contains("add-btn")) {

        const productId = Number(event.target.dataset.id);

        const product = products.find(item => item.id === productId);

        if (product) {
            cart++;
            cartCount.textContent = cart;

            showNotification(`${product.name} added to cart!`);
        }
    }
});


/* 6. Notification */

function showNotification(message) {

    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}


/* 7. Category Filter */

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        selectedCategory = this.dataset.category;

        applyFilters();
    });
});


/* 8. Search Products */

searchInput.addEventListener("input", function() {

    applyFilters();
});


/* 9. Sort Products */

sortSelect.addEventListener("change", function() {

    applyFilters();
});


/* 10. Apply All Filters */

function applyFilters() {

    let filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(
                searchInput.value.toLowerCase()
            );

        return matchesCategory && matchesSearch;
    });


    // Sorting

    if (sortSelect.value === "low") {

        filteredProducts.sort((a, b) => a.price - b.price);

    } else if (sortSelect.value === "high") {

        filteredProducts.sort((a, b) => b.price - a.price);
    }


    displayProducts(filteredProducts);
}


/* 11. Initial Display */

displayProducts(products);
