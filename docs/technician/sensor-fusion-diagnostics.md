# 3. Chẩn Đoán Sớm & Logic Hợp Nhất Cảm Biến (Sensor Fusion)

Tài liệu này đặc tả kiến trúc **Chẩn đoán sớm và giám sát sức khỏe ô tô chuyên sâu** thông qua **Logic hợp nhất cảm biến (Sensor Fusion)** của DeepM Lab. Hệ thống giúp kỹ thuật viên garage phát hiện chính xác các hư hỏng cơ khí và nhiệt động học trước khi ECU nguyên bản kịp nhận biết, bảo vệ động cơ và hệ thống truyền động khỏi các nguy cơ hư hỏng nghiêm trọng.

---

## 🔍 1. Vùng giá trị: Những gì ECU nguyên bản KHÔNG thấy?

Hộp điều khiển động cơ (ECU) nguyên bản trên xe ô tô được lập trình với nhiệm vụ chính là đảm bảo tiêu chuẩn khí thải (Euro 4/5/6) và an toàn tức thời. ECU chỉ kích hoạt mã lỗi chẩn đoán (DTC) và bật đèn cảnh báo **Check Engine (MIL)** khi các thông số đã vượt qua ngưỡng nguy hiểm tuyệt đối trong thời gian dài (ví dụ: nước làm mát quá sôi $> 115^\circ\text{C}$, áp suất dầu rơi về $0\text{ bar}$, hoặc tỷ lệ bỏ lửa liên tục vượt ngưỡng làm nóng chảy bầu xúc tác).

Trong thực tế vận hành tại garage, phần lớn các sự cố hỏng máy nặng đều bắt nguồn từ các suy thoái vi mô kéo dài âm ỉ hàng tuần hoặc hàng tháng mà ECU hoàn toàn bỏ qua.

### Bốn nhóm lỗi tiềm ẩn ECU gốc thường bỏ qua hoặc báo quá muộn

| Nhóm hư hỏng | Vì sao ECU nguyên bản không cảnh báo sớm? | Hậu quả cơ khí thực tế tại xưởng |
| :--- | :--- | :--- |
| **Suy giảm chậm cơ khí (Mechanical Degradation)** | ECU chỉ so sánh thông số tức thời với ngưỡng an toàn cố định. Bơm nước mòn cánh làm giảm 20% lưu lượng, két nước nghẹt cặn 30%, nhớt máy thoái hóa loãng. Nhiệt độ động cơ vẫn duy trì $92 - 98^\circ\text{C}$ (nằm trong dải ECU coi là bình thường), nhưng quán tính giải nhiệt đã suy giảm nghiêm trọng. | Động cơ bị quá nhiệt đột ngột khi xe chở nặng, leo đèo dốc hoặc kẹt xe giữa trưa nắng, dẫn tới bó kẹt piston, nứt lốc máy hoặc xước lòng xi-lanh. |
| **Nhiễm chéo chất lỏng (Fluid Cross-Contamination)** | Gioăng nắp máy (gioăng quy lát) suy thoái giai đoạn đầu chỉ làm rò rỉ vài mililít khí cháy hoặc dầu bôi trơn sang áo nước làm mát mỗi ngày. ECU hoàn toàn không có cảm biến quang hoặc cảm biến hóa học để phát hiện váng dầu trong két nước. | Khi ECU kích hoạt mã lỗi quá nhiệt thì mặt máy đã bị cong vênh nhiệt, chi phí rã máy đại tu lên tới hàng chục triệu đồng. |
| **Rò rỉ và hao hụt chất lỏng tịnh tiến (Progressive Fluid Loss)** | Hầu hết các dòng xe phổ thông không trang bị cảm biến đo mức nhớt động cơ hoặc dầu hộp số tự động liên tục, chỉ có công tắc áp suất dầu báo động khi áp suất đã rơi về đáy. | Cháy rách phớt trục turbo tăng áp hoặc cháy khét các lá bố ly hợp hộp số tự động do thiếu màng dầu bôi trơn thủy lực. |
| **Hành vi và xu hướng lão hóa dài hạn (Long-term Trending)** | ECU vận hành và xóa bộ nhớ tạm trong từng chu kỳ tính toán, không lưu trữ baseline lịch sử qua nhiều tuần để phát hiện hiện tượng bỏ lửa ngầm (Misfire count tăng dần), nội trở ắc quy tăng cao, hay cảm biến oxy phản ứng chậm (lazy sensor). | Xe chết máy bất ngờ trên cao tốc, đề dai nổ vào buổi sáng lạnh, hoặc tiêu hao nhiên liệu tăng vọt $10 - 20\%$ mà không rõ nguyên nhân. |

---

## 🧠 2. Ba nguyên tắc cốt lõi của Logic Hợp Nhất Cảm Biến

Để triệt tiêu các cảnh báo giả (false positives) và đưa ra kết luận chẩn đoán kỹ thuật với độ chính xác cao, hệ thống DeepM vận hành dựa trên 3 nguyên tắc nền tảng:

### Nguyên tắc 1: Đa tín hiệu đồng thuận — Không cảm biến đơn lẻ nào tự kết luận
Mọi cảnh báo kỹ thuật cấp **Khẩn cấp (Đỏ)** hoặc **Cảnh báo (Cam)** bắt buộc phải có **ít nhất 2 nguồn tín hiệu độc lập cùng xác nhận**. Một cảm biến riêng lẻ bị trôi giá trị, lỏng giắc cắm hoặc chuột cắn dây chỉ được xếp vào nhóm cảnh báo **Khuyến cáo (Vàng)** mang tính chất lưu ý bảo dưỡng.

### Nguyên tắc 2: Xu hướng lịch sử (Baseline cá nhân hóa) quan trọng hơn giá trị tức thời
Mỗi chiếc xe có lịch sử bảo dưỡng, độ rơ cơ khí và điều kiện làm việc khác nhau. Hệ thống tự động học và thiết lập đường cơ sở (Baseline) cá nhân hóa cho từng xe qua 200–500 chu kỳ vận hành ban đầu, liên tục đối chiếu xu hướng 7 ngày, 14 ngày và 30 ngày:
* Xe A có nhiệt độ ECT ổn định ở $88^\circ\text{C}$. Nếu qua 7 ngày nhiệt độ trung bình dịch chuyển lên $96^\circ\text{C} \implies$ **Dấu hiệu suy giảm bất thường**.
* Xe B máy dầu cỡ lớn hoạt động ở $95^\circ\text{C}$ quanh năm $\implies$ **Trạng thái vận hành bình thường**.

### Nguyên tắc 3: Ngữ cảnh vận hành quyết định ngưỡng phán đoán
Cùng một giá trị nhiệt độ nước làm mát $\text{ECT} = 100^\circ\text{C}$:
* **Bình thường**: Khi xe đang chở đủ tải leo dốc liên tục trên đèo giữa trưa hè $38^\circ\text{C}$ (tải động cơ cao, nhiệt độ môi trường khắc nghiệt).
* **Bất thường nghiêm trọng**: Khi xe đang chạy đều tốc độ 60 km/h trên đường bằng phẳng lúc sáng sớm mát mẻ $24^\circ\text{C}$.
Hệ thống tích hợp dữ liệu ngữ cảnh: Vòng tua máy (RPM), góc mở bướm ga (TPS), tốc độ xe (VSS), độ dốc địa hình (GPS Pitch), áp suất khí nạp (MAP/MAF), nhiệt độ môi trường ngoài trời và trạng thái đóng ngắt lốc lạnh (A/C).

---

## 🚦 3. Khung 3 cấp độ cảnh báo thực chiến

