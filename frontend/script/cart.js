// Variables
const cartIcon = document.querySelector(".cart-icon");
const cartItems = document.querySelector(".cart-items");
let itemCartList = JSON.parse(localStorage.getItem("cart")) || [];


// Event Listeners
cartIcon.addEventListener("click", OpenCart);

EnableLoadingCart();

function EnableLoadingCart() {
    document.querySelector(".cart-ctn .cart-items").style.display = "none";
    document.querySelector(".cart-ctn .loader-cart").style.display = "flex";
}

function DisableLoadingCart() {
    document.querySelector(".cart-ctn .cart-items").style.display = "flex";
    document.querySelector(".cart-ctn .loader-cart").style.display = "none";
}

// Functions
function OpenCart() {
    cartItems.parentElement.classList.toggle("open-cart");
    if (cartItems.parentElement.classList.contains("open-cart")) {
        cartIcon.src = "img/other/close.png";
        cartItems.parentElement.style.display = "flex";
        //DisplayCartItems();
        document.querySelector("html").style.overflow = "hidden";
        document.querySelector(".cart-blur").style.display = "block";
    } else {
        cartIcon.src = "img/other/cart.png";
        EnableLoadingCart();
        cartItems.parentElement.style.display = "none";
        document.querySelector("html").style.overflow = "auto";
        document.querySelector(".cart-blur").style.display = "none";
    }
}

function addItemToCart(id, color, capacity) {
    id = id.toString() // Convert id to string
    
    if (itemCartList.some(item => item.item.id === id && item.color === color && item.capacity === capacity)) { // If item is already in cart, increment quantity
        itemCartList.forEach(item => { // If item is already in cart, increment quantity
            if (item.item.id === id && item.color === color && item.capacity === capacity) {
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
        capacity: capacity,
        quantity: 1
    };
    itemCartList.push(CartItem);
    localStorage.setItem("cart", JSON.stringify(itemCartList));
    console.log(itemCartList);
    DisplayCartItems();
}

function addOneItemToCart(id, color, capacity) {
    id = id.toString();
    itemCartList.forEach(item => {
        if (item.item.id === id && item.color === color && item.capacity === capacity) {
            item.quantity++;
        }
    });
    localStorage.setItem("cart", JSON.stringify(itemCartList));
    DisplayCartItems();
}

function removeFromCart(id, color, capacity) {
    id = id.toString();
    itemCartList = itemCartList.filter(item => item.item.id !== id || item.color !== color || item.capacity !== capacity);
    localStorage.setItem("cart", JSON.stringify(itemCartList));
    DisplayCartItems();
}

function removeOneItemFromCart(id, color, capacity) {
    id = id.toString();
    itemCartList.forEach(item => {
        if (item.item.id === id && item.color === color && item.capacity === capacity) {
            item.quantity--;
            if (item.quantity <= 0) {
                removeFromCart(id, color, capacity);
            }
        }
    });
    localStorage.setItem("cart", JSON.stringify(itemCartList));
    DisplayCartItems();
}

function ClearCart() {
    itemCartList = [];
    localStorage.setItem("cart", JSON.stringify(itemCartList));
    DisplayCartItems();
}

function DisplayCartItems() {
    cartItems.innerHTML = "";
    let total = 0;
    itemCartList.forEach(CartItem => {
        total += Math.round((FindPrice(CartItem.item, CartItem.capacity) * CartItem.quantity) * 100) / 100;
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img class="cart-item-img" src="img/low/${CartItem.item.images[CartItem.color][0]}" alt="${CartItem.item.name}">
            <div>${CartItem.item.name} ${CartItem.capacity} ${CartItem.color}</div>
            <div>${Math.round((FindPrice(CartItem.item, CartItem.capacity) * CartItem.quantity) * 100) / 100} €</div>
            <button onclick="removeOneItemFromCart(${CartItem.item.id}, '${CartItem.color}', '${CartItem.capacity}')">-</button>
            <div>${CartItem.quantity}</div>
            <button onclick="addOneItemToCart(${CartItem.item.id}, '${CartItem.color}', '${CartItem.capacity}')">+</button>
            <button onclick="removeFromCart(${CartItem.item.id}, '${CartItem.color}', '${CartItem.capacity}')">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    if (total > 0) {
        let cartLine = document.createElement("div");
        cartLine.classList.add("cart-summary");
        cartLine.innerHTML += `<div class="total-price">Total : ${Math.round(total * 100) / 100} €</div>`;

        cartLine.innerHTML += `<button class="btn" onclick="ClearCart();">Clear Cart</button>`;
        cartItems.appendChild(cartLine);
    }
    setTimeout(DisableLoadingCart, 100);
}

function PlaySound() {
    var sound = document.getElementById('sound2');
    sound.volume = 0.25;
    if (sound.paused) {
        sound.play();
    }
    else {
        sound.pause();
    }
}

function FindPrice(item, capacity) {
    for (let i = 0; i < item.storage.length; i++) {
        if (item.storage[i] === capacity) {
            if (item.reduction === 0) {
                return item.price[i];
            } else {
                //arrondi au centieme
                return Math.round(item.price[i] * (1 - item.reduction / 100) * 100) / 100;
            }
        }
    }
}



//Init
