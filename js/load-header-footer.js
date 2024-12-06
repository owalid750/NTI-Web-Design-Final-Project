/* export function loadHTML(file, elementId, callback, callback2) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (callback) {
                callback();  // Call the callback after the content is loaded
            }
            if (callback2) {
                callback2();
            }
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
            alert("There was an error loading the page. Please try again later.");
        });
}
 */

export function loadHeader() {
    document.getElementById("header").innerHTML = `<nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
        <a class="navbar-brand" href="index.html">
            <img src="imgs/logomain.png" alt="e-Store Logo" class="logo" />
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main"
            aria-controls="main" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa-solid fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="main">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link p-2 p-lg-3" aria-current="page" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link p-2 p-lg-3" href="index.html#products">Products</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link p-2 p-lg-3" href="about.html">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link p-2 p-lg-3" href="contact.html">Contact</a>
                </li>
            </ul>
            <div class="cart ps-3 pe-3  position-relative">
                <a href="cart.html">
                    <i class="fa-solid fa-cart-shopping text-primary"></i>
                    <span id="cart-count"
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none">
                        0
                    </span>
                </a>
            </div>



            <div id="user-info" class="d-flex align-items-center">
                <!-- This section will show the user info if logged in -->
                <span id="welcome-message" class="me-3" style="display: none;"></span>
                <a id="auth-btn" class="btn rounded-pill main-btn" href="#" style="display: none;">Log Out</a>
            </div>
        </div>
    </div>
</nav>`
}

export function loadFooter() {
    document.getElementById("footer").innerHTML = `
    <div class="footer pt-5 pb-5 text-white-50 text-center text-md-start">
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-lg-4">
                <div class="info mb-5">
                    <img src="imgs/logomain.png" alt="e-Store Logo" class="logo" />
                    <p class="mb-5">
                        e-Store is your ultimate online destination for quality products at unbeatable prices.
                        Start shopping today and experience the joy of convenience!
                    </p>
                    <div class="copyright">
                        Created By <span>تيم القاضية</span>
                        <div>&copy; 2024 - <span>e-Store</span></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-2">
                <div class="links">
                    <h5 class="text-light">Quick Links</h5>
                    <ul class="list-unstyled lh-lg">
                        <li>Home</li>
                        <li>Shop</li>
                        <li>Categories</li>
                        <li>Deals</li>
                        <li>Help Center</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-6 col-lg-2">
                <div class="links">
                    <h5 class="text-light">Company</h5>
                    <ul class="list-unstyled lh-lg">
                        <li>Sign In</li>
                        <li>Register</li>
                        <li>About Us</li>
                        <li>Blog</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="contact">
                    <h5 class="text-light">Customer Support</h5>
                    <p class="lh-lg mt-3 mb-5">Have questions? Our team is here to assist you. Reach out via email
                        or phone.</p>
                    <a class="btn rounded-pill main-btn w-100" href="#">support@e-Store.com</a>
                    <ul class="d-flex mt-5 list-unstyled gap-3">
                        <li>
                            <a class="d-block text-light" href="#"><i
                                    class="fa-brands fa-facebook fa-lg facebook rounded-circle p-2"></i></a>
                        </li>
                        <li>
                            <a class="d-block text-light" href="#"><i
                                    class="fa-brands fa-twitter fa-lg twitter rounded-circle p-2"></i></a>
                        </li>
                        <li>
                            <a class="d-block text-light" href="#"><i
                                    class="fa-brands fa-linkedin fa-lg linkedin rounded-circle p-2"></i></a>
                        </li>
                        <li>
                            <a class="d-block text-light" href="#"><i
                                    class="fa-brands fa-youtube fa-lg youtube rounded-circle p-2"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    `
}

export function loadMaintainanceAlert() {
    document.getElementById("maintainance-alert").innerHTML = `
   <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Important Notice:</strong> We are currently making some changes to the Firestore database. You can test
        the login using the following credentials:
        <div class="mt-2">
            <strong>Email:</strong> <b>waleed@gmail.com</b><br>
            <strong>Password:</strong> <b>123456</b>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
}