Hệ thống phân loại các sự cố kỹ thuật thành 3 mức độ can thiệp rõ ràng:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 🔴 CẤP ĐỎ (Khẩn cấp / Critical)    │ DỪNG XE AN TOÀN — Nguy cơ hỏng hóc nặng│
├────────────────────────────────────┼───────────────────────────────────┤
│ 🟠 CẤP CAM (Cảnh báo / Warning)    │ ĐẾN GARAGE TRONG 1–4 TUẦN         │
├────────────────────────────────────┼───────────────────────────────────┤
│ 🟡 CẤP VÀNG (Khuyến cáo / Advisory)│ THEO DÕI TRONG ĐỢT BẢO DƯỠNG ĐỊNH KỲ│
└────────────────────────────────────────────────────────────────────────┘
```

| Cấp cảnh báo | Tiêu chí kích hoạt kỹ thuật | Thời gian xác nhận (Debounce) | Hành động khuyến nghị cho kỹ thuật viên & chủ xe |
| :---: | :--- | :---: | :--- |
| **ĐỎ (Khẩn cấp)** | $\ge 2$ tín hiệu độc lập đồng thời xác nhận trạng thái nguy hiểm cơ khí, HOẶC xảy ra sự cố sụt áp dầu bôi trơn nghiêm trọng ($P_{\text{oil}} < 0.5\text{ bar}$ khi máy nổ), hoặc nhiệt độ nước vọt gia tốc lớn. | $\le 5$ giây | Kích hoạt cảnh báo giọng nói và âm thanh khẩn cấp. Người lái tắp xe vào lề an toàn, tắt máy, gọi xe cứu hộ chuyển về xưởng. |
| **CAM (Cảnh báo)** | Xu hướng dữ liệu lệch khỏi đường cơ sở Baseline kéo dài liên tục $\ge 7$ ngày, hoặc 2 tín hiệu tiền trệu chứng cùng đồng thuận (bơm nước yếu, van hằng nhiệt kẹt nhẹ, misfire tăng dần). | $\ge 7$ ngày | Gửi thông báo đến ứng dụng di động của chủ xe và điều phối gói chẩn đoán từ xa đến garage đối tác để đặt lịch hẹn. |
| **VÀNG (Khuyến cáo)** | 1 tín hiệu đơn lẻ ghi nhận lệch nhẹ, mức tiêu hao nhiên liệu tăng trên $10\%$, hoặc áp suất lốp non nhẹ. | $\ge 14$ ngày | Lưu vết trong hồ sơ xe, hiển thị trong danh mục hạng mục cần kiểm tra tại kỳ bảo dưỡng kế tiếp. |

### Đánh giá độ tin cậy định tính (Qualitative Confidence)
Mỗi cảnh báo được xếp hạng mức độ chắc chắn dựa trên số lượng nguồn tín hiệu độc lập đồng thuận:
* **Mức độ Khẳng định (Độ tin cậy rất cao)**: Xác nhận bởi $\ge 3$ nguồn cảm biến độc lập (ví dụ kết hợp dữ liệu OBD2, mạch tap trực tiếp và cảm biến cấy thêm). Ngôn ngữ kỹ thuật dứt khoát: *"Phát hiện hư hỏng..."*.
* **Mức độ Cảnh báo cao (Độ tin cậy cao)**: Xác nhận bởi 2 nguồn cảm biến độc lập. Ngôn ngữ: *"Nghi ngờ cụm chi tiết đang suy giảm..."*.
* **Mức độ Theo dõi (Độ tin cậy trung bình)**: Xác nhận bởi 1 cảm biến đơn lẻ hoặc triệu chứng chưa đủ chu kỳ debounce. Ngôn ngữ: *"Có dấu hiệu dao động thông số, đề nghị theo dõi..."*.

---

## 🛠️ 4. Cẩm nang 17 nhóm hư hỏng tiềm ẩn mà ECU bỏ qua (F1 đến F17)

Dưới đây là cẩm nang chi tiết 17 nhóm bệnh cơ khí và nhiệt động học được xây dựng theo nguyên lý hợp nhất đa tín hiệu:

### F1. Gioăng quy lát suy yếu sớm (Head Gasket Pre-failure)
* **Cơ chế cơ khí**: Gioăng đệm giữa nắp máy (cylinder head) và thân máy (engine block) bị suy thoái vi mô do biến dạng nhiệt cục bộ hoặc lực siết bu-lông nắp máy không đều. Giai đoạn đầu, chỉ có vài mililít chất lỏng rò rỉ mỗi ngày giữa khoang áo nước làm mát, khoang dầu bôi trơn và buồng đốt. Khí nén buồng đốt lọt vào áo nước tạo bọt khí, trong khi nước làm mát thẩm thấu ngược vào buồng đốt qua đêm. Không có mã lỗi DTC nào được kích hoạt trên ECU.
* **Nguyên nhân gốc rễ**: Động cơ từng bị quá nhiệt nhẹ trong quá khứ, mặt máy bị vênh vi mô, dung dịch làm mát bị axit hóa ăn mòn lớp thép chèn gioăng, hoặc lực siết nắp máy sai kỹ thuật.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Mức nước làm mát* [Nguồn C - Cấy thêm]: Giảm dần liên tục theo tuần không rõ nguyên nhân (không thấy rò rỉ ướt gầm xe).
  2. *Chất lượng dầu động cơ (OQS)* [Nguồn C - Cấy thêm]: Hàm lượng ẩm hòa tan trong nhớt tăng cao bất thường ($> 0.3\%$).
  3. *Váng dầu trong nước làm mát* [Nguồn C - Cấy thêm]: Cảm biến quang học đáy bình phụ phát hiện màng dầu loang làm thay đổi độ tán xạ ánh sáng.
  4. *Bộ đếm bỏ lửa lúc máy nguội (Cold Misfire)* [Nguồn A - OBD2 Mode 06 MID 0xA1–0xC8]: Bỏ lửa tập trung tại 1 xi-lanh nhất định trong 60 giây đầu sau khởi động lạnh, sau đó biến mất khi máy đạt nhiệt độ làm việc.
  5. *Dao động cảm biến Oxy sau bầu xúc tác* [Nguồn A - OBD2 PID 0x15]: Xuất hiện xung điện áp bất thường lúc khởi động nguội do hơi nước đi qua bộ xúc tác.
  6. *Hiện tượng khói trắng ống xả* [Khách hàng ghi nhận]: Khói trắng mờ thoát ra sau khởi động nguội kéo dài trên 5 phút.
  7. *Đường cong làm nóng máy (ECT warming curve)* [Nguồn A / Nguồn B]: Thời gian đạt nhiệt độ vận hành chậm hơn bình thường do tổn thất nhiệt qua buồng đốt.
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Khi phát hiện đồng thời hiện tượng hao hụt nước làm mát kết hợp có váng dầu trong bình phụ và xuất hiện bỏ lửa lúc máy nguội $\implies$ Yêu cầu dừng xe kiểm tra gioăng quy lát ngay, tránh cong tay biên do thủy kích nhẹ.
  * **Cấp CAM (Cao)**: Xuất hiện bỏ lửa đơn xi-lanh lúc máy nguội kết hợp mức nước làm mát hao hụt chậm $\ge 2$ tuần liên tiếp $\implies$ Đưa xe vào garage kiểm tra áp suất nén và soi buồng đốt.
  * **Cấp VÀNG (Theo dõi)**: Thời gian làm nóng máy chậm kết hợp dao động nhẹ cảm biến oxy sau bầu xúc tác $\implies$ Ghi chú theo dõi trong đợt bảo dưỡng kế tiếp.

### F2. Bơm nước suy giảm hiệu suất (Water Pump Degradation)
* **Cơ chế cơ khí**: Cánh bơm nước (bằng nhựa tổng hợp hoặc kim loại) bị mòn mẻ, rỗ bề mặt do hiện tượng bọt khí xâm thực (cavitation), bạc đạn bơm bị rơ lắc hoặc dây đai cu-roa truyền động bị trượt nhẹ. Lưu lượng tuần hoàn nước làm mát qua lốc máy suy giảm, khiến khả năng tản nhiệt khi động cơ chịu tải nặng bị chậm nhịp dù nhiệt độ trung bình vẫn trong dải cho phép ($85 - 98^\circ\text{C}$).
* **Nguyên nhân gốc rễ**: Lão hóa cánh bơm nhựa sau thời gian dài sử dụng, dung dịch làm mát mất hoạt tính chống xâm thực, tăng đưa tự động chùng làm dây đai trượt ở tua máy cao.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Đáp ứng nhiệt độ ECT theo tải động cơ* [Nguồn A - OBD2 PID 0x05]: Ở cùng dải tải máy, tốc độ tăng nhiệt độ ECT diễn ra nhanh hơn baseline.
  2. *Tốc độ hạ nhiệt ECT sau khi ngắt tải* [Nguồn A - OBD2]: Khi xe giảm tốc hoặc dừng không tải (Idle), nhiệt độ ECT hạ chậm hơn bình thường.
  3. *Chênh áp thủy lực qua bơm nước* [Nguồn C - Cấy thêm]: Cảm biến chênh áp đo trước và sau bơm nước cho thấy áp lực đẩy tại 2.500 RPM sụt giảm so với đường cơ sở.
  4. *Tần suất kích hoạt quạt làm mát (Fan Duty Cycle)* [Nguồn A - OBD2 Mode 22]: Quạt gió phải quay liên tục hoặc duy trì tốc độ cao ở điều kiện tải thông thường.
  5. *Nhiệt độ cửa gió sưởi cabin* [Nguồn B / Nguồn C]: Gió ấm sưởi ấm chậm vào mùa lạnh do lưu lượng nước qua két sưởi bị nghẽn.
  6. *Phổ rung động thân bơm (FFT Vibration)* [Nguồn C - Cấy thêm]: Xuất hiện đỉnh rung động bất thường quanh tần số quay của trục bơm nước.
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Bơm nước suy giảm lưu lượng kết hợp xuất hiện triệu chứng rò rỉ gioăng quy lát (F1) hoặc nhiệt độ nước tăng vọt $\implies$ Nguy cơ quá nhiệt phá hủy động cơ tức thì.
  * **Cấp CAM (Cao)**: Chênh áp qua bơm nước sụt giảm rõ rệt, HOẶC đồng thời tốc độ tăng nhiệt theo tải nhanh và tốc độ hạ nhiệt sau ngắt tải chậm kéo dài $\ge 7$ ngày $\implies$ Lên lịch thay bơm nước và kiểm tra tăng đưa cu-roa.
  * **Cấp VÀNG (Theo dõi)**: Quạt giải nhiệt hoạt động với chu kỳ tải cao hơn baseline trong điều kiện thời tiết mát mẻ $\implies$ Kiểm tra độ căng dây đai và tình trạng cánh bơm.

### F3. Két nước làm mát bị tắc / Suy giảm tản nhiệt (Radiator Clogging)
* **Cơ chế cơ khí**: Lòng ống tản nhiệt bằng đồng/nhôm bị đóng cặn khoáng bên trong làm hẹp tiết diện dòng chảy; hoặc các nan nhôm tản nhiệt bên ngoài bị bám kín bùn đất, cát, xác côn trùng sau các chuyến đi địa hình. Nhiệt lượng không thể giải phóng kịp thời ra môi trường không khí.
* **Nguyên nhân gốc rễ**: Sử dụng nước sinh hoạt nhiều canxi châm két nước sinh cặn vôi, không xịt rửa dàn tản nhiệt sau khi off-road, các lá tản nhiệt bị móp méo do đá văng.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Đáp ứng ECT khi quạt làm mát quay* [Nguồn A - OBD2]: Quạt làm mát quay hết công suất nhưng nhiệt độ ECT giảm rất ít hoặc không hạ.
  2. *Độ chênh nhiệt độ ngõ vào và ngõ ra két nước ($\Delta T = T_{\text{in}} - T_{\text{out}}$)* [Nguồn C - Cấy thêm 2 cảm biến NTC]: Chênh lệch nhiệt độ giữa ống nước trên và ống nước dưới nhỏ hơn $5^\circ\text{C}$ khi xe chịu tải cao (bình thường đạt $8 - 15^\circ\text{C}$).
  3. *Nhiệt độ ECT khi nổ máy tại chỗ* [Nguồn A + GPS]: Đỗ xe tại chỗ $> 5$ phút nhiệt độ tăng vọt do mất đối lưu cưỡng bức.
  4. *Tương quan tải điều hòa (A/C Condenser load)* [Nguồn A - OBD2]: Khi bật điều hòa A/C, nhiệt độ ECT tăng vọt do giàn nóng phả nhiệt sang két nước bị bít tắc.
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Khi quạt quay tối đa kết hợp bật điều hòa mà nhiệt độ ECT tiệm cận ngưỡng sôi $\implies$ Dừng xe xịt rửa sơ bộ dàn tản nhiệt hoặc gọi cứu hộ.
  * **Cấp CAM (Cao)**: Chênh lệch nhiệt độ vào/ra két nước $\Delta T < 5^\circ\text{C}$ dưới tải cao kết hợp nhiệt độ ECT hạ rất chậm khi quạt chạy $\implies$ Đưa xe vào garage súc rửa xúc tác lòng két nước hoặc vệ sinh nan nhôm ngoài.
  * **Cấp VÀNG (Theo dõi)**: Nhiệt độ ECT tăng nhẹ khi bật A/C lúc dừng đèn đỏ kéo dài $\implies$ Vệ sinh xịt rửa giàn nóng và giàn tản nhiệt trong kỳ bảo dưỡng.

### F4. Quá nhiệt dự đoán (Predictive Overheating)
* **Cơ chế cơ khí**: Cân bằng nhiệt động học bị phá vỡ đột ngột. Nhiệt độ nước làm mát tăng với gia tốc lớn. Nếu kỹ thuật viên và lái xe chờ đèn cảnh báo nhiệt độ của xe bật sáng ($> 115^\circ\text{C}$) thì động cơ đã bước vào vùng nguy hiểm (cong vênh mặt máy, bó kẹt xéc-măng). Cần thuật toán ngoại suy gia tốc nhiệt để cảnh báo trước 3–5 phút.
* **Nguyên nhân gốc rễ**: Bục vỡ ống mềm dẫn nước làm mát, kẹt van hằng nhiệt ở vị trí đóng hoàn toàn, rơ-le quạt làm mát chết đột ngột khi đang chạy tải cao.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Nhiệt độ nước làm mát tuyệt đối (ECT)* [Nguồn A - OBD2 PID 0x05].
  2. *Gia tốc tăng nhiệt độ $\Delta ECT / \Delta t$* [Nguồn A - Đạo hàm tốc độ biến thiên nhiệt theo phút].
  3. *Bù trừ nhiệt độ môi trường & độ cao* [Nguồn A PID 0x46 + GPS Độ cao]: Mật độ không khí loãng ở vùng núi cao làm giảm khả năng làm mát tự nhiên.
  4. *Ngữ cảnh tải động cơ* [Nguồn A - OBD2 PID 0x0C RPM $\times$ PID 0x11 TPS]: Phân biệt giữa tăng nhiệt do kéo tải leo dốc bình thường và tăng nhiệt bất thường khi tải nhẹ.
  5. *Cảm biến mức nước làm mát bình phụ* [Nguồn C - Cấy thêm].
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Nhiệt độ ECT đạt mức cao kết hợp gia tốc tăng nhiệt $\Delta ECT / \Delta t \ge 1.0^\circ\text{C}/\text{phút}$ liên tục khi động cơ đang chạy tải trung bình hoặc thấp $\implies$ Cảnh báo giọng nói khẩn cấp: *"Nhiệt độ máy tăng nhanh bất thường, nguy cơ quá nhiệt trong 3 phút, tấp vào lề an toàn ngay"*.
  * **Cấp CAM (Cao)**: Nhiệt độ ECT tiệm cận mức cảnh báo khi tải cao kéo dài kết hợp mức nước làm mát bình phụ sụt giảm $\implies$ Giảm tải vận hành, tắt điều hòa và theo dõi sát sao.
  * **Cấp VÀNG (Theo dõi)**: Xe chở tải leo dốc liên tục khiến nhiệt độ nước tăng tạm thời $\implies$ Phát thông báo nhắc người lái duy trì dải số hợp lý để giảm tải nhiệt.

### F5. Mất áp suất dầu bôi trơn tịnh tiến (Progressive Oil Pressure Decay)
* **Cơ chế cơ khí**: Áp suất dầu nhớt trong đường sinh đạo chính suy giảm dần theo thời gian do bơm nhớt bị mài mòn, khe hở các ổ trượt (bạc biên, bạc cổ trục khuỷu) bị nới rộng, lò xo van điều áp bị nhão hoặc nghẹt lưới hút đáy cacte. Công tắc áp suất dầu nguyên bản của xe chỉ bật đèn khi áp suất rơi dưới 0.3 bar — thời điểm các chi tiết cơ khí đã bị cào xước kim loại nghiêm trọng.
* **Nguyên nhân gốc rễ**: Bạc lót ổ trục bị mòn cơ học, cặn bùn nhớt (sludge) làm nghẹt phin lọc và lưới lọc, dầu nhớt bị thoái hóa loãng, bơm dầu suy giảm lưu lượng.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Áp suất dầu tại tua không tải khi máy nóng (Hot Idle Oil Pressure)* [Nguồn C - Cấy cảm biến áp dầu 0-10 bar]: Giảm dần theo xu hướng nhiều tuần.
  2. *Áp suất dầu tại dải tua máy cao (2.000 - 3.000 RPM)* [Nguồn C].
  3. *Nhiệt độ dầu động cơ (Engine Oil Temp)* [Nguồn A PID 0x5C / Nguồn C]: Đối chiếu để loại trừ trường hợp dầu loãng do nhiệt độ quá cao.
  4. *Tín hiệu cảm biến kích nổ (Knock Sensor)* [Nguồn B - Tap trực tiếp qua bộ lọc dải 6-8 kHz]: Xuất hiện xung rung kim loại khi bạc biên bị lỏng khe hở.
  5. *Độ dốc tương quan áp suất theo vòng tua (RPM vs Oil Pressure Slope)* [Nguồn C + A].
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Áp suất dầu nhớt rơi xuống dưới $0.5\text{ bar}$ khi máy đang nổ ở dải tua trên không tải, HOẶC áp suất dầu thấp kết hợp cảm biến kích nổ phát hiện xung va đập cơ khí kim loại $\implies$ Tắt máy ngay lập tức, nguy cơ lột dớn bó máy.
  * **Cấp CAM (Cao)**: Áp suất dầu tại chế độ không tải máy nóng sụt giảm sâu so với đường cơ sở baseline qua 30 ngày theo dõi $\implies$ Đưa xe vào xưởng đo áp suất cơ học, kiểm tra phin lọc dầu và bơm dầu.
  * **Cấp VÀNG (Theo dõi)**: Áp suất dầu giảm nhẹ liên quan đến dầu bôi trơn đã sử dụng quá thời hạn khuyến nghị $\implies$ Nhắc nhở thay dầu động cơ và lọc nhớt mới.

### F6. Hao hụt dầu bôi trơn chậm & Rò rỉ dầu (Slow Oil Consumption / Leakage)
* **Cơ chế cơ khí**: Dầu nhớt động cơ bị suy hao dần qua thời gian do rò rỉ qua các phớt cao su (phớt đầu/đuôi trục cơ, gioăng giàn cò, gioăng cacte); hoặc dầu lọt vào buồng đốt qua phớt gít xúp-páp bị chai cứng hoặc khe hở xéc-măng mòn, bị đốt cháy cùng hòa khí.
* **Nguyên nhân gốc rễ**: Xéc-măng dầu bị kẹt cặn carbon, xước thành xi-lanh, chai phớt gít xúp-páp, van thông khí hộp trục khuỷu (PCV Valve) bị kẹt mở hút dầu vào cổ hút.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Mức dầu động cơ sau mỗi chuyến đi* [Nguồn C - Cảm biến mức dầu Hella QLT đo sau khi tắt máy đỗ phẳng 5 phút].
  2. *Tỷ lệ tiêu hao dầu tính trên quãng đường ($L/1.000\text{km}$)* [Tính toán qua dữ liệu cảm biến mức].
  3. *Hiện tượng khói xanh lam tại ống xả* [Khách hàng ghi nhận].
  4. *Chỉ số hiệu chỉnh hòa khí dài hạn (LTFT)* [Nguồn A - OBD2 PID 0x07]: LTFT có xu hướng âm (phun ít xăng lại) do dầu bôi trơn lọt vào buồng đốt làm giàu hòa khí.
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Mức dầu động cơ sụt giảm nghiêm trọng trong một chuyến đi duy nhất kết hợp áp suất dầu bôi trơn dao động $\implies$ Rò rỉ dầu cấp tính (bục phớt hoặc nứt đáy cacte), dừng xe kiểm tra ngay.
  * **Cấp CAM (Cao)**: Tỷ lệ tiêu hao dầu vượt ngưỡng khuyến nghị của nhà sản xuất kết hợp khói xanh ống xả và chỉ số LTFT âm sâu $\implies$ Xéc-măng hoặc phớt gít xúp-páp đã mòn, lên lịch đại tu phần nắp máy hoặc đáy máy.
  * **Cấp VÀNG (Theo dõi)**: Mức dầu hao hụt chậm nhưng không có khói xanh và không có dầu trong nước $\implies$ Kiểm tra thấm dầu tại các bề mặt gioăng nắp giàn cò và phớt trục cơ.

### F7. Hộp số tự động quá nhiệt & Trượt ly hợp biến mô (AT Overheating & Slip)
* **Cơ chế cơ khí**: Khi xe chở nặng, kéo rơ-moóc hoặc chạy cát lầy, dầu hộp số tự động (ATF) bị quá nhiệt làm loãng màng dầu, giảm áp lực ép của các đĩa ly hợp. Bộ ly hợp khóa biến mô (Torque Converter Clutch - TCC) bị trượt, sinh ra ma sát trượt làm nhiệt độ ATF vọt lên cao hơn nữa theo vòng lặp nhiệt phá hủy.
* **Nguyên nhân gốc rễ**: Két làm mát dầu hộp số bị nghẹt, dầu ATF quá hạn sử dụng bị oxy hóa, van điện từ Solenoid điều khiển áp suất dầu hộp số bị kẹt mạt kim loại, mòn đĩa ma sát.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Nhiệt độ dầu hộp số tự động (TFT - Transmission Fluid Temp)* [Nguồn A - OBD2 Mode 22 hãng / Nguồn C - NTC trên đường dầu hồi].
  2. *Tỷ lệ trượt khi khóa biến mô (Slip Ratio)* [Nguồn A - OBD2]: Chênh lệch giữa vòng tua máy (Input RPM) và vòng tua trục sơ cấp hộp số sau khi đã kích hoạt Lock-up.
  3. *Thời gian chuyển số (Shift Duration)* [Nguồn A - OBD2]: Thời gian hụt ga và đồng tốc khi nhảy số kéo dài hơn bình thường.
  4. *Độ giật khi sang số (Shift Jerk)* [Nguồn C - Cảm biến gia tốc 3 trục]: Biên độ xung gia tốc dọc khi sang số tăng cao do ly hợp bắt không mượt.
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Tỷ lệ trượt ly hợp biến mô vượt quá giới hạn an toàn khi xe đang duy trì tốc độ cao kết hợp nhiệt độ dầu hộp số $\text{TFT} > 125^\circ\text{C}$ $\implies$ Dừng xe nghỉ 15 phút, tránh cháy hoàn toàn cụm biến mô và các lá côn số tự động.
  * **Cấp CAM (Cao)**: Tỷ lệ trượt ly hợp xuất hiện đều đặn khi khóa biến mô kết hợp thời gian chuyển số kéo dài $\ge 50\%$ so với baseline $\implies$ Đưa xe vào garage kiểm tra cụm van Solenoid và thay dầu hộp số tuần hoàn.
  * **Cấp VÀNG (Theo dõi)**: Độ giật khi sang số tăng nhẹ hoặc nhiệt độ dầu hộp số tiệm cận ngưỡng cảnh báo khi leo đèo $\implies$ Kiểm tra mức dầu hộp số và vệ sinh két làm mát dầu ATF.

### F8. Turbo tăng áp suy giảm hiệu suất (Turbocharger Degradation)
* **Cơ chế cơ khí**: Bạc thau đỡ trục turbo hoặc vòng bi ceramic bị rơ lỏng do thiếu dầu bôi trơn hoặc dầu bẩn; cánh tuốc-bin nạp/xả bị mẻ hoặc bám muội than dày; cơ cấu điều khiển cánh biến thiên (VGT/VNT) hoặc van xả áp (Wastegate) bị kẹt rỉ sét. Hậu quả là áp suất nạp không đạt mức thiết kế và hiện tượng trễ ga (Turbo lag) gia tăng rõ rệt.
* **Nguyên nhân gốc rễ**: Muội than bám kẹt cơ cấu cánh biến thiên, rò rỉ đường ống gió nạp và két làm mát khí nạp (Intercooler), rách màng actuator điều khiển áp nạp, phớt chặn dầu turbo bị mòn làm lọt dầu vào đường nạp.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Áp suất nạp thực tế so với mục tiêu (Actual Boost vs Target Boost)* [Nguồn A - OBD2 PID 0x70 & Mode 22].
  2. *Thời gian đáp ứng áp nạp (Turbo Lag Duration)* [Nguồn A - OBD2]: Thời gian từ lúc đạp thốc ga ($> 80\%$ TPS) đến khi đạt $80\%$ Boost định mức.
  3. *Áp suất dầu bôi trơn tại dải tua máy cao* [Nguồn C - Cấy thêm]: Giám sát nguồn cấp dầu nuôi trục turbo.
  4. *Mức tiêu hao dầu động cơ kết hợp suy giảm áp nạp* [Tương quan F6 + F8]: Dấu hiệu phớt chặn dầu turbo bị rách khiến turbo hút dầu động cơ vào buồng đốt.
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Áp suất nạp sụt giảm nghiêm trọng kết hợp mức tiêu hao dầu máy tăng vọt và xuất hiện khói xả mù mịt $\implies$ Phớt dầu turbo đã vỡ, nguy cơ động cơ tự nuốt dầu gây hiện tượng mất kiểm soát tua máy (Diesel Runaway), dừng máy ngay lập tức.
  * **Cấp CAM (Cao)**: Áp suất nạp thực tế không đạt mục tiêu khi đạp lút chân ga liên tục qua nhiều hành trình kết hợp độ trễ tăng áp kéo dài $\ge 30\%$ $\implies$ Kiểm tra rò rỉ đường ống Intercooler, vệ sinh cơ cấu cánh VGT và kiểm tra độ rơ trục turbo.
  * **Cấp VÀNG (Theo dõi)**: Thời gian đáp ứng áp nạp hơi trễ nhẹ ở dải tua thấp $\implies$ Kiểm tra tình trạng muội than bám van điều khiển áp nạp.

### F9. Bầu lọc khí thải xúc tác lão hóa (Catalytic Converter Aging)
* **Cơ chế cơ khí**: Lớp phủ kim loại quý (Platin, Paladi, Rodi) trên tổ ong gốm của bầu xúc tác bị suy giảm hoạt tính hóa học hoặc bị đầu độc (bởi chì, lưu huỳnh, phốt-pho trong nhớt lọt buồng đốt), làm mất khả năng oxy hóa CO, HC và khử NOx. ECU thường chỉ đặt mã P0420 khi hiệu suất bầu xúc tác đã giảm sâu dưới $90\%$.
* **Nguyên nhân gốc rễ**: Tuổi thọ tự nhiên của xe, hòa khí quá đậm kéo dài khiến xăng sống cháy trong bầu làm nóng chảy tổ ong gốm, nhớt máy lọt buồng đốt bám bẩn bề mặt xúc tác.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Tương quan tín hiệu cảm biến Oxy trước và sau bầu xúc tác (Pre/Post O2 Correlation)* [Nguồn A - OBD2 PID 0x14 & 0x15 lấy mẫu tần số 5Hz].
  2. *Biên độ dao động điện áp của cảm biến O2 sau bầu xúc tác (Post-cat Dithering Amplitude)* [Nguồn A - OBD2]: Bình thường điện áp cảm biến sau phẳng ($< 50\text{mV}$); khi bầu lão hóa, dạng sóng nhấp nhô bám sát cảm biến trước.
  3. *Dữ liệu giám sát kiểm tra định kỳ Mode 06* [Nguồn A - OBD2 Mode 06 MID 0x01].
  4. *Lịch sử tỷ lệ hòa khí đậm kéo dài (LTFT)* [Nguồn A - OBD2].
* **Ma trận điều kiện logic định tính**:
  * **Cấp CAM (Cao)**: Dạng sóng điện áp cảm biến O2 sau bầu xúc tác dao động đồng pha với cảm biến O2 trước bầu kéo dài liên tục $\ge 14$ ngày kết hợp kết quả kiểm tra Mode 06 tiệm cận ngưỡng trượt $\implies$ Bầu lọc xúc tác sắp hỏng hoàn toàn, sẽ kích hoạt đèn Check Engine P0420 và trượt kiểm định khí thải.
  * **Cấp VÀNG (Theo dõi)**: Biên độ gợn sóng cảm biến O2 sau bầu tăng nhẹ sau các hành trình xe chạy hòa khí giàu $\implies$ Kiểm tra nguyên nhân dư xăng và chất lượng bugi đánh lửa.

### F10. Cảm biến oxy phản ứng chậm (Lambda / O2 Sensor Lazy)
* **Cơ chế cơ khí**: Cảm biến oxy nung nóng (Narrowband Zirconia) bị bám muội than hoặc lớp gốm bị nhiễm độc silicon, làm chậm tốc độ khuếch tán ion oxy qua màng bán dẫn. Thời gian chuyển trạng thái giàu/nghèo bị kéo dài khiến ECU phản hồi phun xăng chậm nhịp, làm tăng tiêu hao nhiên liệu $5 - 10\%$ mà không bật đèn báo lỗi.
* **Nguyên nhân gốc rễ**: Cảm biến hoạt động quá số km khuyến cáo ($> 100.000\text{ km}$), cặn phụ gia xăng hoặc muội than bám muội đầu dò.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Tần số đảo trạng thái điện áp (Switching Frequency)* [Nguồn A - OBD2 PID 0x14]: Đếm số chu kỳ đảo pha giữa giàu ($> 0.7\text{V}$) và nghèo ($< 0.3\text{V}$) trong 60 giây.
  2. *Thời gian đáp ứng tín hiệu khi thốc ga (Response Time)* [Nguồn A - OBD2]: Thời gian từ lúc bướm ga mở rộng đến khi cảm biến đạt điện áp giàu ổn định.
  3. *Biên độ dải điện áp làm việc (Operating Voltage Range)* [Nguồn A - OBD2].
* **Ma trận điều kiện logic định tính**:
  * **Cấp CAM (Cao)**: Tần số đảo trạng thái sụt giảm nghiêm trọng kéo dài $\ge 14$ ngày kết hợp thời gian đáp ứng khi thốc ga bị trễ trên 2 giây $\implies$ Thay cảm biến oxy trước bầu xúc tác để phục hồi độ bốc và tiết kiệm nhiên liệu.
  * **Cấp VÀNG (Theo dõi)**: Dải điện áp làm việc bị thu hẹp nhẹ ở dải tua cầm chừng $\implies$ Vệ sinh đầu dò cảm biến hoặc kiểm tra chất lượng nhiên liệu.

### F11. Xu hướng bỏ lửa ngầm — Bobine & Bugi suy giảm (Misfire Trending)
* **Cơ chế cơ khí**: Bugi bị mòn điện cực làm tăng khe hở đánh lửa; thân sứ bugi bị nứt rò tia lửa; cuộn dây bobine đánh lửa bị rò điện cao áp qua vỏ cao su nứt nẻ; hoặc đầu kim phun bị nghẹt tia. Quá trình bỏ lửa chỉ xảy ra ngắt quãng khi động cơ chịu tải nặng hoặc lúc khởi động nguội, chưa đủ số lượng vòng quay để ECU kích hoạt mã lỗi P0300/P030X.
* **Nguyên nhân gốc rễ**: Bugi quá hạn sử dụng, cao su chụp bugi bị lão hóa chai cứng, cách điện cuộn dây bobine bị suy giảm khi nhiệt độ khoang máy tăng cao.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Bộ đếm số lần bỏ lửa theo từng xi-lanh riêng biệt (Misfire Count per Cylinder)* [Nguồn A - OBD2 Mode 06 MID 0xA1 đến MID 0xC8].
  2. *Xu hướng gia tăng misfire trên một xi-lanh cụ thể theo dõi qua 7 ngày* [Nguồn A - OBD2].
  3. *Tần suất bỏ lửa dưới điều kiện tải cao (WOT hoặc lên dốc)* [Nguồn A - OBD2].
  4. *Tần suất bỏ lửa trong 60 giây đầu sau khởi động lạnh (Cold Start)* [Nguồn A - OBD2].
  5. *Tương quan pha giữa cảm biến kích nổ và biến thiên vận tốc góc trục khuỷu* [Nguồn B - Tap Crankshaft/Camshaft + Knock Sensor].
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Hiện tượng bỏ lửa xảy ra với tần suất dồn dập trên một xi-lanh kéo dài liên tục trên hành trình $\implies$ Xăng sống xả trực tiếp vào ống xả sẽ làm bốc cháy và nóng chảy bầu lọc xúc tác khí thải, yêu cầu dừng xe kiểm tra bobine/bugi.
  * **Cấp CAM (Cao)**: Bộ đếm Mode 06 ghi nhận số lần bỏ lửa của một xi-lanh cụ thể tăng đột biến qua 7 ngày (đặc biệt khi đạp ga tải nặng) $\implies$ Thay thế cuộn bobine và bugi của xi-lanh tương ứng.
  * **Cấp VÀNG (Theo dõi)**: Xuất hiện hiện tượng bỏ lửa rải rác trong vài giây đầu khởi động lạnh sau đó hết $\implies$ Kiểm tra vệ sinh kim phun và đo khe hở điện cực bugi.

### F12. Bơm xăng yếu / Hệ thống nhiên liệu suy giảm (Fuel Supply Degradation)
* **Cơ chế cơ khí**: Bơm xăng trong thùng bị mài mòn cánh bơm hoặc mòn cổ góp chổi than motor điện, lưới lọc thô đáy bơm hoặc lọc tinh nhiên liệu bị nghẹt cặn bẩn, van điều áp dàn phun bị rò rỉ. Khi xe chạy đều tốc độ thấp, lưu lượng xăng vẫn đủ duy trì áp suất; nhưng khi đạp thốc ga tăng tốc ở tua cao, áp suất dàn phun bị sụt lún nghiêm trọng khiến hòa khí bị nghèo tức thì.
* **Nguyên nhân gốc rễ**: Thói quen thường xuyên chạy cạn bình xăng làm bơm nóng và hút cặn đáy bình, lọc xăng không thay định kỳ, van hồi dầu/áp suất bị lỏng lò xo.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Áp suất dàn phun thực tế so với áp suất yêu cầu (Fuel Rail Pressure vs Target)* [Nguồn A - OBD2 Mode 22].
  2. *Hệ số hiệu chỉnh nhiên liệu dài hạn (LTFT)* [Nguồn A - OBD2 PID 0x07]: LTFT tăng dương cao ($> +12\%$) và càng tăng mạnh khi động cơ hoạt động ở dải tải cao.
  3. *Dòng điện tiêu thụ của motor bơm nhiên liệu* [Nguồn B - Tap dây nguồn bơm qua cảm biến dòng Hall].
  4. *Điện áp cảm biến Oxy bị kẹt ở trạng thái nghèo khi mở bướm ga hết cỡ (O2 Stuck Lean at WOT)* [Nguồn A - OBD2 PID 0x14].
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Áp suất dàn phun tụt sâu dưới ngưỡng yêu cầu khi xe đang tăng tốc vượt xe kết hợp cảm biến oxy bị kẹt ở trạng thái nghèo $\implies$ Nguy cơ kích nổ phá hủy đỉnh piston do hòa khí quá nghèo, hạn chế đạp ga sâu và đến xưởng kiểm tra ngay.
  * **Cấp CAM (Cao)**: Chỉ số LTFT dương cao liên tục và tăng mạnh theo dải tải kết hợp dòng điện bơm xăng lệch chuẩn $\implies$ Lọc xăng bị nghẹt hoặc motor bơm xăng suy yếu, lên lịch thay thế cụm bơm và lọc nhiên liệu.
  * **Cấp VÀNG (Theo dõi)**: Chỉ số LTFT dương nhẹ ở dải tua trung bình $\implies$ Kiểm tra tình trạng cặn bẩn thùng nhiên liệu và kim phun.

### F13. Suy giảm sức khỏe Ắc quy (SOC/SOH) & Máy phát điện sạc yếu
* **Cơ chế cơ khí**: Bản cực ắc quy bị sun-fat hóa làm suy giảm dung lượng tích trữ thực tế (SOH) và tăng nội trở trong; hoặc máy phát điện bị mòn chổi than, cháy đứt 1 nhánh diode cầu chỉnh lưu khiến dòng nạp không bù đủ điện năng tiêu thụ của xe.
* **Nguyên nhân gốc rễ**: Ắc quy sử dụng quá tuổi thọ thiết kế, xe đỗ lâu ngày bị dòng rò phóng kiệt bình, dây curoa dẫn động máy phát bị chùng trượt, diode máy phát bị quá nhiệt đánh thủng.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Độ sụt áp cực tiểu khi đề nổ (Cranking Voltage Drop)* [Nguồn A - OBD2 PID 0x42 / Nguồn C - Hella IBS].
  2. *Thời gian kéo dài quá trình khởi động máy đề (Cranking Duration)* [Nguồn A / Nguồn B].
  3. *Điện áp nghỉ của bình ắc quy đo sau khi tắt khóa điện 30 phút (Resting Voltage)* [Nguồn C - Cấy thêm].
  4. *Dòng rò ký sinh khi xe tắt khóa điện hoàn toàn (Parasitic Drain Current)* [Nguồn C - Cảm biến Shunt / Hella IBS].
  5. *Điện áp sạc của máy phát khi động cơ đang nổ* [Nguồn A - OBD2 PID 0x42]: Bình thường $13.8 - 14.8\text{V}$; cảnh báo khi sạc yếu hoặc quá áp làm sôi bình.
  6. *Biên độ gợn sóng xoay chiều của điện áp sạc (AC Ripple Voltage)* [Nguồn C - Cấy thêm]: Giám sát hư hỏng của cầu diode chỉnh lưu trong máy phát điện.
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Điện áp sạc của máy phát vọt quá cao ($> 15.2\text{V}$) gây nguy cơ cháy nổ hộp đen và sôi bình ắc quy, HOẶC điện áp khi đề sụt sâu khiến xe có nguy cơ nằm đường không thể khởi động lại $\implies$ Xử lý hệ thống nạp và thay bình ngay.
  * **Cấp CAM (Cao)**: Độ sụt áp khi đề nổ gia tăng liên tục qua 30 ngày kết hợp thời gian đề kéo dài, HOẶC dòng rò ký sinh khi tắt khóa xe vượt ngưỡng cho phép $\implies$ Thay ắc quy mới hoặc dò tìm thiết bị gắn thêm làm rò điện.
  * **Cấp VÀNG (Theo dõi)**: Gợn sóng AC của điện áp sạc xuất hiện biên độ nhỏ $\implies$ Cầu diode máy phát có dấu hiệu lão hóa, kiểm tra trong đợt bảo dưỡng máy phát.

### F14. Hệ thống phanh suy giảm — Mất dầu phanh, ABS, mòn đĩa phanh
* **Cơ chế cơ khí**: Dầu phanh bị hút ẩm qua thời gian làm giảm nhiệt độ sôi, dễ sinh bọt khí (hiện tượng Khóa hơi - Vapor Lock) khi rà phanh liên tục đổ đèo gây tụt bàn đạp phanh; cup-pen xilanh phanh bánh xe bị rò rỉ làm vơi dầu; má phanh mòn trơ xương kim loại hoặc đĩa phanh bị cong vênh nhiệt làm giảm hiệu lực phanh.
* **Nguyên nhân gốc rễ**: Không thay dầu phanh định kỳ sau 2 năm, rò rỉ các khớp nối ống dầu phanh mềm, má phanh kém chất lượng, cảm biến tốc độ bánh xe ABS bị bám mạt sắt.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Trạng thái công tắc báo mức dầu phanh tại bình dầu tổng* [Nguồn B - Tap công tắc sẵn có].
  2. *Mã lỗi chẩn đoán mô-đun phanh điện tử ABS/ESP* [Nguồn A - OBD2 qua giao thức UDS ISO 14229].
  3. *Độ ẩm trong dầu phanh (Brake Fluid Moisture)* [Nguồn C - Cấy thêm cảm biến điện dung].
  4. *Gia tốc giảm tốc cực đại khi phanh xe (Max Deceleration Rate)* [Nguồn C - Cảm biến gia tốc trục dọc].
  5. *Độ tương quan vận tốc giữa 4 bánh xe khi đạp phanh (Individual Wheel Speeds)* [Nguồn A - OBD2 Mode 22].
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Công tắc mức dầu phanh kích hoạt trạng thái cạn dầu, HOẶC xuất hiện mã lỗi chấp hành hệ thống phanh ABS/ESP khi đang di chuyển $\implies$ Cảnh báo dừng xe an toàn, không tiếp tục lưu thông để phòng tránh mất phanh hoàn toàn.
  * **Cấp CAM (Cao)**: Độ ẩm trong dầu phanh vượt ngưỡng an toàn ($> 3\%$) kết hợp quãng đường phanh dài hơn baseline $\implies$ Thay dầu phanh và xả gió hệ thống phanh toàn bộ 4 bánh xe.
  * **Cấp VÀNG (Theo dõi)**: Tốc độ bánh xe có độ lệch nhỏ khi rà phanh nhẹ $\implies$ Kiểm tra độ mòn má phanh và vệ sinh vành răng cảm biến ABS.

### F15. Lọc gió động cơ bị tắc / Rò rỉ đường khí nạp (Intake System Fault)
* **Cơ chế cơ khí**: Tấm lọc gió nạp bị đất cát bám kín làm cản trở lưu lượng gió nạp ở dải tua máy cao, gây thiếu khí nạp và tiêu tốn nhiên liệu; hoặc đường ống cao su hút gió sau cảm biến MAF bị nứt thủng, hở gioăng cổ hút khiến không khí chưa qua đo lường lọt thẳng vào buồng đốt, làm sai lệch hòa khí xăng/gió.
* **Nguyên nhân gốc rễ**: Đi đường nhiều bụi bặm không vệ sinh lọc gió, ống mềm dẫn khí nạp bị lão hóa nứt vỡ hoặc chuột cắn, hở gioăng chân cổ nạp.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Lưu lượng khí nạp cực đại MAF ($g/s$) khi đạp hết chân ga WOT* [Nguồn A - OBD2 PID 0x10].
  2. *Áp suất tuyệt đối đường nạp MAP tại chế độ cầm chừng không tải (Idle MAP)* [Nguồn A - OBD2 PID 0x0B].
  3. *Độ chênh lệch giữa giá trị hiệu chỉnh nhiên liệu dài hạn LTFT ở chế độ không tải so với khi tải cao (LTFT Idle vs WOT)* [Nguồn A - OBD2 PID 0x07 & 0x06].
  4. *Mức tiêu hao nhiên liệu trung bình ($L/100\text{km}$) gia tăng bất thường* [Nguồn A + GPS].
* **Ma trận điều kiện logic định tính**:
  * **Cấp CAM (Cao)**: Lưu lượng khí nạp MAF cực đại khi đạp lút ga sụt giảm sâu so với đường cơ sở kết hợp chỉ số tiêu hao nhiên liệu tăng cao $\implies$ Lọc gió nạp bị tắc bùn/bụi nặng, cần vệ sinh hoặc thay mới tấm lọc.
  * **Cấp CAM (Cao - Rò rỉ)**: Giá trị LTFT ở chế độ cầm chừng dương cao bất thường nhưng về bình thường khi chạy tua cao $\implies$ Hở gioăng cổ hút hoặc nứt rách đường ống nạp sau cảm biến đo gió.
  * **Cấp VÀNG (Theo dõi)**: Áp suất MAP tại chế độ cầm chừng hơi cao hơn baseline $\implies$ Vệ sinh họng hút và bướm ga điện tử.

### F16. Nhiễm chéo nước làm mát lẫn dầu nhớt chiều ngược (Oil/Coolant Cross-Contamination)
* **Cơ chế cơ khí**: Két làm mát dầu động cơ/hộp số (Oil Cooler) bị ăn mòn thủng vách ngăn hoặc gioăng sinh hàn bị rách, cho phép nhớt máy áp suất cao thẩm thấu vào đường nước làm mát tạo thành lớp váng màu cà phê sữa bám kín bình nước phụ; hoặc nước giải nhiệt lọt vào cacte làm hỏng độ nhớt của màng dầu bôi trơn.
* **Nguyên nhân gốc rễ**: Sử dụng nước làm mát kém phẩm cấp ăn mòn thủng két sinh hàn nhôm, rách gioăng bộ sinh hàn dầu, nứt vách áo nước thân máy.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Tín hiệu cảm biến quang học phát hiện váng dầu trong bình nước phụ* [Nguồn C - Cấy cảm biến quang học phản xạ LED + Photodiode].
  2. *Mức nước trong bình giải nhiệt phụ dâng cao bất thường sau hành trình dài* [Nguồn C - Cảm biến mức nước].
  3. *Độ tăng vọt bất thường của nhiệt độ ECT ngay vài giây đầu sau khởi động nguội* [Nguồn A - OBD2 PID 0x05].
  4. *Dao động xung áp suất trong bình giải nhiệt phụ do khí buồng đốt lọt qua* [Nguồn C - Cấy thêm cảm biến áp suất áo nước].
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Cảm biến quang ghi nhận váng dầu xuất hiện dày đặc trong bình nước phụ kết hợp mức nước làm mát dâng trào bất thường $\implies$ Thủng két sinh hàn dầu làm mát, dừng vận hành ngay để tránh dầu làm nở hỏng toàn bộ đường ống cao su và mất bôi trơn động cơ.
  * **Cấp CAM (Cao)**: Cảm biến quang phát hiện dấu hiệu váng dầu ban đầu kết hợp xung áp suất nước giải nhiệt tăng nhẹ $\implies$ Đưa xe vào garage tháo kiểm tra bộ sinh hàn dầu và súc rửa hệ thống làm mát.
  * **Cấp VÀNG (Theo dõi)**: Nhiệt độ ECT có xung dao động nhẹ sau khởi động $\implies$ Kiểm tra trực quan nắp bình nước phụ trong kỳ bảo dưỡng.

### F17. Rung động cơ khí bất thường — Mòn bạc lót trục cơ, bạc biên, mất cân bằng động (Abnormal Mechanical Vibration)
* **Cơ chế cơ khí**: Các bề mặt trượt kim loại của trục khuỷu, thanh truyền (bạc lót tay biên, bạc balie) bị mòn lớp hợp kim chịu lực Babit, làm khe hở bôi trơn tăng vượt giới hạn cho phép. Va đập kim loại xuất hiện theo tần số quay của trục máy, tạo ra các họa tần rung động đặc trưng (Harmonics) trước khi động cơ bị lột dớn hoặc cong gãy thanh truyền.
* **Nguyên nhân gốc rễ**: Động cơ từng bị thiếu dầu hoặc mất áp suất dầu, dầu nhớt lẫn mạt kim loại, siết sai lực bu-lông chân máy, mất cân bằng động bánh đà hoặc puly trục cơ.
* **Tín hiệu cảm biến cần đo kiểm**:
  1. *Phổ phân tích Fourier nhanh (FFT Spectrum)* [Nguồn C - Cảm biến gia tốc 3 trục dải thông cao $\ge 5\text{ kHz}$ gắn trên thân động cơ].
  2. *Bản đồ biên độ rung động RMS theo dải vòng tua máy (Vibration Amplitude vs Engine RPM)* [Nguồn C].
  3. *Tương quan đồng pha giữa cảm biến kích nổ và xung rung động cơ khí* [Nguồn B - Tap Knock Sensor + Nguồn C].
  4. *Phương sai dao động vòng tua máy ở chế độ không tải (Idle Roughness Variance)* [Nguồn A - OBD2 PID 0x0C].
* **Ma trận điều kiện logic định tính**:
  * **Cấp ĐỎ (Khẩn cấp)**: Xuất hiện đỉnh rung động bất thường tại họa tần quay của trục khuỷu kết hợp cảm biến kích nổ phát hiện xung gõ kim loại đồng pha $\implies$ Bạc biên hoặc bạc balie đã bị rơ lỏng nghiêm trọng, dừng nổ máy ngay để tránh đâm thủng lốc máy.
  * **Cấp CAM (Cao)**: Biên độ rung động RMS tăng cao rõ rệt so với baseline tại dải tua trung bình kết hợp phương sai vòng tua không tải dao động lớn $\implies$ Kiểm tra cao su chân máy, cân bằng động bánh đà và đo khe hở cơ khí.
  * **Cấp VÀNG (Theo dõi)**: Rung nhẹ khi nổ máy tại chỗ không tải $\implies$ Kiểm tra tình trạng bỏ lửa nhẹ hoặc bám muội xúp-páp.

---

## 📡 5. Bản đồ 3 nguồn thu thập cảm biến chuyên sâu

Hệ thống chẩn đoán của DeepM Lab tổ chức thu thập dữ liệu kỹ thuật từ 3 tầng vật lý độc lập, tối ưu hóa theo điều kiện thực tế của từng thế hệ xe:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BẢN ĐỒ 3 NGUỒN CẢM BIẾN                         │
├────────────────────────────────────────────────────────────────────────┤
│  Nguồn A: Cổng OBD2 Tiêu Chuẩn & Mở Rộng (Mode 01, Mode 06, Mode 22)   │
│  Nguồn B: Trích Tín Hiệu (Tap) Có Sẵn (Op-Amp Ri >= 1MΩ, Opto, TVS)   │
│  Nguồn C: Cảm Biến Cấy Thêm Chuẩn Ô Tô (Automotive-Grade, IP67)       │
└────────────────────────────────────────────────────────────────────────┘
```

