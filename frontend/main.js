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