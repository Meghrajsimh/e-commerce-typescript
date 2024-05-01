const inputOne = document.getElementById("inputOne") as HTMLInputElement;
const inputTwo = document.getElementById("inputTwo") as HTMLInputElement;
const btn = document.getElementById("submit") as HTMLButtonElement;
const register = document.getElementById("reg") as HTMLHeadingElement;
const login = document.getElementById('log') as HTMLHeadElement;
const registerForm = document.querySelector(".register") as HTMLFormElement;
const loginForm = document.getElementById("login") as HTMLFormElement;
const registeBtn = document.getElementById("rsubmit") as HTMLButtonElement;
const rinputOne = document.getElementById("rinputOne") as HTMLInputElement;
const rinputTwo = document.getElementById("rinputTwo") as HTMLInputElement;
const selectProject = document.querySelector('#select') as HTMLSelectElement;


btn.addEventListener("click", addData);
interface UserData  {
  name: string;
  pass: string;
};

login.addEventListener("click",():void =>{
  registerForm.classList.add('block');
  loginForm.classList.add("none");
  login.style.display ='none';
  register.style.display= 'block';
});

register.addEventListener('click',()=>{
   registerForm.classList.remove('block');
   loginForm.classList.remove("none");
   login.style.display = 'block';
   register.style.display = 'none';
})

 registeBtn.addEventListener("click",():void =>{
  let rName =  rinputOne.value ;
  let rPass =   rinputTwo.value;

  let dataArr: {name : string , pass : string}[] = JSON.parse(localStorage.getItem("userReg") || "[]");

  let obj :UserData = {
    name : rName,
    pass : rPass
  };

  dataArr.push(obj);
  if(rName.includes('@')){
  localStorage.setItem("userReg",JSON.stringify(dataArr));
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

