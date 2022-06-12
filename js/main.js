/*----------------------------------
Load Landing Page
----------------------------------*/

/*  This section loads the background image, landing page image, 
    and landing name animated png before hiding the loading screen.
    This is done to ensure the user will see the landing page as it's
    meant to be. */
const body = document.body;
const loadingScreen = document.querySelector('.loading-overlay');
const landingText = document.querySelector('.land-txt-container');
const indicatorText = document.querySelector('.indicator-text');
const indicatorArrow = document.querySelector('.indicator-arrow');
const staticIndicators = document.querySelectorAll('.indicator-2');

// Temporarily loads larger images and resolves per image loaded.
function load(src) {
  return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', resolve);
      image.addEventListener('error', reject);
      image.src = src;
  });
}

const bgContainer = document.querySelector('#brdr-container');
const bgImgUrl = 'img/border/bg.png';

const landingImg = document.querySelector('.land-name');
const landingImgUrl = 'img/anims/name-anim.png';

const landingName = document.querySelector('.land-img');
const landingNameUrl = 'img/page-art/landing-img.png';

/*  Loads landing page elements, then hides the background 
    and starts related animations. */
load(bgImgUrl)
  .then(() => bgContainer.style.backgroundImage = `url(${bgImgUrl}`)
  .then(() => load(landingImgUrl))
  .then(() => landingImg.src = landingImgUrl)
  .then(() => load(landingNameUrl))
  .then(() => landingName.src = landingNameUrl)
  .then(() => loadingScreen.style.display = 'none')
  .then(() => {
    body.style.overflowY = 'visible';
    setTimeout(() => {
      playLandingAnims();
    }, 500);
});

// displays animated png and animates the 'scroll' indicator.
function playLandingAnims() {
  landingText.style.display = 'flex';
  setTimeout(() => {
    indicatorText.style.display = 'block';
    setTimeout(() => {
      indicatorArrow.src = indicatorArrow.src.replace(/\?.*$/,"")+"?x="+Math.random();
      indicatorArrow.style.display = 'block';
    }, 1000);
  }, 4000);
}

// shows/hides the static 'select' indicators on either project section.
function showIndicators() {
  staticIndicators.forEach(indicator => indicator.classList.add('show-indicator'));
}
function hideIndicators() {
  staticIndicators.forEach(indicator => indicator.classList.remove('show-indicator'));
}

/*----------------------------------
Confirmation Modal Handler
----------------------------------*/

/*  specifically for submitting the contact form;
    due to the quirks of the submission method used,
    the modal is toggled by setting a key in the local storage
    which will toggle the modal when auto refreshed */
const modal = document.querySelector('#confirm-modal');
const closeModalBtn = document.querySelector('.close-modal-btn');

function sentEmail() {
  window.localStorage.setItem('showConfirmation', 'true');
}

if (window.localStorage.getItem('showConfirmation') == 'true') {
  modal.style.display = "flex";
  modal.showModal();
}

closeModalBtn.addEventListener('click', () => {
  modal.close();
  modal.style.display = "none";
  window.localStorage.setItem('showConfirmation', 'false');
});

// will select the correct URL to refresh to (either hosted or github pages)
const confirmationRedirect = document.querySelector('#redirect');
confirmationRedirect.value = document.location.origin;

/*----------------------------------
Sticky Header + Window Auto Scroll
----------------------------------*/

const header = document.querySelector('#my-header');

let screenHeight = window.innerHeight;
let scrollDist = window.pageYOffset;
let breakLength = screenHeight / 2;
let timerID; 

// scroll to top on refresh
window.scroll({
  top: 0, 
  behavior: 'smooth'
});

window.addEventListener('scroll', () => {
  adjustScreenSize();
  adjustScreenPosition();
  indicateResume();
});
window.addEventListener('resize', () => {
  adjustScreenSize();
  adjustScreenPosition();
});


