function mutate(x) {
    if (random(1) < 0.1) {
      let offset = randomGaussian() * 0.5;
      let newx = x + offset;
      return newx;
    } else {
      return x;
    }
  }
class Bird{
    constructor(brain){
        this.y =height/2;
        this.x=64;
        this.r=12;
        this.gravity=0.7;
        this.lift=-12;
        this.velocity=0;
        this.score=0;
        this.fitness=0;
        if(brain){
            this.brain=brain.copy();
        }else{
            this.brain= new NeuralNetwork(5,8,2);
        }
    }

    show(){
        fill(255,50);
        stroke(255);
        ellipse(this.x,this.y,this.r*2,this.r*2)
    }

    up(){
        this.velocity +=this.lift;
    }

    mutate(){
        this.brain.mutate(mutate);
    }

    offScreen(){
        return(this.y>height || this.y<0)
    }

    think(pipes){
        let closest = null;
        let closestD = Infinity;
        for (let i=0;i<pipes.length;i++){
            let d=(pipes[i].x+pipes[i].w)-this.x
            if (d<closestD && d>0){
                closest=pipes[i]
                closestD =d;
            }
        }


        let inputs=[];
        inputs[0]=this.y/height;
        inputs[1]=closest.top/height;
        inputs[2]=closest.bottom/height;
        inputs[3]=closest.x/width;
        inputs[4]=this.velocity/10;
        let output=this.brain.predict(inputs);
        if(output[0]>output[1]){
            this.up();
        }
    }

    update() {
        this.score++;
        this.velocity += this.gravity;
        this.velocity *=0.9;
        this.y += this.velocity;
    }
}