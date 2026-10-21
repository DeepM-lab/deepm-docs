# Chuyên đề 04: Performance & Tuning (12 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-04` | **Dải công cụ**: `DM-037` đến `DM-048`  
> **Đối tượng ứng dụng**: Kỹ thuật viên cân chỉnh ECU (Tuner/Remapper), thợ độ động cơ nạp khí cưỡng bức Turbo/Supercharger, xưởng gia công cơ khí động cơ đóng nòng lên cos.  
> **Mục tiêu kỹ thuật**: Tính toán dung tích xi-lanh động cơ $V_d$, tỷ số nén tĩnh $CR$, tốc độ piston trung bình $U_p$, áp suất chỉ thị trung bình BMEP, lưu lượng kim phun xăng/dầu, tỷ số nén máy nén tăng áp $PR$ và suất tiêu hao nhiên liệu riêng BSFC.

---

## [DM-037] Dung Tích Công Tác Động Cơ (Engine Swept Displacement)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Thợ đại tu động cơ, xưởng doa nòng xi lanh / độ dên trục khuỷu

### 1. Công thức toán học (Mathematical Formula)

$$
V_d = \frac{\pi}{4} \times B_{\text{mm}}^2 \times S_{\text{mm}} \times \frac{N_c}{10^6}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $B_{\text{mm}}$ | Đường kính lòng xi-lanh (Bore) | milimét (mm) | Đường kính thực tế sau khi doa lốc máy |
| $S_{\text{mm}}$ | Hành trình dịch chuyển của piston (Stroke) | milimét (mm) | Hành trình do bán kính tay quay trục khuỷu quy định |
| $N_c$ | Tổng số lượng xi-lanh động cơ | Số nguyên | Thường là 3, 4, 6, 8 xi-lanh |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức tính dung tích quét công tác hữu ích của piston trong lòng xi lanh; chưa bao gồm thể tích chỏm buồng nổ trên nắp quy lát ($V_c$).
- Kết quả quy đổi chia cho $10^6$ để trả về đơn vị chuẩn Lít (L).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi doa nòng lên cos hoặc thay trục khuỷu hành trình dài (Stroker Kit), dung tích tăng lên kéo theo tỷ số nén tăng theo. Nếu không cân lại thể tích buồng nổ và map lại góc đánh lửa, động cơ sẽ bị kích nổ (knock) phá vỡ piston ngay lần chạy Dyno đầu tiên.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học giải tích
- **Nguồn 1**: [EngineeringToolbox - Engine Displacement Calculation](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Engine Geometry](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-038] Tỷ Số Nén Tĩnh Của Buồng Cháy (Static Compression Ratio)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ sư cân buồng nổ động cơ độ (Engine Blueprinting)

### 1. Công thức toán học (Mathematical Formula)

$$
CR = \frac{V_s + V_c}{V_c}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_s$ | Dung tích quét của một xi lanh (Swept volume) | cm³ / mL | $V_s = \frac{V_d}{N_c} \times 1000$ |
| $V_c$ | Tổng thể tích khoảng chết buồng nổ (Clearance volume) | cm³ / mL | Đo thực tế bằng buret dầu cân buồng đốt |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Thể tích khoảng chết $V_c$ bắt buộc phải tính tổng đại số bao gồm: (1) Thể tích chỏm buồng cháy trên nắp máy, (2) Bề dày gioăng nắp quy lát sau khi xiết chặt, (3) Khe hở mép piston xuống mặt thớt lốc (Deck clearance), (4) Thể tích rãnh vành xéc-măng trên cùng, trừ đi thể tích lồi của đỉnh piston (hoặc cộng thêm thể tích lõm chỏm piston).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Bào mặt máy (nắp quy lát) quá sâu để tăng $CR$ trên động cơ Turbo nạp cưỡng bức là cực kỳ nguy hiểm. Tỷ số nén tĩnh vượt quá $10{,}5:1$ trên máy tăng áp dùng xăng A95 thương mại sẽ gây kích nổ phá hủy động cơ.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học tỷ số thể tích
- **Nguồn 1**: [EngineeringToolbox - Internal Combustion Engines](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Compression Ratio Parameters](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-039] Tốc Độ Piston Trung Bình (Mean Piston Speed)

