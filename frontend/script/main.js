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
document.querySelector(".color-selector").addEventListener("change", GetSelectedValue);
document.querySelector(".device-selector").addEventListener("change", GetSelectedValue);
document.querySelector(".storage-selector").addEventListener("change", GetSelectedValue);
ascendantPriceBtn.addEventListener("click", sortByAscendantPrice);
descendentPriceBtn.addEventListener("click", sortByDescendantPrice);
document.addEventListener("change", function(e){DocumentEventChange(e);});
window.addEventListener("load", function () {DisableLoadingPage();});



//Loading page
document.querySelector(".items-ctn").style.display = "none";
document.querySelector(".loader").style.display = "flex";

// Init API
GetItemsFromAPI();



// Functions
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
            document.querySelector(".items-ctn").innerHTML = `
            <h1>Please start the Backend server for display the items</h1>
            <h2>Go to the backend folder and run the command "npm start"</h2>
            <h2>Then <a href="index.html">refresh the page</a></h2>
            `;
            document.querySelector(".items-ctn").style.display = "flex";
            document.querySelector(".items-ctn").style.flexDirection = "column";
            document.querySelector(".items-ctn").style.justifyContent = "center";
        }
        )
}

function filterItems(colors, devices, storages) {
    filteredItems = items;
    if (colors[0] !== "all") {
        filteredItems = filteredItems.filter(item => item.colors.some(color => colors.includes(color)));
    }
    if (devices[0] !== "all") {
        filteredItems = filteredItems.filter(item => devices.includes(item.device));
    }
    if (storages[0] !== "all") {
        filteredItems = filteredItems.filter(item => item.storage.some(storage => storages.includes(storage)));
    }
    DisplayItemsCards(colors);
}

function DisplayItemsCards(colors) {
    card_container.innerHTML = "";
    filteredItems.forEach(item => {
        item.common_colors = item.colors.filter(color => colors.includes(color));
        if (item.common_colors.length === 0) {
            item.common_colors.push(item.colors[0]);
        }
        item.common_colors.forEach(color => {
            let itemCtn = document.createElement("div");
            itemCtn.classList.add("item");

            //Génération de la partie gauche
            let HTMLContent = `<div class="left">`;
            if (item.images[color].length > 1) {
                HTMLContent += `
                <a onclick="PreviousImage(this.nextElementSibling.nextElementSibling)"><img class="left-img" src="img/other/left.svg"></a>
                <a onclick="NextImage(this.nextElementSibling)"><img class="right-img" src="img/other/right.svg"></a>`;
            }
            HTMLContent += `<div class="item-imgs">`;
            for (let i = 0; i < item.images[color].length; i++) {
                if (item.device !== "mac") {
                    if (i === 0) {
                        HTMLContent += `<img class="item-img active" src="${item.images[color][i]}" alt="${item.name}">`;
                    } else {
                        HTMLContent += `<img class="item-img" src="${item.images[color][i]}" alt="${item.name}">`;
                    }
                } else {
                    if (i === 0) {
                        HTMLContent += `<img class="item-img mac active" src="${item.images[color][i]}" alt="${item.name}">`;
                    } else {
                        HTMLContent += `<img class="item-img mac" src="${item.images[color][i]}" alt="${item.name}">`;
                    }
                }
            }
            HTMLContent += `</div></div>`;

            //Génération de la partie droite
            HTMLContent += `<div class="right">
                <div class="first-group">`;
            if (item.reduction > 0) {
                HTMLContent += `<div class="item-name"><span class="title">${item.name}</span><span class="reduction">-${item.reduction}%</span></div>
                    <div class="item-price">À Partir de <span class="old price">${Math.trunc(item.price[0])} €</span><span class="new price">${Math.trunc(item.price[0] - (item.price[0] * item.reduction / 100))} €</span></div>`;
            } else {
                HTMLContent += `<div class="item-name"><span class="title">${item.name}</span></div>
                    <div class="item-price">À Partir de <span class="price">${Math.trunc(item.price[0])} €</span></div>`;
            }
            HTMLContent += `
                </div>
                <div class="second-group">
                    <select class="item color-selector" name="color">`;
            item.colors.forEach(colorItem => {
                if (colorItem === color) {
                    HTMLContent += `<option value="${colorItem}" selected>${colorItem}</option>`;
                } else {
                    HTMLContent += `<option value="${colorItem}">${colorItem}</option>`;
                }
            });
            HTMLContent += `</select>
                <select class="storage-selector" name="storage">
                    <option value="none" selected disabled hidden>Choisissez une capacité</option>`;
            item.storage.forEach(storage => {
                HTMLContent += `<option value="${storage}">${storage}</option>`;
            })
            HTMLContent += `</select></div>
                <div class="third-group">
                    <button onclick="details(${item.id}, '${color}')">Voir fiche produit</button>
                    <button onclick="GetItemStorage(this, ${item.id}, '${color}')">Ajouter au panier</button>
                </div></div>`;
            itemCtn.innerHTML += HTMLContent;
            card_container.appendChild(itemCtn);
        });
    });
}



