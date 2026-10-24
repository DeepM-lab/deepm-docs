# 4. Bách Khoa Toàn Thư Lốp Xe, Ký Hiệu OE & Cẩm Nang Kỹ Thuật Xưởng

Bách khoa toàn thư lốp xe của DeepM Lab là thư viện tiêu chuẩn công nghiệp ô tô toàn diện (chuẩn hóa theo ETRTO, ISO 4000-1 và TRA), giúp kỹ thuật viên garage nhanh chóng giải mã toàn bộ thông số kỹ thuật trên hông lốp, tra cứu chỉ số tải trọng, cấp tốc độ, quy đổi kích thước lốp địa hình Flotation, nhận diện ký hiệu OE của các hãng xe sang và chẩn đoán chính xác góc đặt bánh xe qua hình thái mòn lốp thực tế.

---

## 📸 Giao diện tra cứu Bách khoa toàn thư

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Lab • Bách khoa toàn thư lốp xe & Cẩm nang chẩn đoán xưởng</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/technician/technician-encyclopedia.webp" alt="Giao diện tra cứu bách khoa toàn thư lốp xe thực tế" />
  </div>
</div>

---

## 🏷️ 1. Giải mã cấu trúc kích cỡ & Tiền tố mục đích sử dụng

Ví dụ một dãy thông số lốp xe hoàn chỉnh: **P 225 / 55 R 17 97 W XL (TL)**

```
  P    225  /  55    R     17     97     W      XL     TL
  │     │      │     │      │      │     │      │      │
  │     │      │     │      │      │     │      │      └── Tubeless (Lốp không săm)
  │     │      │     │      │      │     │      └──────── Extra Load (Chịu tải tăng cường)
  │     │      │     │      │      │     └─────────────── Cấp tốc độ: W (270 km/h)
  │     │      │     │      │      └──────────────────── Chỉ số tải trọng: 97 (730 kg/lốp)
  │     │      │     │      └─────────────────────────── Đường kính mâm: 17 inch
  │     │      │     └────────────────────────────────── Cấu trúc: Radial (Bố thép tỏa tròn)
  │     │      └──────────────────────────────────────── Tỷ lệ biên dạng hông lốp: 55%
  │     └─────────────────────────────────────────────── Bề rộng mặt lốp: 225 mm
  └───────────────────────────────────────────────────── Tiền tố loại xe: Passenger (Xe du lịch)
```

### Bảng tiền tố phân loại xe (Vehicle Class Markings):
* **P (Passenger Car)**: Lốp thiết kế êm ái, tối ưu lực cản lăn cho xe con, sedan, hatchback, CUV gia đình.
* **LT (Light Truck)**: Lốp dành cho xe bán tải, SUV khung gầm rời (Body-on-frame), xe tải nhẹ với thành hông gia cường nhiều lớp bố thép để chở hàng nặng và chịu va đập đá hộc.
* **C (Commercial)**: Dành riêng cho xe tải thương mại, xe van 16 chỗ chuyên chở tải nặng liên tục.
* **T (Temporary Spare)**: Lốp dự phòng kích thước nhỏ gọn tạm thời (chỉ cho phép chạy vận tốc tối đa dưới 80 km/h).
* **ST (Special Trailer)**: Lốp chuyên dụng cho rơ-moóc kéo thuyền, nhà di động kéo theo sau (không dùng cho bánh dẫn động xe).
* **XL / Reinforced / HL**: Lốp gia cố khung chịu lực, cho phép bơm áp suất cao hơn để nâng mức tải tối đa so với lốp thường cùng cỡ.

### Cấu trúc mành bố lốp (Construction):
* **R (Radial)**: Bố tỏa tròn 90 độ so với tâm lốp, là chuẩn mực của hơn 99% xe cơ giới hiện đại nhờ tản nhiệt tốt, bám đường êm và cản lăn thấp.
* **D hoặc gạch ngang `-` (Diagonal / Bias Ply)**: Các lớp bố sợi đan chéo góc 30–40 độ, thành lốp cực dày và cứng, chuyên dùng cho xe tải nặng, máy công trình và lốp offroad vượt đá nhọn.
* **B (Belted Bias)**: Cấu trúc lai kết hợp các đai gia cường bằng sợi thủy tinh hoặc thép trên nền khung bố chéo.

---

## ⚖️ 2. Bảng tra cứu toàn diện chỉ số tải trọng (Load Index: 60 – 130)

Chỉ số tải trọng (Load Index - Li) là mã số quy ước tiêu chuẩn quốc tế (theo ISO 4000-1 và ETRTO) xác định khối lượng tải tối đa mà một lốp xe đơn có thể gánh được một cách an toàn khi được bơm đúng áp suất tiêu chuẩn của nhà sản xuất.

*Quy tắc ước tính tổng tải an toàn cả xe:*

$$
\text{Tổng tải trọng tối đa cả xe (kg)} \approx \text{Tải trọng danh định 1 lốp (kg)} \times 4
$$

