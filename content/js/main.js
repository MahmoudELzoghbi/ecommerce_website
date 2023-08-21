
$(".fa-star").click(() => {
    $(".test").Toggle("color","yallow")
})


$('#gategoryOwl').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots:false,
    autoplay:5000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
});

$('#mostViwedOwl').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:4
        }
    }
});
$('#Deals').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
    autoplay:2000,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

 


//close cart by click out div by click
let closecard = document.querySelector(".container_menu");
document.querySelector(".close_mune").addEventListener("click", close)
    function close(){
       
        closecard.style.display = "none"
    }
    //open  and close cart slied by jquery
    $(".btn1").click(function () {
        $(".container_menu").toggle();
    });



let arrayData = []


// varibel to json 
const sellersOwl = document.getElementById ("sellersOwl")
//stat get file json from local stordge
const productCard = async function (){
    let cardReicpes = await fetch (`content/js/carts.json`
    );

    const cardData = await cardReicpes.json() 
    let listOfCard = cardData.products;
    arrayData = listOfCard
    console.log(arrayData);
    
    categories(listOfCard.slice(0, 10));
 
}
productCard ()

//runder cards in html 
function categories(listOfCard) {
    let categoriesUi = "";
    for (let index = 0; index < listOfCard.length; index++) {
        let item = listOfCard[index];
        categoriesUi += `
        <div class="item"> 
        <div class="product" data-name="${item.id}">
        <div class="image" data-id="${item.id}">
              <img src="${item.images[0]}" alt="">
              <div class="image_inner">
              <img src="${item.images[1]}" alt="">
            </div>
          </div>
          <div class="caption">
            <div class="caption_inner">
              <p class="prouct_id">${item.category}</p>
              <h4><a href="#">${item.title}</a></h4>
            </div>
            <div class="rating">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-eye" data-id="${item.id}"></i>

            </div>
            <div class="product_price d-flex align-items-center">
              <span class="product_price--new">
              ${item.price}€
              </span>
              <span class="product_price--old">
              ${+item.price + item.discountPercentage}€
              </span>
              <span class="product_price--discount">-${item.discountPercentage}%</span>
            </div> 
          <a href="##" class="add_btn " onclick="addTocart(${index})">
            <span> add to cart
          <i class="fa-solid fa-bag-shopping"></i>
        </span>
          </a>
          </div>
        </div>
      </div>


    `
    }
  document.getElementById("pushCard").innerHTML = `
    <div class="owl-carousel owl-theme show_data" id="sellersOwl">
    ${categoriesUi}
       </div>
       `;
           $('#sellersOwl').owlCarousel({
             loop:true,
             margin:10,
             nav:true,
             dots:false,
             responsive:{
                 0:{
                     items:1
                 },
                 600:{
                     items:3
                 },
                 1000:{
                     items:4
                 }
             }
         })
};

//creat array for save all product cart
let cards = [];
if(localStorage.AllCards != null){
    cards = JSON.parse(localStorage.AllCards) 
  }else {
    cards = [];
  };
  // function cartRemove
  function cartRemove(i) {
    if (cards[i].count > 1) {
      cards[i].count -= 1
      
    }else{
      cards.splice(i,1)
      rendeCart()
    }
    localStorage.setItem("AllCards", json.stringify(cards))
    
  }
  //function add to cart 
function addTocart(index){
    const chosseCard = arrayData[index]
    cards.push(chosseCard);
    let check = cards.find((item)=> item.id===chosseCard.id)
    if (check) {
        check.count += 1 ;
        console.log(check);
        
    }else{
        cards.push({...chosseCard , count:1})
    }
    localStorage.setItem("AllCards", JSON.stringify(cards))
}


