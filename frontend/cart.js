// Variables
const cartIcon = document.querySelector(".cart-icon");
const cartCtn = document.querySelector(".cart-ctn");
let itemCartList = JSON.parse(localStorage.getItem("cart")) || [];

// Event Listeners
cartIcon.addEventListener("click", OpenCart);

// Functions
function OpenCart() {
    cartCtn.classList.toggle("open-cart");
    if (cartCtn.classList.contains("open-cart")) {
        cartIcon.src = "close.png";
        document.querySelector("html").style.overflow = "hidden";
        document.querySelector(".cart-blur").style.display = "block";
    } else {
        cartIcon.src = "cart.png";
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
    cartCtn.innerHTML = "";
    let total = 0;
    let cartTitle = document.createElement("div");
    cartTitle.classList.add("cart-title");
    cartTitle.innerHTML = `
       <div class="title">Cart</div>    
       <button>Order</button>
    `;
    cartCtn.appendChild(cartTitle);
    itemCartList.forEach(CartItem => {
        total += FindPrice(CartItem.item, CartItem.capacity) * CartItem.quantity;
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img class="cart-item-img" src="${CartItem.item.images[CartItem.color][0]}" alt="${CartItem.item.name}">
            <div>${CartItem.item.name} ${CartItem.capacity} ${CartItem.color}</div>
            <div>${FindPrice(CartItem.item, CartItem.capacity) * CartItem.quantity} €</div>
            <button onclick="removeOneItemFromCart(${CartItem.item.id}, '${CartItem.color}', '${CartItem.capacity}')">-</button>
            <div>${CartItem.quantity}</div>
            <button onclick="addOneItemToCart(${CartItem.item.id}, '${CartItem.color}', '${CartItem.capacity}')">+</button>
            <button onclick="removeFromCart(${CartItem.item.id}, '${CartItem.color}', '${CartItem.capacity}')">Remove</button>
        `;
        cartCtn.appendChild(cartItem);
    });
    if (total > 0) {
        let cartLine = document.createElement("div");
        cartLine.classList.add("cart-summary");
        cartLine.innerHTML += `<div class="total-price">Total : ${total} €</div>`;

        cartLine.innerHTML += `<button class="btn" onclick="ClearCart();">Clear Cart</button>`;
        cartCtn.appendChild(cartLine);
    }
}

function FindPrice(item, capacity) {
    for (let i = 0; i < item.storage.length; i++) {
        if (item.storage[i] === capacity) {
            return item.price[i];
        }
    }
}

//Init
DisplayCartItems();