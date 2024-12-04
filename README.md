# E-commerce Project

A simple E-commerce application for showcasing and purchasing products.

## Technologies Used
- **HTML**: For structuring the web pages.
- **CSS**: For styling the application.
- **JavaScript**: For interactive features and logic.
- **Bootstrap**: For responsive design and pre-built components.
- **Firebase**:
  - **Authentication**: Using email and password.
  - **Firestore**: Basic usage for data storage.

## Key Features
- **User Authentication**: Register and login using Firebase Authentication with email and password.
- **API Endpoints**:
  - One endpoint to retrieve all products.
  - Another endpoint to get a specific product by ID.
- **Local Storage**: Used to add products to the cart and retrieve them on the cart page.
- **Session Storage**: Used to save the login status of the user.

## Project Structure

### 1. HTML & CSS Files:
- **index.html**: The main webpage of the project.
- **styles.css**: Contains the CSS for styling the application.
- **login.html**: Page for user login.
- **register.html**: Page for user registration.
- **cart.html**: Page to display and manage the shopping cart.
- **about.html**: About page with project details or company info.
- **contact.html**: Page for contacting the company or project team.

### 2. JavaScript Files:
- **fire-store-conf.js**: Contains the Firestore configuration for database interaction.
- **auth.js**: Contains functions for user registration, login, and logout using Firebase Authentication.
- **load-header-footer.js**: Contains functions for dynamically loading the header and footer.
- **api.js**: Contains functions for calling the API to retrieve products.
- **cart.js**: Contains functions for managing the shopping cart (adding/removing products).
- **main.js**: The main script that calls the other files based on the required functionalities.

## JavaScript Functions - load-header-footer.js

### `loadHeader()`
This function dynamically loads the header section of the webpage. It generates the navigation bar, including the brand logo, navigation links (Home, Products, About, Contact), and a cart icon. Additionally, it displays the user info and login/logout button depending on the authentication status. The header content is injected into the HTML element with the ID `header`.

### `loadFooter()`
This function dynamically loads the footer section of the webpage. It adds HTML content for the footer, including the company info, quick links, customer support section, and social media icons. The footer content is injected into the HTML element with the ID `footer`.


## JavaScript Functions - auth.js

### `signUp(email, password, name)`
- **Purpose**: This function allows a new user to sign up with their email, password, and name. After signing up with Firebase Authentication, it stores the user's data in Firestore.

- **Inputs**: 
  - `email`: The email address of the user.
  - `password`: The password chosen by the user.
  - `name`: The name of the user.

- **Outputs**: 
  - Stores the user's email and name in Firestore under the 'users' collection.
  - Optionally, stores user data in sessionStorage or localStorage.

- **How it works**:
  1. Creates a new user with the provided email and password using Firebase Authentication.
  2. Upon successful registration, stores the user's name and email in Firestore.
  3. Optionally, you can store user data in sessionStorage for maintaining the user's session.

---

### `signIn(email, password)`
- **Purpose**: This function allows the user to sign in using their email and password. It also fetches the user's details from Firestore.

- **Inputs**: 
  - `email`: The email address of the user.
  - `password`: The password of the user.

- **Outputs**: 
  - Stores the user's email, name, and UID in sessionStorage if the sign-in is successful.

- **How it works**:
  1. Attempts to sign in using Firebase Authentication with the provided email and password.
  2. If successful, fetches the user’s data from Firestore using the user's UID.
  3. Stores the user's email, name, and UID in sessionStorage for session tracking.
  4. If user data cannot be found, it rejects with an error message.

---

### `checkUserStatus()`
- **Purpose**: This function checks whether the user is logged in by looking for user data in sessionStorage. It displays the login status and changes the UI accordingly.

- **Inputs**: None.

- **Outputs**: 
  - Displays the user’s name if logged in, along with a "Log Out" button.
  - Displays the "Sign In" button if the user is not logged in.

- **How it works**:
  1. Checks if the user's email and name are stored in sessionStorage.
  2. If the user is logged in, it shows a welcome message and a "Log Out" button.
  3. If the user is not logged in, it shows a "Sign In" button that redirects to the login page.
  4. When the user clicks the "Log Out" button, it clears the sessionStorage and redirects to the login page.


## JavaScript Functions - api.js

### `getProducts()`
- **Purpose**: This function fetches a list of products from the API, filters out the "beauty" category products, and returns the rest.

- **Inputs**: None.

- **Outputs**: 
  - A filtered list of products excluding those in the "beauty" category.

