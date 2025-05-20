// JavaScript to handle adding products to the cart
const cart = [];
const cartCountElement = document.getElementById("cart-count");
const cartListElement = document.getElementById("cart-list");
const cartItemsElement = document.getElementById("cart-items");

// Add event listeners to all product boxes
document.querySelectorAll(".box").forEach(box => {
    box.addEventListener("click", () => {
        const productName = box.getAttribute("data-name");
        const productPrice = box.getAttribute("data-price");

        if (productName && productPrice) {
            // Add product to the cart
            cart.push({ name: productName, price: productPrice });

            // Update cart count
            cartCountElement.textContent = cart.length;

            // Save cart to localStorage for admin view
            localStorage.setItem('cart', JSON.stringify(cart));

            // Optional: Log the cart contents to the console
            console.log("Cart:", cart);
        }
    });
});

// Add event listener to the cart to display cart items
document.getElementById("cart").addEventListener("click", () => {
    // Toggle the visibility of the cart items
    if (cartItemsElement.style.display === "none") {
        cartItemsElement.style.display = "block";

        // Clear the cart list before populating
        cartListElement.innerHTML = "";

        // Display each item in the cart
        if (cart.length > 0) {
            cart.forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = `${item.name} - $${item.price}`;
                cartListElement.appendChild(listItem);
            });
        } else {
            const emptyMessage = document.createElement("li");
            emptyMessage.textContent = "Your cart is empty.";
            cartListElement.appendChild(emptyMessage);
        }
    } else {
        cartItemsElement.style.display = "none";
    }
});

