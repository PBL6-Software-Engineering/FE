import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-img-left2',
  templateUrl: './article-img-left2.component.html',
  styleUrls: ['./article-img-left2.component.scss'],
})
export class ArticleImgLeft2Component implements OnInit {
  @Input() article: any = {};
  constructor() {}
  ngOnInit(): void {}
}
