// Init API
const port = 3000;
const ip_add = "localhost"
const url = "http://" + ip_add + ":" + port;

let LocalStorage;
let item;

const itemImages= document.querySelector(".item-images");
const itemText= document.querySelector("items-detail");

StartingFunc();

function StartingFunc() {
    LocalStorage = localStorage.getItem("details");
    if (LocalStorage === null) {
        window.location.href = "index.html"; //afficher le rick rolled ici
    }
    LocalStorage = JSON.parse(LocalStorage);
    console.log(LocalStorage.id);
    GetItemDetailsFromAPI();
}


function GetItemDetailsFromAPI() {
    fetch(url + "/item/" + LocalStorage.id)
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
}

function DisplayImages(){
    itemImages.innerHTML="";
    let imageList = document.createElement("form")
    let selectedValue= document.querySelector(".image-list input:checked").value;
    imageList.classList.add("image-list")

    let HtmlList;
    for (let i = 0; i < item.images[color].length; i++){
        if (i===0){
            HtmlList+= `<input type="radio" value="${item.images[color][i]}" name="image"  checked>
                        <label for="image"><img src="${item.images[color][i]}" alt="item image ${i}"></label>`
        }else{
            HtmlList+= `<input type="radio" value="${item.images[color][i]}" name="image">
                        <label for="image"><img src="${item.images[color][i]}" alt="item image ${i}"></label>`
        }
    }
    imageList.innerHTML+=HtmlList;

    let mainImage = document.createElement("div");
    mainImage.classList.add("main-image");
    let HtmlMainImage= `<img src="${selectedValue}" alt="item image">`
    mainImage.innerHTML+=HtmlMainImage;
    

    itemImages.appendChild(imageList);
    itemImages.appendChild(mainImage);
}

function DisplayText(){
    //itemText.innerHTML="";
    let itemDescription = document.createElement("p");
    itemDescription.classList.add("item-description");

    let HtmlText = `${item.description}`
    itemDescription.innerHTML+=HtmlText;
    itemText.appendChild(itemDescription)
}

DisplayText();

DisplayImages();