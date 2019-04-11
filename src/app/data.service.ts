import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow';

  getPropertyData(coordinates: string) {
    const parameters = '?SERVICE=WMS&request=getFeatureInfo&version=1.3.0' +
      '&layers=powiaty,zsin,obreby,dzialki,geoportal,numery_dzialek,budynki&styles=&crs=EPSG:2180' +
      '&bbox=' + coordinates + '&width=1920&height=937&format=image/png&transparent=true' +
      '&query_layers=powiaty,zsin,obreby,dzialki,geoportal,numery_dzialek,budynki&i=850&j=409&INFO_FORMAT=text/xml';
    return this.httpClient.get(this.baseUrl + parameters, {responseType: 'text'});
  }

}