### 5.1 Nguồn A — Cổng OBD2 Chuẩn & Mở rộng (CAN Bus / K-Line)
Áp dụng cho mọi xe ô tô hiện đại tuân thủ chuẩn OBD2/EOBD từ năm 2001 (động cơ xăng) và 2004 (động cơ diesel) trở về sau. Chia làm 3 lớp khai thác kỹ thuật:

#### 1. Lớp Cơ bản — Mode 01 (Live Data PIDs theo SAE J1979)
Thu thập dữ liệu tức thời phục vụ giám sát động học thời gian thực:
* `0x05`: Nhiệt độ nước làm mát động cơ (ECT).
* `0x0B`: Áp suất tuyệt đối đường nạp (MAP).
* `0x0C`: Tốc độ vòng tua máy (Engine RPM).
* `0x0D`: Tốc độ xe (Vehicle Speed).
* `0x10`: Lưu lượng khí nạp qua cảm biến đo gió (MAF, g/s).
* `0x11`: Vị trí góc mở bướm ga tuyệt đối (Absolute Throttle Position).
* `0x06` – `0x09`: Hiệu chỉnh hòa khí ngắn hạn và dài hạn (STFT, LTFT Bank 1 & Bank 2).
* `0x14`, `0x15`: Điện áp cảm biến Oxy trước và sau bầu lọc xúc tác khí thải.
* `0x2F`: Mức nhiên liệu trong thùng (Fuel Tank Level).
* `0x42`: Điện áp nguồn nuôi mô-đun điều khiển (Control Module Voltage).
* `0x46`: Nhiệt độ môi trường bên ngoài (Ambient Air Temp).
* `0x70`: Áp suất tăng áp khí nạp thực tế (Boost Pressure).

