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
  let screenHeight = screen.height;
  let scrollDist = window.pageYOffset;
  let p1Break = screenHeight / 2;
  let p2Break = p1Break * 3;
  let p3Break = p1Break * 5;
  let p4Break = p1Break * 7;

  if (scrollDist >= screenHeight) {
    header.className = 'sticky-header';
  } else {
    header.removeAttribute('class');
  }

  timerID = setTimeout(() => {
    if (scrollDist <= p1Break) {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
    } else if (scrollDist <= p2Break) {
      window.scroll({
        top: screenHeight,
        behavior: "smooth"
      });
    } else if (scrollDist <= p3Break) {
      window.scroll({
        top: screenHeight * 2,
        behavior: "smooth"
      });
    } else if (scrollDist <= p4Break) {
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
});
