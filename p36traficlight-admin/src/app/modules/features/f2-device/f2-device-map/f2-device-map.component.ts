import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {DeviceService} from "src/app/core/services/features/f2-device.service";
import Marker = google.maps.Marker;
import Icon = google.maps.Icon;
import {ActivatedRoute} from "@angular/router";
import InfoWindow = google.maps.InfoWindow;
import {Subscription} from "rxjs";
import {CommonService} from "src/app/core/services/common.service";

@Component({
  selector: 'f2-device-map',
  templateUrl: './f2-device-map.component.html',
  styleUrls: ['./f2-device-map.component.scss'],
})
export class F2DeviceMapComponent implements OnInit, AfterViewInit {
  subscription: Subscription[] = [];
  @ViewChild('mapContainer', {static: false}) googleMap: ElementRef;
  map: google.maps.Map;
  markers: Marker[] = [];
  markerSearches: Marker[] = [];
  markerRightClicks: Marker[] = [];
  readonly zoomDefault = 16;
  readonly sizeIcon = 22;

  infoWindowHover: InfoWindow;
  infoWindowAddOrUpdate: InfoWindow;
  infoWindowDetail: InfoWindow;

  isSearch = false;
  isDisplayIconOpen = false;
  isOpenComponentAdd = false;
  isOpenComponentDetail = false;
  isOpenComponentUpdate = false;
  isReloadDataDetail = false;

  // using for add new or update
  coordinate: any;

  typeAdd = '';
  typeUpdate = '';

  idUpdate = '';
  idGroup = '';
  idDevice = '';
  idProvince = '';
  position = 0;

  backHref: string = '';

  /**
   * constructor
   * @param elementRef
   * @param api
   * @param route
   * @param commonService
   */
  constructor(private elementRef: ElementRef,
              private api: DeviceService,
              private route: ActivatedRoute,
              private commonService: CommonService) {
    // info device when hover device
    this.infoWindowHover = new google.maps.InfoWindow({
      pixelOffset: new google.maps.Size(125, 220),
      disableAutoPan: true,
      maxWidth: 240,
    });

    // popup when update device or group
    this.infoWindowAddOrUpdate = new google.maps.InfoWindow({
      pixelOffset: new google.maps.Size(110, 35),
      disableAutoPan: true,
      content: `
        <div class="d-flex">
          <div class="triangle triangle-black"></div>
          <div class="text-center flex-grow-1 text-white py-3 px-4 rounded" style="background: #464647; ">
              Di chuyển để thay đổi toạ độ
          </div>
        </div>`
    });

    // popup when display detail
    this.infoWindowDetail = new google.maps.InfoWindow({
      pixelOffset: new google.maps.Size(110, 38),
      disableAutoPan: true
    });
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    // check action for display component left
    if (this.route.snapshot.params.typeAdd) {
      this.typeAdd = this.route.snapshot.params.typeAdd;
      this.openComponentAdd();
    } else if (this.route.snapshot.params.typeUpdate) {
      this.typeUpdate = this.route.snapshot.params.typeUpdate;
      this.idGroup = this.route.snapshot.params.idGroup ? this.route.snapshot.params.idGroup : '';
      this.idUpdate = this.route.snapshot.params.id;
      this.openComponentUpdate();
    } else if (this.route.snapshot.params.idGroup) {
      this.idGroup = this.route.snapshot.params.idGroup;
      this.idDevice = this.route.snapshot.params.idDevice ? this.route.snapshot.params.idDevice : '';
      this.openComponentDetail();
    }
  }

