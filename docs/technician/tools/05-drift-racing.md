# Chuyên đề 05: Drift & Racing (10 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-05` | **Dải công cụ**: `DM-049` đến `DM-058`  
> **Đối tượng ứng dụng**: Kỹ thuật viên căn chỉnh xe đua Track day, xe thi đấu Drift D1/Formula D, xe đua Drag strip 402m, chuyên gia cân chỉnh hệ thống treo góc đặt bánh xe.  
> **Mục tiêu kỹ thuật**: Tính toán tỷ số truyền hộp số tuần tự, tua máy rơi sau sang số, gia tốc tức thời, khoảng phanh và chuyển tải động học, lực cản khí động học NASA và độ cứng hệ treo Wheel Rate.

---

## [DM-049] Tỷ Số Truyền Tổng Của Hệ Thống Truyền Lực (Overall Drivetrain Gear Ratio)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ thuật viên lắp ráp hộp số đua tuần tự Sequential và vi sai Quick-change

### 1. Công thức toán học (Mathematical Formula)

$$
i_{\text{total}} = i_{\text{gear}} \times i_{\text{final}} \times i_{\text{transfer}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $i_{\text{gear}}$ | Tỷ số truyền của cấp số đang gài | Không thứ nguyên | Các cấp số trong hộp số chính ($1, 2, 3, 4, 5, 6$) |
| $i_{\text{final}}$ | Tỷ số truyền cầu vi sai (Final Drive / Ring & Pinion) | Không thứ nguyên | Tỷ số cầu sau xe đua (thường $3{,}7$ đến $4{,}6$) |
| $i_{\text{transfer}}$ | Tỷ số truyền hộp phân phối phụ (nếu có trên xe AWD) | Không thứ nguyên | Xe đua dẫn động cầu sau RWD thuần túy lấy $i_{\text{transfer}} = 1{,}0$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tỷ số truyền hình học lý thuyết của các cặp bánh răng ăn khớp.
- Đối với xe đua AWD dẫn động 4 bánh có vi sai trung tâm chia tỷ lệ mô-men, cần tính tỷ số truyền riêng cho từng cầu nếu bước bánh răng cầu trước và sau khác nhau.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cài tỷ số cầu cuối $i_{\text{final}}$ quá ngắn ($> 4{,}8$) trên xe đua đường thẳng Drag có thể khiến xe chạm Redline hết số trước khi cán đích 402m, làm mất thời gian và có nguy cơ phát nổ động cơ do ép tua kéo dài.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học tỷ số truyền
- **Nguồn 1**: [Wrenchrig - Drivetrain Calculations](https://wrenchrig.com/wheel-rate-calculator/)
- **Nguồn 2**: [NASA Glenn - Aeronautical Systems & Propulsion](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/)

---

## [DM-050] Tua Máy Sau Khi Sang Số Đua (Engine RPM Drop on Upshift)

> **Phân loại độ tin cậy**: Chuẩn động học  
> **Nhóm người dùng**: Tay đua Track day, thợ căn tỷ số hộp số Close-ratio

### 1. Công thức toán học (Mathematical Formula)

$$
n_{\text{after}} = n_{\text{before}} \times \frac{i_{\text{next}}}{i_{\text{current}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $n_{\text{before}}$ | Vòng tua máy ngay trước thời điểm sang số | rpm | Thường là tua máy Redline (ví dụ: $7500\text{ rpm}$) |
| $i_{\text{current}}$ | Tỷ số truyền của cấp số hiện tại đang đi | Không thứ nguyên | Ví dụ: số 2 có $i = 1{,}85$ |
| $i_{\text{next}}$ | Tỷ số truyền của cấp số kế tiếp chuẩn bị gài | Không thứ nguyên | Ví dụ: số 3 có $i = 1{,}38$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Giả định thời gian ngắt ly hợp sang số cực nhanh (hộp số Sequential hoặc Dog-box sang số không nhả ga trong $40 - 80\text{ ms}$) khiến vận tốc xe chưa kịp giảm do cản gió.
- Mục tiêu thiết kế tỷ số hộp số Close-ratio: Đảm bảo $n_{\text{after}}$ rơi đúng vào dải vòng tua đạt mô-men xoắn cực đại (Powerband) của động cơ.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Ngược lại khi về số gấp (Downshift), tua máy dội ngược lên: $n_{\text{after}} = n_{\text{before}} \times \frac{i_{\text{lower}}}{i_{\text{current}}}$. Nếu về nhầm từ số 5 sang số 2 (cú sang số tử thần Money Shift), tua máy sẽ vọt lên trên $10.000\text{ rpm}$ gây đứt xích cam, nấm xupap đập nát đỉnh piston ngay tức khắc.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn động học tỷ số truyền bánh răng
- **Nguồn 1**: [Wrenchrig - Gear Ratio & Shift Point Optimiser](https://wrenchrig.com/wheel-rate-calculator/)
- **Nguồn 2**: [NASA Glenn - Rotational Dynamics](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/)

---

## [DM-051] Gia Tốc Tức Thời Từ Lực Kéo Dư (Instantaneous Acceleration)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Kỹ sư phân tích dữ liệu viễn trắc (Telemetry / Data Logging)

### 1. Công thức toán học (Mathematical Formula)

$$
a = \frac{F_{\text{drive}} - F_{\text{drag}} - F_{\text{roll}} - F_{\text{grade}}}{m_{\text{equiv}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $F_{\text{drive}}$ | Tổng lực kéo phát động tại vết tiếp xúc lốp | N | Tính từ mô-men động cơ và tỷ số truyền tổng |
| $F_{\text{drag}}$ | Lực cản khí động học không khí ở tốc độ tức thời | N | Tính từ công thức DM-054 |
| $F_{\text{roll}}$ | Lực cản lăn của lốp đua | N | $F_{\text{roll}} = C_{rr} \times m \times g$ |
| $F_{\text{grade}}$ | Lực cản dốc mặt đường đua | N | $F_{\text{grade}} = m \times g \times \sin\theta$ (đường bằng thì $=0$) |
| $m_{\text{equiv}}$ | Khối lượng tương đương của xe (tính cả quán tính xoay) | kg | $m_{\text{equiv}} \approx 1{,}05 - 1{,}12 \times m_{\text{static}}$ (tính thêm quán tính bánh đà, mâm lốp) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Gia tốc $a$ bị khống chế tuyệt đối bởi giới hạn ma sát bám của lốp: $a_{\text{max}} \le \mu_{\text{tire}} \times g$.
- Nếu lực kéo phát động $F_{\text{drive}}$ vượt quá ngưỡng bám, bánh sau sẽ quay trượt sinh khói (hiện tượng Wheelspin trong drag hoặc Drift).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi xe bắt đầu mất độ bám dọc và chuyển sang trượt ngang (Drift), lực đẩy tiến về phía trước giảm mạnh. Tay đua phải kiểm soát bướm ga nhuyễn để giữ góc trượt slip angle ổn định, tránh hiện tượng giật ngược đổi hướng đột ngột (Snap Oversteer) gây quăng xe vào rào chắn.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng định luật II Newton
- **Nguồn 1**: [Wrenchrig - Vehicle Acceleration Models](https://wrenchrig.com/wheel-rate-calculator/)
- **Nguồn 2**: [NASA Glenn - Flight and Acceleration Dynamics](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/)

---

## [DM-052] Quãng Đường Phanh Lý Tưởng (Ideal Braking Distance)

> **Phân loại độ tin cậy**: Chuẩn mô hình lý tưởng  
> **Nhóm người dùng**: Tay đua tính toán điểm mốc phanh (Braking Marker) trước khi vào cua

### 1. Công thức toán học (Mathematical Formula)

$$
d = \frac{v_0^2}{2 \times \mu \times g}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $v_0$ | Vận tốc ban đầu của xe trước khi đạp phanh | m/s | Đổi từ km/h: $v_0 = \frac{v_{\text{km/h}}}{3{,}6}$ |
| $\mu$ | Hệ số bám ma sát dọc của lốp đua với mặt đường | Không thứ nguyên | Lốp phố: $0{,}8 - 0{,}9$; Lốp bán trơn Semi-slick: $1{,}0 - 1{,}2$; Lốp trơn Slick đua nóng: $1{,}4 - 1{,}6$ |
| $g$ | Gia tốc trọng trường | m/s² | Lấy chuẩn $9{,}80665\text{ m/s}^2$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đây là quãng đường phanh vật lý thuần túy khi lốp hoạt động ở ngưỡng bám tối ưu (ngưỡng can thiệp của ABS đua hoặc kỹ thuật Trail-Braking điêu luyện).
- Chưa bao gồm quãng đường trôi trong thời gian phản xạ nhấc chân ga đạp phanh của tay đua ($0{,}2 - 0{,}4\text{ s}$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Quãng đường phanh tỷ lệ với bình phương của vận tốc ($v^2$). Nếu tốc độ tăng gấp đôi (từ $100\text{ km/h}$ lên $200\text{ km/h}$), quãng đường phanh sẽ tăng gấp 4 lần. Phanh quá muộn ở cuối đoạn thẳng sẽ dẫn đến tai nạn đâm rào ở tốc độ cao.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình động năng - ma sát
- **Nguồn 1**: [Wrenchrig - Braking Physics](https://wrenchrig.com/wheel-rate-calculator/)
- **Nguồn 2**: [NASA Glenn - Kinetic Energy Dissipation](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/)

---

## [DM-053] Chuyển Tải Dọc Khi Phanh Gấp (Longitudinal Load Transfer under Braking)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Kỹ thuật viên cân chỉnh van phân bổ lực phanh (Brake Bias Valve)

### 1. Công thức toán học (Mathematical Formula)

$$
\Delta F_z = \frac{m \times a \times h_{\text{CG}}}{L_{\text{wheelbase}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $m$ | Khối lượng toàn bộ xe đua | kg | Khối lượng xe cân góc 4 bánh (Corner Balance) |
| $a$ | Gia tốc giảm tốc phanh cực đại | m/s² | Xe đua lốp slick có thể đạt từ $12 - 16\text{ m/s}^2$ ($1{,}2 - 1{,}6\text{ g}$) |
| $h_{\text{CG}}$ | Chiều cao trọng tâm của xe so với mặt đất | mét (m) | Xe đua hạ gầm thường từ $0{,}35 - 0{,}45\text{ m}$ |
| $L_{\text{wheelbase}}$ | Chiều dài cơ sở giữa 2 trục bánh | mét (m) | Khoảng cách trục xe |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tải trọng dọc chuyển từ cầu sau dồn toàn bộ lên cầu trước: Cầu trước nhận thêm $+\Delta F_z$, trong khi cầu sau bị nhấc bớt $-\Delta F_z$.
- Trọng tâm xe càng thấp ($h_{\text{CG}}$ nhỏ) và trục cơ sở càng dài thì hiện tượng chúi đầu (brake dive) càng giảm, phân bổ tải trọng phanh càng đều.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi phanh cắm đầu, cầu sau bị nhẹ tải nghiêm trọng. Nếu van phân bổ lực phanh (Brake Bias) dồn quá nhiều áp suất dầu ra phanh sau, bánh sau sẽ bị bó cứng trước (Rear lock-up), khiến xe bị xoay ngang 180 độ (swap ends) mất lái ngay lập tức.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng cân bằng tĩnh học mô-men
- **Nguồn 1**: [Wrenchrig - Dynamic Load Transfer](https://wrenchrig.com/wheel-rate-calculator/)
- **Nguồn 2**: [NASA Glenn - Centre of Gravity & Dynamic Stability](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/)

---

## [DM-054] Lực Cản Khí Động Học $F_d$ (Aerodynamic Drag Force)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư khí động học xe đua, thợ độ cánh gió GT Wing / bộ khuếch tán gió Diffuser

### 1. Công thức toán học (Mathematical Formula)

$$
F_d = \frac{1}{2} \rho C_d A v^2
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\rho$ | Khối lượng riêng của không khí môi trường | kg/m³ | Tiêu chuẩn mực nước biển $20^\circ\text{C}$: $1{,}2\text{ kg/m}^3$ |
| $C_d$ | Hệ số cản khí động học không thứ nguyên | Không thứ nguyên | Xe đua đóng kín: $0{,}28 - 0{,}36$; Xe đua gắn cánh gió lớn Downforce: $0{,}40 - 0{,}55$ |
| $A$ | Diện tích cản gió trực diện của xe | m² | Xe đua gầm thấp: $1{,}8 - 2{,}3\text{ m}^2$ |
| $v$ | Tốc độ tức thời của xe di chuyển | m/s | Đổi từ km/h: $v = \frac{v_{\text{km/h}}}{3{,}6}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Phương trình cản khí chuẩn của cơ học chất lưu NASA.
- Lực cản tỷ lệ thuận với bình phương vận tốc ($v^2$); khi tăng tốc từ $100\text{ km/h}$ lên $200\text{ km/h}$, lực cản không khí tăng gấp 4 lần.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Chỉnh cánh gió đuôi (Rear Wing) góc đón gió (Angle of Attack) quá dựng đứng để tăng lực ép đuôi (Downforce) sẽ làm hệ số $C_d$ tăng vọt, biến cánh gió thành một "chiếc dù hãm", khiến xe bị tụt vận tốc tối đa nghiêm trọng trên các đoạn thẳng dài.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình phương trình cản khí động học
- **Nguồn 1**: [NASA Glenn - The Drag Equation](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/)
- **Nguồn 2**: [NASA Glenn - Modern Drag Equation](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/modern-drag-equation/)

---

## [DM-055] Công Suất Tiêu Hao Do Cản Gió $P_{\text{drag}}$ (Aerodynamic Drag Power)

> **Phân loại độ tin cậy**: Chuẩn cơ học  
> **Nhóm người dùng**: Kỹ sư tính toán tốc độ tối đa Top Speed của xe đua

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{drag}} = F_d \times v = \frac{1}{2} \rho C_d A v^3
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $F_d$ | Lực cản khí động học | Newton (N) | Tính từ công thức DM-054 |
| $v$ | Vận tốc di chuyển của xe | m/s | Tốc độ dòng khí quét qua xe |
| $\rho, C_d, A$ | Các thông số khí động học | SI chuẩn | Mật độ không khí, hệ số cản và diện tích cản gió |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công suất tiêu hao do rẽ gió tỷ lệ với lũy thừa bậc 3 của vận tốc ($v^3$).
- Ở dải tốc độ cao ($> 200\text{ km/h}$), hơn $80\%$ công suất động cơ sinh ra chỉ để thắng lực cản của không khí, lực cản lăn của lốp chỉ chiếm phần nhỏ.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Để tăng tốc độ tối đa từ $250\text{ km/h}$ lên $300\text{ km/h}$ (tăng $20\%$ tốc độ), công suất động cơ cần thiết phải tăng tới $1{,}2^3 = 1{,}728$ lần (tức tăng thêm hơn $72\%$ mã lực). Cần tối ưu hình dáng khí động học thay vì chỉ nhồi boost động cơ.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cơ học công suất khí động
- **Nguồn 1**: [NASA Glenn - Aerodynamic Power Consumption](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/)
- **Nguồn 2**: [Wrenchrig - Top Speed Modelling](https://wrenchrig.com/wheel-rate-calculator/)

---

## [DM-056] Độ Cứng Lò Xo Quy Đổi Tại Tâm Bánh Xe (Wheel Rate)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên chọn lò xo phuộc Coilover xe đua

### 1. Công thức toán học (Mathematical Formula)

$$
K_{\text{wheel}} = K_{\text{spring}} \times \left(\frac{dx_{\text{spring}}}{dx_{\text{wheel}}}\right)^2
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $K_{\text{spring}}$ | Độ cứng danh định của lò xo phuộc nhún | N/m (hoặc kgf/mm) | Đổi đơn vị: $1\text{ kgf/mm} \approx 9806{,}65\text{ N/m}$ |
| $MR = \frac{dx_{\text{spring}}}{dx_{\text{wheel}}}$ | Tỷ số truyền chuyển động (Motion Ratio) | Không thứ nguyên | Tỷ số giữa hành trình co của phuộc và hành trình di chuyển đứng của tâm moay-ơ bánh |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Lưu ý cực kỳ quan trọng: Motion Ratio bị bình phương ($MR^2$). Nếu càng chữ A có điểm bắt phuộc ở giữa càng với $MR = 0{,}7$, thì độ cứng thực tế tác động lên bánh xe chỉ còn: $K_{\text{wheel}} = K_{\text{spring}} \times 0{,}7^2 = 0{,}49 \times K_{\text{spring}}$ (mất đi hơn một nửa độ cứng lò xo).
- Hệ thống treo MacPherson có $MR \approx 0{,}9 - 0{,}98$; Càng A kép (Double Wishbone) $MR \approx 0{,}65 - 0{,}80$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Chọn sai độ cứng lò xo do quên bình phương Motion Ratio sẽ khiến hệ treo quá mềm làm cạ gầm vỡ cacte nhớt, hoặc quá cứng khiến bánh xe nảy tưng tưng trên gờ giảm tốc làm mất hoàn toàn độ bám đường khi ôm cua.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình động học hệ thống treo
- **Nguồn 1**: [Wrenchrig - Wheel Rate Calculator](https://wrenchrig.com/wheel-rate-calculator/)
- **Nguồn 2**: [Wrenchrig - Suspension Motion Ratio](https://wrenchrig.com/wheel-rate-calculator/)

---

## [DM-057] Tần Số Dao Động Tự Nhiên Của Hệ Treo (Suspension Natural Ride Frequency)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư cân chỉnh cân bằng hệ treo trước/sau (Ride & Handling)

### 1. Công thức toán học (Mathematical Formula)

$$
f_n = \frac{1}{2\pi} \times \sqrt{\frac{K_{\text{wheel}}}{m_{\text{sprung}}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $K_{\text{wheel}}$ | Độ cứng hệ treo quy đổi tại tâm bánh xe | N/m | Tính từ công thức DM-056 |
| $m_{\text{sprung}}$ | Khối lượng được treo phân bổ tại từng góc xe (Sprung Mass) | kg | Khối lượng khung vỏ đè lên lò xo góc đó (trừ mâm, lốp, moay-ơ) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Khuyến nghị tần số $f_n$ cho từng dòng xe: Xe du lịch êm ái: $1{,}0 - 1{,}3\text{ Hz}$; Xe thể thao đường phố: $1{,}5 - 2{,}0\text{ Hz}$; Xe đua Track day: $2{,}0 - 2{,}5\text{ Hz}$; Xe đua có cánh gió Downforce lớn (GT3/LMP/F1): $3{,}0 - 4{,}5\text{ Hz}$.
- Quy tắc Flat Ride: Tần số cầu sau thường được thiết kế cao hơn cầu trước khoảng $10 - 20\%$ để khi xe chạy qua ổ gà, dao động đuôi xe bắt kịp đầu xe giúp triệt tiêu hiện tượng dập dềnh bập bênh (pitching).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Không set tần số dao động quá cao ($> 2{,}5\text{ Hz}$) cho xe chạy track trời mưa hoặc mặt đường gồ ghề. Phuộc quá cứng không kịp giãn theo nhấp nhô mặt đường sẽ khiến lốp mất tiếp xúc, gây văng xe mất lái.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình dao động điều hòa bậc một
- **Nguồn 1**: [Wrenchrig - Ride Frequency Calculator](https://wrenchrig.com/wheel-rate-calculator/)
- **Nguồn 2**: [Wrenchrig - Corner Balance and Sprung Mass](https://wrenchrig.com/wheel-rate-calculator/)

---

## [DM-058] Tỷ Lệ Công Suất Trên Trọng Lượng PWR (Power-to-Weight Ratio)

> **Phân loại độ tin cậy**: Chuẩn định nghĩa  
> **Nhóm người dùng**: Ban tổ chức phân hạng giải đua xe, chuyên gia đánh giá hiệu năng xe

### 1. Công thức toán học (Mathematical Formula)

$$
\text{PWR} = \frac{P_{\text{kW}}}{m_{\text{ton}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{kW}}$ | Công suất cực đại của động cơ xe đua | kilowatt (kW) | Công suất đo Dyno |
| $m_{\text{ton}}$ | Tổng khối lượng xe đua gồm cả tay đua | tấn (1 tấn = $1000\text{ kg}$) | Khối lượng xe sẵn sàng lăn bánh |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đơn vị tính phổ biến: $\text{kW/tấn}$ hoặc $\text{HP/tấn}$ ($1\text{ kW/tấn} \approx 1{,}341\text{ HP/tấn}$).
- Xe thể thao phổ thông: $100 - 150\text{ kW/tấn}$; Siêu xe thể thao: $250 - 400\text{ kW/tấn}$; Xe đua bánh hở Hypercar: $> 600\text{ kW/tấn}$.
- PWR là chỉ số tiềm năng tăng tốc lý thuyết; kết quả thời gian chạy lap thực tế còn phụ thuộc vào độ bám cua của lốp, phanh và kỹ năng tay đua.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Xe có tỷ lệ $\text{PWR} > 300\text{ kW/tấn}$ đòi hỏi hệ thống phanh hiệu năng cao (đĩa gốm carbon hoặc heo phanh monoblock nhiều piston) và khung chống lật Rollcage đạt chuẩn FIA để bảo vệ tính mạng tay đua.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định nghĩa tỷ số vật lý
- **Nguồn 1**: [Wrenchrig - Power to Weight Metrics](https://wrenchrig.com/wheel-rate-calculator/)
- **Nguồn 2**: [NASA Glenn - Vehicle Performance Specifications](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/)
