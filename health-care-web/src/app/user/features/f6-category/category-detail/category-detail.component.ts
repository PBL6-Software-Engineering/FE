import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/admin/_services/article.service';
import { prefixApi } from 'src/app/core/constants/api.constant';

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
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['name']) {
        this.nameCategory = params['name'];
        this.categories = JSON.parse(localStorage.getItem('categories')!);
        this.category = this.categories.find((c: any) => c.name === this.nameCategory);
        this.articleService
          .getArticleByCategory({
            page: 1,
            name_category: this.nameCategory,
            paginate: 15,
          })
          .subscribe({
            next: ({ data }) => {
              console.log(data);
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
  article: any = {
    type: 'TIỂU ĐƯỜNG',
    name: 'Trị bệnh tiểu đường tận gốc: Sự thật hay chỉ là lừa đảo?',
    image:
      'https://cdn.hellobacsi.com/wp-content/uploads/2023/08/tri-benh-tieu-duong-tan-goc.jpg?w=828&q=75',
    description: `Sự cố cháy nổ có thể xảy đến bất kỳ lúc nào. Do đó, bạn cần nắm vững
        những kỹ năng thoát khỏi đám cháy để bảo toàn tính mạng trong các trường
        hợp khẩn cấp. Nguyên nhân gây nên các hậu quả thương vong khi xảy ra
        cháy nổ thường là do nạn nhân thiếu`,
    author: {
      name: 'BS Hương',
      avatar:
        'https://cdn.hellobacsi.com/wp-content/uploads/2021/05/ThS_BS_Ngovongochuong-e1621912462949-150x150.jpg?w=32&q=75',
    },
    created_time: 'Tuần trước',
  };
  articleTop: any = {
    type: 'Sơ cứu & Phòng ngừa',
    name: 'Biết trước khi cần: 8 kỹ năng thoát khỏi đám cháy',
    image:
      'https://cdn.hellobacsi.com/wp-content/uploads/2022/11/ky-nang-thoat-khoi-dam-chay_1383452480.jpg?w=828&q=75',
    description: `Sự cố cháy nổ có thể xảy đến bất kỳ lúc nào. Do đó, bạn cần nắm vững những
    kỹ năng thoát khỏi đám cháy để bảo toàn tính mạng trong các trường hợp khẩn
    cấp. Nguyên nhân gây nên các hậu quả thương vong khi xảy ra cháy nổ thường
    là do nạn nhân thiếu`,
    author: {
      name: 'Đài Trương',
      avatar:
        'https://cdn.hellobacsi.com/wp-content/uploads/2021/02/noel2-scaled-150x150.jpg?w=32&q=75',
    },
    created_time: 'Tuần trước',
  };
  articleLeft: any = {
    type: 'TIỂU ĐƯỜNG',
    name: 'Trị bệnh tiểu đường tận gốc: Sự thật hay chỉ là lừa đảo?',
    image:
      'https://cdn.hellobacsi.com/wp-content/uploads/2023/08/tri-benh-tieu-duong-tan-goc.jpg?w=828&q=75',
    description: `Sự cố cháy nổ có thể xảy đến bất kỳ lúc nào. Do đó, bạn cần nắm vững
        những kỹ năng thoát khỏi đám cháy để bảo toàn tính mạng trong các trường
        hợp khẩn cấp. Nguyên nhân gây nên các hậu quả thương vong khi xảy ra
        cháy nổ thường là do nạn nhân thiếu`,
    author: {
      name: 'BS Hương',
      avatar:
        'https://cdn.hellobacsi.com/wp-content/uploads/2021/05/ThS_BS_Ngovongochuong-e1621912462949-150x150.jpg?w=32&q=75',
    },
    created_time: 'Tuần trước',
  };
  Doctor: any = {
    id: 1,
    email: 'bacsinguyen9@yopmail.com',
    username: 'bacsinguyen9',
    name: 'Bác sĩ Thanh Nguyên',
    phone: '0971456233',
    address: 'Tuyên Quang - Việt Nam',
    avatar: 'storage/image/avatars/doctors/653cc2dad846e.jpg',
  };
}
