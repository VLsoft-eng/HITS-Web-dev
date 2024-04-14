import {path, attributes, copyAttributes, isBypassing, inverseIsBypassing} from './settings.js'
import {timeout} from "./settings.js";

// Получение класса в начальном расположении атрибутов
function getClass(attribute){
    for (let i = 0; i < attributes.length; i++){
        if (attribute === copyAttributes[i]){
            return path[i];
        }
    }
}

// Обход дерева по заданному маршруту
export function treeBypassing(node) {
    document.getElementById(node.attribute).style.background = "green";
    document.getElementById(node.attribute).style.boxShadow = "0 0 5px green";
    if (node.children.length === 1) {
        setTimeout(() => {
            if (!isBypassing) {
                return false;
            }
            document.getElementById("leaf" + node.attribute).style.background = "green";
            document.getElementById("leaf" + node.attribute).style.boxShadow = "0 0 5px green";
            inverseIsBypassing();
            return true;
        }, timeout);
    } else {
        setTimeout(() => {
            if (!isBypassing) {
                return false;
            }
            let attribute = node.attribute;
            for (let i = 0; i < node.children.length; i++) {
                let child = node.children[i];
                if (child.class === getClass(attribute)) {
                    return treeBypassing(child);
                }
            }
            alert("Введите класс атрибута " + node.attribute + " корректно");
            inverseIsBypassing();
            return false;
        }, timeout);
    }
}