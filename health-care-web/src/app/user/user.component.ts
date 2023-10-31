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
    const category = this.route.snapshot.data['category'];
    const department = this.route.snapshot.data['department'];
    const articleOutstanding = this.route.snapshot.data['articleOutstanding'];
    category.data.forEach((item: any) => {
      item.thumbnail = `${prefixApi}/${item.thumbnail}`;
    });
    department.data.forEach((item: any) => {
      item.thumbnail = `${prefixApi}/${item.thumbnail}`;
    });

    console.log('articleOutstanding', articleOutstanding);
    articleOutstanding.data.data.forEach((item: any) => {
      item.thumbnail_article = `${prefixApi}/${item.thumbnail_article}`;
      item.thumbnail_categorie = `${prefixApi}/${item.thumbnail_categorie}`;
      item.avatar_user = `${prefixApi}/${item.avatar_user}`;
    });
    localStorage.setItem('categories', JSON.stringify(category.data));
    localStorage.setItem('departments', JSON.stringify(department.data));
    localStorage.setItem(
      'articlesOutstanding',
      JSON.stringify(articleOutstanding.data.data)
    );
  }
}
