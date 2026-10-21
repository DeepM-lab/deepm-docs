# 3. Chẩn Đoán Sớm & Logic Hợp Nhất Cảm Biến (Sensor Fusion)

Tài liệu này đặc tả kiến trúc **Chẩn đoán sớm và giám sát sức khỏe ô tô chuyên sâu** thông qua **Logic hợp nhất cảm biến (Sensor Fusion)** của DeepM Lab. Hệ thống giúp kỹ thuật viên garage phát hiện chính xác các hư hỏng cơ khí và nhiệt động học trước khi ECU nguyên bản kịp nhận biết.

---

## 🔍 1. Vùng giá trị: Những gì ECU nguyên bản KHÔNG thấy?

Hộp điều khiển động cơ (ECU) nguyên bản trên xe ô tô được lập trình với nhiệm vụ chính là đảm bảo tiêu chuẩn khí thải (Euro 4/5/6) và an toàn tức thời. ECU chỉ kích hoạt mã lỗi (DTC) và bật đèn **Check Engine** khi thông số đã vượt ngưỡng tuyệt đối (ví dụ: nước làm mát quá sôi $> 115^\circ\text{C}$ hoặc áp suất dầu rơi về $0\text{ bar}$).

**Bốn nhóm lỗi tiềm ẩn mà ECU thường bỏ qua hoặc báo quá muộn:**

| Nhóm hư hỏng | Vì sao ECU không cảnh báo sớm? | Hậu quả thực tế tại garage |
| :--- | :--- | :--- |
| **Suy giảm chậm cơ khí** | Bơm nước yếu 20%, két nước tắc 30%, dầu nhớt biến chất. Nhiệt độ vẫn dao động $92 - 98^\circ\text{C}$ (nằm trong dải chấp nhận của ECU), nhưng động cơ đang bị âm ỉ quá nhiệt. | Bó máy, nứt lốc hoặc xước lòng xi-lanh khi xe chạy tải nặng hoặc leo đèo. |
| **Thổi gioăng quy lát nhẹ** | Ở giai đoạn đầu, chỉ có vài ml khí nén/dầu rò rỉ vào áo nước làm mát mỗi ngày. ECU hoàn toàn không có cảm biến phát hiện khí xả trong két nước. | Khi ECU bật đèn báo thì mặt máy đã cong vênh, chi phí bổ máy làm lại hàng chục triệu đồng. |
| **Hao hụt chất lỏng từ từ** | Xe phổ thông không có cảm biến mức nhớt động cơ hoặc dầu hộp số liên tục, chỉ có công tắc áp suất dầu báo khi đã cạn sạch. | Hỏng turbo tăng áp hoặc cháy bố ly hợp hộp số tự động do thiếu bôi trơn. |
| **Xu hướng lão hóa dài hạn** | ECU xử lý dữ liệu theo từng chu kỳ giây, không lưu trữ baseline lịch sử qua nhiều tuần để phát hiện hiện tượng bỏ lửa ngầm (Misfire count tăng dần) hay ắc quy yếu. | Chết máy giữa đường hoặc đề dai nổ vào buổi sáng lạnh. |

---

## 🧠 2. Ba nguyên tắc cốt lõi của Logic Hợp Nhất Cảm Biến

Để loại bỏ cảnh báo rác và đưa ra kết luận chẩn đoán có độ chính xác trên 95%, hệ thống DeepM áp dụng 3 nguyên tắc:

### Nguyên tắc 1: Không cảm biến đơn lẻ nào tự kết luận
Mọi cảnh báo cấp **ĐỎ** hoặc **CAM** bắt buộc phải có **ít nhất 2 nguồn tín hiệu độc lập đồng thuận**. Một cảm biến báo sai do chuột cắn dây hoặc chập giắc chỉ được phép đưa ra cảnh báo vàng mang tính chất khuyến cáo (Advisory).

### Nguyên tắc 2: Xu hướng lịch sử (Baseline) quan trọng hơn giá trị tức thời
Mỗi chiếc xe có thói quen vận hành và độ rơ cơ khí khác nhau. Hệ thống tự động học và thiết lập đường cơ sở (Baseline) cá nhân hóa cho từng xe qua 200–500 chuyến đi đầu tiên và so sánh xu hướng 7 ngày / 14 ngày / 30 ngày:
* Xe A chạy bình thường ở $88^\circ\text{C}$. Nếu hôm nay vọt lên $96^\circ\text{C} \implies$ **Bất thường**.
* Xe B máy dầu chạy ở $95^\circ\text{C}$ quanh năm $\implies$ **Bình thường**.

### Nguyên tắc 3: Ngữ cảnh quyết định ngưỡng cảnh báo
Nhiệt độ nước làm mát (ECT) $100^\circ\text{C}$ là **hoàn toàn bình thường** nếu xe đang kéo rơ-moóc leo dốc đèo Bảo Lộc giữa trưa hè $38^\circ\text{C}$.  
Nhưng $100^\circ\text{C}$ là **bất thường nghiêm trọng** nếu xe đang chạy thong thả 60 km/h trên đường bằng lúc sáng sớm $24^\circ\text{C}$.

---

