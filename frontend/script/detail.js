// Init API
const port = 3000;
const ip_add = "localhost"
const url = "http://" + ip_add + ":" + port;

let itemDetails;
let item;

StartingFunc();

function StartingFunc() {
    itemDetails = localStorage.getItem("details");
    //example : {"id":1,"color":"black"}
    if (itemDetails === null) {
        window.location.href = "index.html";
    }
    itemDetails = JSON.parse(itemDetails);
    console.log(itemDetails.id);
    GetItemDetailsFromAPI();
}


function GetItemDetailsFromAPI() {
    fetch(url + "/item/" + itemDetails.id)
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