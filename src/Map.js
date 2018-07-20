import declare from "dojo/_base/declare";
import Evented from "dojo/Evented";

import _WidgetBase from "dijit/_WidgetBase";

import MapView from "esri/views/MapView";
import WebMap from "esri/WebMap";
import Circle from "esri/geometry/Circle";
import Graphic from "esri/Graphic";
import * as config from "app/config";

export default declare([_WidgetBase, Evented], {
    // Properties
    view: null,
    container: null,
    symbol: {
        type: "simple-fill",
        style: "solid",
        outline: {
            color: "blue",
            width: 1
        }
    },

    constructor(container) {
        this.container = container;
    },

    postCreate() {
        // TODO: allow this when strict mode is enabled
        //this.inherited(arguments);

        const webmap = new WebMap({
            portalItem: {
                id: config.webmapId
            }
        });

        this.view = new MapView({
            map: webmap,
            container: this.container
        });

        this.view.when(() => {
            this.own(
                this.view.on("click", evt => {
                    this.drawCircle(evt);
                })
            );

            // Publish load event
            this.emit("load", { view: this.view });
        });
    },

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
    },

    showExtent() {
        let extent = this.view.extent;
        alert(`${extent.xmin} ${extent.ymin} ${extent.xmax} ${extent.ymax}`);
    }
});
