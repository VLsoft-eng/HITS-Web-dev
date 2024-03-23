import {drawKMeansClusters} from "../draw_utils.js";
import {groupsInit} from "./KMeans_preprocess.js";
import {canvas, circles, clusters, dots, groupCount} from "../script.js";

export function moveCenter() {
    let finished = false;
    clusters.forEach((group) => {
        finished = true;

        if (group.dots.length === 0) {
            group.center = {x: Math.random() * canvas.width, y: Math.random() * canvas.height}
            return;
        }

        let x = 0;
        let y = 0;
        group.dots.forEach((dot) => {
            x += dot.x;
            y += dot.y;
        })

        group.center = {
            x: x / group.dots.length,
            y: y / group.dots.length
        }
    })
}


export function updateGroups() {
    clusters.forEach((g) => {g.dots = [];})
    dots.forEach((dot) => {
        let min = Infinity;
        let group;
        clusters.forEach((g) => {
            let d = Math.pow(g.center.x - dot.x, 2) + Math.pow(g.center.y - dot.y, 2);
            if (d < min) {
                min = d;
                group = g;
            }
        });
        group.dots.push(dot);
        dot.group = group;
    })
}

function isCentersChange(previousClusters) {
    for (let i = 0; i < clusters.length; i++) {
        let firstCenter = previousClusters[i].center;
        let secondCenter = clusters[i].center;

        if (Math.sqrt(Math.pow(firstCenter.x - secondCenter.x, 2) + Math.pow(firstCenter.y - secondCenter.y, 2)) > 0) {
            return true;
        }
    }
    return false;
}

export function kMeansClustering() {
    if (dots.length === 0) {
        alert("Нанесите частицы!");
        return;
    }

    groupsInit(groupCount);

    if (dots.length < clusters.length) {
        alert("Частиц меньше, чем кластеров!");
        return;
    }
    let previousClusters = clusters.map(cluster => ({ ...cluster }));

    for (;;) {
        updateGroups();
        moveCenter();
        if (!isCentersChange(previousClusters)) break;
        previousClusters = clusters.map(cluster => ({ ...cluster }));
    }
    drawKMeansClusters();
}