### Bảng đối chiếu 71 chỉ số tải trọng chuẩn hóa (60 đến 130):

<TableSearchFilter placeholder="Tìm nhanh chỉ số Li (60..130), số kg tải trọng hoặc lbs...">

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

</TableSearchFilter>

### ⚠️ Quy tắc an toàn kỹ thuật xưởng về Tải trọng:

1. **Lốp xe con tiêu chuẩn (Standard Load - SL)**: Đạt mức tải tối đa danh định ở áp suất chuẩn **2.5 bar (36 PSI)**. Không bơm vượt quá áp suất khuyến cáo để tránh hiện tượng mòn vẹt chính giữa mặt lốp.
2. **Lốp gia cường tải trọng (Extra Load - XL / Reinforced - RF)**: Cấu trúc khung sợi và tanh lốp được gia cố nhiều lớp đai, cho phép bơm áp suất lên tới **2.9 bar (42 PSI)** nhằm nâng mức tải danh định thêm **10–15%** so với lốp SL cùng kích cỡ. Rất phổ biến trên các dòng SUV hạng trung và xe gầm cao.
3. **Lốp tải trọng siêu cao cho xe điện (High Load Capacity - HL)**: Chuẩn lốp thế hệ mới (bắt đầu bằng tiền tố `HL`, ví dụ `HL 245/45R19 101Y`). Lốp HL chịu được áp suất vận hành lên tới **3.2 bar (46 PSI)**, tải trọng tăng thêm xấp xỉ **25%** so với lốp tiêu chuẩn SL nhằm gánh trọn vẹn khối lượng nặng nề của cụm pin xe thuần điện (EV).
4. **Quy tắc lốp đôi (Dual Fitment / Twins)**: Trên các dòng xe thương mại chở khách hoặc xe tải nhẹ (Ford Transit, Hyundai Solati, Isuzu QKR), nếu hông lốp ghi ký hiệu kép dạng `115/113R`:
   - Số đầu (**115**): Áp dụng khi lắp bánh đơn trục trước → Tải tối đa là **1.215 kg/bánh**.
   - Số sau (**113**): Áp dụng khi lắp bánh đôi trục sau → Tải tối đa tính là **1.150 kg/bánh**.
   - *Nguyên lý kỹ thuật*: Mức giảm tải 5–7% cho bánh đôi là bắt buộc để bù trừ dung sai mặt đường lồi lõm hoặc áp suất không cân bằng giữa 2 lốp kề nhau, tránh quá tải cục bộ làm nổ lốp.
5. **Cảnh báo bắt buộc khi đăng kiểm**: Tuyệt đối không thay thế lốp có chỉ số tải trọng nhỏ hơn lốp nguyên bản do nhà máy sản xuất xe chỉ định.

---

## ⚡ 3. Bảng tra cứu toàn diện chỉ số tốc độ (Speed Rating: A1 – (Y))

Chỉ số tốc độ (Speed Rating) được quy chuẩn theo ECE-R30 và ETRTO, biểu thị bằng ký hiệu chữ cái đại diện cho vận tốc tối đa mà lốp xe có thể vận hành an toàn liên tục ở mức tải trọng danh định trong điều kiện thử nghiệm tiêu chuẩn.

### Bảng tra cứu đầy đủ 32 cấp tốc độ quốc tế:

| Ký hiệu mã | Vận tốc tối đa (km/h) | Vận tốc tối đa (mph) | Phân khúc phương tiện & Ứng dụng thực tế |
|:---:|:---:|:---:|:---|
| **A1** | 5 km/h | 3 mph | Xe kéo moóc siêu trường siêu trọng, thiết bị công nghiệp nặng đặc thù |
| **A2** | 10 km/h | 6 mph | Xe nâng hàng trong kho bãi (Forklift), thiết bị mặt đất cảng hàng không |
| **A3** | 15 km/h | 9 mph | Máy kéo nông nghiệp bánh hơi, máy xúc đào bánh lốp công trình |
| **A4** | 20 km/h | 12 mph | Xe lu rung làm đường, xe san gạt đất công trình |
| **A5** | 25 km/h | 15 mph | Máy gặt đập liên hợp, máy thu hoạch nông nghiệp tự hành |
| **A6** | 30 km/h | 19 mph | Máy cày nông nghiệp, xe kéo nông thôn chuyên dụng |
| **A7** | 35 km/h | 22 mph | Xe điện chở khách sân golf, xe tham quan khu du lịch |
| **A8** | 40 km/h | 25 mph | Xe công nông, thiết bị quét dọn vệ sinh đô thị chuyên dùng |
| **B** | 50 km/h | 31 mph | Xe chuyên dụng sửa chữa mặt đường, máy xúc lật mỏ |
| **C** | 60 km/h | 37 mph | Xe cẩu chuyên dụng bánh lốp hạng nặng |
| **D** | 65 km/h | 40 mph | Xe tải ben tự đổ mỏ khai thác siêu trọng |
| **E** | 70 km/h | 43 mph | Xe quân sự vận tải bánh lốp hạng nặng, xe tải việt dã |
| **F** | 80 km/h | 50 mph | Xe tải khai thác hầm lò, rơ-moóc chuyên dụng hạng nặng |
| **G** | 90 km/h | 56 mph | Xe tải thùng đường dài hạng nặng, xe bồn chở nhiên liệu |
| **J** | 100 km/h | 62 mph | Xe buýt nội đô công cộng, xe tải thùng trung bình |
| **K** | 110 km/h | 68 mph | Xe khách liên tỉnh tuyến ngắn, xe tải phân phối hàng |
| **L** | 120 km/h | 75 mph | Xe tải nhẹ chở hàng, bán tải chuyên dụng, xe 4x4 offroad cực đoan |
| **M** | 130 km/h | 81 mph | Bánh xe dự phòng tạm thời kích thước thu nhỏ (T-type Spare) |
| **N** | 140 km/h | 87 mph | Lốp dự phòng cứu hộ, lốp gai tuyết chuyên dụng vùng Bắc Cực |
| **P** | 150 km/h | 93 mph | Xe ô tô con đô thị cỡ nhỏ (City Car, Keicar, xe dung tích xi lanh $\le 1.0\text{L}$) |
| **Q** | 160 km/h | 99 mph | Lốp địa hình bùn lầy Mud-Terrain (M/T), xe 4x4 offroad vượt địa hình chuyên nghiệp |
| **R** | 170 km/h | 106 mph | Lốp đa địa hình All-Terrain (A/T), xe bán tải phổ thông (Ranger, Hilux, Triton) |
| **S** | 180 km/h | 112 mph | Xe du lịch gia đình phân khúc A & B (Morning, i10, Soluto, Vios bản số sàn) |
| **T** | 190 km/h | 118 mph | Xe sedan, MPV, Crossover gia đình phổ thông (Vios CVT, City, Xpander, Veloz) |
| **U** | 200 km/h | 124 mph | Xe sedan phân khúc C/D, SUV gia đình tầm trung (Corolla Altis, Tucson, Sportage) |
| **H** | 210 km/h | 130 mph | Xe thể thao phổ thông, sedan/SUV hiệu năng vừa (Camry, Accord, CX-5, CR-V, SantaFe) |
| **V** | 240 km/h | 149 mph | Xe sedan/SUV công suất cao, xe sang tiêu chuẩn Đức (BMW 3/5 Series, Mercedes C/E) |
| **VR** | $\gt 210$ km/h | $\gt 130$ mph | Ký hiệu phân hạng tốc độ cao lịch sử (thường gặp trên xe thể thao trước năm 1991) |
| **W** | 270 km/h | 168 mph | Xe thể thao hiệu năng cao (BMW M-Sport, Mercedes-AMG, Porsche Macan/Panamera) |
| **Y** | 300 km/h | 186 mph | Siêu xe thể thao cao cấp (Porsche 911 Carrera, Ferrari Roma, Lamborghini Huracán) |
| **(Y)** | $\gt 300$ km/h | $\gt 186$ mph | Siêu xe tốc độ cực hạn (Ferrari SF90, Bugatti Chiron, Porsche 911 GT2 RS, Koenigsegg) |
| **ZR** | $\gt 240$ km/h | $\gt 149$ mph | Ký hiệu cấu trúc khung lốp siêu tốc độ (bao hàm toàn bộ các cấp V, W, Y, (Y)) |

### 🏎️ Quy tắc kỹ thuật xưởng về Giảm tải ở tốc độ cao (Speed Derating Factor):

Theo tiêu chuẩn châu Âu ETRTO, khi xe vận hành liên tục ở dải vận tốc trên 210 km/h, lực ly tâm cực đại và nhiệt sinh nội tại sẽ làm suy giảm khả năng chịu tải của lốp:

* **Cấp tốc độ V (240 km/h)**:
  - Ở 210 km/h: Khả năng chịu tải đạt 100% mức danh định.
  - Từ 210 km/h đến 240 km/h: Cứ mỗi 10 km/h tăng thêm, tải trọng tối đa suy giảm **3%**.
  - Tại vận tốc cực đại 240 km/h: Tải trọng lốp chỉ còn **91%** so với chỉ số ghi trên lốp.
* **Cấp tốc độ W (270 km/h)**:
  - Ở 240 km/h: Tải trọng đạt 100% mức danh định.
  - Từ 240 km/h đến 270 km/h: Cứ mỗi 10 km/h tăng thêm, tải trọng suy giảm **5%**.
  - Tại vận tốc 270 km/h: Tải trọng lốp chỉ còn **85%** mức danh định.
* **Cấp tốc độ Y (300 km/h)**:
  - Ở 270 km/h: Tải trọng đạt 100% mức danh định.
  - Từ 270 km/h đến 300 km/h: Cứ mỗi 10 km/h tăng thêm, tải trọng suy giảm **5%**.
  - Tại vận tốc cực đại 300 km/h: Tải trọng lốp chỉ còn **85%** mức danh định.
