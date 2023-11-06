import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/admin/_services/article.service';
import { prefixApi } from 'src/app/core/constants/api.constant';
import { categoriesService } from '../../services/categories.service';
import { expertService } from '../../services/expert.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit {
  articles: any[] = [];
  category: any;
  nameCategory: any;
  categories: any[] = [];
  doctors: any[];
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private categoriesService: categoriesService,
    private expertService: expertService
  ) {}

  ngOnInit(): void {
    this.expertService.getDoctor().subscribe({
      next: ({ data }) => {
        console.log(data);
        // this.doctors = data.data;
        data.data.forEach((doctor: any) => {
          if (doctor.avatar) {
            doctor.avatar = prefixApi + '/' + doctor.avatar;
          }
        });
        this.doctors = data.data;
      },
    });
    this.route.params.subscribe((params) => {
      if (params['name']) {
        this.nameCategory = params['name'];
        // this.categories = JSON.parse(localStorage.getItem('categories')!);
        this.categoriesService.getCategories().subscribe({
          next: ({ data }) => {
            data.data.forEach((element: any) => {
              if (element.thumbnail) {
                element.thumbnail = prefixApi + '/' + element.thumbnail;
              }
            });
            this.categories = data.data;
            this.category = this.categories.find(
              (c: any) => c.name === this.nameCategory
            );
            console.log('categogies', this.categories);
          },
          error: (err) => {
            console.log('Error', err);
          },
        });

        this.articleService
          .getArticleByCategory({
            page: 1,
            name_category: this.nameCategory,
            paginate: 15,
          })
          .subscribe({
            next: ({ data }) => {
              console.log('article', data);
              data.data.forEach((article: any) => {
                if (article.thumbnail_article) {
                  article.thumbnail_article =
                    prefixApi + '/' + article.thumbnail_article;
                }
                if (article.avatar_user) {
                  article.avatar_user = prefixApi + '/' + article.avatar_user;
                }
              });
              this.articles = data.data;
            },
          });
      }
    });
  }
  // article: any = {
  //   name_category: 'TIỂU ĐƯỜNG',
  //   title: 'Trị bệnh tiểu đường tận gốc: Sự thật hay chỉ là lừa đảo?',
  //   thumbnail_article:
  //     'https://cdn.hellobacsi.com/wp-content/uploads/2023/08/tri-benh-tieu-duong-tan-goc.jpg?w=828&q=75',
  //   content: `Sự cố cháy nổ có thể xảy đến bất kỳ lúc nào. Do đó, bạn cần nắm vững
  //       những kỹ năng thoát khỏi đám cháy để bảo toàn tính mạng trong các trường
  //       hợp khẩn cấp. Nguyên nhân gây nên các hậu quả thương vong khi xảy ra
  //       cháy nổ thường là do nạn nhân thiếu`,
  //   name_user: 'BS Hương',
  //   avatar_user:
  //     'https://cdn.hellobacsi.com/wp-content/uploads/2021/05/ThS_BS_Ngovongochuong-e1621912462949-150x150.jpg?w=32&q=75',
  //   updated_at_article: '2023-11-04 21:18:39',
  // };
  // Doctor: any = {
  //   id: 1,
  //   email: 'bacsinguyen9@yopmail.com',
  //   username: 'bacsinguyen9',
  //   name: 'Bác sĩ Thanh Nguyên',
  //   phone: '0971456233',
  //   address: 'Tuyên Quang - Việt Nam',
  //   avatar: 'storage/image/avatars/doctors/653cc2dad846e.jpg',
  // };
}
