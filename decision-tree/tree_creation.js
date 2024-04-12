import {attributes, classMatrix} from './settings.js'
import {TreeNode} from './tree_data.js'
import {sortAttributes, uniqueClasses} from './calculate_gain_ratio.js';

export let root;

export function getAttributeIndex(nameAttribute){
    for (let i = 0; i < attributes.length; i++){
        if (attributes[i] === nameAttribute){
            return i;
        }
    }
}

function getProbableClass(node, child, attributeIndex){
    let probableClass = uniqueClasses[attributeIndex][0];
    let index = 0;
    for (let i = 0; i < uniqueClasses[attributeIndex].length; i++){
        if (probableClass.amount < uniqueClasses[attributeIndex][i].amount
               && child.class === classMatrix[getAttributeIndex(node.attribute)][i]){
            probableClass = uniqueClasses[attributeIndex][i];
            index = i;
        }
    }
    return index;
}

function removeBranches(attribute, classValue, branches){
    let attributeIndex = getAttributeIndex(attribute);
    let newBranch = [];
    for (let i = 0; i < branches.length; i++){
        let branchIndex = branches[i];
        if (classValue === classMatrix[branchIndex][attributeIndex]){
            newBranch.push(branches[i]);
        }
    }
    return newBranch;
}

function createLeaves(attribute, node, branches) {
    if (node.children.length === 0){
        node.addChild(new TreeNode("", classMatrix[branches[0]][attributes.length - 1]));
        node.attribute = attributes[attributes.length - 1];
        return;
    }
    for (let i = 0; i < node.children.length; i++){
        let child = node.children[i];
        let newBranches = removeBranches(node.attribute, child.class, branches);
        if (newBranches.length === 0){
            newBranches.push(getProbableClass(node, child, getAttributeIndex(node.attribute)));
        }
        createLeaves(node.attribute, child, newBranches);
    }
}

function createStructure(){
    let indexAttribute = getAttributeIndex(attributes[0]);
    root = new TreeNode(attributes[indexAttribute], "");

    let queue = [];
    queue.push(root);
    let count = 1;
    while (queue.length > 0){
        let node = queue.shift();
        indexAttribute = getAttributeIndex(node.attribute);
        let amountUniqueClasses = uniqueClasses[indexAttribute].length;

        for (let i = 0; i < amountUniqueClasses; i++) {
            let child = new TreeNode(attributes[count], uniqueClasses[indexAttribute][i].class);
            node.addChild(child)
            count++;
            if (count < attributes.length) {
                queue.push(child);
            }
        }
    }

    let branches = []
    for (let i = 0; i < classMatrix.length; i++){
        branches.push(i);
    }

    createLeaves(root.attribute, root, branches)
}

export function buildTree() {
    sortAttributes();
    createStructure();

    console.log(root);
}
