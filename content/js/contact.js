const sendBtn = document.querySelector(".send-btn");
const closeBtn = document.querySelector(".btn_message");
let popupConform = document.getElementById("popup_conform");

sendBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    popupConform.classList.add("open_popup");
} );
closeBtn.addEventListener("click", () =>{
    popupConform.classList.remove("open_popup");
} )

