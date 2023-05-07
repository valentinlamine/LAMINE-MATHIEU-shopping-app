// Variables
const cartIcon = document.querySelector(".cart-icon");
const cartItems = document.querySelector(".cart-items");
const cartBlur = document.querySelector(".cart-blur");
const cartSummary = document.querySelector(".cart-summary");
let itemCartList = JSON.parse(localStorage.getItem("cart")) || [];


// Event Listeners
cartIcon.addEventListener("click", OpenCart);
cartBlur.addEventListener("click", OpenCart);


EnableLoadingCart();

function EnableLoadingCart() {
    document.querySelector(".cart-ctn .cart-items").style.display = "none";
    document.querySelector(".cart-ctn .loader-cart").style.display = "flex";
}

function DisableLoadingCart() {
    document.querySelector(".cart-ctn .cart-items").style.display = "flex";
    document.querySelector(".cart-ctn .loader-cart").style.display = "none";
    CheckScroll();
}

// Functions
function OpenCart() {
    if (cartItems.parentElement.classList.contains("open-cart") === false) {
        cartItems.parentElement.classList.add("open-cart");
        cartIcon.classList.add("fade");
        setTimeout(() => {
            cartIcon.classList.remove("fade");
            cartIcon.src = "img/other/close.png";
        }, 500);
        cartItems.parentElement.style.display = "flex";
        DisplayCartItems();
        document.querySelector("html").style.overflow = "hidden";
        cartIcon.style.marginRight = "12px";
        document.querySelector("html").style.paddingRight = "12px";
        cartBlur.style.display = "block";
    } else {
        cartItems.parentElement.classList.add("fadeout");
        cartIcon.classList.add("fade");
        setTimeout(() => {
            cartItems.parentElement.classList.remove("open-cart");
            EnableLoadingCart();
            cartItems.parentElement.style.display = "none";
            document.querySelector("html").style.overflow = "auto";
            cartIcon.style.marginRight = "0px";
            document.querySelector("html").style.paddingRight = "0px";
            cartBlur.style.display = "none";
        }, 500);
        setTimeout(() => {
            cartIcon.src = "img/other/cart.png";
            cartIcon.classList.remove("fade");
            cartItems.parentElement.classList.remove("fadeout");
        }, 500);

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
            <div class="cart-item-img"><img src="img/low/${CartItem.item.images[CartItem.color][0]}" alt="${CartItem.item.name}"></div>
            <div class="left"><div class="title-color">
            <div class="color ${CartItem.color}"></div>
            <div class="name">${CartItem.item.name}</div></div> 
            <div class="capacity">${CartItem.capacity}</div> 
            <div class="price">${Math.round((FindPrice(CartItem.item, CartItem.capacity) * CartItem.quantity) * 100) / 100} €</div>
            </div><div class="right">
            <button class="quantity-button" onclick="removeOneItemFromCart(${CartItem.item.id}, '${CartItem.color}', '${CartItem.capacity}')">-</button>
            <div class="quantity">${CartItem.quantity}</div>
            <button class="quantity-button" onclick="addOneItemToCart(${CartItem.item.id}, '${CartItem.color}', '${CartItem.capacity}')">+</button>
            <button class="remove-button" onclick="removeFromCart(${CartItem.item.id}, '${CartItem.color}', '${CartItem.capacity}')">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    if (total > 0) {
        cartSummary.innerHTML = `<div class="total-price">Total : ${Math.round(total * 100) / 100} €</div>`;
        cartSummary.innerHTML += `<button class="btn" onclick="ClearCart();">Clear Cart</button>`;
    } else {
        cartSummary.innerHTML = `<div class="total-price">Your cart is empty</div>`;
    }
    setTimeout(DisableLoadingCart, 100);
}

function CheckScroll() {
    if (cartItems.scrollHeight > cartItems.clientHeight) {
        cartItems.classList.add("scroll");
    } else {
        cartItems.classList.remove("scroll");
    }
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
