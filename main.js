console.log("Loaded")

window.addEventListener("devicemotion", handleMotion, true);

function handleMotion(event) {
    console.log(event.beta)
}