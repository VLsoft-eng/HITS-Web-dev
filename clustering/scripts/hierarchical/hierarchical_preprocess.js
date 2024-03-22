import {clusters, dots} from "../script.js";
import {Group} from "./hierarchical_group_class.js";
import {getRandomColor} from "../color_util.js";

export function dotGroupsInit() {
    clusters.length = 0;
    dots.forEach((dot, index) => {
        let g = new Group(getRandomColor());
        g.dots.push(dot);
        clusters.push(g);
    })
}