function adjustScreenSize() {
  screenHeight = window.innerHeight;
  scrollDist = window.pageYOffset;
  breakLength = screenHeight / 2;
}

/*  Checks for mobile, makes header sticky, and 
    auto corrects the position of the window
    to best fit the content of each page. 
    Does not affect mobile */
function adjustScreenPosition() {
  clearTimeout(timerID);
  let isMobile = false;

  // makes the header sticky when the user scrolls onto the about page
  if (scrollDist >= screenHeight + breakLength) {
    header.className = 'sticky-header';
  } else {
    header.removeAttribute('class');
  }

  if (window.innerWidth < 768) {
    isMobile = true;
  } else {
    isMobile = false;
  }

//////////// Uncomment Lines 157 - 195 for scroll correct ////////////

//   /*  timeout only triggers screen auto correct
//       if the user sits in an incorrect position for 
//       a few seconds */
//   timerID = setTimeout(() => {
//     let p1Limit = screenHeight / 2;
//     let p2Limit = (p1Limit * 3) + breakLength;
//     let p3Limit = (p1Limit * 5) + (breakLength * 2);
//     let p4Limit = (p1Limit * 7) + (breakLength * 3);

//     // scroll state for each page
//     if (isMobile == false) {
//       if (scrollDist <= p1Limit) {
//         window.scroll({
//           top: 0,
//           behavior: "smooth"
//         });
//       } else if (scrollDist <= p2Limit) {
//         window.scroll({
//           top: screenHeight + breakLength,
//           behavior: "smooth"
//         });
//       } else if (scrollDist <= p3Limit) {
//         window.scroll({
//           top: (screenHeight * 2) + (breakLength * 2),
//           behavior: "smooth"
//         });
//       } else if (scrollDist <= p4Limit) {
//         window.scroll({
//           top: (screenHeight * 3) + (breakLength * 3),
//           behavior: "smooth"
//         });
//       } else {
//         window.scroll({
//           top: (screenHeight * 4) + (breakLength * 4),
//           behavior: "smooth"
//         });
//       }
//     }
//   }, 1500);

//////////// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ////////////

}

const resumeAnim = document.querySelector('.resume-anim');

/*  animates the background of the resume button 
    only when the user scrolls to the about page to 
    ensure the user knows where the button is */
function indicateResume() {
  if (scrollDist >= (screenHeight + breakLength) - 100) {
    setTimeout(() => {
      resumeAnim.classList.add('show-resume');
    }, 1000);
  }
}

/*----------------------------------
Navigation Buttons
----------------------------------*/
const btns = document.querySelectorAll('.nav-btn');
const btnAnims = document.querySelectorAll('.btn-anim');

// each button has an animated png that plays when selected
btns[0].addEventListener('click', () => {
  animReset(btnAnims[0]);
  window.scroll({
    top: screenHeight + breakLength,
    behavior: "smooth"
  });
})
btns[1].addEventListener('click', () => {
  animReset(btnAnims[1]);
  window.scroll({
    top: (screenHeight * 2) + (breakLength * 2),
    behavior: "smooth"
  });
})
btns[2].addEventListener('click', () => {
  animReset(btnAnims[2]);
  window.scroll({
    top: (screenHeight * 4) + (breakLength * 4),
    behavior: "smooth"
  });
})

// ensures that the animated png plays each time a button is pressed
function animReset(stroke) {
  stroke.src = stroke.src.replace(/\?.*$/,"")+"?x="+Math.random();
  stroke.style.display = 'block';
  setTimeout(() => {
    stroke.style.display = 'none';
  }, 750);
}

/*----------------------------------
Hamburger Button 
----------------------------------*/

const burgerBtn = document.querySelector('.burger');
const navBtns = document.querySelector('.nav-container');
const nameContainer = document.querySelector('.name-container');

const menuBtn = document.querySelector('.fa-bars');
const xBtn = document.querySelector('.fa-xmark');
xBtn.style.display = 'none';

/*  The hamburger button opens the menu for mobile devices.
    It is hidden otherwise. */
