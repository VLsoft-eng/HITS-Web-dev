import { points } from "./canvas.js";

// Генерация случайного порядка городов
function generateRandomRoute(cityCount) {
    let route = [];
    for (let i = 0; i < cityCount; i++) {
        route.push(i);
    }
    return shuffle(route);
}

// Смешивание порядка элементов в массиве случайным образом
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Функция оценки приспособленности (длина маршрута)
function fitness(route, distances) {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
        totalDistance += distances[route[i]][route[i + 1]];
    }
    return totalDistance;
}

// Найти минимальное расстояние и соответствующий путь в массиве путей
function findShortestPath(population, distances) {
    let shortestDistance = Infinity;
    let shortestPath = [];

    population.forEach(route => {
        let currentDistance = fitness(route, distances);
        if (currentDistance < shortestDistance) {
            shortestDistance = currentDistance;
            shortestPath = route.slice(); // Копируем массив для сохранения кратчайшего пути
        }
    });

    return { path: shortestPath, distance: shortestDistance };
}

// Создание начальной популяции и выполнение генетического алгоритма
function geneticAlgorithm(cityCount, distances, populationSize, generations) {
    let population = [];
    for (let i = 0; i < populationSize; i++) {
        population.push(generateRandomRoute(cityCount));
    }

    for (let generation = 0; generation < generations; generation++) {
        population = evolvePopulation(population, distances);
    }

    return population;
}

// Оператор кроссовера для генетического алгоритма
function crossover(parent1, parent2) {
    let start = Math.floor(Math.random() * parent1.length);
    let end = Math.floor(Math.random() * (parent1.length - start)) + start;

    let child = parent1.slice(start, end);
    for (let i = 0; i < parent2.length; i++) {
        let city = parent2[i];
        if (!child.includes(city)) {
            child.push(city);
        }
    }

    return child;
}

// Функция мутации случайным образом меняет два города местами
function mutate(route) {
    let index1 = Math.floor(Math.random() * route.length);
    let index2 = Math.floor(Math.random() * route.length);
    [route[index1], route[index2]] = [route[index2], route[index1]];
    return route;
}

// Функция эволюции популяции
function evolvePopulation(population) {
    let newPopulation = [];
    newPopulation.push(population[0]); // Лучшее решение переносится в следующее поколение

    while (newPopulation.length < population.length) {
        let parent1 = population[Math.floor(Math.random() * population.length)];
        let parent2 = population[Math.floor(Math.random() * population.length)];
        let child = crossover(parent1, parent2);
        if (Math.random() < 0.1) {
            child = mutate(child);
        }
        newPopulation.push(child);
    }

    return newPopulation;
}

export function searching() {
    const populationSize = 2000;
    const generations = 2000;
    let distances = createMatrix();
    let cityCount = points.length;

    const result = geneticAlgorithm(cityCount, distances, populationSize, generations);
    const shortestResult = findShortestPath(result, distances);

    console.log('Кратчайший путь:', shortestResult.path);
    console.log('Вес кратчайшего пути:', shortestResult.distance);

    return shortestResult.path;
}

function calculateDistance(pointFirst, pointSecond){
    return Math.sqrt((pointFirst.x - pointSecond.x)**2 + (pointFirst.y - pointSecond.y)**2);
}

function createMatrix(){
    let matrix = [];
    let len = points.length;
    for (let i = 0; i < len; i++){
        matrix[i] = [];
        for (let j = 0; j < len; j++){
            matrix[i][j] = calculateDistance(points[i], points[j]);
        }
    }
    return matrix;
}



