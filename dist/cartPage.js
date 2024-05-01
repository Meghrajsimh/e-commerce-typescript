"use strict";
const cartApi = "https://dummyjson.com/products?limit=100";
const tbody = document.querySelector("tbody");
const span = document.querySelector("#totalPrice");
const userCartName = JSON.parse(sessionStorage.getItem("e-basketUser") || "[]");
const n = userCartName.split("@")[0];
async function fetchData(api) {
    const productData = await fetch(api)
        .then((res) => res.json())
        .then((res) => res.products)
        .catch((e) => console.log(e));
    return productData;
}
async function displayCart() {
    let cartData = JSON.parse(localStorage.getItem("userItem") || "[]");
    let allProduct = await fetchData(cartApi);
    let totalPrice = 0;
    let display = "";
    let count = 1;
    cartData.forEach((ele, index) => {
        let price = 0;
        allProduct.forEach((element) => {
            if (n == ele.userName) {
                if (ele.id == element.id) {
                    price = ele.count * parseInt(element.price);
                    display += `
                   <tr>
                        <td>${count}</td>
                        <td>${element.title}</td>
                        <td><img src="${element.thumbnail}" alt="img" height="100px" width="100px"/></td>
                        <td><button onclick="add(${index})">+</button> ${ele.count} <button onclick="minus(${index})">-</button></td>
                        <td>${price}₹</td>
                        <td></td>
                   </tr>`;
                    count++;
                    totalPrice += price;
                }
            }
        });
    });
    tbody.innerHTML = display;
    span.innerHTML = String(totalPrice) + "₹";
}
displayCart();
function add(id) {
    let cartData = JSON.parse(localStorage.getItem("userItem") || "[]");
    cartData[id].count = cartData[id].count + 1;
    localStorage.setItem("userItem", JSON.stringify(cartData));
    displayCart();
}
function minus(id) {
    let cartData = JSON.parse(localStorage.getItem("userItem") || "[]");
    if (cartData[id].count > 1) {
        cartData[id].count = cartData[id].count - 1;
    }
    else {
        cartData = removeData(id, cartData);
    }
    localStorage.setItem("userItem", JSON.stringify(cartData));
    displayCart();
}
function removeData(id, cartData) {
    cartData.splice(id, 1);
    localStorage.setItem("userItem", JSON.stringify(cartData));
    return cartData;
}
