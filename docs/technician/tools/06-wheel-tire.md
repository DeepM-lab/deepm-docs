# Chuyên đề 06: Wheel & Tire Fitment (10 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-06` | **Dải công cụ**: `DM-059` đến `DM-068`  
> **Đối tượng ứng dụng**: Kỹ thuật viên xưởng độ mâm lốp (Wheel & Tire Fitment Specialist), thợ căn chỉnh độ lồi mép vè (Stance/Flush), chuyên viên tư vấn nâng cấp lốp xe địa hình và xe sang.  
> **Mục tiêu kỹ thuật**: Tính toán đường kính danh nghĩa, chu vi lăn, bù trừ sai số đồng hồ tốc độ (Speedometer Calibration), độ lồi Offset (ET), khoảng sáng lọt lòng Backspacing và độ ăn sâu/nhô ngoài của mâm xe mới so với mâm nguyên bản (OE).

---

## [DM-059] Đường Kính Ngoài Danh Nghĩa Của Lốp (Nominal Tire Diameter)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ thuật viên tư vấn mâm lốp, đăng kiểm viên kỹ thuật

### 1. Công thức toán học (Mathematical Formula)

$$
D_{\text{mm}} = 25{,}4 \times d_{\text{rim}} + 2 \times W_{\text{mm}} \times \frac{AR}{100}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $d_{\text{rim}}$ | Đường kính danh định của vành mâm lazang | inch | Ví dụ: mâm 15, 16, 17, 18, 19, 20 inch |
| $W_{\text{mm}}$ | Bề rộng mặt lốp danh nghĩa | milimét (mm) | Bề rộng mặt cắt ngang (ví dụ: 205, 225, 265, 285 mm) |
| $AR$ | Tỷ lệ chiều cao hông lốp so với bề rộng (Aspect Ratio) | % | Phần trăm tỷ lệ (ví dụ: 45, 50, 65, 70) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức tính đường kính ngoài hình học của lốp ở trạng thái không tải và bơm đúng áp suất khuyến nghị của nhà sản xuất.
- Bán kính lăn động thực tế (Dynamic Rolling Radius) khi xe chạy trên đường sẽ nhỏ hơn khoảng $2 - 4\%$ do trọng lượng toàn tải đè bẹp hông lốp.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Chiều sâu gai lốp thực tế giữa các dòng lốp có thể làm chênh lệch đường kính ngoài từ $6 - 12\text{ mm}$ (gai lốp bùn M/T mới sâu $14 - 16\text{ mm}$ trong khi gai lốp trơn đường phố H/T chỉ sâu $7 - 9\text{ mm}$). Cần tính cả độ dày gai khi đo khoảng cách lọt hốc bánh.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học quy ước ETRTO/TRA
- **Nguồn 1**: [EngineeringToolbox - Tire Dimensions & Fitment](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Rolling Radius](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-060] Chu Vi Lăn Danh Nghĩa Của Lốp (Theoretical Tire Circumference)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ thuật viên cài đặt chu kỳ quay bánh xe vào hộp điều khiển ABS/ESP

### 1. Công thức toán học (Mathematical Formula)

