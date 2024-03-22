import {clusters, dots, groupCount} from "../script.js";
import {dotGroupsInit} from "./hierarchical_preprocess.js";

function getDotsDistance(firstDot, secondDot) {
    return Math.sqrt(Math.pow(firstDot.x - secondDot.x, 2) + Math.pow(firstDot.y - secondDot.y, 2));
}

function getClustersDistance(firstCluster, secondCluster) {
    let minDist = Infinity;
    for (let i = 0; i < firstCluster.dots.length; i++) {
        for (let j = i + 1; j < secondCluster.dots.length; j++) {
            let currDist = getDotsDistance(firstCluster.dots[i], secondCluster.dots[j]);
            minDist = currDist < minDist ? currDist : minDist;
        }
    }
    return minDist;
}
function clustersMerge(clustersPair) {
    let firstClDots = clusters[clustersPair.i].dots.slice(0,clusters[clustersPair.i].dots.length);
    let secondClDots = clusters[clustersPair.j].dots.slice(0,clusters[clustersPair.j].dots.length);

    clusters.splice(clustersPair.i, 1);
    clusters.splice(clustersPair.j, 1);

    return firstClDots.concat(secondClDots);
}

export function hierarchicalClustering() {
    if (dots.length === 0) {
        alert("Нанесите частицы!");
        return;
    }

    dotGroupsInit(groupCount);

    if (dots.length < clusters.length) {
        alert("Частиц меньше, чем кластеров!");
        return;
    }

    while (clusters.length > groupCount) {
        let minDist = Infinity;
        let nearestClusterPair = {i: 0, j: 0};
        for (let i = 0; i < clusters.length; i++) {
            for (let j = i + 1; j < clusters.length; j++) {
                let currDist = getClustersDistance(clusters[i], clusters[j]);
                if (currDist < minDist) {
                    nearestClusterPair = {i: i, j: j};
                    minDist = currDist;
                }
            }
        }
        clustersMerge(nearestClusterPair);
    }
}