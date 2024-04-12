import {path, attributes, copyAttributes} from './settings.js'

function getClassIndex(attribute){
    for (let i = 0; i < attributes.length - 1; i++){
        if (attribute === copyAttributes[i]){
            return path[i];
        }
    }
}
export function treeBypassing(node){
    if (node.children.length === 1){
        console.log(node.children[0].class);
    }
    let attribute = node.attribute;
    for (let i = 0; i < node.children.length; i++){
        let child = node.children[i];
        if (child.class === getClassIndex(attribute)){
            treeBypassing(child);
        }
    }
}