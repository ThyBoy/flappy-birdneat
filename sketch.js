const TOTAL =500;
var birds =[];
var savedBirds=[];
var pipes =[];
var counter=0;
var slider;

function setup(){
    createCanvas(700,400);
    slider=createSlider(1,100,1);
    for (let i=0;i<TOTAL;i++){
        birds[i]=new Bird();
    }  
}

function draw(){
    for(let n=0;n<slider.value();n++){
        if (counter%60==0){
            pipes.push(new Pipe());
        }
        counter++;

        for(var i=pipes.length-1;i>=0;i--){
            pipes[i].update();
            for (let j=birds.length-1;j>=0;j--){
                if (pipes[i].hits(birds[j])){
                    savedBirds.push(birds.splice(j,1)[0]);
                }
            }
            if (pipes[i].offscreen()){
                pipes.splice(i,1);
            }
        }

        for (let i=birds.length-1;i>=0;i--){
            if (birds[i].offScreen()){
                savedBirds.push(birds.splice(i,1)[0]);
            }
        }

        for (let bird of birds){
            bird.think(pipes);
            bird.update();
        }

        if (birds.length===0){
            counter=0;
            nextGeneration();
            pipes=[];
        }
    }
    background(0);
    for (let bird of birds){
        bird.show();
    }
    for (let pipe of pipes){
        pipe.show();
    }

}

// function keyPressed(){
//     if (key == " "){
//         bird.up()
//     }
// }