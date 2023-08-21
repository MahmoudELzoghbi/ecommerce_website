window.addEventListener('load', () => {
    const title = sessionStorage.getItem('title');
    const thumbnail = sessionStorage.getItem('thumbnail');
    const p1 = sessionStorage.getItem('p1');
    const p2 = sessionStorage.getItem('p2');
    const p3 = sessionStorage.getItem('p3');
    const p4 = sessionStorage.getItem('p4');
    const description = sessionStorage.getItem('description');
    const price = sessionStorage.getItem('price');


    document.getElementsByTagName("title")[0].innerHTML = title;
    document.getElementById('title').innerHTML = title;
    document.getElementById('thumbnail').innerHTML = '<img src="'+thumbnail+'" class="rounded image__card" alt="..." >';
    document.getElementById('p1').innerHTML = '<img src="'+p1+'" alt=""  class="image__card">';
    document.getElementById('p2').innerHTML = '<img src="'+p2+'" alt=""  class="image__card">';
    document.getElementById('p3').innerHTML = '<img src="'+p3+'" alt=""  class="image__card">';
    document.getElementById('p4').innerHTML = '<img src="'+p4+'" alt=""  class="image__card">';
    document.getElementById('description').innerHTML = description + `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos distinctio minima assumenda quasi veniam nobis, consequatur neque praesentium, aspernatur commodi inventore ipsum ea temporibus? Facere maiores nesciunt cumque beatae quae?
    Debitis in quasi repellat illum reprehenderit ut eos nostrum labore error hic deserunt quam ratione quae, voluptatum accusamus saepe ex voluptas non delectus nemo. Aspernatur perferendis dolor facere numquam minima.
    
`;
    document.getElementById('price').innerHTML = price;
});





setTimeout(function(){
var imageCard = Array.from (document.getElementsByClassName("image__card"));
var containerImage = document.getElementById("containerImage")
var closeBtn = document.getElementById ("close")
var boxImage = document.getElementById("boxImage")
var nextImage = document.getElementById ("next");
var prevImage = document.getElementById ("prev")
var currntImage = 0 ;

var containerPupup = document.getElementById("containerPupup");
var hampozo = document.getElementById("hampozo")





//for loop in images and open 
for (let i = 0; i < imageCard.length; i++) {
    imageCard[i].addEventListener("click" , function( showImage){
        currntImage = imageCard.indexOf(showImage.target)
        
        var displayImage = showImage.target.src
        boxImage.style.backgroundImage = `url(${displayImage})`
        containerImage.style.display = "flex"
    })
    
}

// function for next image 

nextImage.addEventListener ("click", nextSide)
    function nextSide(){
    currntImage++;
    if (currntImage == imageCard.length ) {
        currntImage = 0
    }
    var displayImage = imageCard[currntImage].src;
    boxImage.style.backgroundImage = `url(${displayImage})`
    
    // console.log(currntImage);
}

// function for prev image 

prevImage.addEventListener("click", prevSide)
function prevSide (){
    currntImage -- ;
    if (currntImage == 0) {
        currntImage = imageCard.length-1; 
    }

    var displayImage = imageCard[currntImage].src;
    boxImage.style.backgroundImage = `url(${displayImage})`

}

//close by btn 
closeBtn.addEventListener("click" , closeSlide)
function closeSlide(){
    containerImage.style.display ="none"

}


}, 1000);



