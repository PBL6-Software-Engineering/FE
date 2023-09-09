import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {ConfigurationService} from 'src/app/core/services/features/f3-configuration.service';
import {FormBuilder} from "@angular/forms";
import {DeviceService} from "src/app/core/services/features/f2-device.service";
import {CommonTcpService} from "src/app/core/services/common.tcp.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-f3-configuration-detail',
  templateUrl: './f3-configuration-detail.component.html',
  styleUrls: ['./f3-configuration-detail.component.scss'],
})
export class F3ConfigurationDetailComponent implements OnInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  isLoadingSend$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingSend: boolean;

  idDevice: any;
  device: any;
  messageError = '';

  lastPosition: any;
  dataSources: any[] = [];

  uniquePositions: Map<number, number> = new Map();

  isSelectAll = false;
  isValidFileCSV = true;
  messageErrorsFile: string[] = [];

  // delete id
  deleteId: String;

  // property when read file csv
  propertyNames = ['position', 'parameter', 'byte', 'value'];

  previousUrl: any;

  @ViewChild('fileInput') fileInput: any;


  /**
   * onCheckAllSelected
   */
  onCheckAllSelected() {
    this.isSelectAll = !this.isSelectAll;
    // check or uncheck all item
    for (let i = 0; i < this.dataSources.length; i++) {
      this.dataSources[i].checked = this.isSelectAll;
    }
  }

  /**
   *
   * @param id
   */
  onItemSelected(id: any) {
    // check or uncheck item with id
    for (let i = 0; i < this.dataSources.length; i++) {
      if (this.dataSources[i]._id === id) {
        this.dataSources[i].checked = !this.dataSources[i].checked;
        break;
      }
    }
    this.isSelectAll = this.dataSources.findIndex(data => !data.checked) === -1;
  }

  /**
   * getSelection
   * @returns
   */
  getSelection() {
    return this.dataSources.filter((x) => x.checked);
  }


  /**
   * updateDeleteId
   * @param id
   */
  updateDeleteId(id: string) {
    this.deleteId = id;
  }

  /**
   * onDeleteBtnClick
   */
  onDeleteBtnClick() {
    this.subscription.push(
      this.api.delete(this.deleteId).subscribe(() => {
        this.commonService.showSuccess('Xoá thành công!');
        this.isSelectAll = false;
        this.onLoadData();
      })
    );
  }

  /**
   * onDeleteManyBtnClick
   */
  onDeleteManyBtnClick() {
    // get list id select
    const listIdSelect = this.getSelection().map((item) => item._id).join(',');

    // delete many by list id select
    this.subscription.push(
      this.api.deleteManyByIds(listIdSelect, this.idDevice).subscribe(() => {
        this.commonService.showSuccess('Xoá thành công!');
        this.isSelectAll = false;
        this.onLoadData();
      })
    );
  }

  /**
   * constructor
   * @param api
   * @param apiDevice
   * @param commonService
   * @param commonTcp
   * @param router
   * @param cdr
   * @param route
   * @param formBuilder
   * @param el
   */
  constructor(
    private api: ConfigurationService,
    private apiDevice: DeviceService,
    private commonService: CommonService,
    private commonTcp: CommonTcpService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private el: ElementRef,
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res)),
      this.isLoadingSend$.asObservable().subscribe((res) => (this.isLoadingSend = res))
    );
    this.previousUrl = window.localStorage.getItem('previousUrl');
    this.previousUrl = this.previousUrl ? this.previousUrl : 'features/devices';
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.idDevice = this.route.snapshot.paramMap.get('idDevice');
    this.onLoadData();
  }

  /**
   * ngOnDestroy
   */
  ngOnDestroy() {
    this.subscription.forEach((item) => {
      item.unsubscribe();
    });
  }

  /**
   * onLoadData
   */
  onLoadData() {
    this.subscription.push(
      this.apiDevice.find(this.idDevice).subscribe(device => {
        this.device = device;
        if(device.port < 0) {
          this.messageError = device.ip === '' ? 'Chưa thiết lập ip và port thiết bị!'
            : 'Chưa thiết lập port thiết bị!';
        } else if(device.ip === '') {
          this.messageError = 'Chưa thiết lập ip thiết bị!';
        }
      })
    );
    this.subscription.push(
      this.api.get('?idDevice=' + this.idDevice).subscribe((data: any) => {
        this.dataSources = data;
        this.lastPosition = data.length > 0 ? data[data.length - 1].position : 0;
      })
    )
  }

  /**
   * onFileSelected
   * @param event
   */
  public async onFileSelected(event: any) {
    let fileContent = await this.getTextFromFile(event);

    // begin reset
    this.isSelectAll = false;
    this.isValidFileCSV = true;
    this.messageErrorsFile = [];
    this.uniquePositions = new Map();
    // end reset

    const dataSourcesTemp = this.processCSV(fileContent);
    if(this.isValidFileCSV) {
      // upsert dataSources to database
      this.api.deleteAndInsertMany(dataSourcesTemp).subscribe(data => {
        this.dataSources = data;
        this.commonService.showSuccess('Cập nhật thành công!');
      })
    } else {
      this.el.nativeElement.querySelector('#openNotifyErrorModal').click();
    }
  }

  /**
   * getTextFromFile
   * @param event
   * @private
   */
  private async getTextFromFile(event: any) {
    const file: File = event.target.files[0];
    return await file.text();
  }

  /**
   * processCSV
   * @param csvText
   */
  public processCSV(csvText: string): Array<any> {
    const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
    // remove character \r, \n end line
    propertyNames[propertyNames.length - 1] = propertyNames[propertyNames.length - 1].replace(/\n|\r/g, "");
    if(!this.validateHeaderFileCSV(propertyNames)) {
      this.isValidFileCSV = false;
      this.messageErrorsFile.push('- Header file csv không hợp lệ.');
      this.messageErrorsFile.push('\t\tQuy ước header: position,parameter,byte,number.');
    }

    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');

    let dataArray: any[] = [];
    dataRows.forEach((row, index: number) => {
      if(row !== '') {
        const obj = this.validateRecordFileCSV(row, index + 1);
        dataArray.push(obj);
      }
    });

    this.fileInput.nativeElement.value = '';
    return dataArray;
  }

  /**
   * onBtnExportCSV
   */
  public onBtnExportCSV(): void {
    const csvContent = this.saveDataInCSV();
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'configuration' + '.csv';
    hiddenElement.click();
  }

  /**
   * saveDataInCSV
   */
  public saveDataInCSV(): string {
    if (this.dataSources.length == 0) {
      return '';
    }
    // header of file (name column)
    let csvContent = this.propertyNames.join(',') + '\n';
    let rows: string[] = [];
    this.dataSources.forEach((item) => {
      if (item.checked) {
        let values: string[] = [];
        this.propertyNames.forEach((key) => {
          let val: any = item[key];
          if (val !== undefined && val !== null) {
            val = String(val);
          } else {
            val = '';
          }
          values.push(val);
        });
        rows.push(values.join(','));
      }
    });
    csvContent += rows.join('\n');
    return csvContent;
  }

  /**
   * validateHeaderFileCSV
   * @param headers
   */
  validateHeaderFileCSV(headers: string[]) {
    if(headers.length < this.propertyNames.length) {
      return false;
    }
    for(let i = 0; i < this.propertyNames.length; i++) {
      if(headers[i].toLowerCase() !== this.propertyNames[i].toLowerCase()) {
        return false;
      }
    }
    return true;
  }

  /**
   * validateRecordFileCSV
   * @param record
   * @param index
   */
  validateRecordFileCSV(record: string, index: number) {
    let values = record.split(',');
    let obj: any = {};
    for (let i = 0; i < this.propertyNames.length; i++) {
      // validate properties: position, byte, value
      if(i === 0 || i === 2 || i === 3) {
        values[i] = values[i].replace(/\n|\r/g, '');
        if(values[i] && /^\d+$/.test(values[i])) {
          // check unique position
          if(i === 0) {
            if(!this.uniquePositions.get(+values[i])) {
              obj[this.propertyNames[i]] = +values[i];
              this.uniquePositions.set(+values[i], 1);
            } else {
              obj[this.propertyNames[i]] = values[i];
              this.isValidFileCSV = false;
              this.messageErrorsFile.push(`- Record ${index}: Thuộc tính position = ${values[i]} bị trùng lặp trong file.`);
            }
          } else {
            obj[this.propertyNames[i]] = +values[i];
          }
        } else {
          obj[this.propertyNames[i]] = values[i];
          this.isValidFileCSV = false;
          this.messageErrorsFile.push(`- Record ${index}:  ${this.propertyNames[i]} phải là dữ liệu số.`);
        }
      } else if(i === 1) {
        obj[this.propertyNames[i]] = values[i] ? values[i] : '';
      }
    }
    obj['idDevice'] = this.idDevice;
    return obj;
  }

  /**
   * send data configuration to device
   */
  sendData() {
    this.isLoadingSend$.next(true);
    let totalByte = 0;
    for(let i = 0; i < this.dataSources.length; i++) {
      totalByte += this.dataSources[i].byte;
    }
    // initial deviceCode, cmd, length
    const bytes: number[] = [ +this.device.deviceCode, 4, totalByte ];
    // convert data
    this.dataSources.forEach(data => bytes.push(...this.commonTcp.convertValueToBytes(data.byte, data.value)));
    // calculate checksum
    bytes.push(this.commonTcp.calculateChecksum(bytes));
    this.subscription.push(
      this.apiDevice.sendAndReceiveData({
        host: this.device.ip,
        port: this.device.port,
        data: bytes
      }).pipe((finalize(() => {
        this.isLoadingSend$.next(false);
      }))).subscribe({
        next: (data: any) => {
          // check status is true or false (default true with decimals[3] = 1, else = 0)
          const decimals = this.commonTcp.convertHexToDec(data.result.toString());
          if(decimals[3] === 0) {
            this.commonService.showError('Gửi cấu hình không thành công!');
          } else if(decimals[3] === 1) {
            this.commonService.showSuccess('Gửi cấu hình thành công!');
          }
        },
        error: (error: any) => {
          this.commonService.showError('Gửi cấu hình không thành công!');
        }
      })
    )
  }
}
