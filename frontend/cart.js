// Cart
const cartIcon = document.querySelector(".cart-icon");
const cartCtn = document.querySelector(".cart-ctn");

function OpenCart() {
    cartCtn.classList.toggle("open-cart");
    if (cartCtn.classList.contains("open-cart")) {
        cartIcon.src = "close.png";
    } else {
        cartIcon.src = "cart.png";
    }
}

cartIcon.addEventListener("click", OpenCart);

//Local Storage
let itemCartList = JSON.parse(localStorage.getItem("cart")) || [];

function addItemToCartList(id, color) {
    id = id.toString() // Convert id to string
    
    if (itemCartList.some(item => item.item.id === id && item.color === color)) { // Check if item is already in cart
        itemCartList.forEach(item => { // If item is already in cart, increment quantity
            if (item.item.id === id && item.color === color) { 
                item.quantity++;
            }
        });
        localStorage.setItem("cart", JSON.stringify(itemCartList)); // Update local storage
        DisplayCartItems(); // Update cart
        return; // Stop function
    }
     
    let CartItem = {
        item: items.find(item => item.id === id),
        color: color,
        quantity: 1
    };
    itemCartList.push(CartItem);
    localStorage.setItem("cart", JSON.stringify(itemCartList));
    console.log(itemCartList);
    DisplayCartItems();
}

function DisplayCartItems() {
    cartCtn.innerHTML = "";
    let total = 0;
    itemCartList.forEach(CartItem => {
        total += CartItem.item.price[0] * CartItem.quantity;
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img class="cart-item-img" src="${CartItem.item.images[CartItem.color][0]}" alt="${CartItem.item.name}">
            <div>${CartItem.item.name}</div>
            <div>${CartItem.color}</div>
            <div>${CartItem.item.price[0]} €</div>
            <button onclick="removeOneItemFromCart(${CartItem.item.id}, '${CartItem.color}')">-</button>
            <div>${CartItem.quantity}</div>
            <button onclick="addOneItemToCart(${CartItem.item.id}, '${CartItem.color}')">+</button>
            <button onclick="removeFromCart(${CartItem.item.id}, '${CartItem.color}')">X</button>
        `;
        cartCtn.appendChild(cartItem);
    });
    if (total > 0) {
        cartCtn.innerHTML += `<div class="total-price">Total : ${total} €</div>`;
    }
}

function removeFromCart(id, color) {
    id = id.toString();
    itemCartList = itemCartList.filter(item => item.item.id !== id || item.color !== color);
    localStorage.setItem("cart", JSON.stringify(itemCartList));
    DisplayCartItems();
}

function addOneItemToCart(id, color) {
    id = id.toString();
    itemCartList.forEach(item => {
        if (item.item.id === id && item.color === color) {
            item.quantity++;
        }
    });
    localStorage.setItem("cart", JSON.stringify(itemCartList));
    DisplayCartItems();
}

function removeOneItemFromCart(id, color) {
    id = id.toString();
    itemCartList.forEach(item => {
        if (item.item.id === id && item.color === color) {
            item.quantity--;
            if (item.quantity <= 0) {
                removeFromCart(id, color);
            }
        }
    });
    localStorage.setItem("cart", JSON.stringify(itemCartList));
    DisplayCartItems();
}