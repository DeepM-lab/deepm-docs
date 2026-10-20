# 1. Bộ Công Cụ Tính Toán (Mechanic Tools)

Phần mềm **DeepM Engineering Toolbox** tổng hợp 135 công thức tính toán cơ khí ô tô thực nghiệm được chuẩn hóa vào giao diện trực quan, giúp kỹ thuật viên garage loại bỏ việc phải bấm máy tính tay hoặc nhớ công thức phức tạp.

---

## 📸 Giao diện thực tế bộ công cụ kỹ thuật

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Lab • Automotive Engineering Toolbox (135 Công Thức)</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/technician/technician-tools.webp" alt="Giao diện bộ công cụ thợ máy và kỹ thuật thực tế" />
  </div>
</div>

### Hướng dẫn chi tiết từng điểm chạm:

* <span class="step-badge">1</span> **Nhập Hồ sơ xe & Báo cáo kỹ thuật (Garage Client Record)**:
  * Điền thông tin khách hàng vào thanh hồ sơ đầu trang:
    * **Chủ xe / Khách hàng**: Ví dụ `Anh ABC - DeepM`.
    * **Dòng xe & Động cơ**: Ví dụ `Mitsubishi Triton 4N15 / Land Cruiser LC80`.
    * **Biển số kiểm soát**: Ví dụ `30K-888.88`.
  * Các thông tin này sẽ được tự động đồng bộ vào đầu file Excel khi bạn xuất báo cáo.

* <span class="step-badge">2</span> **Chọn Chuyên đề kỹ thuật hoặc Tìm kiếm mã Tool**:
  * Bấm vào 12 tab chuyên đề (hoặc gõ mã `DM-001` vào ô tìm kiếm nhanh):
    * `01. OFF-ROAD & 4X4`: Tỷ số truyền bò, độ dốc tới hạn, lực kéo tời tời cứu hộ.
    * `02. CAR AUDIO & SPL`: Độ nhạy loa, thể tích thùng sub hơi, công suất ampli RMS.
    * `03. CAMPING & RV`: Công suất sạc tấm pin năng lượng mặt trời, tủ lạnh 12V.
    * `04. PERFORMANCE & TUNING`: Tỷ số nén, thể tích buồng đốt, lưu lượng kim phun nhiên liệu.
    * `05. DRIFT & RACING`: Góc Camber, Toe-out, phân bổ áp suất lốp theo nhiệt độ mặt đường.
    * `06. WHEEL FITMENT`: Độ nhô mâm Offset (ET), khoảng cách lòng phuộc và mép vè.

* <span class="step-badge">3</span> **Vận hành bàn tính (Calculator)**:
  * Chọn công cụ cần tính ở cột danh sách bên trái (Ví dụ: `[DM-001] Crawl ratio tổng`).
  * Nhập các thông số đầu vào: Tỷ số truyền số 1 hộp số chính, tỷ số truyền số chậm (4L) hộp số phụ, tỷ số truyền cầu sau (Final drive).
  * Hệ thống tính toán trả về ngay **Tỷ số truyền bò tổng thể** kèm phân tích khả năng vượt dốc đá và ghềnh lở mà không cần đệm côn hay ngắt máy.

---

## 🔬 Chế độ Kiểm thử Nghiệm chứng (Verification Mode)

Trên thanh công cụ phía trên bên phải, bạn có thể chuyển đổi giữa:
* **Bàn tính (135)**: Dành cho kỹ thuật viên nhập dữ liệu thực tế tại xưởng.
* **Nghiệm chứng (12)**: Dành cho việc đối chiếu với 12 case study xe thực nghiệm đã được kỹ sư DeepM Lab đo kiểm trên đường chạy thực tế.