//Event Listeners Functions
function DocumentEventChange(e) {
    console.log(e.target);
    if (e.target.classList.contains("color-selector")) {
        if (e.target.value !== "all") {
            UpdateColor(e.target.parentElement.parentElement.parentElement, e.target.value);
        }
    }
}

function UpdateColor(selector, color) {
    let id;
    selector.querySelectorAll(".left .item-imgs .item-img").forEach(img => {
        let img_splited = img.src.split("/");
        id = img_splited[img_splited.length - 3];
        img_splited[img_splited.length - 1] = color + ".jpg";
        img.src = img_splited.join("/");
    });
    selector.querySelector(".right .third-group button:nth-child(2)").setAttribute("onclick", `FoundItemStorage(this, ${id}, '${color}')`);
}

function GetSelectedValue() {
    let selectedColorInput = document.querySelectorAll(".color-selector input:checked");
    let selectedDeviceInput = document.querySelectorAll(".device-selector input:checked");
    let selectedStorageInput = document.querySelectorAll(".storage-selector input:checked");
    //Si aucun input n'est sélectionné, on coche le bouton "all"
    if (selectedColorInput.length === 0) {
        document.querySelector(".color-selector input[value='all']").checked = true;
    }
    if (selectedDeviceInput.length === 0) {
        document.querySelector(".device-selector input[value='all']").checked = true;
    }
    if (selectedStorageInput.length === 0) {
        document.querySelector(".storage-selector input[value='all']").checked = true;
    }
    //Si un input autre que "all" est sélectionné, on décoche le bouton "all"
    if (selectedColorInput.length > 0) {
        for (let i = 0; i < selectedColorInput.length; i++) {
            if (selectedColorInput[i].value !== "all") {
                document.querySelector(".color-selector input[value='all']").checked = false;
            }
        }
    }
    if (selectedDeviceInput.length > 0) {
        for (let i = 0; i < selectedDeviceInput.length; i++) {
            if (selectedDeviceInput[i].value !== "all") {
                document.querySelector(".device-selector input[value='all']").checked = false;
            }
        }
    }
    if (selectedStorageInput.length > 0) {
        for (let i = 0; i < selectedStorageInput.length; i++) {
            if (selectedStorageInput[i].value !== "all") {
                document.querySelector(".storage-selector input[value='all']").checked = false;
            }
        }
    }
    //On récupère les valeurs des inputs sélectionnés
    selectedColorInput = document.querySelectorAll(".color-selector input:checked");
    selectedDeviceInput = document.querySelectorAll(".device-selector input:checked");
    selectedStorageInput = document.querySelectorAll(".storage-selector input:checked");
    let selectedColor = [];
    let selectedDevice = [];
    let selectedStorage = [];
    for (let i = 0; i < selectedColorInput.length; i++) {
        selectedColor[i] = selectedColorInput[i].value;
    }
    for (let i = 0; i < selectedDeviceInput.length; i++) {
        selectedDevice[i] = selectedDeviceInput[i].value;
    }
    for (let i = 0; i < selectedStorageInput.length; i++) {
        selectedStorage[i] = selectedStorageInput[i].value;
    }
    filterItems(selectedColor, selectedDevice, selectedStorage);
}

function DisableLoadingPage() {
    document.querySelector(".items-ctn").style.display = "flex";
    document.querySelector(".loader").style.display = "none";
}

function sortByAscendantPrice() {
    filteredItems.sort((a, b) => a.price[0] - b.price[0]);
    let selectedColorInput = document.querySelectorAll(".color-selector input:checked");
    let selectedColor = [];
    for (let i = 0; i < selectedColorInput.length; i++) {
        selectedColor[i] = selectedColorInput[i].value;
    }
    DisplayItemsCards(selectedColor);
}

function sortByDescendantPrice() {
    filteredItems.sort((a, b) => b.price[0] - a.price[0]);
    let selectedColorInput = document.querySelectorAll(".color-selector input:checked");
    let selectedColor = [];
    for (let i = 0; i < selectedColorInput.length; i++) {
        selectedColor[i] = selectedColorInput[i].value;
    }
    DisplayItemsCards(selectedColor);
}



//User click function
function GetItemStorage(btn, id, color) {
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

function details(id,color){
    const detail= { id, color};
    localStorage.setItem("details", JSON.stringify(detail));
    window.location.href= "detail.html";
}