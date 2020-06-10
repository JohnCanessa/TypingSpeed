// **** ****
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

// **** ****
// var timer = [0,0,0,0];
var timer = [0,0,0];

var intervalID;
var timerRunning = false;

// **** add leading zero to numbers 9 or below (purely for aesthetics) ****
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// **** run a standard minute/second/hundredths timer ****
function runTimer() {

  // **** ****
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;

  // **** increment the timer by 1/100 second ****
  // timer[3]++;
  timer[2]++;

  // timer[0] = Math.floor((timer[3]/100)/60);
  // timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  // timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

  // **** update 1/100 of seconds and seconds ****
  if (timer[2] >= 100) {
    timer[2] -= 100;
    timer[1]++;
  }

  // **** update seconds and minutes ****
  if (timer[1] == 60) {
    timer[1] -= 60;
    timer[0]++;
  }
}

// **** match the text entered with the provided text on the page ****
function spellCheck() {

  // **** ****
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

  // **** ****
  if (textEntered == originText) {
      clearInterval(intervalID);
      testWrapper.style.borderColor = "green";  // "#429890";
  } else {
      if (textEntered == originTextMatch) {
          testWrapper.style.borderColor = "blue"; // "#65CCf3";
      } else {
          testWrapper.style.borderColor = "red";  // "#E95D0F";
      }
  }
}

// **** start the timer ****
function start() {

  // **** get the number of characters in the test area ****
  let textEnterdLength = testArea.value.length;

  // **** start the timer ****
  if ((textEnterdLength === 0) && !timerRunning) {
      timerRunning = true;
      intervalID = setInterval(runTimer, 10);
  }

  // ???? ????
  // console.log(textEnterdLength);
}

// **** reset everything ****
function reset() {

  // ???? ????
  // console.log("reset button has been pressed!!!");

  // **** stop the timer (if needed) ****
  clearInterval(intervalID);

  // **** should not be needed because we cleared the interval; but it is good to reset all elements ****
  intervalID = null;

  // **** clear the timer ****
  // timer = [0,0,0,0];
  timer = [0,0,0];

  // **** flag the timer is not running ****
  timerRunning = false;

  // **** clear entered text ****
  testArea.value = "";

  // **** reset the time on the screen ****
  theTimer.innerHTML = "00:00:00";

  // **** rest the border color ****
  testWrapper.style.borderColor = "gray";
}

// **** event listeners for keyboard input and the reset ****
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
