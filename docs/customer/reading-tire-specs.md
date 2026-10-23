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
    * *Off-road chuyên dụng*: `33X12.50R15 LT KO2` hoặc `35X12.50R17 LT`.
    * *Xe tải nhẹ / Xe khách*: `195/75R16C 107/105R` hoặc `Casumina 7.50-16 14PR`.

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
* **Thanh đứng mép cửa bên ghế lái (Trụ B)**: Vị trí phổ biến nhất, mở cửa tài xế ra là nhìn thấy ngay tem nhôm hoặc decal bạc ghi rõ cỡ lốp và áp suất khuyến nghị.
* **Mặt trong nắp bình xăng**: Thường gặp trên các dòng xe châu Âu (Mercedes-Benz, BMW, Audi, Volkswagen...).
* **Phía sau nắp ngăn đựng găng tay (Cốp phụ)**.
* **Sổ đăng kiểm xe cơ giới & Sách hướng dẫn sử dụng xe (Owner's Manual)**.

---

## 📖 Bảng giải mã cấu trúc thông số lốp đầy đủ

Ví dụ chuỗi ký hiệu phổ biến trên xe con: `P 205 / 55 R 16 91 V XL`

| Ký hiệu | Ý nghĩa kỹ thuật | Giải thích thực tế |
| :--- | :--- | :--- |
| **P** | Tiền tố phân loại xe | **P (Passenger)**: Xe du lịch, xe gia đình (5 - 7 chỗ). |
| **205** | Bề rộng mặt lốp | Bề rộng mặt tiếp xúc với mặt đường tính bằng **milimét (mm)**. |
| **55** | Tỷ lệ biên dạng hông | Chiều cao thành lốp bằng **55%** của bề rộng ($205\text{ mm} \times 55\% = 112.75\text{ mm}$). |
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

## ⚖️ Bảng tra cứu toàn diện chỉ số tải trọng (Load Index: 60 – 130)

Chỉ số tải trọng (Load Index - Li) cho biết khối lượng tối đa (kg) mà 1 chiếc lốp có thể gánh được an toàn khi bơm đúng áp suất chuẩn:

::: info 💡 Công thức ước tính nhanh tải trọng tối đa cả xe
$$
W_{\text{total}} \approx W_{\text{tire}} \times 4
$$

* **Tổng tải an toàn cả xe (kg)** $\approx$ **Khả năng chịu tải 1 lốp (kg)** $\times$ **4 bánh**
* **Ví dụ thực tế**: Lốp có chỉ số tải trọng **91** (chịu được **615 kg**/lốp) $\rightarrow$ Tổng tải trọng an toàn tối đa của cả xe là: $615 \times 4 = 2.460\text{ kg}$.
:::

| Li | Tải 1 lốp (kg) | Tải 1 lốp (lbs) | Tổng tải 4 bánh (kg) | | Li | Tải 1 lốp (kg) | Tải 1 lốp (lbs) | Tổng tải 4 bánh (kg) |
|:---:|:---:|:---:|:---:|---|:---:|:---:|:---:|:---:|
| **60** | 250 kg | 551 lbs | 1.000 kg | | **96** | 710 kg | 1.565 lbs | 2.840 kg |
| **61** | 257 kg | 567 lbs | 1.028 kg | | **97** | 730 kg | 1.609 lbs | 2.920 kg |
| **62** | 265 kg | 584 lbs | 1.060 kg | | **98** | 750 kg | 1.653 lbs | 3.000 kg |
| **63** | 272 kg | 600 lbs | 1.088 kg | | **99** | 775 kg | 1.709 lbs | 3.100 kg |
| **64** | 280 kg | 617 lbs | 1.120 kg | | **100** | 800 kg | 1.764 lbs | 3.200 kg |
| **65** | 290 kg | 639 lbs | 1.160 kg | | **101** | 825 kg | 1.819 lbs | 3.300 kg |
| **66** | 300 kg | 661 lbs | 1.200 kg | | **102** | 850 kg | 1.874 lbs | 3.400 kg |
| **67** | 307 kg | 677 lbs | 1.228 kg | | **103** | 875 kg | 1.929 lbs | 3.500 kg |
| **68** | 315 kg | 694 lbs | 1.260 kg | | **104** | 900 kg | 1.984 lbs | 3.600 kg |
| **69** | 325 kg | 716 lbs | 1.300 kg | | **105** | 925 kg | 2.039 lbs | 3.700 kg |
| **70** | 335 kg | 739 lbs | 1.340 kg | | **106** | 950 kg | 2.094 lbs | 3.800 kg |
| **71** | 345 kg | 761 lbs | 1.380 kg | | **107** | 975 kg | 2.149 lbs | 3.900 kg |
| **72** | 355 kg | 783 lbs | 1.420 kg | | **108** | 1.000 kg | 2.205 lbs | 4.000 kg |
| **73** | 365 kg | 805 lbs | 1.460 kg | | **109** | 1.030 kg | 2.271 lbs | 4.120 kg |
| **74** | 375 kg | 827 lbs | 1.500 kg | | **110** | 1.060 kg | 2.337 lbs | 4.240 kg |
| **75** | 387 kg | 853 lbs | 1.548 kg | | **111** | 1.090 kg | 2.403 lbs | 4.360 kg |
| **76** | 397 kg | 875 lbs | 1.588 kg | | **112** | 1.120 kg | 2.469 lbs | 4.480 kg |
| **77** | 412 kg | 908 lbs | 1.648 kg | | **113** | 1.150 kg | 2.535 lbs | 4.600 kg |
| **78** | 425 kg | 937 lbs | 1.700 kg | | **114** | 1.180 kg | 2.601 lbs | 4.720 kg |
| **79** | 437 kg | 963 lbs | 1.748 kg | | **115** | 1.215 kg | 2.679 lbs | 4.860 kg |
| **80** | 450 kg | 992 lbs | 1.800 kg | | **116** | 1.250 kg | 2.756 lbs | 5.000 kg |
| **81** | 462 kg | 1.019 lbs | 1.848 kg | | **117** | 1.285 kg | 2.833 lbs | 5.140 kg |
| **82** | 475 kg | 1.047 lbs | 1.900 kg | | **118** | 1.320 kg | 2.910 lbs | 5.280 kg |
| **83** | 487 kg | 1.074 lbs | 1.948 kg | | **119** | 1.360 kg | 2.998 lbs | 5.440 kg |
| **84** | 500 kg | 1.102 lbs | 2.000 kg | | **120** | 1.400 kg | 3.086 lbs | 5.600 kg |
| **85** | 515 kg | 1.135 lbs | 2.060 kg | | **121** | 1.450 kg | 3.197 lbs | 5.800 kg |
| **86** | 530 kg | 1.168 lbs | 2.120 kg | | **122** | 1.500 kg | 3.307 lbs | 6.000 kg |
| **87** | 545 kg | 1.202 lbs | 2.180 kg | | **123** | 1.550 kg | 3.417 lbs | 6.200 kg |
| **88** | 560 kg | 1.235 lbs | 2.240 kg | | **124** | 1.600 kg | 3.527 lbs | 6.400 kg |
| **89** | 580 kg | 1.279 lbs | 2.320 kg | | **125** | 1.650 kg | 3.638 lbs | 6.600 kg |
| **90** | 600 kg | 1.323 lbs | 2.400 kg | | **126** | 1.700 kg | 3.748 lbs | 6.800 kg |
| **91** | 615 kg | 1.356 lbs | 2.460 kg | | **127** | 1.750 kg | 3.858 lbs | 7.000 kg |
| **92** | 630 kg | 1.389 lbs | 2.520 kg | | **128** | 1.800 kg | 3.968 lbs | 7.200 kg |
| **93** | 650 kg | 1.433 lbs | 2.600 kg | | **129** | 1.850 kg | 4.079 lbs | 7.400 kg |
| **94** | 670 kg | 1.477 lbs | 2.680 kg | | **130** | 1.900 kg | 4.189 lbs | 7.600 kg |
| **95** | 690 kg | 1.521 lbs | 2.760 kg | | — | — | — | — |

### 💡 Lưu ý quan trọng cho chủ xe:
* **Lốp tiêu chuẩn (SL)**: Áp suất bơm chuẩn thường là 2.2 – 2.5 bar (32 – 36 PSI).
* **Lốp gia cường (XL / RF)**: Cấu trúc hông dày dặn hơn, cho phép bơm tới 2.9 bar (42 PSI) để chở nặng hơn 10–15%.
* **Lốp xe điện tải cao (HL - High Load)**: Xe thuần điện do mang pin nặng nên thường dùng lốp ký hiệu `HL` ở đầu, chịu áp suất lên tới 3.2 bar (46 PSI). Khi thay lốp xe điện, bạn bắt buộc phải chọn đúng lốp có ký hiệu `HL` hoặc `XL`.
* **Ký hiệu kép (115/113R)**: Thường thấy trên xe 16 chỗ như Transit, Solati. Số 115 là tải khi lắp bánh đơn đằng trước (1.215 kg), số 113 là tải bánh đôi đằng sau (1.150 kg/bánh).

---

## ⚡ Bảng tra cứu toàn diện cấp tốc độ tối đa (Speed Rating)

Cấp tốc độ là chữ cái đại diện cho vận tốc tối đa mà chiếc lốp được kiểm định chạy an toàn liên tục:

| Ký hiệu mã | Tốc độ tối đa (km/h) | Tốc độ tối đa (mph) | Phân khúc xe áp dụng phổ biến |
|:---:|:---:|:---:|:---|
| **A1 – A8** | 5 – 40 km/h | 3 – 25 mph | Xe nông nghiệp, xe nâng hàng, xe công trình, xe điện sân golf |
| **B – G** | 50 – 90 km/h | 31 – 56 mph | Xe tải nặng công trình, xe bồn, xe quân sự việt dã |
| **J** | 100 km/h | 62 mph | Xe buýt công cộng nội đô, xe tải thùng trung bình |
| **K** | 110 km/h | 68 mph | Xe khách liên tỉnh, xe tải hàng hóa |
| **L** | 120 km/h | 75 mph | Xe tải nhẹ chở hàng, bán tải chuyên dụng, lốp dã ngoại 4x4 |
| **M** | 130 km/h | 81 mph | Bánh xe dự phòng tạm thời (T-type) |
| **N** | 140 km/h | 87 mph | Lốp dự phòng, lốp đi đường băng tuyết |
| **P** | 150 km/h | 93 mph | Xe đô thị cỡ nhỏ (Morning, Wigo, Fadil, xe $\le 1.0\text{L}$) |
| **Q** | 160 km/h | 99 mph | Lốp chuyên leo bùn Mud-Terrain (M/T), xe 4x4 dã ngoại |
| **R** | 170 km/h | 106 mph | Lốp All-Terrain (A/T), xe bán tải phổ thông (Ranger, Hilux) |
| **S** | 180 km/h | 112 mph | Xe du lịch gia đình phổ thông phân khúc A & B (i10, Vios MT) |
| **T** | 190 km/h | 118 mph | Xe gia đình phổ biến (Vios CVT, City, Accent, Xpander, Veloz) |
| **U** | 200 km/h | 124 mph | Xe sedan phân khúc C/D, SUV gia đình (Altis, Civic, Tucson, CX-5) |
| **H** | 210 km/h | 130 mph | Xe thể thao phổ thông, sedan/SUV hiệu năng vừa (Camry, Accord, CR-V, SantaFe) |
| **V** | 240 km/h | 149 mph | Xe sedan/SUV công suất cao, xe sang Đức (Mercedes C/E-Class, BMW 3/5 Series) |
| **VR** | $\gt 210$ km/h | $\gt 130$ mph | Ký hiệu tốc độ cao lịch sử trên xe thể thao cổ |
| **W** | 270 km/h | 168 mph | Xe thể thao hiệu năng cao (BMW M-Sport, Mercedes-AMG, Porsche Macan) |
| **Y** | 300 km/h | 186 mph | Siêu xe thể thao đỉnh cao (Porsche 911, Ferrari Roma, Audi R8) |
| **(Y)** | $\gt 300$ km/h | $\gt 186$ mph | Siêu xe tốc độ cực hạn vượt trên 300 km/h (Ferrari SF90, Bugatti Chiron) |
| **ZR** | $\gt 240$ km/h | $\gt 149$ mph | Cấu trúc khung lốp siêu tốc độ (bao hàm các cấp V, W, Y) |

---

## 🚙 Hướng dẫn đọc kích thước lốp địa hình Flotation (Hệ Inch) cho xe Bán tải & SUV

Nếu bạn sở hữu xe bán tải (Ford Ranger, Raptor, Toyota Hilux) hoặc xe SUV địa hình (Jeep Wrangler, Land Cruiser, Pajero), bạn sẽ thường xuyên bắt gặp kích thước lốp ghi bằng **hệ inch** (gọi là lốp Flotation):

Ví dụ: `35 x 12.50 R 17 LT`

```
  35       x     12.50      R      17       LT
  │                │        │      │        └── Light Truck (Xe bán tải / tải nhẹ)
  │                │        │      └─────────── Đường kính mâm phù hợp: 17 inch
  │                │        └────────────────── Cấu trúc bố thép Radial
  │                └─────────────────────────── Bề rộng lốp: 12.50 inch (~318 mm)
  └──────────────────────────────────────────── Đường kính tổng thể: 35 inch (~889 mm)
```

### Công thức quy đổi nhanh sang hệ mét (mm):
* **Đường kính ngoài bánh**: $35 \times 25.4 = 889\text{ mm}$
* **Bề rộng mặt lốp**: $12.50 \times 25.4 = 317.5\text{ mm}$
* **Chiều cao hông lốp**: $\frac{35 - 17}{2} \times 25.4 = 228.6\text{ mm}$
* **Tỷ lệ hông lốp tương đương**: $\frac{228.6}{317.5} \times 100\% = 72\%$

### Bảng tra cứu đối chiếu nhanh các cỡ lốp dã ngoại phổ biến tại Việt Nam:

| Cỡ Flotation (Hệ inch) | Đường kính bánh (mm) | Chiều rộng lốp (mm) | Cỡ lốp mm tương đương | Dòng xe thường dùng |
|:---|:---:|:---:|:---|:---|
| **31x10.50R15 LT** | 787 mm | 267 mm | **265/75R15** hoặc **265/70R16** | Pajero đời cũ, Land Cruiser LC80 zin, Hilux |
| **32x11.50R15 LT** | 813 mm | 292 mm | **285/70R15** hoặc **265/75R16** | Bán tải nâng gầm nhẹ 2 inch chạy cát |
| **33x12.50R15 LT** | 838 mm | 318 mm | **285/75R16** hoặc **305/70R16** | Cỡ lốp offroad quốc dân độ gầm |
| **33x12.50R17 LT** | 838 mm | 318 mm | **285/70R17** hoặc **305/65R17** | Ford Ranger Raptor, Jeep Rubicon, Prado |
| **35x12.50R17 LT** | 889 mm | 318 mm | **315/70R17** | Chuẩn lốp thi đấu offroad VOC, xe độ gầm cao |
| **37x12.50R17 LT** | 940 mm | 318 mm | **325/80R17** | Xe offroad chuyên nghiệp gầm cầu lớn |

::: warning ⚠️ Cảnh báo an toàn & Đăng kiểm cho chủ xe
* **Sai số đồng hồ ODO**: Khi độ từ lốp zin 31" lên 35", đường kính bánh tăng thêm **12.9%**. Đồng hồ trên taplo xe chỉ 100 km/h nhưng thực tế bạn đang chạy **112.9 km/h** $\to$ Rất dễ bị bắn tốc độ phạt nguội trên cao tốc!
* **Bề rộng mâm**: Lốp bản rộng 12.50 inch bắt buộc phải dùng mâm độ rộng từ 8.5" đến 10", không được ép vào mâm zin hẹp bản 7"–7.5".
* **Đăng kiểm**: Tại Việt Nam, quy định đăng kiểm yêu cầu đúng kích cỡ lốp ghi trong Giấy chứng nhận kiểm định an toàn kỹ thuật. Trước kỳ đăng kiểm, chủ xe nên kiểm tra kỹ sổ đăng kiểm hoặc đưa xe về cỡ lốp nguyên bản.
:::

---

## 🔄 Ký hiệu săm lốp & Hướng lắp đặt lốp

* **Tubeless (TL)**: Lốp không săm (loại lốp chiếm 99% xe du lịch hiện đại, an toàn và không bị xẹp lép đột ngột khi dính đinh).
* **Tube Type (TT)**: Lốp bắt buộc phải dùng săm bên trong (xe tải truyền thống hoặc xe máy đời cũ).
* **Outside / Inside (Lốp bất đối xứng)**: Bắt buộc phải lắp mặt có chữ **Outside** quay ra ngoài xe để đảm bảo đúng rãnh thoát nước và khối cao su chịu lực khi vào cua.
* **Mũi tên Direction / Rotation →**: Lốp định hướng 1 chiều quay, phải lắp theo đúng hướng mũi tên chỉ chiều tiến của xe.

::: warning ⚠️ Cảnh báo an toàn kỹ thuật
Không bao giờ lắp lốp mới có **chỉ số tải trọng** hoặc **cấp tốc độ** thấp hơn tiêu chuẩn nguyên bản của nhà sản xuất xe (OEM) ghi trong sách hướng dẫn hoặc trên tem mép cửa tài xế để đảm bảo xe vận hành ổn định và đạt chuẩn an toàn khi đăng kiểm.
:::
