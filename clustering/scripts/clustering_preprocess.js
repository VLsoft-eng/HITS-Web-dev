import {Group} from "./group_class.js";
import {getRandomColor} from "./color_util.js";
import {groupCount, canvas} from "./script.js";
import {clusters} from "./script.js";

export function groupsInit () {

    clusters.length = 0;

    for (let i = 0; i < groupCount; i++) {
        let g = new Group(i, getRandomColor());
        clusters.push(g);
    }
}