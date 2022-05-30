/*----------------------------------
Ready State Check
----------------------------------*/

const landingText = document.querySelector('.landing-text-container');
const scrollIndicator = document.querySelector('.scroll-text');
const scrollArrow = document.querySelector('.arrow-anim');

// will wait for resources to load before enabling animations
document.addEventListener('readystatechange', () => {
  if (document.readyState == 'complete') {
    console.log('animating');
    landingText.style.display = 'flex';
    scrollIndicator.style.display = 'block';
    setTimeout(()=> {
      scrollArrow.style.display = 'block';
    }, 4500);
  }
})

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
let timerID; 

window.addEventListener('scroll', () => {

  clearTimeout(timerID);
  let screenHeight = window.innerHeight;
  let scrollDist = window.pageYOffset;

  if (scrollDist >= screenHeight) {
    header.className = 'sticky-header';
  } else {
    header.removeAttribute('class');
  }

  timerID = setTimeout(() => {
    let p1Limit = screenHeight / 2;
    let p2Limit = p1Limit * 3;
    let p3Limit = p1Limit * 5;
    let p4Limit = p1Limit * 7;

    if (scrollDist <= p1Limit) {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
      console.log(`Scrolling to P1 at ${window.pageYOffset}`);

    } else if (scrollDist <= p2Limit) {
      window.scroll({
        top: screenHeight,
        behavior: "smooth"
      });
      console.log(`Scrolling to P2 at ${window.pageYOffset}`);

    } else if (scrollDist <= p3Limit) {
      window.scroll({
        top: screenHeight * 2,
        behavior: "smooth"
      });
      console.log(`Scrolling to P3 at ${window.pageYOffset}`);
      
    } else if (scrollDist <= p4Limit) {
      window.scroll({
        top: screenHeight * 3,
        behavior: "smooth"
      });
      console.log(`Scrolling to P4 at ${window.pageYOffset}`);

    } else {
      window.scroll({
        top: screenHeight * 4,
        behavior: "smooth"
      });
      console.log(`Scrolling to P5 at ${window.pageYOffset}`);
    }
  }, 1500);
});

/*----------------------------------
Page Title Gif Control
----------------------------------*/

// display block from none will start anim from beginning
const about = document.querySelector('.about-anim');
const contact = document.querySelector('.contact-anim');

window.addEventListener('keyup', (e) => {
  if (e.key == '1') {
    about.style.display = 'block';
  } else if (e.key == '2') {

  } else if (e.key == '3') {
    
  } else if (e.key == '4') {
    contact.style.display = 'block';
  }
  
})
