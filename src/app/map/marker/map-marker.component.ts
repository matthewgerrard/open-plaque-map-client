import { Input, Directive} from '@angular/core';

@Directive({
  selector: 'app-map-marker'
})
export class MapMarkerComponent {
  @Input()
  public name: string;

  @Input()
  public lat: number;

  @Input()
  public lng: number;

  @Input()
  public thumbnailUrl: string;
}
