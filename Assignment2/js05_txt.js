"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);
let imageNumber = -1;
let favoriteImages = new Array(-1,-1,-1,-1,-1);

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("lightbox");
   let favoriteBox = document.getElementById("favoritebox");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   let slidesTitle = lightboxTitle; // TODO figure out title
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);

   let favoriteSlides = document.createElement("div");
   favoriteSlides.id = "favoriteSlides";
   favoriteBox.appendChild(favoriteSlides);
   
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.className = i;
      image.onclick = createModal;
      slideBox.appendChild(image);
   }
   

   
   
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "lbOverlay";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);

      imageNumber = modalImage.className;
      let addFavorite = document.createElement("button");
      addFavorite.onclick =  AddToFavorite;
      addFavorite.id = "addFavorite";
      addFavorite.textContent = "Add to Favorites";
      figureBox.appendChild(addFavorite);
      
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
      document.body.removeChild(modalWindow);
      }
      
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
   }
   
   function AddToFavorite(){

      // console.log("This works - line 133 " + imageNumber);

      let isFavorite = favoriteImages.includes(imageNumber);
      let favoritesNotFull = favoriteImages.includes(-1);
      let imageButtonPair = document.createElement("div");

      if(isFavorite){
         window.alert("This image is already in your favorites")
      } else if(!favoritesNotFull){
         window.alert("You can only have 5 favorites, please remove one")
      } else {
         let availableSlot = favoriteImages.indexOf(-1);
         favoriteImages[availableSlot] = imageNumber;

         let image = document.createElement("img");
         image.src = imgFiles[imageNumber];
         image.alt = imgCaptions[imageNumber];
         imageButtonPair.appendChild(image);

         let removeFavorite = document.createElement("button");
         removeFavorite.textContent = "Remove Favorite";
         removeFavorite.className = availableSlot;
         removeFavorite.onclick = removeFromFavorite;
         imageButtonPair.appendChild(removeFavorite);

         imageButtonPair.id = availableSlot;
         favoriteSlides.appendChild(imageButtonPair);
         
      }
      imageNumber=-1;
   }

   function removeFromFavorite(){

      // console.log("Line 176 runs");
      let clearSlot = document.activeElement.getAttribute("class");
      
      // console.log(clearSlot);
      
      favoriteImages[clearSlot] = -1;
      let imageToDrop =  document.getElementById(clearSlot);

      imageToDrop.remove();
      
   }
   
}