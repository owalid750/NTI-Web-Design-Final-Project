import { loadHeader, loadFooter, loadMaintainanceAlert } from "./load-header-footer.js";
import { signUp, signIn, checkUserStatus } from "./auth.js";
import { getProducts, getProductById } from "./api.js";
import { addToCart, renderCartItems, updateCartCount } from "./cart.js";

/* Load Header */
loadHeader();
/* check user login status in each time after load header */
checkUserStatus();
/* update car count in each time after load header  */
updateCartCount();
/* Load Maintainance Alert */

if (document.getElementById("maintainance-alert")) {
    loadMaintainanceAlert();
}
/* Start Handle Register */
if (window.location.pathname.endsWith("register.html")) {
    document.getElementById('signupForm').addEventListener('submit', function (e) {
        e.preventDefault();  // Prevent form from reloading the page

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        // Validate form inputs
        if (!name || !email || !password || !confirmPassword) {
            showError('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match.');
            return;
        }

        signUp(email, password, name)
            .then(() => {
                // If sign-up is successful, show success message and redirect to login page
                alert('Successfully signed up, now login');
                window.location.href = 'login.html';  // Redirect to login page
            })
            .catch((errorMessage) => {
                // Display error message from signUp
                showError(errorMessage);
            });
    });
    // Function to show error message
    function showError(message) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = `<p>Error: ${message}</p>`;
    }
}
/* End Handle Register */




/* Start Handle Login */
if (window.location.pathname.endsWith("login.html")) {
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();  // Prevent form from reloading the page

        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate form inputs
        if (!email || !password) {
            showError('Please fill in all fields.');
            return;
        }

        // Call the signIn function and handle success or failure
        signIn(email, password)
            .then(() => {
                // If sign-in is successful, redirect to index page
                alert('Successfully signed in!');
                window.location.href = 'index.html';  // Redirect to index page after successful login
            })
            .catch((errorMessage) => {
                // Display error message from signIn
                showError(JSON.parse(errorMessage).error.message);
                // console.log(JSON.parse(errorMessage).error.message);



            });
    });

    // Function to show error message
    function showError(message) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = `<p>Error: ${message}</p>`;
    }
}
/* End Handle Login */



/* Start products Section */
if (window.location.pathname.endsWith("index.html")) {
    try {
        let productsDiv = document.getElementById("products");
        productsDiv.innerHTML = '';
        const allProducts = await getProducts();
        console.log("welcoem");

        let products = [...allProducts]; // Copy the original list for dynamic updates


        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                if (category === 'all') {
                    products = [...allProducts];
                } else {
                    products = allProducts.filter(item => item.category === category);
                }
                renderProducts(products);
            });
        });

        // Initial render for the first load 
        renderProducts(products);

        // Function to render product cards
        function renderProducts(products) {
            productsDiv.innerHTML = ''; // Clear existing products
            products.forEach(product => {


                const productCard = `
                <div class="col">
                    <div class="card h-100 shadow-sm">
                        <div class="position-relative">
                            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                            <span class="badge bg-primary position-absolute top-0 end-0 m-2">${product.category}</span>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text text-truncate">${product.description}</p>
                            <p class="text-success fw-bold">$${product.price}</p>
                            <div class="mt-auto d-flex justify-content-between">
                                <button class="btn details btn-outline-primary btn-sm w-50" data-id="${product.id}">View Details</button>
                                <button class="btn add-cart btn-outline-success btn-sm w-50" data-id="${product.id}">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>`;
                productsDiv.innerHTML += productCard;
            });

            // Add event listeners for dynamically created buttons
            handleProductActions(products);
        }

        // Handle button actions for "View Details" and "Add to Cart"
        function handleProductActions(products) {
            document.querySelectorAll('#products .details').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    showProductDetails(productId);
                });
            });

            document.querySelectorAll("#products .add-cart").forEach(button => {
                button.addEventListener("click", () => {
                    const productId = button.getAttribute("data-id");
                    const product = products.find(p => p.id === parseInt(productId));
                    if (product) {
                        addToCart(product);
                    } else {
                        console.log("Product not found!");
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }

}
/* End products Section */

/* Start Display product Details */
async function showProductDetails(productId) {
    try {
        const modalBody = document.querySelector(".modal-body");
        let product = await getProductById(productId);

        // Check if product is fetched successfully
        if (!product) {
            modalBody.innerHTML = '<p class="text-danger">Failed to load product details.</p>';
            return;
        }

        // Populate modal content with product details
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${product.thumbnail}" class="img-fluid rounded" alt="${product.title}">
                </div>
                <div class="col-md-6">
                    <h4>${product.title}</h4>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p><strong>Rating:</strong> ${product.rating} ★</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                    <p><strong>Warranty:</strong> ${product.warrantyInformation}</p>
                </div>
            </div>
        `;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();


    } catch (error) {
        console.error('Error displaying modal:', error.message);
    }
}
/* End Display product Details */

/* Start display product in cart */
if (window.location.pathname.endsWith("cart.html")) {
    document.addEventListener("DOMContentLoaded", renderCartItems);
}
/* Start display product in cart */




/* Load Footer */
loadFooter();


// test
