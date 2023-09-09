import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-f7-common-setting-search',
  templateUrl: './f7-common-setting-search.component.html',
  styleUrls: ['./f7-common-setting-search.component.scss']
})
export class F7CommonSettingSearchComponent implements OnInit {
  // output
  @Output() searchChange = new EventEmitter<string>();

  // binding
  keyword: string = '';
  lastKeyword: string = '';
  searching: boolean = false;

  /**
   * constructor
   * @param cdr
   */
  constructor(private cdr: ChangeDetectorRef) {
  }

  /**
   *
   */
  ngOnInit(): void {
  }

  /**
   * search
   * @param keyword
   */
  search(keyword: string) {
    this.keyword = keyword;
    this.searching = true;

    setTimeout(() => {
      this.searching = false;
      this.cdr.detectChanges();

      // call api one second one time
      if (this.lastKeyword != this.keyword) {
        this.lastKeyword = this.keyword;

        // call api search
        this.searchChange.emit(this.keyword);
      }
    }, 1000);
  }

  /**
   * clearSearch
   */
  clearSearch() {
    this.keyword = '';
    this.lastKeyword = '';
    // call api search
    this.searchChange.emit(this.keyword);
  }
}
