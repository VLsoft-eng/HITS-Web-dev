import {attributes, classMatrix} from './settings.js'
export let root;
export class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(childNode) {
        this.children.push(childNode);
    }
}

