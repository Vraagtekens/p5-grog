
let screen;
let paintShader;
let frame;
let pause = true;

let screenWidth = 600;
let allScreens = [];
let mouseInScreen = false;

function preload(){
    paintShader = loadShader('./paint2/vertShader.vert', './paint2/fragShader2.frag');
}

function setup(){
    frame = document.querySelector("#frame");
    let canvas = createCanvas(frame.offsetWidth, frame.offsetHeight, WEBGL);
    canvas.parent('frame');

    screen = createGraphics(frame.offsetWidth, frame.offsetHeight);
    screen.background(255);
    resizeCanvas(frame.offsetWidth, frame.offsetHeight);

    canvas.canvas.oncontextmenu = () => false;
    canvas.mouseOver(() => {mouseInScreen = true})
    canvas.mouseOut(() => {mouseInScreen = false})

    shader(paintShader);
}

function draw(){
    if(mouseIsPressed){
        // screen.strokeWeight(8);
        // screen.stroke(0);
        // screen.line(mouseX, mouseY, pmouseX, pmouseY);
        blendMode(MULTIPLY);
        let x = 1.5;
        let mouseSpeed = (abs(mouseX - pmouseX) + abs(mouseY - pmouseY)) + 5;

        screen.stroke('black');
        let weight = map(mouseSpeed, 0, 50, 8, 3);
        screen.strokeWeight(weight); 
        screen.line(mouseX, mouseY, pmouseX, pmouseY);

        screen.stroke('black');
        let weight2 = map(mouseSpeed, 0, 50, 6, 3);
        screen.strokeWeight(weight2); 
        screen.line(mouseX + x, mouseY + x, pmouseX+ x, pmouseY+ x);

        screen.stroke('black');
        let weight3 = map(mouseSpeed, 0, 50, 6, 3);
        screen.strokeWeight(weight3); 
        screen.line(mouseX - x, mouseY - x, pmouseX - x, pmouseY - x);

        screen.stroke('black');
        let weight4 = map(mouseSpeed, 0, 50, 6, 3);
        screen.strokeWeight(weight4); 
        screen.line(mouseX - x, mouseY + x, pmouseX + x, pmouseY + x);
    }

    // image(screen, -width/2, -height/2, width, height);
    drawScreen();
}

function drawScreen(){
    paintShader.setUniform('texture', screen);
    // paintShader.setUniform('noise', 0.009);
    paintShader.setUniform('noise', 0.01);
    
    rect(-width/2, -height/2, width, height);
}

function windowResized() {
    // console.log(width);
    console.log(screen.width);
    if(frame.offsetWidth !== screenWidth){
        screen.remove();
        screen = createGraphics(frame.offsetWidth, frame.offsetHeight);
        screen.background(255);
        resizeCanvas(frame.offsetWidth, frame.offsetHeight);
    }

    screenWidth = frame.offsetWidth;
}

function mouseReleased(){
    if(mouseInScreen){
        allScreens.push(screen.get());
    }
}

function mouseWheel(event){
    print(allScreens);

    if (allScreens.length > 0 && allScreens.length !== 1) {
        // screen.remove();
        // screen = allScreens[0]; // Remove and get the first screen
        // image(screen, 0, 0); // Display the first screen

        screen = createGraphics(frame.offsetWidth, frame.offsetHeight);
        screen.background(255);
        screen.image(allScreens[allScreens.length - 2], 0, 0)
        allScreens.pop();
        // screen.loadPixels();

    } else {
        screen = createGraphics(frame.offsetWidth, frame.offsetHeight);
        screen.background(255);
        allScreens.pop();
    }

}

