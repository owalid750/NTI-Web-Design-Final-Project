
// Function to add product to the cart
/* 
If the 'cart' key already exists:

The localStorage entry for 'cart' is replaced with the new cart array.
The previous value of 'cart' is overwritten, not appended.

If the 'cart' key does not exist:

The 'cart' key is created and the cart array is stored in it.

*/
export function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const isProductInCart = cart.some(item => item.id === product.id);

    if (!isProductInCart) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.title} added to the cart!`);
    } else {
        alert(`${product.title} is already in the cart.`);
    }
}


// utilities fun
// 1- get all products in cart form local storage
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// 2- 
function saveCartItems(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 3- update quantity of each item
function updateQuantity(productId, newQuantity) {
    let cart = getCartItems();
    let product = cart.find(item => item.id === productId);
    if (product) {
        let quantity = parseInt(newQuantity);
        if (quantity > 0) {
            product.quantity = quantity;
            saveCartItems(cart);
            renderCartItems();
        } else {
            alert('Please enter a valid positive number!');
        }
    }
}

// 4- remove item
function removeFromCart(productId) {
    let cart = getCartItems();
    cart = cart.filter(item => item.id !== productId);
    saveCartItems(cart);
    updateCartCount();
    renderCartItems();
}

// 5- update cart total
function updateCartTotal() {
    let totalElement = document.getElementById('cart-total');
    let cart = getCartItems();
    let totalPrice = cart.reduce((total, item) => {
        let price = parseFloat(item.price) || 0;
        let quantity = parseFloat(item.quantity) || 1;
        return total + (price * quantity);
    }, 0);
    console.log(totalPrice);

    totalElement.textContent = '$' + totalPrice.toFixed(2); // Format to 2 decimal places
}
// update cart count 
export function updateCartCount() {
    let cartCountELement = document.getElementById("cart-count");
    let cart = getCartItems();
    let itemsCount = cart.length;
    cartCountELement.innerHTML = itemsCount;
    // Show or hide the badge based on the count
    if (itemsCount > 0) {

        cartCountELement.classList.remove("d-none");
    } else {

        cartCountELement.classList.add("d-none");
    }
}

// Render cart items dynamically
export function renderCartItems() {
    const cart = getCartItems();
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    // Show message if cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty!</td></tr>';
        updateCartTotal();
        return;
    }
    else {
        console.log("Welcome");

        cart.forEach(product => {
            const productRow = document.createElement("tr");
            productRow.innerHTML = `
          <td>
            <div class="d-flex align-items-center justify-content-center">
              <img src="${product.thumbnail}" alt="${product.title}" class="img-fluid" width="50">
              <!--<span>${product.title}</span> -->
            </div>
          </td>

          <td>$${(parseFloat(product.price) || 0).toFixed(2)}</td>
          <td>
                <input type="number" class="form-control" value="${Math.max(product.quantity || 1, 1)}" min="1" id="quantity-${product.id}">
            </td>
          <td>$${((parseFloat(product.price) || 0) * (parseInt(product.quantity) || 1)).toFixed(2)}</td>
          <td><button class="btn btn-danger" id="remove-${product.id}">Remove</button></td>
        `;
            cartItemsContainer.appendChild(productRow);

            // handle update quantity
            document.getElementById(`quantity-${product.id}`).addEventListener("change", (e) => {
                updateQuantity(product.id, e.target.value)
            });
            // handle remove item
            document.getElementById(`remove-${product.id}`).addEventListener("click", () => {
                removeFromCart(product.id);
            })

        });
        // handle total price
        updateCartTotal();
    }
}









// test some() fun Does this array contain at least one element that meets my condition? it return true or false

/* const products = [
    { id: 1, title: "Laptop", inStock: false },
    { id: 2, title: "Phone", inStock: false },
    { id: 3, title: "Headphones", inStock: false }
];

let isAnyProductInStock= products.some(p=>p.inStock==true);
console.log(isAnyProductInStock);

 */


// test func find() it return the first obj if condition is true
/*
 let searchedId=2;
const products = [
    { id: 1, title: "Product 1", price: 10 },
    { id: 2, title: "Product 2", price: 20 },
    { id: 3, title: "Product 3", price: 30 }
];




roduct.id===searchedId);

console.log(result);
 */

