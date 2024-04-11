import {attributes} from './settings.js'
import {TreeNode} from './tree_data.js'
import {sortAttributes, uniqueClasses} from './calculate_gain_ratio.js';

function getIndexAttribute(nameAttribute){
    for (let i = 0; i < attributes.length; i++){
        if (attributes[i] === nameAttribute){
            return i;
        }
    }
}

export function buildTree() {
    sortAttributes();

    let indexAttribute = getIndexAttribute(attributes[0]);
    let root = new TreeNode(attributes[indexAttribute], "");

    let queue = [];
    queue.push(root);
    let count = 1;
    while (queue.length > 0){
        let node = queue.shift();
        indexAttribute = getIndexAttribute(node.attribute);
        let amountUniqueClasses = uniqueClasses[indexAttribute].length;

        for (let i = 0; i < amountUniqueClasses; i++) {
            let child = new TreeNode(attributes[count], uniqueClasses[indexAttribute][i]);
            node.addChild(child)
            if (count < attributes.length) {
                queue.push(child);
            }
            count++;

        }
    }

    console.log(root);
}