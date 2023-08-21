// Toggle Form
const container = document.querySelector(".login_container");
const inputs = document.querySelectorAll(".form-box input[type = 'password']");
const icons = [...document.querySelectorAll(".form-icon")];
// const spans = [...document.querySelectorAll(".form-box .top span")];
const section = document.querySelector(".login");
let spans = [...document.querySelectorAll(" .mainNav_login .dropdown-item ,  .top span")];
//varbile for add now user
const passwordUser = document.getElementById("passwordUser");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const RegisterBtn = document.querySelector(".Register")

//varbile for check when login 
const checkUser = document.querySelector(".login_user")
const checkPassword = document.querySelector(".check_password")
const loginBtn = document.querySelector(".login_btn")


console.log(loginBtn,checkPassword,checkUser);
spans.map((span) => {
  span.addEventListener("click", (e) => {
    const color = e.target.dataset.id;
    container.classList.toggle("active");
    section.classList.toggle("active");
    document.querySelector(":root").style.setProperty("--custom", color);
  });
});

Array.from(inputs).map((input) => {
  icons.map((icon) => {
    icon.innerHTML = `<img src="content/assets/image/loginAndRegister/eye.svg" alt="" />`;

    icon.addEventListener("click", () => {
      const type = input.getAttribute("type");
      if (type === "password") {
        input.setAttribute("type", "text");
        icon.innerHTML = `<img src="content/assets/image/loginAndRegister/hide.svg" alt="" />`;
      } else if (type === "text") {
        input.setAttribute("type", "password");
        icon.innerHTML = `<img src="content/assets/image/loginAndRegister/eye.svg" alt="" />`;
      }
    });
  });
});

//save in local storeg
let dataUser= "";
if(localStorage.users != null){
  dataUser = JSON.parse(localStorage.users) 
}else {
  dataUser = [];
};


// add data to function 
  RegisterBtn.addEventListener("click", function (){
    let Newuser = {
      name:userName.value.toLowerCase().trim(),
      password:passwordUser.value,
      email:userEmail.value.toLowerCase().trim(),
     
    }
    dataUser.push(Newuser)
    localStorage.setItem ("users" , JSON.stringify(dataUser))
    console.log(dataUser)

  });
  


//get data from localstorge 
let getUser = JSON.parse(localStorage.getItem("users"))
console.log(getUser);
//looping for check name = name.value from input in page login 
for (let i = 0; i < getUser.length; i++) {
  const element = getUser[i];
  console.log(element.name);
  loginBtn.addEventListener("click",function (eveny){
    eveny.preventDefault();
    if ((element.name === checkUser.value.toLowerCase().trim() ) && (element.password === checkPassword.value)){
     console.log("test");
           //got to home page after 1.5 second
           setTimeout(()=>{
            window.location = "index.html"
          },1500);
    }
    else{
      console.log("your not mumbers in our web site");
    }
  })
}

