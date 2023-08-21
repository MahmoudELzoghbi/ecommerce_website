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
    
    categories(listOfCard.slice(0, 20));
 
}
productCard ()


function categories(listOfCard) {
    let categoriesUi = "";
    for (let index = 0; index < listOfCard.length; index++) {
        let item = listOfCard[index];
        categoriesUi += `
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 pt-4">
        <div class="item"> 
        <div class="product">
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
            
          <a href="##" class="add_btn " onclick="addTocart(${item.id})">
            <span> add to cart
          <i class="fa-solid fa-bag-shopping"></i>
        </span>
          </a>
          </div>
        </div>
      </div>
      </div>


    `
    }
  document.getElementById("ourProuct").innerHTML = categoriesUi;
};