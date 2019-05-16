import { Component } from '@angular/core';
import { DataService } from './data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TMCProject';

  constructor(private dataService: DataService) {}
  response;
  error;
  private observable: Observable<any>;

  sendData(minx, miny, maxx, maxy) {
    const inputValues = minx + ',' + miny + ',' + maxx + ',' + maxy;
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
