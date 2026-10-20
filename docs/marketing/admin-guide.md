# 3. Quản Trị Viên & Phân Quyền (/admin/staff)

Trang hướng dẫn này dành riêng cho **Quản trị viên (Admin)** để quản lý toàn diện luồng dữ liệu truyền thông và phân quyền nhân sự nội bộ.

---

## 🔐 1. Tài khoản Quản trị viên chính thức

Để truy cập vào các khu vực quản trị tối cao (`/admin` và `/admin/staff`), bạn phải đăng nhập bằng tài khoản Admin đã được cấp quyền trong hệ thống cơ sở dữ liệu:

* **Tài khoản Admin chính thức**: `vuonghongky26@gmail.com`
* **Cổng đăng nhập**: [https://marketing-tracker-navy.vercel.app/login](https://marketing-tracker-navy.vercel.app/login)

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Marketing Tracker • Cổng đăng nhập Admin</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/marketing/admin-login.webp" alt="Giao diện đăng nhập Admin thực tế" />
  </div>
</div>

---

## 📊 2. Dashboard Báo Cáo & Thống Kê Tổng Quan (/admin)

Sau khi đăng nhập với quyền Admin, hãy truy cập vào mục **Báo cáo & Thống kê** tại đường dẫn `/admin`.

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Marketing Tracker • Dashboard Báo Cáo & Thống Kê Tổng Hợp</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/marketing/admin-dashboard.webp" alt="Giao diện Dashboard Admin thực tế" />
  </div>
</div>

### Các tính năng trọng tâm của Dashboard Admin:

* <span class="step-badge">1</span> **Thẻ chỉ số tổng hợp toàn đội ngũ**:
  * **Tổng bài đăng**: Số lượng nội dung đã sản xuất và phân phối.
  * **Tổng Likes, Bình luận, Lượt share, Lượt xem**: Số liệu cộng dồn toàn thời gian thực của mọi bài viết trên mọi kênh.

* <span class="step-badge">2</span> **Bộ chọn mốc thời gian linh hoạt (Time Presets)**:
  * Lọc nhanh chỉ với 1 click chuột:
    * `Tất cả`: Xem toàn bộ lịch sử từ trước đến nay.
    * `Hôm nay` / `Hôm qua`: Theo dõi tiến độ nội dung hàng ngày.
    * `Tuần này` / `Tháng này` / `Quý này` / `Năm nay`: Dành cho các buổi báo cáo định kỳ tuần/tháng/quý của phòng Marketing.
  * *Tùy chọn khoảng ngày*: Chọn từ ngày - đến ngày cụ thể để kiểm tra hiệu quả một chiến dịch ngắn hạn.

* <span class="step-badge">3</span> **Lọc đa chiều theo Nhân viên & Kênh đăng**:
  * Dropdown **Nhân viên**: Lọc riêng bài viết của một nhân sự cụ thể để đánh giá KPI.
  * Dropdown **Kênh đăng**: Lọc riêng bài TikTok, Facebook hoặc YouTube để so sánh độ hiệu quả giữa các kênh.

* <span class="step-badge">4</span> **Xuất báo cáo tổng hợp ra Excel (.xlsx)**:
  * Bấm nút **"Xuất Excel"** màu xanh lá ở góc trên bên phải hoặc thanh danh sách bài đăng.
  * File Excel tải về sẽ chứa đầy đủ tên nhân viên, email, kênh, URL, ngày giờ đăng, phân loại nội dung và toàn bộ 4 chỉ số tương tác.

---

## 👥 3. Quản Lý Nhân Sự & Phân Quyền (/admin/staff)

Chuyển sang tab **Quản lý nhân sự** ở góc trên bên trái màn hình hoặc truy cập đường dẫn `/admin/staff`.

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Marketing Tracker • Quản Lý Nhân Sự & Cấp Quyền (/admin/staff)</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/marketing/admin-staff.webp" alt="Giao diện quản lý nhân sự và phân quyền thực tế" />
  </div>
</div>

### Các thao tác nghiệp vụ dành cho Admin:

* <span class="step-badge">1</span> **Thêm nhân viên mới**:
  * Bấm nút **"+ Thêm nhân viên mới"** ở góc phải màn hình.
  * Điền thông tin:
    * **Họ và tên**: Ví dụ `Nguyễn Văn Minh (Content Lead)`.
    * **Email công việc**: Email đăng nhập của nhân sự.
    * **Mật khẩu khởi tạo**: Mật khẩu mặc định cấp cho nhân viên đăng nhập lần đầu.
    * **Vai trò (Role)**: Chọn `staff` (Nhân viên) hoặc `admin` (Quản trị viên).

* <span class="step-badge">2</span> **Phân quyền và Nâng quyền tài khoản**:
  * Khi có nhân sự được thăng chức hoặc chuyển giao nhiệm vụ quản lý, Admin có thể trực tiếp chuyển vai trò từ `staff` lên `admin`.
  * Tài khoản có quyền `admin` mới có thể nhìn thấy nút truy cập Dashboard và danh sách nhân sự.

* <span class="step-badge">3</span> **Xóa tài khoản khi nhân sự nghỉ việc**:
  * Khi nhân viên nghỉ việc, Admin bấm biểu tượng thùng rác để thu hồi quyền truy cập. Hệ thống áp dụng cơ chế xóa an toàn (Admin không thể tự xóa chính mình).
