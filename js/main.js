/*----------------------------------
Load Large Images and 
Handle Loading Screen
----------------------------------*/

// const loadingScreen = document.querySelector('.loading-overlay');

const landingText = document.querySelector('.landing-text-container');
const scrollIndicator = document.querySelector('.scroll-text');
const scrollArrow = document.querySelector('.arrow');

// const bgUrl = '/img/border/bg-pattern.png';
// const background = document.querySelector('.bg-pattern');

// const brdrUrl = '/img/border/brdr.png';
// const brdr = document.querySelectorAll('.brdr');

// const brdrCorner1 = document.querySelector('.brdr-topleft'); 
// const brdrCorner2 = document.querySelector('.brdr-topright'); 

// let preloader = document.createElement('img');
// preloader.src = bgUrl;
// preloader.addEventListener('load', () => {
//   background.style.backgroundImage = `url(${bgUrl})`;
//   preloader = null;
//   console.log('1');
//   loadBrdr();
// });

// function loadBrdr() {
//   let preloader = document.createElement('img');
//   preloader.src = brdrUrl;
//   preloader.addEventListener('load', () => {
//     brdr.forEach(brdr => {
//       brdr.style.backgroundImage = `url(${brdrUrl})`;
//     })
//     preloader = null;
//     console.log('2');
//     go();
//   });
// }

go();

function go() {
  // console.log('hiding overlay');
  // loadingScreen.style.display = 'none';
  landingText.style.display = 'flex';
  scrollIndicator.style.display = 'block';
  setTimeout(()=> {
    scrollArrow.style.display = 'block';
  }, 4500);
}

/*----------------------------------
Landing Page
----------------------------------*/

window.scroll({
  top: 0,
  behavior: "smooth"
});

/*----------------------------------
Header Position Change / Auto
Correct Page Window Scroll Position
----------------------------------*/

const header = document.getElementById('my-header');

let screenHeight = window.innerHeight;
let scrollDist = window.pageYOffset;

let p1Limit = screenHeight / 2;
let p2Limit = p1Limit * 3;
let p3Limit = p1Limit * 5;
let p4Limit = p1Limit * 7;



let timerID; 

window.addEventListener('scroll', adjustScreenPosition);
window.addEventListener('resize', adjustScreenPosition);

function adjustScreenPosition() {
  clearTimeout(timerID);
  screenHeight = window.innerHeight;
  scrollDist = window.pageYOffset;

  if (scrollDist >= screenHeight) {
    header.className = 'sticky-header';
  } else {
    header.removeAttribute('class');
  }

  timerID = setTimeout(() => {
    p1Limit = screenHeight / 2;
    p2Limit = p1Limit * 3;
    p3Limit = p1Limit * 5;
    p4Limit = p1Limit * 7;

    if (scrollDist <= p1Limit) {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
    } else if (scrollDist <= p2Limit) {
      window.scroll({
        top: screenHeight,
        behavior: "smooth"
      });
    } else if (scrollDist <= p3Limit) {
      window.scroll({
        top: screenHeight * 2,
        behavior: "smooth"
      });
    } else if (scrollDist <= p4Limit) {
      window.scroll({
        top: screenHeight * 3,
        behavior: "smooth"
      });
    } else {
      window.scroll({
        top: screenHeight * 4,
        behavior: "smooth"
      });
    }
  }, 1500);
}

/*----------------------------------
Page Title Gif Control
----------------------------------*/

// display block from none will start anim from beginning
const about = document.querySelector('.about-anim');
const projects = document.querySelector('.projects-anim');
const contact = document.querySelector('.contact-anim');

window.addEventListener('keyup', (e) => {
  if (e.key == '1') {
    about.style.display = 'block';
  } else if (e.key == '2') {

  } else if (e.key == '3') {
    
  } else if (e.key == '4') {
    contact.style.display = 'block';
  }
  
});

/*----------------------------------
Navigation Buttons
----------------------------------*/

const aboutBtn = document.querySelector('.about-btn-container');
const workBtn = document.querySelector('.work-btn-container');
const contactBtn = document.querySelector('.contact-btn-container');
const stroke2 = document.querySelector('.stroke-2');
const stroke3 = document.querySelector('.stroke-3');
const stroke4 = document.querySelector('.stroke-4');

aboutBtn.addEventListener('click', () => {
  animReset(stroke3);
  window.scroll({
    top: screenHeight,
    behavior: "smooth"
  });
})
workBtn.addEventListener('click', () => {
  animReset(stroke2);
  window.scroll({
    top: screenHeight * 2,
    behavior: "smooth"
  });
})
contactBtn.addEventListener('click', () => {
  animReset(stroke4);
  window.scroll({
    top: screenHeight * 4,
    behavior: "smooth"
  });
})

function animReset(stroke) {
  stroke.style.display = 'block';
  setTimeout(() => {
    stroke.style.display = 'none';
    stroke.src = stroke.src.replace(/\?.*$/,"")+"?x="+Math.random();
  }, 750);
}

/*----------------------------------
Hamburger Button 
----------------------------------*/

const burgerBtn = document.querySelector('.hamburger');
const navBtns = document.querySelector('.navigation-container');
const nameContainer = document.querySelector('.name-container');

burgerBtn.addEventListener('click', () => {
  if (navBtns.classList.contains('show-nav')) {
    navBtns.classList.remove('show-nav');
    navBtns.classList.add('hide-nav');

    nameContainer.classList.remove('fade-name');
    nameContainer.classList.add('show-name');
  } else {
    navBtns.classList.remove('hide-nav');
    navBtns.classList.add('show-nav');

    nameContainer.classList.add('fade-name');
    nameContainer.classList.remove('show-name');
  }
});

/*----------------------------------
Theme Button
----------------------------------*/

const themeBtn = document.querySelector('.btn-theme');
const themeOverlay = document.querySelector('.theme-overlay');
const sunSvg = document.querySelector('.sun-svg');
const moonSvg = document.querySelector('.moon-svg');

themeBtn.addEventListener('click', () => {
  if (themeOverlay.classList.contains('show-theme-overlay')) {
    themeOverlay.classList.remove('show-theme-overlay');
    themeOverlay.classList.add('hide-theme-overlay');
    moonSvg.style.display = 'none';
    sunSvg.style.display = 'block';

  } else {
    themeOverlay.classList.remove('hide-theme-overlay');
    themeOverlay.classList.add('show-theme-overlay');
    sunSvg.style.display = 'none';
    moonSvg.style.display = 'block';
  }
});