import {drawClusters} from "./draw_utils.js";
import {dotsInit, groupsInit} from "./clustering_preprocess.js";
import {canvas, circles, clusters, dots, groupCount, maxIterations} from "./script.js";

export function moveCenter() {
    let finished = false;
    clusters.forEach((group, i) => {
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
    for (let i = 0; i < clusters.length; i++) {
        let c = clusters[i];
        for (let j = 0; j < c.dots.length; j++) {

            let dot = c.dots[j];
            c.dots.splice(j, 1);
            j--;

            let min = Infinity;
            let group = clusters[0];
            let moved = false;

            for (let k = 0; k < clusters.length; k++) {
                let d = Math.pow(clusters[k].center.x - dot.x, 2) + Math.pow(clusters[k].center.y - dot.y, 2);
                if (min === undefined || d < min) {
                    min = d;
                    group = clusters[k];
                }
            }

            group.dots.push(dot);
            dot.group = group;
            moved = true;

            if (group.id !== c.id) {
                moved = true;
            }
            if (moved) {
                j++;
            }
        }
    }
}

function isCentersChange() {
    for (let i = 0; i < clusters.length; i++) {
        let previousClusters;
        let firstCenter = previousClusters[i].center;
        let secondCenter = clusters[i].center;

        if (Math.sqrt(Math.pow(firstCenter.x - secondCenter.x, 2) + Math.pow(firstCenter.y - secondCenter.y, 2)) > 1) {
            return true;
        }
    }
    return false;
}

export function kMeansClustering() {
    dotsInit(circles, dots);
    groupsInit(groupCount);


    for (let i = 0; i < maxIterations; i++) {
        moveCenter();
        updateGroups();
    }
    drawClusters();
}