// function render product in cart  
function rendeCart() {
    let template = "",
    total = 0 ;

    if (cards.length===0) {
        document.getElementById("empty").innerHTML = "your cart is empty"
      }else{
    for (let i = 0; i < cards.length; i++) {
      template += `
      <tr>
                        <td class="text-center cart-image"> 
                          <a href="#">
                            <img src="${cards[i].images[0]}" alt="Palm Treo Pro" title="Palm Treo Pro" class="img-thumbnail">
                          </a> 
                        </td>
                        <td class="text-left cart-info">
                        <a href="#">
                        ${cards[i].title}
                        </a>          
                        <p>
                        <span class="cart-product-price">${cards[i].price}€</span>
                        </p>
                        </td>
            
                        <td class="text-center">
                          <button type="button" onclick="cartRemove(${i})" title="Remove" class="btn btn-danger btn-xs button-cart-remove">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </td>
                        </tr>    
  `
    }
}
    document.getElementById("cartItem").innerHTML = template;
    document.querySelector(".txt-count").innerHTML = cards.length;
    // document.getElementById("totalprice").innerHTML = total ; //////////////////////////////w
  }
  rendeCart()

















  /////////////////////////////////////////////////

//select elements for nav fak api
let navTitle = document.querySelectorAll(".title_nav");


