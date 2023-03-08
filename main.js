console.log("Loaded")
const angle = document.getElementById("angle")

const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById("btn3")
const display = document.getElementById("Display")

const tester = document.getElementById("tester")

let outputAngle = 0
let measure = false  
timeStep = 100 //ten times per second

window.addEventListener("deviceorientation", handleOrientation, true);
window.addEventListener("devicemotion", handleMotion);

let rawPositionX = []
let rawPositionY = []
let rawPositionZ = []

let rawPositionAlpha = []
let rawPositionBeta = []
let rawPositionGamma = []

let rawAngleEvent = []
let rawPositionEvent = []

//acceleration vectors 
let accelerationX = []
let accelerationY = []
let accelerationZ = []

finalPosition = 0

setStyles(btn1)

var deadReckonTimer = window.setInterval(function(){
    if (measure) {

        rawPositionX.push(rawPositionEvent[0])
        rawPositionY.push(rawPositionEvent[1])
        rawPositionZ.push(rawPositionEvent[2])

        rawPositionAlpha.push(rawAngleEvent[0])
        rawPositionBeta.push(rawAngleEvent[1])
        rawPositionGamma.push(rawAngleEvent[2])
    }   
}, timeStep);

btn1.addEventListener("click", (event) => {
    setStyles(btn2)
    measure = true
})

btn2.addEventListener("click", (event) => {
    //SET OUTPUT HERE
    measure = false

    normalizeAccelearation()
    let x = determineIntegral(accelerationX)
    let y = determineIntegral(accelerationY)
    let z = determineIntegral(accelerationZ)

    display.textContent = "The measured angle is: " + outputAngle.toFixed(3) + " degrees." + x + " " + y + " " + z
    setStyles(btn3)
})

btn3.addEventListener("click", (event) => {
    outputAngle = 0
    setStyles(btn1)
    
    //Reset all of this
    rawPositionX = []
    rawPositionY = []
    rawPositionZ = []

    rawPositionAlpha = []
    rawPositionBeta = []
    rawPositionGamma = []

    accelerationX = []
    accelerationY = []
    accelerationZ = []

})

function handleOrientation(event) {
    rawAngleEvent = [event.alpha, event.beta, event.gamma];
    outputAngle = event.beta;
  }

function handleMotion(event) {
    rawMotionEvent = [event.acceleration.z, event.acceleration.y, event.acceleration.z];
    tester.innerText = rawMotionEvent
}

function setStyles (button) {
    btn1.style.display = "none";
    btn2.style.display = "none";
    btn3.style.display = "none";
    button.style.display = "flex";
}

function normalizeAccelearation() {

    for (let i = 0; i < rawPositionX.length; i ++) {
        //Convert to radians 
        rawPositionAlpha[i] = rawPositionAlpha[i]*Math.PI/180
        rawPositionBeta[i] = rawPositionBeta[i]*Math.PI/180
        rawPositionGamma[i] = rawPositionGamma[i]*Math.PI/180
    }

    for (let i = 0; i < rawPositionX.length; i ++) {
        //normalize. Defintiely not suss lmao
        accelerationX.push(rawPositionX[i]*Math.cos(rawPositionBeta[i])*Math.cos(rawPositionGamma[i])+rawPositionY[i]*Math.sin(rawPositionGamma)+rawPositionZ[i]*Math.sin(rawPositionBeta))
        accelerationY.push(rawPositionX[i]*Math.sin(rawPositionBeta)+rawPositionY[i]*Math.cos(rawPositionAlpha[i])*Math.cos(rawPositionGamma[i])+rawPositionZ[i]*Math.sin(rawPositionAlpha))
        accelerationZ.push(rawPositionX[i]*Math.sin(rawPositionGamma)+rawPositionY[i]*Math.sin(rawPositionAlpha)+rawPositionZ[i]*Math.cos(rawPositionAlpha[i])*Math.cos(rawPositionGamma[i]))
    }

}

function determineIntegral(acceleration) {
    //Solves position integral from acceleartion in a single direction.
    let velocity = []
    let currentVelocity = 0
    const deltaT = timeStep/1000

    for (let i = 0;  i < acceleration.length; i++) {
        //console.log("Current velocity and accleleartion", currentVelocity, acceleration[i])
        currentVelocity += acceleration[i]*(deltaT)
        velocity.push(currentVelocity)
        //console.log("currentVelocity",currentVelocity)
    } 

    //console.log(velocity)

    let position = []
    let currentPosition = 0 

    for (let i = 0;  i < velocity.length; i++) {
        //console.log("Current position and velocity", currentPosition, velocity[i])
        currentPosition += velocity[i]*(deltaT)
        position.push(currentPosition)
        //console.log("Current position ", currentPosition)
    } 

    //console.log(position)

    finalPosition = position[position.length-1]
    return finalPosition
}