- **How it works**:
  1. Sends a `GET` request to the API endpoint `https://dummyjson.com/products`.
  2. If the request is successful, it parses the response as JSON.
  3. Filters out the products in the "beauty" category.
  4. Returns the filtered products list.
  5. If there’s an error in fetching or parsing, it logs the error and returns an empty array.

---

### `getProductById(productId)`
- **Purpose**: This function fetches a single product by its ID from the API.

- **Inputs**: 
  - `productId`: The unique identifier of the product to fetch.

- **Outputs**: 
  - The product details if found.
  - `null` if the product cannot be fetched.

- **How it works**:
  1. Sends a `GET` request to the API endpoint `https://dummyjson.com/products/{productId}` using the provided product ID.
  2. If the request is successful, it parses the response as JSON and returns the product details.
  3. If there’s an error in fetching or parsing, it logs the error and returns `null`.


## JavaScript Functions - cart.js

### `addToCart(product)`
- **Purpose**: Adds a product to the cart stored in local storage if it is not already present.

- **Inputs**: 
  - `product`: The product object to add to the cart. It must contain at least an `id` and `title`.

- **Outputs**: 
  - None, but it updates the local storage with the new cart and shows an alert indicating if the product was added or already exists in the cart.

- **How it works**:
  1. Retrieves the current cart from local storage.
  2. Checks if the product is already in the cart by comparing its ID.
  3. If not already in the cart, it adds the product and updates local storage.
  4. Calls `updateCartCount()` to update the cart count and shows an alert.

---

### `getCartItems()`
- **Purpose**: Fetches all the items currently in the cart from local storage.

- **Inputs**: None.

- **Outputs**: 
  - An array of products currently stored in the cart, or an empty array if the cart is empty.

- **How it works**:
  1. Retrieves and parses the cart data from local storage.
  2. Returns the cart items, or an empty array if the cart is not set.

---

### `saveCartItems(cart)`
- **Purpose**: Saves the provided cart data to local storage.

- **Inputs**: 
  - `cart`: An array of products to save.

- **Outputs**: 
  - None.

- **How it works**:
  1. Converts the `cart` array to a JSON string.
  2. Stores it in local storage under the key `"cart"`.

---

### `updateQuantity(productId, newQuantity)`
- **Purpose**: Updates the quantity of a specific product in the cart.

- **Inputs**: 
  - `productId`: The ID of the product to update.
  - `newQuantity`: The new quantity to set for the product.

- **Outputs**: 
  - None. It updates the cart in local storage and renders the updated cart items.

- **How it works**:
  1. Finds the product in the cart using its ID.
  2. Updates the quantity if the new value is positive.
  3. Saves the updated cart and re-renders the cart items.

---

### `removeFromCart(productId)`
- **Purpose**: Removes a product from the cart.

- **Inputs**: 
  - `productId`: The ID of the product to remove.

- **Outputs**: 
  - None. It updates the cart in local storage and re-renders the cart items.

- **How it works**:
  1. Filters out the product from the cart using its ID.
  2. Saves the updated cart and re-renders the cart items.

---

### `updateCartTotal()`
- **Purpose**: Calculates and updates the total price of the products in the cart.

- **Inputs**: None.

- **Outputs**: 
  - None. It updates the cart total in the UI.

- **How it works**:
  1. Iterates through all the items in the cart.
  2. Calculates the total price by multiplying the product price with its quantity.
  3. Displays the formatted total price in the UI.

---

### `updateCartCount()`
- **Purpose**: Updates the cart item count displayed in the navigation bar.

- **Inputs**: None.

- **Outputs**: 
  - None. It updates the cart count UI.

- **How it works**:
  1. Counts the number of items in the cart.
  2. Updates the cart count display in the UI.
  3. Shows or hides the cart count badge depending on the number of items.

---

### `renderCartItems()`
- **Purpose**: Dynamically renders the cart items on the cart page.

- **Inputs**: None.

- **Outputs**: 
  - None. It updates the cart items display in the UI.

- **How it works**:
  1. Retrieves all items in the cart.
  2. If the cart is empty, displays a message indicating this.
  3. For each product, creates a row with product details, including price, quantity input, and a remove button.
  4. Adds event listeners for quantity change and item removal.
  5. Calls `updateCartTotal()` to show the updated total.


# main.js Overview

The **`main.js`** file is responsible for handling various aspects of the e-commerce website, including user registration, login, displaying products, managing the shopping cart, and showing product details. It interacts with different sections of the page based on the user's actions and page navigation.

