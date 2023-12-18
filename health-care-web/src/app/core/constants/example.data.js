// cấu trúc conversation API
const conversation = {
  "_id": "6571f59f62b0462ed00730e5",
  "conversationId": "conversationId_6_5",
  "admin": {
    "id": "5",
    "name": "Bệnh viện Việt Pháp",
    "avatar": "https://vanmanh.azurewebsites.net/storage/image/avatars/hospitals/6557c084e3344.jpg",
  },
  "user": {
    "id": "6",
    "name": "Nguyễn Thị Khánh Linh",
    "avatar": "https://vanmanh.azurewebsites.net/storage/image/avatars/users/khanh_linh_user_1700630583.jpg",
  },
  "countMessageUnread": "0",
  "createdAt": "1701967263000",
  "lastMessage": "Tôi muốn tư vấn dịch vụ về làm đẹp",
}

// cấu trúc tin nhắn API
const msg = {
  "_id": "6561abc7eacd918303354ef3",
  "conversationId": "conversationId_6_2",
  "userId": "6",
  "adminId": "2",
  "isUserSend": true,
  "message": "hello",
  "createdAt": "1700899783149",
}

// cấu trúc message khi send và nhận socket
const msgSocket = {
    user: this.conversation.user,
    admin: this.conversation.admin,
    conversationId: this.conversation.conversationId,
    message: this.message,
    isUserSend: true,
};

// Có mảng messages để lưu tin nhắn
// Khi gửi thì push msgSocket vào mảng messages
// Khi nhận thì cần kiểm tra msg có conversationId trùng với conversationId của conversation hiện tại không
// Nếu đÚng thì push msgSocket nhận về vào mảng messages

// link socket: 'https://backend-chat-socket-production.up.railway.app/'
// send message với key là: socket.send('messsage', msgSocket);