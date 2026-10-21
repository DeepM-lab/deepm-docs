# Chuyên đề 01: Off-road & 4x4 (12 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-01` | **Dải công cụ**: `DM-001` đến `DM-012`  
> **Đối tượng ứng dụng**: Kỹ thuật viên xưởng độ 4x4, tay đua vượt địa hình VOC/HTV Challenge, chủ xe Overlanding & Camping việt dã.  
> **Mục tiêu kỹ thuật**: Tính toán tỷ số truyền bò (crawl ratio), lực kéo bánh xe, góc hình học vượt chướng ngại vật, lực căng cáp tời cứu hộ và tải trọng giật khung sắt-xi.

---

## [DM-001] Crawl Ratio Tổng (Overall Crawl Ratio)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Người chơi địa hình, xe thi đấu VOC/RFC, Overlanding

### 1. Công thức toán học (Mathematical Formula)

$$
CR = i_1 \times i_{\text{transfer}} \times i_{\text{diff}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $i_1$ | Tỷ số truyền số 1 hộp số chính | Không thứ nguyên | Thường từ $3{,}5$ đến $5{,}5$ trên xe số sàn/tự động |
| $i_{\text{transfer}}$ | Tỷ số truyền chậm hộp số phụ (4L) | Không thứ nguyên | Thường từ $2{,}0$ đến $4{,}7$ (ví dụ: Jeep Rubicon $4{,}0$, Toyota $2{,}56$) |
| $i_{\text{diff}}$ | Tỷ số truyền cầu vi sai (Final drive) | Không thứ nguyên | Thường từ $3{,}5$ đến $4{,}88$ hoặc $5{,}29$ khi lên lốp lớn |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức tính theo tỷ số động học thuần túy của hệ bánh răng cơ khí.
- Không dự đoán độ bám thực tế của lốp xe trên bùn nhão, đá trơn hay cát lún.
- Trên hộp số tự động, biến mô (torque converter) có thể nhân mô-men lên thêm $1{,}8 - 2{,}5$ lần lúc bắt đầu bò.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Tỷ số truyền bò quá lớn ($CR > 100:1$) sinh mô-men xoắn cục bộ cực lớn ở trục láp (axle shaft) và vi sai. Nếu bánh xe bị kẹt đá mà thợ rốc ga đột ngột, nguy cơ gãy đứt láp hoặc vỡ vành chậu - bánh răng quả dứa (ring & pinion) là rất cao.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học động học
- **Nguồn 1**: [EngineeringToolbox - Gear Transmission & Torque](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Electric Motors & Drivetrain Mechanics](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-002] Vận Tốc Xe Theo Tua Máy RPM (Vehicle Speed vs Engine RPM)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên cân chỉnh tỷ số truyền, thợ độ lốp off-road

### 1. Công thức toán học (Mathematical Formula)

$$
v_{\text{km/h}} = \frac{0{,}06 \times n_{\text{engine}} \times C_{\text{roll}}}{i_{\text{total}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $n_{\text{engine}}$ | Tốc độ vòng tua động cơ | vòng/phút (rpm) | Dải tua vận hành hữu ích ($800 - 4500\text{ rpm}$) |
| $C_{\text{roll}}$ | Chu vi lăn động lực học của bánh xe | mét (m) | $C_{\text{roll}} = \pi \times D_{\text{roll}}$ (tính cả độ xẹp của lốp) |
| $i_{\text{total}}$ | Tỷ số truyền tổng cộng | Không thứ nguyên | $i_{\text{total}} = i_{\text{gear}} \times i_{\text{transfer}} \times i_{\text{diff}}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Giả định hệ thống truyền động ăn khớp cứng $100\%$ không có hiện tượng trượt lốp (wheel slip).
- Đối với hộp số tự động chưa khóa biến mô (Lock-up torque converter), tốc độ thực tế sẽ thấp hơn tốc độ lý thuyết khoảng $5 - 12\%$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi đi số chậm 4L dốc đứng trơn trượt, tua máy cao nhưng bánh quay trơn tại chỗ khiến công-tơ-mét báo sai lệch hoàn toàn so với vận tốc xe di chuyển thực tế.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình động học
- **Nguồn 1**: [EngineeringToolbox - Angular Velocity & Speed Conversion](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Drivetrain Systems](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-003] Lực Kéo Tiếp Tuyến Bánh Xe (Tractive Wheel Force)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư thiết kế xe thi đấu, kỹ thuật viên tính toán vi sai

### 1. Công thức toán học (Mathematical Formula)

$$
F_{\text{wheel}} = \frac{T_{\text{engine}} \times i_{\text{total}} \times \eta_{\text{drive}}}{r_{\text{eff}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $T_{\text{engine}}$ | Mô-men xoắn trục cốt máy | N.m | Giá trị mô-men xoắn cực đại từ đường đặc tính động cơ |
| $i_{\text{total}}$ | Tỷ số truyền tổng | Không thứ nguyên | Nhân qua hộp số, số phụ và vi sai |
| $\eta_{\text{drive}}$ | Hiệu suất cơ khí toàn hệ thống | Thập phân ($0..1$) | Thường $0{,}80 - 0{,}88$ cho hệ dẫn động 4WD 2 cầu |
| $r_{\text{eff}}$ | Bán kính lăn hữu hiệu của lốp dưới tải | mét (m) | Bán kính đo từ tâm trục xuống mặt đất phẳng |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Lực kéo tiếp tuyến thực tế phát huy xuống mặt đường bị chặn trên bởi giới hạn ma sát bám: $F_{\text{traction\_max}} = \mu \times F_z$.
- Bỏ qua tổn hao nhớt cầu khi nguội và quán tính quay của các bánh răng.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Ở số 1 cầu chậm (4L), lực kéo tiếp tuyến tính toán có thể vượt quá $30.000\text{ N}$. Nếu bề mặt có độ bám dính cực cao (nhựa đường hoặc đá cản), lực phản hồi sẽ làm xoắn gãy trục các-đăng hoặc vỡ vỏ vi sai cầu nếu khóa vi sai (Diff-Lock) đóng cứng.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình cơ học động lực
- **Nguồn 1**: [EngineeringToolbox - Mechanical Power and Torque Calculation](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Drive Axle Resistance](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-004] Khả Năng Leo Dốc (Gradient Climbing Resistance Force)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Kỹ thuật viên thiết kế cấu hình xe việt dã, cứu hộ dốc đứng

### 1. Công thức toán học (Mathematical Formula)

$$
F_{\text{req}} = m \times g \times \sin\theta + C_{rr} \times m \times g \times \cos\theta + \frac{1}{2} \rho C_d A v^2
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $m$ | Khối lượng toàn bộ xe khi đầy tải | kg | Khối lượng bản thân + hành lý dã ngoại + người |
| $g$ | Gia tốc trọng trường chuẩn | m/s² | Lấy chuẩn $9{,}80665\text{ m/s}^2$ |
| $\theta$ | Góc nghiêng của mặt dốc | radian (rad) | Đổi từ độ sang rad: $\theta = \text{deg} \times \frac{\pi}{180}$ |
| $C_{rr}$ | Hệ số cản lăn của lốp trên địa hình | Không thứ nguyên | Đường nhựa: $0{,}015$; đất cứng: $0{,}04$; bùn/cát: $0{,}15 - 0{,}30$ |
| $\rho$ | Khối lượng riêng không khí | kg/m³ | Tiêu chuẩn $1{,}2\text{ kg/m}^3$ |
| $C_d$ | Hệ số cản khí động học | Không thứ nguyên | Xe 4x4 độ cản, baga mui: $0{,}45 - 0{,}65$ |
| $A$ | Diện tích cản gió chính diện | m² | Xe địa hình thường từ $2{,}5 - 3{,}5\text{ m}^2$ |
| $v$ | Tốc độ leo dốc | m/s | $v = \frac{v_{\text{km/h}}}{3{,}6}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Điều kiện cần để xe leo được dốc: Lực kéo phát động tại bánh $F_{\text{wheel}} \ge F_{\text{req}}$.
- Ở tốc độ bò dốc chậm ($v < 10\text{ km/h}$), thành phần cản khí động học là không đáng kể ($< 1\%$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Dốc vượt quá $35^\circ$ đối mặt với nguy cơ lật ngược xe ra sau nếu phân bổ trọng tâm (CG) dồn quá nhiều vào cầu sau hoặc xe bị giật côn đột ngột.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng cân bằng lực
- **Nguồn 1**: [EngineeringToolbox - Slope Resistance and Power](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Rolling Resistance Factors](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-005] Góc Tới Hình Học (Approach Angle)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ thuật viên gò cản trước, lắp tời cứu hộ âm cản

### 1. Công thức toán học (Mathematical Formula)

$$
\alpha = \arctan\left(\frac{h_{\text{front}}}{L_{\text{overhang\_front}}}\right)
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $h_{\text{front}}$ | Chiều cao điểm thấp nhất mũi cản trước | mét (m) | Đo vuông góc từ mặt đất đến mép dưới cản hoặc pát tời |
| $L_{\text{overhang\_front}}$ | Khoảng cách vươn cản trước (Overhang) | mét (m) | Khoảng cách nằm ngang từ tâm vết lốp trước ra mép cản ngoài cùng |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Mô hình 2D giả định mặt phẳng; thực tế cần kiểm tra cả góc vát hai bên mép bánh xe khi đánh hết lái.
- Khi phanh gấp hoặc nhún hết hành trình lò xo phuộc trước, góc tới tức thời sẽ giảm từ $3^\circ - 7^\circ$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi lắp tời cứu hộ thò ra ngoài cản quá nhiều làm tăng $L_{\text{overhang\_front}}$, góc tới bị thu hẹp đáng kể, dễ gây cắm mũi tời xuống bờ rãnh khi tiếp cận hố bẫy.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học giải tích
- **Nguồn 1**: [EngineeringToolbox - Geometry & Trigonometric Angles](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Vehicle Dimension Guidelines](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-006] Góc Thoát Hình Học (Departure Angle)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Xưởng độ cản sau sắt, nâng cấp móc kéo rơ-moóc Towbar

### 1. Công thức toán học (Mathematical Formula)

$$
\beta = \arctan\left(\frac{h_{\text{rear}}}{L_{\text{overhang\_rear}}}\right)
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $h_{\text{rear}}$ | Chiều cao điểm thấp nhất cản sau / móc kéo | mét (m) | Đo từ mặt phẳng đất lên điểm thấp nhất của cản |
| $L_{\text{overhang\_rear}}$ | Khoảng cách nhô đuôi cản sau | mét (m) | Đo ngang từ tâm trục sau ra mép sau cùng của cản/lốp treo |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Bỏ qua biến dạng lún lốp khi đuôi xe gánh tải nặng chở đồ dã ngoại.
- Với xe bán tải (pickup), khoảng nhô đuôi $L_{\text{overhang\_rear}}$ thường rất lớn ($> 1{,}2\text{ m}$), khiến góc thoát thường nhỏ hơn xe SUV cùng cỡ.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cần chú ý vị trí đặt lốp dự phòng dưới gầm hoặc móc kéo (receiver hitch). Nếu góc thoát không đủ, đuôi xe sẽ đóng thẳng xuống đá tảng gây cong sườn sắt-xi hoặc vỡ bình nhiên liệu.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học giải tích
- **Nguồn 1**: [EngineeringToolbox - Geometric Trigonometry](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Axle Geometry](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-007] Góc Vượt Đỉnh Dốc Lý Tưởng (Ramp Breakover Angle)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ thuật viên cân chỉnh độ cao phuộc nhún gầm xe (Lift Kit)

### 1. Công thức toán học (Mathematical Formula)

$$
\gamma = 2 \times \arctan\left(\frac{2h}{L_{\text{wheelbase}}}\right)
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $h$ | Khoảng sáng gầm xe tại điểm thấp nhất giữa trục | mét (m) | Thường đo tại bụng hộp số phụ, bình xăng hoặc thanh giằng |
| $L_{\text{wheelbase}}$ | Chiều dài cơ sở giữa tâm 2 trục bánh xe | mét (m) | Chiều dài cơ sở của xe (ví dụ: Hilux $3{,}085\text{ m}$, LC80 $2{,}85\text{ m}$) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Giả định gầm xe phẳng đối xứng và điểm võng thấp nhất nằm chính giữa 2 trục.
- Nếu điểm thấp nhất lệch về phía cầu trước hoặc cầu sau, góc vượt đỉnh thực tế sẽ bị chia làm 2 góc nghiêng không đều.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Xe có trục cơ sở dài (như xe bán tải kép) rất dễ bị "treo bụng ngựa" (high-centered) trên sống trâu hoặc cồn cát. Cần trang bị giáp gầm hợp kim nhôm $6 - 8\text{ mm}$ bảo vệ hộp số phụ.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học giải tích
- **Nguồn 1**: [EngineeringToolbox - Breakover Angle Calculation](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Vehicle Clearance](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-008] Lực Tời Kéo Xe Trên Dốc Lầy (Winch Recovery Pull Force)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Đội cứu hộ giải đua off-road, người lắp đặt tời điện

### 1. Công thức toán học (Mathematical Formula)

$$
F_{\text{winch}} \ge (m \times g \times \sin\theta + \mu \times m \times g \times \cos\theta) \times SF
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $m$ | Tổng khối lượng xe cần cứu hộ | kg | Bao gồm xe, hành lý và bùn đất bám kẹt |
| $\theta$ | Độ dốc địa hình cứu hộ | rad | Góc nghiêng con dốc cần tời lên |
| $\mu$ | Hệ số cản trượt/lầy thụt địa hình | Không thứ nguyên | Cát khô: $0{,}25$; bùn ngập nửa bánh: $0{,}50$; sình lún ngập gầm: $0{,}75 - 1{,}0$ |
| $SF$ | Hệ số dự phòng an toàn cứu hộ | Không thứ nguyên | Khuyến nghị bắt buộc tối thiểu $SF \ge 1{,}5$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Dây cáp tời cuốn trên các lớp tang tời bên ngoài (outer layers) sẽ bị suy giảm lực kéo từ $10 - 30\%$ so với lớp trong cùng (first layer).
- Khi tời lệch góc lớn, cần dùng puly mở hướng lực (Snatch block).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cấm tuyệt đối đứng gần dây cáp tời khi đang kéo tải. Luôn phủ chăn giảm chấn (winch damper) lên giữa sợi cáp để triệt tiêu lực quăng cáp khi đứt cáp hoặc gãy ma-nê neo.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng cơ học cứu hộ
- **Nguồn 1**: [EngineeringToolbox - Winch Pull & Friction](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Rigging Safety Factors](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-009] Năng Lượng Ắc Quy Cho Tời Cứu Hộ (Winch Energy Consumption)

> **Phân loại độ tin cậy**: Chuẩn cân bằng năng lượng  
> **Nhóm người dùng**: Kỹ thuật viên thiết kế hệ thống 2 bình ắc quy / máy phát 210A

### 1. Công thức toán học (Mathematical Formula)

$$
E_{\text{Wh}} = V_{\text{batt}} \times I_{\text{avg}} \times t_{\text{h}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{\text{batt}}$ | Điện áp trung bình của ắc quy khi mang tải tời | Volt (V) | Khi tời dòng lớn, điện áp bình 12V tụt xuống khoảng $10{,}5 - 11{,}5\text{V}$ |
| $I_{\text{avg}}$ | Cường độ dòng điện trung bình mô-tơ tời | Ampe (A) | Tời 9500-12000 lbs ăn dòng từ $250\text{A}$ đến $450\text{A}$ ở tải nặng |
| $t_{\text{h}}$ | Thời gian kéo tời liên tục | giờ (h) | Đổi từ phút sang giờ: $t_{\text{h}} = \frac{t_{\text{min}}}{60}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Không phản ánh hiệu ứng Peukert (dòng xả cực cao làm giảm mạnh dung lượng danh định của bình chì AGM/khô).
- Công thức tính điện năng tiêu hao thuần; cần nổ máy bù sạc bằng máy phát dòng lớn.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Xả dòng $400\text{A}$ liên tục trên bình ắc quy chì zin (65-75Ah) quá 3 phút có thể làm sôi axit, cong bản cực và kích nổ hơi hydro nếu phòng máy không thông gió.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cân bằng năng lượng điện
- **Nguồn 1**: [EngineeringToolbox - DC Power and Energy](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [Battery University - Discharge Rates and Inrush Current](https://batteryuniversity.com/learn/article/what_is_the_c_rate)

---

## [DM-010] So Sánh Đường Kính Lốp Địa Hình (Tire Outer Diameter Calculation)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ thuật viên thay đổi cỡ lốp (Fitment & Re-gearing)

### 1. Công thức toán học (Mathematical Formula)

$$
D_{\text{mm}} = 25{,}4 \times d_{\text{rim}} + 2 \times W_{\text{mm}} \times \frac{AR}{100}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $d_{\text{rim}}$ | Đường kính danh nghĩa của mâm lazang | inch | Ví dụ: mâm 16, 17, 18, 20 inch |
| $W_{\text{mm}}$ | Bề rộng mặt lốp | mm | Ký hiệu đầu tiên trên lốp (ví dụ: 265, 285, 315 mm) |
| $AR$ | Tỷ lệ chiều cao hông lốp (Aspect Ratio) | % | Phần trăm bề rộng lốp (ví dụ: 65, 70, 75%) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đây là đường kính hình học tĩnh khi lốp không tải và bơm đủ áp suất tiêu chuẩn.
- Bán kính lăn động thực tế (Dynamic Rolling Radius) nhỏ hơn đường kính tĩnh khoảng $2 - 4\%$ do lốp bị xẹp dưới trọng lượng xe.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Lên lốp lớn hơn zin quá $3\%$ làm sai lệch đồng hồ tốc độ (chạy nhanh hơn đồng hồ báo), tăng cự ly phanh và tăng áp lực uốn lên càng A và rotuyn lái.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học định nghĩa
- **Nguồn 1**: [EngineeringToolbox - Tire Dimensions](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Automotive Fitment](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-011] Mô-Men Xoắn Qua Hộp Số Phụ (Transfer Case Output Torque)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư kiểm toán độ bền cơ khí trục các-đăng và cầu xe

### 1. Công thức toán học (Mathematical Formula)

$$
T_{\text{out}} = T_{\text{in}} \times i_{\text{transfer}} \times \eta_{\text{transfer}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $T_{\text{in}}$ | Mô-men xoắn đầu vào từ hộp số chính | N.m | $T_{\text{engine}} \times i_{\text{gear}}$ |
| $i_{\text{transfer}}$ | Tỷ số truyền chậm hộp số phụ (4L) | Không thứ nguyên | Thường từ $2{,}0$ đến $4{,}0$ |
| $\eta_{\text{transfer}}$ | Hiệu suất cơ khí bộ truyền xích/bánh răng hộp phụ | Thập phân ($0..1$) | Thường đạt $0{,}92 - 0{,}96$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức tính ở trạng thái truyền tải đều tĩnh.
- Chưa tính tải xung va đập (shock load) khi bánh xe đang quay tít trên không rồi đột ngột tiếp đất có độ bám dính cao.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Mô-men xoắn đầu ra hộp số phụ ở chế độ 4L có thể đạt tới $4000 - 8000\text{ N.m}$. Bắt buộc phải kiểm tra cấp chịu tải của khớp các-đăng chữ thập (U-Joint) và khớp đồng tốc (CV-Joint).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình cơ học bánh răng
- **Nguồn 1**: [EngineeringToolbox - Gear Torque & Power](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Drive Systems Efficiency](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-012] Tải Dọc Trục Khi Kéo Lệch Góc (Axial Chassis Pull Force)

> **Phân loại độ tin cậy**: Chuẩn phân tích lực  
> **Nhóm người dùng**: Thợ gá lắp điểm neo cứu hộ (Recovery Points) và sắt-xi xe

### 1. Công thức toán học (Mathematical Formula)

$$
F_{\text{axial}} = F_{\text{pull}} \times \cos(\phi)
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $F_{\text{pull}}$ | Tổng lực căng kéo trên dây cáp tời | N | Lực phát động từ tời hoặc xe kéo giật đàn hồi (Kinetic Rope) |
| $\phi$ | Góc lệch giữa dây cáp và phương dọc trục sắt-xi | radian (rad) | Đổi từ độ sang rad: $\phi = \text{deg} \times \frac{\pi}{180}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đây là thành phần lực dọc trục hữu ích giúp lôi xe tiến về phía trước.
- Đồng thời luôn tồn tại thành phần lực vuông góc ngang sườn: $F_{\text{lateral}} = F_{\text{pull}} \times \sin(\phi)$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi góc kéo lệch quá lớn ($\phi > 30^\circ$), thành phần lực ngang $F_{\text{lateral}}$ tăng rất nhanh, có thể xé rách điểm hàn tai neo trên sắt-xi, làm cong vẹo chassis hoặc lật nghiêng xe cứu hộ. Cần dùng puly đổi hướng để dây kéo song song với chassis.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn phân tích lực vectơ cơ học
- **Nguồn 1**: [EngineeringToolbox - Vector Force Decomposition](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Structural Pull Mechanics](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)
