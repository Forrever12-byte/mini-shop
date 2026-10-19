let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
    {id: 1, img: "images/bag-blue.jpg", name: "Bag", price: 5000},
    {id: 2, img: "images/pen-black.webp", name: "Pen", price: 200},
    {id: 3, img: "images/shoe-brown.webp", name: "Shoe", price: 7500},
    {id: 4, img: "images/cap-black.webp", name: "Cap", price: 2500},
    {id: 5, img: "images/watch-black.webp", name: "Wristwatch", price: 4000}
];

const productGrid = document.getElementById("product-grid");
const cartList = document.getElementById("cart-list");
const total = document.getElementById("total");
const cartPanel = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const openCartBtn = document.getElementById("open-cart");
const closeCartBtn = document.getElementById("close-cart");
const cartCount = document.getElementById("cart-count");
const barTotal = document.getElementById("bar-total");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function openCart() {
    cartPanel.classList.remove("translate-y-full", "md:translate-x-full");;
    overlay.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

function closeCart() {
    cartPanel.classList.add("translate-y-full", "md:translate-x-full");;
    overlay.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

function renderCart() {

    saveCart();

    cartList.innerHTML = "";

    let running = 0;

    let itemCount = 0;

    for(let i = 0; i < cart.length; i++) {
        const existingProduct = products.find(product => product.id === cart[i].productId);
        const item = cart[i];
        const lineTotal = existingProduct.price * item.qty;

        running = running + lineTotal;

        itemCount = itemCount + item.qty;

        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.classList.add("increase-btn");

        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.classList.add("decrease-btn");

        const qtyBtn = document.createElement("div");
        qtyBtn.classList.add("qty-btn");
        qtyBtn.append(decreaseBtn, increaseBtn);

        increaseBtn.addEventListener('click', () => {

            item.qty = item.qty + 1;

            renderCart();
        });

        decreaseBtn.addEventListener('click', () => {

            if(item.qty > 1) {
                item.qty = item.qty - 1;
            } else {
                cart = cart.filter(cartItem => cartItem.productId !== item.productId);
            }

            renderCart();
        });

        const li = document.createElement("li");
        li.classList.add("product-line");
        li.textContent = `${existingProduct.name} x ${item.qty} - ₦${lineTotal}`;
        li.append(qtyBtn);
        cartList.append(li);

    }
    total.textContent = `₦${running}`;
    barTotal.textContent = `₦${running}`;
    cartCount.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
}

function renderProducts() {

    for(let i = 0; i < products.length; i++) {
        const productId = products[i].id;

        const productCard = document.createElement('div');
        productCard.classList.add("product-card");

        const productImage = document.createElement('img');
        productImage.classList.add("product-image");
        productImage.src = `${products[i].img}`;

        const productName = document.createElement('h3');
        productName.classList.add("product-name");
        productName.textContent = `${products[i].name}`;

        const productPrice = document.createElement('span');
        productPrice.classList.add("product-price");
        productPrice.textContent = `₦${products[i].price}`;

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add("cart-btn");
        addToCartBtn.textContent = "Add to Cart";

        const productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        productDetails.append(productName, productPrice);

        productCard.append(productImage, productDetails, addToCartBtn);

        productGrid.append(productCard);

        addToCartBtn.addEventListener('click', () => {

            const existingItem = cart.find(item => item.productId === productId);

            if(existingItem) {
                existingItem.qty = existingItem.qty + 1
            } else {
                cart.push({productId: productId, qty: 1});
            }

            renderCart();
        });
    }
}

renderProducts();
renderCart();