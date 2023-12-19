import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnChanges {
  @ViewChild('mapContainer', { static: true }) googleMap: ElementRef;
  map: google.maps.Map;

  @Input() locations: any[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.locations && this.locations.length) {
      const mapOptions: google.maps.MapOptions = {
        center: new google.maps.LatLng(this.locations[0], this.locations[1]),
        zoom: 16,
        draggableCursor: 'auto',
      };
      this.map = new google.maps.Map(this.googleMap.nativeElement, mapOptions);
    } else {
      this.mapInitializer();
      console.log('Không tồn tại vị trí bệnh viện');
    }
  }

  /**
   * mapInitializer
   */
  mapInitializer() {
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(16.06133291436767, 108.22706006427583),
      zoom: 16,
      draggableCursor: 'auto',
    };
    this.map = new google.maps.Map(this.googleMap.nativeElement, mapOptions);
  }
}
