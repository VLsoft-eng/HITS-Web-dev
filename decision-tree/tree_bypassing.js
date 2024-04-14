import {path, attributes, copyAttributes} from './settings.js'
import {timeout} from "./settings.js";

// Получение класса в начальном расположении атрибутов
function getClass(attribute){
    for (let i = 0; i < attributes.length - 1; i++){
        if (attribute === copyAttributes[i]){
            return path[i];
        }
    }
}

// Обход дерева по заданному маршруту
export function treeBypassing(node) {
    setTimeout(()=> {
        document.getElementById(node.attribute).style.background = "green";
        document.getElementById(node.attribute).style.boxShadow = "0 0 5px green";
        if (node.children.length === 1) {
            setTimeout(()=> {
                document.getElementById("leaf" + node.attribute).style.background = "green";
                document.getElementById("leaf" + node.attribute).style.boxShadow = "0 0 5px green";
            },timeout);
            return true;
        }
        let attribute = node.attribute;
        for (let i = 0; i < node.children.length; i++) {
            let child = node.children[i];
            if (child.class === getClass(attribute)) {
                return treeBypassing(child);
            }
        }
    },timeout);
    return true;
}