#### 2. Lớp Nâng cao — Mode 03 / Mode 07 / Mode 06 (On-Board Monitoring)
* `Mode 03`: Đọc các mã lỗi chẩn đoán đã lưu chính thức trong bộ nhớ (Stored DTCs).
* `Mode 07`: Đọc các mã lỗi đang chờ xử lý (Pending DTCs) — các lỗi đã xảy ra nhưng chưa đủ chu kỳ lái để bật đèn Check Engine.
* `Mode 06`: Bộ đếm kết quả tự kiểm tra trên từng hệ thống giám sát On-board. Đặc biệt khai thác dải `MID 0xA1` đến `MID 0xC8` (Bộ đếm số lần bỏ lửa misfire chi tiết từng xi-lanh riêng biệt) và `MID 0x01` (Chỉ số hiệu quả chuyển hóa khí xả của bầu lọc xúc tác).

#### 3. Lớp Chuyên sâu — Mode 22 (Extended PIDs) & UDS qua ISO 14229
Khai thác các thông số mở rộng độc quyền của từng nhà sản xuất xe hơi:
* **Toyota / Lexus**: Nhiệt độ dầu hộp số tự động (TFT), thông số dòng điện nạp/xả và nhiệt độ từng block cell của pin Hybrid (BMS).
* **Ford**: Dữ liệu áp suất đường dầu hộp số chính (Transmission Line Pressure), áp suất dàn phun động cơ EcoBoost.
* **VAG (Audi / Volkswagen / Porsche)**: Khối lượng muội than bám bầu DPF (Soot Mass), cảm biến đo mức dầu điện tử qua đáy lốc máy.
* **Hyundai / Kia**: Tốc độ quay độc lập của từng bánh xe từ hộp điều khiển phanh ABS, dòng sạc bình Hybrid HCU.
* **Mitsubishi**: Tỷ lệ trượt ly hợp biến mô và áp suất dàn phun cao áp Common Rail động cơ dầu 4N15/4D56.

