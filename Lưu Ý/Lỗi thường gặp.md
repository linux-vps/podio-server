# Các Lỗi Thường Gặp Khi Sử Dụng Podio API

## 1. Lỗi Khi Cài Đặt Icon Trong Request

### Vấn đề
Khi cố gắng cài đặt icon bằng cách sử dụng đường dẫn local, Sẽ gặp lỗi:
> "Icon must be of the format 'xxx.png'"

### Ví dụ lỗi
```typescript
{
    name: "Test app",
    item_name: "Test",
    icon: "../assets/like_4328380.png", // 
    // ... các cấu hình khác
}
```

### Giải pháp
Thay vì sử dụng file icon local, hãy sử dụng các icon mặc định của Podio:

```typescript
{
    name: "Test app",
    item_name: "Test",
    icon: "1.png", // từ 1 đến 416.png
    // ... các cấu hình khác
}
```

### Lưu ý
- Podio cung cấp 416 icon mặc định để lựa chọn
- Có thể xem và tìm kiếm icon tại: [Podio Icon Gallery](https://podio-icon.tiiny.site)
- Click vào icon để copy tên icon


