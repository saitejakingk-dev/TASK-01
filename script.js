// Sample products data with real images
const products = [
    {
        id: 1,
        name: "Fresh Bananas",
        price: 48,
        originalPrice: 60,
        category: "Vegetables & Fruits",
        unit: "1 kg",
        discount: 20,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-18%20at%2020.07.35_018327c3.jpg-uKppx2AHjkadK6lC3sBclzbtwbyvVl.jpeg"
    },
    {
        id: 2,
        name: "Amul Fresh Milk",
        price: 28,
        category: "Dairy & Breakfast",
        unit: "500 ml",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-18%20at%2020.07.40_2f8e195b.jpg-AWvhgVu3WZcJu9WGDJUxhdxNrL5yOe.jpeg"
    },
    {
        id: 3,
        name: "Lay's Chips",
        price: 20,
        originalPrice: 25,
        category: "Munchies",
        unit: "50g",
        discount: 20,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-18%20at%2020.07.39_d9e38ba1.jpg-NjNOh92cmHE9CQbFMap7SyPx4kje36.jpeg"
    },
    {
        id: 4,
        name: "Coca Cola",
        price: 40,
        category: "Cold Drinks",
        unit: "750 ml",
        // <CHANGE> Updated Coca Cola image from placeholder to actual product image
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-18%20at%2020.13.20_49810922.jpg-4VVxtS3pDJPLvarmjqkTRki18Wl9wA.jpeg"
    },
    {
        id: 5,
        name: "Fresh Apples",
        price: 120,
        originalPrice: 150,
        category: "Vegetables & Fruits",
        unit: "1 kg",
        discount: 20,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-18%20at%2020.07.39_e9283617.jpg-EDWuDd7tr9T5EWlAiklMGXlv77YHTz.jpeg"
    },
    {
        id: 6,
        name: "Bread",
        price: 25,
        category: "Dairy & Breakfast",
        unit: "400g",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-18%20at%2020.07.40_6b781929.jpg-qprGAdbcgpbcgSH7aCmtGxOMXLmjGh.jpeg"
    }
];

let cart = [];
let currentCategory = 'All';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupScrollEffects();
});

// Scroll effects
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Product card scroll effects
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                card.classList.add('scroll-visible');
            } else {
                card.classList.remove('scroll-visible');
            }
        });
    });
}

// Render products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const filteredProducts = currentCategory === 'All' 
        ? products 
        : products.filter(p => p.category === currentCategory);

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="addToCart(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem;" />
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-unit">${product.unit}</div>
            <div class="product-price">
                <span class="current-price">₹${product.price}</span>
                ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                ${product.discount ? `<span class="discount-badge">${product.discount}% OFF</span>` : ''}
            </div>
            <button class="add-btn">Add to Cart</button>
        </div>
    `).join('');
}

// Filter products
function filterProducts(category) {
    currentCategory = category;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderProducts();
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem;" />
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        </div>
    `).join('');
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    updateCartUI();
}

// Toggle cart
function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    cartOverlay.classList.toggle('active');
}

// Place order
function placeOrder() {
    if (cart.length === 0) return;
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const orderId = 'BLK' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('orderTotal').textContent = totalPrice;
    document.getElementById('orderItems').textContent = totalItems;
    
    // Clear cart
    cart = [];
    updateCartUI();
    toggleCart();
    
    // Show order confirmation
    document.getElementById('orderModal').classList.add('active');
}

// Close order modal
function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
}
