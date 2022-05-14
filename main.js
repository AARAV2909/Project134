
song = "";
Objects = [];
status = "";

function preload()
{
	song = loadSound("alert.mp3");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  video.size(300,300);
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!");
  status = true;
}

function gotResult(error, results) {
  if(error) {
    console.log(error);
  }
  console.log(results);
  Objects = results;
}


function draw() {
  image(video, 0, 0, 300, 300);
      if(status != "")
      {     
        objectDetector.detect(video, gotResult);
        for (i = 0; i < Objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
 
          fill("#800000");
          percent = floor(Objects[i].confidence * 100);
          text(Objects[i].label + " " + percent + "%", Objects[i].x + 15, Objects[i].y + 15);
          noFill();
          stroke("#800000");
          rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
         
          if(Objects[i].label == "person")
          {
            document.getElementById("Number_Of_Objects").innerHTML = "Baby Found :)";
            console.log("stop");
            song.stop();
          }
          else
          {
            document.getElementById("Number_Of_Objects").innerHTML = "Baby Not Found :(";
            console.log("play"); 
            song.play();
          }
         }

        if(Objects.length == 0)
        {
          document.getElementById("Number_Of_Objects").innerHTML = "Baby Not Found";
          console.log("play"); 
          song.play();
        }
      }
}