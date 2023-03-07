console.log("Loaded")
const h2 = document.getElementById("beta")


DeviceMotionEvent.requestPermission()
.then(response => {
  if (response == 'granted') {
    window.addEventListener('devicemotion', (e) => {
        console.log(e.acceleration)
        h2.innerHTML = "Test"
    })
  }
})
.catch(console.error)