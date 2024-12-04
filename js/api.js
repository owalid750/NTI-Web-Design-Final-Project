
export async function getProducts() {
    try {
        let response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        let products = await response.json();
        // console.log(products.products.filter(item => item.category !== "beauty").length);
        return products.products.filter(item => item.category !== "beauty");

    } catch (error) {
        console.log(error.message);
        return [];
    }
}


export async function getProductById(productId) {
    try {
        let response = await fetch(`https://dummyjson.com/products/${productId}`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        let product = await response.json();
        return product;

    } catch (error) {
        console.log(error.message);
        return null;

    }
}
