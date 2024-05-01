"use strict";
const userLogin = JSON.parse(sessionStorage.getItem("e-basketUser") || "[]");
const headerBtn = document.querySelector(".button");
const loginBtn = document.querySelector("#login");
const cartBtn = document.querySelector("#cartBtn");
const cartPage = document.querySelector(".cartPage");
const loader = document.querySelector('.loader');
let userName;
if (typeof userLogin === 'string') {
    userName = userLogin.split('@')[0];
}
if (userLogin.length > 0) {
    createCartBtn();
    createLogoutBtn();
    counter();
    loginBtn.style.display = "none";
}
function createLogoutBtn() {
    const logOutBtn = document.createElement("button");
    logOutBtn.setAttribute("class", "btn btn-danger");
    logOutBtn.setAttribute("id", "logoutBtn");
    logOutBtn.textContent = "Log Out";
    headerBtn.append(logOutBtn);
}
function createCartBtn() {
    const cartBtn = document.createElement("a");
    cartBtn.setAttribute("class", "btn btn-primary");
    cartBtn.setAttribute("href", "./html/cartPage.html");
    cartBtn.setAttribute("id", "cartBtn");
    cartBtn.textContent = "Cart";
    headerBtn.append(cartBtn);
}
function counter() {
    const countDiv = document.createElement("div");
    countDiv.setAttribute("class", "counter");
    countDiv.textContent = '0';
    headerBtn.append(countDiv);
}
const logoutBtn = document.querySelector("#logoutBtn");
if (logoutBtn != null) {
    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem('e-basketUser');
        loginBtn.style.display = "block";
        alert("yor are logout!!!");
        location.reload();
    });
}
if (cartBtn != null) {
    cartBtn.addEventListener("click", () => {
        cartPage.classList.add('.block');
    });
}
