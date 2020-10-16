import {AfterViewInit, Component, ContentChildren, NgZone, OnInit, QueryList, ViewEncapsulation} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import {MapMarkerComponent} from './marker/map-marker.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [MapComponent]
})
export class MapComponent implements OnInit, AfterViewInit {

  @ContentChildren(MapMarkerComponent)
  markers: QueryList<MapMarkerComponent>;

  private trialMap: L.Map;

  private markerClusters: L.MarkerClusterGroup;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this._ngZone.runOutsideAngular(() => {
      this.trialMap = L.map('mapid').setView([54.371966, -1.91088], 3);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 17,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
      }).addTo(this.trialMap);

      this.markerClusters = L.markerClusterGroup();
      this.trialMap.addLayer(this.markerClusters);
    });
  }

  ngAfterViewInit() {
    this.updateMarkers();
    this.markers.changes.subscribe(() => this.updateMarkers());
  }

  updateMarkers(): void {
    this._ngZone.runOutsideAngular((npm ) => {
      var markerIcon = new L.Icon({
        iconUrl: `/assets/marker-icon.png`,
        shadowUrl: `/assets/marker-shadow.png`,
        iconSize: [25, 41],
        shadowSize: [41, 41],
        iconAnchor: [12, 41],
        shadowAnchor: [12, 41],
        popupAnchor: [0, -45]
      });

      this.markerClusters.clearLayers();
      this.markers.forEach((marker) => {
        var leafletMarker = L.marker([marker.lat, marker.lng], {icon: markerIcon});
        var photo = '';

        if (marker.thumbnailUrl) {
          photo = `<img src="${marker.thumbnailUrl}"</img>`;
        }

        leafletMarker.bindPopup(`<div class="marker-popup"><p>${marker.name}</p>${photo}</div>`);

        this.markerClusters.addLayer(leafletMarker);
      });
    });
  }
}
