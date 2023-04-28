const port = 3000;
const ip_add = "localhost"
const url = "http://" + ip_add + ":" + port;

const card_container = document.querySelector(".items-ctn");
const sort_pickers = document.querySelectorAll(".picker");

var items;
var filteredItems;

function GetItemsFromAPI() {
    fetch(url + "/items")
        .then(response => {
            return response.json();
        })
        .then(data => {
            items = data.items;
            filteredItems = items;
            DisplayItemsCards();
            DisplayCartItems();
        }
        )
        .catch(error => {
            console.log(error);
        }
        )           
}

function DisplayItemsCards() {
    card_container.innerHTML = "";
    filteredItems.forEach(item => {
        let itemCtn = document.createElement("div");
        itemCtn.classList.add("item");
        let color = item.colors[0];
        let picker = GetPickerSelected();
        if (picker.classList[1] !== "all") {
            color = picker.classList[1];
        }
        itemCtn.innerHTML = `
            <div class="images-ctn">`;
            for (let i = 0; i < item.images[color].length; i++) {
                    if (i === 0) {
                        itemCtn.innerHTML += `<img class="item-img active" src="${item.images[color][i]}" alt="${item.name}">`;
                    } else {
                        itemCtn.innerHTML += `<img class="item-img" src="${item.images[color][i]}" alt="${item.name}">`;
                    }
                }
            itemCtn.innerHTML += `</div>
            <div class="item-name">${item.name}</div>
            <div class="item-price">À Partir de ${item.price[0]} €</div>
            <button onclick="addItemToCartList(${item.id}, '${color}')">Ajouter au panier</button>
        `;
        card_container.appendChild(itemCtn);
    });
}


sort_pickers.forEach(picker => {
    picker.addEventListener("click", selectSelectedPicker);
});

function selectSelectedPicker(e) { 
    let picker = e.target;
    let color = e.target.classList[1];
    sort_pickers.forEach((e) => {
        e.classList.remove("selected");
    });
    picker.classList.add("selected");
    filterByColor(color);
}


function GetPickerSelected() {
    let pickerSelected;
    sort_pickers.forEach(picker => {
        if (picker.classList.contains("selected")) {
            pickerSelected = picker;
        }
    });
    return pickerSelected;
}

function filterByColor(color) {
    if (color === "all") {
        filteredItems = items;
        DisplayItemsCards();
    } else {
        filteredItems = items.filter(item => item.colors.includes(color));
        card_container.innerHTML = "";
        if ( filteredItems.length <= 0) {
            card_container.innerHTML = "Aucun item trouvée...";
        } else {
            DisplayItemsCards();
        }
    }
}

const ascendentPriceBtn = document.querySelector(".ascendent-price-btn");
const descendentPriceBtn = document.querySelector(".descendent-price-btn");
ascendentPriceBtn.addEventListener("click", sortByAscendantPrice);
descendentPriceBtn.addEventListener("click", sortByDescendantPrice);

function sortByAscendantPrice() {
    filteredItems.sort((a, b) => a.price[0] - b.price[0]);
    DisplayItemsCards();
}

function sortByDescendantPrice() {
    filteredItems.sort((a, b) => b.price[0] - a.price[0]);
    DisplayItemsCards();
}

const ipadBtn = document.querySelector("#iPad-Btn");
const iphoneBtn = document.querySelector("#iPhone-Btn");
const macBtn = document.querySelector("#Mac-Btn");
const allBtn= document.querySelector("#all-Btn");

ipadBtn.addEventListener("click", GetIpadFromAPI);
iphoneBtn.addEventListener("click", GetIphoneFromAPI);
macBtn.addEventListener("click", GetMacFromAPI);
allBtn.addEventListener("click", GetItemsFromAPI);

function GetIpadFromAPI(){
    fetch(url + "/ipad")
        .then(response => {
            return response.json();
        })
        .then(data => {
            items = data.items;
            filteredItems = items;
            DisplayItemsCards();
            DisplayCartItems();
        }
        )
        .catch(error => {
            console.log(error);
        }
        ) 
}  

function GetIphoneFromAPI(){
    fetch(url + "/iphone")
        .then(response => {
            return response.json();
        })
        .then(data => {
            items = data.items;
            filteredItems = items;
            DisplayItemsCards();
            DisplayCartItems();
        }
        )
        .catch(error => {
            console.log(error);
        }
        ) 
}

function GetMacFromAPI(){
    fetch(url + "/mac")
        .then(response => {
            return response.json();
        })
        .then(data => {
            items = data.items;
            filteredItems = items;
            DisplayItemsCards();
            DisplayCartItems();
        }
        )
        .catch(error => {
            console.log(error);
        }
        ) 
}
    
 



GetItemsFromAPI();



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
    let totalprice = 0;
    itemCartList.forEach(CartItem => {
        totalprice += CartItem.item.price[0] * CartItem.quantity;
        itemcart = document.createElement("div");
        itemcart.classList.add("cart-item");
        itemcart.innerHTML = `
            <img class="cart-item-img" src="${CartItem.item.images[CartItem.color][0]}" alt="${CartItem.item.name}">
            <div>${CartItem.item.name}</div>
            <div>${CartItem.color}</div>
            <div>${CartItem.item.price[0]} €</div>
            <button onclick="removeOneItemFromCart(${CartItem.item.id}, '${CartItem.color}')">-</button>
            <div>${CartItem.quantity}</div>
            <button onclick="addOneItemToCart(${CartItem.item.id}, '${CartItem.color}')">+</button>
            <button onclick="removeFromCart(${CartItem.item.id}, '${CartItem.color}')">X</button>
        `;
        cartCtn.appendChild(itemcart);
    });
    if (totalprice > 0) {
        cartCtn.innerHTML += `<div class="total-price">Total : ${totalprice} €</div>`;
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