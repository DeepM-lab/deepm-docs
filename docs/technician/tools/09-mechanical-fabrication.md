# Chuyên đề 09: Mechanical & Fabrication (12 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-09` | **Dải công cụ**: `DM-093` đến `DM-104`  
> **Đối tượng ứng dụng**: Xưởng cơ khí chế tạo, thợ gá hàn khung xe đua lồng cuộn Rollcage, thợ độ cẩu tời cứu hộ và ben nâng hạ thủy lực gầm xe, kỹ sư kết cấu sắt-xi ô tô.  
> **Mục tiêu kỹ thuật**: Tính toán sức bền vật liệu (ứng suất kéo nén, ứng suất uốn Euler-Bernoulli, độ võng dầm), mô-men quán tính ống thép tròn, tải trọng nén uốn dọc tới hạn Euler, lực đẩy/kéo ben thủy lực nâng hạ và tuổi thọ vòng bi ổ lăn ISO 281.

---

## [DM-093] Ứng Suất Cơ Học Kéo Nén Dọc Trục (Axial Tensile & Compressive Stress)

> **Phân loại độ tin cậy**: Chuẩn sức bền  
> **Nhóm người dùng**: Kỹ sư kết cấu cơ khí, thợ tính toán bu-lông gá neo chịu lực

### 1. Công thức toán học (Mathematical Formula)