  /**
   * mapInitializer
   */
  mapInitializer() {
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(16.06133291436767, 108.22706006427583),
      zoom: this.zoomDefault,
      draggableCursor: 'auto',
    };
    this.map = new google.maps.Map(this.googleMap.nativeElement, mapOptions);
    // find current location if view map
    if (this.typeAdd === '' && this.typeUpdate === '' && this.idGroup === '' || this.typeAdd === 'group') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.map.setCenter(pos);
        });
      }
    }
    this.findDevices();
    this.listenerRightClick();
    this.listenerZoomChange();
    this.search(this.map);
  }

  /**
   * ngAfterViewInit
   */
  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  /**
   * findDevices => display marker on map by group devices
   */
  findDevices(): void {
    this.subscription.push(
      this.api.findByGroup().subscribe(groups => {
        groups.forEach((group: any) => {
          const isGroupEmpty = group.childs.length === 0;
          const isUpdateGroup = group._id === this.idUpdate && this.typeUpdate === 'group';
          const isDisplayByGroup = group._id === this.idGroup && this.idDevice === '' && this.idUpdate === '';
          let m;
          if (isGroupEmpty || isUpdateGroup || isDisplayByGroup) {
            m = this.createMarker(group.coordinate, group.idTypeDevice.thumbnail);
          } else {
            m = this.createMarker(group.coordinate, group.idTypeDevice.thumbnail, 0)
          }
          // add data into marker
          m = this.addDataForMarker(m, group.name, group.idTypeDevice.name, group._id, group._id);
          m.set('isGroup', true);
          m.set('isEmptyGroup', group.childs.length === 0)
          if (isDisplayByGroup) {
            this.map.setCenter(group.coordinate);
            this.openInfoWindowDetail(m);
          } else if (isUpdateGroup) {
            this.map.setCenter(group.coordinate);
            this.infoWindowAddOrUpdate.open(this.map, m);
            // listener for update coordinate
            this.listenerDragendMarker(m);
          }
          // display device belong to group
          group.childs.forEach((device: any) => {
            let m1 = this.createMarker(device.coordinate, device.idTypeDevice.thumbnail);
            m1 = this.addDataForMarker(m1, device.name, group.idTypeDevice.name, device._id, group._id);
            m1.set('isGroup', false);
            // when display detail device
            if (device._id === this.idDevice) {
              this.map.setCenter(device.coordinate);
              this.openInfoWindowDetail(m1);
            } else if (device._id === this.idUpdate) {
              // when update device
              this.map.setCenter(device.coordinate);
              this.infoWindowAddOrUpdate.open(this.map, m1);
              // listener for update coordinate
              this.listenerDragendMarker(m1);
            }
          });
        });
      })
    );
  }

  /**
   * listenerRightClick
   */
  listenerRightClick(): void {
    google.maps.event.addListener(this.map, 'rightclick', (e) => {
      // reset old marker right-click
      this.markerRightClicks.forEach(m => m.setMap(null));
      this.coordinate = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      const marker = this.createMarker(this.coordinate, '');
      marker.setAnimation(google.maps.Animation.DROP);
      this.markerRightClicks.push(marker);

      this.infoWindowAddOrUpdate.set("pixelOffset", new google.maps.Size(120, 50));
      this.infoWindowAddOrUpdate.open(this.map, marker);
      this.listenerDragendMarker(marker);
      this.listenerClickMarker(marker);
    });
  }

  /**
   * listenerClickMarker
   * @param marker
   */
  listenerClickMarker(marker: Marker): void {
    google.maps.event.addListener(marker, 'click', (e) => {
      this.isDisplayIconOpen = false;
      this.map.setCenter({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
      if (marker.get('idGroup') === undefined) {
        // Add group
        this.idGroup = '';
        this.typeAdd = 'group';
        this.openComponentAdd();
        this.infoWindowAddOrUpdate.open(this.map, marker);
        this.infoWindowDetail.close();
      } else {
        this.idGroup = marker.get('idGroup');
        // clicked device
        if (marker.get('id') !== undefined) {
          this.idDevice = marker.get('id');
        }
        this.infoWindowAddOrUpdate.close();
        this.openInfoWindowDetail(marker);
        this.openComponentDetail();
      }
    });
  }

  /**
   * listenerMouseoverMarker
   * @param marker
   */
  listenerMouseoverMarker(marker: Marker): void {
    google.maps.event.addListener(marker, 'mouseover', () => {
      this.openInfoWindowHover(marker);
    });
  }

  /**
   * listenerMouseoutMarker
   * @param marker
   */
  listenerMouseoutMarker(marker: Marker): void {
    google.maps.event.addListener(marker, 'mouseout', () => {
      this.infoWindowHover.close();
    });
  }

  /**
   * listenerZoomChange
   */
  listenerZoomChange(): void {
    google.maps.event.addListener(this.map, 'zoom_changed', () => {
      // display group
      this.markers.forEach((m) => {
        // display device and group by id
        if (m.get('id') === this.idGroup || m.get('id') === this.idDevice || m.get('id') === this.idUpdate) {
          m.setIcon(this.createIcon(m.get('icon').url));
        } else {
          if (this.map.getZoom() === 14) {
            // hidden marker
            m.setIcon(this.createIcon(m.get('icon').url, 0));
          } else if (this.map.getZoom() === 15) {
            // display group
            if (m.get('isGroup')) {
              m.setIcon(this.createIcon(m.get('icon').url));
            } else {
              m.setIcon(this.createIcon(m.get('icon').url, 0));
            }
          } else if (this.map.getZoom() === 16) {
            // display device
            if (m.get('isGroup') && !m.get('isEmptyGroup')) {
              m.setIcon(this.createIcon(m.get('icon').url, 0));
            } else {
              m.setIcon(this.createIcon(m.get('icon').url));
            }
          }
        }
      });
    });
  }

  /**
   * listenerDragendMarker
   * @param marker
   */
  listenerDragendMarker(marker: Marker): void {
    google.maps.event.addListener(marker, 'dragend', (event) => {
      this.coordinate = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    });
  }

  /**
   * openInfoWindowHover
   * @param marker
   */
  openInfoWindowHover(marker: any): void {
    const coordinate = this.commonService.convertLatOrLngToDMS(marker.getPosition().lat(), 'lat') + ' '
      + this.commonService.convertLatOrLngToDMS(marker.getPosition().lng(), 'lng') + ' '
    const time = this.getCurrentTime();
    this.infoWindowHover.setContent(`
        <div class="d-flex" style="z-index: 10">
            <div class="triangle triangle-orange"></div>
            <div class="content-iw-wrapper text-center d-flex flex-column flex-grow-1 rounded-bottom">
                <div class="title-iw text-center">
                       <span class="mw-text mw-text-180px text-white">${marker.typeDevice}</span>
                </div>

                <div class="px-3 text-black rounded-bottom bg-white">
                    <div class="my-5 fw-bold mw-text mw-text-180px text-black">${marker.name}</div>
                    <img src="${marker.thumbnail}" alt="" width="50px" height="50px">
                    <div class="my-5 fw-bold fs-7">
                        <i class="bi bi-geo-alt-fill"></i>
                        <span>${coordinate}</span>
                    </div>
                    <div class="pb-8">Dữ liệu lúc: ${time}</div>
                </div>
            </div>
        </div>
    `);
    this.infoWindowHover.open(this.map, marker);
  }

  /**
   * openInfoWindowDetail
   * @param marker
   */
  openInfoWindowDetail(marker: any): void {
    this.infoWindowDetail.setContent(`
        <div class="d-flex">
          <div class="triangle triangle-black"></div>
          <div class="text-center flex-grow-1 text-white py-3 px-4 rounded mw-text mw-text-160px" style="background: #464647; min-width: 180px">
              ${marker.name}
          </div>
        </div>`);
    this.infoWindowDetail.open(this.map, marker);
  }

  /**
   * createMarker
   * @param coordinate
   * @param linkIcon
   * @param sizeIcon
   */
  createMarker(coordinate: any, linkIcon: string, sizeIcon: number = this.sizeIcon) {
    const marker = new google.maps.Marker({
      'map': this.map,
      position: coordinate,
      draggable: true,
    });
    // exist link icon
    if (linkIcon !== '') {
      marker.setIcon(this.createIcon(linkIcon, sizeIcon));
    }
    return marker;
  }

  /**
   * addDataForMarker
   * @param marker
   * @param name
   * @param typeDevice
   * @param id
   * @param idGroup
   */
  addDataForMarker(marker: any, name: string, typeDevice: string, id: any, idGroup: any) {
    marker.set('name', name);
    marker.set('typeDevice', typeDevice);
    marker.set('id', id);
    marker.set('idGroup', idGroup);
    this.listenerMouseoverMarker(marker);
    this.listenerMouseoutMarker(marker);
    this.listenerClickMarker(marker);
    this.markers.push(marker);
    return marker;
  }

  /**
   * createIcon
   * @param linkIcon
   * @param sizeIcon
   */
  createIcon(linkIcon: string, sizeIcon = this.sizeIcon) {
    return {
      url: linkIcon,
      scaledSize: new google.maps.Size(sizeIcon, sizeIcon), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(sizeIcon / 2, sizeIcon / 2), // anchor
    };
  }

  /**
   * search
   * @param map
   */
  search(map: any): void {
    const input = this.elementRef.nativeElement.querySelector('#pac-input');
    const form = this.elementRef.nativeElement.querySelector('#pac-form');
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(form);
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      // Clear out the old markerSearches.
      this.markerSearches.forEach((marker) => marker.setMap(null));
      this.markerSearches = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }

        const icon: Icon = {
          url: place.icon ? place.icon : '',
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(30, 30)
        };

        const marker = new google.maps.Marker({
          'map': this.map,
          icon,
          title: place.name,
          position: place.geometry.location,
        });
        this.markerSearches.push(marker);
        // Update the bounds
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  /**
   * clearSearch
   */
  clearSearch(): void {
    this.isSearch = false;
    this.elementRef.nativeElement.querySelector('#pac-input').value = '';
    this.markerSearches.forEach((marker) => marker.setMap(null));
  }

  /**
   * displayIconClear
   */
  displayIconClear(): void {
    this.isSearch = true;
  }

  /**
   * getCurrentTime
   */
  getCurrentTime(): string {
    const date = new Date();
    return padTo2Digits(date.getUTCDate()) + '/'
      + padTo2Digits(date.getUTCMonth() + 1) + '/'
      + date.getUTCFullYear() + ' '
      + padTo2Digits(date.getHours()) + ':'
      + padTo2Digits(date.getMinutes()) + ':'
      + padTo2Digits(date.getSeconds());

    function padTo2Digits(num: any) {
      return num.toString().padStart(2, '0');
    }
  }

  /**
   * openComponentAdd
   */
  openComponentAdd(): void {
    this.isOpenComponentAdd = true;
    this.isOpenComponentDetail = this.isOpenComponentUpdate = this.isReloadDataDetail = false;
  }

  /**
   * openComponentUpdate
   */
  openComponentUpdate(): void {
    this.isOpenComponentUpdate = true;
    this.isOpenComponentDetail = this.isOpenComponentAdd = this.isReloadDataDetail = false;
  }

  /**
   * openComponentDetail
   */
  openComponentDetail(): void {
    this.isOpenComponentDetail = this.isReloadDataDetail = true;
    this.isOpenComponentAdd = this.isOpenComponentUpdate = false;
    this.backHref = '';
  }

  /**
   * closeComponent
   */
  closeComponent(): void {
    this.isOpenComponentAdd = this.isOpenComponentUpdate = this.isOpenComponentDetail = this.isDisplayIconOpen = false;
    this.isReloadDataDetail = false;
  }

  /**
   * listenerAfterAddSuccess
   * @param id
   */
  listenerAfterAddSuccess(id: any) {
    // After add group
    if (this.typeAdd === 'group') {
      this.idGroup = id;
      this.idDevice = '';
    } else {
      // After add device to group
      this.idDevice = id;
    }
    this.typeAdd = this.coordinate = '';
    this.openComponentDetail();
    this.markerRightClicks.forEach(m => m.setMap(null));

    this.api.find(id, '?populate=idTypeDevice').subscribe(data => {
      // create marker
      let m = this.createMarker(data.coordinate, data.idTypeDevice.thumbnail);
      m = this.addDataForMarker(m, data.name, data.idTypeDevice.name, data._id, this.idGroup);
      this.openInfoWindowDetail(m);
    })
  }

  /**
   * onAddToGroup
   * @param item
   */
  onAddToGroup(item: any) {
    this.typeAdd = 'device';
    this.idGroup = item.idGroup;
    this.idProvince = item.idProvince;
    this.position = item.position;
    this.openComponentAdd();
  }

  /**
   * onClearAddToGroup
   */
  onClearAddToGroup() {
    this.idProvince = this.idGroup = '';
  }

  /**
   * onUpdateStatusDisplayIconOpen
   */
  onUpdateStatusDisplayIconOpen(status: boolean) {
    this.isDisplayIconOpen = status;
  }

  /**
   * onRemoveMarker
   * @param id
   */
  onRemoveMarker(id: any) {
    const marker = this.markers.find(item => item.get('id') === id);
    if (marker) {
      marker.setMap(null);
    }
  }

  /**
   * onSelectedMarker
   * @param id
   */
  onSelectedMarker(id: any) {
    this.isReloadDataDetail = false;
    const m = this.markers.find(marker => marker.get('id') === id);
    if (!m) return;
    if (!m.get('isGroup')) {
      this.idDevice = id;
    }
    m.setIcon(this.createIcon(m.get('icon').url));
    this.openInfoWindowDetail(m);
  }

  /**
   * onUpdate
   * @param item
   */
  onUpdate(item: any) {
    this.idUpdate = item.id;
    this.typeUpdate = item.typeUpdate;
    this.backHref = 'detail';
    this.openComponentUpdate();
    const m: any = this.markers.find(marker => marker.get('id') === this.idUpdate);
    this.openInfoWindowDetail(m);
    this.listenerDragendMarker(m);
  }

  /**
   * listenerAfterUpdateSuccess
   * @param id
   */
  listenerAfterUpdateSuccess(id: any) {
    // this.onRemoveMarker(id);
    this.subscription.push(
      this.api.find(id, '?populate=idTypeDevice').subscribe(data => {
        let m: any = this.markers.find(marker => marker.get('id') === this.idUpdate);
        m.setIcon(this.createIcon(data.idTypeDevice.thumbnail, this.sizeIcon));
        m.set('coordinate', data.coordinate);
        m = this.addDataForMarker(m, data.name, data.idTypeDevice.name, data._id, this.idGroup);
        this.openInfoWindowDetail(m);
      })
    );
  }
}
