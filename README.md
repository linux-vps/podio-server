# Podio API

ứng dụng TypeScript để tương tác với Podio API, cung cấp các phương thức đơn giản và mạnh mẽ để làm việc với Podio.

## Tính năng chính

### Xác thực (Authentication)
- Xác thực tự động với Podio API
- Quản lý và làm mới token
- Lưu trữ token an toàn trong file JSON

### Quản lý Items
- **Thêm và Sửa Items**
  - Tạo item mới với các trường tùy chỉnh
  - Cập nhật thông tin item
  - Cập nhật giá trị các trường
  - Sao chép item

- **Truy vấn Items**
  - Lấy thông tin chi tiết item
  - Tìm kiếm items theo bộ lọc
  - Lấy items theo view
  - Tìm kiếm items có thể tham chiếu
  - Xuất items ra file Excel

- **Quản lý phiên bản**
  - Xem lịch sử các phiên bản của item
  - Xem sự khác biệt giữa các phiên bản
  - Khôi phục về phiên bản cũ

### Webhooks
- Tạo webhook mới
- Lấy danh sách webhooks
- Xóa webhook
- Xác thực webhook

## Cài đặt

```bash
npm install
```

## Cấu hình

Tạo file `.env` từ file `.env.example` và điền các thông tin:

```env
PODIO_CLIENT_ID=your_client_id
PODIO_CLIENT_SECRET=your_client_secret
PODIO_USER=your_username
PODIO_PASSWORD=your_password
```

## Sử dụng

```typescript
// Khởi tạo Podio client
const podio = new Podio({
  clientId: process.env.PODIO_CLIENT_ID,
  clientSecret: process.env.PODIO_CLIENT_SECRET,
  username: process.env.PODIO_USER,
  password: process.env.PODIO_PASSWORD
}, "./podio_token.json"); // lưu trữ token trong file JSON

// Làm việc với Items
const items = await podio.Items.FilterItems(appId);
const item = await podio.Items.GetItem(itemId);

// Tạo item mới
const newItem = await podio.Items.addItem(appId, {
  external_id: "item-001",
  fields: [
    {
      external_id: "title",
      values: [{ value: "New Item" }]
    }
  ]
});

// Làm việc với Webhooks
const webhooks = await podio.Webhooks.GetWebhooks(appId);
```

## Công nghệ sử dụng

- Node.js
- TypeScript
- Axios cho HTTP requests
- dotenv để quản lý biến môi trường

## Cấu trúc dự án

```
├── src/
│   ├── APIs/           # API implementations
│   ├── interfaces/     # TypeScript interfaces
│   ├── types/          # TypeScript types
│   ├── Services/       # Shared services
│   └── app.ts          # File chương trình chính
├── .env                # File cấu hình
├── .env.example        # Mẫu file cấu hình
├── package.json        # Quản lý dependencies
├── tsconfig.json       # Cấu hình TypeScript
└── README.md           # Tài liệu dự án
```
## Tài liệu
Claude 3.5 Sonnet
https://github.com/podio/podio-js
https://github.com/1King-coder/Node-PodioSDK