# Chuyên đề 03: Camping & RV (12 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-03` | **Dải công cụ**: `DM-025` đến `DM-036`  
> **Đối tượng ứng dụng**: Chủ xe hoán cải Mobihome, xe dã ngoại Camper Van, xe rơ-moóc Caravan, kỹ thuật viên lắp đặt hệ thống điện dã ngoại Off-grid.  
> **Mục tiêu kỹ thuật**: Tính toán cân bằng năng lượng hàng ngày (Wh/ngày), dung lượng pack pin LiFePO4, dòng DC kích điện Inverter 220V, sản lượng điện mặt trời PVWatts nóc xe và tổn hao sụt áp đường dây DC 12V/24V.

---

## [DM-025] Tổng Năng Lượng Tiêu Thụ Hàng Ngày (Daily Energy Consumption)

> **Phân loại độ tin cậy**: Chuẩn cân bằng năng lượng  
> **Nhóm người dùng**: Người thiết kế xe hoán cải Mobihome, chủ xe Camper dã ngoại

### 1. Công thức toán học (Mathematical Formula)

$$
E_{\text{day\_Wh}} = \sum (P_i \times t_i)
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_i$ | Công suất tiêu thụ điện của thiết bị thứ $i$ | Watt (W) | Công suất công bố trên tem thiết bị (tủ lạnh, đèn LED, quạt, bơm nước, sạc laptop) |
| $t_i$ | Thời gian vận hành trong một ngày của thiết bị thứ $i$ | giờ/ngày (h) | Cần tính theo chu kỳ làm việc thực tế (Duty cycle) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Với các thiết bị đóng ngắt tự động theo rơ-le nhiệt (như tủ lạnh máy nén 12V), thời gian chạy máy nén thực tế thường chiếm $30 - 50\%$ thời gian trong ngày tùy thuộc vào nhiệt độ môi trường ngoài trời.
- Chưa tính tổn hao công suất không tải (Idle power) của Inverter và bộ điều khiển sạc MPPT (khoảng $15 - 30\text{ W}$ chạy suốt 24h).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Đánh giá thấp nhu cầu năng lượng ngày dẫn tới việc pack pin thường xuyên bị rút cạn tới ngưỡng ngắt của BMS, làm gián đoạn hệ thống quạt thông gió và tủ lạnh bảo quản thực phẩm khi cắm trại giữa rừng sâu.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cân bằng năng lượng tích phân
- **Nguồn 1**: [NREL - PVWatts V8 Energy Sizing Guidelines](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - PVWatts System Design Manual](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-026] Dung Lượng Pack Pin Yêu Cầu (Required Battery Bank Capacity)

> **Phân loại độ tin cậy**: Ước lượng thiết kế  
> **Nhóm người dùng**: Kỹ thuật viên đóng pin lithium xe Mobihome

### 1. Công thức toán học (Mathematical Formula)

