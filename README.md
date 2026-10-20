# DeepM Docs 📚

Trung tâm tài liệu và hướng dẫn sử dụng chính thức của hệ sinh thái **DeepM Tools**.

## 🚀 Công nghệ sử dụng
* **Framework**: [VitePress](https://vitepress.dev/)
* **Package Manager**: `pnpm`
* **Kiến trúc**: Role-Based Hub (3 vai trò: Khách hàng, Thợ máy & Kỹ thuật, Marketing & Quản trị)
* **Hình ảnh & Trực quan**: Ảnh chụp thực tế từ hệ thống, tối ưu định dạng `.webp`

## 🛠️ Cài đặt & Phát triển cục bộ

```bash
# Cài đặt thư viện
pnpm install

# Khởi chạy server phát triển
pnpm run docs:dev

# Đóng gói bản phát hành tĩnh (Production Build)
pnpm run docs:build

# Xem trước bản phát hành
pnpm run docs:preview
```

## 🌐 Triển khai
Trang web tĩnh 100%, sẵn sàng triển khai tự động lên Vercel, Netlify hoặc GitHub Pages.
