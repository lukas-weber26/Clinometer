console.log("Loaded")
const h2 = Document.getElementById("beta")

window.addEventListener("devicemotion", handleMotion, true);

function handleMotion(event) {
    console.log(event.beta)
    h2.innerHTML = event.beta
}

