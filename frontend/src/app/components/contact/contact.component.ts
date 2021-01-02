import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {Feature, geometry, Overlay} from 'ol';
import * as geom from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public map: any;

  constructor() { }

  ngOnInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([20.405970, 44.841260]),
        zoom: 16
      })
    });

    var container = document.getElementById("popup");
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new Overlay({
      element: container,
      // autoPan: true,
      // autoPanAnimation: {
      //     duration: 250
      // }
    });
    
    this.map.addOverlay(overlay);
    
    //ZA IE ILI DA IDE ADDEVENTLISTENER ILI DA SE STAVI closer.on('click', function() {})
    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
    
    this.map.on('singleclick', function(event) {
        if(this.map.hasFeatureAtPixel(event.pixel) === true) {
            var coordinate = event.coordinate;
            content.innerHTML = '<b>HELLO!!!</b>';
            overlay.setPosition(coordinate);
        } else {
            overlay.setPosition(undefined);
            closer.blur();
        }
    });
    
    overlay.setPosition(olProj.fromLonLat([20.405970, 44.841260]));
    content.innerHTML = "<b>Postetite nas ovde!</b>";
  }

}
