# Chuyên đề 07: Automotive Electrical (12 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-07` | **Dải công cụ**: `DM-069` đến `DM-080`  
> **Đối tượng ứng dụng**: Thợ điện ô tô chuyên nghiệp, kỹ thuật viên nâng cấp máy phát điện dòng lớn 210A, thợ thi công gói nâng cấp dây nguồn Big-3, kỹ sư phân phối tải điện phụ kiện off-road.  
> **Mục tiêu kỹ thuật**: Tính toán công suất điện một chiều DC và công suất cơ trục máy phát, tỷ số puly, tua rotor, tần số điện stator, nhiệt lượng tổn hao cuộn dây và cầu diode, sụt áp tuyến cáp B+ và tổng tải điện xe hơi.

---

## [DM-069] Công Suất Điện Một Chiều Đầu Ra Máy Phát (Alternator DC Power Output)

> **Phân loại độ tin cậy**: Chuẩn điện  
> **Nhóm người dùng**: Thợ điện ô tô kiểm tra máy phát trên xe hoặc trên bàn test bench

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{out\_DC}} = V_{\text{out}} \times I_{\text{out}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{\text{out}}$ | Điện áp đo được tại cọc phát B+ của máy phát | Volt (V) | Thường từ $13{,}8 - 14{,}6\text{V}$ khi IC sạc điều tiết ổn áp |
| $I_{\text{out}}$ | Cường độ dòng điện phát ra cung cấp cho xe | Ampe (A) | Đo bằng ampe kìm DC Clamp Meter |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công suất phát điện DC tức thời tại điểm vận hành thực tế.
- Cần lưu ý đường đặc tính dòng điện theo vòng tua máy phát (Output Curve): Dòng định mức cực đại (ví dụ $210\text{A}$) chỉ đạt được ở tua máy phát $> 3500\text{ rpm}$ (tương đương tua động cơ $> 1800 - 2000\text{ rpm}$). Ở tua cầm chừng không tải (idle), máy phát chỉ phát được khoảng $40 - 60\%$ dòng định mức.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cấm tuyệt đối tháo cọc bình ắc quy khi động cơ đang nổ máy để "thử xem máy phát còn sống hay không". Tháo ắc quy đột ngột gây ra hiện tượng xung điện áp cao ngắt tải (Load Dump Surge) lên tới $80 - 120\text{V}$, làm cháy ngay lập tức hộp đen ECU, màn hình và các cảm biến trên xe.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn điện định luật Joule-Lenz DC
- **Nguồn 1**: [EngineeringToolbox - DC Electrical Power](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [EngineeringToolbox - Voltage Drop Guidelines](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)

---

## [DM-070] Công Suất Cơ Học Trên Trục Máy Phát (Mechanical Shaft Power)

> **Phân loại độ tin cậy**: Chuẩn cân bằng năng lượng  
> **Nhóm người dùng**: Kỹ sư đánh giá mức tiêu hao công suất động cơ khi kéo máy phát lớn

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{mech\_in}} = \frac{P_{\text{out\_DC}}}{\eta_{\text{alt}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{out\_DC}}$ | Công suất điện DC sinh ra | Watt (W) | Tính từ công thức DM-069 |
| $\eta_{\text{alt}}$ | Hiệu suất chuyển đổi cơ - điện của máy phát xoay chiều | Thập phân ($0..1$) | Máy phát ô tô thông thường: $0{,}50 - 0{,}60$; Máy phát hiệu năng cao cuộn dây Hairpin: $0{,}65 - 0{,}72$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công suất cơ học yêu cầu từ trục cốt máy động cơ để quay máy phát điện.
- Quy đổi sang Mã lực: $P_{\text{mech\_HP}} = \frac{P_{\text{mech\_in}}}{745{,}7}$.
- Ví dụ: Máy phát 210A ở điện áp $14{,}4\text{V}$ sinh ra $3024\text{ W}$ điện. Với hiệu suất $\eta = 0{,}60$, công suất cơ đòi hỏi là: $\frac{3024}{0{,}60} = 5040\text{ W} \approx 6{,}76\text{ HP}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Kéo phụ tải gần 7 mã lực qua một sợi dây curoa phụ (Serpentine Belt) đòi hỏi độ căng dây curoa và góc ôm puly phải đạt chuẩn. Dây curoa chùng sẽ bị trượt cháy khét lẹt và làm nóng hỏng bạc đạn máy phát.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cân bằng năng lượng cơ - điện
- **Nguồn 1**: [EngineeringToolbox - Mechanical Power Requirements](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [EngineeringToolbox - Alternator Efficiency](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)

---

## [DM-071] Mô-Men Xoắn Cản Trên Trục Máy Phát (Alternator Shaft Resistance Torque)

> **Phân loại độ tin cậy**: Chuẩn cơ học  
> **Nhóm người dùng**: Kỹ sư thiết kế pát CNC chân máy phát và tính toán lực căng dây curoa

### 1. Công thức toán học (Mathematical Formula)

$$
T_{\text{alt}} = \frac{60 \times P_{\text{mech}}}{2\pi \times n_{\text{alt\_rpm}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{mech}}$ | Công suất cơ trục máy phát | Watt (W) | Tính từ công thức DM-070 |
| $n_{\text{alt\_rpm}}$ | Tốc độ vòng tua quay của rotor máy phát | rpm | Tua quay thực tế của rotor |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Mô-men xoắn cản ổn định ở chế độ tải tĩnh.
- Khi phụ tải điện lớn đóng ngắt đột ngột (như tời cứu hộ đóng rơ-le hoặc quạt tản nhiệt bật nấc 2), mô-men cản tăng vọt tức thời sinh ra tải giật xung (transient torque shock).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Ở tua máy thấp (cầm chừng $800\text{ rpm}$, tua máy phát khoảng $2000\text{ rpm}$), mô-men cản của máy phát 210A có thể lên tới $24 - 28\text{ N.m}$. Bắt buộc phải sử dụng puly một chiều OAP (Overrunning Alternator Pulley / Decoupler) để triệt tiêu hiện tượng văng giật dây curoa làm gãy pát tăng tổng tự động.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cơ học mô-men quay
- **Nguồn 1**: [EngineeringToolbox - Torque and Rotational Power](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Shaft Torque Relations](https://www.engineeringtoolbox.com/electrical-motors-hp-torque-rpm-d_1503.html)

---

## [DM-072] Tỷ Số Truyền Puly Dây Curoa (Pulley Drive Ratio)

> **Phân loại độ tin cậy**: Chuẩn động học  
> **Nhóm người dùng**: Thợ tiện puly CNC khi nâng cấp máy phát điện khác dòng xe

### 1. Công thức toán học (Mathematical Formula)

$$
i_{\text{pulley}} = \frac{D_{\text{crank\_eff}}}{D_{\text{alt\_eff}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $D_{\text{crank\_eff}}$ | Đường kính hiệu dụng rãnh puly cốt máy | mm | Đo theo đường kính vòng bước rãnh curoa (Pitch Diameter) |
| $D_{\text{alt\_eff}}$ | Đường kính hiệu dụng rãnh puly máy phát | mm | Đo theo đường kính vòng bước rãnh curoa |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tỷ số truyền puly trên xe ô tô du lịch và bán tải thường nằm trong khoảng:
$$
2{,}5:1 \le i_{\text{pulley}} \le 3{,}2:1
$$
- Bắt buộc phải đo theo đường kính vòng chia bước rãnh (Pitch Diameter); không đo mép ngoài cùng của vành gờ puly vì sẽ gây sai số tỷ số truyền từ $5 - 8\%$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Tiện puly máy phát quá nhỏ ($< 48\text{ mm}$) để ép máy phát quay nhanh khi nổ garanti sẽ làm giảm góc ôm của dây curoa và bán kính uốn quá gắt, gây trượt dây curoa và làm nứt chân các rãnh gân cao su chỉ sau vài ngàn km.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn động học truyền động đai
- **Nguồn 1**: [EngineeringToolbox - Pulley Diameters and Speeds](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Belt Drive Ratios](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-073] Vòng Tua Rotor Máy Phát Thực Tế (Alternator Rotor RPM)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư kiểm tra an toàn cơ khí vòng bi và rotor ở tua máy cao

### 1. Công thức toán học (Mathematical Formula)

$$
n_{\text{alt}} = n_{\text{engine}} \times i_{\text{pulley}} \times (1 - s_{\text{belt}})
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $n_{\text{engine}}$ | Vòng tua của động cơ xe | rpm | Tua máy hiển thị trên đồng hồ |
| $i_{\text{pulley}}$ | Tỷ số truyền puly cốt máy / máy phát | Không thứ nguyên | Tính từ công thức DM-072 |
| $s_{\text{belt}}$ | Hệ số trượt vi mô của dây curoa gân Poly-V | Thập phân ($0..1$) | Khi dây curoa căng chuẩn: $s_{\text{belt}} \approx 0{,}01 - 0{,}02$ ($1 - 2\%$) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Ở trạng thái tải bình thường, độ trượt rất nhỏ. Khi tải điện nặng và dây đai chùng hoặc bị dính nước sình lầy, độ trượt $s_{\text{belt}}$ có thể tăng lên $> 0{,}10$ ($> 10\%$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Giới hạn tua tối đa an toàn cơ học của rotor máy phát ô tô thường là $18.000\text{ rpm}$. Khi xe độ động cơ rốc ga lên $6500\text{ rpm}$ với tỷ số puly $3{,}0$, tua máy phát vọt lên: $6500 \times 3{,}0 = 19.500\text{ rpm}$. Lực ly tâm cực lớn ở tua này có thể làm vỡ phốt chắn mỡ, nổ vòng bi đạn bạc và bung dây đồng quấn trên móng cực rotor (Claw-pole rotor explosion).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình truyền động đai có trượt
- **Nguồn 1**: [EngineeringToolbox - Belt Slip and Speed Transmission](https://www.engineeringtoolbox.com/angular-velocity-acceleration-power-torque-d_1397.html)
- **Nguồn 2**: [EngineeringToolbox - Alternator Mechanical Speed](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)

---

## [DM-074] Tần Số Dòng Điện Xoay Chiều Trong Stator (Stator AC Electrical Frequency)

> **Phân loại độ tin cậy**: Chuẩn điện  
> **Nhóm người dùng**: Kỹ sư điện từ trường phân tích tổn hao lõi từ thép kỹ thuật

### 1. Công thức toán học (Mathematical Formula)

$$
f_{\text{AC}} = \frac{p \times n_{\text{alt}}}{120}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $p$ | Tổng số cực từ trên rotor móng vuốt (Claw-pole) | Số nguyên chẵn | Máy phát ô tô thường có 12 cực (6 cặp cực) hoặc 16 cực (8 cặp cực) |
| $n_{\text{alt}}$ | Tốc độ vòng tua quay của rotor máy phát | rpm | Tính từ công thức DM-073 |
| $120$ | Hằng số chuẩn quy đổi thời gian và cặp cực | Không thứ nguyên | $2 \times 60 = 120$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tần số dòng điện AC sinh ra trong các bối dây stator trước khi đi qua cầu diode chỉnh lưu.
- Ví dụ: Rotor 12 cực quay ở tua $6000\text{ rpm}$ sẽ sinh ra dòng AC có tần số: $f = \frac{12 \times 6000}{120} = 600\text{ Hz}$. Ở tua cao $15.000\text{ rpm}$, tần số đạt tới $1500\text{ Hz}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Ở tần số cao ($> 1000\text{ Hz}$), tổn hao sắt từ do dòng điện xoáy Foucault (Eddy current) và hiện tượng từ trễ trong lõi thép stator tăng rất nhanh. Lõi stator máy phát chất lượng kém dùng thép cán dày sẽ bị nóng ran và suy giảm từ thông nghiêm trọng.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn điện từ trường máy điện đồng bộ
- **Nguồn 1**: [EngineeringToolbox - Electrical Frequency of Alternators](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [EngineeringToolbox - AC Machine Fundamentals](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)

---

## [DM-075] Công Suất Xoay Chiều Stator Ba Pha Cân Bằng (Three-Phase AC Stator Power)

> **Phân loại độ tin cậy**: Chuẩn AC cân bằng  
> **Nhóm người dùng**: Kỹ sư thử nghiệm máy phát đo đạc trước cầu chỉnh lưu

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{3-phase}} = \sqrt{3} \times V_{\text{line}} \times I_{\text{line}} \times \cos\phi
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{\text{line}}$ | Điện áp hiệu dụng giữa 2 dây pha stator (Line-to-Line RMS) | Volt (V) | Đo bằng đồng hồ True-RMS |
| $I_{\text{line}}$ | Cường độ dòng điện hiệu dụng trên dây pha stator | Ampe (A) | Dòng xoay chiều chạy trong mỗi pha stator |
| $\cos\phi$ | Hệ số công suất phản kháng | Thập phân ($0..1$) | Thường từ $0{,}85 - 0{,}95$ do có độ tự cảm rò của cuộn dây |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức đo trực tiếp trên 3 pha xoay chiều trước cầu nắn dòng diode.
- Đối với các dòng máy phát 210A hiện đại sử dụng công nghệ Stator 6 pha kép (Dual 3-Phase / Hairpin Stator lệch pha $30^\circ$), công suất tổng bằng tổng của cả 2 hệ thống 3 pha cộng lại.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Dạng sóng điện áp và dòng điện của máy phát ô tô bị méo phi tuyến rất mạnh do đặc tính đóng mở của diode chỉnh lưu. Đo bằng đồng hồ vạn năng DMM thông thường không có tính năng True-RMS sẽ cho kết quả sai lệch tới $20 - 30\%$. Bắt buộc dùng máy hiện sóng Oscilloscope để đo tích phân tức thời.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn điện xoay chiều 3 pha
- **Nguồn 1**: [EngineeringToolbox - Three-Phase Electrical Power](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [EngineeringToolbox - Power Factor in AC Circuits](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)

---

## [DM-076] Tổn Thất Nhiệt Đồng Cuộn Dây Stator (Stator Copper Losses $I^2R$)

> **Phân loại độ tin cậy**: Chuẩn điện  
> **Nhóm người dùng**: Kỹ thuật viên kiểm tra nhiệt độ vận hành máy phát

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{cu}} = \sum (I_{\text{phase\_rms}}^2 \times R_{\text{phase\_hot}})
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $I_{\text{phase\_rms}}$ | Dòng điện hiệu dụng chạy qua từng pha cuộn dây | Ampe (A) | Dòng tải phân bổ trên mỗi nhánh pha |
| $R_{\text{phase\_hot}}$ | Điện trở thuần của cuộn dây ở nhiệt độ làm việc nóng | Ohm ($\Omega$) | $R_{\text{hot}} = R_{20^\circ\text{C}} \times [1 + \alpha_{\text{cu}} \times (T_{\text{hot}} - 20)]$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đồng có hệ số nhiệt điện trở dương lớn: $\alpha_{\text{cu}} = 0{,}00393/^\circ\text{C}$. Khi cuộn stator nóng lên $140^\circ\text{C}$, điện trở dây đồng tăng thêm gần $50\%$ so với lúc nguội, làm tổn hao $I^2R$ tăng vọt và làm sụt giảm dòng phát tối đa.
- Công nghệ quấn dây dạng thanh đồng dẹp (Hairpin Segmented Conductor) tăng tỷ lệ lấp đầy rãnh lên $> 70\%$ (so với dây tròn truyền thống $\sim 45\%$), giảm đáng kể $R_{\text{phase\_hot}}$ và hạ nhiệt cuộn dây.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Ở dòng tải 200A liên tục, tổn thất nhiệt đồng $P_{\text{cu}}$ có thể vượt quá $250 - 350\text{ W}$. Nếu cánh quạt tản nhiệt của máy phát bị bám đầy bùn đất off-road làm giảm lưu lượng gió làm mát, lớp men cách điện dây đồng sẽ bị cháy biến tính dẫn đến chập vòng (short-turn) làm máy phát mất hoàn toàn khả năng nạp điện.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn nhiệt Joule điện trở thuần
- **Nguồn 1**: [EngineeringToolbox - Copper Wire Resistance & Temperature](https://www.engineeringtoolbox.com/copper-wire-temp-d_1529.html)
- **Nguồn 2**: [EngineeringToolbox - Joule Heating](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-077] Tổn Thất Nhiệt Bộ Chỉnh Lưu Cầu Diode (Rectifier Diode Conduction Losses)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Kỹ sư đánh giá nhôm tản nhiệt bộ tiết chế chỉnh lưu (Rectifier Heat Sink)

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{diode}} \approx 2 \times V_f \times I_{\text{DC}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_f$ | Điện áp sụt áp thuận qua mỗi tiếp giáp diode Silicon | Volt (V) | Diode chỉnh lưu dòng lớn thường sụt áp từ $0{,}85 - 1{,}15\text{V}$ ở dòng tải nặng |
| $I_{\text{DC}}$ | Cường độ dòng điện một chiều đầu ra tổng | Ampe (A) | Dòng điện máy phát nạp vào xe |
| $2$ | Hệ số dòng điện luôn đi qua 2 diode nối tiếp (cực dương và âm) | Không thứ nguyên | Cầu chỉnh lưu toàn sóng |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức xấp xỉ cho cầu chỉnh lưu diode 3 pha toàn sóng 6 diode hoặc 12 diode mắc song song.
- Bỏ qua tổn thất đóng ngắt tần số cao (Switching losses) và dòng rò ngược (Reverse leakage).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Hãy xem xét con số thực tế: Khi máy phát phát dòng $200\text{ A}$ với sụt áp thuận $V_f = 0{,}95\text{V}$, công suất nhiệt tỏa ra tập trung tại cụm diode là:
$$
P_{\text{diode}} \approx 2 \times 0{,}95 \times 200 = 380\text{ Watt nhiệt!}
$$
Nhiệt lượng tương đương một chiếc bàn ủi nhỏ nung nóng cụm nhôm tản nhiệt đuôi máy phát. Nếu nhôm tản nhiệt nhỏ hoặc vị trí máy phát bị che chắn quá kín trong khoang máy, nhiệt độ tiếp giáp diode sẽ vượt quá ngưỡng chịu đựng $175^\circ\text{C}$ làm nổ thông mạch diode (Short-circuit failure), khiến dòng bình ắc quy phóng ngược làm cháy máy phát.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng tổn hao bán dẫn công suất
- **Nguồn 1**: [EngineeringToolbox - Diode Power Dissipation](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [EngineeringToolbox - Heat Sinks & Thermal Resistance](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)

---

## [DM-078] Sụt Áp Trên Tuyến Cáp Nguồn Chính B+ (Big-3 Main Cable Voltage Drop)

> **Phân loại độ tin cậy**: Chuẩn điện  
> **Nhóm người dùng**: Thợ thi công gói độ nguồn Big-3 (Dây cọc phát máy phát - Dây cọc dương bình - Dây Mass sườn)

### 1. Công thức toán học (Mathematical Formula)

$$
\Delta V = \frac{I \times \rho \times L}{A_{\text{mm}^2}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $I$ | Cường độ dòng điện sạc tối đa qua tuyến cáp | Ampe (A) | Ví dụ: dòng định mức $210\text{A}$ |
| $\rho$ | Điện trở suất của đồng tiêu chuẩn | $\Omega\cdot\text{mm}^2/\text{m}$ | Tiêu chuẩn đồng $0{,}0175$ |
| $L$ | Chiều dài vật lý của đoạn dây cáp | mét (m) | Thường từ $1{,}2 - 2{,}0\text{ m}$ từ máy phát đến cọc bình |
| $A_{\text{mm}^2}$ | Tiết diện dây dẫn đồng | mm² | Cáp zin theo xe thường chỉ $16 - 20\text{ mm}^2$; cáp nâng cấp Big-3 cần $35 - 50\text{ mm}^2$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tiêu chuẩn ngành điện ô tô: Độ sụt áp trên tuyến cáp chính sạc từ máy phát về bình ắc quy bắt buộc phải:
$$
\Delta V \le 0{,}2\text{V} \quad (\le 1{,}5\%)
$$
- Nếu sụt áp quá lớn, cảm biến điện áp của IC sạc sẽ hiểu sai điện áp bình, khiến bình ắc quy không bao giờ được nạp đầy.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Dây cáp B+ zin của xe nguyên bản thường chỉ thiết kế cho máy phát nhỏ 80-100A. Khi nâng cấp lên máy phát 210A mà KHÔNG nâng cấp dây cáp nguồn Big-3 (giữ nguyên dây zin $16\text{ mm}^2$), dòng điện 200A chạy qua đoạn dây $1{,}5\text{ m}$ sẽ làm sụt áp hơn $0{,}35\text{V}$ và tỏa nhiệt nung nóng dây lên hơn $110^\circ\text{C}$ làm chảy vỏ cao su gây chập chạm khung sườn. Bắt buộc phải nâng cấp cáp đồng OFC tối thiểu $35\text{ mm}^2$ (2 AWG) hoặc $50\text{ mm}^2$ (0 AWG) kèm cầu chì tổng 250A.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định luật Pouillet sụt áp một chiều
- **Nguồn 1**: [EngineeringToolbox - Voltage Drop in Electrical Cables](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)
- **Nguồn 2**: [EngineeringToolbox - Automotive Wire Sizing Standards](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)

---

## [DM-079] Công Suất Phát Nhiệt Joule Trên Dây Điện (Joule Heating in Wiring)

> **Phân loại độ tin cậy**: Chuẩn điện  
> **Nhóm người dùng**: Kỹ thuật viên kiểm tra độ an toàn chống cháy nổ hệ thống dây điện ô tô

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{heat}} = I^2 \times R_{\text{cable}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $I$ | Cường độ dòng điện liên tục chạy qua dây | Ampe (A) | Dòng điện tải |
| $R_{\text{cable}}$ | Tổng điện trở thuần của đoạn dây cáp | Ohm ($\Omega$) | $R = \frac{\rho \times L}{A_{\text{mm}^2}}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức tính tốc độ phát nhiệt năng lượng Joule biến đổi thành nhiệt lượng trên dây dẫn.
- Nhiệt độ cân bằng ổn định của dây dẫn còn phụ thuộc vào khả năng đối lưu tỏa nhiệt ra không khí xung quanh.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Bó chung nhiều dây dẫn mang dòng điện lớn vào cùng một ống ruột gà nhựa kín trong khoang máy nóng bức sẽ làm triệt tiêu khả năng thoát nhiệt đối lưu. Nhiệt lượng Joule tích tụ sẽ làm lớp cách điện nhựa PVC bị lão hóa, giòn vỡ và tự phát hỏa (Thermal Runaway). Dây điện tải nặng phải dùng loại có vỏ bọc chịu nhiệt Silicone hoặc Cross-linked Polyethylene (XLPE) chịu nhiệt $125 - 150^\circ\text{C}$.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định luật Joule-Lenz phát nhiệt
- **Nguồn 1**: [EngineeringToolbox - Heat Loss in Electrical Conductors](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [EngineeringToolbox - Wire Ampacity and Temperature Rise](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)

---

## [DM-080] Tổng Phụ Tải Điện Tiêu Thụ Toàn Xe (Total Vehicle Electrical Load)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư điện ô tô lập bảng cân bằng phụ tải trước khi độ thêm đồ chơi

### 1. Công thức toán học (Mathematical Formula)

$$
I_{\text{total}} = \sum \frac{P_{\text{device}}}{\eta_{\text{device}} \times V_{\text{bus}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{device}}$ | Công suất tiêu thụ hữu ích của từng thiết bị điện | Watt (W) | Đèn LED bar, quạt tản nhiệt, máy lạnh, bơm trợ lực lái điện, âm thanh |
| $\eta_{\text{device}}$ | Hiệu suất của bộ nguồn hoặc thiết bị | Thập phân ($0..1$) | Thường từ $0{,}80 - 0{,}95$ |
| $V_{\text{bus}}$ | Điện áp thanh cái cấp nguồn toàn xe | Volt (V) | Tiêu chuẩn $13{,}8 - 14{,}4\text{V}$ khi nổ máy |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tổng dòng điện tiêu thụ của tất cả phụ tải hoạt động đồng thời.
- Quy tắc thiết kế nguồn xe: Tổng phụ tải liên tục thường xuyên không được vượt quá $75 - 80\%$ dòng phát định mức của máy phát để chừa lại $20 - 25\%$ biên độ sạc bù lại bình ắc quy.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Dòng khởi động tức thời (Inrush Current) của mô-tơ quạt két nước đôi hoặc máy nén khí treo gầm có thể vọt lên gấp $3 - 4$ lần dòng định mức trong $200\text{ ms}$. Nếu hệ thống không có rơ-le chịu dòng khởi động và tụ bù, cú sụt áp tức thời sẽ làm hộp điều khiển ABS hoặc màn hình trung tâm bị reset khởi động lại.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình cân bằng Kirchhoff dòng điện
- **Nguồn 1**: [EngineeringToolbox - Electrical Load Summation](https://www.engineeringtoolbox.com/electrical-power-d_1570.html)
- **Nguồn 2**: [EngineeringToolbox - Automotive Electrical System Sizing](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)