$$
C_{\text{mm}} = \pi \times D_{\text{mm}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $D_{\text{mm}}$ | Đường kính danh nghĩa của lốp | milimét (mm) | Tính từ công thức DM-059 |
| $\pi$ | Hằng số Pi giải tích | Không thứ nguyên | Lấy chuẩn xấp xỉ $3{,}14159265$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Quãng đường xe lăn được sau đúng một vòng quay trục bánh xe trong điều kiện không trượt.
- Chu vi lăn thực tế bị co ngắn khi chở tải nặng hoặc lốp non hơi, và dãn nở ra ở tốc độ cao do lực ly tâm của khối cao su mặt gai.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Hệ dẫn động 4 bánh toàn thời gian AWD thông minh (như BMW xDrive, Audi quattro) yêu cầu chênh lệch chu vi lăn giữa 4 bánh xe không được vượt quá $1\%$. Lắp lốp mòn không đều hoặc lệch cỡ lốp trước/sau sẽ làm nóng rực cháy bộ ly hợp đĩa ma sát trong hộp phân phối trung tâm (Transfer Case).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học đường tròn
- **Nguồn 1**: [EngineeringToolbox - Circle Circumference and Geometry](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Tire Kinematics](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-061] Sai Số Đồng Hồ Tốc Độ Do Thay Lốp (Speedometer Error vs Tire Size)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Chủ xe kiểm tra tốc độ thực tế sau khi độ mâm lốp lớn hơn

### 1. Công thức toán học (Mathematical Formula)

$$
v_{\text{actual}} = v_{\text{indicated}} \times \frac{D_{\text{new}}}{D_{\text{old}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $v_{\text{indicated}}$ | Vận tốc hiển thị trên đồng hồ táp-lô | km/h | Tốc độ mà người lái xe nhìn thấy |
| $D_{\text{old}}$ | Đường kính của cỡ lốp nguyên bản (OE) theo xe | mm | Cỡ lốp xuất xưởng của nhà sản xuất |
| $D_{\text{new}}$ | Đường kính của cỡ lốp mới sau khi độ | mm | Cỡ lốp nâng cấp |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Áp dụng khi đồng hồ tốc độ của xe nhận tín hiệu từ cảm biến trục thứ cấp hộp số hoặc cảm biến tốc độ bánh xe ABS đã được calib theo lốp zin cũ.
- Tương tự, quãng đường hiển thị trên đồng hồ ODO cũng sẽ bị ghi nhận ít hơn so với quãng đường thực tế di chuyển khi lên lốp to.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Lên lốp to hơn khiến xe chạy thực tế nhanh hơn đồng hồ báo: Ví dụ khi đồng hồ táp-lô chỉ $100\text{ km/h}$, tốc độ thực tế của xe có thể đang là $108 - 110\text{ km/h}$ $\implies$ Nguy cơ bị camera phạt nguội bắn tốc độ rất cao! Cần cài đặt lại thông số lốp trong phần mềm ECU/BCM của xe.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng tỷ lệ chu kỳ quay
- **Nguồn 1**: [EngineeringToolbox - Speedometer Error Calculation](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Drivetrain Calibration](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-062] Tỷ Lệ Thay Đổi Đường Kính Lốp (Tire Diameter Percentage Change)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Đăng kiểm viên, kỹ thuật viên tư vấn mâm lốp an toàn

### 1. Công thức toán học (Mathematical Formula)

$$
\Delta D_{\%} = \left(\frac{D_{\text{new}}}{D_{\text{old}}} - 1\right) \times 100
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $D_{\text{new}}$ | Đường kính ngoài của lốp mới | mm | Tính từ kích thước lốp độ |
| $D_{\text{old}}$ | Đường kính ngoài của lốp cũ theo xe | mm | Kích thước lốp theo sổ đăng kiểm |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tiêu chuẩn an toàn của các nhà sản xuất xe và tổ chức lốp quốc tế ETRTO khuyến nghị: Độ chênh lệch đường kính ngoài lốp nên nằm trong ngưỡng an toàn:
$$
-3\% \le \Delta D_{\%} \le +3\%
$$
- Nếu vượt quá dải $\pm 3\%$, hệ thống cân bằng điện tử ESP/TCS có thể nhận diện sai tín hiệu trượt và can thiệp phanh bất thường.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Độ lệch đường kính vượt quá $+5\%$ trên các dòng xe gầm thấp sẽ gây cạ vè chắn bùn khi nhún sâu hoặc cạ vào lòng vè khi đánh hết lái, làm rách lốp xe khi chạy tốc độ cao.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học phần trăm
- **Nguồn 1**: [EngineeringToolbox - Wheel Fitment Standards](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [ETRTO - Standards Manual Guidelines](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-063] Vị Trí Mép Ngoài Mâm Xe So Với Mặt Bích (Outer Rim Position)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Thợ canh mép vè bánh xe Flush/Stance

### 1. Công thức toán học (Mathematical Formula)

$$
x_{\text{outer}} = \frac{W_{\text{rim\_mm}}}{2} - \text{ET}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $W_{\text{rim\_mm}}$ | Bề rộng danh định của mâm lazang | mm | Đổi từ bề rộng mâm hệ inch sang mm: $W_{\text{rim\_mm}} = W_{\text{inch}} \times 25{,}4$ |
| $\text{ET}$ | Độ lồi lệch tâm của mâm xe (Einpresstiefe / Offset) | mm | Có thể mang giá trị dương ($+$), bằng $0$, hoặc âm ($-$) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Khoảng cách từ mặt bích moay-ơ (Hub Mounting Surface) vươn ra mép ngoài cùng của vành mâm.
- Công thức đo theo bề rộng lòng mâm danh định giữa 2 mép gờ gài tanh lốp (bead seat); mép gờ ngoài (lip flange) thực tế thò thêm khoảng $10 - 12\text{ mm}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Nếu mép ngoài mâm thò ra quá nhiều vượt khỏi mép vè (Fender lip), khi xe chở nặng hoặc thụt phuộc sâu, mép kim loại của vè xe sẽ chém thẳng vào hông lốp gây nổ lốp.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học giải tích mâm xe
- **Nguồn 1**: [EngineeringToolbox - Wheel Offset and Geometry](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Automotive Rim Dimensions](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-064] Vị Trí Mép Trong Mâm Xe So Với Mặt Bích (Inner Rim Position)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ thuật viên kiểm tra khoảng hở hệ thống treo (Suspension Clearance)

### 1. Công thức toán học (Mathematical Formula)

$$
x_{\text{inner}} = \frac{W_{\text{rim\_mm}}}{2} + \text{ET}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $W_{\text{rim\_mm}}$ | Bề rộng mâm xe đổi sang milimét | mm | $W_{\text{inch}} \times 25{,}4$ (ví dụ: mâm 8.5" = $215{,}9\text{ mm}$) |
| $\text{ET}$ | Độ lệch tâm Offset của mâm xe | mm | Khoảng cách từ mặt bích đến đường tâm mâm |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Khoảng cách từ mặt bích moay-ơ thụt sâu vào phía gầm xe bên trong.
- Đại lượng quan trọng hàng đầu để kiểm tra xem mâm mới bản rộng có bị cọ quẹt vào thân cây phuộc nhún, rotuyn lái hoặc càng chữ A hay không.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khoảng hở tối thiểu an toàn giữa mép trong mâm/lốp với cây phuộc hoặc dây dầu phanh phải đạt tối thiểu $10 - 15\text{ mm}$. Nếu khoảng cách quá khít ($< 5\text{ mm}$), khi lốp bị biến dạng lúc ôm cua gắt sẽ cọ thủng ống dây dầu phanh gây mất phanh hoàn toàn.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học giải tích mâm xe
- **Nguồn 1**: [EngineeringToolbox - Wheel Inset Geometry](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Suspension Clearance Requirements](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-065] Chiều Sâu Lọt Lòng Backspacing Danh Nghĩa (Nominal Wheel Backspacing)

> **Phân loại độ tin cậy**: Mô hình hình học  
> **Nhóm người dùng**: Thợ độ xe cơ bắp Mỹ (Muscle Car) và xe việt dã 4x4 dùng hệ inch

### 1. Công thức toán học (Mathematical Formula)

$$
\text{BS}_{\text{mm}} = \frac{W_{\text{rim\_mm}}}{2} + \text{ET}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $W_{\text{rim\_mm}}$ | Chiều rộng danh định của mâm | mm | Đo giữa 2 gờ tanh lốp |
| $\text{ET}$ | Độ lệch tâm Offset của mâm | mm | Giá trị dập nổi trên nan mâm (ví dụ ET+35, ET-12) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Trong kỹ thuật độ xe truyền thống Bắc Mỹ, Backspacing đo bằng thước đặt trên mép vành sau cùng của mâm xuống mặt bích.
- Backspacing thực tế đo bằng thước (Physical Backspace) lớn hơn Backspacing danh nghĩa khoảng $0{,}5\text{ inch}$ ($12{,}7\text{ mm}$) do bề dày gờ mép mâm (wheel flange lip).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi hoán cải cùm phanh lớn (Big Brake Kit), Backspacing không quyết định được độ cọ cùm heo phanh phía trước mặt bích mà phụ thuộc vào biên dạng độ cong của các nan hoa mâm (Caliper Clearance / X-factor).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình hình học mâm xe
- **Nguồn 1**: [EngineeringToolbox - Wheel Backspacing Measurement](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [TRA - Tire and Rim Association Standards](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-066] Độ Thay Đổi Nhô Mép Ngoài Của Bánh Mâm Mới (Wheel Poke Delta Outer)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ thuật viên độ mâm bánh béo thò mép vè Stance

### 1. Công thức toán học (Mathematical Formula)

$$
\Delta_{\text{outer}} = \frac{W_{\text{new}} - W_{\text{old}}}{2} - (\text{ET}_{\text{new}} - \text{ET}_{\text{old}})
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $W_{\text{new}}, W_{\text{old}}$ | Bề rộng của mâm mới và mâm cũ nguyên bản | mm | Đổi bề rộng mâm sang mm ($W_{\text{inch}} \times 25{,}4$) |
| $\text{ET}_{\text{new}}, \text{ET}_{\text{old}}$ | Độ lệch tâm Offset của mâm mới và mâm cũ | mm | Đọc ký hiệu ET dập trên mặt sau nan mâm |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Kết quả $\Delta_{\text{outer}} > 0$: Mép ngoài mâm mới thò ra ngoài vè thêm bấy nhiêu mm so với mâm zin cũ.
- Kết quả $\Delta_{\text{outer}} < 0$: Mép ngoài mâm mới thụt sâu vào trong hốc bánh hơn so với mâm cũ.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Mâm độ lồi ra ngoài quá nhiều ($\Delta_{\text{outer}} > +25\text{ mm}$) làm tăng đáng kể bán kính quay vòng cọ lốp (Scrub Radius dương lớn), khiến tay lái bị giật mạnh khi chạy qua vũng nước hoặc khi một bên bánh đạp ổ gà, đồng thời làm tăng tải trọng uốn phá hủy vòng bi moay-ơ trục bánh xe.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học so sánh tương đối
- **Nguồn 1**: [EngineeringToolbox - Wheel Fitment Comparison](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Scrub Radius Mechanics](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-067] Độ Thay Đổi Ăn Sâu Mép Trong Của Bánh Mâm Mới (Wheel Inset Delta Inner)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ thuật viên kiểm tra va chạm gầm khi lên mâm bản rộng

### 1. Công thức toán học (Mathematical Formula)

$$
\Delta_{\text{inner}} = \frac{W_{\text{new}} - W_{\text{old}}}{2} + (\text{ET}_{\text{new}} - \text{ET}_{\text{old}})
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $W_{\text{new}}, W_{\text{old}}$ | Bề rộng của mâm mới và mâm cũ | mm | Đổi sang mm |
| $\text{ET}_{\text{new}}, \text{ET}_{\text{old}}$ | Độ lệch tâm Offset mâm mới và cũ | mm | Giá trị Offset |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Kết quả $\Delta_{\text{inner}} > 0$: Mép trong mâm mới thụt sâu vào trong gầm thêm bấy nhiêu mm $\implies$ Nguy cơ cọ vào chén đỡ lò xo phuộc nhún hoặc thanh cân bằng Sway bar.
- Nếu $\Delta_{\text{inner}} > 10\text{ mm}$, thợ phải dùng dưỡng đo khoảng hở thực tế trên cầu nâng trước khi quyết định đặt mua mâm.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Tuyệt đối không khắc phục hiện tượng cọ mép trong bằng cách chêm thêm các miếng thớt đệm Spacer rẻ tiền loại phổ thông không có gờ định tâm moay-ơ (Hub-centric ring). Chêm Spacer trôi nổi sẽ làm ngắn hành trình ren ăn ốc bu-lông, gây rung lắc vô-lăng và đứt gãy toàn bộ bu-lông bánh xe khi chạy trên cao tốc.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học so sánh khoảng hở
- **Nguồn 1**: [EngineeringToolbox - Inner Wheel Inset Calculation](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Wheel Spacers & Hub Mechanics](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-068] Khoảng Sáng Gầm Tăng Thêm Nhờ Nâng Cỡ Lốp (Ground Clearance Lift from Tire)

> **Phân loại độ tin cậy**: Mô hình hình học  
> **Nhóm người dùng**: Kỹ thuật viên nâng gầm xe off-road, đăng kiểm viên ô tô

### 1. Công thức toán học (Mathematical Formula)

$$
\Delta h = \frac{D_{\text{new}} - D_{\text{old}}}{2}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $D_{\text{new}}$ | Đường kính lốp mới sau khi độ lên | mm | Tính từ công thức DM-059 |
| $D_{\text{old}}$ | Đường kính lốp nguyên bản ban đầu | mm | Đường kính lốp zin |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đây là phương pháp DUY NHẤT để nâng cao khoảng sáng gầm xe tại vị trí quả cầu vi sai trục cứng (Solid Axle Pumpkin). Nâng phuộc (Suspension Lift) chỉ nâng cao thân vỏ và sắt-xi, không nâng được điểm thấp nhất của vỏ cầu vi sai.
- Chiều cao gầm tăng thêm chính bằng một nửa độ chênh lệch đường kính ngoài của lốp (tức độ tăng bán kính).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Nâng bán kính lốp làm nâng cao trọng tâm xe ($h_{\text{CG}}$) tương ứng, làm tăng nguy cơ lật nghiêng xe khi vào cua gắt hoặc chạy trên sườn dốc nghiêng ngang. Cần kết hợp mở rộng cự ly vết bánh xe (Track Width) bằng mâm có ET nhỏ hơn hoặc lắp cánh vè lồi (Fender Flares).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình hình học giải tích bán kính
- **Nguồn 1**: [EngineeringToolbox - Ground Clearance Lift Analysis](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Axle Geometry](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)
