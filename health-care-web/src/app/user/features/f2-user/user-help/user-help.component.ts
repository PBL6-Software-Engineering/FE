import { Component } from '@angular/core';

@Component({
  selector: 'app-user-help',
  templateUrl: './user-help.component.html',
  styleUrls: ['./user-help.component.scss'],
})
export class UserHelpComponent {
  helps: any[] = [
    {
      id: 1,
      title: 'Elister là gì?',
      content: `Elister là một nền tảng chăm sóc sức khỏe trực tuyến. Chúng tôi cung cấp thông tin, công cụ và dịch vụ hỗ trợ sức khỏe - tất cả nội dung đều đã được tham vấn chuyên môn. Sứ mệnh của chúng tôi là giúp bạn và người thân lựa chọn các quyết định sáng suốt, từ đó sống khỏe mạnh và hạnh phúc hơn. Elister là công ty tư nhân thuộc sở hữu của Hello Health Group Pte. Ltd. và hoạt động tại Việt Nam.`,
    },
    {
      id: 2,
      title: 'Vì sao tôi nên đăng ký tài khoản?',
      content: `Đăng ký tài khoản thành viên ở Elister đem lại cho bạn nhiều lợi ích hơn như giúp bạn lưu trữ các thông tin sức khỏe cá nhân, đặt lịch khám với bác sĩ, tham gia các cộng đồng sức khỏe của Elister cũng như hỗ trợ Elister cá nhân hóa trải nghiệm sử dụng nền tảng của bạn.`,
    },
    {
      id: 3,
      title: 'Đăng ký ở Elister có mất phí không?',
      content:
        'Miễn phí và luôn luôn miễn phí! Tuy nhiên, một số dịch vụ giúp bạn kết nối với bên thứ ba có thể tính phí nhất định cho bạn. Để biết thêm thông tin, vui lòng xem thêm tại chính sách Quảng cáo & Tài trợ của chúng tôi.',
    },
    {
      id: 4,
      title:
        'Nếu tôi có thắc mắc liên quan đến sức khỏe, làm thế nào để đặt câu hỏi?',
      content:
        'Sử dụng Elister không thay thế cho việc khám bệnh cùng một chuyên gia y tế. Chúng tôi không cung cấp các chẩn đoán, lời khuyên hay điều trị y khoa. Hãy luôn luôn tham vấn ý kiến bác sĩ hoặc chuyên gia - những người có chuyên môn và thẩm quyền.',
    },
  ];

  constructor() {}
}
