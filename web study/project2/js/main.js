// 로딩 관련 코드
function stopLoadingPage() {
    let loadingPage = document.getElementById("preloader");
    console.log(loadingPage);
    loadingPage.classList.add('reveal');
}

function stopLoadingPageByTime(ms = 1800) {
    setTimeout(stopLoadingPage, ms);
}
stopLoadingPageByTime()

// main 화면(background 슬라이드) 코드

// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = document.getElementsByClassName('background').length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
    if (isFirefox) {
        //Set delta for Firefox
        delta = evt.detail * (-120);
    } else if (isIe) {
        //Set delta for IE
        delta = -evt.deltaY;
    } else {
        //Set delta for all other browsers
        delta = evt.wheelDelta;
    }

    if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
            //Down scroll
            ticking = true;
            if (currentSlideNumber !== totalSlideNumber - 1) {
                currentSlideNumber++;
                nextItem();
            }
            slideDurationTimeout(slideDurationSetting);
        }
        if (delta >= scrollSensitivitySetting) {
            //Up scroll
            ticking = true;
            if (currentSlideNumber !== 0) {
                currentSlideNumber--;
            }
            previousItem();
            slideDurationTimeout(slideDurationSetting);
        }
    }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
    setTimeout(function() {
        ticking = false;
    }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
let mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, parallaxScroll, false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
    let previousSlide = document.getElementsByClassName("background")[currentSlideNumber - 1];
    previousSlide.classList.remove("up-scroll");
    previousSlide.classList.add("down-scroll");
}

function previousItem() {
    let currentSlide = document.getElementsByClassName("background")[currentSlideNumber];
    currentSlide.classList.remove("down-scroll");
    currentSlide.classList.add("up-scroll");
}