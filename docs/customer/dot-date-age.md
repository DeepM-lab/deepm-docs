# 4. Tra Cứu Tuần/Năm Sản Xuất (Mã DOT) & Đánh Giá Tuổi Thọ Lốp

Rất nhiều chủ xe chỉ quan sát độ dày gai lốp mà quên mất rằng **cao su lốp có hạn sử dụng tự nhiên**. Kể cả khi xe ít đi, gai lốp còn dày như mới, cao su vẫn bị lão hóa, chai cứng và rạn nứt theo thời gian, tiềm ẩn nguy cơ nổ lốp cực kỳ nguy hiểm khi chạy tốc độ cao trên cao tốc.

Tính năng **DOT Decoder** trên hệ thống DeepM Lab giúp bạn tra cứu chính xác tuần và năm sản xuất của lốp xe chỉ với dãy số 4 ký tự.

---

## 🔍 Cách tìm và đọc mã DOT 4 số trên lốp xe

Dạo quanh mép viền hông lốp (sidewall), bạn sẽ thấy chữ **DOT** dập nổi, theo sau là một chuỗi mã ký hiệu của nhà máy và kết thúc bằng **4 chữ số đặt trong khung bầu dục nhỏ**.

```
Ví dụ mã in trên lốp:  DOT  1EA  ABCD  4721
                                        └── Tuần 47 của năm 2021
```

* **Hai số đầu (47)**: Tuần sản xuất trong năm (từ tuần 01 đến tuần 52). Tuần 47 tương đương khoảng **cuối tháng 11**.
* **Hai số cuối (21)**: Năm sản xuất. Số `21` nghĩa là năm **2021**.

::: warning ⚠️ Lưu ý lốp sản xuất trước năm 2000
Nếu bạn thấy mã chỉ có **3 chữ số** (ví dụ `329`), lốp đó được sản xuất trước năm 2000. Những chiếc lốp này đã có tuổi đời trên 25 năm và tuyệt đối không được phép tiếp tục lăn bánh.
:::

---

## 🖥️ Hướng dẫn tra cứu nhanh trên DeepM Lab

<DotAgeCalculator />

1. Mở công cụ [DeepM Toolbox Engineering](https://deepm.vn/giai-ma-lop-xe).
2. Chọn tab **Giải mã thông số lốp**.
3. Cuộn xuống ô **Tra cứu mã năm sản xuất DOT (4 chữ số)** hoặc gõ kèm chuỗi lốp đầy đủ (Ví dụ: `... DOT 4721 ...`).
4. Nhập 4 chữ số (ví dụ: `4721` hoặc `1224`).
5. Hệ thống hiển thị ngay:
   * **Thời điểm xuất xưởng**: Tháng/Năm sản xuất.
   * **Tuổi thọ hiện tại**: Tính chính xác số năm và số tháng tính đến thời điểm hiện tại.
   * **Cảnh báo trạng thái an toàn**: Xanh (Tốt), Vàng (Cần theo dõi), hoặc Đỏ (Nguy hiểm).

---

## 🚦 Bảng đánh giá tuổi thọ an toàn của lốp xe

Hầu hết các nhà sản xuất lốp hàng đầu thế giới (Michelin, Bridgestone, Continental, Goodyear) đều khuyến nghị biểu đồ tuổi thọ cao su như sau:

| Niên hạn của lốp | Trạng thái kỹ thuật | Khuyến cáo vận hành |
| :--- | :--- | :--- |
| **0 - 3 năm** | **Cao su tối ưu** | Độ đàn hồi và bám đường đạt chuẩn thiết kế xuất xưởng. Hoàn toàn an tâm lăn bánh ở mọi dải tốc độ. |
| **3 - 5 năm** | **Bình thường - Cần quan sát** | Cao su bắt đầu có dấu hiệu lão hóa nhẹ. Cần kiểm tra định kỳ 6 tháng/lần xem có vết nứt chân chim ở rãnh gai và thành lốp. |
| **5 - 6 năm** | **Lão hóa - Cần kiểm tra chuyên sâu** | Cao su chai cứng, độ bám đường khi trời mưa giảm đáng kể. Cần đưa xe đến xưởng dịch vụ để thợ kỹ thuật kiểm tra độ co giãn và áp suất giữ hơi. |
| **Trên 6 năm** | **Hết hạn an toàn - Cần thay thế** | **Khuyến nghị thay mới ngay**, bất kể độ sâu gai lốp còn bao nhiêu. Nguy cơ tách lớp bố thép và nổ lốp đột ngột khi chạy đường dài dưới nhiệt độ cao. |

---

## 💡 Mẹo thông minh khi chọn mua lốp mới

* **Không mua lốp lưu kho quá 2 năm**: Khi thay lốp tại cửa hàng, hãy yêu cầu nhân viên chỉ rõ mã DOT. Lốp mới xuất xưởng lý tưởng nhất là trong vòng **6 - 18 tháng**.
* **Tránh "lốp thanh lý giá rẻ" date sâu**: Nhiều nơi bán lốp tồn kho từ 4 - 5 năm trước với giá giảm sâu. Dù chưa từng lắp lên xe, hợp chất cao su đã mất đi một phần độ bám và tuổi thọ sử dụng thực tế còn lại rất ngắn.
* **Đồng bộ 4 bánh xe**: Khi thay cả dàn lốp, hãy kiểm tra để đảm bảo cả 4 lốp có mã DOT chênh lệch nhau không quá vài tuần nhằm đảm bảo tính đồng đều về độ mòn và cảm giác lái.
