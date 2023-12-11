const motionPathAnimation = gsap.to('#mouse', {
  motionPath: {
    path: '#path1',
    align: '#path1',
    autoRotate: 'true',
    alignOrigin: [0.5, 0.5]
  },
  duration: 700,
  start: 0.2,
  paused: true
})

// Define the ScrollTrigger for the animation
ScrollTrigger.create({
  animation: motionPathAnimation,
  trigger: '#mouse', // The element to trigger the animation
  scrub: 1, // Set the scrub value to control the animation speed
  start: 'top top', // Start the animation at the top of the viewport
  end: '+=150%' // End the animation at the bottom of the viewport
  // markers: true // For debugging (optional)
})



//animation cloud

gsap.to("#cloud2-skills", {
  y: -2500, // Move the image up by 500 units
  scrollTrigger: {
    trigger: "#path1",
    start: "top top",
    end: "bottom bottom",
    scrub: 14,
    duration: 700,
    paused: true
     // Smoothly transitions the animation as you scroll
  },
});

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
  const range = 400
  const range2 = 100
  const randomX = Math.random() * (range * 2) - range
  const randomY = Math.random() * (range * 2) - range
  const randomRotate = Math.random() * (range2 / 2) - range2 / 4
  const startFunction = event => startDrag(picture, event)
  picture.style.top = `${randomY}px`
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
