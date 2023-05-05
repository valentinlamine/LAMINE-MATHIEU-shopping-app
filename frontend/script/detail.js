// Init API
const port = 3000;
const ip_add = "25.11.144.33"
const url = "http://" + ip_add + ":" + port;

let Storage;
let item;

const itemImages= document.querySelector(".item-images");
const itemText= document.querySelector(".item-description");

StartingFunc();

function StartingFunc() {
    Storage = localStorage.getItem("details");
    if (Storage === null) {
        window.location.href = "index.html"; //afficher le rick rolled ici
    }
    Storage = JSON.parse(Storage);
    console.log(Storage.id);
    GetItemDetailsFromAPI();
}


function GetItemDetailsFromAPI() {
    fetch(url + "/item/" + Storage.id)
        .then(response => response.json())
        .then(data => {
            item = data.item;
            console.log(item);
            DisplayItemDetails();
        })
        .catch(error => {
            console.log(error);
        })
}

function DisplayItemDetails() {
    document.querySelector(".title").innerHTML = item.name;
    DisplayText();
    DisplayImages();
}

function DisplayImages(){
    itemImages.innerHTML="";
    let imageList = `<form class="image-list">\n`
    for (let i = 0; i < item.images[`${item.colors[0]}`].length; i++){
        if (i===0){
            imageList += `<input type="radio" id="image${i}" value="img/medium/${item.images[`${item.colors[0]}`][i]}" name="image"  checked><label for="image${i}"><img src="img/low/${item.images[`${item.colors[0]}`][i]}" alt="item image ${i}"></label>\n`;
        }else{
            imageList += `<input type="radio" id="image${i}" value="img/medium/${item.images[`${item.colors[0]}`][i]}" name="image"><label for="image${i}"><img src="img/low/${item.images[`${item.colors[0]}`][i]}" alt="item image ${i}"></label>\n`;
        }
    }
    imageList += `</form>`;
    let mainImage = document.createElement("div");
    mainImage.classList.add("main-image");
    mainImage.innerHTML = `<img id="main-image" src="img/high/${item.images[`${item.colors[0]}`][0]}" alt="${item.name}">`;

    itemImages.appendChild(mainImage);
    itemImages.innerHTML += imageList;
}

function DisplayText(){
    itemText.innerHTML = item.description;
}

function IsChecked(){
    let src=document.querySelector(".image-list input:checked").value;
    console.log(src);
    src = src.split("/");
    src[1]="high";
    src = src.join("/");
    changeMainImage(src);
}



function changeMainImage(src){
    document.querySelector("#main-image").src = src;
}

document.addEventListener("change", function(e){DocumentEventChange(e)});

function DocumentEventChange(e) {
     IsChecked();
     console.log("test ok");
}

