import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ArticleService } from 'src/app/admin/_services/article.service';
import { prefixApi } from 'src/app/core/constants/api.constant';

@Component({
  selector: 'app-article-topics',
  templateUrl: './article-topics.component.html',
  styleUrls: ['./article-topics.component.scss'],
})
export class ArticleTopicsComponent implements OnInit {
  articles: any[] = [
    {
      category: '',
      articles: [],
    },
  ];
  isLoading = false;
  constructor(
    private articleService: ArticleService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    if (categories && categories.length) {
      this.isLoading = true;
      this.spinnerService.show();
      forkJoin([
        this.articleService.getArticleByCategory({
          name_category: categories[0].name,
        }),
        this.articleService.getArticleByCategory({
          name_category: categories[1].name,
        }),
        this.articleService.getArticleByCategory({
          name_category: categories[2].name,
        }),
      ]).subscribe(([res1, res2, res3]) => {
        this.isLoading = false;
        this.spinnerService.hide();
        res1.data.data.forEach((e: any) => {
          if (e.thumbnail_article) {
            e.thumbnail_article = prefixApi + '/' + e.thumbnail_article;
          }
          if (e.avatar_user) {
            e.avatar_user = prefixApi + '/' + e.avatar_user;
          }
        });
        res2.data.data.forEach((e: any) => {
          if (e.thumbnail_article) {
            e.thumbnail_article = prefixApi + '/' + e.thumbnail_article;
          }
          if (e.avatar_user) {
            e.avatar_user = prefixApi + '/' + e.avatar_user;
          }
        });
        res3.data.data.forEach((e: any) => {
          if (e.thumbnail_article) {
            e.thumbnail_article = prefixApi + '/' + e.thumbnail_article;
          }
          if (e.avatar_user) {
            e.avatar_user = prefixApi + '/' + e.avatar_user;
          }
        });
        this.articles = [
          {
            category: categories[0].name,
            articles: res1.data.data,
          },
          {
            category: categories[1].name,
            articles: res2.data.data,
          },
          {
            category: categories[2].name,
            articles: res3.data.data,
          },
        ];
      });
    }
  }
  // article: any = {
  //   type: 'TIỂU ĐƯỜNG',
  //   name: 'Trị bệnh tiểu đường tận gốc: Sự thật hay chỉ là lừa đảo?',
  //   image:
  //     'https://cdn.hellobacsi.com/wp-content/uploads/2023/08/tri-benh-tieu-duong-tan-goc.jpg?w=828&q=75',
  //   description: `Sự cố cháy nổ có thể xảy đến bất kỳ lúc nào. Do đó, bạn cần nắm vững
  //       những kỹ năng thoát khỏi đám cháy để bảo toàn tính mạng trong các trường
  //       hợp khẩn cấp. Nguyên nhân gây nên các hậu quả thương vong khi xảy ra
  //       cháy nổ thường là do nạn nhân thiếu`,
  //   author: {
  //     name: 'BS Hương',
  //     avatar:
  //       'https://cdn.hellobacsi.com/wp-content/uploads/2021/05/ThS_BS_Ngovongochuong-e1621912462949-150x150.jpg?w=32&q=75',
  //   },
  //   created_time: 'Tuần trước',
  // };
}
