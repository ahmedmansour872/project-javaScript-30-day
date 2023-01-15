let secondHand = document.querySelector('.second');
let minuteHand = document.querySelector('.minute');
let hourHand = document.querySelector('.hour');

function setDate() {
    let now = new Date();
  // seconds
    let seconds = now.getSeconds();
  // minutes
    let minutes = now.getMinutes();
  // hours
    let hours = now.getHours();

    if(hours>=12){
        hours-=12
    }

    console.log(seconds)

    secondHand.style.transform = `rotate(${seconds*6}deg)`;
    minuteHand.style.transform = `rotate(${minutes*6}deg)`;
    hourHand.style.transform = `rotate(${hours*30}deg)`;
}

setInterval(setDate, 1000);