## 1. Loading the Header and Footer
- **`loadHeader()`** and **`loadFooter()`** are functions that load the common header and footer sections on every page, ensuring the navigation and layout are consistent throughout the website.

## 2. Checking User Login Status
- The function **`checkUserStatus()`** is executed after loading the header. It checks whether a user is logged in or not, updating the UI accordingly. This ensures that logged-in users see the correct UI elements (like the user profile or logout button).

## 3. Handling User Registration (register.html)
- On the **registration page** (`register.html`), a form allows users to sign up by providing their name, email, password, and confirming the password.
- If any of the fields are missing or passwords don't match, an error message is displayed.
- Upon successful registration, the user is redirected to the login page.
- The **`signUp()`** function is called to handle the sign-up process, and if successful, an alert is shown.

## 4. Handling User Login (login.html)
- On the **login page** (`login.html`), users are prompted to enter their email and password.
- If the fields are valid, the **`signIn()`** function is called to authenticate the user.
- Upon successful login, the user is redirected to the homepage (`index.html`), and a success message is displayed.

## 5. Displaying Products (index.html)
- On the **homepage** (`index.html`), products are dynamically fetched using the **`getProducts()`** function, which interacts with an external API.
- Products are displayed in a grid format, showing their image, title, description, and price.
- The page allows users to filter products by category using buttons. The **`filter-btn`** buttons update the product list based on the selected category.

## 6. Managing the Shopping Cart
- Users can add products to their shopping cart by clicking the **"Add to Cart"** button for any product.
- The **`addToCart()`** function checks if the product is already in the cart (stored in **localStorage**) and adds it if it isn't.
- The cart count is updated in the header using **`updateCartCount()`**, and a success message is shown to the user.

## 7. Viewing Product Details
- When a user clicks the **"View Details"** button for a product, the **`showProductDetails()`** function fetches detailed information about the selected product (such as price, stock, category, and warranty) and displays it in a modal window.
- The modal window is displayed using Bootstrap's modal component.

## 8. Cart Page (cart.html)
- On the **cart page** (`cart.html`), the cart items are dynamically rendered using **`renderCartItems()`**, which displays each product's image, title, price, and quantity.
- Users can change the quantity of items or remove items from the cart. The cart updates automatically, and the total price is recalculated.
- The **`updateCartTotal()`** function ensures that the total price is always accurate.

## 9. Summary of Features Handled by `main.js`
- **User Authentication:** Handles user registration, login, and checks login status.
- **Product Management:** Displays products dynamically and allows users to filter them by category.
- **Cart Management:** Adds, updates, and removes products from the shopping cart, and displays the cart total.
- **Product Details:** Displays detailed product information in a modal window when a user clicks on "View Details."
- **UI Updates:** Constantly updates the UI elements like cart count and product list based on user interactions.



# Team & Our Instructor

## Team Members

### Waleed Omar (Leader)
- **Role:** Team Leader
- **LinkedIn:** [Waleed Omar](https://www.linkedin.com/in/waleed-omar-0a1328246/)
- <img src="imgs/profileimg.png" alt="Waleed Omar" width="150" height="150">

### Mahmoud Khalaf
- **Role:** Developer
- **LinkedIn:** [Mahmoud Khalaf](https://www.linkedin.com/in/mahmoud-khalaf-a75027234/)
- <img src="imgs/kalaf.jpeg" alt="Mahmoud Khalaf" width="150" height="150">

### Ahmed Kamel
- **Role:** Developer
- **LinkedIn:** [Ahmed Kamel](https://www.linkedin.com/in/ahmed-mohamed-kamel-63337530a/)
- <img src="imgs/kamel.jpeg" alt="Ahmed Kamel" width="150" height="150">

### Maged Seha
- **Role:** Developer
- **LinkedIn:** [Maged Seha](https://www.linkedin.com/in/maged-michael-seha-a771021b2/)
- <img src="imgs/maged.png" alt="Maged Seha" width="150" height="150">

## Our Instructor

### Muhammed Omar
- **Role:** Instructor
- **LinkedIn:** [Muhammed Omar](https://www.linkedin.com/in/elnatory/)
- <img src="imgs/instructor.jpg" alt="Muhammed Omar" width="150" height="150">

---

## Special Thanks to Our Constructor

We would like to extend our deepest gratitude to **Muhammed Omar** for their invaluable contributions to the development of this project. Their expertise, guidance, and support played a key role in shaping the success of this work. Thank you for your dedication and commitment!