* **Hiệu chỉnh áp suất Track Day**: Khi xe thể thao chuẩn bị chạy trên trường đua (Track Day) ở tốc độ cao liên tục, kỹ thuật viên bắt buộc phải tăng áp suất lốp nguội thêm từ **0.2 đến 0.4 bar** (3 đến 6 PSI) so với tiêu chuẩn chạy phố để giảm biến dạng uốn cong của hông lốp và triệt tiêu nguy cơ nổ lốp do nhiệt.
* **Phân biệt `Y` và `(Y)`**:
  - Ký hiệu `Y` (không có ngoặc): Vận tốc tối đa cho phép là đúng 300 km/h.
  - Ký hiệu `(Y)` (nằm trong dấu ngoặc đơn, ví dụ `(100Y)`): Cho phép vận hành ở tốc độ **vượt trên 300 km/h** (lên đến 320 – 350+ km/h). Trong trường hợp này, kỹ thuật viên garage bắt buộc phải tham vấn biểu đồ tải trọng/áp suất riêng từ nhà sản xuất lốp (Pirelli, Michelin, Continental) đối với dòng xe cụ thể.

---

## 🧭 4. Hướng dẫn & Bảng quy đổi kích thước lốp địa hình Flotation (Hệ Inch → Hệ Mét mm)

### 1. Cấu trúc danh định lốp Flotation:

Lốp dã ngoại Flotation là chuẩn kích thước đo bằng đơn vị inch của Mỹ, cực kỳ phổ biến trong cộng đồng chơi xe bán tải, Overlanding và xe đua địa hình Offroad 4x4:

$$
\mathbf{D_{\text{total}} \times W_{\text{tire}}\text{ R } Rim_{\text{inch}}\text{ LT}}
$$

*Ví dụ thực tế*: `35 x 12.50 R 17 LT`
* $D_{\text{total}} = 35$: Đường kính tổng thể danh định bên ngoài của bánh xe là **35 inch** ($\approx 889\text{ mm}$).
* $W_{\text{tire}} = 12.50$: Chiều rộng tiết diện cắt ngang của lốp là **12.50 inch** ($\approx 317.5\text{ mm}$).
* $R$: Cấu trúc mành bố tỏa tròn Radial.
* $Rim_{\text{inch}} = 17$: Đường kính vành mâm tương thích là **17 inch**.
* $LT$: Light Truck (chuyên dùng cho xe bán tải, xe gầm rời tải nhẹ).

### 2. Hệ thống công thức toán học KaTeX quy đổi sang hệ mét (mm):

* **Đường kính ngoài danh định ($D_{\text{total}}$)**:

$$
D_{\text{total}} (\text{mm}) = D_{\text{total}} (\text{inch}) \times 25.4
$$

* **Bề rộng mặt lốp ($W_{\text{metric}}$)**:

$$
W_{\text{metric}} (\text{mm}) = W_{\text{tire}} (\text{inch}) \times 25.4
$$

* **Chiều cao thành hông lốp ($H_{\text{sidewall}}$)**:

$$
H_{\text{sidewall}} (\text{mm}) = \frac{D_{\text{total}} (\text{inch}) - Rim_{\text{inch}}}{2} \times 25.4
$$

* **Tỷ lệ biên dạng hông tương đương ($AR - \text{Aspect Ratio}$)**:

$$
AR (\%) = \frac{H_{\text{sidewall}}}{W_{\text{metric}}} \times 100\% = \frac{D_{\text{total}} - Rim_{\text{inch}}}{2 \times W_{\text{tire}}} \times 100\%
$$

* **Chu vi lăn bánh thực tế ($C_{\text{rolling}}$)**:

$$
C_{\text{rolling}} (\text{mm}) = \pi \times D_{\text{total}} (\text{mm})
$$

### 3. Bảng đối chiếu 14 cỡ lốp Flotation thực chiến sang cỡ Metric tương đương:

