// --- Admin Login Logic ---
const ADMIN_PASSWORD = "admin123"; // Change this to your desired password
const loginSection = document.getElementById('login-section');
const adminPanel = document.getElementById('admin-panel');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');

loginBtn.addEventListener('click', function() {
    const pwd = document.getElementById('admin-password').value;
    if (pwd === ADMIN_PASSWORD) {
        loginSection.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        renderCart(); // Call renderCart after login
    } else {
        loginError.textContent = "Incorrect password!";
    }
});

// --- Product Management Logic ---
const productList = document.getElementById('product-list');
const addProductForm = document.getElementById('add-product-form');
let products = JSON.parse(localStorage.getItem('adminProducts')) || [];

function renderProducts() {
    productList.innerHTML = '';
    if (products.length === 0) {
        productList.innerHTML = "<li>No products available.</li>";
    } else {
        products.forEach((product, idx) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price}`;
            const removeBtn = document.createElement('span');
            removeBtn.textContent = "Remove";
            removeBtn.className = "remove-btn";
            removeBtn.onclick = function() {
                products.splice(idx, 1);
                localStorage.setItem('adminProducts', JSON.stringify(products));
                renderProducts();
            };
            li.appendChild(removeBtn);
            productList.appendChild(li);
        });
    }
}

addProductForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('product-name').value.trim();
    const price = document.getElementById('product-price').value.trim();
    if (name && price) {
        products.push({ name, price });
        localStorage.setItem('adminProducts', JSON.stringify(products));
        renderProducts();
        addProductForm.reset();
    }
});

// Initial render
renderProducts();

// For demo: Show and allow removal of cart items stored in localStorage
const adminCartList = document.getElementById('admin-cart-list');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    adminCartList.innerHTML = '';
    if(cart.length === 0) {
        adminCartList.innerHTML = "<li>No items in cart.</li>";
    } else {
        cart.forEach((item, idx) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            const removeBtn = document.createElement('span');
            removeBtn.textContent = " Remove";
            removeBtn.className = "remove-btn";
            removeBtn.onclick = function() {
                cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            };
            li.appendChild(removeBtn);
            adminCartList.appendChild(li);
        });
    }
}

// Call this after login and after any cart update
renderCart();
