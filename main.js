console.log("Loaded")
const h2 = document.getElementById("beta")
const h3 = document.getElementById("alpha")


if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', (e) => {
            console.log(e)
            //h2.innerText = e
          });
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('devicemotion', (e) => {
        console.log(e)
        h2.innerText = e
      });
  }


  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', (e) => {
            console.log(e)
            h3.innerText = e.beta
          });
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', (e) => {
        console.log(e)
        h3.innerText = e.beta
      });
  }

