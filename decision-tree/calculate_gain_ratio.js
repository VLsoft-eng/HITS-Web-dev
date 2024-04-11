import {attributes, classMatrix} from "./settings.js";

export let uniqueClasses = [];
let gainRatio = [];

function calculateSum(columnIndex, attributeValue){
    let outcomes = [];
    let count = 0;

    for (let i = 0; i < classMatrix.length; i++) {
        if  (attributeValue === classMatrix[i][columnIndex]) {
            let outcomeExists = outcomes.find(item => item.end === classMatrix[i][attributes.length - 1]);
            if (!outcomeExists) {
                outcomes.push({end: classMatrix[i][attributes.length - 1], amount: 0});
            }
        }
    }

    for (let i = 0; i < outcomes.length; i++) {
        let outcome = outcomes[i].end;
        for (let j = 0; j < classMatrix.length; j++) {
            if (outcome === classMatrix[j][attributes.length - 1] && attributeValue === classMatrix[j][columnIndex]) {
                outcomes[i].amount++;
                count++;
            }
        }
    }

    let entropySum = 0;
    for (let i = 0; i < outcomes.length; i++) {
        let P = (outcomes[i].amount / count)
        entropySum -= P * Math.log2(P);
    }
    return entropySum;
}

function calculateEntropy(columnIndex) {
    let entropy = 0;

    for (let i = 0; i < uniqueClasses[columnIndex].length; i++) {
        let probability = (uniqueClasses[columnIndex][i].amount / classMatrix.length)
        entropy += (probability * calculateSum(columnIndex, uniqueClasses[columnIndex][i].class));
    }
    return entropy;
}

function calculateSplitInfo(columnIndex) {
    let splitInfo = 0;

    for (let i = 0; i < uniqueClasses[columnIndex].length; i++) {
        let probability = (uniqueClasses[columnIndex][i].amount / classMatrix.length)
        splitInfo -= probability * Math.log2(probability);
    }
    return splitInfo;
}

function findUniqueClasses(){
    for (let i = 0; i < attributes.length; i++){
        let uniqueClassesInColumn = [];

        for (let j = 0; j < classMatrix.length; j++){
            let classExists = uniqueClassesInColumn.find(item => item.class === classMatrix[j][i]);
            if (!classExists){
                uniqueClassesInColumn.push({class: classMatrix[j][i], amount: 0});
            }
        }

        for (let j = 0; j < uniqueClassesInColumn.length; j++){
            for (let k = 0; k < classMatrix.length; k++){
                if (uniqueClassesInColumn[j].class === classMatrix[k][i]){
                    uniqueClassesInColumn[j].amount++;
                }
            }
        }
        uniqueClasses.push(uniqueClassesInColumn);
    }
}

function sortGainRatio(){
    for (let i = 0; i < attributes.length - 1; i++){
        for (let j = 0; j < attributes.length - 1; j++){
            if (gainRatio[i] > gainRatio[j]){
                [gainRatio[i], gainRatio[j]] = [gainRatio[j],gainRatio[i]];
                [uniqueClasses[i], uniqueClasses[j]] = [uniqueClasses[j],uniqueClasses[i]];
                [attributes[i], attributes[j]] = [attributes[j], attributes[i]];
                for (let k = 0; k < classMatrix.length; k++){
                    [classMatrix[k][i], classMatrix[k][j]] = [classMatrix[k][j], classMatrix[k][i]];
                }
            }
        }
    }
}

export function sortAttributes() {
    findUniqueClasses();
    let entropy = [];
    let splitInfo = [];

    for (let i = 0; i < attributes.length; i++) {
        entropy.push(calculateEntropy(i));
        splitInfo.push(calculateSplitInfo(i));
    }

    for (let i = 0; i < attributes.length - 1; i++){
        gainRatio.push(splitInfo[attributes.length - 1] - entropy[i]);
    }

    sortGainRatio();

    console.log("entropy", entropy);
    console.log("splitInfo", splitInfo);
    console.log("gainRatio", gainRatio);
    console.log("attributes", attributes);
    console.log("classMatrix", classMatrix);
    console.log("uniqueClasses", uniqueClasses);
}