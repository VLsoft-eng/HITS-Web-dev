import {Dot} from "./dot_class.js";
import {Group} from "./group_class.js";
import {getRandomColor} from "./color_util.js";
import {groupCount, canvas} from "./script.js";
import {dots} from "./script.js";
import {clusters} from "./script.js";
import {circles} from "./script.js";

export function dotsInit() {
    circles.forEach((c) => {
        let dot = new Dot(c.x, c.y);
        dots.push(dot);
    })
}

export function groupsInit () {
    for (let i = 0; i < groupCount; i++) {
        let g = new Group(i, getRandomColor(), Math.random() * canvas.width, Math.random() * canvas.height);
        clusters.push(g);
    }
    dots.forEach((d) => {
        clusters[0].dots.push(d);
    })
}