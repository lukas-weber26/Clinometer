let measure = false  
timeStep = 100 //ten times per second

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

function handleMotion(event) {
    rawMotionEvent = [event.acceleration.z, event.acceleration.y, event.acceleration.z];
    tester.innerText = rawMotionEvent
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
