# 1. Đọc & Giải Mã Thông Số Lốp Xe

Tính năng **Smart Tire Decoder** của DeepM Lab giúp bóc tách và phân tích tức thì chuỗi ký tự trên hông lốp xe của bạn chỉ trong vài giây.

---

## 📸 Giao diện thực tế & Các bước thao tác

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Lab • Smart Extractor & Fitment Decoder</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/customer/customer-decoder.webp" alt="Giao diện giải mã thông số lốp xe thực tế" />
  </div>
</div>

### Hướng dẫn chi tiết từng điểm chạm:

* <span class="step-badge">1</span> **Nhập chuỗi ký hiệu lốp**:
  * Nhìn vào thành hông (sidewall) lốp xe của bạn và gõ lại đúng chuỗi ký tự vào ô tìm kiếm (Ví dụ: `Michelin 205/55 R16 91V DOT 4522 Treadwear 340 Max Press 50 PSI`).
  * Hoặc bạn có thể bấm nhanh vào các nút gợi ý cấu hình phổ biến bên dưới như:
    * *Xe con*: `185/60R15 84H` (Vios, City) hoặc `205/60R16 92V` (Mazda 3, Civic).
    * *Bán tải & SUV*: `265/65R17 112T` (Ranger, Hilux).
    * *Off-road chuyên dụng*: `33X12.50R15 LT KO2`.
    * *Xe tải nhẹ / Xe khách*: `Casumina 7.50-16 14PR` hoặc `DRC 11R22.5 16PR`.

* <span class="step-badge">2</span> **Nhấn nút "GIẢI MÃ NGAY"**:
  * Hệ thống thuật toán AI & RegEx của DeepM Lab sẽ tự động bóc tách từng phân đoạn ký tự.

* <span class="step-badge">3</span> **Đọc bảng kết quả bóc tách thông minh**:
  * **Thương hiệu & Dòng gai**: Nhận diện hãng lốp (Michelin, Bridgestone, BFGoodrich...) và nước xuất xứ.
  * **Năm sản xuất (Mã DOT 4 số)**: Ví dụ `4522` tức là sản xuất vào **tuần thứ 45 của năm 2022**. Hệ thống sẽ đánh giá trạng thái chất lượng cao su (Còn hạn tốt / Cần kiểm tra lão hóa nếu quá 5 năm).
  * **Chỉ số UTQG Mỹ (Treadwear)**: Đánh giá độ bền chịu mòn của gai lốp so với lốp chuẩn.
  * **Áp suất tối đa (Max Press)**: Thông số PSI tối đa cho phép để tránh bơm quá căng nổ lốp.

---

## 📖 Bảng tra cứu ý nghĩa cấu trúc thông số lốp

Giả sử lốp xe bạn có ký hiệu: `205/55 R 16 91 V`

| Ký hiệu | Ý nghĩa kỹ thuật | Giải thích thực tế |
| :--- | :--- | :--- |
| **205** | Bề rộng mặt lốp | Chiều rộng bề mặt lốp tiếp xúc với mặt đường tính bằng **milimét (mm)**. |
| **55** | Tỷ lệ biên dạng hông lốp | Chiều cao thành lốp bằng **55%** của bề rộng (205 mm x 55% = 112.75 mm). |
| **R** | Cấu trúc bố Radial | Lớp mành bố tỏa tròn từ tâm, tiêu chuẩn của 99% xe du lịch hiện đại. |
| **16** | Đường kính mâm (La-zăng) | Kích thước mâm xe phù hợp tính bằng **inch (16")**. |
| **91** | Chỉ số tải trọng (Load Index) | Lốp chịu tải tối đa **615 kg** trên mỗi bánh xe khi bơm đủ áp suất. |
| **V** | Cấp tốc độ tối đa (Speed Rating) | Lốp vận hành an toàn tối đa ở vận tốc **240 km/h**. |

::: warning ⚠️ Cảnh báo an toàn kỹ thuật
Không bao giờ lắp lốp mới có **chỉ số tải trọng** hoặc **cấp tốc độ** thấp hơn tiêu chuẩn nguyên bản của nhà sản xuất xe (OEM) ghi trong sách hướng dẫn hoặc trên tem dán ở mép cửa tài xế.
:::