---

### 5.2 Nguồn B — Trích tín hiệu (Tap) cảm biến sẵn có trên xe
Giải pháp áp dụng cho các dòng xe đời cũ chưa có OBD2, các dòng xe chuyên dụng off-road, hoặc khi cần tần số lấy mẫu cực cao ($> 1\text{ kHz}$) để phân tích các dạng sóng áp suất tức thời mà cổng OBD2 không đáp ứng được (tần số quét OBD2 thông thường chỉ đạt $\approx 10\text{ Hz}$).

#### Nguyên tắc an toàn điện tuyệt đối khi thực hiện mạch Tap:
1. **Trở kháng vào cực cao ($R_{\text{in}} \ge 1\text{ M}\Omega$)**: Bắt buộc sử dụng mạch khuếch đại đệm Op-Amp Unity Gain (ví dụ IC chuẩn ô tô TLV2462). Tuyệt đối không làm sụt áp hoặc gây sai lệch tín hiệu gốc gửi về ECU nguyên bản của xe.
2. **Cách ly quang học (Galvanic Isolation)**: Sử dụng các bộ ghép quang Optocoupler tốc độ cao cho toàn bộ các tín hiệu xung số, xung bật/tắt (Switch/Digital) để chống sốc điện áp ngược về hộp ECU.
3. **Bảo vệ chống quá áp và xung xả tải (Load-dump & ESD Protection)**: Mọi kênh đo tín hiệu tương tự (ADC) đều phải bố trí Diode dập xung đột biến TVS kết hợp mạch lọc thông thấp RC để dập tắt các xung điện cảm ứng hàng trăm vôn trong khoang máy.
4. **Đo dòng điện hoàn toàn không xâm lấn**: Sử dụng cảm biến dòng hiệu ứng Hall (ACS758, LEM HASS) kẹp cách ly bên ngoài vỏ dây dẫn, tuyệt đối không cắt trích dây nguồn chính của xe.

