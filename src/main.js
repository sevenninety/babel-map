import Map from "app/Map";

const map = new Map("esri-map");

map.on("load", () => {
    document.getElementById("extent-btn").onclick = evt => {
        evt.preventDefault();
        map.showExtent();
    };
});