## 🚦 3. Khung 3 cấp độ cảnh báo thực chiến

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │ 🔴 CẤP ĐỎ (Critical)    │ DỪNG XE NGAY LẬP TỨC (Nguy cơ hỏng máy < 1h)  │
  ├─────────────────────────┼──────────────────────────────────────────────┤
  │ 🟠 CẤP CAM (Warning)    │ ĐI GARAGE TRONG 1–4 TUẦN (Lệch baseline >15%)│
  ├─────────────────────────┼──────────────────────────────────────────────┤
  │ 🟡 CẤP VÀNG (Advisory)  │ THEO DÕI BẢO DƯỠNG (Hành vi/thông số lệch nhẹ)│
  └────────────────────────────────────────────────────────────────────────┘
```

| Cấp cảnh báo | Tiêu chí kích hoạt | Thời gian xác nhận (Debounce) | Hành động đề xuất |
| :---: | :--- | :---: | :--- |
| **ĐỎ** | $\ge 2$ tín hiệu độc lập đồng thời vượt ngưỡng nguy hiểm, hoặc mất áp suất dầu bôi trơn khi máy đang nổ ($P_{\text{oil}} < 0.5\text{ bar}$). | $\le 5$ giây | Dừng xe an toàn vào lề đường, tắt máy, gọi xe cứu hộ về garage. |
| **CAM** | Xu hướng lệch Baseline $> 15\%$ kéo dài liên tục $\ge 7$ ngày, hoặc 2 tín hiệu yếu cùng đồng thuận (van hằng nhiệt mở chậm, tụt áp đề). | $\ge 7$ ngày | Nhắc lịch hẹn garage qua ứng dụng, kỹ thuật viên chuẩn bị sẵn phụ tùng thay thế. |
| **VÀNG** | 1 tín hiệu vượt ngưỡng nhẹ, mức tiêu hao nhiên liệu tăng 10%, lốp non áp suất 5–10%. | $\ge 14$ ngày | Ghi chú vào phiếu bảo dưỡng định kỳ tiếp theo. |

---

## 📡 4. Bản đồ 3 nguồn thu thập dữ liệu cảm biến

Để đưa dữ liệu vào bàn tính chẩn đoán, kỹ thuật viên có thể kết nối thông qua 3 tầng:

1. **Nguồn A — Cổng chẩn đoán OBD2 (CAN Bus / K-Line)**:
   * **Mode 01 (Live Data)**: Nhiệt độ nước làm mát (ECT `0x05`), áp suất cổ hút (MAP `0x0B`), lưu lượng khí nạp (MAF `0x10`), vị trí bướm ga (TPS `0x11`), tỷ lệ hòa khí ngắn/dài hạn (STFT/LTFT `0x06 - 0x09`).
   * **Mode 06 (On-Board Monitoring)**: Khai thác bộ đếm số lần bỏ lửa theo từng xi-lanh cụ thể (`MID 0xA1` đến `0xC8`) trước khi đủ điều kiện nhảy mã lỗi $P0300 - P0304$.
2. **Nguồn B — Tap trực tiếp tín hiệu cảm biến trên xe**:
   * Áp dụng khi xe đời cũ không có OBD2 hoặc cần tần số lấy mẫu cực cao ($> 1\text{ kHz}$) để phân tích sóng áp suất nén.
   * *Nguyên tắc an toàn điện*: Sử dụng mạch đệm Op-Amp trở kháng vào cực cao ($\ge 1\text{ M}\Omega$) để không gây sụt áp hoặc làm nhiễu tín hiệu gửi về ECU gốc.
3. **Nguồn C — Cấy thêm cảm biến chuyên dụng (Add-on Sensors)**:
   * Cấy đồng hồ đo áp suất dầu bôi trơn cơ học tại chân lọc nhớt.
   * Cảm biến nhiệt độ dầu hộp số tự động (ATF Temp) cho xe hay tải nặng vượt cát.
   * Cảm biến đo chênh lệch nhiệt độ giữa ngõ vào và ngõ ra của két nước làm mát ($\Delta T$).

---

## 🩺 5. Bảng chẩn đoán một số ca bệnh kinh điển tại xưởng

### Ca 1: Chẩn đoán sớm thổi gioăng quy lát (Lọt khí buồng đốt sang áo nước)
* **Tín hiệu 1**: Áp suất trong đường ống nước làm mát tăng vọt ngay khi vừa nổ máy nguội (khi van hằng nhiệt còn chưa mở).
* **Tín hiệu 2**: Nhiệt độ ECT tăng vọt khi đạp thốc ga nhưng giảm nhanh khi nhả ga về mo (do bọt khí cản trở dòng chảy qua cảm biến).
* **Kết luận**: Hở gioăng mặt máy mức độ nhẹ $\implies$ Xử lý phay phẳng mặt quy lát sớm, tránh cong dầm máy.

### Ca 2: Chẩn đoán ắc quy khởi động & Máy đề bị suy giảm (Cranking Health)
* **Tín hiệu 1**: Điện áp ắc quy khi đề nổ tụt sâu dưới **9.6V** trong thời gian $> 0.5$ giây.
* **Tín hiệu 2**: Thời gian quay máy đề kéo dài $> 1.8$ giây mới nổ máy hoàn toàn.
* **Kết luận**: Nội trở ắc quy tăng cao hoặc chổi than củ đề đã mòn $\implies$ Thay ắc quy trước khi xe bị nằm đường giữa trời mưa lạnh.