#### Danh mục tín hiệu cảm biến nguyên bản có thể trích xuất (Tap):

| Cảm biến trên xe | Loại tín hiệu & Dải đo | Mạch Tap khuyến nghị | Ứng dụng chẩn đoán chuyên sâu |
| :--- | :--- | :--- | :--- |
| **Nhiệt độ nước làm mát (ECT)** | NTC thermistor 2 dây, $0 - 5\text{V}$ | Mạch đệm Op-Amp Unity Gain, hiệu chuẩn theo đường đặc tính NTC | Phát hiện quá nhiệt sớm, van hằng nhiệt mở chậm, bơm nước suy giảm |
| **Công tắc / Cảm biến áp dầu** | Switch tiếp điểm ($0.3\text{ bar}$) hoặc analog $0.5 - 4.5\text{V}$ | Optocoupler cách ly (loại switch) hoặc Op-Amp đệm (loại analog) | Phát hiện tụt áp dầu bôi trơn, kẹt van điều áp |
| **Vị trí bướm ga (TPS)** | Biến trở 3 dây hoặc Hall $0 - 5\text{V}$ | Bộ đệm Op-Amp kèm mạch lọc RC 100 Hz | Nhận diện ngữ cảnh tải máy, hành vi lái xe tức thời |
| **Cảm biến trục khuỷu / trục cam** | Cuộn từ trở VR ($\pm 50\text{V AC}$) hoặc Hall digital $0 - 5\text{V}$ | IC giải mã chuyên dụng MAX9924/MAX9926 cho tín hiệu VR; Opto/Schmitt trigger cho Hall | Đo biến thiên vận tốc góc trục khuỷu, phát hiện bỏ lửa và độ rơ xích cam |
| **Cảm biến tốc độ xe (VSS)** | Xung tần số $0 - 10\text{ kHz}$ | Mạch Schmitt Trigger cách ly quang | Đo tốc độ thực tế, ngữ cảnh tải động học |
| **Cảm biến kích nổ (Knock Sensor)** | Áp điện Piezo, AC $0 - 250\text{ mV}$, tần số 5–20 kHz | Khuếch đại điện tích (Charge Amp) + Mạch lọc dải thông $6 - 8\text{ kHz}$ | Phát hiện kích nổ sớm, va đập kim loại do mòn bạc lót tay biên |
| **Cực âm cuộn đánh lửa (Bobine)** | Xung cao áp ngắt mạch $0 - 400\text{V}$ | Mạch phân áp 1:50 + TVS clamp + Optocoupler bảo vệ xung cao áp | Xác định vòng tua xe chế hòa khí, phát hiện mất nhịp đánh lửa |
| **Chân W máy phát điện** | Xung tần số xoay chiều $0 - 30\text{V AC}$ | Phân áp + Schmitt Trigger + Optocoupler | Đo vòng tua máy dầu cơ bản, giám sát tốc độ máy phát |

