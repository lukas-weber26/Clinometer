console.log("Loaded")
const h2 = document.getElementById("beta")

window.addEventListener("devicemotion", handleMotion, true);

function handleMotion(event) {
    console.log(event.beta)
    h2.innerHTML = event.beta
}

