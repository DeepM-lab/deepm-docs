# Chuyên đề 08: Battery & Storage (12 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-08` | **Dải công cụ**: `DM-081` đến `DM-092`  
> **Đối tượng ứng dụng**: Kỹ thuật viên đóng pack pin Lithium sắt phốt phát (LiFePO4) và Sodium-ion xe dã ngoại, thợ cài đặt mạch quản trị pin thông minh Smart BMS, kỹ sư thiết kế thanh cái Busbar và hệ thống lưu trữ năng lượng ESS di động.  
> **Mục tiêu kỹ thuật**: Tính toán cấu hình ghép chuỗi Ns / ghép song song Np, điện áp danh định, dung lượng Ah, dòng xả C-rate, nội trở tương đương của khối pin, sụt áp khi mang tải nặng, nhiệt Joule phát sinh trong cell và kích thước thanh cái đồng Busbar.

---

## [DM-081] Điện Áp Danh Định Pack Pin Ghép Nối Tiếp Ns (Series String Voltage)

> **Phân loại độ tin cậy**: Chuẩn cấu hình  
> **Nhóm người dùng**: Thợ đóng pin LiFePO4, kỹ thuật viên cài đặt ngưỡng điện áp BMS

### 1. Công thức toán học (Mathematical Formula)

