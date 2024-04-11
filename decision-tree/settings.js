import {buildTree} from './tree_creation.js'

export let attributes;
export let classMatrix;

function reset(){
    classMatrix = [];
    attributes = [];
}

const input = document.getElementById('upload-tree');
input.addEventListener('change', function() {
    reset();
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const lines = content.split('\n');
        lines[0].split(',').forEach(attribute => attributes.push(attribute.trim()));
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
    buildTree();
});