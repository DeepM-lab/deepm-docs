# Chuyên đề 12: Garage & Maintenance (10 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-12` | **Dải công cụ**: `DM-126` đến `DM-135`  
> **Đối tượng ứng dụng**: Thợ máy sửa chữa tổng quát (General Mechanic), quản đốc xưởng dịch vụ ô tô (Service Manager), kỹ thuật viên kiểm tra bảo dưỡng định kỳ và quản lý đội xe vận tải.  
> **Mục tiêu kỹ thuật**: Quy đổi mô-men lực siết cần siết lực, định luật Ohm chẩn đoán điện cơ bản, tính toán tải trọng nâng và áp suất kích cá sấu thủy lực, đo đạc suất tiêu hao nhiên liệu thực tế và quản lý chi phí vận hành bảo dưỡng đội xe theo từng km lăn bánh.

---

## [DM-126] Quy Đổi Đơn Vị Mô-Men Lực Siết Bu-Lông (Torque Conversion lbf.ft to N.m)

> **Phân loại độ tin cậy**: Chuẩn chuyển đổi  
> **Nhóm người dùng**: Thợ máy sử dụng cờ-lê cân lực (Torque Wrench) siết ốc nắp máy, ốc bánh xe

### 1. Công thức toán học (Mathematical Formula)

