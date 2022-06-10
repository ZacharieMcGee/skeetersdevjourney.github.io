/*----------------------------------
Handling Indicators and Title Anims
----------------------------------*/

const loadingScreen = document.querySelector('.loading-overlay');
const bgContainer = document.querySelector('#brdr-container');
const landingText = document.querySelector('.land-txt-container');
const indicatorText = document.querySelector('.indicator-text');
const indicatorArrow = document.querySelector('.indicator-arrow');
const staticIndicators = document.querySelectorAll('.indicator-2');

function load(src) {
  return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', resolve);
      image.addEventListener('error', reject);
      image.src = src;
  });
}

const image = '/img/border/bg.png';
load(image)
  .then(() => bgContainer.style.backgroundImage = `url(${image}`)
  .then(() => loadingScreen.style.display = 'none')
  .then(() => {
    setTimeout(() => {
      playLandingAnims();
    }, 500);
});

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

function showIndicators() {
  staticIndicators.forEach(indicator => indicator.classList.add('show-indicator'));
}

function hideIndicators() {
  staticIndicators.forEach(indicator => indicator.classList.remove('show-indicator'));
}

/*----------------------------------
Confirmation Message and Set Site Url
----------------------------------*/

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

const confirmationRedirect = document.querySelector('#redirect');
confirmationRedirect.value = document.location.origin;

/*----------------------------------
Scroll to Landing Page on Refresh
----------------------------------*/

window.scroll({
  top: 0,
  behavior: "smooth"
});

/*----------------------------------
Header Position Change + 
Window Scroll Auto Correct After Delay
----------------------------------*/

const header = document.querySelector('#my-header');

let screenHeight = window.innerHeight;
let scrollDist = window.pageYOffset;
let breakLength = screenHeight / 2;
let timerID; 

window.addEventListener('scroll', () => {
  adjustScreenPosition();
  indicateResume();
});
window.addEventListener('resize', () => {
  adjustScreenPosition();
});

function adjustScreenPosition() {
  clearTimeout(timerID);
  screenHeight = window.innerHeight;
  scrollDist = window.pageYOffset;
  breakLength = screenHeight / 2;
  let isMobile = false;

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

  timerID = setTimeout(() => {
    let p1Limit = screenHeight / 2;
    let p2Limit = (p1Limit * 3) + breakLength;
    let p3Limit = (p1Limit * 5) + (breakLength * 2);
    let p4Limit = (p1Limit * 7) + (breakLength * 3);

    if (isMobile == false) {
      if (scrollDist <= p1Limit) {
        window.scroll({
          top: 0,
          behavior: "smooth"
        });
      } else if (scrollDist <= p2Limit) {
        window.scroll({
          top: screenHeight + breakLength,
          behavior: "smooth"
        });
      } else if (scrollDist <= p3Limit) {
        window.scroll({
          top: (screenHeight * 2) + (breakLength * 2),
          behavior: "smooth"
        });
      } else if (scrollDist <= p4Limit) {
        window.scroll({
          top: (screenHeight * 3) + (breakLength * 3),
          behavior: "smooth"
        });
      } else {
        window.scroll({
          top: (screenHeight * 4) + (breakLength * 4),
          behavior: "smooth"
        });
      }
    }
  }, 1500);
}

const resumeAnim = document.querySelector('.resume-anim');

function indicateResume() {
  if (scrollDist >= screenHeight + breakLength) {
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
const monnBtn = document.querySelector('.fa-moon');

monnBtn.style.display = 'none';

themeBtn.addEventListener('click', () => {
  if (themeOverlay.classList.contains('show-theme-overlay')) {
    themeOverlay.classList.remove('show-theme-overlay');
    themeOverlay.classList.add('hide-theme-overlay');
    monnBtn.style.display = 'none';
    sunBtn.style.display = 'block';

  } else {
    themeOverlay.classList.remove('hide-theme-overlay');
    themeOverlay.classList.add('show-theme-overlay');
    sunBtn.style.display = 'none';
    monnBtn.style.display = 'block';
  }
});

/*----------------------------------
Project List Horizontal Scroll
----------------------------------*/

// This is all working but it feels horribly bloated
const project1List = document.querySelector('.proj-1-list');
const project2List = document.querySelector('.proj-2-list');

const projects = document.querySelectorAll('.proj');

let focusedProject = '';
let isWheeling = false;
let isIndicating = true;

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

///////////////////////////////////////////////////

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

///////////////////////////////////////////////////

project1List.addEventListener('wheel', (e) => {
  allowHorizontalScroll(e);
  
});
project2List.addEventListener('wheel', (e) => {
  allowHorizontalScroll(e);
});
function allowHorizontalScroll(e) {
  let p = e.target.parentNode;
  e.preventDefault();
  isWheeling = true;
  if (focusedProject == '' && p.classList == 'proj-1-list') {
    focusedProject = projects[0];
    showProj(projects[0]);
  } else if (focusedProject == '' && p.classList == 'proj-2-list') {
    focusedProject = projects[3];
    showProj(projects[3]);
  } else {
    showNextProj(e);
  }
}

///////////////////////////////////////////////////

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

function blurAll () {
  isWheeling = false;
  focusedProject = '';
  projects.forEach(proj => {
    proj.classList.remove('grow-proj');
    proj.classList.remove('fade-proj');
  })
}

///////////////////////////////////////////////////

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


