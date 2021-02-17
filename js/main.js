"use strict";

let carts = document.querySelectorAll(".addCart-btn");
let cartMobile = document.querySelector(".cartMobile span");
let cartDesktop = document.querySelector(".cartDesktop span");

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

//Functions for opening the sidepanel menu
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

//makes the buttons work
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

//when reloading page, the numbers beside cart stays if there's anything in local storage
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    cartDesktop.textContent = productNumbers;
    cartMobile.textContent = productNumbers;
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
    //updates the number beside the cart
    cartMobile.innerText = productNumbers + 1;
    cartDesktop.innerText = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    cartDesktop.innerText = 1;
    cartMobile.innerText = 1;
  }
  setItems(product);
}

//adds all the product information into local storage?
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    //if this is undefined i want to update my cartItems to whatever is in loicalo storage and update cartItems
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        //all elements of the objest is called with ...
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//add all the costs together
function totalCost(product) {
  //cartCost is the numbers that are inside the cart if there's
  //already something there
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price)
  }
}

//checks if there's something in the storage
onLoadCartNumbers();
