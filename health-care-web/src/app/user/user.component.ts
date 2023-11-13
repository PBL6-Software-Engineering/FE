import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DepartmentService } from '../admin/_services/department.service';
import { CategoryService } from '../admin/_services/category.service';
import { prefixApi } from '../core/constants/api.constant';
import { SpinnerService } from '../core/services/spinner.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ArticleService } from '../admin/_services/article.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // const category = this.route.snapshot.data['category'];
    // const department = this.route.snapshot.data['department'];
    // const articleOutstanding = this.route.snapshot.data['articleOutstanding'];
    // const province = this.route.snapshot.data['province'];
    // const hospitalOutStanding = this.route.snapshot.data['hospitalOutStanding'];

    // category.data.forEach((item: any) => {
    //   if (item.thumbnail && item.thumbnail.indexOf('http') === -1) {
    //     item.thumbnail = `${prefixApi}/${item.thumbnail}`;
    //   }
    // });

    // department.data.forEach((item: any) => {
    //   if (item.thumbnail && item.thumbnail.indexOf('http') === -1) {
    //     item.thumbnail = `${prefixApi}/${item.thumbnail}`;
    //   }
    // });

    // articleOutstanding.data.data.forEach((item: any) => {
    //   if (
    //     item.thumbnail_article &&
    //     item.thumbnail_article.indexOf('http') === -1
    //   ) {
    //     item.thumbnail_article = `${prefixApi}/${item.thumbnail_article}`;
    //   }

    //   if (
    //     item.thumbnail_categorie &&
    //     item.thumbnail_categorie.indexOf('http') === -1
    //   ) {
    //     item.thumbnail_categorie = `${prefixApi}/${item.thumbnail_categorie}`;
    //   }

    //   if (item.avatar_user && item.avatar_user.indexOf('http') === -1) {
    //     item.avatar_user = `${prefixApi}/${item.avatar_user}`;
    //   }
    // });

    // hospitalOutStanding.data.data.forEach((item: any) => {
    //   if (item.avatar && item.avatar.indexOf('http') === -1) {
    //     item.avatar = `${prefixApi}/${item.avatar}`;
    //   }
    // });

    // localStorage.setItem('categories', JSON.stringify(category.data));
    // localStorage.setItem('departments', JSON.stringify(department.data));
    // localStorage.setItem(
    //   'articlesOutstanding',
    //   JSON.stringify(articleOutstanding.data.data)
    // );
    // localStorage.setItem(
    //   'hospitalsOutStanding',
    //   JSON.stringify(hospitalOutStanding.data.data)
    // );
    // localStorage.setItem('provinces', JSON.stringify(province.provinces));

    // console.log(hospitalOutStanding.data.data);
  }
}
