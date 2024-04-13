import{slider,drawMap,antCount,colonyPos} from "./field.js";

class Pheromone {
    constructor(){
        this.home = 0;
        this.food = 0;
        this.family = 0;
    }
}
class Ant {
    constructor(x, y, nation) {
        this.x = x;
        this.y = y;
        this.direction = Math.random() * 2 * Math.PI;
        this.speed = Math.random() * 2 + 1;
        this.foundFood = false;
        this.following = false;
        this.pheromonePath = [];
        this.hot = 1;
        this.timeWithout = 0;
        this.nation = nation;
        this.strength = 0;
    }

    moveAnt() {
        this.direction += (Math.random() - 0.5) * 0.5;
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
    }

    followAnt() {
        const searchRadius = 30;

        let maxPheromone = -Infinity;
        let maxPheromoneX = this.x;
        let maxPheromoneY = this.y;


        if (Math.random() < 0.05){
            this.moveAnt();
            return;
        }
        for (let dx = -searchRadius; dx <= searchRadius; dx++) {
            for (let dy = -searchRadius; dy <= searchRadius; dy++) {
                const newX = Math.floor(this.x) + dx;
                const newY = Math.floor(this.y) + dy;

                if (newX >= 0 && newX < 750 && newY >= 0 && newY < 500) {
                    if (this.foundFood) {
                        const currentPheromone = pheromones[newX][newY].home;
                        if (currentPheromone > maxPheromone && pheromones[newX][newY].family === this.nation) {
                            maxPheromone = currentPheromone;
                            maxPheromoneX = newX;
                            maxPheromoneY = newY;
                        }
                    } else {
                        const currentPheromone = pheromones[newX][newY].food;
                        if (currentPheromone > maxPheromone && pheromones[newX][newY].family === this.nation) {
                            maxPheromone = currentPheromone;
                            maxPheromoneX = newX;
                            maxPheromoneY = newY;
                        }
                    }
                }
            }
        }

        if (maxPheromone === -Infinity) {
            this.following = false;
            this.moveAnt();
        } else {
            const angleToMaxPheromone = Math.atan2(maxPheromoneY - this.y, maxPheromoneX - this.x);
            this.x += this.speed * Math.cos(angleToMaxPheromone);
            this.y += this.speed * Math.sin(angleToMaxPheromone);
        }
    }


    updateAnt(){
        let prevMove=[this.x,this.y];

        // мувы муравьишки
        if (this.following){
            this.followAnt();
        } else {this.moveAnt();}

        // выход за границы или стенка
        if (this.x < 0 || this.x > 750 || this.y < 0 || this.y > 500 || map[Math.floor(this.x)][Math.floor(this.y)] === -1){
            this.x = prevMove[0];
            this.y = prevMove[1];
            this.direction += Math.PI;
        }
        // еда
        if (map[Math.floor(this.x)][Math.floor(this.y)] === -2){
            if (this.foundFood === false){
                this.foundFood = true;
                this.following = true;
                this.direction += Math.PI;
            }
            this.hot = 1;
            this.timeWithout = 0;
        }
        // дом
        if (this.nation === 0 && Math.abs(this.x - colonyPos[0].x) < 10 && Math.abs(this.y - colonyPos[0].y) < 10 ||
            this.nation === 1 && Math.abs(this.x - colonyPos[1].x) < 10 && Math.abs(this.y - colonyPos[1].y) < 10){
            if (this.foundFood === true){
                this.direction += Math.PI;
                this.foundFood = false;
                this.following = false;
                this.strength++;
            }
            this.hot = 1;
            this.timeWithout = 0;
        }

        // оставление феромонов
        if (this.foundFood === false){
            pheromones[Math.floor(this.x)][Math.floor(this.y)].home += 400*this.hot;
        } else {pheromones[Math.floor(this.x)][Math.floor(this.y)].food += 400*this.hot; }
        pheromones[Math.floor(this.x)][Math.floor(this.y)].family = this.nation;
        this.pheromonePath.push({x:Math.floor(this.x),y:Math.floor(this.y)});
        this.hot*=0.95;
        this.timeWithout ++;
        if (this.hot <0.0000001){this.following = false;}
    }
}

function reset(){
    ants = [];
    for (let i = 0;i<750;i++){
        pheromones[i]=[];
        for (let j = 0; j < 500; j++) {
            pheromones[i][j] = new Pheromone();
        }
    }
}

function mapInit(){
    for (let i = 0;i<750;i++){
        map[i]=[];
        pheromones[i]=[];
        for (let j = 0; j < 500; j++) {
            pheromones[i][j] = new Pheromone();
        }
    }
}

function antAlgorithm(){
    reset();
    if (colonyPos.length === 0) {alert('Поставьте колонию'); return;}
    // создание муравьев
    for (let i = 0;i <colonyPos.length;i++) {
        for (let j = 0; j < antCount.value; j++) {
            ants.push(new Ant(colonyPos[i].x, colonyPos[i].y,i));
        }
    }
    function visualize(){
        if (ants.length === 0){
            alert('ВСЕ МУРАВЬИ ПОГИБЛИ :DDD');
            return;
        }
        for (let i = 0;i<ants.length;i++){
            ants[i].updateAnt();
            if (ants[i].timeWithout > 2000){
                ants.splice(i,1);
            }
        }
        drawMap(ants);
        setTimeout(visualize,100-slider.value);
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