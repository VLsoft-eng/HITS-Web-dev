import {attributes, classMatrix} from './settings.js'
import {root} from './tree_data.js'

let gainRatio = [];
let gain = [];
let splitInfo = [];
let ends = [];

function calculateSplitInfo(){
    let lenght = classMatrix.length;
    for (let columnIndex = 0; columnIndex < attributes.length; columnIndex++){
        let entropyInfo = 0;

        let uniqueClasses = [];
        for (let i = 0; i < lenght; i++) {
            let classExists = uniqueClasses.find(item => item.class === classMatrix[i][columnIndex]);
            if (!classExists) {
                uniqueClasses.push({ class: classMatrix[i][columnIndex], amount: 0});
            }
        }

        for (let i = 0; i < uniqueClasses.length; i++) {
            let unClass = uniqueClasses[i].class;
            for (let j = 0; j < lenght; j++) {
                if (unClass === classMatrix[j][columnIndex]) {
                    uniqueClasses[i].amount++;
                }
            }
        }

        for (let i = 0; i < uniqueClasses.length; i++) {
            let P = (uniqueClasses[i].amount / lenght)
            entropyInfo -= P * Math.log2(P);
        }
        splitInfo.push(entropyInfo);
    }
}

function calculateSum(columnIndex, Class){
    let lenght = classMatrix.length;
    let arr = [];
    let countEnds = 0;

    for (let i = 0; i < lenght; i++) {
        if  (Class === classMatrix[i][columnIndex]) {
            let endExists = arr.find(item => item.end === classMatrix[i][attributes.length - 1]);
            if (!endExists) {
                arr.push({end: classMatrix[i][attributes.length - 1], amount: 0});
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        let end = arr[i].end;
        for (let j = 0; j < lenght; j++) {
            if (end === classMatrix[j][attributes.length - 1] && Class === classMatrix[j][columnIndex]) {
                arr[i].amount++;
                countEnds++;
            }
        }
    }

    let entropySum = 0;
    for (let i = 0; i < arr.length; i++) {
        let P = (arr[i].amount / countEnds)
        entropySum -= P * Math.log2(P);
    }
    return entropySum;
}

function calculateEntropy(columnIndex) {
    let lenght = classMatrix.length;
    let entropyInfo = 0;

    let uniqueClasses = [];
    for (let i = 0; i < lenght; i++) {
        let classExists = uniqueClasses.find(item => item.class === classMatrix[i][columnIndex]);
        if (!classExists) {
            uniqueClasses.push({ class: classMatrix[i][columnIndex], amount: 0});
        }
    }

    for (let i = 0; i < uniqueClasses.length; i++) {
        let unClass = uniqueClasses[i].class;
        for (let j = 0; j < lenght; j++) {
            if (unClass === classMatrix[j][columnIndex]) {
                uniqueClasses[i].amount++;
            }
        }
    }

    for (let i = 0; i < uniqueClasses.length; i++) {
        let P = (uniqueClasses[i].amount / lenght)
        entropyInfo += (P * calculateSum(columnIndex, uniqueClasses[i].class));
    }
    return entropyInfo;
}

function findEnds(){
    let lenght = classMatrix.length;
    for (let i = 0; i < lenght; i++) {
        if (!ends.includes(classMatrix[i][attributes.length - 1])) {
            ends.push(classMatrix[i][attributes.length - 1]);
        }
    }
}

function calculateGain(entr){
    for (let i = 0; i < attributes.length - 1; i++){
        gain.push(splitInfo[attributes.length - 1] - entr[i]);
        console.log(splitInfo[attributes.length - 1], entr[i], splitInfo[attributes.length - 1] - entr[i]);
    }
}

function calculateGainRatio(){
    for (let i = 0; i < gain.length; i++){
        gainRatio.push(gain[i] / splitInfo[i]);
    }
}

export function buildTree(){
    findEnds();
    console.log(ends);
    let entr = [];
    for (let i = 0; i < attributes.length - 1; i++){
        entr.push(calculateEntropy(i));
    }
    calculateSplitInfo();
    console.log("entr",entr);
    console.log("splitInfo",splitInfo);
    calculateGain(entr);
    console.log("gain", gain);
    calculateGainRatio();

    console.log("gainRatio",gainRatio);
}