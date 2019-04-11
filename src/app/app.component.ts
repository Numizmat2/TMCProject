import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TMCProject';
  url = 'http://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow';
  coordinates = '634697.1176234016,584781.1245449155,634821.0751629833,585035.1250529166';
  parameters = '?SERVICE=WMS&request=getFeatureInfo&version=1.3.0' +
    '&layers=powiaty,zsin,obreby,dzialki,geoportal,numery_dzialek,budynki&styles=&crs=EPSG:2180' +
    '&bbox=' + this.coordinates + '&width=1920&height=937&format=image/png&transparent=true' +
    '&query_layers=powiaty,zsin,obreby,dzialki,geoportal,numery_dzialek,budynki&i=850&j=409&INFO_FORMAT=text/xml';

  request = this.url + this.parameters;

  sendData(minx, miny, maxx, maxy) {
    this.coordinates = minx + ',' +  miny + ',' + maxx + ',' + maxy;
    console.log(this.coordinates);
  }


}
