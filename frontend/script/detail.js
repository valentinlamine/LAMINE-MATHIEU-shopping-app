// Init API
const port = 3000;
const ip_add = "localhost";
const url = "http://" + ip_add + ":" + port;

let Storage;
let item;
let isDisplay = false;

const itemImages = document.querySelector(".item-images");
const itemText = document.querySelector(".item-description");
const text = document.querySelector(".item-description");
const selector_container = document.querySelector(".selectors-container");

//Loading page
document.querySelector(".bottom").style.display = "none";
document.querySelector(".loader").style.display = "flex";


StartingFunc();

function UpdateInformationSize() {
    let size = document.querySelector(".content .bottom");
    document.querySelector(".content .bottom .information").style.height = size.offsetHeight + "px";
}

function StartingFunc() {
    Storage = localStorage.getItem("details");
    if (Storage === null) {
        window.location.href = "index.html"; //afficher le rick rolled ici
    }
    Storage = JSON.parse(Storage);
    GetItemDetailsFromAPI();
}

function GetItemDetailsFromAPI() {
    fetch(url + "/item/" + Storage.id)
        .then((response) => response.json())
        .then((data) => {
            item = data.item;
            DisplayItemDetails();
        })
        .catch((error) => {
            console.log(error);
        });
}

function DisplayItemDetails() {
    DisplayImages();
    document.querySelector(".content #title").innerHTML = item.name;
    document.querySelector(".content #smaller-title").innerHTML = item.name;
    if (item.reduction > 0) {
        document.querySelector(".content #price").innerHTML = "<span class='old-price'>" + item.price[0] + item.currency + "</span><span class='new-price'>" + Math.trunc(item.price[0] - (item.price[0] * item.reduction / 100)) + item.currency + "</span>";
    } else {
        document.querySelector(".content #price").innerHTML = item.price[0] + item.currency;
    }
    document.querySelector(".content #colors").innerHTML = "<b>Colors</b><p>" + item.colors.join(", ") + "</p>";
    document.querySelector(".content #storage").innerHTML = "<b>Storages</b><p>" + item.storage.join(", ") + "</p>";
    document.querySelector(".content #release").innerHTML = "<b>Release</b><p>" + item.release_date + "</p>";
    document.querySelector(".content #size").innerHTML = "<b>Size</b><p>" + item.size + "</p>";
    document.querySelector(".content .add").setAttribute("onclick", `addItemToCart(${item.id}, "${Storage.color}", "${item.storage[0]}")`);
    DisplaySelector();
    DisplayDescription();
}

function DisplayImages() {
  itemImages.innerHTML = "";
  let imageList = `<form class="image-list">\n`;
  for (let i = 0; i < item.images[`${item.colors[0]}`].length; i++) {
    if (i === 0) {
      imageList += `
        <input type="radio" id="image${i}" value="img/medium/${item.images[`${item.colors[0]}`][i]}" name="image"  checked>
        <label class="images-label" for="image${i}"><img src="img/medium/${item.images[`${item.colors[0]}`][i]}" alt="item image ${i}"></label>\n`;
    } else {
      imageList += `
        <input type="radio" id="image${i}" value="img/medium/${item.images[`${item.colors[0]}`][i]}" name="image">
        <label class="images-label" for="image${i}"><img src="img/medium/${item.images[`${item.colors[0]}`][i]}" alt="item image ${i}"></label>\n`;
    }
  }
  imageList += `</form>`;
  let mainImage = document.createElement("div");
  mainImage.classList.add("main-image");
  mainImage.innerHTML = `<img id="main-image" src="img/high/${
    item.images[`${item.colors[0]}`][0]
  }" alt="${item.name}">`;

  itemImages.appendChild(mainImage);
  itemImages.innerHTML += imageList;
}

function changeMainImage(src) {
    document.querySelector("#main-image").src = src;
}

function IsChecked() {
    let src = document.querySelector(".image-list input:checked").value;
    src = src.split("/");
    src[1] = "high";
    src = src.join("/");
    changeMainImage(src);
}
function DisplayDescription() {
    itemText.innerHTML = item.description.substring(0,150)+`... <a id="btn-detail" href="#">afficher plus</a>`;
    document.addEventListener("click", function (e) {
        if (e.target && e.target.id === "btn-detail") {
            displayMore();
        }
    });
}