---

### 5.3 Nguồn C — Cảm biến cấy thêm chuyên dụng (Automotive-Grade)
Các cảm biến cấy thêm tạo nên sự đột phá trong năng lực chẩn đoán sớm, bổ sung các vùng dữ liệu mà xe nguyên bản hoàn toàn thiếu vắng. 

#### Tiêu chuẩn kỹ thuật bắt buộc cho cảm biến cấy thêm:
* Tiêu chuẩn kháng nước và bụi bẩn: Tối thiểu **IP67** cho vị trí dưới gầm và khoang máy.
* Dải nhiệt độ làm việc công nghiệp ô tô: **$-40^\circ\text{C}$ đến $+125^\circ\text{C}$**.
* Đạt chuẩn kiểm định độ bền vi mạch ô tô: **AEC-Q100 / AEC-Q104**.
* Khả năng chịu rung động cơ học: **$10 - 500\text{ Hz}$ ở gia tốc $10g\text{ RMS}$**.

#### Bảng danh mục cảm biến cấy thêm chuẩn Automotive Grade:

| Loại cảm biến | Mã linh kiện OEM / Aftermarket khuyến nghị | Dải đo & Giao thức | Vị trí lắp đặt & Hướng dẫn kỹ thuật xưởng |
| :--- | :--- | :--- | :--- |
| **Áp suất dầu động cơ** | VDO 360-081-030-001K, Bosch 0 261 230 099, Sensata CS Series | $0 - 10\text{ bar}$, Analog 0.5–4.5V / ren 1/8" NPT | Lắp vào đường dầu chính qua đầu nối chữ T (T-piece adapter), giữ nguyên công tắc dầu nguyên bản của xe. |
| **Mức nước làm mát** | Hella 6PV 010 946-*, AC Delco 12608814, Continental | Phao tiếp điểm ON/OFF hoặc cảm biến điện dung liên tục 0–5V | Khoét lỗ bắt gioăng Viton trên thành bình nước phụ; hoặc dán cảm biến điện dung bên ngoài thành bình (không xâm lấn). |
| **Mức & chất lượng dầu 3-in-1** | Hella QLT 6PR 008 079-* (chuẩn Audi/BMW/VW), VDO | Đo Mức + Nhiệt độ + Chất lượng dầu, giao thức LIN Bus | Lắp đáy cacte dầu qua lỗ ren M22/M24. Đọc giá trị chuẩn xác nhất khi xe đỗ trên mặt phẳng và tắt máy $> 5$ phút. |
| **Nhiệt độ dầu hộp số (ATF)** | TE Connectivity GA10K3MCD1, Epcos B57164 (NTC 10k$\Omega$) | $-40^\circ\text{C}$ đến $+150^\circ\text{C}$, dây chống dầu Viton/PTFE | Lắp qua cút nối chữ T trên đường ống dầu hồi từ két tản nhiệt ATF về lại hộp số để phản hồi nhiệt nhanh nhất. |
| **Chênh áp nước làm mát** | Bosch DS-S3 Series, Sensata PSF1, TE Connectivity 4530 | $0 - 3\text{ bar}$, Analog 0.5–4.5V, chân ren G1/8 inox | Bố trí 2 cảm biến trước và sau cụm bơm nước bằng cút nối silicone để giám sát độ sụt giảm áp lực bơm. |
| **Cảm biến chất lượng nhớt (OQS)** | Continental/Schaeffler OQS, TE Connectivity OQS | Đo hằng số điện môi + nhiệt độ + độ ẩm, giao thức CAN/LIN | Cấy trực tiếp trên đường tuần hoàn dầu hồi hoặc ngâm trong cacte, phát hiện nhớt lẫn nước $> 0.3\%$ hoặc loãng nhiên liệu. |
| **Cảm biến quang phát hiện váng dầu** | Cụm phát xạ quang học DeepM: LED 650nm + Photodiode Vishay BPW34 | Đo độ tán xạ và phản xạ ánh sáng, tín hiệu Analog 0–5V | Bố trí tại vùng nước đứng đáy bình giải nhiệt phụ. Hiệu chuẩn dải đo quang học theo màu nước làm mát (đỏ hoặc xanh). |
| **Giám sát bình ắc quy thông minh** | Hella IBS 200X (chuẩn BMW/Mercedes), Continental BMS | Đo đồng thời V, I, T cọc bình, xuất dữ liệu LIN Bus | Bắt trực tiếp trên cọc âm (-) bình ắc quy. Cung cấp trực tiếp các chỉ số dung lượng thực SOC, sức khỏe SOH và khả năng khởi động SOF. |
| **Cảm biến gia tốc 3 trục** | Bosch SMG200, ADXL355, ST Micro IIS3DWB | $\pm 2g$ đến $\pm 16g$, băng thông $\ge 5\text{ kHz}$, giao tiếp SPI/I²C | Tích hợp trên bo mạch hộp điều khiển trung tâm DeepM. Phục vụ phân tích rung động cơ khí (FFT) và độ giật số. |
| **Mô-đun GPS độ nhạy cao** | u-blox NEO-M9N, Quectel L80-R | Tần số quét 10 Hz, độ chính xác $< 1.5\text{m}$, giao tiếp UART | Cung cấp dữ liệu ngữ cảnh: Tốc độ xe thực tế, độ dốc địa hình (Pitch Angle), gia tốc trọng trường khi phanh/tăng tốc. |

---

### 5.4 Bảng ma trận đối chiếu chéo & Thứ tự ưu tiên triển khai theo phiên bản

Bảng tham chiếu mối tương quan giữa các nguồn tín hiệu cảm biến và 17 nhóm hư hỏng tiềm ẩn:

| Tín hiệu cảm biến cốt lõi | Nguồn thu thập | Nhóm hư hỏng phục vụ chẩn đoán |
| :--- | :---: | :--- |
| **Nhiệt độ nước làm mát (ECT)** | A (OBD2) / B (Tap) | F1 (Gioăng quy lát), F2 (Bơm nước), F3 (Két nước), F4 (Quá nhiệt dự đoán), F16 (Nhiễm chéo lỏng) |
| **Áp suất dầu bôi trơn** | C (Cấy thêm) | F5 (Mất áp dầu), F8 (Bạc turbo), F17 (Bạc lót trục cơ) |
| **Mức dầu động cơ liên tục** | C (Cấy thêm) | F6 (Hao hụt dầu), F1 (Dâng mức dầu do lẫn nước) |
| **Chất lượng dầu động cơ (OQS)** | C (Cấy thêm) | F1 (Nước hòa tan trong nhớt), F6 (Phân lập nguyên nhân đốt dầu) |
| **Mức nước làm mát bình phụ** | C (Cấy thêm) | F1 (Hao nước), F3 (Thiếu nước), F16 (Dâng mức nước) |
| **Cảm biến quang phát hiện váng dầu** | C (Cấy thêm) | F1 (Thổi gioăng quy lát), F16 (Thủng két sinh hàn dầu) |
| **Nhiệt độ dầu hộp số tự động (TFT)** | A (Mode 22) / C (Cấy) | F7 (Hộp số quá nhiệt & trượt biến mô) |
| **Cảm biến Oxy trước / sau bầu xúc tác** | A (OBD2) | F9 (Bầu xúc tác lão hóa), F10 (Cảm biến oxy phản ứng chậm), F12 (Nghèo xăng WOT) |
| **Bộ đếm bỏ lửa chi tiết Mode 06** | A (OBD2) | F11 (Bobine/bugi yếu), F1 (Nước lọt buồng đốt lúc nguội) |
| **Lưu lượng MAF & Áp suất MAP** | A (OBD2) / B (Tap) | F15 (Tắc lọc gió / Rò khí nạp), F4 (Ngữ cảnh tải máy) |
| **Áp suất tăng áp Turbo (Boost)** | A (OBD2) / B (Tap) | F8 (Turbo tăng áp suy giảm hiệu suất) |
| **Chỉ số hiệu chỉnh hòa khí (LTFT/STFT)** | A (OBD2) | F12 (Bơm xăng yếu), F15 (Rò khí nạp), F6 (Dầu lọt buồng đốt) |
| **Cảm biến kích nổ (Knock Sensor)** | B (Tap trực tiếp) | F5 (Va đập cơ khí), F11 (Kích nổ do bỏ lửa), F17 (Mòn bạc lót trục) |
| **Áp suất dàn phun nhiên liệu** | A (OBD2 Mode 22) | F12 (Bơm xăng yếu / tụt áp dàn phun) |
| **Giám sát bình ắc quy (Hella IBS)** | C (Cấy thêm) | F13 (Sức khỏe ắc quy SOH/SOC & Máy phát điện) |
| **Cảm biến gia tốc 3 trục (FFT)** | C (Cấy thêm) | F7 (Độ giật sang số), F14 (Gia tốc hãm phanh), F17 (Rung động cơ khí) |
| **Tọa độ & Độ dốc địa hình (GPS)** | C (Cấy thêm) | Cung cấp ngữ cảnh cho F4 (độ dốc leo đèo), F2 & F3 (tốc độ xe thực tế) |