> **Phân loại độ tin cậy**: Chuẩn động học  
> **Nhóm người dùng**: Kỹ thuật viên cài đặt ngưỡng giới hạn tua máy Redline (Rev Limiter)

### 1. Công thức toán học (Mathematical Formula)

$$
U_p = \frac{2 \times S_{\text{m}} \times n_{\text{rpm}}}{60}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $S_{\text{m}}$ | Hành trình di chuyển của piston (Stroke) | mét (m) | Đổi từ mm sang m: $S_{\text{m}} = \frac{S_{\text{mm}}}{1000}$ |
| $n_{\text{rpm}}$ | Tốc độ vòng tua máy của trục khuỷu | vòng/phút (rpm) | Tua máy khảo sát hoặc ngưỡng Redline |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đây là vận tốc tịnh tiến bình quân trên suốt quãng đường đi; vận tốc đỉnh tức thời (Peak piston velocity) tại vị trí tay biên vuông góc với má dên lớn hơn khoảng $1{,}6$ lần.
- Động cơ thương mại bền bỉ: $U_p \le 18 - 20\text{ m/s}$; Động cơ hiệu năng cao: $21 - 24\text{ m/s}$; Động cơ xe đua F1 / drag chuyên nghiệp: $25 - 26{,}5\text{ m/s}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Nếu nâng tua máy khiến $U_p > 25\text{ m/s}$ trên các tay biên (Connecting Rod) và bu-lông biên đúc nguyên bản, lực quán tính đổi chiều cực đại ở điểm chết trên (TDC) sẽ làm đứt bu-lông dên và gãy tay biên "đâm lòi mắt" thủng lốc máy.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn động học cơ cấu tay quay thanh truyền
- **Nguồn 1**: [EngineeringToolbox - Piston Speed Mechanics](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Kinematic Velocity](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-040] Công Suất Động Cơ Từ Mô-Men & Vòng Tua (Power from Torque & RPM)

> **Phân loại độ tin cậy**: Chuẩn cơ học  
> **Nhóm người dùng**: Kỹ thuật viên bàn chạy Dyno kiểm tra công suất xe

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{kW}} = \frac{T_{\text{N.m}} \times n_{\text{rpm}}}{9549{,}2966}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $T_{\text{N.m}}$ | Mô-men xoắn đo được | N.m | Mô-men xoắn tại trục khuỷu hoặc bánh xe |
| $n_{\text{rpm}}$ | Tốc độ vòng tua máy tương ứng | rpm | Tua máy tại thời điểm đo mô-men |
| $9549{,}2966$ | Hằng số quy đổi chuẩn giải tích | Không thứ nguyên | $\frac{60 \times 1000}{2\pi} \approx 9549{,}2966$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Cần phân biệt rõ: Công suất đo tại trục cốt máy (Brake/Crank HP) và công suất đo tại bánh xe trên bàn Dyno (Wheel HP). Tổn hao truyền động qua hộp số, các-đăng và vi sai thường chiếm $12 - 18\%$ trên xe cầu sau và $18 - 25\%$ trên xe 2 cầu 4WD.
- Quy đổi sang Mã lực cơ học: $P_{\text{HP}} = P_{\text{kW}} \times 1{,}34102$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi đo kéo Dyno WOT (Wide Open Throttle), quạt gió làm mát két nước trước đầu xe phải có lưu lượng gió tối thiểu $40.000\text{ m}^3/\text{h}$ để tránh động cơ bị sôi nước và quá nhiệt khí nạp.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cơ học mô-men công suất
- **Nguồn 1**: [EngineeringToolbox - Torque to Horsepower/kW Formula](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Mechanical Power Definition](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-041] Áp Suất Chỉ Thị Trung Bình BMEP Động Cơ 4 Kỳ (Brake Mean Effective Pressure)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư đánh giá mức độ căng thẳng buồng nổ và tiềm năng động cơ

### 1. Công thức toán học (Mathematical Formula)