$$
V_{\text{pack\_nom}} = N_s \times V_{\text{cell\_nom}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $N_s$ | Số lượng cell pin (hoặc cụm cell) mắc nối tiếp | Số nguyên dương | Hệ 12V: $4\text{S}$; Hệ 24V: $8\text{S}$; Hệ 48V: $16\text{S}$ (với LiFePO4) |
| $V_{\text{cell\_nom}}$ | Điện áp danh định của một cell đơn | Volt (V) | LiFePO4: $3{,}2\text{V}$; Sodium-ion: $3{,}1\text{V}$; NMC/Li-ion: $3{,}6 - 3{,}7\text{V}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức tính điện áp danh định trên nhãn thiết kế.
- Điện áp thực tế biến thiên theo trạng thái dung lượng (State of Charge - SOC):
  * Cell LiFePO4: Điện áp sạc đầy ngắt sạc là $3{,}65\text{V}$ (Pack 4S đạt $14{,}6\text{V}$; Pack 8S đạt $29{,}2\text{V}$).
  * Điện áp xả cạn ngắt bảo vệ là $2{,}50\text{V}$ (Pack 4S sụt về $10{,}0\text{V}$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cấm để bất kỳ cell LiFePO4 nào bị xả quá giới hạn tụt áp dưới $2{,}0\text{V}$ hoặc sạc quá áp vượt trên $3{,}85\text{V}$. Xả quá sâu làm tan rã chất kết dính cực âm đồng; sạc quá áp làm phân hủy chất điện phân sinh khí dễ cháy làm phồng bung van an toàn cell pin.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cấu hình nối tiếp định luật Kirchhoff áp
- **Nguồn 1**: [Battery University - Serial and Parallel Battery Configurations (BU-302)](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)
- **Nguồn 2**: [Battery University - What is the C-rate?](https://batteryuniversity.com/learn/article/what_is_the_c_rate)

---

## [DM-082] Dung Lượng Pack Pin Ghép Song Song Np (Parallel Branch Capacity)

> **Phân loại độ tin cậy**: Chuẩn cấu hình  
> **Nhóm người dùng**: Kỹ thuật viên tăng dung lượng lưu trữ pack pin

### 1. Công thức toán học (Mathematical Formula)

$$
C_{\text{pack\_Ah}} = N_p \times C_{\text{cell\_Ah}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $N_p$ | Số lượng nhánh cell mắc song song với nhau | Số nguyên dương | Ghép $1\text{P}, 2\text{P}, 3\text{P}, 4\text{P}\dots$ |
| $C_{\text{cell\_Ah}}$ | Dung lượng định mức của một cell đơn | Ampe-giờ (Ah) | Cell lăng trụ lớn: 100Ah, 200Ah, 280Ah, 314Ah |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Giả định tất cả các cell ghép song song có chất lượng đồng đều, cùng lô sản xuất và cùng độ lão hóa SOH.
- Khi ghép song song, dòng điện tải sẽ tự động san sẻ qua các cell tỷ lệ nghịch với nội trở của từng cell.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Tuyệt đối cấm đấu song song các cell pin có mức điện áp chênh lệch nhau ($> 0{,}05\text{V}$) hoặc khác dung lượng. Khi vừa bấm ốc nối thanh cái, dòng điện phóng cân bằng chéo (cross-balancing current) giữa cell đầy và cell vơi có thể vọt lên hàng trăm Ampe làm nổ cọc pin và bắn tia lửa kim loại.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cấu hình song song định luật Kirchhoff dòng
- **Nguồn 1**: [Battery University - Parallel Configurations (BU-302)](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)
- **Nguồn 2**: [Battery University - Capacity & Ah Ratings](https://batteryuniversity.com/learn/article/what_is_the_c_rate)

---

## [DM-083] Tổng Năng Lượng Danh Định Của Pack Pin (Pack Nominal Energy)

> **Phân loại độ tin cậy**: Chuẩn cấu hình  
> **Nhóm người dùng**: Kỹ thuật viên tính toán kích thước tổng thể khối pin lưu trữ

### 1. Công thức toán học (Mathematical Formula)

$$
E_{\text{Wh}} = N_s \times N_p \times V_{\text{cell}} \times C_{\text{cell}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $N_s$ | Số lượng cell chuỗi nối tiếp | Số nguyên | Quy định mức điện áp pack |
| $N_p$ | Số lượng cell nhánh song song | Số nguyên | Quy định dung lượng dòng tích trữ |
| $V_{\text{cell}}$ | Điện áp danh định cell pin | Volt (V) | Chuẩn $3{,}2\text{V}$ cho LiFePO4 |
| $C_{\text{cell}}$ | Dung lượng danh định cell pin | Ah | Dung lượng lưu trữ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Năng lượng tích trữ gộp danh định (Gross Energy); đổi sang Kilowatt-giờ: $E_{\text{kWh}} = \frac{E_{\text{Wh}}}{1000}$.
- Ví dụ: Khối pin 4S4P dùng cell 3.2V 20Ah có tổng năng lượng là:
$$
E = 4 \times 4 \times 3{,}2 \times 20 = 1024\text{ Wh} \approx 1{,}024\text{ kWh}
$$
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Năng lượng điện tích trữ tập trung cao đòi hỏi hộp chứa pack pin phải có kết cấu cách điện tốt bằng tấm phíp thủy tinh Epoxy FR4. Bất kỳ sơ suất làm rơi cờ-lê kim loại làm ngắn mạch trực tiếp 2 cực pack pin $1\text{ kWh}$ sẽ gây nổ hồ quang làm bốc hơi kim loại và bỏng độ 3.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cấu hình năng lượng tích trữ
- **Nguồn 1**: [Battery University - Energy Calculations (BU-302)](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)
- **Nguồn 2**: [Battery University - C-rate and Energy Density](https://batteryuniversity.com/learn/article/what_is_the_c_rate)

---

## [DM-084] Cường Độ Dòng Xả Từ Hệ Số C-rate (Discharge Current from C-rate)

> **Phân loại độ tin cậy**: Chuẩn định nghĩa  
> **Nhóm người dùng**: Kỹ thuật viên cài đặt giới hạn bảo vệ quá dòng (Overcurrent Protection) trên BMS

### 1. Công thức toán học (Mathematical Formula)

$$
I_{\text{discharge}} = \text{C-rate} \times C_{\text{pack\_Ah}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\text{C-rate}$ | Tỷ lệ xả chuẩn hóa theo dung lượng | $h^{-1}$ (hoặc C) | Ví dụ: $0{,}5\text{C}$, $1\text{C}$, $2\text{C}$, $3\text{C}$ |
| $C_{\text{pack\_Ah}}$ | Tổng dung lượng của khối pin | Ampe-giờ (Ah) | Dung lượng danh định pack |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Định nghĩa chuẩn: Tốc độ xả $1\text{C}$ sẽ rút cạn $100\%$ dung lượng pin danh định trong đúng $1\text{ giờ}$ (ví dụ pack 200Ah xả $1\text{C} = 200\text{ A}$).
- Bắt buộc phải phân biệt rõ trên datasheet của nhà sản xuất cell:
  * **Continuous C-rate** (Dòng xả liên tục an toàn: thường $0{,}5\text{C} - 1\text{C}$).
  * **Peak Pulse C-rate** (Dòng xả xung ngắn hạn $10 - 30\text{ giây}$: thường $2\text{C} - 3\text{C}$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Thường xuyên xả pin vượt quá dòng xả liên tục khuyến nghị của hãng ($> 1\text{C}$ kéo dài) sẽ khiến điện trở nội bên trong cell tăng vọt, gây hiện tượng quá nhiệt cục bộ phá hủy cấu trúc tinh thể của điện cực và làm suy giảm tuổi thọ chu kỳ (Cycle Life) từ 4000 chu kỳ xuống dưới 1000 chu kỳ.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định nghĩa điện hóa học quốc tế
- **Nguồn 1**: [Battery University - What is the C-rate?](https://batteryuniversity.com/learn/article/what_is_the_c_rate)
- **Nguồn 2**: [Battery University - High-rate Discharge Performance](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)

---

## [DM-085] Nội Trở Tương Đương Pack Pin Lý Tưởng (Ideal Pack Internal Resistance)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư thiết kế pack pin hiệu năng cao cho tời cứu hộ / xe đua

### 1. Công thức toán học (Mathematical Formula)

$$
R_{\text{pack}} = R_{\text{cell}} \times \frac{N_s}{N_p}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $R_{\text{cell}}$ | Nội trở thuần AC/DC của một cell pin đơn | m$\Omega$ (hoặc $\Omega$) | Cell LiFePO4 280Ah loại tốt có nội trở cực nhỏ: $R_{\text{cell}} \approx 0{,}15 - 0{,}25\text{ m}\Omega$ |
| $N_s$ | Số chuỗi nối tiếp | Không thứ nguyên | Tỷ lệ thuận với nội trở |
| $N_p$ | Số nhánh song song | Không thứ nguyên | Tỷ lệ nghịch với nội trở |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đây là nội trở hóa học thuần túy của các bản cực bên trong cell pin.
- **Nội trở thực tế toàn khối (Total Loop Resistance)** bắt buộc phải cộng thêm: Điện trở thanh cái đồng nối cell (Busbars), điện trở tiếp xúc mặt siết bu-lông cọc pin, điện trở shunt đo dòng của BMS, dây cáp và cầu chì:
$$
R_{\text{total\_pack}} = R_{\text{pack}} + R_{\text{busbars}} + R_{\text{contacts}} + R_{\text{BMS\_shunt}}
$$
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Bề mặt cọc nhôm của cell pin LiFePO4 rất dễ bị oxy hóa tạo thành lớp màng oxit cách điện mỏng. Nếu không làm sạch bề mặt bằng nhám mịn và siết bu-lông bằng cờ-lê cân lực đúng tiêu chuẩn ($4 - 6\text{ N.m}$ cho ốc M6), điện trở tiếp xúc có thể lớn gấp 5 lần nội trở cell, sinh nhiệt nung chảy ren ốc cọc pin khi kéo tời.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình mạch điện trở tương đương
- **Nguồn 1**: [Battery University - Internal Resistance in Batteries](https://batteryuniversity.com/learn/article/what_is_the_c_rate)
- **Nguồn 2**: [Battery University - Resistance and Conductance Testing](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)

---

## [DM-086] Độ Sụt Áp Pack Pin Khi Mang Tải (Pack Voltage Sag under Load)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên cài đặt ngưỡng ngắt thấp áp (Under-Voltage Cutoff) trên BMS

### 1. Công thức toán học (Mathematical Formula)

$$
\Delta V = I_{\text{load}} \times R_{\text{total\_pack}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $I_{\text{load}}$ | Cường độ dòng điện xả mang tải tức thời | Ampe (A) | Dòng điện kéo qua tải |
| $R_{\text{total\_pack}}$ | Tổng nội trở của khối pin bao gồm tiếp điểm | Ohm ($\Omega$) | Tính từ công thức DM-085 |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Độ sụt áp tức thời (Voltage Sag): Điện áp đo được tại 2 cọc ngoài của pack pin tụt xuống: $V_{\text{terminal}} = V_{\text{OCV}} - \Delta V$.
- Nội trở cell pin tăng mạnh khi trạng thái sạc SOC xuống thấp ($< 15\%$) hoặc khi nhiệt độ ngoài trời xuống thấp ($< 10^\circ\text{C}$), khiến độ sụt áp càng nghiêm trọng hơn.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi pin chỉ còn $25\%$ SOC mà người dùng bật ấm đun nước hoặc kéo tời với dòng $200\text{ A}$, độ sụt áp $\Delta V$ có thể lên tới $1{,}5 - 2{,}0\text{V}$, làm điện áp tức thời tụt thẳng xuống dưới ngưỡng ngắt bảo vệ của BMS ($2{,}5\text{V/cell}$), gây ngắt nguồn điện toàn xe đột ngột dù pin chưa thực sự cạn.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình định luật Ohm một chiều
- **Nguồn 1**: [Battery University - Voltage Sag under Load](https://batteryuniversity.com/learn/article/what_is_the_c_rate)
- **Nguồn 2**: [Battery University - Battery Discharging Limits](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)

---

## [DM-087] Công Suất Sinh Nhiệt Do Nội Trở Trong Khối Pin (Internal Joule Heating)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư thiết kế quạt thông gió và giải nhiệt cho thùng chứa pin

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{heat}} = I_{\text{load}}^2 \times R_{\text{total\_pack}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $I_{\text{load}}$ | Cường độ dòng điện xả hoặc sạc chạy qua khối pin | Ampe (A) | Dòng dòng điện chạy qua |
| $R_{\text{total\_pack}}$ | Tổng nội trở của toàn bộ khối pin | Ohm ($\Omega$) | Nội trở pack |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức tính tốc độ phát nhiệt Joule thuần do tổn hao điện trở.
- Chưa tính thành phần nhiệt phản ứng hóa học (Entropy Heating/Cooling) — với pin LiFePO4 ở dòng xả thông thường, phản ứng hóa học có thể hấp thu nhiệt nhẹ, nhưng ở dòng xả lớn thì nhiệt Joule $I^2R$ áp đảo hoàn toàn.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Hãy lưu ý: Nhiệt lượng tỷ lệ với bình phương cường độ dòng điện ($I^2$). Tăng gấp đôi dòng xả (từ $100\text{A}$ lên $200\text{A}$) làm nhiệt lượng phát sinh tăng gấp 4 lần! Ở dòng $250\text{A}$, một khối pin có nội trở $3\text{ m}\Omega$ sẽ sinh ra: $250^2 \times 0{,}003 = 187{,}5\text{ W}$ nhiệt liên tục trong thùng kín. Bắt buộc phải có quạt hút gió điều khiển theo cảm biến nhiệt BMS.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình định luật phát nhiệt Joule
- **Nguồn 1**: [Battery University - Heat Dissipation in High-Power Packs](https://batteryuniversity.com/learn/article/what_is_the_c_rate)
- **Nguồn 2**: [Battery University - Thermal Management of Lithium Cells](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)

---

## [DM-088] Thời Gian Xả Hết Dung Lượng Sử Dụng (Discharge Run Time)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Chủ xe theo dõi thời gian sử dụng điện còn lại trên màn hình Smart Shunt

### 1. Công thức toán học (Mathematical Formula)

$$
t_{\text{h}} = \frac{C_{\text{available\_Ah}}}{I_{\text{mean}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $C_{\text{available\_Ah}}$ | Dung lượng còn lại trong pack pin tại thời điểm khảo sát | Ampe-giờ (Ah) | Đọc từ bộ đo dòng Shunt Victron/Jikong |
| $I_{\text{mean}}$ | Dòng điện tiêu thụ trung bình của các phụ tải đang bật | Ampe (A) | Cường độ dòng điện xả liên tục |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Khác với ắc quy axit chì chịu ảnh hưởng rất nặng của định luật Peukert (hệ số Peukert $k \approx 1{,}25 - 1{,}35$), pin lithium LiFePO4 có hiệu suất culông cực tốt với hệ số Peukert gần như lý tưởng ($k \approx 1{,}03 - 1{,}05$), nghĩa là dòng xả cao ít làm suy giảm dung lượng thực tế.
- Tuy nhiên, khi dung lượng cạn về dưới $10\%$, đường cong điện áp của LiFePO4 rơi tự do theo phương thẳng đứng.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Không bao giờ dựa vào điện áp đo bằng vôn kế để đoán dung lượng còn lại của pin LiFePO4. Điện áp của LiFePO4 giữ gần như nằm ngang ở mức $3{,}2\text{V}$ trên suốt dải từ $20\%$ đến $80\%$ SOC. Bắt buộc phải dùng đồng hồ đo điện lượng Coulomb Counter (Smart Shunt) tích phân dòng theo thời gian.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng tích phân dung lượng
- **Nguồn 1**: [Battery University - Discharge Calculation & Peukert's Law](https://batteryuniversity.com/learn/article/what_is_the_c_rate)
- **Nguồn 2**: [Battery University - Battery State of Charge Estimation](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)

---

## [DM-089] Năng Lượng Thực Tế Khai Thác Khả Dụng (Usable Battery Energy)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Kỹ sư thiết kế tính toán tự chủ năng lượng cho trạm viễn thông / xe dã ngoại

### 1. Công thức toán học (Mathematical Formula)

$$
E_{\text{usable}} = E_{\text{nom}} \times \text{DoD} \times \eta_{\text{system}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $E_{\text{nom}}$ | Tổng năng lượng danh định lý thuyết của khối pin | Wh / kWh | Tính từ công thức DM-083 |
| $\text{DoD}$ | Độ sâu xả cạn an toàn cho phép | Thập phân ($0..1$) | LiFePO4: khuyến nghị đặt $\text{DoD} = 0{,}80 - 0{,}90$ ($80 - 90\%$) |
| $\eta_{\text{system}}$ | Hiệu suất chuyển đổi và tổn hao đường dây | Thập phân ($0..1$) | Thường lấy $0{,}88 - 0{,}92$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Năng lượng thực tế có thể rút ra phục vụ thiết bị điện sinh hoạt mà không gây hại cho cell pin.
- Giữ lại vùng đệm $10\%$ ở đáy (không xả dưới $2{,}65\text{V}$) và $5\%$ ở đỉnh (không ngâm áp sạc trên $3{,}55\text{V}$) giúp tăng tuổi thọ chu kỳ của cell LiFePO4 từ 3000 chu kỳ lên hơn 6000 chu kỳ sạc xả.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Xả kiệt pin tới $100\%$ DoD cho đến khi BMS ngắt cạn sẽ khiến pin rơi vào trạng thái ngủ sâu (Sleep Mode). Nếu để xe đỗ không sạc trong 1-2 tháng, dòng rò vi mạch của chính mạch BMS ($15 - 50\text{ mA}$) sẽ tiếp tục rút cạn các cell xuống dưới $1{,}5\text{V}$ làm hỏng pack pin vĩnh viễn không thể cứu phục hồi.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng thiết kế chu kỳ sâu
- **Nguồn 1**: [Battery University - Depth of Discharge and Life Span](https://batteryuniversity.com/learn/article/what_is_the_c_rate)
- **Nguồn 2**: [Battery University - How to Prolong Lithium-based Batteries](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)

---

## [DM-090] Giới Hạn Cường Độ Dòng An Toàn Toàn Khối (Pack Current Bottleneck Limit)

> **Phân loại độ tin cậy**: Quy tắc thiết kế  
> **Nhóm người dùng**: Kỹ sư trưởng phê duyệt an toàn hệ thống pack pin công suất cao

### 1. Công thức toán học (Mathematical Formula)

$$
I_{\text{limit}} = \min(I_{\text{cells}}, I_{\text{BMS}}, I_{\text{busbar}}, I_{\text{wire}}, I_{\text{fuse}})
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $I_{\text{cells}}$ | Giới hạn dòng xả liên tục của dàn cell pin | Ampe (A) | Thông số C-rate danh định của nhà sản xuất cell |
| $I_{\text{BMS}}$ | Định mức mang dòng liên tục của mạch bảo vệ BMS | Ampe (A) | Định mức tản nhiệt của dàn MOSFET đóng ngắt hoặc Contactor |
| $I_{\text{busbar}}$ | Giới hạn mang dòng an toàn của thanh cái đồng | Ampe (A) | Căn cứ trên mật độ dòng $J \le 2 - 3\text{ A/mm}^2$ |
| $I_{\text{wire}}$ | Khả năng mang dòng của dây cáp xuất cọc ngoài | Ampe (A) | Căn cứ tiết diện cáp đồng và cấp chịu nhiệt vỏ bọc |
| $I_{\text{fuse}}$ | Định mức cắt dòng liên tục của cầu chì bảo vệ | Ampe (A) | Chuẩn cầu chì Class T hoặc ANL chuyên dụng |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Quy tắc mắt xích yếu nhất (Weakest Link Principle) trong kỹ thuật cơ điện tử.
- Dòng điện tối đa an toàn của toàn bộ pack pin bị khống chế bởi linh kiện có thông số chịu tải thấp nhất trong chuỗi dẫn điện.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Sai lầm phổ biến nhất của thợ đóng pin nghiệp dư: Mua cell pin xả khủng 300A nhưng lại chọn mạch BMS giá rẻ chỉ chịu được 100A, hoặc dùng thanh busbar đồng mỏng dính chỉ $1\text{ mm}$. Khi người dùng bật Inverter nấu bếp từ với dòng 180A, thanh busbar và MOSFET BMS sẽ bị bốc khói cháy chảy nhựa trước khi cầu chì kịp đứt.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Quy tắc thiết kế phối hợp bảo vệ chuỗi
- **Nguồn 1**: [Battery University - Safety and Protection Circuits (BU-304)](https://batteryuniversity.com/learn/article/what_is_the_c_rate)
- **Nguồn 2**: [Battery University - High Current Battery Safety](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)

---

## [DM-091] Tiết Diện Thanh Cái Đồng Busbar Sơ Bộ (Busbar Cross-Section Area)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Thợ gia công CNC thanh cái đồng nối các cực cell pin

### 1. Công thức toán học (Mathematical Formula)

$$
A_{\text{busbar\_mm}^2} = \frac{I_{\text{design}}}{J_{\text{design}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $I_{\text{design}}$ | Cường độ dòng điện thiết kế tối đa liên tục | Ampe (A) | Dòng điện lớn nhất dự kiến chạy qua thanh cái |
| $J_{\text{design}}$ | Mật độ dòng điện kinh tế an toàn cho đồng đỏ | $\text{A/mm}^2$ | Khuyến nghị tiêu chuẩn hộp pin kín: $J = 2{,}0 - 3{,}0\text{ A/mm}^2$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tiết diện thanh cái đồng chữ nhật: $A = w_{\text{width}} \times t_{\text{thick}}$ (ví dụ thanh đồng rộng $20\text{ mm}$ dày $3\text{ mm}$ có tiết diện $60\text{ mm}^2$).
- Với dòng tải thiết kế $150\text{ A}$ ở mật độ $J = 2{,}5\text{ A/mm}^2$, tiết diện đồng tối thiểu là: $A = \frac{150}{2{,}5} = 60\text{ mm}^2$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Thanh busbar bắt buộc phải làm bằng đồng đỏ nguyên chất mạ Niken hoặc mạ thiếc (Tinned Copper) để chống ăn mòn điện hóa do tiếp xúc giữa nhôm (cực cell) và đồng. Cấm dùng thanh nhôm mỏng hoặc thanh sắt xi mạ vì điện trở suất cao sẽ biến thanh cái thành dây may-so nung nóng cọc pin.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng mật độ dòng điện DIN 43671
- **Nguồn 1**: [Battery University - Interconnects and Busbar Sizing](https://batteryuniversity.com/learn/article/what_is_the_c_rate)
- **Nguồn 2**: [EngineeringToolbox - Copper Busbar Current Ratings](https://www.engineeringtoolbox.com/copper-busbar-current-d_1530.html)

---

## [DM-092] Thời Gian Sạc Giai Đoạn Ổn Dòng CC (Battery CC Stage Charging Time)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Kỹ thuật viên cài đặt dòng sạc thông minh cho bộ nạp MPPT / AC Charger

### 1. Công thức toán học (Mathematical Formula)

$$
t_{\text{CC\_h}} = \frac{\Delta\text{Ah}}{I_{\text{charge}} \times \eta_{\text{charge}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\Delta\text{Ah}$ | Lượng điện tích cần nạp bổ sung vào pack | Ampe-giờ (Ah) | Chênh lệch giữa dung lượng sạc đầy và dung lượng hiện tại |
| $I_{\text{charge}}$ | Cường độ dòng sạc nạp ổn định | Ampe (A) | Định mức dòng sạc của bộ nguồn sạc |
| $\eta_{\text{charge}}$ | Hiệu suất nạp tích lũy dung lượng culông | Thập phân ($0..1$) | Pin LiFePO4 lấy chuẩn $0{,}98$ ($98\%$) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức áp dụng cho giai đoạn sạc dòng không đổi (Constant Current - Bulk stage) từ $0\%$ đến khoảng $90\%$ dung lượng của pin LiFePO4.
- Không bao gồm thời gian nạp áp không đổi (Constant Voltage - Absorption stage) và thời gian cân bằng chủ động/thụ động giữa các cell (Active Balancing Time) ở pha cuối.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi sạc ở pha cuối gần đầy ($> 3{,}55\text{V/cell}$), điện áp các cell có thể bị lệch rất nhanh do dung lượng giữa các cell không hoàn toàn khớp tuyệt đối. Nếu dòng sạc quá lớn ($> 50\text{A}$), mạch cân bằng nhỏ ($50 - 100\text{ mA}$) không kịp xả bớt, khiến một cell bị vọt áp (Overvoltage Spike) kích hoạt BMS ngắt sạc sớm trước khi các cell khác kịp đầy.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng nạp tích lũy điện lượng
- **Nguồn 1**: [Battery University - Charging Lithium Iron Phosphate](https://batteryuniversity.com/learn/article/what_is_the_c_rate)
- **Nguồn 2**: [Battery University - Balancing Battery Packs](https://www.batteryuniversity.com/article/bu-302-series-and-parallel-battery-configurations/)