#### Phân bổ tính năng theo gói trang bị giải pháp:
* **Cấu hình Lite (Khai thác thuần túy cổng OBD2 tiêu chuẩn)**: Giám sát F4, F9, F10, F11, F12, F13 (mức cơ bản qua điện áp ECU), F15. Phù hợp cho khách hàng cá nhân muốn theo dõi nhanh tình trạng xe.
* **Cấu hình Pro (OBD2 + Cảm biến áp dầu, mức nước, mức dầu, nhiệt độ ATF, Hella IBS)**: Giám sát toàn diện F1, F2, F3, F5, F6, F7, F13 (chuyên sâu). Đây là cấu hình chủ lực cho các dòng xe gia đình, xe dịch vụ và bán tải du lịch.
* **Cấu hình Pro+ (Bổ sung OQS chất lượng nhớt, cảm biến quang váng dầu, gia tốc 3 trục FFT, tap cảm biến kích nổ)**: Mở rộng giám sát F8, F14, F16, F17. Dành riêng cho xe thi đấu off-road địa hình, xe cứu hộ cứu thương chuyên dụng và xe hiệu năng cao.

---

## 🚗 6. Quy trình kết nối Garage & Hỗ trợ chẩn đoán từ xa

Hệ thống thiết lập quy trình khép kín gồm **9 bước** kết nối thông suốt giữa chiếc xe vận hành trên đường và trạm dịch vụ kỹ thuật garage:

```
┌────────────────────────────────────────────────────────────────────────┐
│               QUY TRÌNH KẾT NỐI GARAGE & HỖ TRỢ TỪ XA                  │
├────────────────────────────────────────────────────────────────────────┤
│ Bước 1: Kích hoạt cảnh báo tự động trên xe qua logic hợp nhất cảm biến │
│ Bước 2: Ứng dụng đề xuất Top 3 Garage phù hợp theo 5 bộ lọc kỹ thuật   │
│ Bước 3: Chủ xe phê duyệt lịch hẹn & Gửi gói dữ liệu chẩn đoán từ xa    │
│ Bước 4: Garage tiếp nhận dữ liệu xe & Chuẩn bị sẵn phụ tùng thay thế   │
│ Bước 5: Tiếp nhận xe tại xưởng theo luồng ưu tiên                      │
│ Bước 6: Kỹ thuật viên kiểm tra trực tiếp & Xác nhận báo giá minh bạch   │
│ Bước 7: Thực hiện sửa chữa cơ khí & Xóa mã lỗi                         │
│ Bước 8: Giám sát tự động 30 ngày sau sửa chữa (Hậu kiểm)               │
│ Bước 9: Đánh giá chất lượng dịch vụ & Cập nhật chỉ số gara             │
└────────────────────────────────────────────────────────────────────────┘
```

### Chi tiết 9 bước vận hành thực chiến:

1. **Bước 1 — Kích hoạt cảnh báo tự động trên xe**:
   Khi một trong các hư hỏng tiềm ẩn (từ F1 đến F17) được bộ quy tắc đa tín hiệu xác nhận sau chu kỳ debounce an toàn, thiết bị trên xe lập tức kích hoạt thông báo push về điện thoại của chủ xe và đồng bộ tình trạng kỹ thuật lên hệ thống đám mây.

2. **Bước 2 — Ứng dụng đề xuất Top 3 Garage phù hợp**:
   Hệ thống tự động quét và lọc danh sách garage đối tác theo **5 tiêu chí chuyên môn**:
   * *Năng lực chuyên khoa*: Garage có đăng ký năng lực xử lý đúng nhóm bệnh này (cơ máy, hộp số, điện-điện tử, làm mát...).
   * *Vị trí địa lý*: Nằm trong bán kính tối ưu từ vị trí GPS hiện tại của xe.
   * *Khả năng tiếp nhận*: Có khung giờ cầu nâng trống phù hợp trong vòng 24–48 giờ tới.
   * *Kinh nghiệm dòng xe*: Garage có thế mạnh chuyên sâu về dòng xe của khách (Toyota, Ford, xe Đức...).
   * *Dải chi phí dự kiến*: Nằm trong khoảng ngân sách chấp nhận của chủ xe.

3. **Bước 3 — Chủ xe duyệt lịch hẹn & Gửi gói dữ liệu chẩn đoán từ xa**:
   Chủ xe lựa chọn thời gian và garage mong muốn trên ứng dụng. Hệ thống tự động đóng gói hồ sơ chẩn đoán kỹ thuật gửi thẳng đến phần mềm quản lý của garage, bao gồm: Mã số VIN, lịch sử các cảnh báo active, các thông số PID bất thường gần nhất và biểu đồ độ lệch baseline 30 ngày.

4. **Bước 4 — Garage tiếp nhận dữ liệu xe & Chuẩn bị sẵn phụ tùng thay thế**:
   Kỹ thuật viên trưởng tại garage mở hồ sơ bệnh án từ xa, phân tích các thông số đo kiểm trước khi xe đến. Garage tiến hành kiểm tra kho và đặt hàng sẵn các phụ tùng cần thiết (gioăng nắp máy, van hằng nhiệt, bơm nước, cuộn bobine, cảm biến...). Khi xe tới xưởng, vật tư phụ tùng đã sẵn sàng trên kệ, loại bỏ thời gian chờ đợi đặt hàng của khách.

5. **Bước 5 — Tiếp nhận xe tại xưởng theo luồng ưu tiên**:
   Khi xe cập xưởng, ứng dụng tự động nhận diện và chuyển trạng thái sang *"Đang bảo dưỡng tại xưởng"*, tạm dừng các thông báo cảnh báo lặp lại cho lái xe.

6. **Bước 6 — Kỹ thuật viên kiểm tra trực tiếp & Xác nhận báo giá minh bạch**:
   Kỹ thuật viên đưa xe vào khoang cầu, dùng thiết bị chẩn đoán chuyên dụng đối chiếu lại với dữ liệu đo từ xa, hoàn thiện bảng kê phụ tùng và gửi báo giá chốt qua ứng dụng để khách hàng phê duyệt bằng một chạm.

7. **Bước 7 — Thực hiện sửa chữa cơ khí & Xóa mã lỗi**:
   Garage tiến hành thay thế, sửa chữa cơ khí đúng quy trình kỹ thuật. Sau khi hoàn tất, kỹ thuật viên xóa lỗi, chạy bài test nghiệm thu (road test) và xác nhận *"Đã hoàn thành sửa chữa"* trên hệ thống. Dữ liệu bảo dưỡng được tự động lưu vào sổ bảo dưỡng điện tử của xe.

8. **Bước 8 — Giám sát tự động 30 ngày sau sửa chữa (Hậu kiểm)**:
   Trong 30 ngày tiếp theo, hệ thống trên xe liên tục theo dõi các tín hiệu liên quan đến ca bệnh vừa sửa. Nếu thông số lệch chuẩn không còn tái diễn, ca sửa chữa được xác nhận thành công tuyệt đối, cộng điểm uy tín cho garage. Nếu lỗi tái phát, hệ thống cảnh báo và hỗ trợ chính sách bảo hành làm lại miễn phí.

9. **Bước 9 — Đánh giá chất lượng dịch vụ & Cập nhật chỉ số gara**:
   Khách hàng để lại đánh giá 5 sao và nhận xét thực tế trên ứng dụng. Chỉ số *"Sửa đúng lần đầu"* (First-Time Fix Rate) của garage được cập nhật công khai trên toàn hệ thống mạng lưới.

### Tiêu chuẩn gia nhập mạng lưới Garage đối tác của DeepM Lab
* Tối thiểu 3 năm hoạt động liên tục trong lĩnh vực sửa chữa ô tô chuyên nghiệp, có đầy đủ giấy phép kinh doanh.
* Đội ngũ kỹ thuật có ít nhất 1 kỹ thuật viên trưởng sở hữu chứng chỉ quốc tế hoặc chứng chỉ hãng (Bosch, Toyota T-TEN, Ford Masters).
* Trang bị đầy đủ cầu nâng chuyên dụng và thiết bị quét lỗi chẩn đoán chuyên sâu (Launch X431, Autel MaxiSys hoặc phần mềm chẩn đoán chính hãng).
* Cam kết chuẩn mực dịch vụ: Phản hồi báo giá trong vòng 2 giờ, hoàn thành sửa chữa thông thường trong vòng 48 giờ, bảo hành chất lượng dịch vụ tối thiểu 30 ngày.

---

## 📊 7. Bảng tổng quan theo dõi sức khỏe xe đa cấp độ (Global Health Overview)

Khác với các ứng dụng thông thường tính điểm trung bình cơ học (dễ dẫn tới tình trạng xe có một lỗi chết máy nghiêm trọng nhưng điểm tổng thể vẫn cao do các bộ phận khác hoạt động tốt), hệ thống DeepM áp dụng triết lý: **Hệ thống có rủi ro cao nhất sẽ quyết định mức độ an toàn của toàn bộ chiếc xe**.

### Phân loại 4 trạng thái sức khỏe kỹ thuật của xe:

* 🟢 **Trạng thái Xanh (Tối ưu - Optimal)**:
  Tất cả 17 phân hệ cơ khí và nhiệt động học đều hoạt động bám sát đường cơ sở Baseline. Không có bất kỳ cảnh báo nào đang hoạt động. Xe sẵn sàng cho mọi hành trình dài hoặc vận hành tải nặng.
* 🟡 **Trạng thái Vàng (Lưu ý bảo dưỡng - Advisory)**:
  Ghi nhận một số biến thiên thông số đơn lẻ vượt ngưỡng nhẹ (ví dụ mức tiêu hao nhiên liệu tăng nhẹ, lốp hơi non áp suất, hoặc cảm biến oxy chuyển trạng thái hơi chậm). Lái xe an toàn bình thường, kiểm tra trong đợt bảo dưỡng kế tiếp.
* 🟠 **Trạng thái Cam (Cảnh báo kỹ thuật - Warning)**:
  Tồn tại ít nhất một phân hệ có dấu hiệu suy thoái rõ rệt kéo dài trên 7 ngày (ví dụ bơm nước yếu, cuộn bobine bỏ lửa tăng dần, hoặc áp suất dầu không tải giảm). Chủ xe cần thu xếp lịch hẹn với garage trong vòng 1–4 tuần để xử lý triệt để trước khi chuyển biến thành sự cố nghiêm trọng.
* 🔴 **Trạng thái Đỏ (Nguy hiểm khẩn cấp - Critical)**:
  Xuất hiện ít nhất một sự cố nghiêm trọng đe dọa trực tiếp đến tính mạng hoặc khả năng vận hành của động cơ (mất áp suất dầu bôi trơn khi máy đang nổ, nhiệt độ nước làm mát tăng với gia tốc lớn, hoặc hiện tượng thổi gioăng quy lát rõ rệt). Hệ thống kích hoạt cảnh báo giọng nói, yêu cầu lái xe tấp vào lề an toàn và liên hệ hỗ trợ cứu hộ.

---

*Cẩm nang kỹ thuật DeepM Lab — Nghiêm cấm sao chép hoặc phân phối ngoài hệ thống tài liệu kỹ thuật nội bộ.*
