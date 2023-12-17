 
//animation top




gsap.to("#p-top", {
  duration: 1, 
  y: "20vh", // Start from the middle (negative 50% of its height)
  start: "center center",
  delay: 2,  
  ease: "power2.inOut"
});

document.body.style.overflowY = 'hidden';

 gsap.to("#h1-top", {
  duration: 3,  // Duration of the animation in seconds
  filter: "blur(0px)",
  y: "-10vw",
  delay: 2,  // Target blur value (end state)
  ease: "power2.inOut",
});

gsap.to("#h2-top", {
  duration: 2,  // Duration of the appearance animation in seconds
  opacity: 1,
  delay: 3,
  ease: "power2.out"   
});



window.addEventListener("wheel", function (e) {
  if (isAnimationInProgress) {
    e.preventDefault();
  }
});
 
window.addEventListener("beforeunload", function () {
  // Scroll to the top of the page before leaving
  window.scrollTo(0, 0);
});


const secondsToWait = 5; 
 
setTimeout(() => {
  // Redirect to the desired URL
  window.location.href = "./index.html";  
}, secondsToWait * 1000);