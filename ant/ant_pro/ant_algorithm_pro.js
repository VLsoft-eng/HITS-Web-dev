import{slider,drawMap,antCount,colonyPos,ctx} from "./field.js";

class Ant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.direction = Math.random() * 2 * Math.PI;
        this.speed = Math.random() * 2 + 1;
        this.foundFood = false;
        this.following = false;
        this.pheromonePath = [];
        this.time = 0;
    }

    moveAnt() {
        this.direction += (Math.random() - 0.5) * 0.5;
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
        return [this.x, this.y];
    }

    followAnt() {
        const searchRadius = 10;
        const followAngle = Math.PI / 4;

        let maxPheromoneDensity = -Infinity;
        let minPheromoneDensity = +Infinity;
        let maxPheromoneX = this.x;
        let maxPheromoneY = this.y;
        let minPheromoneX = this.x;
        let minPheromoneY = this.y;

        for (let dx = -searchRadius; dx <= searchRadius; dx++) {
            for (let dy = -searchRadius; dy <= searchRadius; dy++) {
                const newX = Math.floor(this.x) + dx;
                const newY = Math.floor(this.y) + dy;

                if (newX >= 0 && newX < 750 && newY >= 0 && newY < 500) {
                    const pheromoneDensity = pheromones[newX][newY];
                    if (pheromoneDensity > maxPheromoneDensity) {
                        maxPheromoneDensity = pheromoneDensity;
                        maxPheromoneX = newX;
                        maxPheromoneY = newY;
                    }
                    if (pheromoneDensity < minPheromoneDensity){
                        minPheromoneDensity = pheromoneDensity;
                        minPheromoneX = newX;
                        minPheromoneY = newY;
                    }
                }
            }
        }

        const angleToMaxPheromone = Math.atan2(maxPheromoneY - this.y, maxPheromoneX - this.x);
        const angleToMinPheromone= Math.atan2(minPheromoneY - this.y, minPheromoneX - this.x);
        if (!this.foundFood) {
            if (angleToMaxPheromone - this.direction > followAngle) {
                this.direction += followAngle;
            } else if (angleToMaxPheromone - this.direction < -followAngle) {
                this.direction -= followAngle;
            } else {
                this.direction = angleToMaxPheromone;
            }
        }
        else {
            if (angleToMinPheromone - this.direction > followAngle) {
                this.direction += followAngle;
            } else if (angleToMinPheromone - this.direction < -followAngle) {
                this.direction -= followAngle;
            } else {
                this.direction = angleToMinPheromone;
            }
        }

        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
    }

    updateAnt(){
        if (this.time <299){this.time +=1;}
        let prevMove=[this.x,this.y];

        if (Math.abs(this.x - colonyPos.x) < 20 && Math.abs(this.y - colonyPos.y) < 20 && this.foundFood === true){
            this.direction += Math.PI;
            this.foundFood = false;
            this.following = false;
            this.time = 0;
        }
        if (!this.following && !this.foundFood){
            if ( pheromones[Math.floor(this.x)][Math.floor(this.y)] > 0){
                this.following = true;
            }
        }

        if (!this.following){ this.moveAnt();}
        else{this.followAnt();}

        // выход за границы или стенка
        if (this.x < 0 || this.x > 750 || this.y < 0 || this.y > 500 || map[Math.floor(this.x)][Math.floor(this.y)] === -1){
            this.x = prevMove[0];
            this.y = prevMove[1];
            this.direction += Math.PI;
        }
        // еда
        if (map[Math.floor(this.x)][Math.floor(this.y)] === -2 && this.foundFood === false){
            this.foundFood = true;
            this.following = false;
            this.direction += Math.PI;
            this.time = 0;
        }

        // оставление феромонов
        if (this.foundFood === false){
            pheromones[Math.floor(this.x)][Math.floor(this.y)] = -400;
        } else {pheromones[Math.floor(this.x)][Math.floor(this.y)] = 300; }
        this.pheromonePath.push({x:Math.floor(this.x),y:Math.floor(this.y)});
        if (this.pheromonePath.length > 300){
            this.pheromonePath.shift();
        }
    }
}

function reset(){
    ants = [];
    for (let i = 0;i<750;i++){
        pheromones[i]=[];
    }
}

function mapInit(){
    for (let i = 0;i<750;i++){
        map[i]=[];
        pheromones[i]=[];
        for (let j = 0; j < 500; j++) {
            pheromones[i][j] = 0;
        }
    }
}

function antAlgorithm(){
    reset();
    if (colonyPos.x === null) {alert('Поставьте колонию'); return;}
    // создание муравьев
    for (let i = 0;i<antCount.value;i++){
        ants.push(new Ant(colonyPos.x,colonyPos.y));
    }
    function visualize(){
        for (let i = 0;i<ants.length;i++){
            ants[i].updateAnt();
        }
        drawMap(ants);
        if (ants.length > 0) {
            requestAnimationFrame(visualize);
        }
    }
    if (ants.length > 0){
        visualize();
    }
}
let map = [];
let pheromones = [];
let ants = [];

export {map,pheromones,reset,ants};
document.addEventListener('DOMContentLoaded', () => {
    mapInit();
    document.getElementById('start').addEventListener('click', antAlgorithm);
});