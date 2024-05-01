"use strict";
const API = 'https://dummyjson.com/products/categories';
const option = document.querySelector('#category');
async function allCateGory() {
    const categoriesData = await fetchDataC(API);
    let display = '';
    categoriesData.forEach(ele => {
        display += `<option value='${ele}'>${ele[0].toUpperCase()}${ele.slice(1)}</option>`;
    });
    option.innerHTML += display;
}
allCateGory();
async function fetchDataC(api) {
    const data = await fetch(api).then(res => res.json());
    return data;
}
