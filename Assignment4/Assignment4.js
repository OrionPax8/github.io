"use strict"


window.addEventListener("load", initCards);
let maxCards = 9;
// Create Cards

function initCards() {

let productDiv = document.getElementById("products");
let cardContainer = document.createElement("div");
cardContainer.className = "row";
productDiv.appendChild(cardContainer);

for (let y = 0; y < 4; y++){
    let cardgrid = document.createElement("div");
    cardgrid.className = "column";
    cardgrid.id = "column" + y;
    cardContainer.appendChild(cardgrid);
}

const xhr = new XMLHttpRequest();

   // Handle the changing request state
   xhr.onreadystatechange = function() {
    if (xhr.readyState === 4){

       if (xhr.status >= 200 && xhr.status < 300){

          //Manage the response
          //stories.innerHTML = xhr.responseText;

       } else {
          console.log("Request Failed: " + xhr.statusText);
       }
    }
 }

 xhr.open("get", "./products.json");
 xhr.send(null);

xhr.onload = function() {
    let jsonValues = this.responseText;
    jsonValues = JSON.parse(jsonValues);

    for (let x = 0; x < jsonValues.length; x++) {
        setTimeout(createCard, ((x+1) *1000), jsonValues[x], x);
     }
}

function createCard(jsonData, i){

    let cardgrid = document.getElementById("column" + (i % 4));
    let card = document.createElement("div");
    card.className = "card"

    let source = jsonData.src;
    let alt = jsonData.alt;
    let title = jsonData.title;
    let price = jsonData.price;
    let desc = jsonData.description;

    let image = document.createElement("img"); 
    image.src = source;
    image.alt = alt;
    card.appendChild(image);

    let header = document.createElement("h2");
    header.textContent = title;
    card.appendChild(header);

    let displayPrice = document.createElement("p");
    displayPrice.className = "price";
    displayPrice.textContent = price;
    card.appendChild(displayPrice);

    let itemDescription = document.createElement("p");
    itemDescription.textContent = desc;
    card.appendChild(itemDescription);

    if (jsonData.actionURL){
        //console.log("In if statement");
        let buttonLabel = jsonData.actionLabel;
        let buttonURL = jsonData.actionURL;

        let buttonPara = document.createElement("p");
        let buttonText = document.createElement("button");

        buttonText.textContent = buttonLabel;
        buttonText.onclick = createModal;
        buttonText.value = buttonURL;
        buttonPara.appendChild(buttonText);
        card.appendChild(buttonPara);
    }

    let barProgress = ((i + 1) / maxCards) * 100;
    let progressBar = document.getElementById("myBar");
    progressBar.style.width = barProgress + "%";

    cardgrid.appendChild(card);
    //console.log(card);
}
}

function createModal() {
    let modalWindow = document.createElement("div");
    modalWindow.id = "lbOverlay";
    let figureBox = document.createElement("figure");
    modalWindow.appendChild(figureBox);
    
    let jsonName = document.activeElement.value;
    let figureCaption = document.createElement("figcaption");
    let modalImage = document.createElement("img");

    let buttonPara = document.createElement("p");
    let buttonText = document.createElement("button");



    fetch(jsonName)
    .then(response => response.text())
    .then(jsonData => {   
        jsonData = JSON.parse(jsonData);
        console.log(jsonData);     
        modalImage.src = jsonData.src;
        modalImage.alt = jsonData.alt;
        figureCaption.textContent = jsonData.description + ": $" + jsonData.price;
        let buttonLabel = jsonData.actionLabel;

        buttonText.textContent = buttonLabel;
        buttonText.onclick = () =>{
            document.body.removeChild(modalWindow);
        }
    });

    buttonPara.appendChild(buttonText);

    figureBox.appendChild(modalImage);

    figureBox.appendChild(figureCaption);

    figureBox.appendChild(buttonPara);

    let closeBox = document.createElement("div");
    closeBox.id = "lbOverlayClose";
    closeBox.innerHTML = "&times;";
    closeBox.onclick = function() {
    document.body.removeChild(modalWindow);
    }
    
    
    modalWindow.appendChild(closeBox);
    
    document.body.appendChild(modalWindow);
 }
