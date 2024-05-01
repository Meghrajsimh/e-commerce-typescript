const userData: { name: string; pass: string }[] = JSON.parse(
  localStorage.getItem("userReg") || "[]"
);
const loginUser = document.querySelector("#userName") as HTMLFormElement;
const changeUser = document.querySelector("#changeUserName") as HTMLFormElement;
const changePasswordForm = document.querySelector(".changePassword") as HTMLDivElement;
const changePass = document.querySelector("#changePass") as HTMLFormElement;
const changePassBtn = document.querySelector("#changeBtn") as HTMLButtonElement;
const userEmail: string = sessionStorage.getItem("forgotPass") || "[]";
let userIndex: number;

//user Email
if(userEmail != '[]') {
loginUser.value = userEmail;
}

document.querySelector("#verify")?.addEventListener("click", (e):void => {
  e.preventDefault();

  //check given email is right or worng
  userIndex = userData.findIndex((ele) => ele.name == loginUser.value);

  if (userIndex > -1) {
    changePasswordForm.classList.add("block");
    changeUser.value = loginUser.value;
  } else {
    alert("email is not found");
  }
});


//change user password
changePassBtn.addEventListener("click",(e):void =>{
    e.preventDefault();
    if(changePass.value != undefined) {
       userData[userIndex].pass = changePass.value;
       localStorage.setItem("userReg",JSON.stringify(userData));
       sessionStorage.removeItem("forgotPass");
       location.href = "login.html";
    }else {
        alert("please enter your new password!!!")
    }
})
