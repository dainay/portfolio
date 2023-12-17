const motionPathAnimation = gsap.to('#mouse', {
  motionPath: {
    path: '#path1',
    align: '#path1',
    autoRotate: 'true',
    alignOrigin: [1, 0.5]
  },
  duration: 700,
  start: 0.2,
  paused: true
})

// Define the ScrollTrigger for the animation
ScrollTrigger.create({
  animation: motionPathAnimation,
  trigger: '#facts', // The element to trigger the animation
  scrub: 1, // Set the scrub value to control the animation speed
  start: 'top 400px', // Start the animation at the top of the viewport
  end: 'center center', // End the animation at the bottom of the viewport
  // markers: true, // For debugging (optional)
})


 

//ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
//photos
const pictures = document.querySelectorAll('.Picture')
var previousTouch = undefined

let zIndexCounter = 1

function updateElementPosition (element, event) {
  var movementX, movementY

  if (event.type === 'touchmove') {
    const touch = event.touches[0]
    movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0
    movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0
    previousTouch = touch
  } else {
    movementX = event.movementX
    movementY = event.movementY
  }

  element.style.zIndex = zIndexCounter++

  const elementY = parseInt(element.style.top || 0) + movementY
  const elementX = parseInt(element.style.left || 0) + movementX

  element.style.top = elementY + 'px'
  element.style.left = elementX + 'px'
}

function startDrag (element, event) {
  const updateFunction = event => updateElementPosition(element, event)
  const stopFunction = () =>
    stopDrag({ update: updateFunction, stop: stopFunction })
  document.addEventListener('mousemove', updateFunction)
  document.addEventListener('touchmove', updateFunction)
  document.addEventListener('mouseup', stopFunction)
  document.addEventListener('touchend', stopFunction)
}

function stopDrag (functions) {
  previousTouch = undefined
  document.removeEventListener('mousemove', functions.update)
  document.removeEventListener('touchmove', functions.update)
  document.removeEventListener('mouseup', functions.stop)
  document.removeEventListener('touchend', functions.stop)
}

