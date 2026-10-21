# Chuyên đề 10: EV & Hybrid Retrofit (10 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-10` | **Dải công cụ**: `DM-105` đến `DM-114`  
> **Đối tượng ứng dụng**: Kỹ sư và thợ kỹ thuật hoán cải xe động cơ đốt trong sang xe điện (EV Conversion / Retrofit), kỹ thuật viên bảo dưỡng xe Hybrid cắm sạc (PHEV), thợ lập trình biến tần Inverter cao áp.  
> **Mục tiêu kỹ thuật**: Tính toán công suất và mô-men xoắn mô-tơ điện kéo, dòng điện trên thanh cái cao áp DC Bus, dung lượng pin khả dụng, suất tiêu thụ năng lượng Wh/km, quãng đường xe điện (Range), thời gian sạc pin và công suất phanh tái sinh năng lượng (Regenerative Braking).

---

## [DM-105] Công Suất Cơ Học Tại Trục Mô-Tơ Điện (Electric Motor Mechanical Shaft Power)

> **Phân loại độ tin cậy**: Chuẩn cơ học  
> **Nhóm người dùng**: Kỹ sư chọn mô-tơ điện đồng bộ nam châm vĩnh cửu (PMSM / AC Induction)

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{kW}} = \frac{T_{\text{N.m}} \times n_{\text{rpm}}}{9549{,}2966}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $T_{\text{N.m}}$ | Mô-men xoắn cơ học phát ra tại trục rotor | N.m | Đo bằng cảm biến mô-men trên băng thử Dyno |
| $n_{\text{rpm}}$ | Tốc độ vòng tua quay của mô-tơ | rpm | Dải tua vận hành của mô-tơ điện ô tô ($0 - 12.000\text{ rpm}$) |
| $9549{,}2966$ | Hằng số chuẩn hóa hệ đơn vị quốc tế SI | Không thứ nguyên | $\frac{60 \times 1000}{2\pi} \approx 9549{,}2966$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công suất cơ học hữu ích xuất ra tại đầu trục của mô-tơ điện.
- Khác với động cơ đốt trong, mô-tơ điện có thể sinh mô-men xoắn cực đại ngay từ $0\text{ rpm}$ (vùng Constant Torque), sau đó khi vượt qua tốc độ cơ sở (Base Speed) sẽ chuyển sang vùng công suất không đổi (Constant Power / Field Weakening).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cần phân biệt rõ: Công suất liên tục (Continuous Power S1) và Công suất cực đại ngắn hạn (Peak Power $10 - 30\text{ giây}$). Sử dụng công suất Peak liên tục quá 60 giây sẽ khiến nhiệt độ cuộn dây stator vượt quá cấp cách điện Class H ($180^\circ\text{C}$), làm cháy rụi mô-tơ và khử từ tính nam châm vĩnh cửu (Neodymium Demagnetization).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cơ học mô-men công suất
- **Nguồn 1**: [EngineeringToolbox - Electric Motors Power and Torque](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)
- **Nguồn 2**: [EngineeringToolbox - Angular Velocity & Mechanics](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)

---

## [DM-106] Mô-Men Xoắn Trục Mô-Tơ Theo Công Suất & Tốc Độ (Electric Motor Torque from Power & RPM)

> **Phân loại độ tin cậy**: Chuẩn cơ học  
> **Nhóm người dùng**: Kỹ thuật viên cài đặt bản đồ điều khiển mô-men (Torque Map) trong VCU/Inverter

### 1. Công thức toán học (Mathematical Formula)

