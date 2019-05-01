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
  private observable: Observable<any>;

  sendData(minx, miny, maxx, maxy) {
    const inputValues = minx + ',' + miny + ',' + maxx + ',' + maxy;
    this.observable = this.dataService.getPropertyData(inputValues);
    this.observable.subscribe((res) => {
      this.response = res;
    });
  }
}
