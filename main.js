console.log("Loaded")
const angle = document.getElementById("angle")

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    const beta = event.beta;
    angle.textContent = beta;
  }