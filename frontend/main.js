const url = "http://localhost:3000";

const button = document.querySelector(".sneakers_button");

button.addEventListener("click", GetSneakers);

function GetSneakers() {
    fetch(url + "/sneakers")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        }
        )
        .catch(error => {
            console.log(error);
        }
        )           
}