burgerBtn.addEventListener('click', () => {
  if (navBtns.classList.contains('show-nav')) {
    navBtns.classList.remove('show-nav');
    navBtns.classList.add('hide-nav');

    nameContainer.classList.remove('fade-name');
    nameContainer.classList.add('show-name');

    xBtn.style.display = 'none';
    menuBtn.style.display = 'block';
  } else {
    navBtns.classList.remove('hide-nav');
    navBtns.classList.add('show-nav');

    nameContainer.classList.add('fade-name');
    nameContainer.classList.remove('show-name');

    menuBtn.style.display = 'none';
    xBtn.style.display = 'block';
  }
});

/*----------------------------------
Theme Selector
----------------------------------*/

const themeBtn = document.querySelector('.btn-theme');
const themeOverlay = document.querySelector('.theme-overlay');
const sunBtn = document.querySelector('.fa-sun');
const moonBtn = document.querySelector('.fa-moon');

moonBtn.style.display = 'none';

// theme button for selecting between light and dark mode 
themeBtn.addEventListener('click', () => {
  if (themeOverlay.classList.contains('show-theme-overlay')) {
    themeOverlay.classList.remove('show-theme-overlay');
    themeOverlay.classList.add('hide-theme-overlay');
    moonBtn.style.display = 'none';
    sunBtn.style.display = 'block';

  } else {
    themeOverlay.classList.remove('hide-theme-overlay');
    themeOverlay.classList.add('show-theme-overlay');
    sunBtn.style.display = 'none';
    moonBtn.style.display = 'block';
  }
});

/*----------------------------------
Project List Horizontal Scroll
----------------------------------*/

const project1List = document.querySelector('.proj-1-list');
const project2List = document.querySelector('.proj-2-list');
const projects = document.querySelectorAll('.proj');

let focusedProject = '';
let isWheeling = false;
let isIndicating = true;

/*  blurs the project lists when scrolling 
    or clicking outside of the project container */
window.addEventListener('scroll', (e) => {
  blurListener(e);
})
window.addEventListener('click', (e) => {
  blurListener(e);
});
function blurListener(e) {
  let list = e.target.parentNode;
  if (list !== project1List && list !== project2List) {
    focusedProject = '';
    isWheeling = false;
    blurAll();
    if (isIndicating) {
      showIndicators();
      isIndicating = false;
    }
  } 
}
function blurAll () {
  isWheeling = false;
  focusedProject = '';
  projects.forEach(proj => {
    proj.classList.remove('grow-proj');
    proj.classList.remove('fade-proj');
  })
}

///////////////////////////////////////////////////

/*  allows the projects (only when focused)
    to launch the relative site on click or enter press */
project1List.addEventListener('click', (e) => {
  siteListener(e);  
});
project2List.addEventListener('click', (e) => {
  siteListener(e);
});
project1List.addEventListener('keyup', (e) => {
  console.log('hello');
  if (e.key == 'Enter') {
    siteListener(e);
  }
});
project2List.addEventListener('keyup', (e) => {
  console.log('hello');
  if (e.key == 'Enter') {
    siteListener(e);
  }
});

// launch site based on focusedProject variable
function siteListener(e) {
  let p = e.target;
  if (p == focusedProject) {
    launchSite(p);
  }
}

///////////////////////////////////////////////////
 
project1List.addEventListener('touchstart', (e) => {
  touchListener(e);
});
project2List.addEventListener('touchstart', (e) => {
  touchListener(e);
});

// prevents weird double event behavior with touch events
function touchListener(e) {
  let p = e.target;
  if (p !== focusedProject) {
    e.preventDefault();
    scrollThrough(e);
  } else {
    launchSite(p);
  }
}

///////////////////////////////////////////////////