$$
T_{\text{N.m}} = T_{\text{lbf.ft}} \times 1{,}3558179483
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $T_{\text{lbf.ft}}$ | Giá trị mô-men xoắn ghi trong sổ tay bảo dưỡng hệ Anh-Mỹ | Pound-force foot (lbf.ft / ft-lbs) | Thường thấy trong tài liệu xe Ford, GM, Jeep |
| $1{,}3558179483$ | Hằng số quy đổi chuẩn xác hệ đo lường quốc tế | Không thứ nguyên | Tỷ số quy đổi giữa đơn vị lbf.ft và N.m |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Phép đổi đơn vị giải tích toán học thuần túy.
- Quy đổi ngược lại: $T_{\text{lbf.ft}} = \frac{T_{\text{N.m}}}{1{,}3558179483} \approx T_{\text{N.m}} \times 0{,}737562$.
- Công thức áp dụng cho lực siết ren khô (Dry torque). Nếu bôi mỡ đồng hoặc mỡ chống bó kẹt (Anti-seize) vào ren, hệ số ma sát ren giảm từ $20 - 30\%$, thợ phải giảm lực siết đặt trên cần lực tương ứng để tránh kéo đứt bu-lông.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Bu-lông nắp quy lát máy hiện đại hầu hết là loại bu-lông giãn dẻo (Torque-to-Yield - TTY). Quy trình siết của hãng yêu cầu siết mô-men cơ sở (ví dụ $45\text{ N.m}$), sau đó phải siết thêm góc quay bằng đồng hồ đo góc siết (Torque Angle Gauge - ví dụ $+90^\circ + 90^\circ$). Tuyệt đối không dùng cần siết lực để siết cố theo cảm giác vì bu-lông TTY đã dãn vĩnh viễn và không được tái sử dụng lần 2.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn chuyển đổi đơn vị đo lường quốc tế
- **Nguồn 1**: [EngineeringToolbox - Torque Units Conversion](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [NIST - Guide for the Use of the International System of Units (SI)](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-127] Định Luật Ohm Đo Kiểm Mạch Điện Cơ Bản (Ohm's Law)

> **Phân loại độ tin cậy**: Chuẩn điện  
> **Nhóm người dùng**: Thợ điện chẩn đoán dò tìm ngắn mạch, đo cảm biến và bóng đèn xe

### 1. Công thức toán học (Mathematical Formula)

$$
V = I \times R \iff I = \frac{V}{R} \iff R = \frac{V}{I}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V$ | Hiệu điện thế giữa hai đầu đoạn mạch đo | Volt (V) | Đo bằng thang đo Vôn kế DC |
| $I$ | Cường độ dòng điện chạy qua tải | Ampe (A) | Đo bằng Ampe kế mắc nối tiếp hoặc ampe kìm |
| $R$ | Điện trở thuần của linh kiện | Ohm ($\Omega$) | Đo nguội bằng thang đo Ohm kế |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Định luật cơ bản cho mạch điện một chiều (DC) ở trạng thái ổn định với tải thuần trở.
- Với các cuộn hút rơ-le, kim phun nhiên liệu hoặc cuộn mô-tơ bước, dòng điện tức thời khi đóng ngắt phụ thuộc vào cảm kháng: $v(t) = L \frac{di}{dt} + R \cdot i$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cấm tuyệt đối bật đồng hồ ở thang đo điện trở Ohm ($\Omega$) để đo trực tiếp vào mạch đang có điện áp nguồn nuôi. Dòng điện từ bình xe chạy qua đồng hồ sẽ làm nổ cầu chì bảo vệ bên trong đồng hồ vạn năng DMM và có thể gây cháy vi mạch cảm biến hộp ECU.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định luật vật lý cơ bản
- **Nguồn 1**: [EngineeringToolbox - Ohm's Law and Power](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)
- **Nguồn 2**: [EngineeringToolbox - Electrical Resistance](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-128] Điện Trở Tương Đương Của Mạch Mắc Song Song (Equivalent Parallel Resistance)

> **Phân loại độ tin cậy**: Chuẩn điện  
> **Nhóm người dùng**: Kỹ thuật viên chẩn đoán mạch phân áp cảm biến, mạng điện trở kết thúc CAN Bus

### 1. Công thức toán học (Mathematical Formula)

$$
R_{\text{eq}} = \frac{1}{\sum \frac{1}{R_i}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $R_i$ | Điện trở thuần của từng nhánh phụ tải song song | Ohm ($\Omega$) | Điều kiện tiên quyết: $R_i > 0$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Điện trở tương đương của mạch song song luôn luôn nhỏ hơn điện trở của nhánh nhỏ nhất: $R_{\text{eq}} < \min(R_i)$.
- Ứng dụng thực chiến điển hình trong chẩn đoán mạng CAN Bus ô tô: Đường truyền CAN High và CAN Low có hai điện trở kết thúc $120\Omega$ mắc song song ở hai đầu mạng (trong ECU động cơ và đồng hồ táp-lô). Đo điện trở giữa 2 dây CAN khi tắt chìa khóa phải ra đúng:
$$
R_{\text{CAN}} = \frac{120 \times 120}{120 + 120} = 60\Omega
$$
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Nếu đo mạng CAN Bus ra $120\Omega$, chứng tỏ một trong hai hộp điện trở đầu mạng đã bị đứt hở mạch; nếu đo ra $0\Omega$, đường truyền CAN đang bị chạm chập trực tiếp khiến toàn bộ xe bị tê liệt mạng giao tiếp không thể nổ máy.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định luật mạch điện song song
- **Nguồn 1**: [EngineeringToolbox - Resistors in Parallel](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)
- **Nguồn 2**: [EngineeringToolbox - Circuit Analysis](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-129] Lực Nâng Danh Định Cần Thiết Của Kích Cầu Xe (Required Vehicle Jack Lifting Force)

> **Phân loại độ tin cậy**: Chuẩn cơ học  
> **Nhóm người dùng**: Thợ máy chọn kích cá sấu thủy lực, kích nâng tay xưởng dịch vụ

### 1. Công thức toán học (Mathematical Formula)

$$
F_{\text{lift}} = m_{\text{kg}} \times 9{,}80665
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $m_{\text{kg}}$ | Khối lượng tải trọng đè lên điểm nâng của xe | kg | Khối lượng góc hoặc khối lượng cầu xe |
| $9{,}80665$ | Gia tốc trọng trường chuẩn | m/s² | Hằng số trọng lực |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Khi kích một bên bánh hoặc một cầu trước/sau, kích chỉ chịu khoảng $30 - 60\%$ tổng trọng lượng toàn xe tùy thuộc vào vị trí điểm đặt kích.
- Hệ số an toàn khuyến nghị cho thiết bị nâng hạ thủy lực tối thiểu $SF \ge 1{,}5 - 2{,}0$ (ví dụ nâng xe bán tải nặng 2,2 tấn nên dùng kích cá sấu tải trọng định mức tối thiểu 3 tấn).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- CẤM TUYỆT ĐỐI chui người vào làm việc dưới gầm xe khi xe chỉ đang được chống đỡ bằng duy nhất kích cá sấu hoặc kích con đội thủy lực! Phớt dầu trong kích có thể bị xì bất ngờ làm sập xe đè bẹp người. Bắt buộc phải kê mễ kê sắt (Jack Stands) chịu tải chuyên dụng và chèn bánh xe trước khi chui gầm.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn trọng lực cơ học cổ điển
- **Nguồn 1**: [EngineeringToolbox - Force and Weight](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [OSHA - Automotive Lifting Device Safety Standards](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)

---

## [DM-130] Áp Suất Dầu Trong Xi Lanh Piston Kích Thủy Lực (Jack Cylinder Hydraulic Pressure)

> **Phân loại độ tin cậy**: Chuẩn thủy lực  
> **Nhóm người dùng**: Thợ bảo trì kích thủy lực, kỹ thuật viên kiểm tra van an toàn xả áp

### 1. Công thức toán học (Mathematical Formula)

$$
p_{\text{Pa}} = \frac{F_{\text{lift}}}{A_{\text{piston\_m}^2}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $F_{\text{lift}}$ | Lực nâng đè lên đầu ty kích | Newton (N) | Tính từ công thức DM-129 |
| $A_{\text{piston\_m}^2}$ | Diện tích tiết diện mặt cắt ngang piston của ben kích | mét vuông (m²) | $A = \frac{\pi \times D^2}{4}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Áp suất tĩnh của dầu thủy lực trong khoang kín buồng ben.
- Đổi đơn vị: $p_{\text{bar}} = \frac{p_{\text{Pa}}}{10^5}$. Kích con đội thủy lực nhỏ thường có áp suất dầu rất cao ($300 - 600\text{ bar}$) do đường kính piston ben nhỏ.
- Chưa tính đến ma sát của phớt chữ U (U-cup seal) làm giảm lực nâng hữu ích khoảng $3 - 5\%$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi dầu thủy lực bị tụt hoặc có bọt khí trong buồng dầu, kích sẽ bị hiện tượng nhún đàn hồi (spongy) và không thể nâng đạt hết chiều cao hành trình. Bắt buộc phải xả e bọt khí (Bleeding jack) và chỉ châm dầu thủy lực chuyên dụng ISO VG 32/46; tuyệt đối không châm dầu phanh DOT 3/4 vào kích vì sẽ phá hủy toàn bộ phốt cao su chỉ sau 1 tuần.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn thủy tĩnh Pascal
- **Nguồn 1**: [EngineeringToolbox - Hydraulic Jack Pressure Calculation](https://www.engineeringtoolbox.com/hydraulic-force-calculator-d_1369.html)
- **Nguồn 2**: [EngineeringToolbox - Pascal's Principle](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)

---

## [DM-131] Công Suất Truyền Động Cơ Học Trục Quay (Rotational Mechanical Shaft Power)

> **Phân loại độ tin cậy**: Chuẩn cơ học  
> **Nhóm người dùng**: Kỹ thuật viên kiểm tra công suất thiết bị xưởng (máy ra vào lốp, máy nén khí trục vít)

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{kW}} = \frac{T_{\text{N.m}} \times n_{\text{rpm}}}{9549{,}2966}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $T_{\text{N.m}}$ | Mô-men xoắn trên trục truyền động | N.m | Đo bằng lực kế mô-men |
| $n_{\text{rpm}}$ | Tốc độ quay của trục | rpm | Tốc độ vòng tua trục máy |
| $9549{,}2966$ | Hằng số chuẩn hóa SI | Không thứ nguyên | $\frac{60 \times 1000}{2\pi}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức chuyển động quay tổng quát cho bất kỳ trục máy cơ khí nào (mô-tơ điện, máy phát điện, trục các-đăng xe, máy nén khí piston).
- Mô-men xoắn và tốc độ quay phải được đo đạc đồng thời tại cùng một vị trí trục.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Trục các-đăng quay ở tốc độ cao ($> 3000\text{ rpm}$) chứa động năng cơ học cực lớn. Tất cả các thiết bị xưởng có trục quay hở bắt buộc phải có nắp chụp bảo vệ che chắn; thợ máy không được mặc quần áo rộng thùng thình hoặc đeo găng tay vải lỏng lẻo khi vận hành máy tiện, máy mài vì nguy cơ bị cuốn dập nát tay.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cơ học chuyển động quay
- **Nguồn 1**: [EngineeringToolbox - Power, Torque & Speed](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Mechanical Power Definition](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-132] Định Mức Tiêu Thụ Nhiên Liệu Thực Tế Trên 100km (Actual Fuel Consumption L/100km)

> **Phân loại độ tin cậy**: Chuẩn định nghĩa  
> **Nhóm người dùng**: Thợ máy đo kiểm tra xe sau khi cân kim phun, chủ xe theo dõi mức ăn xăng/dầu

### 1. Công thức toán học (Mathematical Formula)

$$
\text{FC}_{\text{L/100km}} = \frac{100 \times V_{\text{fuel\_used}}}{d_{\text{km}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{\text{fuel\_used}}$ | Thể tích nhiên liệu thực tế đã tiêu thụ | Lít (L) | Đo bằng phương pháp đổ đầy bình xăng (Full-to-Full Tank method) |
| $d_{\text{km}}$ | Tổng quãng đường xe đã chạy giữa hai lần đổ xăng | km | Ghi lại từ đồng hồ ODO chặng Trip A |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Phương pháp đổ đầy tràn cổ bình (Full-to-Full) là phương pháp chuẩn xác nhất để loại trừ sai số báo ảo của phao xăng táp-lô.
- Nếu xe có độ lên lốp kích thước lớn hơn lốp zin, quãng đường ODO ghi nhận sẽ bị thiếu so với thực tế; thợ bắt buộc phải hiệu chỉnh lại $d_{\text{km}}$ theo sai số lốp (DM-061) trước khi tính toán.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Xe đột ngột ăn xăng/dầu tăng vọt trên $25\%$ so với bình thường là triệu chứng cảnh báo các hư hỏng tiềm ẩn nghiêm trọng: Kim phun bị đái rỉ nhiên liệu làm loãng dầu nhớt máy, kẹt bó pít-tông heo phanh hoặc cảm biến lưu lượng gió MAF/cảm biến oxy bị bám muội than báo sai lệch hòa khí.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định nghĩa suất tiêu hao nhiên liệu quốc tế
- **Nguồn 1**: [EngineeringToolbox - Fuel Consumption Standards](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)
- **Nguồn 2**: [EPA - Fuel Economy Measurement Guidelines](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-133] Cự Ly Quãng Đường Xe Chạy Còn Lại (Remaining Driving Range)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Quản lý điều vận đội xe, lái xe đường dài dự tính trạm đổ nhiên liệu kế tiếp

### 1. Công thức toán học (Mathematical Formula)

$$
\text{Range}_{\text{km}} = \frac{V_{\text{tank\_usable\_L}} \times 100}{\text{FC}_{\text{L/100km}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{\text{tank\_usable\_L}}$ | Lượng nhiên liệu còn lại có thể hút được trong bình | Lít (L) | Dung tích bình xăng trừ đi lượng cặn đáy không hút được |
| $\text{FC}_{\text{L/100km}}$ | Mức tiêu hao nhiên liệu trung bình của chặng sắp đi | L/100km | Tính từ công thức DM-132 |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Dự báo cự ly với giả định điều kiện mặt đường và phong cách lái xe không đổi.
- Khi xe gặp kẹt xe đô thị giờ cao điểm hoặc leo dốc đèo liên tục, mức ăn xăng có thể tăng gấp đôi, khiến quãng đường chạy thực tế sụt giảm nhanh hơn nhiều so với dự tính.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Không nên chạy xe để bình nhiên liệu cạn kiệt đến giọt cuối cùng. Mô-tơ bơm xăng ngâm chìm trong bình nhiên liệu dựa hoàn toàn vào dòng xăng bao quanh để tự làm mát. Để cạn bình thường xuyên sẽ khiến bơm xăng bị quá nhiệt cháy chổi than, đồng thời hút toàn bộ cặn bẩn lắng dưới đáy bình làm nghẹt lọc xăng và tắc kim phun.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng cự ly nhiên liệu
- **Nguồn 1**: [EngineeringToolbox - Vehicle Fuel Range Estimation](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)
- **Nguồn 2**: [SAE J1312 - In-Service Fuel Economy Testing](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-134] Chi Phí Nhiên Liệu Trên Mỗi Km Lăn Bánh (Fuel Cost per Kilometer)

> **Phân loại độ tin cậy**: Chuẩn kế toán  
> **Nhóm người dùng**: Chủ xe dịch vụ, quản lý đội xe tính toán chi phí vận hành thuần

### 1. Công thức toán học (Mathematical Formula)

$$
\text{Cost}_{\text{fuel/km}} = \frac{\text{FC}_{\text{L/100km}}}{100} \times \text{Price}_{\text{per\_L}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\text{FC}_{\text{L/100km}}$ | Định mức tiêu thụ nhiên liệu của dòng xe | L/100km | Mức tiêu thụ thực tế |
| $\text{Price}_{\text{per\_L}}$ | Đơn giá thị trường của 1 lít xăng hoặc dầu Diesel | VNĐ/L | Giá bán lẻ xăng dầu niêm yết tại cây xăng |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Ví dụ kiểm thử thực tế từ Sheet `KIEM THU`: Xe có định mức tiêu thụ $8{,}0\text{ L/100km}$ với giá xăng minh họa $25.000\text{ đ/L}$, chi phí nhiên liệu thuần trên mỗi km là:
$$
\text{Cost}_{\text{fuel/km}} = \frac{8{,}0}{100} \times 25.000 = 2.000\text{ đ/km}
$$
- Đây là chi phí biến đổi trực tiếp; chưa bao gồm chi phí nhớt máy, hao mòn lốp xe, bảo dưỡng định kỳ và khấu hao tài sản.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Đổ các loại xăng/dầu trôi nổi giá rẻ không rõ nguồn gốc để tiết kiệm vài trăm đồng/km tiềm ẩn rủi ro phá hủy hệ thống phun nhiên liệu cực lớn: Xăng pha cồn bẩn ăn mòn đường ống kim loại; dầu Diesel lẫn nước phá hỏng bơm cao áp Common Rail với chi phí sửa chữa lên tới hàng chục triệu đồng.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn kế toán chi phí trực tiếp
- **Nguồn 1**: [EngineeringToolbox - Operational Cost Accounting](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)
- **Nguồn 2**: [Federal Highway Administration - Vehicle Operating Costs](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-135] Chi Phí Bảo Dưỡng Phụ Tùng Trên Mỗi Km (Maintenance Cost per Kilometer)

> **Phân loại độ tin cậy**: Chuẩn kế toán  
> **Nhóm người dùng**: Giám đốc đội xe (Fleet Manager), chủ garage lập hợp đồng bảo dưỡng trọn gói

### 1. Công thức toán học (Mathematical Formula)

$$
\text{Cost}_{\text{maint/km}} = \frac{\sum\text{Service\_Cost}}{\Delta d_{\text{interval\_km}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\sum\text{Service\_Cost}$ | Tổng chi phí phụ tùng và công thợ cho một kỳ hạn bảo dưỡng | VNĐ | Bao gồm thay dầu động cơ, lọc nhớt, lọc gió, dầu hộp số, dầu cầu, má phanh, gạt mưa |
| $\Delta d_{\text{interval\_km}}$ | Chu kỳ quãng đường giữa hai lần bảo dưỡng định kỳ | km | Thường là $5.000\text{ km}$, $10.000\text{ km}$, $20.000\text{ km}$ hoặc $40.000\text{ km}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Phép tính phân bổ chi phí bảo trì dự phòng định kỳ (Preventive Maintenance - PM) trên từng km lăn bánh để tính toán giá thành vận tải và tổng chi phí sở hữu (Total Cost of Ownership - TCO).
- Không bao gồm các chi phí sửa chữa đại tu đột xuất do tai nạn giao thông, ngập nước thủy kích hoặc lái xe ẩu làm cháy côn.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cắt xén chi phí bảo dưỡng định kỳ (như kéo dài chu kỳ thay nhớt từ $5.000\text{ km}$ lên $15.000\text{ km}$ trên xe dầu hoặc không thay dầu hộp số tự động) để làm đẹp sổ sách chi phí trước mắt sẽ dẫn đến việc nhớt bị đóng bùn than (Sludge), gây nghẹt lưới lọc nhớt và phá hỏng toàn bộ động cơ với chi phí đại tu cao gấp 20 lần số tiền tiết kiệm được.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn kế toán quản trị TCO
- **Nguồn 1**: [EngineeringToolbox - Lifecycle Costing Guidelines](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)
- **Nguồn 2**: [SAE J759 - Fleet Maintenance Cost Modeling](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
