// Init API
const port = 3000;
const ip_add = "localhost"
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
document.addEventListener("change", function(e) {
    if (e.target.classList.contains("color-selector")) {
        if (e.target.value !== "all") {
            UpdateColor(e.target.parentElement.parentElement.parentElement, e.target.value);
        }
    }
});

// Functions
function GetSelectedValue() {
    let selectedColor = document.querySelector("#color-selector option:checked").value;
    let selectedDevice = document.querySelector(".device-selector input:checked").value;
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

function FoundItemStorage(btn, id, color) {
    let storage_input = btn.parentElement.previousElementSibling.querySelector(".storage-selector");
    let storage = storage_input.options[storage_input.selectedIndex].value;
    if (storage !== "none") {
        btn.setAttribute("onclick", `addItemToCart(${id}, '${color}', '${storage}')`);
        btn.click();
        btn.setAttribute("onclick", `FoundItemStorage(this, ${id}, '${color}')`);
        btn.innerHTML = "Ajouté au panier";
        setTimeout(() => {
            btn.innerHTML = "Ajouter au panier";
        }, 2000);
    } else {
        storage_input.style.border = "1px solid red";
        setTimeout(() => {
            storage_input.style.border = "1px solid black";
        }, 500);
        //make vibrate the selector
        storage_input.animate([
            { transform: 'translateX(-2px)' },
            { transform: 'translateX(2px)' },
            { transform: 'translateX(-2px)' },
            { transform: 'translateX(2px)' },
            { transform: 'translateX(-2px)' },
            { transform: 'translateX(2px)' },
            { transform: 'translateX(-2px)' },
            { transform: 'translateX(2px)' },
        ], {
            duration: 500,
            iterations: 1
        });
    }
}

function DisplayItemsCards(color) {
    card_container.innerHTML = "";
    filteredItems.forEach(item => {
        if (!item.colors.includes(color)) {
            color = item.colors[0];
        }
        let itemCtn = document.createElement("div");
        itemCtn.classList.add("item");

        //Génération de la partie gauche
        let HTMLContent = `<div class="left">`;
        if (item.images[color].length > 1) {HTMLContent += `
            <a onclick="PreviousImage(this.nextElementSibling.nextElementSibling)"><img class="left-img" src="img/other/left.svg"></a>
            <a onclick="NextImage(this.nextElementSibling)"><img class="right-img" src="img/other/right.svg"></a>`;}
        HTMLContent += `<div class="item-imgs">`;
        for (let i = 0; i < item.images[color].length; i++) {
            if (item.device !== "mac") {
                if (i === 0) {HTMLContent += `<img class="item-img active" src="${item.images[color][i]}" alt="${item.name}">`;
                } else {HTMLContent += `<img class="item-img" src="${item.images[color][i]}" alt="${item.name}">`;}
            } else {
                if (i === 0) {HTMLContent += `<img class="item-img mac active" src="${item.images[color][i]}" alt="${item.name}">`;
                } else {HTMLContent += `<img class="item-img mac" src="${item.images[color][i]}" alt="${item.name}" style="display: none;">`;}}}
        HTMLContent += `</div></div>`;

        //Génération de la partie droite
        HTMLContent += `<div class="right">
            <div class="first-group">
                <div class="item-name">${item.name}</div>
                <div class="item-price">À Partir de ${item.price[0]} €</div></div>
            <div class="second-group">
                <select class="item color-selector" name="color">`;
                item.colors.forEach(color => {HTMLContent += `<option value="${color}">${color}</option>`;});
        HTMLContent += `</select>
            <select class="storage-selector" name="storage">
                <option value="none" selected disabled hidden>Choisissez une capacité</option>`;
                item.storage.forEach(storage => {HTMLContent += `<option value="${storage}">${storage}</option>`;})
        HTMLContent += `</select></div>
            <div class="third-group">
                <button onclick="details(${item.id}, '${color}')">Voir fiche produit</button>
                <button onclick="FoundItemStorage(this, ${item.id}, '${color}')">Ajouter au panier</button>
            </div></div>`;
        itemCtn.innerHTML += HTMLContent;
        card_container.appendChild(itemCtn);
    });
}

function UpdateColor(selector, color) {
    selector.querySelectorAll(".left .item-imgs .item-img").forEach(img => {
        let img_splited = img.src.split("/");
        img_splited[img_splited.length - 1] = color + ".jpg";
        img.src = img_splited.join("/");
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

function NextImage(img_ctn) {
    for (let i = 0; i < img_ctn.children.length; i++) {
        if (img_ctn.children[i].classList.contains("active")) {
            img_ctn.children[i].classList.remove("active");
            if (i === 0) {
                img_ctn.children[img_ctn.children.length - 1].classList.add("active");
            } else {
                img_ctn.children[i - 1].classList.add("active");
            }
            break;
        }
    }
}

function PreviousImage(img_ctn) {
    for (let i = 0; i < img_ctn.children.length; i++) {
        if (img_ctn.children[i].classList.contains("active")) {
            img_ctn.children[i].classList.remove("active");
            if (i === img_ctn.children.length - 1) {
                img_ctn.children[0].classList.add("active");
            } else {
                img_ctn.children[i + 1].classList.add("active");
            }
            break;
        }
    }
}

//detail

function details(id,color){
    const detail= { id, color};
    localStorage.setItem("details", JSON.stringify(detail));
    window.location.href= "detail.html";
}

// Init App
GetItemsFromAPI();