project1List.addEventListener('mouseover', (e) => {
  scrollThrough(e);
});
project2List.addEventListener('mouseover', (e) => {
  scrollThrough(e);
});
project1List.addEventListener('keyup', (e) => {
  if (e.key == 'Tab') {
    scrollThrough(e);
  }
});
project2List.addEventListener('keyup', (e) => {
  if (e.key == 'Tab') {
    scrollThrough(e);
  }
});

/*  projects that are placed into the focusedProject 
    variable are emphasized */
function scrollThrough(e) {
  if (isWheeling == false) {
    projects.forEach(project => {
      if (project == e.target) {
        focusedProject = project;
        showProj(project);
      } 
    });
  } else {
    isWheeling = false;
  }
}

//////////// Uncomment Lines 444 - 468 for horizontal project scroll ////////////

// project1List.addEventListener('wheel', (e) => {
//   allowHorizontalScroll(e);
//   console.log(e.deltaY);
  
// });
// project2List.addEventListener('wheel', (e) => {
//   allowHorizontalScroll(e);
// });

// /*  allows the user to scroll horizontal through 
//     the projects using the wheel. */
// function allowHorizontalScroll(e) {
//   let p = e.target.parentNode;
//   e.preventDefault();
//   isWheeling = true;
//   if (focusedProject == '' && p.classList == 'proj-1-list') {
//     focusedProject = projects[0];
//     showProj(projects[0]);
//   } else if (focusedProject == '' && p.classList == 'proj-2-list') {
//     focusedProject = projects[3];
//     showProj(projects[3]);
//   } else {
//     showNextProj(e);
//   }
// }

//////////// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ////////////

/* if the user is interacting with the projects,
    the focused project will grow the fill the 
    majority of the container, the relevant text 
    will animated, and the indicator will be hidden*/
function showProj(project) {
  hideIndicators();
  isIndicating = true;
  projects.forEach(proj => {
    if (proj == project) {
      proj.classList.remove('fade-proj');
      proj.classList.add('grow-proj');
    } else {
      proj.classList.remove('grow-proj');
      proj.classList.add('fade-proj');
    }
  });
}

///////////////////////////////////////////////////

/*  scrolling through the projects list sets the 
    focused project via targeting its sibling.
    If there is no sibling, the list will loop. */
function showNextProj(e) {
  if (e.deltaY < 0) {
    let nextProj = focusedProject.nextElementSibling;
    if (nextProj !== null) {
      focusedProject = nextProj;
      showProj(focusedProject);
    } else {
      focusedProject = focusedProject.parentNode.firstElementChild;
      showProj(focusedProject);
    }

  } else {
    let nextProj = focusedProject.previousElementSibling;
    if (nextProj !== null) {
      focusedProject = nextProj;
      showProj(focusedProject);
    } else {
      focusedProject = focusedProject.parentNode.lastElementChild;
      showProj(focusedProject);
    }
  }
}

/*----------------------------------
Project Site Links
----------------------------------*/

// To avoid bubbling issues with acnhor and button tags,
// links will trigger via js
function launchSite(p) {
  if (p == projects[0]) {
    window.open('https://skeetersdevjourney.github.io/Project-08-EmployeeDirectory/', '_blank');
  } else if (p == projects[1]) {
    window.open('https://skeetersdevjourney.github.io/Project-06-GameApp/', '_blank');
  } else if (p == projects[2]) {
    window.open('https://skeetersdevjourney.github.io/Project-07-WebAppDashboard/', '_blank');
  } else if (p == projects[3]) {
    window.open('https://skeetersdevjourney.github.io/Project-05-PhotoGallery/', '_blank');
  } else if (p == projects[4]) {
    window.open('https://skeetersdevjourney.github.io/Project-04-StyleGuide/', '_blank', '_blank');
  } else if (p == projects[5]) {
    window.open('https://skeetersdevjourney.github.io/Project_03--Online_Registration_Form/', '_blank');
  } else if (p == projects[6]) {
    window.open('https://skeetersdevjourney.github.io/Project02---Responsive-Layout-Design/', '_blank');
  } 
}


