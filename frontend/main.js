// Init API
const port = 3000;
const ip_add = "25.11.144.33"
const url = "http://" + ip_add + ":" + port;

// Query Selectors
const card_container = document.querySelector(".items-ctn");
const ascendantPriceBtn = document.querySelector(".ascendant-price-btn");
const descendentPriceBtn = document.querySelector(".descendent-price-btn");

// variables
let items;
let filteredItems;

// Event Listeners
document.querySelector("#color-selector").addEventListener("change", GetSelectedValue);
document.querySelector(".device-selector").addEventListener("change", GetSelectedValue);
ascendantPriceBtn.addEventListener("click", sortByAscendantPrice);
descendentPriceBtn.addEventListener("click", sortByDescendantPrice);

// Functions
function GetSelectedValue() {
    let selectedColor = document.querySelector("#color-selector option:checked").value;
    let selectedDevice = document.querySelector(".device-selector input:checked").value;
    console.log(selectedColor);
    console.log(selectedDevice);
    filterItems(selectedColor, selectedDevice);
}

function filterItems(color, device) {
    if (color === "all" && device === "all") {
        filteredItems = items;
    } else if (color === "all") {
        filteredItems = items.filter(item => item.device === device);
    } else if (device === "all") {
        filteredItems = items.filter(item => item.colors.includes(color));
    } else {
        filteredItems = items.filter(item => item.device === device && item.colors.includes(color));
    }
    console.log(filteredItems);
    DisplayItemsCards(color);
}

function GetItemsFromAPI() {
    fetch(url + "/items")
        .then(response => {
            return response.json();
        })
        .then(data => {
            items = data.items;
            filteredItems = items;
            GetSelectedValue();
        }
        )
        .catch(error => {
            console.log(error);
        }
        )
}

function DisplayItemsCards(color) {
    card_container.innerHTML = "";
    filteredItems.forEach(item => {
        if (!item.colors.includes(color)) {
            color = item.colors[0];
        }
        let itemCtn = document.createElement("div");
        itemCtn.classList.add("item");
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

function sortByAscendantPrice() {
    filteredItems.sort((a, b) => a.price[0] - b.price[0]);
    DisplayItemsCards();
}

function sortByDescendantPrice() {
    filteredItems.sort((a, b) => b.price[0] - a.price[0]);
    DisplayItemsCards();
}

// Init App
GetItemsFromAPI();