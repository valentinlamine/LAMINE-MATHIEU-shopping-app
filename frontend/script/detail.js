// Init API
const port = 3000;
const ip_add = "localhost";
const url = "http://" + ip_add + ":" + port;

let Storage;
let item;
let isDisplay = false;

const itemTitle = document.querySelector(".content #title");
const itemImages = document.querySelector(".item-images");
const itemText = document.querySelector(".item-description");
const text = document.querySelector(".item-description");
const btnAfficher = document.querySelector("#btn-detail");
const selector_container = document.querySelector(".selectors-container");



StartingFunc();

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
            console.log(item);
            DisplayItemDetails();
        })
        .catch((error) => {
            console.log(error);
        });
}

function DisplayItemDetails() {
    console.log(itemTitle.innerHTML, item.name);
    itemTitle.innerHTML = item.name;
    DisplayText();
    DisplayImages();
    displaySelector();
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
    console.log(src);
    src = src.split("/");
    src[1] = "high";
    src = src.join("/");
    changeMainImage(src);
}
function DisplayText() {
    itemText.innerHTML = item.description.substring(0,150)+`... <a id="btn-detail" href="#">afficher plus</a>`;
}


function displayMore() {
    let longText = item.description;
    let shortText = longText.substring(0,150)+"...";

    if(!isDisplay){
        btnAfficher.innerHTML="";
        btnAfficher.innerHTML=`afficher moins`;
        text.innerHTML="";
        text.innerHTML=longText;
        isDisplay = true; 
    }else{
        text.innerHTML="";
        text.innerHTML=shortText;
        btnAfficher.innerHTML="";
        btnAfficher.innerHTML=`afficher plus`;
        isDisplay = false;
    }
 
}

function displaySelector(){
    selector_container.innerHTML="";
    let selector = "";
    if (item.colors.length > 1) {
        selector = `<div class="color-selector">`;
        for (let i = 0; i < item.colors.length; i++) {
          if (item.colors[i] === Storage.color) {
            selector += `
            <input type="radio" id="color${i}" value="${item.colors[i]}" name="color" checked>
            <label class="color-label" for="color${i}"><div class="color" style="background-color: ${item.colors[i]}"></div></label>\n`;
          } else {
            selector += `
            <input type="radio" id="color${i}" value="${item.colors[i]}" name="color">
            <label class="color-label" for="color${i}"><div class="color" style="background-color: ${item.colors[i]}"></div></label>\n`;
          }
        }
        selector += `</div>`;
        selector_container.innerHTML = selector;
    }
    if (item.storage.length > 1) {
        selector = `<div class="storage-selector">`;
        for (let i = 0; i < item.storage.length; i++) {
          if (item.storage[i] === Storage.storage) {
            selector += `
            <input type="radio" id="storage${i}" value="${item.storage[i]}" name="storage"  checked>
            <label class="storage-label" for="storage${i}">${item.storage[i]}</label>\n`;
          } else {
            selector += `
            <input type="radio" id="storage${i}" value="${item.storage[i]}" name="storage">
            <label class="storage-label" for="storage${i}">${item.storage[i]}</label>\n`;
          }
        }
        selector += `</div>`;
        selector_container.innerHTML += selector;
    }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#btn-detail").addEventListener("click", function () {
    displayMore();
  });
});

document.addEventListener("change", function (e) {
  DocumentEventChange(e);
});

function DocumentEventChange(e) {
  IsChecked();
}
