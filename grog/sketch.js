
let screen;
let paintShader;

function preload(){
    // paintShader = loadShader('./paint/vertShader.vert', './paint/fragShader.frag');
    paintShader = loadShader('./grog/main.vert', './grog/main.frag');
}

function setup(){
    let canvas;
    if(windowWidth <= 610){
        canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    } else {
        canvas = createCanvas(600, 400, WEBGL);
    }
    screen = createGraphics(width, height);
    screen.background(255);
    
    canvas.canvas.oncontextmenu = () => false;

    shader(paintShader);
}

function draw(){
    if(mouseIsPressed){
        // screen.strokeWeight(8);
        // screen.stroke(0);
        // screen.line(mouseX, mouseY, pmouseX, pmouseY);
        let x = 2.5;
        let mouseSpeed = (abs(mouseX - pmouseX) + abs(mouseY - pmouseY)) + 5;

        screen.stroke('black');
        let weight = map(mouseSpeed, 0, 50, 12, 8);
        screen.strokeWeight(8); 
        screen.line(mouseX, mouseY, pmouseX, pmouseY);

        
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
    // console.log(windowWidth);
    screen.remove();

    if(windowWidth <= 610){
        screen = createGraphics(windowWidth, windowHeight);
        screen.background(255);
        resizeCanvas(windowWidth, windowHeight);
    } else {
        screen = createGraphics(600, 400);
        screen.background(255);
        resizeCanvas(600, 400);
    }
}