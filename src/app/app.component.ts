import {Component, OnInit} from '@angular/core';
import { DataService } from './data.service';
import {Observable} from 'rxjs';
import proj4 from 'proj4';

declare var ol: any;
const p2180 = '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs';

const mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  undefinedHTML: '&nbsp;'
});


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  map: any;

  constructor(private dataService: DataService) {}
  response;
  error;
  private observable: Observable<any>;

  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
          isBaseLayer: true,
        }),
        new ol.layer.Tile({
          source: new ol.source.TileWMS({
            url: 'http://integracja01.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow',
            params: {
              LAYERS: 'dzialki,numery_dzialek,budynki'
            }
          }),
          isBaseLayer: false,
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([18, 53]),
        zoom: 8
      })
    });


    this.map.on('click', args => {
      this.response = '';
      const lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      const cords = proj4(p2180, lonlat);

      const lon = cords[0];
      const lat = cords[1];
      this.sendData(lat, lon);
    });
  }

  sendData(lat, lon) {
    const inputValues = lat + ',' + lon + ',' + lat + ',' + lon;
    this.observable = this.dataService.getPropertyData(inputValues);
    this.observable.subscribe((res) => {
      this.parseResponse(res);
    });
  }

  parseResponse(res) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(res, 'text/xml');
    const elems = xml.getElementsByTagName('Attribute');
    if (elems.item(0).innerHTML !== 'Usługa nie udostępnia danych opisowych dla wybranego obiektu') {
      const id = 'Identyfikator działki: ' + elems.item(0).innerHTML + '\n';
      const woj = 'Województwo: ' + elems.item(1).innerHTML + '\n';
      const pow = 'Powiat: ' + elems.item(2).innerHTML + '\n';
      const gmin = 'Gmina: ' + elems.item(3).innerHTML + '\n';
      const ob = 'Obręb: ' + elems.item(4).innerHTML + '\n';
      const nr = 'Numer działki: ' + elems.item(5).innerHTML + '\n';
      const kw = 'KW: ' + elems.item(6).innerHTML + '\n';
      const date = 'Data publikacji: ' + elems.item(7).innerHTML + '\n';
      const inf = 'Informacje dodatkowe o działce: ' + elems.item(8).innerHTML + '\n';

      const results = [id, woj, pow, gmin, ob, nr, kw, date, inf];
      this.response = results;
    } else {
      this.error = 'Usługa nie udostępnia danych opisowych dla wybranego obiektu';
    }
  }
}
