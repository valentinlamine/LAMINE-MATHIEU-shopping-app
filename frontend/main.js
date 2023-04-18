const port = 3000;
const ip_add = "localhost"
const url = "http://" + ip_add + ":" + port;

const container = document.querySelector(".sneakers-ctn");
const pickers = document.querySelectorAll(".picker");

let sneakers;
let filteredSneakers;

function GetSneakers() {
    fetch(url + "/sneakers")
        .then(response => {
            return response.json();
        })
        .then(data => {
            sneakers = data.sneakers;
            filteredSneakers = sneakers;
            console.log(data.sneakers);
            DisplaySneakers();
            loadCart();
        }
        )
        .catch(error => {
            console.log(error);
        }
        )           
}

function DisplaySneakers() {
    container.innerHTML = "";
    filteredSneakers.forEach(sneaker => {
        let sneakerCtn = document.createElement("div");
        sneakerCtn.classList.add("sneaker-item");
        sneakerCtn.innerHTML = `
            <img class="sneaker-img" src="${sneaker.img_1}">
            <div class="sneaker-name">${sneaker.name}</div>
            <div class="sneaker-price">${sneaker.price} €</div>
            <button onclick="addSneaker(${sneaker.id})">Ajour au panier</button>
        `;
        container.appendChild(sneakerCtn);
    });
}

pickers.forEach(picker => {
    picker.addEventListener("click", selectItem);
});

function selectItem(e) {
    let picker = e.target;
    let color = e.target.classList[2];
    pickers.forEach((e) => {
        e.classList.remove("selected");
    });
    picker.classList.add("selected");
    console.log(color);
    filterByColor(color);
}

function filterByColor(color) {
    if (color === "all") {
        filteredSneakers = sneakers;
        DisplaySneakers();
    } else {
        filteredSneakers = sneakers.filter(sneaker => sneaker.colors === color);
        container.innerHTML = "";
        if ( filteredSneakers.length <= 0) {
            container.innerHTML = "Auune sneaker trouvée...";
        } else {
            DisplaySneakers();
        }
    }
}

const priceBtn = document.querySelector(".price-btn");
priceBtn.addEventListener("click", sortByPrice);

function CompareByPrice(a, b) {
    return a.price - b.price;
}

function sortByPrice() {
    filteredSneakers.sort(CompareByPrice);
    DisplaySneakers();
}

GetSneakers();

const cartIcon = document.querySelector(".cart-icon");
const cartCtn = document.querySelector(".cart-ctn");

function toogleCart() {
    cartCtn.classList.toggle("open-cart");
    if (cartCtn.classList.contains("open-cart")) {
        cartIcon.src = "close.png";
    } else {
        cartIcon.src = "cart.png";
    }
}

cartIcon.addEventListener("click", toogleCart);

//Local Storage
let cartList = JSON.parse(localStorage.getItem("cart")) || [];

function addSneaker(id) {
    let sneaker = sneakers.find(sneaker => sneaker.id === id);
    cartList.push(sneaker);
    localStorage.setItem("cart", JSON.stringify(cartList));
    console.log(cartList);
    loadCart();
}

function loadCart() {
    cartCtn.innerHTML = "";
    cartList.forEach(sneaker => {
        sneakercart = document.createElement("div");
        sneakercart.classList.add("cart-item");
        sneakercart.innerHTML = `
            <img class="cart-sneaker-img" src="${sneaker.img_1}" alt="sneaker"/>
            <div>${sneaker.name}</div>
            <div>${sneaker.price} €</div>
            <button onclick="removeFromCart(${sneaker.id})">Supprimer</button>
        `;
        cartCtn.appendChild(sneakercart);
    });
}

function removeFromCart(id) {
    let indexToRemove = cartList.findIndex(sneaker => sneaker.id === id);
    cartList.splice(indexToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadCart();
}
