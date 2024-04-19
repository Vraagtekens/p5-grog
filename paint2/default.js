
let frame2;
let fullscreenButton;
let historyButton;

document.addEventListener("DOMContentLoaded", function(event){
    // your code here
    frame2 = document.getElementById('frame');
    resetButton = document.getElementById('reset-button');
    fullscreenButton = document.getElementById('fullscreenButton');
    historyButton = document.getElementById('history-button');

    fullScreenButtonEvent();
    resetButtonEvent();
    allScreensEvent();
});


function fullScreenButtonEvent(){
    fullscreenButton.addEventListener('click', (event) => {
        openFullscreen()
    });
}

function openFullscreen(){
    
    if (frame2.requestFullscreen) {
        frame2.requestFullscreen();
    } else if (frame2.webkitRequestFullscreen) { /* Safari */
        frame2.webkitRequestFullscreen();
    } else if (frame2.msRequestFullscreen) { /* IE11 */
        frame2.msRequestFullscreen();
    }

};

function resetButtonEvent(){
    resetButton.addEventListener('click', (event) => {
        screen = createGraphics(frame.offsetWidth, frame.offsetHeight);
        screen.background(255);

        allScreens = [];
    });
}


function allScreensEvent(){
    historyButton.addEventListener('click', () => {

    });

}

const screenImage = function( sketch ) {
    sketch.setup = function() {
      let canvas1 = sketch.createCanvas(600, 400, sketch.WEBGL);
      canvas1.position(0,0);

    //   sketch.noLoop();
    }

    sketch.draw = function() {
      //for canvas 1
      sketch.background(100);
      sketch.rotateX(sketch.frameCount * 0.01);
      sketch.rotateZ(sketch.frameCount * 0.01);
      sketch.cone(30, 50);
    }
  };