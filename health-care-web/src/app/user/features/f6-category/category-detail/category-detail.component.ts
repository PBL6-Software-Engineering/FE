import { Component } from '@angular/core';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent {
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
  categories: any = {
    id: 8,
    name: 'Ung thư - Ung bướu',
    thumbnail:
      'storage/image/thumbnail/categories/Cancer_category_1698507243.png',
    search_number: 0,
    created_at: '2023-10-28T08:10:52.000000Z',
    updated_at: '2023-10-28T15:34:04.000000Z',
  };
}
