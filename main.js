img="";
status="";
object=[];
function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture();
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects"
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function preload() {
    img=loadImage('student.jpg');
}
function draw() {
    image(video,0,0,640,420);
    if (status!="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("no").innerHTML="No. of Objects= "+object.length;
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function gotResults(error,results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}