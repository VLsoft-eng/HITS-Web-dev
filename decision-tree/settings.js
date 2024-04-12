import {buildTree, root} from './tree_creation.js'
import {treeBypassing} from './tree_bypassing.js'

export let attributes;
export let copyAttributes;
export let classMatrix;
export let path;

function deleteTree(node){
    for (let i = 0; i < node.children.length; i++){
        deleteTree(node.children[i]);
    }
    node = null;
}

function reset(){
    classMatrix = [];
    attributes = [];
    copyAttributes = [];
    path = [];
    if (root){
        deleteTree(root);
    }
}

const inputFileButton = document.getElementById('upload-tree');
inputFileButton.addEventListener('change', function() {
    reset();
    const file = this.files[this.files.length - 1];
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

const buildTreeButton = document.getElementById('build-tree');
buildTreeButton.addEventListener('click',function (){
    if (root){
        deleteTree(root);
    }
    buildTree();
});

let inputPath;
document.getElementById('path').addEventListener('input', function() {
    inputPath = this.value;
});

const startButton = document.getElementById('start');
startButton.addEventListener('click', function (){
    path = [];
    console.log(path);
    if (!root){
        alert("Постройте дерево");
        return;
    }
    if (!inputPath){
        alert("Введите принятые решения");
        return;
    }
    inputPath.split(',').forEach(decision => path.push(decision.trim()));
    if (path.length !== attributes.length - 1){
        alert("Введите нужное количество решений");
        return;
    }
    treeBypassing(root);
});