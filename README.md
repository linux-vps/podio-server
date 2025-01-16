# Podio API

ứng dụng TypeScript để tương tác với Podio API

## Tính năng chính

### Xác thực (Authentication)
- Xác thực tự động với Podio API
- Quản lý và làm mới token
- Lưu trữ token trong file JSON 
- Refresh token

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

### Quản lý Files
- **Upload và Quản lý Files**
  - Upload file lên Podio
  - Attach file vào item
  - Lấy danh sách files
  - Cập nhật thông tin file
  - Xóa file

### Quản lý Organizations
- **Thao tác với Organizations**
  - Lấy danh sách organizations
  - Lấy thông tin chi tiết organization
  - Tạo organization mới
  - Lấy danh sách spaces trong organization

### Quản lý Applications
- **Quản lý Ứng dụng**
  - Tạo ứng dụng mới
  - Cập nhật thông tin ứng dụng
  - Lấy thông tin ứng dụng
  - Xóa ứng dụng
  - Kích hoạt/Vô hiệu hóa ứng dụng
  - Cài đặt ứng dụng vào space

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

### Tạo file `.env` từ file `.env.example` và điền các thông tin:

```env
PODIO_CLIENT_ID=your_client_id
PODIO_CLIENT_SECRET=your_client_secret
PODIO_USER=your_username
PODIO_PASSWORD=your_password
```

## Sử dụng

### 1. Khởi tạo Podio client

```typescript
import { Podio } from "./APIs/podioAPI";
import { config } from 'dotenv';

config();

const pd = new Podio({
  clientId: <string>process.env.PODIO_CLIENT_ID,
  clientSecret: <string>process.env.PODIO_CLIENT_SECRET,
  username: <string>process.env.PODIO_USER,
  password: <string>process.env.PODIO_PASSWORD
}, "./podio_token.json");
```

### 2. Làm việc với Items

```typescript
// Lấy danh sách items
const items = await pd.Items.FilterItems(appId);

// Lấy thông tin chi tiết item
const item = await pd.Items.GetItem(itemId);

// Tạo item mới
const newItem = await pd.Items.addItem(appId, {
  external_id: "item-001",
  fields: [
    {
      external_id: "title",
      values: [{ value: "New Item" }]
    }
  ]
});
```

### 3. Quản lý Files

```typescript
// Upload file
const uploadResult = await pd.Files.uploadFile("/path/to/file.txt", "file.txt");

// Attach file vào item
const attachResult = await pd.Files.attachFile(uploadResult.file_id, "item", itemId);

// Lấy danh sách files của item
const files = await pd.Files.getFiles("item", itemId);

// Cập nhật mô tả file
await pd.Files.updateFile(fileId, "Mô tả mới");

// Xóa file
await pd.Files.deleteFile(fileId);
```

### 4. Quản lý Organizations

```typescript
// Lấy danh sách organizations
const orgs = await pd.Organizations.getOrganizations();

// Lấy thông tin chi tiết organization
const org = await pd.Organizations.getOrganization(orgId);

// Tạo organization mới
const newOrg = await pd.Organizations.addOrganization({
  name: "My Organization",
  url: "https://myorg.com"
});

// Lấy danh sách spaces
const spaces = await pd.Organizations.getOrganizationSpaces(orgId);
```

### 5. Quản lý Applications

```typescript
// Tạo ứng dụng mới
const appConfig = {
  space_id: spaceId,
  config: {
    name: "My App",
    item_name: "Item",
    description: "Description",
    fields: [
      {
        type: "text",
        external_id: "title",
        config: {
          label: "Title",
          required: true
        }
      }
    ]
  }
};

const newApp = await pd.Applications.addApp(appConfig);

// Cập nhật ứng dụng
await pd.Applications.updateApp(appId, {
  config: {
    description: "New description"
  }
});

// Lấy thông tin ứng dụng
const app = await pd.Applications.getApp(appId);

// Lấy danh sách ứng dụng trong space
const apps = await pd.Applications.getApps(spaceId);
```

## Cấu trúc dự án

```
├── src/
│   ├── APIs/           # API implementations
│   │   ├── Methods/    # Các class implementation cho từng API
│   │   │   ├── Items.ts
│   │   │   ├── Files.ts
│   │   │   ├── Organizations.ts
│   │   │   ├── Applications.ts
│   │   │   └── Webhooks.ts
│   │   └── podioAPI.ts # Class Podio chính
│   ├── interfaces/     # TypeScript interfaces
│   ├── types/         # TypeScript types
│   ├── Services/      # Shared services
│   └── app.ts         # File chương trình chính
```

## Các bước phát triển

1. **Thêm Interface mới**
   - Định nghĩa interface trong `interfaces/podio_interfaces.ts`
   - Thêm interface vào `IPodio`

2. **Thêm Types**
   - Thêm các type cần thiết vào `types/podio_types.ts`

3. **Implement API**
   - Tạo file mới trong `APIs/Methods/`
   - Implement các phương thức từ interface
   - Sử dụng các type đã định nghĩa

4. **Cập nhật Podio class**
   - Import class mới trong `podioAPI.ts`
   - Thêm instance vào constructor

5. **Testing**
   - Thêm code test vào `app.ts`
   - Kiểm tra các trường hợp sử dụng

## Tài liệu tham khảo
- [Podio API Documentation](https://developers.podio.com/doc)
- [Podio JS SDK](https://github.com/podio/podio-js)
- [Node PodioSDK](https://github.com/1King-coder/Node-PodioSDK)
- Claude 3.5 Sonnet