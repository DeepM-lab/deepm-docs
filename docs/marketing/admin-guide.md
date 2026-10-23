# 3. Hướng Dẫn Dành Cho Quản Trị Viên (Admin)

Trang hướng dẫn này dành riêng cho **Quản trị viên (Admin)** để quản lý toàn diện luồng dữ liệu truyền thông, danh mục khai báo và cấu hình hệ thống trên nền tảng **DeepM AutoERP**.

---

## 🔐 1. Tài khoản Quản trị viên chính thức

Để truy cập vào các tính năng quản trị cấp cao trên hệ thống, bạn phải đăng nhập bằng tài khoản Admin đã được cấp quyền:

* **Tài khoản Admin chính thức**: Sử dụng tài khoản Email Quản trị viên được cấp quyền trong cơ sở dữ liệu hệ thống (liên hệ bộ phận kỹ thuật nếu cần cấp mới hoặc nâng cấp quyền Super Admin).
* **Cổng đăng nhập**: [https://deepm.autoerp.vn/auth/login](https://deepm.autoerp.vn/auth/login)

::: tip 🔑 Lưu ý phân quyền hệ thống
Hệ thống sử dụng cơ chế xác thực bảo mật và phân quyền vai trò (Role-based access). Tài khoản có vai trò `admin` mới hiển thị đầy đủ các nút chức năng quản trị, xuất báo cáo tổng và tab khai báo danh mục.
:::

---

## 📊 2. Dashboard Báo Cáo & Thống Kê Tổng Quan

Sau khi đăng nhập với quyền Admin, hãy truy cập vào menu **Marketing > Báo cáo** tại đường dẫn [https://deepm.autoerp.vn/marketing_report/listing/](https://deepm.autoerp.vn/marketing_report/listing/).

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Marketing Tracker • Danh sách bài đăng & Dashboard Báo cáo</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/marketing/marketing-dashboard.png" alt="Giao diện Dashboard Báo cáo Admin thực tế" />
  </div>
</div>

### Các tính năng trọng tâm của Dashboard Admin:

* <span class="step-badge">1</span> **Thẻ chỉ số tổng hợp toàn đội ngũ**:
  * **Tổng bài đăng**: Số lượng nội dung đã sản xuất và phân phối của toàn bộ nhân viên.
  * **Tổng Likes, Bình luận, Lượt share, Lượt xem**: Số liệu cộng dồn toàn thời gian thực của mọi bài viết trên mọi kênh.

* <span class="step-badge">2</span> **Bộ chọn mốc thời gian linh hoạt (Time Presets)**:
  * Lọc nhanh danh sách bài viết theo khoảng ngày tùy chọn để kiểm tra tiến độ chiến dịch ngắn hạn hoặc báo cáo định kỳ tuần/tháng/quý.

* <span class="step-badge">3</span> **Lọc đa chiều theo Nhân viên & Kênh đăng**:
  * Dropdown **Nhân viên**: Lọc riêng bài viết của một nhân sự cụ thể để đánh giá KPI hoặc chọn `Tất cả (n người)`.
  * Dropdown **Kênh đăng**: Lọc riêng bài Facebook, Website, TikTok, YouTube... để so sánh độ hiệu quả giữa các kênh truyền thông.

* <span class="step-badge">4</span> **Xuất báo cáo tổng hợp ra Excel (.xlsx)**:
  * Bấm nút **"Xuất Excel"** (nút màu xanh dương) ở góc phải thanh công cụ.
  * File Excel tải về sẽ chứa đầy đủ tên nhân viên, kênh, URL, ngày giờ đăng, phân loại nội dung và toàn bộ 4 chỉ số tương tác phục vụ báo cáo ban giám đốc.

---

## ⚙️ 3. Quản Lý Danh Mục Khai Báo & Cấu Hình Hệ Thống

Để quản lý các danh mục danh sách hoặc cấu hình tài khoản, chuyển sang tab **Khai báo** hoặc bấm vào icon **Cài đặt** ở góc trên bên phải màn hình AutoERP.

::: info 🛠️ Các nghiệp vụ quản trị danh mục
Admin có toàn quyền quản trị và bổ sung các trường thông tin chuẩn hóa cho toàn đội ngũ Marketing:
:::

### Các thao tác quản trị chính:

* <span class="step-badge">1</span> **Khai báo Kênh đăng & Định dạng nội dung mới**:
  * Thêm mới các kênh truyền thông chính thức của công ty (Ví dụ: Fanpage mới, Kênh TikTok vệ tinh, Kênh Threads...).
  * Chuẩn hóa danh mục định dạng: *Video ngắn*, *Bài viết & Hình ảnh*, *Blog chia sẻ kiến thức*, *Livestream*...

* <span class="step-badge">2</span> **Tạo và quản lý Chiến dịch (Campaign)**:
  * Khai báo tên chiến dịch truyền thông mới (Ví dụ: `Chiến dịch Ra mắt DeepM Lab 2026`, `Kỹ thuật lốp Offroad Q4`).
  * Giúp nhân viên dễ dàng gắn nhãn bài đăng vào đúng chiến dịch khi nộp báo cáo.

* <span class="step-badge">3</span> **Quản trị người dùng & Phân quyền**:
  * Quản lý danh sách nhân sự tham gia hệ thống, cấp mới tài khoản hoặc điều chỉnh quyền hạn khi có biến động nhân sự.


