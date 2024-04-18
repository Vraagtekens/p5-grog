let screen;

let paintShader;

function preload(){
    paintShader = loadShader('./glitch/vertShader.vert', './glitch/fragShader.frag');
}

function setup(){
    createCanvas(600, 400, WEBGL);
    screen = createGraphics(width, height);

    screen.background(255);
    screen.stroke(0);
    screen.strokeWeight(5);

    shader(paintShader);
}

function draw(){
    if(mouseIsPressed){
        screen.line(mouseX, mouseY, pmouseX, pmouseY);
    }

    // image(screen, -width/2, -height/2, width, height);
    drawScreen();
}

function drawScreen(){
    paintShader.setUniform('texture', screen);
    paintShader.setUniform('noise', getNoiseValue());
    
    rect(-width/2, -height/2, width, height);
}

function getNoiseValue(){
    let v = noise(millis()/100);
    const cutOff = 0.5;

    if(v < cutOff){
        return 0;
    }

    v = pow((v-cutOff) * 1/(1-cutOff), 2);
    return v * 0.1;
}