| Cỡ Flotation (Hệ inch) | Đường kính ngoài ($D$) | Bề rộng lốp ($W$) | Chiều cao hông ($H$) | Tỷ lệ hông ($AR$) | Cỡ Metric tương đương gần nhất | Lệch đường kính | Dòng xe & Ứng dụng thực tế |
|:---|:---:|:---:|:---:|:---:|:---|:---:|:---|
| **30x9.50R15 LT** | 762.0 mm | 241.3 mm | 190.5 mm | 78.9% | **235/75R15** hoặc **245/70R16** | -0.6% | Suzuki Jimny, Jeep Wrangler zin, Vitara độ nhẹ |
| **31x10.50R15 LT** | 787.4 mm | 266.7 mm | 203.2 mm | 76.2% | **265/75R15** hoặc **265/70R16** | -1.1% | Pajero V31/V33, Land Cruiser LC80 zin, Hilux đời cũ |
| **32x11.50R15 LT** | 812.8 mm | 292.1 mm | 215.9 mm | 73.9% | **285/70R15** hoặc **265/75R16** | -1.2% | Bán tải nâng gầm 2 inch chạy đồi cát Bàu Trắng |
| **33x10.50R15 LT** | 838.2 mm | 266.7 mm | 228.6 mm | 85.7% | **255/85R16** | -0.4% | Lốp hẹp cắn bùn sâu (Pizza Cutter) cho Defender, Land Cruiser |
| **33x12.50R15 LT** | 838.2 mm | 317.5 mm | 228.6 mm | 72.0% | **305/70R16** hoặc **285/75R16** | +0.5% | Cỡ lốp offroad quốc dân cho bán tải độ gầm và mâm 15" |
| **33x12.50R17 LT** | 838.2 mm | 317.5 mm | 203.2 mm | 64.0% | **285/70R17** hoặc **305/65R17** | -0.8% | Ford Ranger Raptor, Jeep Wrangler Rubicon, Prado nâng gầm |
| **33x12.50R18 LT** | 838.2 mm | 317.5 mm | 190.5 mm | 60.0% | **275/70R18** hoặc **305/60R18** | +0.4% | Bán tải mâm 18" thể thao, Ford F-150, RAM 1500 |
| **33x12.50R20 LT** | 838.2 mm | 317.5 mm | 165.1 mm | 52.0% | **305/55R20** | -1.1% | Phong cách Street Truck bánh béo mâm 20 inch của Mỹ |
| **35x12.50R17 LT** | 889.0 mm | 317.5 mm | 228.6 mm | 72.0% | **315/70R17** | -1.8% | Chuẩn thi đấu các giải đua xe địa hình VOC, RFC Vietnam |
| **35x12.50R18 LT** | 889.0 mm | 317.5 mm | 215.9 mm | 68.0% | **295/70R18** | -1.4% | RAM 1500 TRX, Ford F-150 Raptor R, Land Cruiser LC300 độ |
| **35x12.50R20 LT** | 889.0 mm | 317.5 mm | 190.5 mm | 60.0% | **325/60R20** hoặc **295/65R20** | -0.5% | Bán tải full-size nâng gầm cao bánh lớn đi phố |
| **37x12.50R17 LT** | 939.8 mm | 317.5 mm | 254.0 mm | 80.0% | **325/80R17** (hoặc 37" chuyên dụng) | 0.0% | Hạng thi đấu Nâng cao, xe lắp cầu Portal Axle |
| **37x13.50R17 LT** | 939.8 mm | 342.9 mm | 254.0 mm | 74.1% | Cỡ lốp siêu rộng leo đá tảng (Rock Crawling) | — | Jeep Gladiator, Ford F-250 Super Duty Extreme Offroad |
| **40x13.50R17 LT** | 1016.0 mm | 342.9 mm | 292.1 mm | 85.2% | Cỡ lốp thi đấu giải King of the Hammers | — | Xe đua địa hình chuyên nghiệp hạng Mở rộng (Open Class) |

### 4. Ba khuyến nghị kỹ thuật sống còn khi thi công độ lốp Flotation tại Garage:

1. **Độ rộng vành mâm (Rim Width Matching)**:
   - Lốp bản rộng `12.50 inch` ($\approx 318\text{ mm}$) bắt buộc phải lắp vào mâm có bề rộng từ **8.5 inch đến 11.0 inch** (chuẩn lý tưởng nhất là 9.0" hoặc 9.5").
   - *Cảnh báo nguy hiểm*: Tuyệt đối không ép lốp bản 12.50" vào mâm zin hẹp bản 7.0" – 7.5". Hông lốp sẽ bị bó chặt hình quả lê, mặt gai bị đẩy vồng lên gây mòn vẹt chính giữa, mất ổn định thân xe khi phanh gấp và nguy cơ rất cao bị tụt mép tanh (bead-unseat) khi xả áp suất xuống 0.8–1.0 bar để vượt lầy hoặc đồi cát.
2. **Hiệu chuẩn sai số đồng hồ tốc độ (Speedometer Calibration)**:
   - Khi nâng từ lốp zin cỡ 31 inch lên lốp 35 inch, đường kính ngoài bánh xe tăng thêm **+12.9%**.
   - Chu vi lăn tăng tỷ lệ thuận: Khi đồng hồ taplo chỉ đúng **100 km/h**, vận tốc thực tế của xe trên đường đang là **112.9 km/h**!
   - Kỹ thuật viên phải dùng máy chẩn đoán chuyên dụng hoặc phần mềm can thiệp qua cổng OBD2 (như Forscan cho Ford, Techstream cho Toyota) để nạp lại chu vi bánh xe vào hộp điều khiển Body Control Module (BCM) và hộp số (TCM), bảo đảm đồng hồ hiển thị chuẩn và hộp số tự động không bị trễ thời điểm chuyển số.
3. **Hạ tỷ số truyền vi sai cầu (Re-gearing)**:
   - Bánh xe 35" – 37" làm tăng cánh tay đòn cản lăn và khối lượng quay (rotational mass), khiến xe bị ì máy xuất phát, ì ạch khi leo dốc và khiến nhiệt độ dầu hộp số tự động tăng vọt.
   - Để khôi phục mô-men xoắn ban đầu, công thức tính tỷ số truyền vi sai mới:

$$
\text{Tỷ số truyền mới} = \text{Tỷ số truyền nguyên bản} \times \frac{D_{\text{lốp mới}}}{D_{\text{lốp zin}}}
$$

   - *Khuyến cáo thực tế*: Xe bán tải máy dầu từ lốp 31" lên lốp 35" cần thay cặp bánh răng vành chậu - quả dứa (Ring & Pinion) từ tỷ số truyền zin (3.73:1) sang tỷ số truyền thấp hơn là **4.56:1 hoặc 4.88:1**.

---

## 🏎️ 5. Bảng giải mã ký hiệu lốp nguyên gốc (OE Markings) của các hãng xe sang & siêu xe

Lốp OE (*Original Equipment*) là dòng lốp được các hãng ô tô danh tiếng hợp tác nghiên cứu và đặt hàng riêng độc quyền từ các thương hiệu lốp hàng đầu thế giới (Michelin, Pirelli, Continental, Goodyear, Bridgestone). Mỗi mã OE trải qua chu kỳ 2–3 năm thử nghiệm khắt khe, tinh chỉnh riêng về thành phần hợp chất cao su, độ cứng vách hông lốp, rãnh phân tán âm thanh và cấu trúc đai thép nhằm tương thích hoàn hảo với hệ thống treo, trọng tâm xe và hệ thống cân bằng điện tử.

### Bảng giải mã toàn diện hơn 40 ký hiệu OE cao cấp:

| Hãng xe | Ký hiệu OE dập nổi | Tên gọi chuẩn hoá | Đặc thù kỹ thuật & Tinh chỉnh riêng biệt của hãng xe |
|:---|:---:|:---|:---|
| **Porsche** | **N0, N1, N2, N3, N4, N5, N6** | Porsche Approved (Thế hệ N) | Ký hiệu số chỉ thế hệ phê chuẩn hợp chất cao su và kết cấu đai thép. Hông lốp cực cứng để chịu lực vặn xoắn khi vào cua gắt ở tốc độ cao trên đường đua Nürburgring. |
| **Porsche** | **NA0, NA1, NA2** | Porsche 911 Spec | Tinh chỉnh riêng cho thế hệ 911 (992), tối ưu độ bám cầu sau chịu tải động cơ đặt sau. |
| **Porsche** | **NB0, NB1** | Porsche Boxster / Cayman | Tinh chỉnh cho dòng xe thể thao động cơ đặt giữa 718. |
| **Porsche** | **NC0, NC1** | Porsche Cayenne | Chịu tải trọng lớn của dòng SUV hiệu năng cao, cân bằng off-road và on-road. |
| **Porsche** | **ND0, ND1** | Porsche Panamera | Tối ưu độ êm ái cabin kết hợp độ bám đường tốc độ cao trên cao tốc Autobahn. |
| **Porsche** | **NE0, NE1** | Porsche Macan | Dành cho Compact SUV thể thao của Porsche. |
| **Porsche** | **NF0, NF1** | Porsche Taycan (EV) | Cản lăn siêu thấp, triệt tiêu tiếng vọng khoang lái, chịu mô-men xoắn tức thời cực lớn. |
| **Ferrari** | **K1, K2, K3** | Ferrari Spec | Hợp chất cao su mềm Semi-slick, tối ưu bám đường khô tuyệt đối và phản xạ vô lăng cực nhạy. |
| **Ferrari** | **F01, F02, F03** | Ferrari Special Projects | Phát triển riêng cho các dòng siêu xe giới hạn (LaFerrari, Daytona SP3, 812 Competizione). |
| **Mercedes-Benz** | **MO** | Mercedes Original | Tiêu chuẩn xuất xưởng của Mercedes-Benz: Tối ưu triệt để độ êm ái, giảm rung chấn và tương thích hệ thống phanh ABS/ESP. |
| **Mercedes-AMG** | **MO1** | Mercedes-AMG Original | Phát triển độc quyền cho các phiên bản hiệu năng cao AMG (A45, C63, E63, GT Coupe), cao su bám đường thể thao. |
| **Mercedes-Benz** | **MOE** | Mercedes Original Extended | Lốp chống xịt Run-flat theo tiêu chuẩn êm ái riêng của Mercedes (chạy tiếp 80 km ở 80 km/h khi mất áp suất). |
| **Mercedes-Benz** | **MOS** | Mercedes Original Silent | Lót lớp đệm bọt biển (Polyurethane foam) bên trong lòng lốp triệt tiêu tiếng ồn khoang lái (S-Class, Maybach, EQS). |
| **Mercedes-Benz** | **MO-V** | Mercedes Original Van | Dành riêng cho xe chở khách VIP và van thương mại hạng sang (V-Class, Vito, Sprinter). |
| **BMW / MINI** | **★ (Ngôi sao)** | BMW Star Marking | Chứng nhận kỹ thuật độc quyền của tập đoàn BMW. Tinh chỉnh phân bổ lực kéo cho hệ dẫn động cầu sau RWD và 4 bánh xDrive. |
| **BMW M** | **★ M** / **M3** | BMW M Performance | Hợp chất gai bất đối xứng kép, tối ưu cho dòng xe đua thể thao BMW M2, M3, M4, M5, M8. |
| **BMW i** | **★ I** | BMW i-Series (EV) | Tối ưu lực cản lăn cực thấp và triệt tiêu tiếng ồn cho xe thuần điện (i4, iX, i7). |
| **Audi** | **AO** | Audi Original | Chứng nhận chính hãng của Audi, tối ưu độ êm và cân bằng phanh. |
| **Audi Sport** | **RO1, RO2** | Audi Quattro Sport | Tinh chỉnh cho các dòng siêu xe RS (RS4, RS6, RS7) và Audi R8, tối ưu độ bám cho hệ dẫn động 4 bánh Quattro thể thao. |
| **Audi** | **AOE** | Audi Original Extended | Lốp Run-flat dành cho các dòng sedan cao cấp Audi. |
| **Audi** | **AO-Silent** | Audi Sound Comfort | Tích hợp công nghệ đệm xốp cách âm trong lòng lốp cho Audi A8 và e-tron GT. |
| **Tesla** | **T0, T1, T2** | Tesla Original Equipment | Tích hợp lớp xốp tiêu âm (Acoustic Foam), chỉ số tải trọng cao XL/HL, chịu gia tốc tức thời từ mô-tơ điện cực mạnh. |
| **Lamborghini** | **L** | Lamborghini Spec | Thiết kế riêng cho siêu xe bò tót (Aventador, Huracán, Revuelto, Urus), thành lốp chịu lực ly tâm cực đại. |
| **Maserati** | **MGT** | Maserati Genuine Tires | Tối ưu cho dòng xe GranTurismo, Ghibli, Levante, Quattroporte của Ý. |
| **Aston Martin** | **AM8, AM9, AML, AMP** | Aston Martin Spec | Tinh chỉnh phản ứng lái chính xác và độ êm ái quý tộc Anh cho DB11, DBS, Vantage, DBX. |
| **McLaren** | **MC, MC1** | McLaren Approved | Hợp tác độc quyền với Pirelli, tối ưu khí động học và độ bám cho khung gầm sợi carbon MonoCell. |
| **Bentley** | **B, B1, BC, BL** | Bentley Spec | Chịu khối lượng xe siêu nặng ($\gt 2.5$ tấn) ở vận tốc trên 300 km/h của Continental GT, Flying Spur, Bentayga. |
| **Rolls-Royce** | **RR** | Rolls-Royce Approved | Tiêu chuẩn cách âm tuyệt đối "Magic Carpet Ride", triệt tiêu hoàn toàn rung chấn từ mặt đường. |
| **Jaguar** | **J** | Jaguar Original | Tinh chỉnh phản xạ lái năng động cho dòng xe thể thao Jaguar (F-Type, F-Pace, XF). |
| **Land Rover** | **LR** | Land Rover Approved | Tối ưu cho hệ thống dẫn động Terrain Response của Range Rover, Defender, Discovery. |
| **Jaguar Land Rover**| **JLR** | Jaguar Land Rover Joint | Ký hiệu hợp nhất dùng chung cho cả 2 thương hiệu JLR từ năm 2020 trở lại đây. |
| **Volvo** | **VOL** | Volvo Original | Tập trung vào khoảng cách phanh an toàn tối đa trong điều kiện thời tiết tuyết ướt Bắc Âu. |
| **Alfa Romeo** | **AR, ARR** | Alfa Romeo Spec | Ký hiệu AR cho xe Alfa Romeo tiêu chuẩn; ARR dành cho dòng hiệu năng cao Quadrifoglio (Giulia, Stelvio). |
| **Lotus** | **LTS** | Lotus Special Spec | Hợp chất lốp siêu nhẹ, tối ưu bám cua cho dòng xe thể thao trọng lượng nhẹ (Elise, Exige, Emira). |
| **Ford Performance**| **FP** | Ford Performance | Dành riêng cho Shelby GT350/GT500, Ford GT, F-150 Raptor R. |
| **General Motors** | **TPC Spec** | Tire Performance Criteria | Mã kiểm định chất lượng gồm 4 chữ số của GM cho Chevrolet Corvette, Cadillac V-Blackwing. |
| **Hyundai N** | **HN** | Hyundai N Performance | Phát triển riêng cùng Pirelli/Michelin cho xe thể thao i30 N, Elantra N, Ioniq 5 N. |
| **Volkswagen** | **+ (Dấu cộng)** | Volkswagen Original | Chứng nhận kỹ thuật cho xe du lịch Volkswagen (Golf GTI, Passat, Touareg). |

### 💡 Lưu ý cốt tử cho Kỹ thuật viên xưởng khi thay thế lốp xe sang:
1. **Hệ dẫn động 4 bánh toàn thời gian (AWD / 4WD)**: Các hệ dẫn động như BMW xDrive, Mercedes 4MATIC hay Audi Quattro cực kỳ nhạy cảm với sai lệch chu vi bánh xe giữa trục trước và trục sau. Dù cùng ghi thông số `245/40R19`, một chiếc lốp thường và một chiếc lốp chuẩn OE có thể chênh lệch chu vi lăn từ 1% đến 2%. Lắp lẫn lốp không đúng chuẩn OE sẽ làm nóng bộ ly hợp vi sai trung tâm, kích hoạt đèn cảnh báo hệ thống truyền động và gây hỏng hộp phân phối lực kéo.
2. **Quy tắc thay đồng bộ theo trục**: Luôn luôn thay tối thiểu 1 cặp lốp cùng ký hiệu OE trên cùng một trục dẫn động. Không bao giờ lắp 1 bánh lốp tiêu chuẩn bên cạnh 1 bánh lốp chuẩn OE.

---

## ⛰️ 6. Phân loại cấu trúc gai theo địa hình vận hành

* **H/T (Highway Terrain)**: 85% đường phố / 15% đường xấu nhẹ. Rãnh thoát nước dọc sâu, giảm tối đa độ ồn vọng vào cabin, phanh ướt ngắn, êm ái trên cao tốc.
* **A/T (All-Terrain)**: 50% On-road / 50% Off-road. Gai khối đan xen ziczac, thành hông lốp dày 2–3 lớp bố sợi gia cường chống đá nhọn chém rách hông khi vượt cát, sỏi, đất đồi.
* **R/T (Rugged Terrain)**: Cầu nối lai giữa A/T và M/T. Khối gai hông hầm hố, rãnh tự đẩy bùn đất nhưng dải gai giữa liên kết giúp triệt tiêu tiếng gầm khi chạy trên cao tốc.
* **M/T (Mud Terrain)**: 15% phố / 85% bùn lầy, đất sét. Các vấu cao su lớn cách xa nhau, tự văng đất bùn khi bánh quay nhanh, không phù hợp chạy tốc độ cao trên đường nhựa ướt.

---

## 🛠️ 7. Cẩm nang chẩn đoán sai lệch góc lái qua hình thái mòn lốp

Kiểm tra bề mặt lốp là cách nhanh nhất để kỹ thuật viên xưởng phát hiện hư hỏng cơ khí ở hệ thống treo, bạc đạn moay-ơ và góc đặt bánh xe:

| Hình thái mòn bề mặt | Nguyên nhân kỹ thuật chính | Biện pháp khắc phục tại xưởng |
|:---|:---|:---|
| **Mòn lệch vai trong (Inner Shoulder Wear)** | Góc Camber âm quá lớn (Negative Camber), xệ lò xo phuộc hoặc rơ rotuyn càng A | Cân chỉnh lại góc Camber trên bàn thước lái 3D, thay cao su càng A |
| **Mòn lệch vai ngoài (Outer Shoulder Wear)** | Góc Camber dương quá lớn (Positive Camber) hoặc vào cua gấp liên tục | Giảm bớt góc Camber dương về mức tiêu chuẩn OEM |
| **Mòn răng cưa / Gai lông nhím (Feathering)** | Sai độ chụm (Toe-in quá nhiều mòn mép trong gai; Toe-out quá nhiều mòn mép ngoài) | Căn chỉnh lại độ dài thanh giằng lái (Tie-rod) để đưa Toe về 0 hoặc tiêu chuẩn |
| **Mòn gồ ghề lõm từng vệt (Cupping / Scalloping)** | Phuộc giảm xóc bị chảy dầu, hết độ nhún, bạc đạn moay-ơ rơ rảo hoặc mâm méo | Thay thế phuộc giảm chấn, kiểm tra bạc đạn bánh và cân mâm chì bấm |
| **Mòn giữa mặt lốp (Center Wear)** | Bơm lốp quá căng (Over-inflation) kéo dài, mặt lốp bị phồng cung tròn | Đo lại áp suất lạnh và hạ về mức khuyến nghị trên tem cửa tài xế |
| **Mòn cả 2 bên vai lốp (Shoulder Wear)** | Lốp non hơi (Under-inflation) hoặc xe thường xuyên chở quá tải trọng | Bơm bổ sung áp suất, kiểm tra chân van có bị xì chân không |

::: tip 💡 Tư vấn xưởng chuyên nghiệp
Khi tiến hành thay lốp mới cho khách hàng, nếu thấy có bất kỳ dấu hiệu mòn bất thường nào ở trên, kỹ thuật viên cần khuyến nghị thực hiện **Cân chỉnh thước lái góc đặt bánh xe (Wheel Alignment 3D)** ngay lập tức. Nếu không chỉnh lại góc lái, bộ lốp mới đắt tiền có thể bị mòn vẹt chỉ sau 5.000 – 10.000 km đầu tiên!
:::
