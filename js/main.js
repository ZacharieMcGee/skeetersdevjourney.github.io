/*----------------------------------
Confirmation Message
----------------------------------*/

const modal = document.querySelector('#confirmation-message');
const closeModalBtn = document.querySelector('.close-modal-btn');

function sentEmail() {
  window.localStorage.setItem('showConfirmation', 'true');
}

if (window.localStorage.getItem('showConfirmation') == 'true') {
  modal.showModal();
}

closeModalBtn.addEventListener('click', () => {
  modal.close();
  window.localStorage.setItem('showConfirmation', 'false');
});


/*----------------------------------
Load Large Images and 
Handle Loading Screen
----------------------------------*/

// const loadingScreen = document.querySelector('.loading-overlay');

const landingText = document.querySelector('.landing-text-container');
const scrollIndicator = document.querySelector('.indicator-text1');
const scrollArrow = document.querySelector('.indicator-arrow1');

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

// window.scroll({
//   top: 0,
//   behavior: "smooth"
// });

/*----------------------------------
Header Position Change + 
Window Scroll Auto Correct After Delay
----------------------------------*/

const header = document.querySelector('#my-header');

let screenHeight = window.innerHeight;
let scrollDist = window.pageYOffset;
let breakLength = 300;
let timerID; 

window.addEventListener('scroll', adjustScreenPosition);
window.addEventListener('resize', adjustScreenPosition);

function adjustScreenPosition() {
  clearTimeout(timerID);
  screenHeight = window.innerHeight;
  scrollDist = window.pageYOffset;

  if (scrollDist >= screenHeight + 250) {
    header.className = 'sticky-header';
  } else {
    header.removeAttribute('class');
  }

  timerID = setTimeout(() => {
    let p1Limit = screenHeight / 2;
    let p2Limit = (p1Limit * 3) + breakLength;
    let p3Limit = (p1Limit * 5) + (breakLength * 2);
    let p4Limit = (p1Limit * 7) + (breakLength * 3);

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
  }, 1500);
}



/*----------------------------------
Page Title Gif Control
----------------------------------*/

// // display block from none will start anim from beginning
// const about = document.querySelector('.about-anim');
// const projects = document.querySelector('.projects-anim');
// const contact = document.querySelector('.contact-anim');

// window.addEventListener('keyup', (e) => {
//   if (e.key == '1') {
//     about.style.display = 'block';
//   } else if (e.key == '2') {

//   } else if (e.key == '3') {
    
//   } else if (e.key == '4') {
//     contact.style.display = 'block';
//   }
  
// });

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


/*----------------------------------
Project List Horizontal Scroll
----------------------------------*/

// This is all working but it feels horribly bloated
const project1List = document.querySelector('.projects-1-list');
const project2List = document.querySelector('.projects-2-list');

const projects = document.querySelectorAll('.project');

let focusedProject = '';
let isWheeling = false;

// window.addEventListener('click', (e) => {
//   if (e.target.parentNode !== project1List) {
//     focusedProject = '';
//     isWheeling = false;
//     blurAll();
//   } else if (e.target == focusedProject) {
//     console.log('hello');
//   }
// })

window.addEventListener('scroll', (e) => {
  blurListener(e);
})
window.addEventListener('click', (e) => {
  blurListener(e);
});
function blurListener(e) {
  let list = e.target.parentNode;
  if (list !== project1List && list !== project2List) {
      console.log(`Event: Blur`);
      blurAll();
  } 
}

///////////////////////////////////////////////////

project1List.addEventListener('click', (e) => {
  console.log('Event: Click on List 1');
  siteListener(e)
});
project2List.addEventListener('click', (e) => {
  console.log('Event: Click on List 1');
  siteListener(e)
});
function siteListener(e) {
  let p = e.target;
  if (p == focusedProject) {
    console.log('hello click');
    launchSite(p);
  }
}

///////////////////////////////////////////////////
 
project1List.addEventListener('touchstart', (e) => {
  console.log('Event: TouchStart on List 1');
  touchListener(e);
});
project2List.addEventListener('touchstart', (e) => {
  console.log('Event: TouchStart on List 2');
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
  console.log('Event: Hover on List 1');
  scrollThrough(e);
});
project2List.addEventListener('mouseover', (e) => {
  console.log('Event: Hover on List 2');
  scrollThrough(e);
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
  console.log('Event: Wheel on List 1');
  allowHorizontalScroll(e);
  
});
project2List.addEventListener('wheel', (e) => {
  console.log('Event: Wheel on List 2');
  allowHorizontalScroll(e);
  
});
function allowHorizontalScroll(e) {
  let p = e.target.parentNode;
  e.preventDefault();
  isWheeling = true;
  if (focusedProject == '' && p.classList == 'projects-1-list') {
    focusedProject = projects[0];
    showProj(projects[0]);
  } else if (focusedProject == '' && p.classList == 'projects-2-list') {
    focusedProject = projects[3];
    showProj(projects[3]);
  } else {
    showNextProj(e);
  }
}

///////////////////////////////////////////////////

function showProj(project) {
  projects.forEach(proj => {
    if (proj == project) {
      proj.classList.remove('fade-proj');
      proj.classList.add('grow-proj');
    } else {
      proj.classList.remove('grow-proj');
      proj.classList.add('fade-proj');
    }
  });
  console.log(focusedProject.classList[1]);
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
  let c = p.classList;
  if (c.contains('proj-1')) {
    window.open('https://skeetersdevjourney.github.io/Project-08-EmployeeDirectory/', '_blank');
  } else if (c.contains('proj-2')) {
    window.open('https://skeetersdevjourney.github.io/Project-06-GameApp/', '_blank');
  } else if (c.contains('proj-3')) {
    window.open('https://skeetersdevjourney.github.io/Project-07-WebAppDashboard/', '_blank');
  } else if (c.contains('proj-4')) {
    window.open('https://skeetersdevjourney.github.io/Project-05-PhotoGallery/', '_blank');
  } else if (c.contains('proj-5')) {
    window.open('https://skeetersdevjourney.github.io/Project-04-StyleGuide/', '_blank', '_blank');
  } else if (c.contains('proj-6')) {
    window.open('https://skeetersdevjourney.github.io/Project_03--Online_Registration_Form/', '_blank');
  } else if (c.contains('proj-7')) {
    window.open('https://skeetersdevjourney.github.io/Project02---Responsive-Layout-Design/', '_blank');
  } 
}

// project1List.addEventListener('click', (e) => {
//   let p = e.target;
//   if (p.tagName == 'BUTTON') {
//     openSite(p);
//   }
// });

// function openSite(p) {
//   if (p.parentNode.classList.contains('proj-1')) {
//     window.open('https://skeetersdevjourney.github.io/Project-08-EmployeeDirectory/', '_blank');
//   }
// }

// project1List.addEventListener('click', (e) => {
//   let p = e.target;
//   if (isLinkActive) {
//     console.log(p.parentNode.classList[1]);
//   }
// });


