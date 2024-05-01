const inputOne = document.getElementById("inputOne") as HTMLInputElement;
const inputTwo = document.getElementById("inputTwo") as HTMLInputElement;
const btn = document.getElementById("submit") as HTMLButtonElement;
const register = document.getElementById("reg") as HTMLHeadingElement;
const login = document.getElementById('log') as HTMLHeadElement;
const registerForm = document.querySelector(".registeForm") as HTMLFormElement;
const loginForm = document.querySelector(".loginForm") as HTMLFormElement;
const registeBtn = document.getElementById("rsubmit") as HTMLButtonElement;
const rinputOne = document.getElementById("rinputOne") as HTMLInputElement;
const rinputTwo = document.getElementById("rinputTwo") as HTMLInputElement;
const selectProject = document.querySelector('#select') as HTMLSelectElement;
const registerLink = document.querySelector(".registe") as HTMLDivElement;


registerLink.addEventListener('click',():void =>{
  registerForm.classList.add('block');
  loginForm.classList.add("none");
});

btn.addEventListener("click", addData);
interface UserData  {
  name: string;
  pass: string;
};

register.addEventListener('click',()=>{
   registerForm.classList.remove('block');
   loginForm.classList.remove("none");
})

 registeBtn.addEventListener("click",():void =>{
  let rName =  rinputOne.value ;
  let rPass =   rinputTwo.value;

  let dataArr: {name : string , pass : string}[] = JSON.parse(localStorage.getItem("userReg") || "[]");
  let userFind: number = dataArr.findIndex((ele) => ele.name == rName);
  
  if (userFind == -1) {
  let obj :UserData = {
    name : rName,
    pass : rPass
  };

  dataArr.push(obj);
  if(rName.includes('@')){
  localStorage.setItem("userReg",JSON.stringify(dataArr));
  }
}else {
  alert("user already exist");
  rinputOne.value = '';
  rinputTwo.value = '';
}
 
})



function addData(e:any):void {
  e.preventDefault();
  let userName: string = inputOne.value;
  let pass: string = inputTwo.value;
  
  let dataArr: {name : string , pass : string}[] = JSON.parse(localStorage.getItem("userReg") || "[]");

  let match : {name : string , pass : string}[] = dataArr.filter( ele => ((ele.name == userName || ele.name.split("@")[0] == userName ) && pass === ele.pass));

  if(match.length > 0) {
    sessionStorage.setItem("e-basketUser",JSON.stringify(match[0].name));
    location.href = '../index.html';
  }else {
    alert("plz register");
    inputOne.value = '';
    inputTwo.value = '';
  }
}

document.querySelector('a')?.addEventListener("click",():void =>{
  sessionStorage.setItem("forgotPass",inputOne.value);
})

