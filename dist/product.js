"use strict";
const allDataApi = "https://dummyjson.com/products?limit=100";
const main = document.querySelector("main");
const select = document.querySelector("#category");
const boxCarBtn = document.querySelector(".boxCartBtn");
const serach = document.querySelector("#serach");
const countProduct = document.querySelector(".counter");
let user = JSON.parse(sessionStorage.getItem('e-basketUser') || '[]');
let userNameP = user.length > 0 ? user.split('@')[0] : null;
if (countProduct != null) {
    productCounter();
}
async function fetchDataP(url) {
    try {
        const data = await fetch(url)
            .then((res) => res.json())
            .then((response) => response.products)
            .catch((e) => {
            throw e;
        });
        return data;
    }
    catch (e) {
        throw (e);
    }
    finally {
        loader.style.display = 'none';
    }
}
async function displayAllProuct(api = allDataApi, searchData = null) {
    try {
        let data = await fetchDataP(api);
        if (searchData != null) {
            data = searchData;
        }
        let display = "";
        data.forEach((element) => {
            display += `
          <div class='box'>
            <div class="img">
                <img src="${element.thumbnail}" alt="product image"/>
            </div>
            <div class="info">
              <p>Name:<span>${element.title}</span></p>
              <p>Price:<span>${element.price}₹</span></p>
            </div>
            <div class="boxBtn">
                <button class="btn btn-primary" onclick='fullDetails(${element.id})'>More</button>
                <button class="btn btn-primary boxCartBtn" onclick="addToCart(${element.id})" >Add</button>
            </div>
          </div>
        `;
        });
        main.innerHTML = display;
    }
    catch (e) {
        console.log(e);
    }
    finally {
    }
}
displayAllProuct();
select.addEventListener("change", () => {
    if (select.value != "all") {
        let filterUrl = `https://dummyjson.com/products/category/${select.value}`;
        loader.style.display = 'block';
        displayAllProuct(filterUrl);
    }
    else {
        loader.style.display = 'block';
        displayAllProuct(allDataApi);
    }
});
function fullDetails(id) {
    location.href = `./html/product.html?id=${id}`;
}
function addToCart(id) {
    if (userLogin.length > 0) {
        let userItem = JSON.parse(localStorage.getItem("userItem") || "[]");
        let filterData = userItem.findIndex((ele) => ((ele.id == id) && (userNameP == ele.userName)));
        if (filterData > -1) {
            userItem[filterData].count = userItem[filterData].count + 1;
        }
        else {
            let obj = {
                id: id,
                count: 1,
                userName: userNameP
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
function productCounter() {
    let userItem = JSON.parse(localStorage.getItem("userItem") || "[]");
    let count = 0;
    userItem.forEach(ele => {
        if (ele.userName == userNameP) {
            count += ele.count;
        }
    });
    console.log(count);
    countProduct.textContent = String(count);
}
serach.addEventListener("input", async () => {
    let data = await fetchDataP(allDataApi);
    let filterData = data.filter(ele => ele.title.toLocaleLowerCase().includes(serach.value.toLowerCase()));
    loader.style.display = 'block';
    displayAllProuct(allDataApi, filterData);
});
