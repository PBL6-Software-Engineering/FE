import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/admin/_services/article.service';
import { ExpertService } from '../../../services/expert.service';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-expert-detail',
  templateUrl: './expert-detail.component.html',
  styleUrls: ['./expert-detail.component.scss'],
})
export class ExpertDetailComponent implements OnInit {
  articles: any[] = [];
  doctor: any;
  id: any;
  categories: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private expertService: ExpertService,
    private articleService: ArticleService,
    private el: ElementRef,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.expertService.getDoctorById(this.id).subscribe({
          next: ({ data }) => {
            this.el.nativeElement.querySelector('#information').innerHTML =
              data.infor_extend.information;
            this.doctor = data;
            this.articleService
              .getArticleOutStandingPublic({
                page: 1,
                paginate: 20,
                search: this.doctor.name,
                sortLatest: true,
                sort_search_number: true,
              })
              .subscribe({
                next: ({ data }) => {
                  this.articles = data.data;
                },
              });
          },
        });
      }
    });
  }

  article: any = {
    name_category: 'TIỂU ĐƯỜNG',
    title: 'Trị bệnh tiểu đường tận gốc: Sự thật hay chỉ là lừa đảo?',
    thumbnail_article:
      'https://cdn.hellobacsi.com/wp-content/uploads/2023/08/tri-benh-tieu-duong-tan-goc.jpg?w=828&q=75',
    content: `Sự cố cháy nổ có thể xảy đến bất kỳ lúc nào. Do đó, bạn cần nắm vững
        những kỹ năng thoát khỏi đám cháy để bảo toàn tính mạng trong các trường
        hợp khẩn cấp. Nguyên nhân gây nên các hậu quả thương vong khi xảy ra
        cháy nổ thường là do nạn nhân thiếu`,
    name_user: 'BS Hương',
    avatar_user:
      'https://cdn.hellobacsi.com/wp-content/uploads/2021/05/ThS_BS_Ngovongochuong-e1621912462949-150x150.jpg?w=32&q=75',
    updated_at_article: '2023-11-04 21:18:39',
  };
}