$$
\text{BMEP}_{\text{Pa}} = \frac{4\pi \times T_{\text{N.m}}}{V_{d\_\text{m}^3}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $T_{\text{N.m}}$ | Mô-men xoắn cực đại của động cơ | N.m | Đo tại trục cốt máy |
| $V_{d\_\text{m}^3}$ | Tổng dung tích công tác quét của động cơ | m³ | Đổi từ Lít sang m³: $V_{d\_\text{m}^3} = \frac{V_d}{1000}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức trên chỉ áp dụng riêng cho động cơ 4 kỳ (sinh công sau 2 vòng quay trục khuỷu). Động cơ 2 kỳ dùng hệ số $2\pi$.
- Đổi từ Pascal sang Bar: $\text{BMEP}_{\text{bar}} = \frac{\text{BMEP}_{\text{Pa}}}{10^5}$.
- Động cơ xăng hút khí tự nhiên NA: $\text{BMEP} \approx 10 - 13\text{ bar}$; Động cơ tăng áp thương mại: $16 - 22\text{ bar}$; Động cơ đua đỉnh cao: $25 - 35\text{ bar}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- $\text{BMEP}$ là chỉ số phản ánh trực tiếp ứng suất nhiệt và ứng suất cơ đè lên đỉnh piston, bạc xéc-măng và bu-lông nắp máy. Đẩy BMEP lên quá cao bằng cách nhồi boost lớn mà không giảm tỷ số nén tĩnh sẽ làm thổi bay gioăng nắp máy (head gasket).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình nhiệt động học động cơ đốt trong
- **Nguồn 1**: [EngineeringToolbox - BMEP Calculation in ICE](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Engine Thermodynamics](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-042] Tỷ Lệ Hòa Khí Không Khí / Nhiên Liệu AFR (Air-Fuel Ratio)

> **Phân loại độ tin cậy**: Chuẩn định nghĩa  
> **Nhóm người dùng**: Kỹ thuật viên cân chỉnh xăng gió trên bàn Dyno

### 1. Công thức toán học (Mathematical Formula)

$$
\text{AFR} = \frac{\dot{m}_{\text{air}}}{\dot{m}_{\text{fuel}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\dot{m}_{\text{air}}$ | Lưu lượng khối lượng gió nạp vào buồng đốt | kg/h | Đo bằng cảm biến gió MAF (Mass Air Flow) |
| $\dot{m}_{\text{fuel}}$ | Lưu lượng khối lượng nhiên liệu phun vào | kg/h | Tổng khối lượng nhiên liệu bơm vào |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tỷ lệ hòa khí bắt buộc phải tính theo tỷ số khối lượng (Mass Ratio), không tính theo tỷ số thể tích vì khối lượng riêng của không khí biến thiên rất mạnh theo nhiệt độ và áp suất khí quyển.
- Tỷ lệ lý thuyết (Stoichiometric AFR) tùy thuộc vào loại nhiên liệu: Xăng khoáng RON 95/98: $14{,}7:1$; Xăng sinh học E10: $14{,}08:1$; Xăng cồn đua E85: $9{,}76:1$; Dầu Diesel: $14{,}5:1$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Trên động cơ xăng tăng áp khi chạy hết ga WOT, chạy nghèo xăng ($\text{AFR} > 12{,}5:1$) sẽ làm nhiệt độ khí xả (EGT) vọt lên trên $950^\circ\text{C}$, làm nóng chảy đầu bugi và cháy thủng đỉnh piston. Tuner chuyên nghiệp luôn canh AFR an toàn ở mức $11{,}2 - 11{,}8:1$.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định nghĩa khối lượng hóa học
- **Nguồn 1**: [EngineeringToolbox - Combustion and Air-Fuel Ratio](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Stoichiometric Combustion Constants](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-043] Hệ Số Dư Lượng Không Khí Lambda $\lambda$ (Excess Air Ratio Lambda)

> **Phân loại độ tin cậy**: Chuẩn định nghĩa  
> **Nhóm người dùng**: Tuner đọc dữ liệu cảm biến oxy băng rộng (Wideband O2 Sensor)

### 1. Công thức toán học (Mathematical Formula)

$$
\lambda = \frac{\text{AFR}_{\text{actual}}}{\text{AFR}_{\text{stoich}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\text{AFR}_{\text{actual}}$ | Tỷ lệ hòa khí thực tế đo được từ cảm biến | Không thứ nguyên | Tỷ lệ gió/xăng đo trong cổ bô xả |
| $\text{AFR}_{\text{stoich}}$ | Tỷ lệ hòa khí lý thuyết chuẩn của loại nhiên liệu đang dùng | Không thứ nguyên | Xăng thuần: $14{,}7$; E85: $9{,}76$; E100: $9{,}0$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- $\lambda = 1{,}0$: Hòa khí lý thuyết chuẩn (khí thải sạch nhất cho bầu lọc khí thải Catalytic Converter).
- $\lambda < 1{,}0$: Hòa khí giàu (Rich) — ví dụ $\lambda = 0{,}82$ tối ưu công suất cực đại cho máy Turbo.
- $\lambda > 1{,}0$: Hòa khí nghèo (Lean) — ví dụ $\lambda = 1{,}05$ tối ưu tiết kiệm nhiên liệu khi chạy trớn đường trường (Cruising).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cảm biến oxy băng rộng (Wideband sensor) đo nồng độ oxy dư trong khí xả để suy ra $\lambda$. Khi động cơ bị bỏ máy (misfire), oxy không cháy thoát ra ống xả khiến cảm biến hiểu nhầm là hòa khí đang quá nghèo ($\lambda \gg 1$) $\implies$ Nếu Tuner không chú ý mà tăng thêm xăng sẽ làm ngập xăng ướt sũng bu-gi.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định nghĩa không thứ nguyên
- **Nguồn 1**: [EngineeringToolbox - Lambda Sensor Calibration](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Fuel Combustion Ratios](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-044] Lưu Lượng Kim Phun Tối Thiểu (Minimum Injector Flow Rate)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên chọn kim phun độ (Bosch Motorsport, DeatschWerks)

### 1. Công thức toán học (Mathematical Formula)

$$
\dot{m}_{\text{inj}} = \frac{\dot{m}_{\text{fuel}}}{N_{\text{inj}} \times \text{DC}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\dot{m}_{\text{fuel}}$ | Tổng lưu lượng nhiên liệu cần cấp cho động cơ | kg/h | Tính từ công suất đỉnh mong muốn và chỉ số BSFC |
| $N_{\text{inj}}$ | Số lượng kim phun nhiên liệu chính | Số nguyên | Thường bằng số xi-lanh động cơ (hoặc gấp đôi nếu có dàn phụ) |
| $\text{DC}$ | Chu kỳ mở kim phun tối đa an toàn (Duty Cycle) | Thập phân ($0..1$) | Khuyến nghị tối đa $\text{DC} \le 0{,}80 - 0{,}85$ ($80 - 85\%$) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Quy đổi từ khối lượng dòng sang thể tích: $q_{\text{cc/min}} = \frac{\dot{m}_{\text{inj\_kg/h}} \times 1000}{60 \times \rho_{\text{fuel}}}$ (với xăng $\rho \approx 0{,}74\text{ kg/L}$).
- Không nên chọn kim phun quá lớn so với nhu cầu vì ở dải tua cầm chừng không tải (idle), thời gian mở kim quá ngắn ($< 1\text{ ms}$) nằm ngoài vùng tuyến tính của kim, gây nổ lụp bụp rung giật.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cấm tuyệt đối chạy kim phun ở chu kỳ làm việc liên tục $\text{DC} > 90\%$. Cuộn hút điện từ của kim phun sẽ bị quá nhiệt dẫn đến tình trạng kim phun bị treo cứng (static/locked) không đóng mở chuẩn xác, khiến động cơ thiếu xăng đột ngột sinh kích nổ.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình phân bổ dòng nhiên liệu
- **Nguồn 1**: [EngineeringToolbox - Fuel Injection Sizing](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Fluid Delivery Orifice](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-045] Hiệu Chỉnh Lưu Lượng Kim Phun Theo Áp Suất Rail (Injector Flow vs Fuel Pressure)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Thợ lắp van điều áp xăng độ FPR (Fuel Pressure Regulator)

### 1. Công thức toán học (Mathematical Formula)

$$
q_2 = q_1 \times \sqrt{\frac{\Delta p_2}{\Delta p_1}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $q_1$ | Lưu lượng danh định ban đầu của kim phun | cc/phút | Công bố ở áp suất kiểm chuẩn (thường $3{,}0\text{ bar}$ / $43{,}5\text{ psi}$) |
| $\Delta p_1$ | Áp suất chênh lệch gốc khi đo kiểm định mức | bar / psi | Áp chuẩn gốc (thường $3{,}0\text{ bar}$) |
| $\Delta p_2$ | Áp suất chênh lệch mới thực tế trên giàn phun | bar / psi | Áp suất mới sau khi chỉnh van điều áp |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức căn bậc hai của dòng chảy qua lỗ tiết lưu Bernoulli.
- Áp suất chênh lệch $\Delta p$ là áp suất nhiên liệu trên đường rail trừ đi áp suất trong cổ hút nạp: $\Delta p = p_{\text{rail}} - p_{\text{manifold}}$. Khi động cơ nạp boost $1{,}5\text{ bar}$, van FPR có bù áp chân không phải nâng áp đường rail lên thêm tương ứng $1{,}5\text{ bar}$ để giữ nguyên $\Delta p$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Nâng áp suất nhiên liệu lên quá cao ($> 5{,}0\text{ bar}$) sẽ khiến bơm xăng bị tụt lưu lượng nhanh chóng và cuộn hút kim phun không đủ lực mở nhấc kim (khóa áp - hydraulic lock), gây tụt áp giàn phun lúc tua cao.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình thủy lực tiết lưu Bernoulli
- **Nguồn 1**: [EngineeringToolbox - Flow through Orifice](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Fuel System Pressure](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-046] Tỷ Số Nén Của Máy Nén Turbo (Compressor Pressure Ratio PR)

> **Phân loại độ tin cậy**: Chuẩn định nghĩa  
> **Nhóm người dùng**: Kỹ sư chọn Turbo tra cứu bản đồ máy nén (Compressor Map)

### 1. Công thức toán học (Mathematical Formula)

$$
PR = \frac{p_{\text{boost}} + p_{\text{baro}}}{p_{\text{baro}} - \Delta p_{\text{filter}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $p_{\text{boost}}$ | Áp suất tăng áp tương đối (Gauge Boost) | kPa / bar | Áp suất hiển thị trên đồng hồ đo turbo táp-lô |
| $p_{\text{baro}}$ | Áp suất khí quyển môi trường xung quanh | kPa / bar | Chuẩn mực nước biển: $101{,}3\text{ kPa}$ ($1{,}013\text{ bar}$) |
| $\Delta p_{\text{filter}}$ | Tổn thất sụt áp qua bầu lọc gió và ống thở | kPa / bar | Thường từ $2 - 5\text{ kPa}$ tùy độ sạch của lọc gió |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Bắt buộc phải chuyển đổi sang áp suất tuyệt đối (Absolute Pressure) trước khi chia tỷ số. Không bao giờ lấy trực tiếp áp suất tương đối trên đồng hồ gauge để tra cứu bản đồ Turbo.
- Khi leo đèo vùng núi cao (như Đà Lạt, Sa Pa), $p_{\text{baro}}$ giảm xuống chỉ còn khoảng $85\text{ kPa}$, khiến $PR$ bị đẩy vọt lên cao hơn dù áp suất boost giữ nguyên.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- $PR$ tăng cao ở vùng núi cao làm cánh quạt Turbo phải quay nhanh hơn rất nhiều để duy trì mức boost, dễ đẩy Turbo rơi vào vùng quá tốc cánh quạt (Overspeeding) làm nổ vỡ bạc đạn đỡ trục.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định nghĩa nhiệt động lực học
- **Nguồn 1**: [EngineeringToolbox - Compressor Pressure Ratio](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Turbocharger Basics](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-047] Nhiệt Độ Khí Nạp Sau Nén Của Turbo (Compressor Discharge Temperature)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên thiết kế két làm mát khí nạp Intercooler

### 1. Công thức toán học (Mathematical Formula)

$$
T_2 = T_1 \times \left[1 + \frac{PR^{\frac{\gamma - 1}{\gamma}} - 1}{\eta_c}\right]
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $T_1$ | Nhiệt độ tuyệt đối của không khí nạp đầu vào Turbo | Kelvin (K) | $T_{\text{K}} = T_{^\circ\text{C}} + 273{,}15$ |
| $PR$ | Tỷ số nén của máy nén Turbo | Không thứ nguyên | Tính từ công thức DM-046 |
| $\gamma$ | Chỉ số đoạn nhiệt của không khí | Không thứ nguyên | Hằng số khí hai nguyên tử: $\gamma = 1{,}4$ |
| $\eta_c$ | Hiệu suất đoạn nhiệt đẳng entropy của máy nén | Thập phân ($0..1$) | Tra bản đồ Compressor Map (thường $0{,}65 - 0{,}78$) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức dựa trên quá trình nén đoạn nhiệt khí lý tưởng.
- Với mức boost $1{,}5\text{ bar}$ ($PR \approx 2{,}5$) ở nhiệt độ khoang máy $40^\circ\text{C}$ và hiệu suất $\eta_c = 0{,}70$, nhiệt độ khí xả ra khỏi miệng turbo $T_2$ có thể lên tới $175^\circ\text{C} - 190^\circ\text{C}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khí nạp ở nhiệt độ trên $150^\circ\text{C}$ có khối lượng riêng rất loãng và dễ gây hiện tượng kích nổ tự cháy (Pre-ignition). Bắt buộc phải có két giải nhiệt Intercooler (gió-gió hoặc nước-gió) hạ nhiệt khí nạp về dưới $45 - 50^\circ\text{C}$ trước khi vào bướm ga.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình đoạn nhiệt nhiệt động học
- **Nguồn 1**: [EngineeringToolbox - Adiabatic Compression of Air](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Gas Isentropic Flow](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-048] Suất Tiêu Hao Nhiên Liệu Riêng BSFC (Brake Specific Fuel Consumption)

> **Phân loại độ tin cậy**: Chuẩn định nghĩa  
> **Nhóm người dùng**: Kỹ sư thử nghiệm động cơ, chuyên gia map động cơ tối ưu hiệu suất

### 1. Công thức toán học (Mathematical Formula)

$$
\text{BSFC} = \frac{\dot{m}_{\text{fuel\_kg/h}}}{P_{\text{kW}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\dot{m}_{\text{fuel\_kg/h}}$ | Lưu lượng nhiên liệu tiêu thụ | kg/giờ (kg/h) | Cân khối lượng nhiên liệu rút khỏi bình trong 1 giờ |
| $P_{\text{kW}}$ | Công suất có ích tại trục đo được trên Dyno | kilowatt (kW) | Công suất cơ học sinh ra |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đơn vị tính chuẩn quốc tế: $\text{kg/(kW}\cdot\text{h)}$ hoặc $\text{g/(kW}\cdot\text{h)}$.
- Động cơ xăng hút khí tự nhiên NA hiệu năng cao: $240 - 270\text{ g/kWh}$; Động cơ xăng Turbo: $270 - 320\text{ g/kWh}$ (do phải phun thêm xăng làm mát); Động cơ Diesel Turbo hiện đại: $190 - 230\text{ g/kWh}$.
- Không tự suy ra hiệu suất nhiệt $\eta_{\text{th}}$ nếu không biết chính xác nhiệt trị thấp (LHV) của nhiên liệu.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Nếu BSFC tăng đột biến ở một dải tua máy nhất định, điều đó cho thấy góc đánh lửa đang quá trễ hoặc động cơ bị kích nổ khiến ECU tự động lùi góc đánh lửa và phun đậm xăng để giải nhiệt buồng nổ.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định nghĩa năng suất nhiệt cơ
- **Nguồn 1**: [EngineeringToolbox - BSFC & Engine Thermal Efficiency](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Specific Fuel Consumption](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)