$$
\sigma = \frac{F_N}{A_{\text{m}^2}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $F_N$ | Lực pháp tuyến dọc trục kéo hoặc nén | Newton (N) | Tải trọng tác dụng đúng tâm |
| $A_{\text{m}^2}$ | Tiết diện ngang chịu lực của chi tiết | mét vuông (m²) | Đổi từ mm² sang m²: $A_{\text{m}^2} = \frac{A_{\text{mm}^2}}{10^6}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức áp dụng trong miền biến dạng đàn hồi tuyến tính tuân theo định luật Hooke ($\sigma \le \sigma_{\text{yield}}$).
- Tải trọng phải tác dụng đúng tâm dọc trục; không áp dụng trực tiếp cho các kết cấu chịu lực lệch tâm sinh mô-men uốn phụ.
- Đổi đơn vị sang Megapascal: $1\text{ MPa} = 10^6\text{ Pa} = 1\text{ N/mm}^2$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi thiết kế tai móc neo cứu hộ (Recovery Points), ứng suất tính toán $\sigma$ bắt buộc phải nhỏ hơn giới hạn chảy cho phép: $\sigma \le \frac{\sigma_y}{SF}$ với hệ số an toàn tối thiểu $SF \ge 2{,}5 - 3{,}0$. Nếu vượt quá giới hạn chảy của thép (ví dụ thép SS400 $\sigma_y \approx 235\text{ MPa}$), tai neo sẽ bị kéo dãn dẻo và đứt phăng gây tai nạn chết người.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn sức bền vật lý cổ điển
- **Nguồn 1**: [EngineeringToolbox - Stress and Strain](https://www.engineeringtoolbox.com/stress-strain-d_950.html)
- **Nguồn 2**: [EngineeringToolbox - Hydraulic Force Mechanics](https://www.engineeringtoolbox.com/hydraulic-force-calculator-d_1369.html)

---

## [DM-094] Ứng Suất Uốn Dầm Kết Cấu (Beam Bending Stress)

> **Phân loại độ tin cậy**: Chuẩn sức bền  
> **Nhóm người dùng**: Kỹ sư gia cố dầm chassis, thợ gá pát tời cứu hộ cản trước

### 1. Công thức toán học (Mathematical Formula)

$$
\sigma_{\text{bending}} = \frac{M \times y}{I}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $M$ | Mô-men uốn tại tiết diện khảo sát | Newton-mét (N.m) | Tính từ biểu đồ nội lực mô-men uốn |
| $y$ | Khoảng cách từ trục trung hòa đến thớ vật liệu ngoài cùng | mét (m) | Thớ xa nhất chịu ứng suất kéo/nén lớn nhất |
| $I$ | Mô-men quán tính diện tích của mặt cắt ngang dầm | $m^4$ | Đại lượng chống uốn hình học của tiết diện |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Dựa trên lý thuyết uốn thuần túy Euler-Bernoulli cho dầm thẳng tiết diện không đổi.
- Bỏ qua biến dạng trượt và hiện tượng tập trung ứng suất tại các góc nhọn, lỗ khoét bu-lông hoặc đường hàn ghép.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Tuyệt đối cấm khoét lỗ bu-lông lớn hoặc cắt khoét trên thớ cánh trên hoặc cánh dưới (Flange) của dầm chữ U/I sắt-xi xe tải. Thớ ngoài cùng là nơi ứng suất uốn $\sigma$ đạt giá trị cực đại; khoét lỗ tại đây sẽ gây nứt xé toạc chassis khi xe chở nặng qua ổ gà.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn sức bền Euler-Bernoulli
- **Nguồn 1**: [EngineeringToolbox - Beam Stress and Deflection](https://www.engineeringtoolbox.com/beam-stress-deflection-d_1312.html)
- **Nguồn 2**: [EngineeringToolbox - Section Modulus](https://www.engineeringtoolbox.com/section-modulus-d_1320.html)

---

## [DM-095] Độ Võng Cực Đại Của Dầm Gối Đơn Chịu Tải Giữa (Simply Supported Beam Deflection)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Thợ cơ khí gia công bàn nâng gầm xưởng, dầm cầu trục cứu hộ

### 1. Công thức toán học (Mathematical Formula)

$$
\delta_{\text{max}} = \frac{F \times L^3}{48 \times E \times I}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $F$ | Tải trọng tập trung đặt chính giữa nhịp dầm | Newton (N) | $F = m \times 9{,}81$ |
| $L$ | Chiều dài nhịp thông thủy giữa hai gối đỡ | mét (m) | Khoảng cách gối |
| $E$ | Modun đàn hồi Young của vật liệu dầm | Pascal (Pa) | Thép kết cấu: $E \approx 200 - 210\text{ GPa} = 2{,}05 \times 10^{11}\text{ Pa}$; Nhôm: $E \approx 70\text{ GPa}$ |
| $I$ | Mô-men quán tính diện tích mặt cắt dầm | $m^4$ | Tính từ hình học dầm |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Áp dụng cho dầm gối tự do hai đầu chịu tải trọng điểm duy nhất tại trung điểm nhịp trong miền biến dạng nhỏ.
- Tiêu chuẩn dầm cơ khí thông dụng: Độ võng cực đại không được vượt quá $\delta_{\text{max}} \le \frac{L}{300} - \frac{L}{500}$ để đảm bảo độ cứng vững kết cấu.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Chiều dài nhịp $L$ có bậc lũy thừa 3 ($L^3$). Kéo dài gấp đôi khoảng cách nhịp dầm ($2L$) sẽ làm độ võng tăng vọt lên tới $2^3 = 8$ lần! Dầm võng quá mức sẽ gây kẹt cơ cấu con lăn và tiềm ẩn nguy cơ sập gãy kết cấu cầu nâng xe.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình giải tích độ võng dầm
- **Nguồn 1**: [EngineeringToolbox - Beam Deflection Formulae](https://www.engineeringtoolbox.com/beam-stress-deflection-d_1312.html)
- **Nguồn 2**: [EngineeringToolbox - Young's Modulus of Metals](https://www.engineeringtoolbox.com/young-modulus-d_417.html)

---

## [DM-096] Mô-Men Quán Tính Diện Tích Ống Tròn Rỗng (Area Moment of Inertia of Hollow Tube)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Thợ uốn khung chống lật Rollcage xe đua, tay đòn càng A xe offroad

### 1. Công thức toán học (Mathematical Formula)

$$
I = \frac{\pi \times (D^4 - d^4)}{64}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $D$ | Đường kính ngoài của ống thép | mét (m) | Thường dùng ống $\phi 42 - \phi 50\text{ mm}$ (ví dụ $0{,}0483\text{ m}$) |
| $d$ | Đường kính trong của ống thép | mét (m) | $d = D - 2 \times t_{\text{wall}}$ (với $t_{\text{wall}}$ là độ dày thành ống) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tính toán mô-men quán tính diện tích quanh trục trung hòa đi qua tâm đối xứng của ống tròn rỗng đồng chất.
- Khả năng chống uốn của kết cấu dạng ống phụ thuộc cực lớn vào đường kính ngoài $D$ (theo lũy thừa bậc 4).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Một ống thép đường kính lớn thành mỏng (ví dụ $\phi 50\text{ mm}$ dày $2\text{ mm}$) có độ cứng chống uốn $I$ vượt trội hơn rất nhiều so với một ống thép đường kính nhỏ thành dày cùng khối lượng (ví dụ $\phi 32\text{ mm}$ dày $4\text{ mm}$). Tuy nhiên, thành ống quá mỏng ($< 1{,}8\text{ mm}$) sẽ dễ bị móp méo cục bộ khi uốn cong trên máy lốc ống.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học giải tích tích phân diện tích
- **Nguồn 1**: [EngineeringToolbox - Area Moment of Inertia](https://www.engineeringtoolbox.com/section-modulus-d_1320.html)
- **Nguồn 2**: [EngineeringToolbox - Hollow Cylinders Moment](https://www.engineeringtoolbox.com/beam-stress-deflection-d_1312.html)

---

## [DM-097] Khối Lượng Ống Kim Loại Tròn Rỗng (Mass of Hollow Metal Tube)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ sư tính toán khối lượng tăng thêm khi gia cố khung xe đua

### 1. Công thức toán học (Mathematical Formula)

$$
m = \rho \times \frac{\pi \times (D^2 - d^2)}{4} \times L
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\rho$ | Khối lượng riêng của vật liệu kim loại | kg/m³ | Thép kết cấu: $7850\text{ kg/m}^3$; Thép hợp kim Chromoly 4130: $7850\text{ kg/m}^3$; Hợp kim nhôm 6061: $2700\text{ kg/m}^3$ |
| $D$ | Đường kính ngoài của ống | mét (m) | Đo bằng thước kẹp panme |
| $d$ | Đường kính trong của ống | mét (m) | Đo lòng ống |
| $L$ | Tổng chiều dài đoạn ống sử dụng | mét (m) | Chiều dài phôi ống cắt thực tế |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tính toán khối lượng phôi ống nguyên bản đồng nhất.
- Chưa tính hao hụt khi vát miệng liên kết hàn giao nhau (Tube Notching) và khối lượng que hàn/dây hàn bồi thêm vào mối ghép.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khung chống lật Rollcage 6 điểm tiêu chuẩn FIA làm bằng ống thép Chromoly đường kính $\phi 45\text{ mm}$ dày $2{,}5\text{ mm}$ thường có tổng chiều dài khoảng $35 - 45\text{ m}$, cộng thêm từ $70 - 95\text{ kg}$ trọng lượng đè lên xe. Cần tính toán vào bài toán cân góc 4 bánh (Corner Weight) để phân bổ lại lò xo phuộc nhún.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học khối lượng riêng
- **Nguồn 1**: [EngineeringToolbox - Metal Weight and Density](https://www.engineeringtoolbox.com/metals-densities-d_418.html)
- **Nguồn 2**: [EngineeringToolbox - Pipe and Tube Weight](https://www.engineeringtoolbox.com/steel-pipe-dimensions-weights-d_528.html)

---

## [DM-098] Tải Trọng Ổn Định Uốn Dọc Tới Hạn Euler (Euler Column Critical Buckling Load)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư thiết kế thanh giằng dọc (Trailing Arms), thanh đẩy ben thủy lực dài

### 1. Công thức toán học (Mathematical Formula)

$$
F_{\text{cr}} = \frac{\pi^2 \times E \times I}{(K \times L)^2}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $E$ | Mô-đun đàn hồi Young của vật liệu | Pascal (Pa) | Thép: $2{,}1 \times 10^{11}\text{ Pa}$ |
| $I$ | Mô-men quán tính diện tích nhỏ nhất của mặt cắt | $m^4$ | Tính từ công thức DM-096 |
| $L$ | Chiều dài tự do của thanh chịu nén | mét (m) | Chiều dài thanh giằng hoặc cán ty ben vươn hết cỡ |
| $K$ | Hệ số liên kết gối tựa hai đầu (Effective Length Factor) | Không thứ nguyên | Hai đầu khớp bản lề/khớp cầu Heim Joint: $K = 1{,}0$; Một đầu ngàm chặt một đầu tự do: $K = 2{,}0$; Hai đầu ngàm cứng: $K = 0{,}5$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức Euler áp dụng cho các thanh mảnh đàn hồi có độ mảnh cao ($\lambda = \frac{K \cdot L}{r_{\text{gyration}}} > 100$).
- Không áp dụng cho các cột ngắn chịu phá hủy nén dập dẻo (cần dùng công thức Johnson-Ostenfeld).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Hiện tượng mất ổn định uốn dọc (Buckling) xảy ra đột ngột và cực kỳ thảm khốc: Khi lực nén dọc trục chạm ngưỡng $F_{\text{cr}}$, thanh giằng gầm hoặc cán ty xi lanh ben sẽ bị uốn cong gập đôi như cọng rơm ngay cả khi ứng suất nén vẫn còn thấp hơn giới hạn bền của thép!
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình ổn định đàn hồi Euler
- **Nguồn 1**: [EngineeringToolbox - Euler Column Buckling](https://www.engineeringtoolbox.com/euler-columns-d_221.html)
- **Nguồn 2**: [EngineeringToolbox - Structural Column Strength](https://www.engineeringtoolbox.com/section-modulus-d_1320.html)

---

## [DM-099] Lực Đẩy Xi Lanh Thủy Lực Phía Không Ty (Hydraulic Cylinder Push Force)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên thiết kế cầu nâng xưởng 2 trụ / 4 trụ, ben thùng xe tải

### 1. Công thức toán học (Mathematical Formula)

$$
F_{\text{push}} = p \times \frac{\pi \times D^2}{4} \times \eta_{\text{mech}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $p$ | Áp suất dầu thủy lực cấp vào khoang đáy xi lanh | Pascal (Pa) | Đổi từ bar sang Pa: $p_{\text{Pa}} = p_{\text{bar}} \times 10^5$ (ví dụ: $200\text{ bar} = 2 \times 10^7\text{ Pa}$) |
| $D$ | Đường kính trong của nòng xi lanh (Bore) | mét (m) | Đổi từ mm sang m: $D_{\text{m}} = \frac{D_{\text{mm}}}{1000}$ |
| $\eta_{\text{mech}}$ | Hiệu suất cơ khí tính đến ma sát của phớt chặn dầu | Thập phân ($0..1$) | Thường lấy $0{,}90 - 0{,}95$ cho ben chất lượng cao |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Lực đẩy phát sinh khi dầu nén tác dụng lên toàn bộ diện tích bề mặt hình tròn của piston (không có cán ty).
- Kết quả cho ra lực nâng thẳng tính theo Newton (N); quy đổi sang khối lượng nâng: $m_{\text{kg}} = \frac{F_{\text{push}}}{9{,}81}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cấm để áp suất dầu thủy lực vượt quá áp suất định mức của van an toàn (Relief Valve). Ống mềm cao su dẫn dầu thủy lực bị nứt gãy ở áp suất $200\text{ bar}$ sẽ phóng ra tia dầu áp lực cao có khả năng xuyên thủng da thịt người như dao mổ và gây ngộ độc máu tử vong.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình thủy lực cơ bản
- **Nguồn 1**: [EngineeringToolbox - Hydraulic Cylinder Force Calculator](https://www.engineeringtoolbox.com/hydraulic-force-calculator-d_1369.html)
- **Nguồn 2**: [EngineeringToolbox - Hydraulic Pressure & Area](https://www.engineeringtoolbox.com/hydraulic-pumps-horsepower-d_1464.html)

---

## [DM-100] Lực Kéo Thu Xi Lanh Thủy Lực Phía Có Ty (Hydraulic Cylinder Pull Force)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Thợ căn chỉnh lực kéo rút của ben co duỗi cơ cấu tay cẩu cứu hộ

### 1. Công thức toán học (Mathematical Formula)

$$
F_{\text{pull}} = p \times \frac{\pi \times (D^2 - d_{\text{rod}}^2)}{4} \times \eta_{\text{mech}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $p$ | Áp suất dầu cấp vào khoang đầu ty xi lanh | Pascal (Pa) | Áp suất thủy lực làm việc |
| $D$ | Đường kính trong nòng xi lanh (Bore) | mét (m) | Kích thước lòng nòng |
| $d_{\text{rod}}$ | Đường kính cán ty mạ crôm của piston | mét (m) | Cán ty kim loại chiếm diện tích |
| $\eta_{\text{mech}}$ | Hiệu suất cơ khí của ben | Thập phân ($0..1$) | Lấy chuẩn $0{,}92$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Diện tích tác dụng của dầu bị trừ đi diện tích mặt cắt của thanh cán ty ben: $A_{\text{eff}} = \frac{\pi \times (D^2 - d_{\text{rod}}^2)}{4}$.
- Do đó, ở cùng một mức áp suất dầu, **lực kéo thu vào ($F_{\text{pull}}$) luôn luôn nhỏ hơn lực đẩy ra ($F_{\text{push}}$)** từ $15 - 35\%$ tùy thuộc độ mập của cán ty.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi sử dụng xi lanh thủy lực 2 chiều để kéo vật nặng cứu hộ, không bao giờ lấy định mức lực đẩy để ước lượng tải trọng kéo. Đánh giá sai lực kéo thu sẽ làm quá tải hệ thống và gây giật tụt tải khi hạ hàng.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình diện tích vành khăn thủy lực
- **Nguồn 1**: [EngineeringToolbox - Hydraulic Pull Force](https://www.engineeringtoolbox.com/hydraulic-force-calculator-d_1369.html)
- **Nguồn 2**: [EngineeringToolbox - Cylinder Rod Dimensions](https://www.engineeringtoolbox.com/hydraulic-pumps-horsepower-d_1464.html)

---

## [DM-101] Công Suất Dòng Thủy Lực Hữu Ích (Hydraulic Fluid Power)

> **Phân loại độ tin cậy**: Chuẩn cơ học  
> **Nhóm người dùng**: Kỹ thuật viên chọn mô-tơ điện hoặc trích công suất PTO kéo bơm thủy lực

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{hyd\_kW}} = \frac{p_{\text{bar}} \times Q_{\text{L/min}}}{600}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $p_{\text{bar}}$ | Áp suất làm việc của hệ thống thủy lực | bar | Thường từ $140 - 250\text{ bar}$ trên các thiết bị xưởng |
| $Q_{\text{L/min}}$ | Lưu lượng dòng dầu cấp từ bơm thủy lực | Lít/phút (L/min) | Lưu lượng bơm bánh răng hoặc bơm piston |
| $600$ | Hằng số quy đổi chuẩn các đơn vị thực tế sang kW | Không thứ nguyên | $1\text{ bar} = 10^5\text{ N/m}^2$, $1\text{ L/min} = \frac{10^{-3}}{60}\text{ m}^3/\text{s} \implies 600$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đây là công suất thủy lực thuần túy chứa trong dòng chất lỏng chịu áp.
- Để tính công suất cơ học đòi hỏi trên trục mô-tơ điện hoặc trục trích công suất hộp số (PTO) kéo bơm, bắt buộc phải chia cho hiệu suất bơm: $P_{\text{mech}} = \frac{P_{\text{hyd\_kW}}}{\eta_{\text{pump}}}$ (với bơm bánh răng $\eta_{\text{pump}} \approx 0{,}80 - 0{,}85$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Ví dụ kiểm thử: Bơm chạy ở áp suất $200\text{ bar}$ với lưu lượng $10\text{ L/min}$ sinh công suất thủy lực: $P = \frac{200 \times 10}{600} = 3{,}333\text{ kW}$. Mô-tơ điện kéo phải có công suất tối thiểu $4{,}0 - 4{,}5\text{ kW}$. Chọn mô-tơ kéo quá nhỏ sẽ bị kẹt đứng (stall) và cháy cuộn dây mô-tơ khi ben chạm tải nặng.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cơ học chất lưu áp suất
- **Nguồn 1**: [EngineeringToolbox - Hydraulic Pumps Horsepower and Power](https://www.engineeringtoolbox.com/hydraulic-pumps-horsepower-d_1464.html)
- **Nguồn 2**: [EngineeringToolbox - Hydraulic Fluid Flow Mechanics](https://www.engineeringtoolbox.com/hydraulic-force-calculator-d_1369.html)

---

## [DM-102] Tốc Độ Hành Trình Di Chuyển Của Piston Ben (Cylinder Travel Velocity)

> **Phân loại độ tin cậy**: Chuẩn liên tục  
> **Nhóm người dùng**: Kỹ sư thiết kế thời gian nâng hạ cầu xe và ben tải tự đổ

### 1. Công thức toán học (Mathematical Formula)

$$
v = \frac{Q_{\text{m}^3/\text{s}}}{A_{\text{m}^2}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $Q_{\text{m}^3/\text{s}}$ | Lưu lượng thể tích dầu cấp vào xi lanh | m³/s | Đổi từ L/min sang m³/s: $Q_{\text{m}^3/\text{s}} = \frac{Q_{\text{L/min}}}{60.000}$ |
| $A_{\text{m}^2}$ | Diện tích mặt cắt hiệu dụng khoang xi lanh đang nạp | m² | $A_{\text{push}}$ hoặc $A_{\text{pull}}$ tính theo mét vuông |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Phương trình tính liên tục của dòng lưu chất không nén được ($Q = A \times v$).
- Vận tốc thực tế sẽ bị chậm hơn một lượng nhỏ do rò rỉ vi mô (Slip/Leakage) qua khe hở phớt làm kín của piston dưới áp suất cao.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi hạ cầu nâng hoặc hạ ben tải nặng, dầu thoát ra khỏi ben có thể khiến ben hạ xuống cực nhanh. Bắt buộc phải gắn van tiết lưu một chiều chống rơi (Hose Burst Safety Valve / Velocity Fuse) ngay tại ngõ ra của xi lanh để ngăn chặn xe rơi tự do nếu ống dầu bị bục rách.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn phương trình liên tục thủy động lực học
- **Nguồn 1**: [EngineeringToolbox - Cylinder Velocity and Flow](https://www.engineeringtoolbox.com/hydraulic-force-calculator-d_1369.html)
- **Nguồn 2**: [EngineeringToolbox - Fluid Continuity Equation](https://www.engineeringtoolbox.com/hydraulic-pumps-horsepower-d_1464.html)

---

## [DM-103] Tuổi Thọ Mỏi Vòng Bi Ổ Lăn $L_{10h}$ Theo ISO 281 (Rolling Bearing Basic Rating Life)

> **Phân loại độ tin cậy**: Chuẩn ISO 281 cơ bản  
> **Nhóm người dùng**: Kỹ sư chọn vòng bi moay-ơ bánh xe tải, ổ đỡ trục các-đăng

### 1. Công thức toán học (Mathematical Formula)

$$
L_{10h} = \frac{10^6}{60 \times n_{\text{rpm}}} \times \left(\frac{C_{\text{dyn}}}{P_{\text{equiv}}}\right)^p
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $n_{\text{rpm}}$ | Tốc độ vòng tua quay của ca vòng bi | rpm | Tốc độ quay của trục hoặc moay-ơ |
| $C_{\text{dyn}}$ | Khả năng tải động cơ bản (Basic Dynamic Load Rating) | Newton (N) | Tra cứu trong catalogue kỹ thuật của hãng SKF, NSK, Timken |
| $P_{\text{equiv}}$ | Tải trọng động tương đương tác dụng lên ổ lăn | Newton (N) | Tổ hợp tải trọng hướng kính $F_r$ và tải dọc trục $F_a$ |
| $p$ | Số mũ tuổi thọ vật liệu ổ lăn | Không thứ nguyên | **$p = 3$** đối với vòng bi cầu (Ball bearings); **$p = \frac{10}{3} \approx 3{,}333$** đối với ổ đũa con lăn côn (Roller bearings) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- $L_{10h}$ là tuổi thọ danh định đạt độ tin cậy $90\%$ của một lô vòng bi giống hệt nhau vận hành trong điều kiện bôi trơn lý tưởng trước khi xuất hiện vết tróc rỗ mỏi kim loại đầu tiên (Flaking).
- Thực tế trong môi trường lội nước sình lầy của xe off-road, tuổi thọ vòng bi phụ thuộc quyết định vào độ kín của phốt chắn nước và độ nhiễm bẩn cát bụi của mỡ bôi trơn.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Chú ý số mũ $p$: Tuổi thọ tỷ lệ nghịch với lũy thừa bậc 3 của tải trọng. Độ mâm có độ lệch Offset âm quá lớn (ET âm) làm tăng cánh tay đòn mô-men uốn đè lên moay-ơ, làm tăng tải trọng $P_{\text{equiv}}$ lên $30\%$, khiến tuổi thọ vòng bi moay-ơ bị cắt giảm hơn một nửa ($1{,}3^3 \approx 2{,}2$ lần)!
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Tiêu chuẩn quốc tế ISO 281
- **Nguồn 1**: [SKF Rolling Bearings Technical Handbook - Bearing Life Rating](https://cdn.skfmediahub.skf.com/api/public/0901d196802809de/pdf_preview_medium/Rolling_bearings_-_17000_1_EN_pdf_preview_medium.pdf)
- **Nguồn 2**: [EngineeringToolbox - Roller Bearing Life Calculation](https://www.engineeringtoolbox.com/roller-bearings-life-d_1116.html)

---

## [DM-104] Tổn Thất Áp Suất Do Ma Sát Đường Ống Darcy-Weisbach (Darcy Pipe Friction Loss)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư thiết kế đường ống dẫn dầu giải nhiệt nhớt máy, két nước làm mát

### 1. Công thức toán học (Mathematical Formula)

$$
\Delta p_{\text{Pa}} = f_D \times \frac{L}{D_h} \times \frac{\rho \times v^2}{2}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $f_D$ | Hệ số ma sát Darcy | Không thứ nguyên | Dòng chảy tầng ($\text{Re} < 2300$): $f_D = \frac{64}{\text{Re}}$; Dòng chảy rối: tra giản đồ Moody |
| $L$ | Chiều dài thẳng của đoạn ống dẫn | mét (m) | Chiều dài tuyến ống |
| $D_h$ | Đường kính thủy lực trong lòng ống | mét (m) | Đường kính lọt lòng ống dẫn |
| $\rho$ | Khối lượng riêng của lưu chất | kg/m³ | Dầu nhớt: $880 - 900\text{ kg/m}^3$; Nước làm mát: $1050\text{ kg/m}^3$ |
| $v$ | Tốc độ dòng chảy trung bình trong ống | m/s | $v = \frac{Q}{A}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức Darcy-Weisbach cho tổn thất ma sát dọc theo đường ống thẳng với lưu chất không nén được ở trạng thái dòng ổn định.
- Tổn thất áp lực toàn tuyến bắt buộc phải cộng thêm tổn thất cục bộ tại các co nối cút cong $90^\circ$, van khóa, cút nối ren AN (Fitting losses): $\Delta p_{\text{minor}} = \sum K_i \times \frac{\rho v^2}{2}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Độ sụt áp tỷ lệ nghịch với đường kính trong lòng ống: $\Delta p \propto \frac{1}{D^5}$ khi lưu lượng không đổi. Đi đường ống giải nhiệt nhớt (Oil Cooler Lines) quá nhỏ hoặc dùng đầu cút uốn gập góc $90^\circ$ quá hẹp sẽ gây nghẽn áp suất đường nhớt bôi trơn, khiến động cơ bị tụt áp nhớt và lột dên ở dải tua cao.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn phương trình Darcy-Weisbach cơ học chất lưu
- **Nguồn 1**: [EngineeringToolbox - Darcy-Weisbach Equation](https://www.engineeringtoolbox.com/darcy-weisbach-equation-d_646.html)
- **Nguồn 2**: [EngineeringToolbox - Major Pipe Head Loss](https://www.engineeringtoolbox.com/hydraulic-force-calculator-d_1369.html)