$$
T_{\text{N.m}} = \frac{9549{,}2966 \times P_{\text{kW}}}{n_{\text{rpm}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{kW}}$ | Công suất cơ học của mô-tơ tại điểm làm việc | kW | Công suất cơ |
| $n_{\text{rpm}}$ | Tốc độ vòng tua quay của mô-tơ | rpm | Điều kiện: $n_{\text{rpm}} > 0$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức áp dụng cho vùng làm việc động học ($n_{\text{rpm}} > 0$).
- Tại điểm dừng $0\text{ rpm}$, mô-men khởi động (Stall Torque) được khống chế bởi giới hạn dòng pha cực đại (Peak Phase Current) do biến tần Inverter cấp và độ bão hòa từ của lõi thép stator: $T_{\text{stall}} \approx k_t \times I_{\text{phase\_rms}}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Mô-men xoắn tức thời cực lớn ở $0\text{ rpm}$ của xe điện hoán cải có thể làm vỡ bánh răng số 1 hoặc gãy trục sơ cấp hộp số zin nếu người lái đạp lút ga đột ngột. Kỹ thuật viên lập trình VCU bắt buộc phải cài đặt độ dốc tăng mô-men (Torque Slew Rate Limit) để bảo vệ hệ thống truyền lực.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cơ học đảo chiều
- **Nguồn 1**: [EngineeringToolbox - Torque from Speed and Power](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)
- **Nguồn 2**: [EngineeringToolbox - Drivetrain Dynamics](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)

---

## [DM-107] Công Suất Điện DC Nạp Vào Biến Tần Inverter (Inverter DC Input Power)

> **Phân loại độ tin cậy**: Chuẩn cân bằng  
> **Nhóm người dùng**: Kỹ sư đánh giá dòng xả pin rút từ pack pin cao áp

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{DC\_in}} = \frac{P_{\text{mech}}}{\eta_{\text{drivetrain}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{mech}}$ | Công suất cơ học yêu cầu tại trục bánh xe / trục mô-tơ | Watt (W) | Đổi từ kW sang W: $P_{\text{W}} = P_{\text{kW}} \times 1000$ |
| $\eta_{\text{drivetrain}}$ | Hiệu suất gộp toàn bộ hệ truyền động điện | Thập phân ($0..1$) | Gộp Biến tần Inverter ($\sim 0{,}96$) $\times$ Mô-tơ ($\sim 0{,}92$) $\times$ Hộp số giảm tốc ($\sim 0{,}97$) $\implies \eta_{\text{total}} \approx 0{,}82 - 0{,}88$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công suất điện một chiều DC rút trực tiếp từ khối pack pin cao áp (High-Voltage Battery Pack).
- Hiệu suất thay đổi tùy theo điểm làm việc: Hiệu suất thấp hơn ở vùng tải cực nhẹ ($< 10\%$) hoặc tua cực cao ($> 90\%$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Xe điện cần công suất tăng tốc $150\text{ kW}$ tại trục bánh sẽ rút công suất điện từ pin lên tới: $\frac{150}{0{,}85} \approx 176{,}5\text{ kW}$. Khối pin cao áp phải có khả năng cung ứng công suất xả tức thời này mà không bị tụt áp dưới ngưỡng ngắt an toàn của BMS.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cân bằng năng lượng cơ - điện
- **Nguồn 1**: [EngineeringToolbox - Electric Drivetrain Efficiency](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)
- **Nguồn 2**: [EngineeringToolbox - Power Conversion](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)

---

## [DM-108] Cường Độ Dòng Điện Thanh Cái Cao Áp DC Bus (HV DC Bus Current)

> **Phân loại độ tin cậy**: Chuẩn điện  
> **Nhóm người dùng**: Thợ chọn cáp cam cao áp và rơ-le tiếp điểm chính (Main Contactor)

### 1. Công thức toán học (Mathematical Formula)

$$
I_{\text{DC\_bus}} = \frac{P_{\text{DC\_in}}}{V_{\text{DC\_bus}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{DC\_in}}$ | Công suất điện DC đầu vào Inverter | Watt (W) | Tính từ công thức DM-107 |
| $V_{\text{DC\_bus}}$ | Điện áp tức thời trên thanh cái DC bus cao áp | Volt (V) | Dải điện áp cao áp ô tô điện: $300 - 450\text{V}$ (hệ 400V) hoặc $600 - 850\text{V}$ (hệ 800V) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Giá trị dòng điện trung bình hiệu dụng cấp cho biến tần; dòng điện thực tế có chứa thành phần sóng gợn tần số cao (High-Frequency Ripple Current) do việc băm xung PWM của các van công suất IGBT/SiC.
- Thanh cái DC Bus bắt buộc phải mắc các tụ điện màng (Film Capacitors) điện dung lớn để hấp thu dòng ripple này.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Dòng điện cao áp $I_{\text{DC}} > 300\text{ A}$ ở điện áp $> 400\text{V}$ là nguồn nguy hiểm chết người lập tức. Bắt buộc toàn bộ dây dẫn cao áp phải có vỏ màu cam dạ quang chuẩn quốc tế, trang bị giắc ngắt khẩn cấp cứu hộ (Emergency Service Disconnect / MSD) và hệ thống kiểm tra cách điện cao áp (Insulation Monitoring Device - IMD) phát hiện rò điện ra vỏ chassis.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định luật Ohm DC cao áp
- **Nguồn 1**: [EngineeringToolbox - DC Bus Current](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [EngineeringToolbox - High Voltage Electric Vehicles](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)

---

## [DM-109] Tổng Năng Lượng Khối Pin Xe Điện (EV Pack Energy Capacity)

> **Phân loại độ tin cậy**: Chuẩn cấu hình  
> **Nhóm người dùng**: Kỹ sư thiết kế dung lượng pack pin cao áp xe điện hoán cải

### 1. Công thức toán học (Mathematical Formula)

$$
E_{\text{kWh}} = \frac{V_{\text{nom}} \times C_{\text{Ah}}}{1000}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{\text{nom}}$ | Điện áp danh định của toàn bộ pack pin | Volt (V) | $V_{\text{nom}} = N_s \times V_{\text{cell}}$ (ví dụ pack 96S LiFePO4: $96 \times 3{,}2\text{V} = 307{,}2\text{V}$) |
| $C_{\text{Ah}}$ | Dung lượng tích trữ danh định của pack | Ampe-giờ (Ah) | Dung lượng tế bào pin |
| $1000$ | Hằng số đổi từ Watt-giờ (Wh) sang Kilowatt-giờ (kWh) | Không thứ nguyên | Đơn vị chuẩn kWh |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đây là dung lượng thô toàn phần (Gross Battery Capacity).
- Trên xe điện thương mại, phần mềm BMS luôn khóa một dải đệm an toàn ở đáy và đỉnh (Top & Bottom Buffers), chỉ cho phép người dùng sử dụng dung lượng khả dụng thuần (Net Usable Capacity) khoảng $90 - 95\%$ Gross Capacity để bảo vệ tuổi thọ pin.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Trọng lượng khối pin là thách thức lớn nhất của xe điện hoán cải. Với mật độ năng lượng của LiFePO4 khoảng $140 - 160\text{ Wh/kg}$, một pack pin $45\text{ kWh}$ có khối lượng riêng ruột cell khoảng $300\text{ kg}$, cộng thêm vỏ hộp, nhôm tản nhiệt và thanh busbar tổng trọng lượng lên tới $400 - 450\text{ kg}$. Bắt buộc phải gia cố khung gầm và hệ thống phanh xe nguyên bản.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cấu hình năng lượng tích trữ
- **Nguồn 1**: [EngineeringToolbox - Electric Battery Energy Sizing](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)
- **Nguồn 2**: [Battery University - EV Pack Configurations](https://batteryuniversity.com/learn/article/what_is_the_c_rate)

---

## [DM-110] Suất Tiêu Thụ Điện Năng Trung Bình (EV Energy Consumption per km)

> **Phân loại độ tin cậy**: Chuẩn định nghĩa  
> **Nhóm người dùng**: Kỹ sư thử nghiệm chạy xe trên chu trình thực nghiệm (WLTP / EPA)

### 1. Công thức toán học (Mathematical Formula)

$$
\text{EC}_{\text{Wh/km}} = \frac{E_{\text{used\_Wh}}}{d_{\text{km}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $E_{\text{used\_Wh}}$ | Tổng điện năng đã tiêu hao từ khối pin | Watt-giờ (Wh) | Đo tích phân dòng điện và điện áp DC Bus qua BMS |
| $d_{\text{km}}$ | Quãng đường xe đã di chuyển thực tế | km | Đo bằng cảm biến ODO hoặc định vị GPS |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đơn vị tính: $\text{Wh/km}$ hoặc quy đổi sang $\text{kWh/100km}$ ($\text{kWh/100km} = \frac{\text{EC}_{\text{Wh/km}}}{10}$).
- Xe điện đô thị cỡ nhỏ (hạng A): $110 - 135\text{ Wh/km}$; Xe Sedan hạng D: $140 - 175\text{ Wh/km}$; Xe SUV / Bán tải điện: $200 - 270\text{ Wh/km}$.
- Mức tiêu hao năng lượng tăng từ $25 - 40\%$ khi chạy tốc độ cao trên cao tốc do lực cản khí động học ($v^3$) hoặc khi bật sưởi mùa đông.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Xe điện hoán cải giữ lại hộp số sàn và hệ dẫn động 4x4 cơ khí truyền thống có mức tiêu hao điện năng cao hơn xe điện chuyên dụng từ $20 - 30\%$ do ma sát của các bánh răng hộp số, khớp các-đăng và vi sai cầu. Cần tính toán dung lượng pin lớn hơn tương ứng.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định nghĩa mức tiêu thụ năng lượng
- **Nguồn 1**: [EngineeringToolbox - Vehicle Energy Consumption](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EPA - Electric Vehicle Fuel Economy Testing](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-111] Quãng Đường Di Chuyển Lý Thuyết Của Xe Điện (EV Theoretical Driving Range)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Kỹ sư tư vấn cấu hình khối pin cho khách hàng hoán cải xe điện

### 1. Công thức toán học (Mathematical Formula)

$$
\text{Range}_{\text{km}} = \frac{E_{\text{usable\_Wh}}}{\text{EC}_{\text{Wh/km}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $E_{\text{usable\_Wh}}$ | Tổng năng lượng khả dụng an toàn của khối pin | Wh | $E_{\text{nom\_Wh}} \times \text{DoD} \times \eta_{\text{discharge}}$ |
| $\text{EC}_{\text{Wh/km}}$ | Suất tiêu hao điện năng dự kiến theo chu trình lái | Wh/km | Tính từ công thức DM-110 |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Dự báo cự ly di chuyển trong điều kiện vận hành chuẩn hóa; không phản ánh các điều kiện thời tiết khắc nghiệt.
- Lên dốc liên tục hoặc kéo rơ-moóc nặng sẽ làm quãng đường thực tế giảm xuống chỉ còn một nửa so với cự ly lý thuyết.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Hiện tượng "lo lắng về cự ly" (Range Anxiety): Khi pin còn dưới $15\%$, người lái phải tắt bớt các phụ tải điều hòa, hạ tốc độ chạy đều $60 - 70\text{ km/h}$ để tối ưu hóa quãng đường đến trạm sạc gần nhất, tránh tình trạng xe bị khóa đỗ giữa đường cao tốc do cạn pin.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng cự ly di chuyển
- **Nguồn 1**: [EngineeringToolbox - Driving Range Estimation](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [WLTP - Worldwide Harmonised Light Vehicles Test Procedure](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-112] Thời Gian Sạc Pin Ở Công Suất Cố Định (Constant Power Charging Time)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Chủ xe điện tính toán thời gian chờ sạc tại trụ sạc AC/DC

### 1. Công thức toán học (Mathematical Formula)

$$
t_{\text{h}} = \frac{\Delta E_{\text{kWh}}}{P_{\text{charge\_kW}} \times \eta_{\text{charge}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\Delta E_{\text{kWh}}$ | Lượng năng lượng cần nạp bổ sung vào pack pin | kWh | Chênh lệch năng lượng giữa mức pin mong muốn và mức hiện tại |
| $P_{\text{charge\_kW}}$ | Công suất sạc danh định của trụ sạc | kW | Sạc chậm AC tại nhà: $3{,}5 - 11\text{ kW}$; Sạc nhanh DC: $30 - 150\text{ kW}$ |
| $\eta_{\text{charge}}$ | Hiệu suất sạc tích lũy (bao gồm bộ On-board Charger) | Thập phân ($0..1$) | Sạc AC: $0{,}88 - 0{,}92$; Sạc nhanh DC: $0{,}93 - 0{,}96$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức giả định công suất sạc không đổi trong suốt quá trình nạp.
- Trong thực tế khi sạc nhanh DC, đường cong nạp pin (Charging Curve) chỉ duy trì công suất tối đa từ $10\%$ đến khoảng $70 - 80\%$ SOC. Sau ngưỡng $80\%$, BMS bắt buộc phải giảm dần công suất sạc (Thermal Tapering) để tránh hiện tượng quá nhiệt và thoái hóa cell.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cố tình hack phần mềm để duy trì dòng sạc nhanh DC cực đại ở dải pin trên $85\%$ SOC sẽ làm điện áp cell vượt ngưỡng an toàn $3{,}65\text{V}$, dẫn đến hiện tượng thoát nhiệt mất kiểm soát (Thermal Runaway) và kích hỏa pack pin.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng truyền tải năng lượng sạc
- **Nguồn 1**: [EngineeringToolbox - Battery Charging Dynamics](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)
- **Nguồn 2**: [Battery University - Fast Charging Lithium Batteries](https://batteryuniversity.com/learn/article/what_is_the_c_rate)

---

## [DM-113] Công Suất Điện Thu Hồi Khi Phanh Tái Sinh (Regenerative Braking Power)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Kỹ sư cân chỉnh lực ghìm phanh tái sinh (Regen Level) trên phần mềm VCU

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{regen}} = F_{\text{brake}} \times v \times \eta_{\text{regen}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $F_{\text{brake}}$ | Lực hãm phanh phát động bởi mô-tơ điện đóng vai trò máy phát | Newton (N) | Lực ghìm xe làm chậm chuyển động |
| $v$ | Tốc độ tức thời của xe tại thời điểm rà phanh | m/s | $v = \frac{v_{\text{km/h}}}{3{,}6}$ |
| $\eta_{\text{regen}}$ | Hiệu suất chuyển đổi cơ - điện - hóa thu hồi vào pin | Thập phân ($0..1$) | Thường đạt $0{,}60 - 0{,}75$ (Mô-tơ $\to$ Inverter $\to$ Pin) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công suất sạc ngược vào khối pin khi xe hãm phanh hoặc đổ đèo.
- Lực hãm phanh tái sinh bị giới hạn bởi: (1) Độ bám của lốp xe với mặt đường, (2) Khả năng nuốt dòng sạc tức thời cực đại của pack pin, (3) Tốc độ quay của mô-tơ (ở dải tốc độ cực thấp $< 5\text{ km/h}$, lực phanh regen triệt tiêu về 0).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi khối pin đang đầy điện $100\%$ SOC hoặc nhiệt độ pin đang dưới $0^\circ\text{C}$, BMS sẽ **tự động cắt hoàn toàn chức năng phanh tái sinh** để bảo vệ pin. Người lái xe điện đổ đèo dốc dài lúc pin đầy bắt buộc phải dùng phanh cơ khí ma sát truyền thống; nếu không chú ý sẽ bị trôi xe mất phanh do phanh cơ bị quá nhiệt (Brake Fade).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng tái sinh năng lượng
- **Nguồn 1**: [EngineeringToolbox - Regenerative Braking Power](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Kinetic Energy Recovery Systems](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-114] Nhiệt Lượng Cần Giải Phóng Của Hệ Truyền Động (Drivetrain Heat Rejection)

> **Phân loại độ tin cậy**: Chuẩn cân bằng  
> **Nhóm người dùng**: Kỹ sư thiết kế két nước tản nhiệt và lưu lượng bơm tuần hoàn làm mát Inverter/Mô-tơ

### 1. Công thức toán học (Mathematical Formula)

$$
\dot{Q}_{\text{waste}} = P_{\text{in}} - P_{\text{out}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{in}}$ | Tổng công suất điện đầu vào cấp cho Inverter và Mô-tơ | Watt (W) | Công suất điện rút từ pin |
| $P_{\text{out}}$ | Công suất cơ học hữu ích xuất ra trên trục | Watt (W) | Công suất đẩy xe chạy |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức định luật I nhiệt động học: Phần năng lượng chênh lệch không chuyển thành cơ năng sẽ biến thành nhiệt năng tỏa ra trên các linh kiện bán dẫn (IGBT/MOSFET) và cuộn dây đồng của mô-tơ.
- Ví dụ: Hệ truyền động hoạt động ở mức công suất $100\text{ kW}$ với hiệu suất gộp $88\%$, thì công suất nhiệt thải cần giải tỏa qua két nước làm mát là:
$$
\dot{Q}_{\text{waste}} = 100 \times (1 - 0{,}88) = 12\text{ kW nhiệt!}
$$
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Biến tần công suất (Inverter) rất nhạy cảm với nhiệt độ: Các van bán dẫn IGBT/SiC chỉ chịu được nhiệt độ nước làm mát đầu vào tối đa $65 - 70^\circ\text{C}$ (thấp hơn nhiều so với nhiệt độ nước làm mát động cơ xăng $90 - 105^\circ\text{C}$). Kỹ thuật viên hoán cải xe điện tuyệt đối không dùng chung két nước giải nhiệt của động cơ đốt trong cũ cho Inverter; bắt buộc phải lắp két nước nhôm phụ độc lập với bơm nước điện 12V lưu lượng cao.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cân bằng năng lượng nhiệt động học
- **Nguồn 1**: [EngineeringToolbox - Heat Balance and Power Losses](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [EngineeringToolbox - Liquid Cooling in Electric Machines](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)
