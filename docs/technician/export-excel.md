# 3. Quản Lý Lịch Sử & Xuất File Excel

Mỗi khi tính toán xong một hạng mục độ xe hoặc cân chỉnh cho khách, kỹ thuật viên có thể gom nhiều phép tính khác nhau vào một phiên làm việc và trích xuất thành **file bảng tính Excel (.xlsx)** chuẩn chỉnh.

---

## 📸 Giao diện lưu trữ lịch sử & Nút xuất báo cáo Excel

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Lab • Lưu kết quả & Xuất file báo cáo kỹ thuật</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/technician/technician-excel.webp" alt="Giao diện nút xuất Excel và lưu lịch sử tính toán thực tế" />
  </div>
</div>

### Hướng dẫn chi tiết từng điểm chạm:

* <span class="step-badge">1</span> **Lưu kết quả phép tính vào phiên làm việc**:
  * Sau khi hoàn tất nhập các biến số cho một công cụ (ví dụ: `DM-001 Crawl Ratio` hoặc `DM-015 Áp suất lốp theo tải trục`), bấm nút **"LƯU VÀO DANH SÁCH BÁO CÁO"**.
  * Phép tính này sẽ được gom vào danh sách tạm thời của xe hiện tại. Bạn có thể tiếp tục chuyển sang công cụ khác để tính tiếp (ví dụ tính tời điện, độ nhô mâm ET...).

* <span class="step-badge">2</span> **Kiểm tra ngăn kéo danh sách tính toán (Calculation Drawer)**:
  * Mở ngăn danh sách các mục đã tính. Tại đây bạn có thể:
    * Xem lại giá trị đầu vào và kết quả đầu ra của từng phép tính.
    * Xóa bỏ các phép tính nháp hoặc tính nhầm bằng nút biểu tượng thùng rác.

* <span class="step-badge">3</span> **Bấm nút "XUẤT BÁO CÁO EXCEL"**:
  * Trình duyệt sẽ tự động tải xuống file có tên dạng:  
    `Bao_Cao_Ky_Thuat_[BienSoXe]_[NgayThang].xlsx`
  * Cấu trúc file Excel xuất ra bao gồm:
    * **Header**: Tên garage DeepM Lab, thời gian đo kiểm, tên khách hàng, dòng xe, biển số kiểm soát.
    * **Bảng dữ liệu chi tiết**: Mã công cụ, tên thuật toán, toàn bộ thông số đầu vào khách hàng cung cấp và kết quả kỹ thuật khuyến nghị.
    * **Phần chữ ký**: Chữ ký xác nhận của Cố vấn dịch vụ / Kỹ thuật viên trưởng và khách hàng.

---

::: tip 💡 Ứng dụng thực tế tại xưởng
* **Đính kèm hóa đơn dịch vụ**: In kèm file Excel vào hồ sơ bàn giao xe sau khi nâng cấp mâm lốp hoặc độ hệ thống treo.
* **Lưu trữ hồ sơ xe (Service History)**: Lưu file vào thư mục máy tính của xưởng theo biển số xe để dễ dàng tra cứu lại khi khách quay lại bảo dưỡng định kỳ.
:::
