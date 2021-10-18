// backToTop 조정
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

// 클릭으로 인한 slide-prev, slide-next 조정
card_width = 260;

function transformPrev(event){
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');

    if (Number(activeLi) < 0){
        activeLi = Number(activeLi) + card_width;

        if (Number(activeLi) >= 0){
            slidePrev.style.color = '#cfd8dc';
            slidePrev.classList.remove('slide-prev-hover');
            slidePrev.removeEventListener('click', transformPrev);
        }
        slideNext.style.color = '#2f3059';
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click', transformNext);
    }
    classList.style.transition = 'transform 1s';
    classList.style.transform = "translateX(" + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}

function transformNext(event){
    // 현재 클릭 이벤트를 받은 요소, 즉 slide-next 클래스를 가진 요소를 나타냄
    const slideNext = event.target;
    // slide-next 클래스를 가진 요소 이전 요소는 slide-prev 클래스를 가진 요소임
    const slidePrev = slideNext.previousElementSibling;

    // ul 태그 선택
    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');

    if (classList.clientWidth < (liList.length*card_width + Number(activeLi))){
        // 위치를 왼쪽으로 260 이동 (-260px)
        activeLi = Number(activeLi) - card_width;

        if (classList.clientWidth > (liList.length*card_width + Number(activeLi))){
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', transformNext);

        }
        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transformPrev);
    }
    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}


const slideNextList = document.getElementsByClassName('slide-next');
for (let i=0; i<slideNextList.length; i++){
    // ul 태그 선택
    let classList = slideNextList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li')

    // 카드가 ul 태그 너비보다 넘치면, 오른쪽(NEXT) 버튼은 활성화하고, 왼쪽(PREV)는 현재 맨 첫카드 위치이므로 비활성화
    if (classList.clientWidth < (liList.length*card_width)){
        slideNextList[i].classList.add('slide-next-hover');
        slideNextList[i].addEventListener('click', transformNext)
    }
    else{
        const arrowcontainer = slideNextList[i].parentElement;
        arrowcontainer.removeChild(slideNextList[i].previousElementSibling); /* previousElementSibling과 previousSibling은 다름 */
        arrowcontainer.removeChild(slideNextList[i]);
    }

}

// 터치 인한 slide-prev, slide-next 조정
let touchstartX;
let currentClassList;
let currentImg;
let currentActiveLi;
let nowActiveLi;
let mouseStart;
let dragging;

function processTouchStart(event){
    mouseStart = true;
    event.preventDefault();

    touchstartX = event.clientX || event.touches[0].screenX;
    currentImg = event.target;

    currentImg.addEventListener('mousemove', processTouchMove);
    currentImg.addEventListener('touchmove', processTouchMove);

    currentImg.addEventListener('mouseup', processTouchEnd);
    currentImg.addEventListener('touchend', processTouchEnd);

    currentClassList = currentImg.parentElement.parentElement.parentElement;
    currentActiveLi = currentClassList.getAttribute('data-position');

}

function processTouchMove(event){
    event.preventDefault();
    dragging = true;

    let currentX = event.clientX || event.touches[0].screenX;
    nowActiveLi = Number(currentActiveLi) + (Number(currentX) - Number(touchstartX));

    currentClassList.style.transition = 'transform 0s';
    currentClassList.style.transform = 'translate(' + String(nowActiveLi) + 'px)';
}

function processTouchEnd(event){
    event.preventDefault();
    if (mouseStart == true){
        currentImg.removeEventListener('mousemove', processTouchMove);
        currentImg.removeEventListener('touchmove', processTouchMove);
        currentImg.removeEventListener('mouseup', processTouchEnd);
        currentImg.removeEventListener('touchend', processTouchEnd);

        // 맨 처음 카드가 맨 앞에 배치되도록 초기 상태로 이동
        currentClassList.style.transition = 'transform 1s ease';
        currentClassList.style.transform = 'translateX(0px)';
        currentClassList.setAttribute('data-position', 0);

        let eachSlidePrev = currentClassList.previousElementSibling.children[1].children[0];
        let eachSlideNext = currentClassList.previousElementSibling.children[1].children[1];
        let eachLiList = currentClassList.getElementsByTagName('li');
        if (currentClassList.clientWidth < (eachLiList.length * card_width)){
            eachSlidePrev.style.color = '#cfd8dc';
            eachSlidePrev.classList.remove('slide-next-hover');
            eachSlidePrev.removeEventListener('click', transformPrev)

            eachSlideNext.style.color = '#2f3059';
            eachSlideNext.classList.add('slide-prev-hover');
            eachSlideNext.addEventListener('click', transformNext);
        }
    }
}


function preventClick(event) {
    if (dragging === true) {
        dragging = false;
        event.preventDefault();
    }
}


const classImgLists = document.querySelectorAll('ul li img');
console.log(classImgLists)
for (let i=0; i<classImgLists.length; i++){
    classImgLists[i].addEventListener('mousedown', processTouchStart);
    classImgLists[i].addEventListener('touchstart', processTouchStart);
    classImgLists[i].addEventListener('click', preventClick);
}



// 특정 요소를 드래그하다가, 요소 밖에서 드래그를 끝낼 수 있으므로, window 에 이벤트를 걸어줌
window.addEventListener('mouseup', processTouchEnd);
window.addEventListener('dragend', processTouchEnd);