//This works, there is progress, javascript scoping is intersting
//The callback. apply error I was getting was front it thinking it was a 
//call back function the stuff that I pass in should not be called

/*
var counter = 0;
var limit = 5;
var handle;

var flashTick = function() {
  console.log("Flash tick is called")
  console.log(counter)
  console.log(limit)
  if (counter > limit) {
    console.log("stop hint is called")
    stopHint(handle);
    return
  }
  counter = counter + 1;
}

var startHint = function(limit, counter) {
  handler = setInterval(flashTick, 1000);
}

var stopHint = function(handle) {
  clearInterval(handle)
}

//Starting Things Now
startHint(5, 0);
*/

//This is correct, use global variables
//define the callback above the call, which starts things

/*
var counter = 0;
var limit = 5;

var flashTick = function() {
  console.log("Flash tick is called")
  console.log(counter)
  console.log(limit)
  if (counter > limit) {
    console.log("stop hint is called")
    clearInterval(handle)
  }
  counter = counter + 1;
}

var handle = setInterval(flashTick, 1000);

*/

//This is a solution I have to move it to the global scope I am in a bind
//Either I cant put the params in or it will be undefined, or if i pass
//in paramters i will get an eval error because I cant pass in params here

var starHint = function() {
  var hintHandler;
  var hintLimit = 5;
  var hintCounter = 0;

  var hint = function() {

    hintHandler = setInterval(hintTick, 1000)
  }

  var hintTick = function() {
    console.log("Flashing hint")
    console.log(hintCounter)
    console.log(hintLimit)
    if (hintCounter > hintLimit) {
      clearInterval(hintHandler);
    }
    hintCounter = hintCounter + 1;
  }

  hint();
}

starHint();