$$
C_{\text{Ah}} = \frac{E_{\text{day\_Wh}} \times N_{\text{days}}}{V_{\text{nom}} \times \text{DoD} \times \eta_{\text{system}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $E_{\text{day\_Wh}}$ | Tổng năng lượng tiêu thụ một ngày | Wh/ngày | Tính từ công thức DM-025 |
| $N_{\text{days}}$ | Số ngày dự phòng tự chủ khi không có nắng/máy phát | ngày | Xe Mobihome thường thiết kế dự phòng $1 - 2$ ngày |
| $V_{\text{nom}}$ | Điện áp danh định hệ thống lưu trữ | Volt (V) | Hệ 12V: $12{,}8\text{V}$; Hệ 24V: $25{,}6\text{V}$; Hệ 48V: $51{,}2\text{V}$ |
| $\text{DoD}$ | Độ sâu xả cạn cho phép (Depth of Discharge) | Thập phân ($0..1$) | Pin LiFePO4 khuyến nghị $\text{DoD} = 0{,}80 - 0{,}90$; Ắc quy AGM $\text{DoD} = 0{,}50$ |
| $\eta_{\text{system}}$ | Hiệu suất chuyển đổi tổng thể hệ thống | Thập phân ($0..1$) | Thường lấy $0{,}85 - 0{,}90$ (bù trừ tổn thất dây dẫn, Inverter) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Dung lượng tính toán là dung lượng ở điều kiện tiêu chuẩn ($25^\circ\text{C}$).
- Khi nhiệt độ môi trường giảm xuống dưới $0^\circ\text{C}$, dung lượng khả dụng của cell lithium bị sụt giảm từ $15 - 25\%$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Tuyệt đối cấm sạc pin lithium LiFePO4 khi nhiệt độ lõi cell dưới $0^\circ\text{C}$ mà không có màng sưởi (Heating Pad). Sạc lithium ở nhiệt độ âm sẽ sinh ra hiện tượng mạ lithium kim loại gai (Lithium Plating) gây đâm thủng màng ngăn và cháy nổ.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Ước lượng thiết kế hệ thống
- **Nguồn 1**: [NREL - Off-Grid Battery Sizing](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - System Performance and Reliability](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-027] Thời Gian Vận Hành Qua Kích Điện Inverter (Inverter Run Time)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Chủ xe kiểm tra thời gian dùng bếp từ, nồi cơm, máy sấy

### 1. Công thức toán học (Mathematical Formula)

$$
t_{\text{h}} = \frac{V_{\text{nom}} \times C_{\text{Ah}} \times \text{DoD} \times \eta_{\text{inv}}}{P_{\text{AC}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{\text{nom}}$ | Điện áp danh định của pack pin | Volt (V) | Ví dụ: $12{,}8\text{V}$ |
| $C_{\text{Ah}}$ | Dung lượng pack pin | Ah | Ví dụ: $200\text{Ah}$ |
| $\text{DoD}$ | Độ sâu xả khả dụng | Thập phân ($0..1$) | Ví dụ: $0{,}85$ |
| $\eta_{\text{inv}}$ | Hiệu suất chuyển đổi của Inverter sóng sin chuẩn | Thập phân ($0..1$) | Thường từ $0{,}88 - 0{,}94$ ở tải trung bình |
| $P_{\text{AC}}$ | Công suất tải xoay chiều 220V | Watt (W) | Công suất tiêu thụ của thiết bị cắm vào Inverter |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Giả định công suất tải $P_{\text{AC}}$ không đổi và điện áp pin duy trì ổn định.
- Với các tải cảm có mô-tơ (bơm nước, máy khoan), dòng khởi động (surge current) tức thời có thể gấp $3 - 5$ lần công suất định mức.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Dùng tải AC công suất lớn ($> 1500\text{ W}$) trên hệ pin 12V sẽ rút dòng DC lên tới hơn $150\text{ A}$. Nếu cọc pin hoặc cầu đấu siết không đủ lực, tiếp xúc kém sẽ sinh nhiệt nóng đỏ chảy cọc nhựa của pin. Khuyến nghị nâng cấp lên hệ 24V hoặc 48V cho các xe dùng bếp từ.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng cân bằng công suất
- **Nguồn 1**: [NREL - Inverter Performance Modelling](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - Storage System Operation](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-028] Cường Độ Dòng Điện DC Đầu Vào Inverter (Inverter DC Input Current)

> **Phân loại độ tin cậy**: Chuẩn cân bằng công suất  
> **Nhóm người dùng**: Thợ điện xe hoán cải, kỹ thuật viên tính cỡ cáp cọc bình

### 1. Công thức toán học (Mathematical Formula)

$$
I_{\text{DC}} = \frac{P_{\text{AC}}}{V_{\text{DC}} \times \eta_{\text{inv}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{AC}}$ | Công suất tải 220V ngõ ra | Watt (W) | Công suất liên tục tối đa dự kiến của thiết bị |
| $V_{\text{DC}}$ | Điện áp đầu vào DC tại cọc Inverter | Volt (V) | Khi pin gần cạn điện áp tụt xuống $11{,}5\text{V}$ (hệ 12V) hoặc $23\text{V}$ (hệ 24V) |
| $\eta_{\text{inv}}$ | Hiệu suất Inverter | Thập phân ($0..1$) | Lấy chuẩn $0{,}90$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Lưu ý tính toán $I_{\text{DC}}$ ở mức điện áp pin thấp nhất ($V_{\text{cutoff}}$) để xác định dòng điện cực đại chạy qua dây cáp nguồn.
- Dòng điện đầu vào DC luôn tỷ lệ nghịch với điện áp bus pin: Pin càng cạn điện thì dòng rút càng tăng cao!
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Một bộ Inverter $3000\text{ W}$ trên hệ 12V ở điện áp $11{,}5\text{V}$ sẽ rút dòng DC tới: $\frac{3000}{11{,}5 \times 0{,}9} \approx 290\text{ A}$. Dây dẫn bắt buộc phải dùng cáp hàn đồng nguyên chất tối thiểu $50 - 70\text{ mm}^2$ và cầu chì ANL $350 - 400\text{ A}$.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cân bằng công suất điện một chiều
- **Nguồn 1**: [NREL - Inverter Characteristics](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - System Balance of Plant](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-029] Sản Lượng Dàn Pin Năng Lượng Mặt Trời (Daily Solar PV Yield)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Kỹ thuật viên dán pin mặt trời nóc xe Mobihome / Camper

### 1. Công thức toán học (Mathematical Formula)

$$
E_{\text{PV\_Wh}} = P_{\text{STC}} \times \text{PSH} \times PR
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{STC}}$ | Tổng công suất đỉnh danh định dàn pin | Watt-peak ($W_p$) | Tổng công suất tem các tấm pin ở điều kiện tiêu chuẩn |
| $\text{PSH}$ | Số giờ nắng đỉnh trung bình ngày (Peak Sun Hours) | giờ (h) | Việt Nam trung bình từ $3{,}8 - 5{,}2\text{ giờ/ngày}$ tùy mùa và khu vực |
| $PR$ | Hệ số hiệu năng thực tế (Performance Ratio) | Thập phân ($0..1$) | Thường từ $0{,}65 - 0{,}75$ đối với pin lắp phẳng trên nóc xe dã ngoại |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tấm pin mặt trời dán nằm phẳng trên nóc xe (tilt angle $0^\circ$) bị suy giảm từ $10 - 25\%$ sản lượng so với đặt nghiêng tối ưu hướng về mặt trời.
- Nhiệt độ nóc xe mùa hè nóng tới $65 - 75^\circ\text{C}$ làm giảm điện áp cell pin theo hệ số nhiệt ($P_{\text{max}}$ giảm khoảng $0{,}35 - 0{,}4\%/^\circ\text{C}$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Đỗ xe dưới bóng râm lùm cây để làm mát cabin sẽ khiến sản lượng pin mặt trời tụt giảm tới $80 - 90\%$. Cần chuẩn bị phương án sạc bù từ máy phát xe qua bộ DC-DC Charger.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng quang điện
- **Nguồn 1**: [NREL - PVWatts V8 Calculator](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - Solar Resource Data](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-030] Số Lượng Tấm Pin Năng Lượng Mặt Trời (Number of Solar Panels)

> **Phân loại độ tin cậy**: Chuẩn làm tròn  
> **Nhóm người dùng**: Kỹ thuật viên lên danh mục vật tư dàn pin năng lượng mặt trời

### 1. Công thức toán học (Mathematical Formula)

$$
N = \left\lceil \frac{P_{\text{req}}}{P_{\text{panel}}} \right\rceil
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{req}}$ | Tổng công suất tấm pin cần lắp đặt | Watt ($W_p$) | Tính từ nhu cầu năng lượng ngày chia cho $(\text{PSH} \times PR)$ |
| $P_{\text{panel}}$ | Công suất danh định của một tấm pin quang điện | Watt ($W_p$) | Thường là tấm $100\text{W}$, $150\text{W}$, $200\text{W}$ hoặc $400\text{W}$ |
| $\lceil \dots \rceil$ | Hàm số làm tròn lên số nguyên kế tiếp (Ceiling) | Số nguyên | Luôn làm tròn lên để đảm bảo công suất |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Bị khống chế bởi diện tích thực tế của nóc xe sau khi đã trừ cửa sổ trời, quạt hút thông gió MaxxFan và máy điều hòa nóc.
- Khi ghép nhiều tấm pin (nối tiếp hoặc song song), cần kiểm tra điện áp hở mạch lạnh $V_{oc\_\text{cold}}$ để không vượt quá dải điện áp đầu vào tối đa của bộ sạc MPPT.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Ghép nối tiếp (Series) các tấm pin làm tăng điện áp DC lên cao ($> 60\text{V}$). Kỹ thuật viên phải trang bị CB ngắt nguồn chuyên dụng DC (không dùng CB xoay chiều AC gia dụng) để tránh hồ quang phóng điện khi đóng cắt.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn làm tròn hình học mảng pin
- **Nguồn 1**: [NREL - PV Array Configuration](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - PVWatts System Design](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-031] Cường Độ Dòng Sạc Ngõ Ra DC-DC (DC-DC Charger Output Current)

> **Phân loại độ tin cậy**: Chuẩn điện  
> **Nhóm người dùng**: Kỹ thuật viên chọn bộ sạc thông minh nạp bình phụ từ xe

### 1. Công thức toán học (Mathematical Formula)

$$
I_{\text{out}} = \frac{P_{\text{out}}}{V_{\text{batt}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{out}}$ | Công suất sạc đầu ra của bộ sạc DC-DC | Watt (W) | Ví dụ: bộ sạc DC-DC $600\text{W}$ |
| $V_{\text{batt}}$ | Điện áp của pack pin phụ khi đang nạp | Volt (V) | Khi nạp giai đoạn hấp thụ (Absorption), $V_{\text{batt}} \approx 14{,}2 - 14{,}6\text{V}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Giả thiết điện áp sạc ở pha nạp ổn dòng CC (Constant Current).
- Khi pin đạt đến điện áp ngưỡng cắt, bộ sạc chuyển sang pha ổn áp CV (Constant Voltage) và dòng điện $I_{\text{out}}$ sẽ tự động giảm dần về $0\text{ A}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Đấu sạc trực tiếp giữa ắc quy chì khởi động và pin lithium LiFePO4 qua rơ-le cách ly thông thường (Isolator / VSR) mà không qua bộ điều khiển sạc DC-DC sẽ khiến pin lithium rút dòng cực lớn từ máy phát xe zin, gây quá nhiệt cháy cuộn stator máy phát trong vòng 20 phút chạy xe.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định luật Ohm DC
- **Nguồn 1**: [NREL - Battery Charging Systems](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - Balance of System Power](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-032] Phụ Tải Sạc Đè Lên Máy Phát Xe (Alternator Charging Load)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư điện ô tô đánh giá độ an toàn của máy phát zin vs máy phát 210A

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{input}} = \frac{V_{\text{batt}} \times I_{\text{charge}}}{\eta_{\text{dcdc}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{\text{batt}}$ | Điện áp sạc cấp cho khối pin phụ | Volt (V) | Thường $14{,}4\text{V}$ cho pin LiFePO4 |
| $I_{\text{charge}}$ | Cường độ dòng sạc nạp vào pin | Ampe (A) | Ví dụ: nạp dòng $50\text{A}$ |
| $\eta_{\text{dcdc}}$ | Hiệu suất chuyển đổi của bộ sạc DC-DC | Thập phân ($0..1$) | Thường từ $0{,}90 - 0{,}94$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đây là công suất điện $P_{\text{input}}$ rút từ lưới điện 12V của xe.
- Để tính công suất cơ học đè lên trục puly động cơ xe, phải chia tiếp cho hiệu suất máy phát: $P_{\text{mech}} = \frac{P_{\text{input}}}{\eta_{\text{alt}}}$ (với $\eta_{\text{alt}} \approx 0{,}60$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Một bộ sạc DC-DC $60\text{A}$ ngốn công suất điện khoảng $920\text{ W}$, tương đương dòng rút khoảng $70\text{ A}$ từ máy phát xe. Nếu xe nguyên bản chỉ có máy phát zin 90-110A mà xe còn bật điều hòa và đèn pha, máy phát zin sẽ hoạt động quá tải $100\%$ liên tục ở tua cầm chừng. Bắt buộc phải nâng cấp lên máy phát dòng cao 210A.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình cân bằng điện cơ
- **Nguồn 1**: [NREL - Charging Efficiency Models](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - Automotive Alternator Sizing](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-033] Thời Gian Sạc Giai Đoạn Ổn Dòng CC (Bulk/CC Charging Time)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Người dùng xe dã ngoại tính thời gian nổ máy sạc bù pin

### 1. Công thức toán học (Mathematical Formula)

$$
t_{\text{h}} = \frac{\Delta\text{Ah}}{I_{\text{charge}} \times \eta_{\text{charge}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\Delta\text{Ah}$ | Lượng điện tích bị thiếu cần nạp bù | Ah | Phần trăm dung lượng thiếu hụt nhân với dung lượng pack |
| $I_{\text{charge}}$ | Cường độ dòng sạc nạp liên tục | Ampe (A) | Định mức dòng sạc của DC-DC hoặc sạc lưới AC |
| $\eta_{\text{charge}}$ | Hiệu suất nạp dung lượng culông của cell pin | Thập phân ($0..1$) | Pin LiFePO4 rất cao: $0{,}97 - 0{,}99$; Ắc quy axit chì: $0{,}80 - 0{,}85$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức áp dụng cho giai đoạn sạc ổn dòng Bulk/CC (từ $0\%$ đến khoảng $85 - 90\%$ SOC của pin LiFePO4).
- Không tính giai đoạn ổn áp CV và thời gian nạp cân bằng cell (Cell Balancing) ở pha cuối.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Không cố đẩy dòng sạc $I_{\text{charge}}$ vượt quá thông số dòng sạc khuyến nghị của nhà sản xuất cell pin (thường $\le 0{,}5\text{C}$). Sạc quá dòng sẽ làm tăng nhiệt nội trở pack pin và gây phồng rộp các cell dạng lăng trụ (Prismatic Cells).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng nạp điện tích
- **Nguồn 1**: [NREL - Battery Charge Dynamics](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - PVWatts Storage Management](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-034] Độ Sụt Áp Trên Tuyến Dây Dẫn DC (DC Cable Voltage Drop)

> **Phân loại độ tin cậy**: Chuẩn điện  
> **Nhóm người dùng**: Thợ kỹ thuật đi dây điện âm vách xe Mobihome

### 1. Công thức toán học (Mathematical Formula)

$$
\Delta V = \frac{I \times \rho \times L_{\text{loop}}}{A_{\text{mm}^2}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $I$ | Cường độ dòng điện cực đại chạy qua dây | Ampe (A) | Dòng tải liên tục lớn nhất |
| $\rho$ | Điện trở suất của đồng dẫn điện ở nhiệt độ hoạt động | $\Omega\cdot\text{mm}^2/\text{m}$ | Lấy tiêu chuẩn đồng nguyên chất: $\rho = 0{,}0175$ |
| $L_{\text{loop}}$ | Tổng chiều dài toàn bộ vòng lặp (dây dương + dây âm) | mét (m) | $L_{\text{loop}} = 2 \times \text{khoảng cách vật lý}$ |
| $A_{\text{mm}^2}$ | Tiết diện dây dẫn đồng | mm² | Tiết diện ruột đồng dẫn điện (ví dụ: 16, 25, 35, 50, 70 mm²) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tiêu chuẩn an toàn điện xe dã ngoại: Độ sụt áp cho các tải quan trọng (Inverter, sạc DC-DC, tủ lạnh) bắt buộc phải $\Delta V \le 3\%$ ($\le 0{,}36\text{V}$ trên hệ 12V); tải chiếu sáng thông thường $\le 5\%$.
- Dây dẫn còn phải thỏa mãn giới hạn mang dòng an toàn (Ampacity Rating) theo tiêu chuẩn cách nhiệt vỏ (ví dụ $105^\circ\text{C}$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Trên hệ điện áp thấp 12V, sụt áp $1\text{V}$ đồng nghĩa với việc mất mát tới gần $10\%$ năng lượng và làm nóng đỏ dây dẫn. Sụt áp làm các thiết bị nhạy cảm như tủ lạnh máy nén 12V liên tục ngắt báo lỗi sụt nguồn (Error Code E1 / Low Voltage Cutoff).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định luật Ohm & Pouillet
- **Nguồn 1**: [EngineeringToolbox - Voltage Drop in Conductors](https://www.engineeringtoolbox.com/voltage-drop-d_1550.html)
- **Nguồn 2**: [NREL - System Wiring Design](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-035] Năng Lượng Tiêu Thụ Của Máy Điều Hòa Xe (RV Air Conditioning Energy)

> **Phân loại độ tin cậy**: Chuẩn cân bằng năng lượng  
> **Nhóm người dùng**: Chủ xe tính toán thời gian chạy máy lạnh nóc khi cắm trại

### 1. Công thức toán học (Mathematical Formula)

$$
E_{\text{Wh}} = P_{\text{avg}} \times t_{\text{h}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{avg}}$ | Công suất điện tiêu thụ bình quân của máy lạnh | Watt (W) | Điều hòa 12V/24V Inverter: $350 - 750\text{ W}$; Điều hòa gia dụng 220V: $800 - 1200\text{ W}$ |
| $t_{\text{h}}$ | Thời gian bật điều hòa | giờ (h) | Số giờ chạy máy lạnh liên tục (ví dụ: ngủ đêm 8 tiếng) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công suất trung bình phụ thuộc rất lớn vào chất lượng cách âm cách nhiệt của thân vỏ xe (ván sợi thủy tinh, cao su lưu hóa, xốp XPS) và chênh lệch nhiệt độ bên trong và ngoài xe.
- Giữa trưa nắng gắt hè, máy nén sẽ chạy $100\%$ công suất liên tục; ban đêm mát mẻ công suất có thể giảm xuống $40 - 50\%$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Chạy điều hòa 8 tiếng qua đêm ($P_{\text{avg}} = 500\text{ W}$) tiêu tốn khoảng $4000\text{ Wh}$ điện. Hệ pin 12V cần dung lượng tối thiểu $400\text{Ah}$ LiFePO4 chỉ dành riêng cho máy lạnh. Dùng pin quá nhỏ sẽ làm sập nguồn lúc nửa đêm.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn cân bằng năng lượng nhiệt - điện
- **Nguồn 1**: [NREL - Thermal & Electric Loads in Mobile Systems](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - HVAC Energy Modelling](https://samrepo.nlr.gov/help/pvwatts_system_design.html)

---

## [DM-036] Biên Độ Dự Phòng Công Suất An Toàn (Power System Safety Margin)

> **Phân loại độ tin cậy**: Quy tắc thiết kế  
> **Nhóm người dùng**: Kỹ sư trưởng thiết kế tổng thể hệ thống nguồn điện xe

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{margin}} = P_{\text{peak}} \times SF
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{peak}}$ | Tổng công suất đỉnh đồng thời của tất cả phụ tải | Watt (W) | Tổng các thiết bị có thể bật cùng lúc |
| $SF$ | Hệ số an toàn dự phòng công suất thiết kế | Không thứ nguyên | Khuyến nghị bắt buộc $SF \ge 1{,}25 - 1{,}35$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Quy tắc thiết kế chuẩn kỹ thuật hệ thống điện độc lập.
- Không thay thế việc kiểm tra công suất dòng khởi động đột ngột (Surge rating) của bộ Inverter trong khoảng $1 - 5\text{ giây}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Thiết kế hệ thống điện chạy sát nút $100\%$ công suất định mức sẽ khiến các thiết bị đóng cắt, dây dẫn và cọc nối liên tục làm việc ở ngưỡng giới hạn nhiệt, đẩy nhanh tốc độ lão hóa cách điện và tiềm ẩn nguy cơ phát hỏa.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Quy tắc thiết kế công nghiệp
- **Nguồn 1**: [NREL - System Margin and Overrating](https://developer.nlr.gov/docs/solar/pvwatts/v8/)
- **Nguồn 2**: [NREL - PVWatts Sizing Standards](https://samrepo.nlr.gov/help/pvwatts_system_design.html)
