const backToTop = document.getElementById('backtotop');

function checkScroll(){
    let pageYOffset = window.scrollY;

    if (pageYOffset !== 0){
        backToTop.classList.add('show');
    }
    else{
        backToTop.classList.remove('show');
    }
}

function moveBackToTop(){
    if (window.scrollY !==0){
        window.scrollTo({top:0 , behavior:'smooth'});
    }
}

window.addEventListener('scroll', checkScroll)
backToTop.addEventListener('click', moveBackToTop)

