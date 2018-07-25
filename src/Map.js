import Evented from "dojo/Evented";

import MapView from "esri/views/MapView";
import WebMap from "esri/WebMap";
import Circle from "esri/geometry/Circle";
import Graphic from "esri/Graphic";
import * as config from "app/config";

module.exports = class Map extends Evented {
    constructor(container) {
        super();
        // Properties
        this.view = null;
        this.container = container;
        this.symbol = {
            type: "simple-fill",
            style: "solid",
            outline: {
                color: "blue",
                width: 1
            }
        };

        this.init();
    }

    init() {
        // Create webmap using config id
        const webmap = new WebMap({
            portalItem: {
                id: config.webmapId
            }
        });

        // Create the view
        this.view = new MapView({
            map: webmap,
            container: this.container
        });

        this.view.when(() => {
            // Add click handler
            this.view.on("click", evt => {
                this.drawCircle(evt);
            });

            // Publish load event
            this.emit("load", { view: this.view });
        });
    }

    /**
     * Draws a circle on the map
     * @param {object} evt - the click event
     */
    drawCircle(evt) {
        let circle,
            radius,
            view = this.view;

        // Clear existing graphics
        view.graphics.removeAll();

        radius = view.extent.width / 20;
        circle = new Circle({
            center: evt.mapPoint,
            radius: radius
        });

        view.graphics.add(new Graphic(circle, this.symbol));
    }

    /**
     * Reports the current map extent
     */
    showExtent() {
        let extent = this.view.extent;
        alert(`${extent.xmin} ${extent.ymin} ${extent.xmax} ${extent.ymax}`);
    }
}
