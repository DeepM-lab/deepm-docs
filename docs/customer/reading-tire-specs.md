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

## 📍 Tìm thông số lốp xe của bạn ở đâu?

Ngoài việc đọc trực tiếp trên hông lốp xe, nhà sản xuất ô tô luôn dán tem kỹ thuật và ghi rõ trong tài liệu xe tại các vị trí:
* **Thanh đứng mép cửa bên ghế lái (Trụ B)**: Vị trí phổ biến nhất, mở cửa tài xế ra là nhìn thấy ngay.
* **Mặt trong nắp bình xăng**: Thường gặp trên các dòng xe châu Âu (Mercedes, BMW, Audi, Volkswagen...).
* **Phía sau nắp ngăn đựng găng tay (Cốp phụ)**.
* **Sổ đăng kiểm xe cơ giới & Sách hướng dẫn sử dụng xe (Owner's Manual)**.

---

## 📖 Bảng giải mã cấu trúc thông số lốp đầy đủ

Ví dụ chuỗi ký hiệu phổ biến trên xe con: `P 205 / 55 R 16 91 V XL`

| Ký hiệu | Ý nghĩa kỹ thuật | Giải thích thực tế |
| :--- | :--- | :--- |
| **P** | Tiền tố phân loại xe | **P (Passenger)**: Xe du lịch, xe gia đình (5 - 7 chỗ). |
| **205** | Bề rộng mặt lốp | Bề rộng mặt tiếp xúc với mặt đường tính bằng **milimét (mm)**. |
| **55** | Tỷ lệ biên dạng hông | Chiều cao thành lốp bằng **55%** của bề rộng (205 mm x 55% = 112.75 mm). |
| **R** | Cấu trúc bố Radial | Lớp mành bố tỏa tròn từ tâm, chuẩn của 99% xe du lịch hiện đại. |
| **16** | Đường kính mâm (La-zăng) | Kích thước mâm xe phù hợp tính bằng **inch (16")**. |
| **91** | Chỉ số tải trọng (Load Index) | Lốp chịu tải tối đa **615 kg** trên mỗi bánh xe đơn khi bơm đủ áp suất chuẩn. |
| **V** | Cấp tốc độ tối đa (Speed Rating) | Lốp vận hành an toàn tối đa ở vận tốc **240 km/h**. |
| **XL** | Gia cường chịu tải | **Extra Load / Reinforced**: Thành lốp gia cường chịu tải cao hơn bình thường. |

### Các tiền tố phân loại xe thường gặp:
* **P (Passenger Car)**: Lốp dành cho xe con, xe gia đình, sedan, hatchback.
* **LT (Light Truck)**: Lốp dành cho xe bán tải, xe tải nhẹ, SUV khung gầm rời (Ranger, Hilux...).
* **C (Commercial)**: Lốp dành cho xe van, xe thương mại, tải nặng chở hàng (Ford Transit, Hyundai Solati...).
* **T (Temporary)**: Lốp dự phòng kích thước nhỏ, chỉ dùng tạm thời để chạy tới garage.
* **ST (Special Trailer)**: Lốp dành riêng cho rơ-moóc hoặc xe đầu kéo đặc biệt.

---

## ⚖️ Bảng tra cứu chỉ số tải trọng (Load Index - Li)

Chỉ số tải trọng thể hiện khối lượng tối đa một lốp xe đơn chịu được:

| Chỉ số (Li) | Tải trọng (kg) | Chỉ số (Li) | Tải trọng (kg) | Chỉ số (Li) | Tải trọng (kg) |
| :---------: | :------------: | :---------: | :------------: | :---------: | :------------: |
|   **75**    |     387 kg     |   **87**    |     545 kg     |   **99**    |     775 kg     |
|   **76**    |     397 kg     |   **88**    |     560 kg     |   **100**   |     800 kg     |
|   **77**    |     412 kg     |   **89**    |     580 kg     |   **101**   |     825 kg     |
|   **78**    |     425 kg     |   **90**    |     600 kg     |   **102**   |     850 kg     |
|   **79**    |     437 kg     |   **91**    |     615 kg     |   **103**   |     875 kg     |
|   **80**    |     450 kg     |   **92**    |     630 kg     |   **104**   |     900 kg     |
|   **81**    |     462 kg     |   **93**    |     650 kg     |   **105**   |     925 kg     |
|   **82**    |     475 kg     |   **94**    |     670 kg     |   **106**   |     950 kg     |
|   **83**    |     487 kg     |   **95**    |     690 kg     |   **107**   |     975 kg     |
|   **84**    |     500 kg     |   **96**    |     710 kg     |   **108**   |    1.000 kg    |
|   **85**    |     515 kg     |   **97**    |     730 kg     |   **109**   |    1.030 kg    |
|   **86**    |     530 kg     |   **98**    |     750 kg     |   **110**   |    1.060 kg    |

*(Quy tắc ước tính: Tổng tải trọng tối đa cả xe ≈ Tải trọng 1 lốp × 4 bánh).*

---

## ⚡ Bảng tra cứu cấp tốc độ tối đa (Speed Rating)

| Ký hiệu mã | Tốc độ tối đa (km/h) | Phân khúc xe áp dụng phổ biến |
| :--------: | :------------------: | :---------------------------- |
|   **L**    |       120 km/h       | Xe tải nhẹ chuyên dụng, nông nghiệp |
|   **M / N**|   130 - 140 km/h     | Lốp dự phòng tạm thời, xe tải nhỏ |
|   **P / Q**|   150 - 160 km/h     | Xe đô thị cỡ nhỏ, xe địa hình 4x4 |
|   **R / S**|   170 - 180 km/h     | Bán tải, sedan & hatchback gia đình phổ thông |
|   **T / U**|   190 - 200 km/h     | Xe gia đình tầm trung, MPV, Crossover |
|   **H**    |       210 km/h       | Xe thể thao phổ thông, sedan/SUV hiệu năng vừa |
|   **V**    |       240 km/h       | Xe sedan/SUV công suất cao |
|   **W**    |       270 km/h       | Xe thể thao hiệu năng cao |
|   **Y**    |       300 km/h       | Siêu xe thể thao |
|  **(Y)**   |      > 300 km/h      | Siêu xe đặc biệt vận tốc trên 300 km/h |

---

## 🔄 Ký hiệu săm lốp & Hướng lắp đặt lốp

* **Tubeless (TL)**: Lốp không săm (loại lốp chiếm 99% xe du lịch hiện đại, an toàn và không bị xẹp lép đột ngột khi dính đinh).
* **Tube Type (TT)**: Lốp bắt buộc phải dùng săm bên trong (xe tải truyền thống hoặc xe máy đời cũ).
* **Outside / Inside (Lốp bất đối xứng)**: Bắt buộc phải lắp mặt có chữ **Outside** quay ra ngoài xe để đảm bảo đúng rãnh thoát nước và khối cao su chịu lực khi vào cua.
* **Mũi tên Direction / Rotation →**: Lốp định hướng 1 chiều quay, phải lắp theo đúng hướng mũi tên chỉ chiều tiến của xe.

::: warning ⚠️ Cảnh báo an toàn kỹ thuật
Không bao giờ lắp lốp mới có **chỉ số tải trọng** hoặc **cấp tốc độ** thấp hơn tiêu chuẩn nguyên bản của nhà sản xuất xe (OEM) ghi trong sách hướng dẫn hoặc trên tem mép cửa tài xế để đảm bảo đạt chuẩn an toàn khi đăng kiểm.
:::
