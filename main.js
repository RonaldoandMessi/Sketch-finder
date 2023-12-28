function preload(){
    classifier = ml5.imageClassifier('doodlenet');
}

function setup(){
    canvas = createCanvas(300,300);
    background("white");
    canvas.position(450,170);
    canvas.mouseReleased(classifyCanvas);
    speech = window.speechSynthesis;
}

function draw(){
    strokeColor = document.getElementById("inputbox").value;
    console.log(strokeColor);
    strokeWeight(10);
    stroke(strokeColor);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clearCanvas(){
    background("white");
    console.log("Canvas cleared!");
}

function classifyCanvas(){
    classifier.classify(canvas,gotDrawing);
}

function gotDrawing(error,result){
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        document.getElementById("label").innerHTML = "Label:" + result[0].label;
        document.getElementById("confidence").innerHTML = "Confidence:" + Math.round(result[0].confidence * 100) + "%";
        utterthis = new SpeechSynthesisUtterance(result[0].label);
        speech.speak(utterthis);
    }
}