function FullyLoaded() {
    DisableLoadPage();
    UpdateInformationSize();
}

function DisableLoadPage() {
    document.querySelector(".bottom").style.display = "flex";
    document.querySelector(".loader").style.display = "none";
}

function displayMore() {
    let longText = item.description;
    let shortText = longText.substring(0,150)+"...";
    if(!isDisplay){
        text.innerHTML="";
        text.innerHTML=longText + `<a id="btn-detail" href="#">afficher moins</a>`;
        isDisplay = true; 
    }else{
        text.innerHTML="";
        text.innerHTML=shortText + `<a id="btn-detail" href="#">afficher plus</a>`;
        isDisplay = false;
    }
 
}

function DisplaySelector(){
    selector_container.innerHTML="";
    let selector = "";
    if (item.colors.length > 1) {
        selector = `<div class="color-selector">`;
        for (let i = 0; i < item.colors.length; i++) {
          if (item.colors[i] === Storage.color) {
            selector += `
            <input type="radio" id="color${i}" value="${item.colors[i]}" name="color" checked>
            <label class="color-picker ${item.colors[i]}" for="color${i}"><span class="check"></span></label>\n`;
          } else {
            selector += `
            <input type="radio" id="color${i}" value="${item.colors[i]}" name="color">
            <label class="color-picker ${item.colors[i]}" for="color${i}"><span class="check"></span></label>\n`;
          }
        }
        selector += `</div>`;
        selector_container.innerHTML = selector;
    }
    if (item.storage.length > 1) {
        selector = `<div class="storage-selector">`;
        for (let i = 0; i < item.storage.length; i++) {
          if (i === 0) {
            selector += `
            <input type="radio" id="storage${i}" value="${item.storage[i]}" name="storage"  checked>
            <label class="storage-label" for="storage${i}">${item.storage[i]}<span class="check"></span></label>\n`;
          } else {
            selector += `
            <input type="radio" id="storage${i}" value="${item.storage[i]}" name="storage">
            <label class="storage-label" for="storage${i}">${item.storage[i]}<span class="check"></span></label>\n`;
          }
        }
        selector += `</div>`;
        selector_container.innerHTML += selector;
    }
}

function UpdatePageColorStorage() {
    let color = document.querySelector(".content .selectors-container .color-selector input:checked").value;
    Storage.color = color;
    let storage = document.querySelector(".content .selectors-container .storage-selector input:checked").value;
    document.querySelector(".content .add").setAttribute("onclick", `addItemToCart(${item.id}, "${color}", "${storage}")`);
    let actualImg = document.querySelector(".main-image img").src.split("/");
    actualImg[actualImg.length - 1] = color + ".jpg";
    actualImg.splice(0, 3);
    document.querySelector(".main-image img").src = actualImg.join("/");
    let listImg = document.querySelectorAll(".image-list img");
    for (let i = 0; i < listImg.length; i++) {
        let src = listImg[i].src.split("/");
        src.splice(0, 3);
        src[src.length - 1] = color + ".jpg";
        listImg[i].src = src.join("/");
        listImg[i].parentElement.previousElementSibling.value = src.join("/");
    }
    if (item.reduction > 0) {
        document.querySelector(".content #price").innerHTML = "<span class='old-price'>" + item.price[0] + item.currency + "</span><span class='new-price'>" + GetPrice(storage) + item.currency + "</span>";
    } else {
        document.querySelector(".content #price").innerHTML = GetPrice(storage) + item.currency;
    }
}

function GetPrice(capacity) {
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

function DocumentEventChange(e) {
    if (e.target.name === "image") {
        IsChecked();
    } if (e.target.name === "color" || e.target.name === "storage") {
        UpdatePageColorStorage();
    }
    UpdateInformationSize();
}

document.addEventListener("change", function (e) {
  DocumentEventChange(e);
});

window.addEventListener("resize", function () {
  UpdateInformationSize();
});

window.addEventListener("load", function () {
    FullyLoaded();
    document.querySelector("#btn-detail").addEventListener("click", function () {
        displayMore();
    });
});


