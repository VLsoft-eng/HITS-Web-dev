import {kMeansClustering} from "./KMeans/KMeans.js";
import {hierarchicalClustering} from "./hierarchical/hierarchical.js";
import {clear, drawDefault} from "./draw_utils.js";
import {algorithmSelector, btn, clustersSlider, fetchClustersCount, groupCount} from "./script.js";

export function changeModeHandler() {
    const selected = algorithmSelector.value;

    btn.removeEventListener('click', kMeansClustering);
    btn.removeEventListener('click', hierarchicalClustering);

    switch (selected) {
        case 'kmeans' :
            drawDefault();
            btn.addEventListener('click', kMeansClustering);
            return;
        case 'hierarchical' :
            drawDefault()
            btn.addEventListener('click', hierarchicalClustering);
            return;
    }
}

export function changeClustersHandler() {
    fetchClustersCount.textContent = clustersSlider.value;
    groupCount = clustersSlider.value;
}


