import { Component } from '@angular/core';

@Component({
  selector: 'app-article-topics',
  templateUrl: './article-topics.component.html',
  styleUrls: ['./article-topics.component.scss'],
})
export class ArticleTopicsComponent {
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
}
