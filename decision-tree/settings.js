import {createStructure, createTreeHtml, drawLines, root, ctx} from './tree_creation.js'
import {treeBypassing} from './tree_bypassing.js'
import {treeOptimization} from "./tree_optimization.js";

export let attributes;
export let copyAttributes;
export let classMatrix;
export let path;
export let treeHTML = document.getElementById('tree');

// Удаление дерева
function deleteTree(node){
    while (node.children.length > 0){
        deleteTree(node.children[node.children.length - 1]);
        node.children.pop();
    }
    node = null;
}

// Обновление всего
function reset(){
    treeHTML.innerHTML = '';
    classMatrix = [];
    attributes = [];
    copyAttributes = [];
    path = [];
    entryField.value = '';
    ctx.reset();
    if (root){
        deleteTree(root);
    }
}

// Загрузка csv-файла
const inputFileButton = document.getElementById('upload-tree');
inputFileButton.addEventListener('change', function() {
    reset();
    let file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const lines = content.split('\n');
        lines[0].split(',').forEach(attribute => attributes.push(attribute.trim()));
        attributes.forEach(attribute => copyAttributes.push(attribute));
        for (let i = 1; i < lines.length - 1; i++){
            let row = [];
            lines[i].split(',').forEach(elem => row.push(elem.trim()));
            classMatrix.push(row);
        }
    };
    reader.readAsText(file);
});

// Построение дерева
const buildTreeButton = document.getElementById('build-tree');
buildTreeButton.addEventListener('click',function (){
    if (!attributes.length){
        alert("Загрузите csv-файл");
        return;
    }
    if(root){
        deleteTree(root);
    }
    if (!root || root.children.length === 0) {
        createStructure();
    }
    treeHTML.innerHTML = createTreeHtml(root);
    ctx.reset();
    drawLines(root);
});

// Удаление всего
const deleteTreeButton = document.getElementById('delete-tree');
deleteTreeButton.addEventListener('click',function (){
    reset();
});

// Обход по маршруту
const startBypassingButton = document.getElementById('start-bypassing');
startBypassingButton.addEventListener('click', function (){
    if (!root || root.children.length === 0){
        alert("Сначала постройте дерево");
        return;
    }
    if (!inputPath){
        alert("Сначала введите принятые решения");
        return;
    }
    path = [];
    inputPath.split(',').forEach(decision => path.push(decision.trim()));
    if (path.length !== attributes.length - 1){
        alert("Введите нужное количество решений");
        return;
    }
    ctx.reset();
    treeHTML.innerHTML = createTreeHtml(root);
    drawLines(root);
    if (!treeBypassing(root)){
        //alert("Введите верно классы");
        treeHTML.innerHTML = createTreeHtml(root);
    }
});

// Поле ввода решений
let inputPath;
const entryField = document.getElementById('path');
entryField.addEventListener('input', function() {
    inputPath = this.value;
});

// Отпимизация дерева (удаление лишних веток и листьев)
const treeOptimizationButton = document.getElementById('tree-optimization');
treeOptimizationButton.addEventListener('click', function () {
    if (!root || !attributes) {
        alert("Сначала постройте дерево");
        return;
    }
    treeOptimization(root);
    treeHTML.innerHTML = createTreeHtml(root);
    ctx.reset();
    drawLines(root);
});

// Слайдер скорости
const sliderSpeed = document.getElementById('slider-speed');
const speedValue = document.getElementById('speed-value');
export let timeout = 500;
sliderSpeed.addEventListener('input', function (){
    speedValue.innerHTML = sliderSpeed.value;
    timeout = 1000 - sliderSpeed.value * 10;
    if(timeout === 2000){
        timeout = 100000000;
    }
});