pictures.forEach(picture => {
  const range = 500
  const range2 = 100
  const randomX = Math.random() * (range * 2) - range
  const randomY = Math.random() * (range * 2) - range
  const randomRotate = Math.random() * (range2 / 2) - range2 / 4
  const startFunction = event => startDrag(picture, event)
  picture.style.top = `${randomY + 100}px` 

  picture.style.left = `${randomX}px`

  picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`
  picture.addEventListener('mousedown', startFunction)
  picture.addEventListener('touchstart', startFunction)
})

//ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
//POP UPS SKILLS
var skills = d3.selectAll('.skill');
var currentPopUp = null;

skills.on('click', function () {
  var popId = d3.select(this).attr('data-pop');
  var popUp = d3.select('#' + popId);
  var skill = d3.select(this);

  if (popUp.classed('unseen')) {
    // To show
    if (currentPopUp) {
      currentPopUp.classed('unseen', true).classed('seen', false);
      var currentSkill = d3.select('[data-pop="' + currentPopUp.attr('id') + '"]');
      currentSkill.style('font-family', 'big');
      currentSkill.transition().style('top', '0px');
      skills.classed('active', false)
     
    }

    popUp.classed('unseen', false).classed('seen', true);
  
    
    currentPopUp = popUp;
  } else {
    // To hide
    popUp.classed('unseen', true).classed('seen', false);
   
    currentPopUp = null;
  }

  var offset = popUp.classed('unseen') ? 0 : 100;
  if (offset == 100) { skill.classed('active', true);} else { skill.classed('active', false);}
  skill.transition().style('top', offset + 'px');
 
});



//ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
//hide other projects

function toggleProjects() {
  var projectsDiv = document.querySelector('#other-projects');
  var button = document.querySelector('#seemore');

  if (projectsDiv.style.display === 'none') {
      // Show the div
      projectsDiv.style.display = 'flex';
      projectsDiv.style.transition = 'opacity ease 2s';
      setTimeout(function () {
        projectsDiv.style.opacity = '1';
    }, 10);
      
      // Change button text
      button.innerHTML = 'See less';
  } else {
      // Hide the div
      projectsDiv.style.display = 'none';
      projectsDiv.style.transition = 'opacity ease 2s';
      setTimeout(function () {
        projectsDiv.style.opacity = '0';
    }, 10);
      // Change button text
      button.innerHTML = 'See more';
  }
}


//animation top

 


var elementToAnimate = document.getElementById("h1-top");
var triggerTop =document.getElementById("top");

var scrollTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: triggerTop,
    start: "top top", // Adjust the start position as needed
    end: "bottom center", // Adjust the end position as needed
    scrub: 1, // Smoothly updates the animation as you scroll
   
  }
});

scrollTimeline.to(elementToAnimate, {
  y: "150%", // Move the element 100 pixels down
  filter: "blur(80px)", // Add a blur effect (adjust the value as needed)
  ease: "power2.out",
  height: "5vw",
   // Easing function
});




var elementToAnimateWho = document.getElementById("who");
var triggerWho = document.querySelector(".left-about");

var scrollTimelineWho = gsap.timeline({
  scrollTrigger: {
    trigger: triggerWho,
    start: "center center", // Start animation when the top of the trigger reaches the center of the viewport
    end: "bottom center", // End animation when the bottom of the trigger reaches the center of the viewport
    scrub: 1,
    // markers: true,
  }
});

scrollTimelineWho.to(elementToAnimateWho, {
  y: "-120%", // Move the element 120% down
  filter: "blur(80px)", // Add a blur effect (adjust the value as needed)
  ease: "power2.out", // Easing function
});




//ddddddddddddddddddddddddddddd
//sticked cloud


var ltcloud = document.getElementById("ltcloud");
var topDiv = document.getElementById('top');
var topDivHeight = topDiv.clientHeight;

if (window.innerWidth <= 600) {
ltcloud.classList.add("ltcloud-600-normal");
 }

window.addEventListener('scroll', function () {


  if (window.innerWidth > 600) {
   


    if (window.scrollY >= topDivHeight - 5 * window.innerWidth / 100) {
      ltcloud.classList.add("sticky-left");
    } else {
      ltcloud.classList.remove("sticky-left");
    }
  } else {


    ltcloud.classList.remove("sticky-left");
 
 

    if (window.scrollY >= topDivHeight - 129 * window.innerWidth / 100) {
      
      ltcloud.classList.add("ltcloud-600-sticky");
      ltcloud.classList.remove("ltcloud-600-normal");
      
    } else {
      ltcloud.classList.remove("ltcloud-600-sticky");
      ltcloud.classList.add("ltcloud-600-normal");
    }
  }
});


 
//RIGHT CLOUD


var rtcloud = document.getElementById("rtcloud");
var topDiv = document.getElementById('top');
var topDivHeight = topDiv.clientHeight;

if (window.innerWidth <= 600) {
  rtcloud.classList.add("rtcloud-600-normal");
   }

window.addEventListener('scroll', function () {
  if (window.innerWidth > 600) {
    if (window.scrollY >= topDivHeight - 11 * window.innerWidth / 100) {
      rtcloud.classList.add("sticky-right");
    } else {
      rtcloud.classList.remove("sticky-right");
    }
  } else {
    rtcloud.classList.remove("sticky-right");

    if (window.scrollY >= topDivHeight - 117 * window.innerWidth / 100) {
      rtcloud.classList.add("rtcloud-600-sticky");
      rtcloud.classList.remove("rtcloud-600-normal");
    } else {
      rtcloud.classList.remove("rtcloud-600-sticky");
      rtcloud.classList.add("rtcloud-600-normal");
    }
  }
});



var element1 = document.getElementById("ltcloud");
var element2 = document.getElementById("rtcloud");

// Create the first GSAP timeline
var firstTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#web-design",
    start: "top top",
    end: "center center",
    scrub: 1,
    // markers: true,
  }
});

// Add animations to the first timeline
firstTimeline.to([element1, element2], {
  filter: "blur(80px)",
  y: "-50vw",
  ease: "power2.out",
});

// Create the second GSAP timeline
var secondTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#photography", // Replace with your second trigger element
    start: "bottom 500px", // Start the animation 500px below the bottom of the viewport
    end: "bottom 500px",
    scrub: 1,
    // markers: true,
  }
});

// Add animations to the second timeline (showing back blur 0)
secondTimeline.to([element1, element2], {
  filter: "blur(0px)",
  y: "0vw",
  ease: "power2.out",
});








//moving clouds on top

var element1 = document.getElementById("ltcloud");
var element2 = document.getElementById("rtcloud");

// Create a GSAP timeline
var moveTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#top", // Replace with the element that triggers the animation
    start: "start start",
    end: "bottom center",
    scrub: 1, // Adjust scrub value for smoother animation
    // markers: true,
  }
});

// Add animations to the timeline
moveTimeline.to([element1, element2], {
  y: "+=4vw",
  ease: "power2.out",
 
});

//design magic

var movingParagraph = document.getElementById("flying");
var wrapperAbout = document.querySelector(".wrapper-about");

 
// Set the default start position
var startPosition = "center center";
var endPosition = "bottom center";

// Check if the screen size is smaller than 600px
if (window.innerWidth < 600) {
  startPosition = "top top";
  endPosition = "center center";
}

// Create the GSAP animation with the appropriate start position
gsap.to(movingParagraph, {
  x: "200vw",  
  ease: "power2.out",
  // filter: "blur(20px)",

  scrollTrigger: {
    trigger: wrapperAbout,
    start: startPosition,  // Use the determined start position
    end: "bottom center",
    scrub: 1,
    // markers: true,
  }
});


gsap.registerPlugin(MotionPathPlugin);

var ovalPath = {
  path: "#circle-m",
  align: "self",
  autoRotate: true,
  autoRotate: true,
  start: 0, // Adjust the starting point (0-1)
  end: 1,   // Adjust the ending point (0-1)
  offsetX:  -200,
  offsetY: 310,
};

var tl = gsap.timeline({ repeat: -1, yoyo: false });
 


tl.to(["#star-loop", "#star-loop2"], {
  duration: [15, 25], // Different durations for each element
  motionPath: ovalPath,
  ease: "linear",
});