"use strict";

let carts = document.querySelectorAll(".addCart-btn");
//array
let products = [
  //product information ?
  {
    name: "The Ebon necklace",
    tag: "ebon",
    price: 259,
    inCart: 0,
  },
  {
    name: "The Judith ring",
    tag: "judith",
    price: 345,
    inCart: 0,
  },
  {
    name: "The Alex bracelet",
    tag: "alex",
    price: 160,
    inCart: 0,
  },
];
//makes the buttons work
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
  });
}

//when reloading page, the numbers beside cart stays if there's anything in local storage
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

//function to know how many items are added to cart
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  //convert string to int
  productNumbers = parseInt(productNumbers);

  //if theres already something in local storage - add a number, else start from 1
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    //update the number beside the cart - only updates desktop version not mobile
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems() {
    console.log("inside of set items function");
    comsole.log("My product is", product);
}

//Functions for opening the sidepanel menu
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

//checks if there's something in the storage
onLoadCartNumbers();
