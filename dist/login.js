"use strict";
const inputOne = document.getElementById("inputOne");
const inputTwo = document.getElementById("inputTwo");
const btn = document.getElementById("submit");
const register = document.getElementById("reg");
const login = document.getElementById('log');
const registerForm = document.querySelector(".registeForm");
const loginForm = document.querySelector(".loginForm");
const registeBtn = document.getElementById("rsubmit");
const rinputOne = document.getElementById("rinputOne");
const rinputTwo = document.getElementById("rinputTwo");
const selectProject = document.querySelector('#select');
const registerLink = document.querySelector(".registe");
registerLink.addEventListener('click', () => {
    registerForm.classList.add('block');
    loginForm.classList.add("none");
});
btn.addEventListener("click", addData);
;
register.addEventListener('click', () => {
    registerForm.classList.remove('block');
    loginForm.classList.remove("none");
});
registeBtn.addEventListener("click", () => {
    let rName = rinputOne.value;
    let rPass = rinputTwo.value;
    let dataArr = JSON.parse(localStorage.getItem("userReg") || "[]");
    let obj = {
        name: rName,
        pass: rPass
    };
    dataArr.push(obj);
    if (rName.includes('@')) {
        localStorage.setItem("userReg", JSON.stringify(dataArr));
    }
});
function addData(e) {
    e.preventDefault();
    let userName = inputOne.value;
    let pass = inputTwo.value;
    let dataArr = JSON.parse(localStorage.getItem("userReg") || "[]");
    let match = dataArr.filter(ele => ((ele.name == userName || ele.name.split("@")[0] == userName) && pass === ele.pass));
    if (match.length > 0) {
        sessionStorage.setItem("e-basketUser", JSON.stringify(match[0].name));
        location.href = '../index.html';
    }
    else {
        alert("plz register");
        inputOne.value = '';
        inputTwo.value = '';
    }
}
document.querySelector('a')?.addEventListener("click", () => {
    sessionStorage.setItem("forgotPass", inputOne.value);
});
