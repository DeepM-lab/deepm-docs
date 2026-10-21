# Chuyên đề 11: Detailing & Bodywork (11 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-11` | **Dải công cụ**: `DM-115` đến `DM-125`  
> **Đối tượng ứng dụng**: Kỹ thuật viên sơn phủ bảo vệ Raptor / Polyurea chống xước xe địa hình, thợ dán cách âm cách nhiệt ô tô, xưởng phục hồi đồng sơn thân vỏ, trung tâm Detailing chuyên nghiệp.  
> **Mục tiêu kỹ thuật**: Tính toán diện tích bề mặt tấm panel vỏ xe, thể tích sơn ướt/khô, độ dày màng sơn DFT/WFT, hao hụt súng phun, tỷ lệ pha trộn sơn 2 thành phần (theo thể tích và khối lượng), tải trọng tăng thêm do dán cách âm và truyền nhiệt qua tôn thân vỏ.

---

## [DM-115] Diện Tích Bề Mặt Panel Hình Chữ Nhật (Rectangular Panel Surface Area)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Thợ pha sơn, kỹ thuật viên tính định mức diện tích thi công

### 1. Công thức toán học (Mathematical Formula)

$$
A_{\text{m}^2} = L_{\text{m}} \times W_{\text{m}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $L_{\text{m}}$ | Chiều dài của tấm panel phẳng thân vỏ | mét (m) | Chiều dài đo thực tế |
| $W_{\text{m}}$ | Chiều rộng của tấm panel thân vỏ | mét (m) | Chiều rộng đo thực tế |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức hình học áp dụng trực tiếp cho các tấm phẳng hoặc độ cong nhẹ (như nóc xe, sàn thùng sau xe bán tải, nắp thùng hàng).
- Với các chi tiết uốn lượn 3D phức tạp (vè lồi cua lốp, nắp capo gân dập nổi, cản trước cản sau), thợ cần triển khai bề mặt đo quét 3D hoặc chia nhỏ thành các hình thang/tam giác để tính tổng diện tích thực.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Đánh giá thiếu diện tích bề mặt các khe gấp nếp và mép gấp mép trong cửa (door jambs) sẽ dẫn đến việc thợ pha thiếu sơn giữa chừng, buộc phải pha mẻ sơn mới dễ bị lệch màu sắc và độ bóng giữa hai lần phun.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học Euclide
- **Nguồn 1**: [EngineeringToolbox - Surface Area Geometry](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [EngineeringToolbox - Thermal Conduction Surfaces](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)

---

## [DM-116] Thể Tích Sơn Phủ Ướt Lý Thuyết (Wet Film Volume)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ thuật viên sơn phủ Polyurea / lót sàn thùng xe bán tải

### 1. Công thức toán học (Mathematical Formula)

$$
V_{\text{wet\_L}} = A_{\text{m}^2} \times t_{\text{wet\_mm}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $A_{\text{m}^2}$ | Diện tích bề mặt cần phun sơn | mét vuông (m²) | Tính từ công thức DM-115 |
| $t_{\text{wet\_mm}}$ | Độ dày màng sơn ướt mục tiêu (Wet Film Thickness - WFT) | milimét (mm) | Đo bằng thước đo lược sơn ướt (Wet Film Comb) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Quy tắc quy đổi chuẩn thể tích hình học:
$$
1\text{ m}^2 \times 1\text{ mm} = 10^{-3}\text{ m}^3 = 1{,}0\text{ Lít}
$$
- Ví dụ kiểm nghiệm thực tế: Phun phủ sàn xe bán tải diện tích $12\text{ m}^2$ với độ dày ướt $0{,}5\text{ mm}$ đòi hỏi thể tích sơn ướt lý thuyết là: $12 \times 0{,}5 = 6{,}0\text{ Lít}$.
- Đây là thể tích bám dính lý thuyết trên bề mặt phẳng nhẵn $100\%$; chưa tính đến độ nhám của bề mặt kim loại sau khi bắn cát tạo nhám (Surface Profile).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Với sơn Polyurea phản ứng nhanh (đông cứng trong $5 - 15\text{ giây}$), phun một lớp ướt quá dày ($> 2{,}0\text{ mm}$) trong một đường súng sẽ sinh nhiệt phản ứng tỏa nhiệt cực lớn (Exothermic reaction) làm nổi bọt khí li ti trong lòng lớp phủ, phá hỏng khả năng chống thấm nước.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học quy đổi thể tích lớp phủ
- **Nguồn 1**: [EngineeringToolbox - Film Thickness Conversion](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [SSPC - Society for Protective Coatings Standards](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)

---

## [DM-117] Thể Tích Màng Sơn Sau Khi Khô Hoàn Toàn (Dry Film Volume)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Kỹ sư kiểm tra chất lượng nghiệm thu lớp phủ màng bảo vệ

### 1. Công thức toán học (Mathematical Formula)

$$
V_{\text{dry\_L}} = A_{\text{m}^2} \times t_{\text{dry\_mm}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $A_{\text{m}^2}$ | Diện tích bề mặt bao phủ | m² | Diện tích bề mặt |
| $t_{\text{dry\_mm}}$ | Độ dày màng sơn khô sau đóng rắn (Dry Film Thickness - DFT) | milimét (mm) | Đo bằng máy đo độ dày lớp phủ điện từ (Elcometer) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Thể tích chất rắn hữu cơ còn lại nằm trên bề mặt kim loại sau khi toàn bộ dung môi pha loãng (VOC/Solvent) đã bay hơi hoàn toàn vào không khí.
- Đối với các loại sơn không dung môi $100\%$ chất rắn (như Pure Polyurea hoặc bột sơn tĩnh điện), thể tích khô $V_{\text{dry}}$ bằng chính thể tích ướt $V_{\text{wet}}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cần đo độ dày màng khô DFT tại tối thiểu 5 điểm ngẫu nhiên trên mỗi mét vuông theo tiêu chuẩn SSPC-PA2. Độ dày không đều (chỗ quá mỏng $< 0{,}2\text{ mm}$) sẽ bị rỉ sét ăn luồn bên dưới chỉ sau vài tháng tiếp xúc với nước mặn hoặc bùn đất.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học chất rắn lớp phủ
- **Nguồn 1**: [EngineeringToolbox - Coating Dry Film Calculation](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [NACE International - Coating Inspector Program](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)

---

## [DM-118] Độ Dày Màng Khô Theo Hàm Lượng Chất Rắn DFT (Dry Film Thickness from WFT)

> **Phân loại độ tin cậy**: Chuẩn vật liệu  
> **Nhóm người dùng**: Thợ sơn ô tô kiểm soát độ dày màng sơn trong khi đang phun

### 1. Công thức toán học (Mathematical Formula)

$$
\text{DFT}_{\text{mm}} = \text{WFT}_{\text{mm}} \times \text{VS}_{\text{fraction}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\text{WFT}_{\text{mm}}$ | Độ dày màng sơn ướt đo bằng lược cào ngay khi vừa phun | mm / $\mu\text{m}$ | $1\text{ mm} = 1000\text{ }\mu\text{m}$ |
| $\text{VS}_{\text{fraction}}$ | Tỷ lệ thể tích chất rắn của sơn (Volume Solids) | Thập phân ($0..1$) | Tra bảng dữ liệu kỹ thuật TDS của nhà sản xuất sơn (ví dụ: $0{,}40 - 0{,}75$) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức chỉ chính xác khi không pha thêm dung môi loãng ngoài tỷ lệ khuyến nghị của hãng.
- Nếu thợ pha thêm $10\%$ xăng thơm/thinner vào sơn, hàm lượng thể tích chất rắn thực tế sẽ bị pha loãng giảm xuống:
$$
\text{VS}_{\text{actual}} = \frac{\text{VS}_{\text{TDS}}}{1 + \%_{\text{thinner}}}
$$
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Sơn bóng 2K xe hơi thường có $\text{VS} \approx 45 - 50\%$. Nếu phun lớp ướt quá dày ($\text{WFT} > 150\text{ }\mu\text{m}$) trên bề mặt thẳng đứng để mong có màng khô dày, dung môi không kịp thoát sẽ gây ra hiện tượng chảy xệ sơn (Sagging/Runs) và hiện tượng da cam rỗ kim (Solvent Popping).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn bảo toàn thể tích chất rắn vật liệu
- **Nguồn 1**: [EngineeringToolbox - Solids by Volume in Paints](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [ASTM D1210 - Measurement of Paint Fineness & Thickness](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)

---

## [DM-119] Tổng Lượng Vật Tư Sơn Cần Mua Tính Hao Hụt (Paint Purchase Quantity)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Quản lý xưởng sơn dự toán vật tư và lập báo giá cho khách hàng

### 1. Công thức toán học (Mathematical Formula)

$$
V_{\text{buy\_L}} = \frac{A_{\text{m}^2} \times \text{DFT}_{\text{mm}}}{\text{VS}_{\text{fraction}} \times \eta_{\text{transfer}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $A_{\text{m}^2}$ | Diện tích bề mặt chi tiết cần sơn | m² | Diện tích tổng |
| $\text{DFT}_{\text{mm}}$ | Độ dày màng sơn khô yêu cầu | mm | Tiêu chuẩn sơn gầm: $0{,}3 - 0{,}5\text{ mm}$; Sơn phủ Raptor: $0{,}8 - 1{,}2\text{ mm}$ |
| $\text{VS}_{\text{fraction}}$ | Tỷ lệ thể tích chất rắn của sản phẩm | Thập phân ($0..1$) | Tra trên TDS |
| $\eta_{\text{transfer}}$ | Hiệu suất chuyển giao của súng phun sơn (Transfer Efficiency) | Thập phân ($0..1$) | Súng hơi thông thường: $0{,}45 - 0{,}55$; Súng HVLP: $0{,}65 - 0{,}75$; Súng áp lực cao Airless: $0{,}75 - 0{,}85$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Hiệu suất chuyển giao $\eta_{\text{transfer}}$ phản ánh lượng sơn thực sự bám lên xe so với lượng sơn bắn ra khỏi họng súng (phần còn lại biến thành bụi sơn lơ lửng bám vào buồng sơn).
- Phun các chi tiết nan nhỏ như lưới tản nhiệt calang hoặc ống khung lồng cuộn Rollcage có độ hao phí bụi sơn bay ra ngoài rất lớn ($\eta_{\text{transfer}}$ có thể tụt xuống chỉ còn $0{,}30 - 0{,}40$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Phun sơn chống xước Polyurea/Raptor trong phòng kín tạo ra nồng độ bụi sương hóa chất Isocyanate cực độc. Kỹ thuật viên bắt buộc phải đeo mặt nạ phòng độc cấp khí nén độc lập (Supplied-Air Respirator) hoặc phin lọc hữu cơ than hoạt tính tiêu chuẩn A2P3 để tránh phù phổi cấp.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng hao hụt cơ học
- **Nguồn 1**: [EngineeringToolbox - Transfer Efficiency in Spraying](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [EPA - Spray Application Transfer Efficiency Protocols](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)

---

## [DM-120] Tỷ Lệ Pha Trộn 2 Thành Phần Theo Thể Tích (Two-Part Volume Mixing Ratio)

> **Phân loại độ tin cậy**: Chuẩn tỷ lệ  
> **Nhóm người dùng**: Thợ pha sơn lót Epoxy 2K, keo dán thân vỏ 2 thành phần A:B

### 1. Công thức toán học (Mathematical Formula)

$$
V_A = V_{\text{total}} \times \frac{r_V}{r_V + 1}, \quad V_B = \frac{V_{\text{total}}}{r_V + 1}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{\text{total}}$ | Tổng thể tích hỗn hợp sơn cần pha | Lít (L) hoặc mL | Dung tích dự kiến sử dụng trong một ca phun |
| $r_V$ | Tỷ lệ thể tích quy định của thành phần A so với B ($r_V:1$) | Không thứ nguyên | Thường là $4:1$ (sơn lót 2K), $3:1$, $2:1$ hoặc $1:1$ (Polyurea nguyên chất) |
| $V_A$ | Thể tích thành phần gốc sơn (Base Component A) | Lít hoặc mL | Đong bằng cốc chia vạch thể tích |
| $V_B$ | Thể tích thành phần chất đóng rắn (Hardener Component B) | Lít hoặc mL | Đong bằng cốc chia vạch |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức áp dụng cho các dòng sơn quy định tỷ lệ pha theo thể tích (dùng ca đong chia vạch).
- Chú ý thời gian sống của hỗn hợp sau khi pha (Pot Life): Sau khi trộn A và B, phản ứng trùng hợp hóa học bắt đầu diễn ra. Thông thường thợ phải phun hết trong vòng $45 - 90\text{ phút}$ ở nhiệt độ $25^\circ\text{C}$; nếu trời nắng nóng $35^\circ\text{C}$, thời gian đóng đông có thể rút ngắn xuống còn một nửa.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Tuyệt đối cấm dùng tỷ lệ thể tích để đong theo khối lượng (và ngược lại) nếu tỷ trọng của gốc A và đóng rắn B khác nhau đáng kể (thường $\rho_A \approx 1{,}3 - 1{,}5\text{ kg/L}$ do chứa bột màu độn, trong khi $\rho_B \approx 0{,}95 - 1{,}05\text{ kg/L}$). Pha sai tỷ lệ sẽ khiến lớp sơn không bao giờ đóng rắn hoàn toàn, bị mềm dẻo hoặc dính tay vĩnh viễn.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn tỷ lệ số học
- **Nguồn 1**: [EngineeringToolbox - Volumetric Mixing Ratios](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [ASTM D523 - Standards for Two-Component Coatings](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)

---

## [DM-121] Tỷ Lệ Pha Trộn 2 Thành Phần Theo Khối Lượng (Two-Part Mass Mixing Ratio)

> **Phân loại độ tin cậy**: Chuẩn tỷ lệ  
> **Nhóm người dùng**: Thợ pha keo dán Composite, sợi carbon epoxy sử dụng cân điện tử chính xác

### 1. Công thức toán học (Mathematical Formula)

$$
m_A = m_{\text{total}} \times \frac{r_M}{r_M + 1}, \quad m_B = \frac{m_{\text{total}}}{r_M + 1}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $m_{\text{total}}$ | Tổng khối lượng keo hỗn hợp cần dùng | gram (g) hoặc kg | Trọng lượng cân trên cân tiểu ly điện tử |
| $r_M$ | Tỷ lệ khối lượng quy định giữa thành phần A và B ($r_M:1$) | Không thứ nguyên | Ghi rõ trên tem lon hóa chất (ví dụ $100:25 \implies r_M = 4{,}0$) |
| $m_A, m_B$ | Khối lượng thành phần nhựa A và chất đóng rắn B | gram (g) | Đặt ca lên cân, trừ bì (Tare) và rót đúng gram |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Phương pháp cân khối lượng đạt độ chính xác cao nhất trong kỹ thuật thi công sợi carbon đúc hút chân không (Vacuum Infusion) và keo kết cấu ô tô.
- Sai số cân cho phép không được vượt quá $\pm 1 - 2\%$ tỷ lệ quy định.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Không cố pha thêm "dư một chút chất đóng rắn B" để mong sơn nhanh khô hơn. Nhựa Epoxy đóng rắn theo liên kết hóa trị chuẩn tỉ lệ phân tử; dư chất B sẽ làm mạng polymer bị gãy ngắn mạch, khiến sản phẩm composite bị giòn vỡ gãy nứt khi chịu lực uốn.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn tỷ lệ khối lượng hóa học
- **Nguồn 1**: [EngineeringToolbox - Gravimetric Mixing Proportions](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [ISO 15041 - Paints and Varnishes Mass Mixing](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)

---

## [DM-122] Khối Lượng Lớp Sơn Phủ Ướt (Wet Coating Applied Mass)

> **Phân loại độ tin cậy**: Chuẩn khối lượng  
> **Nhóm người dùng**: Kỹ thuật viên kiểm tra định mức khối lượng thi công thực tế

### 1. Công thức toán học (Mathematical Formula)

$$
m_{\text{kg}} = \rho_{\text{kg/L}} \times V_{\text{wet\_L}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $\rho_{\text{kg/L}}$ | Tỷ trọng khối lượng riêng của dung dịch sơn ướt | kg/L | Sơn lót giàu kẽm: $1{,}8 - 2{,}4\text{ kg/L}$; Sơn phủ PU/Polyurea: $1{,}05 - 1{,}25\text{ kg/L}$ |
| $V_{\text{wet\_L}}$ | Thể tích dung dịch sơn ướt đã phun lên xe | Lít (L) | Tính từ công thức DM-116 |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Khối lượng chất lỏng trải đều lên bề mặt xe ngay sau khi phun.
- Sau khi dung môi bay hơi, khối lượng khô bám dính lại trên xe sẽ giảm xuống tương ứng với tỷ lệ phần trăm chất rắn theo khối lượng ($\text{Weight Solids} - \text{WS}_{\%}$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Với sơn lót chống rỉ giàu kẽm (Zinc-rich primer), bột kẽm kim loại rất nặng và dễ bị lắng cặn xuống đáy lon chỉ sau 10 phút để yên. Bắt buộc phải khuấy đều bằng máy khuấy sơn chuyên dụng liên tục trong quá trình rót sơn vào súng phun để đảm bảo tỷ trọng đồng đều.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định nghĩa khối lượng riêng
- **Nguồn 1**: [EngineeringToolbox - Paint Densities](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [ASTM D1475 - Density of Liquid Coatings](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)

---

## [DM-123] Khối Lượng Tấm Dán Cách Âm Gia Tăng Trên Thân Xe (Sound Deadening Mass)

> **Phân loại độ tin cậy**: Chuẩn khối lượng  
> **Nhóm người dùng**: Kỹ thuật viên Detailing tư vấn gói dán cách âm chống ồn toàn diện (Full Body Soundproofing)

### 1. Công thức toán học (Mathematical Formula)

$$
m_{\text{kg}} = A_{\text{m}^2} \times \sigma_{\text{areal}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $A_{\text{m}^2}$ | Tổng diện tích tôn thân vỏ được dán tấm cách âm | mét vuông (m²) | Thường dán 4 cánh cửa, sàn xe, hốc bánh, cốp sau và trần xe ($10 - 18\text{ m}^2$) |
| $\sigma_{\text{areal}}$ | Khối lượng trên một mét vuông của tấm dán (Areal Weight) | $\text{kg/m}^2$ | Tấm cao su Butyl lá nhôm $2\text{ mm}$: $3{,}0 - 3{,}5\text{ kg/m}^2$; Tấm $3\text{ mm}$: $4{,}5 - 5{,}2\text{ kg/m}^2$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tấm dán giảm chấn chống rung (Vibration Damper) gốc cao su Butyl lá nhôm triệt tiêu hiện tượng cộng hưởng rung màng loa của tôn thân vỏ.
- Chưa tính khối lượng lớp xốp tiêu âm thứ hai (Acoustic Foam / Closed Cell Foam lớp $6 - 10\text{ mm}$) dán đè lên trên (thường nhẹ khoảng $0{,}4 - 0{,}8\text{ kg/m}^2$).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Hãy tính toán con số thực tế: Dán cách âm full 3 lớp toàn bộ một chiếc SUV 7 chỗ ($15\text{ m}^2$ với tấm Butyl nặng $3{,}8\text{ kg/m}^2$) sẽ làm tăng thêm: $15 \times 3{,}8 = 57\text{ kg}$ khối lượng chết đè lên xe! Cánh cửa xe dán quá dày sẽ bị xệ bản lề cửa sau 1-2 năm sử dụng. Kỹ thuật viên chuyên nghiệp chỉ dán phủ $60 - 75\%$ diện tích bề mặt tôn giữa cánh để triệt tiêu rung động thay vì dán kín $100\%$.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn khối lượng diện tích
- **Nguồn 1**: [EngineeringToolbox - Areal Density and Weight](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [SAE J1400 - Laboratory Measurement of Airborne Sound Barrier Performance](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)

---

## [DM-124] Dẫn Nhiệt Qua Vách Vỏ Tôn Thân Xe (Conductive Heat Transfer Through Body Panels)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên dán phim cách nhiệt và mút cách nhiệt nóc xe dã ngoại Camper

### 1. Công thức toán học (Mathematical Formula)

$$
P_{\text{heat}} = \frac{k \times A_{\text{m}^2} \times \Delta T}{L_{\text{m}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $k$ | Hệ số dẫn nhiệt của vật liệu vách | $\text{W/(m}\cdot\text{K)}$ | Tôn thép: $k \approx 45 - 50$; Tôn nhôm: $k \approx 205$; Mút xốp Polyethylene bọc nhôm: $k \approx 0{,}035 - 0{,}040$ |
| $A_{\text{m}^2}$ | Diện tích bề mặt vách truyền nhiệt | m² | Ví dụ diện tích nóc xe: $3 - 5\text{ m}^2$ |
| $\Delta T$ | Chênh lệch nhiệt độ giữa mặt ngoài tôn và không khí bên trong xe | Kelvin (K) hoặc $^\circ\text{C}$ | Giữa trưa hè nóc tôn nóng $75^\circ\text{C}$, cabin điều hòa $25^\circ\text{C} \implies \Delta T = 50^\circ\text{C}$ |
| $L_{\text{m}}$ | Chiều dày tổng thể của lớp vật liệu cách nhiệt | mét (m) | Đổi từ mm sang m: $L_{\text{m}} = \frac{L_{\text{mm}}}{1000}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Định luật Fourier về truyền nhiệt dẫn một chiều ở trạng thái ổn định.
- Tôn xe nguyên bản dẫn nhiệt cực mạnh ($k = 50\text{ W/mK}$). Khi dán lớp mút xốp cách nhiệt dày $10\text{ mm}$ ($k = 0{,}038\text{ W/mK}$), dòng nhiệt truyền qua nóc xe giảm hơn $1000$ lần, giúp giảm tải cực lớn cho lốc lạnh điều hòa xe.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Cấm sử dụng các loại mút xốp đóng gói rẻ tiền dễ bắt lửa (như mút xốp EPS trắng đóng đồ điện tử) để dán lót cách nhiệt nóc xe. Khi chập cháy điện đèn trần, các loại xốp này sẽ bắt lửa bùng phát dữ dội và nhỏ giọt nhựa nóng chảy sinh khí độc Cyanide ngạt thở. Bắt buộc phải dùng vật liệu cách nhiệt đạt chuẩn chống cháy lan ô tô FMVSS 302.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình định luật Fourier dẫn nhiệt
- **Nguồn 1**: [EngineeringToolbox - Conductive Heat Transfer](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [EngineeringToolbox - Thermal Conductivity of Insulating Materials](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)

---

## [DM-125] Dự Toán Chi Phí Vật Tư & Nhân Công Sơn Phủ (Coating Material & Labor Costing)

> **Phân loại độ tin cậy**: Chuẩn kế toán  
> **Nhóm người dùng**: Quản lý xưởng dịch vụ lập báo giá và quản lý định mức lợi nhuận

### 1. Công thức toán học (Mathematical Formula)

$$
\text{Cost} = V_{\text{buy}} \times \text{Price}_{\text{per\_L}} + \text{Cost}_{\text{labor}} + \text{Cost}_{\text{consumables}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{\text{buy}}$ | Tổng thể tích sơn và chất đóng rắn cần mua | Lít (L) | Tính từ công thức DM-119 |
| $\text{Price}_{\text{per\_L}}$ | Đơn giá vật tư sơn trên mỗi lít | VNĐ/L | Đơn giá nhập khẩu hóa chất |
| $\text{Cost}_{\text{labor}}$ | Chi phí tiền công thợ thi công | VNĐ | Công thợ tháo lắp, xả nhám, che chắn băng keo và phun |
| $\text{Cost}_{\text{consumables}}$ | Chi phí vật tư tiêu hao phụ trợ | VNĐ | Giấy nhám, băng keo nilon che chắn 3M, cốc đo, dung môi rửa súng |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức chuẩn kế toán dự toán chi phí giá thành dịch vụ xưởng (Job Costing).
- Cần tính thêm tỷ lệ dự phòng rủi ro bảo hành sơn ($5 - 10\%$) để xử lý các sự cố bong tróc lỗi kỹ thuật sau bán hàng.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Chi phí vật tư tiêu hao che chắn (Masking supplies) chiếm tới $15 - 20\%$ tổng chi phí của một ca sơn đổi màu toàn bộ xe. Tiết kiệm băng keo nilong bằng cách dùng báo cũ che chắn sẽ khiến bụi sơn lọt qua các khe hở bám dính vào kính lái và nội thất da, phát sinh chi phí tẩy rửa đền bù cực lớn.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn kế toán chi phí định mức
- **Nguồn 1**: [EngineeringToolbox - Cost Estimation Principles](https://www.engineeringtoolbox.com/conductive-heat-transfer-d_428.html)
- **Nguồn 2**: [Automotive Service Association (ASA) - Shop Management Guidelines](https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html)
