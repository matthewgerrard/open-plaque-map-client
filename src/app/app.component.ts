import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  public bluePlaques: BluePlaque[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:8080/geolocated')
      .subscribe((data: BluePlaque[]) => {
        data.forEach(bp => this.bluePlaques.push(bp));
      });
  }
}

export class BluePlaque {
  lt: string;
  lg: string;
  id: string;
}
