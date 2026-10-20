# 3. Cảnh Báo Sai Số Đồng Hồ Tốc Độ (Speedometer Error)

Một trong những hệ quả nguy hiểm nhất khi thay đổi kích thước lốp xe mà nhiều chủ xe không chú ý chính là **sai lệch đồng hồ đo tốc độ (Công-tơ-mét / ODO)**.

---

## 📸 Giao diện bảng đối chiếu sai số tốc độ thực tế

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Lab • Bảng cảnh báo sai số đồng hồ tốc độ xe</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/customer/customer-speedometer.webp" alt="Giao diện bảng sai số đồng hồ tốc độ thực tế" />
  </div>
</div>

### Hướng dẫn chi tiết từng điểm chạm:

* <span class="step-badge">1</span> **Xem ô tốc độ thực ở mốc 100 km/h**:
  * Khi kim đồng hồ xe báo **100 km/h**, tốc độ xe chạy thực tế trên đường đo bằng GPS là **103.9 km/h** (Chạy nhanh hơn ODO báo 3.9 km/h).

* <span class="step-badge">2</span> **Đối chiếu bảng các dải tốc độ thường gặp**:
  * Kiểm tra ở các mốc tốc độ giới hạn thông dụng tại Việt Nam (40 km/h trong đô thị, 60 km/h đường đôi, 80 - 100 - 120 km/h trên cao tốc).

* <span class="step-badge">3</span> **Đọc thông báo cảnh báo tiêu chuẩn kỹ thuật**:
  * **CẢNH BÁO**: Sai số vượt ngưỡng **±3%** tiêu chuẩn kiểm định an toàn kỹ thuật phương tiện. Khi bánh xe to hơn, xe sẽ tăng tốc lì hơn và tiêu thụ nhiên liệu trong phố có thể tăng nhẹ.

---

## 📊 Bảng đối chiếu tốc độ hiển thị và tốc độ thực tế

Ví dụ trường hợp nâng từ cỡ `205/55R16` lên cỡ `225/50R17` (Đường kính tăng **+3.94%**):

| Tốc độ hiển thị trên ODO | Tốc độ chạy thực tế (GPS) | Chênh lệch thực tế | Nguy cơ bắn tốc độ |
| :---: | :---: | :---: | :--- |
| **40 km/h** | **41.6 km/h** | **+1.6 km/h** | Có thể bị phạt nếu chạy sát vạch 40 km/h |
| **60 km/h** | **62.4 km/h** | **+2.4 km/h** | Cực kỳ dễ dính lỗi quá tốc độ trong khu dân cư |
| **80 km/h** | **83.2 km/h** | **+3.2 km/h** | Quá tốc độ tối đa cho phép trên quốc lộ |
| **100 km/h** | **103.9 km/h** | **+3.9 km/h** | Vượt ngưỡng 100 km/h trên cao tốc |
| **120 km/h** | **124.7 km/h** | **+4.7 km/h** | Vi phạm khung phạt quá tốc độ cao tốc |

---

## ⚖️ Quy định đăng kiểm & Tiêu chuẩn kỹ thuật

> [!CAUTION] 🚨 NGUY CƠ BỊ TỪ CHỐI ĐĂNG KIỂM
> Theo tiêu chuẩn kiểm định an toàn kỹ thuật xe cơ giới hiện hành tại Việt Nam:
> * Xe phải sử dụng đúng kích cỡ lốp ghi trong **Giấy chứng nhận kiểm định** (Sổ đăng kiểm).
> * Mức sai lệch kích thước lốp ngoài dải cho phép (thường quy ước không vượt quá **±3%**) sẽ làm thay đổi tỷ số truyền lực, ảnh hưởng đến độ bám đường, khoảng cách phanh và sai lệch đồng hồ hiển thị.
> * Hãy luôn kiểm tra kỹ công cụ DeepM trước khi quyết định thay mâm lốp để tránh bị từ chối đăng kiểm.

---

::: tip 🔗 Tra cứu sai số thực tế
Truy cập [DeepM Toolbox Engineering](https://toolbox-engineering.vercel.app/) để tính toán sai số ODO cho cỡ lốp dự kiến của bạn.
:::
