"use strict";

let carts = document.querySelectorAll(".addCart-btn");
let cartMobile = document.querySelector(".cartMobile span");
let cartDesktop = document.querySelector(".cartDesktop span");

//array with products information
let products = [
  {
    name: "The Ebon necklace",
    tag: "ebon",
    price: 689,
    inCart: 0,
  },
  {
    name: "The Judith ring",
    tag: "judith",
    price: 999,
    inCart: 0,
  },
  {
    name: "The Alex bracelet",
    tag: "alex",
    price: 650,
    inCart: 0,
  },
  {
    name: "The Tindra earrings",
    tag: "tindra",
    price: 450,
    inCart: 0,
  },
  {
    name: "The Mia ring",
    tag: "mia",
    price: 390,
    inCart: 0,
  },
  {
    name: "The Kim necklace",
    tag: "kim",
    price: 399,
    inCart: 0,
  },
  {
    name: "The Nicole earrings",
    tag: "nicole",
    price: 439,
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

//Goes through add to cart buttons, executing following functions
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
    cartDesktop.innerHTML = productNumbers;
    cartMobile.innerHTML = productNumbers;
  }
}

//function to know how many items are added to cart
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  //updates the number beside the cart
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    cartMobile.innerText = productNumbers + 1;
    cartDesktop.innerText = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    cartDesktop.innerText = 1;
    cartMobile.innerText = 1;
  }
  saveCart(product);
}

//adds all the product information into local storage
function saveCart(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
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

  localStorage.saveCart("productsInCart", JSON.stringify(cartItems));
}

//adds all the costs together
function totalCost(product) {
  //cartCost is the numbers that are inside the cart if there's already something there
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.saveCart("totalCost", cartCost + product.price);
  } else {
    localStorage.saveCart("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  //JSON.parse - trasnlates from JSON string to javaSript Object
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".shoppingCart-products");
  let cartCost = localStorage.getItem("totalCost");
  if (cartItems && productContainer) {
    productContainer.innetHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class = "product">
      <ion-icon class="remove-btn" name="close-outline"></ion-icon>
        <img src="./photos/${item.tag}.jpg">
        <span>${item.name}</span>
      </div>

      <div class="quantity">      
      <ion-icon class="add-remove" name="remove-circle"></ion-icon>
      <span>${item.inCart}</span>

      <ion-icon class="add-remove"name="add-circle"></ion-icon>
      </div>
      <div class="price">${item.price} kr</div>
      <div class="total">${item.inCart * item.price} kr</div>
      `;
    });

    productContainer.innerHTML += `
      <div class="totalPriceContainer">
        <h4 class="totalPriceTitle">Total Price:</h4>
        <h4 class="totalPrice">${cartCost} kr</h4>
        </div>
    `;
  }
}

//checks if there's something in the storage
onLoadCartNumbers();
displayCart();
