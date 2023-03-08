console.log("Loaded")
const angle = document.getElementById("angle")

const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById("btn3")
const display = document.getElementById("Display")

let outputAngle = 0

setStyles(btn1)

btn1.addEventListener("click", (event) => {
    window.addEventListener("deviceorientation", handleOrientation, true);
    setStyles(btn2)
})

btn2.addEventListener("click", (event) => {
    //SET OUTPUT HERE
    display.textContent = "The measured angle is: " + outputAngle + " degrees."
    setStyles(btn3)
    window.removeEventListener("deviceorientation", handleOrientation)
})

btn3.addEventListener("click", (event) => {
    outputAngle = 0
    setStyles(btn1)
})

function handleOrientation(event) {
    const beta = event.beta;
    outputAngle = beta;
  }

function setStyles (button) {
    btn1.style.display = "none";
    btn2.style.display = "none";
    btn3.style.display = "none";
    button.style.display = "block";
}