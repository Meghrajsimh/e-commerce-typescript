"use strict";
const APIOneProduct = 'https://dummyjson.com/products/';
const prodcutDisplay = document.querySelector('.product');
const url = new URLSearchParams(location.search);
const id = url.get('id');
let userOneProduct = JSON.parse(sessionStorage.getItem('e-basketUser') || '[]');
let userNameOneProduct = userOneProduct.length > 0 ? userOneProduct.split('@')[0] : null;
const session = JSON.parse(sessionStorage.getItem('e-basketUser') || '[]');
async function displayProduct() {
    let url = `${APIOneProduct}${id}`;
    let product = await fetch(url).then(res => res.json())
        .catch(e => console.log(e));
    let stock = 'Not Avialable';
    if (parseInt(product.stock) > 0) {
        stock = "Avialable";
    }
    const display = `
        <div class='productBox'>
            <div class="productImg">
               <img src="${product.thumbnail}" alt="productImage"/>
            </div>
            <div class="productInfo">
                <h5>Brand: <span>${product.brand}</span></h5>
                <h5>Name: <span>${product.title}</span></h5>
                <h5>Rating: <span>${product.rating}</span></h5>
                <h5>Price: <span>${product.price}₹</span></h5>
                <h5>Stock: <span>${stock}</span></h5>
                <h5>Discount: <span>${product.discountPercentage}%</span></h5>
                <h5>Description: <span>${product.description}</span></h5>
                <button class="btn btn-primary" onclick='addToCartOne(${product.id})'>Add</button>
            <div>
        </div>
    `;
    prodcutDisplay.innerHTML = display;
}
displayProduct();
function addToCartOne(id) {
    if (session.length > 0) {
        let userItem = JSON.parse(localStorage.getItem("userItem") || "[]");
        let filterData = userItem.findIndex((ele) => ((ele.id == id) && (userNameOneProduct == ele.userName)));
        if (filterData > -1) {
            userItem[filterData].count = userItem[filterData].count + 1;
        }
        else {
            let obj = {
                id: id,
                count: 1,
                userName: userNameOneProduct
            };
            userItem.push(obj);
        }
        localStorage.setItem("userItem", JSON.stringify(userItem));
        productCounter();
    }
    else {
        alert("you must login for add to cart!!!!");
    }
}
