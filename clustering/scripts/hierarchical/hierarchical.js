import {clusters, dots, groupCount} from "../script.js";
import {dotGroupsInit} from "./hierarchical_preprocess.js";
import {drawHierarchicalClusters} from "../draw_utils.js";
import {Group} from "./hierarchical_group_class.js";
import {getRandomColor} from "../color_util.js";

function getDotsDistance(firstDot, secondDot) {
    return Math.sqrt(Math.pow(firstDot.x - secondDot.x, 2) + Math.pow(firstDot.y - secondDot.y, 2));
}
function clustersMerge(indexClustersPair) {
    let newCluster = new Group(getRandomColor());
    newCluster.dots.push(...clusters[indexClustersPair.i].dots, ...clusters[indexClustersPair.j].dots);

    clusters.splice(indexClustersPair.i, 1);
    clusters.splice(indexClustersPair.j - 1, 1);

    return newCluster;
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
        let nearestClustersPair = {i: 0, j: 0};
        let i = 0;
        while (i < clusters.length) {
            let j = i + 1;
            while (j < clusters.length) {
                let currDist = getClustersDistance(i , j);
                if (currDist < minDist) {
                    nearestClustersPair = {i: i, j: j};
                    minDist = currDist;
                }
                j++;
            }
            i++;
        }
        clusters.push(clustersMerge(nearestClustersPair));
    }

    drawHierarchicalClusters();
}

function getClustersDistance(firstIndex, secondIndex) {
    let minDist = Infinity;
    clusters[firstIndex].dots.forEach(function (firstDot) {
        clusters[secondIndex].dots.forEach(function (secondDot) {
            if (getDotsDistance(firstDot, secondDot) < minDist) {
                minDist = getDotsDistance(firstDot, secondDot);
            }
        })
    })

    return minDist;
}