// do it with extarinal api 
//get link from api 
let getReicipes = async function (query){
    let recipes = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${query}`
    );
    

    let data = await recipes.json()
    let listOfProdouct = data.recipes;
    showProdouct(listOfProdouct.slice(0, 10));

}

// looping in array 
navTitle.forEach( (element, listOfProdouct)=> {
    element.addEventListener("click",(e)=>{
        getReicipes (e.target.textContent);
    })
});
getReicipes("pizza")


// runder data from fake api to html by click 
function showProdouct(listOfProdouct) {
    let cardTemplate = "";
    for (let index = 0; index < listOfProdouct.length; index++) {
        cardTemplate += `
    <div class="item"> 
    <div class="product" id="${listOfProdouct[index].id}">
      <div class="image">
          <img src="${listOfProdouct[index].image_url}">
          <div class="image_inner">
          <img src="${listOfProdouct[++index].image_url}" alt="">
        </div>
      </div>
      <div class="caption">
        <div class="caption_inner">
          <p class="prouct_id">${listOfProdouct[index].title.slice(0, 20)}</p>
          <h4><a href="#">${listOfProdouct[index].publisher}</a></h4>
        </div>
        <div class="rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>

        </div>
        <div class="product_price d-flex align-items-center">
          <span class="product_price--new">
          ${listOfProdouct[index].social_rank.toFixed(2)}€
          </span>
          <span class="product_price--old">
            94.15€
          </span>
          <span class="product_price--discount">-50%</span>
        </div>                <div class="product_discount"></div>
        <div class="product_button"></div>
      </div>
    </div>
  </div>

    `
   }
//try display fake api with plugin owl 
//call div of owl and replice from js to index html
   document.getElementById("displayOWl").innerHTML = `
   <div class="owl-carousel owl-theme show_data" id="Arrivals">
   ${cardTemplate}
      </div>
      `;
          $('#Arrivals').owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            dots:false,
            autoplay:2000,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:3
                }
            }
        })
    
        
    
};






//varibel for login and get user and log out 
// let userInfo = document.querySelector(".user_info")
// let user = document.querySelector(".user")
// let logOut = document.querySelector("logOut")
// let mainNavLogin = document.querySelector(".mainNav_login")
// let getUser = JSON.parse(localStorage.getItem("users"))

// for (let index = 0; index < getUser.length; index++) {
//     const element = getUser[index].name;
//     // console.log(element);
//     if (element){
//         console.log("yes", element);
//         // mainNavLogin.remove()
//         // userInfo.style.display = "flex"
//         // user.innerHTML = getUser.name
    
    
// }else{
//     console.log("your not login yet ");
// }
// }
// setTimeout(() => {
//   let btnPreview = document.querySelectorAll(".fa-eye")
// let produtsPreviw = document.querySelector(".produts_previw");
// let viewPreview = document.querySelector(".preview")

// btnPreview.addEventListener("click", (e) =>{
//   e.preventDefault()
//   produtsPreviw.classList.add(".openDiv");
// } );
// }, 1000);


//target image in defult page
setTimeout(function(){
  const btnPreview = document.querySelectorAll('.fa-eye');
  Array.from(btnPreview).forEach(btn => {
    btn.addEventListener('click', hoda, false);

  });

  const btns = document.querySelectorAll('.image');
  Array.from(btns).forEach(btn => {
  btn.addEventListener('click', loadDoc, false);
  });

 }, 1000);


    function loadDoc() {
    var token = this.getAttribute("data-id");
    var xmlhttp = new XMLHttpRequest();
    var url = "content/js/carts.json";
    xmlhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
        let a = JSON.parse(this.responseText);
        let dataID = token;
        let h = a.products.find(products => products.id == dataID).title;
        let o = a.products.find(products => products.id == dataID).thumbnail;
        let s = a.products.find(products => products.id == dataID).description;
        let m = a.products.find(products => products.id == dataID).price;
        let p1 = a.products.find(products => products.id == dataID).images[0];
        let p2 = a.products.find(products => products.id == dataID).images[1];
        let p3 = a.products.find(products => products.id == dataID).images[2];
        let p4 = a.products.find(products => products.id == dataID).images[3];

        sessionStorage.setItem("title", h);
        sessionStorage.setItem("thumbnail", o);
        sessionStorage.setItem("description", s);
        sessionStorage.setItem("price", m);
        sessionStorage.setItem("p1", p1);
        sessionStorage.setItem("p2", p2);
        sessionStorage.setItem("p3", p3);
        sessionStorage.setItem("p4", p4);
        return;
        
    }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    setTimeout(function(){window.location.href = "result.html";}, 1000);
    }


    function hoda() {
      var token = this.getAttribute("data-id");
      var xmlhttp = new XMLHttpRequest();
      var url = "content/js/carts.json";
      xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
          let a = JSON.parse(this.responseText);
          let dataID = token;
          let h = a.products.find(products => products.id == dataID).title;
          let o = a.products.find(products => products.id == dataID).thumbnail;
          let s = a.products.find(products => products.id == dataID).description;
          let m = a.products.find(products => products.id == dataID).price;
          let p1 = a.products.find(products => products.id == dataID).images[0];
          let produtsPreviw = document.querySelector('.produts_previw');
          produtsPreviw.classList.add("openDiv");
          produtsPreviw.innerHTML= `
        <div class="preview " data-target="">
          
          <img src="${p1}" alt="">
          <h3>${h}</h3>
         
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half"></i>
            <span> ( 250 ) </span>
            <p>${s}.</p>
          <div class="product_price d-flex align-items-center">
            <span class="product_price--new">
            ${m}€
            </span>
            <span class="product_price--old">
            ${m}€
            </span>
            <span class="product_price--discount">15%</span>
          </div> 
          <a href="##" class="add_btn " onclick="addTocart()">
            <span> add to cart
          <i class="fa-solid fa-bag-shopping"></i>
        </span>
          </a>   
        </div>`
 
      }


      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
      let closepriview = document.querySelector(".produts_previw")

      closepriview.onclick = function(e){
        e.target.classList.remove('openDiv')
        // console.log(e.target);
        // console.log(e.target.children);
        // e.target.children[0].remove()
        
      }


      // let pre = closepriview.children
      // console.log(closepriview);
      // console.log(pre);
      // console.log(pre[0]);
    }












    // function for  cuntdown 
    // The End Of The Year Date To Countdown To
// 1000 milliseconds = 1 Second

let countDownDate = new Date("Dec 31, 2023 23:59:59").getTime();

let counter = setInterval(() => {
  // Get Date Now
  let dateNow = new Date().getTime();

  // Find The Date Difference Between Now And Countdown Date
  let dateDiff = countDownDate - dateNow;

  // Get Time Units
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

 const dayCount= document.querySelector(".box .day");
 const hoursCount= document.querySelector(".box .hour");
 const minutesCount= document.querySelector(".box .min");
 const secondsCount= document.querySelector(" .box .sec");
 dayCount.innerHTML = days < 10 ? `0${days}` : days;

 hoursCount.innerHTML = hours < 10 ? `0${hours}` : hours;
 minutesCount.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
 secondsCount.innerHTML = seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff < 0) {
    clearInterval(counter);
  }
}, 1000);




//////////////////////////////////test preview///////////////////////////

// const produtsPreview = document.querySelector(".produts_previw");

// document.querySelectorAll(".item .product").forEach(product => {
//   product.onclick = () =>{
//     let name = product.getAttribute("data-name")
//     PreviewBox.forEach(preview =>{
//       let targetName = preview.getAttribute("data-traget")
//       if (name == targetName) {
//         preview.classList.add("active_preview")
//       }
//     })
//   }
// })

// function reinderpreview(params) {
  
// }
