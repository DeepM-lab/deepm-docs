# Cổng Tài Liệu Thợ Máy & Kỹ Thuật Viên

Khu vực này được biên soạn dành cho **Kỹ thuật viên xưởng độ, Cố vấn dịch vụ và Thợ máy garage ô tô chuyên nghiệp**. Hệ thống tích hợp toàn bộ dữ liệu thực nghiệm kỹ thuật của **DeepM Lab**, bao gồm:
* **135 thuật toán cơ điện tử & động lực học** thuộc 12 chuyên đề kỹ thuật chuyên sâu.
* **Hồ sơ nghiên cứu máy phát 210A CNC 6-Phase**: giải pháp cấp nguồn phụ tải offroad/camping & tối ưu công suất động cơ đo kiểm trên dyno.
* **Đặc tả logic hợp nhất cảm biến (Sensor Fusion)**: kiến trúc chẩn đoán sớm các hư hỏng tiềm ẩn mà ECU nguyên bản không phát hiện được.
* **Bách khoa toàn thư lốp xe & chẩn đoán sai lệch góc đặt bánh xe** qua hình thái mòn lốp.
* **Quy trình xuất báo cáo kỹ thuật xưởng chuyên nghiệp ra file Excel (.xlsx)**.

---

## 🛠️ Cấu trúc hệ thống tài liệu Kỹ thuật

```
docs/technician/
├── 1. Bộ công cụ tính toán (Mechanic Tools) ──────── 135 công thức & 12 nhóm chuyên đề
├── 2. Tính phụ tải điện & Máy phát 210A ─────────── Năng lượng offroad, sạc DC-DC, dyno test
├── 3. Chẩn đoán sớm (Sensor Fusion) ─────────────── Logic hợp nhất cảm biến vượt hạn mức ECU
├── 4. Bách khoa toàn thư lốp xe & Chẩn đoán mòn ─── Ký hiệu OE, bảng tải/tốc độ & góc lái
└── 5. Quản lý lịch sử & Xuất báo cáo Excel ──────── Gom dữ liệu đo đạc & in phiếu kỹ thuật
```

---

## 🧭 Danh mục chuyên đề chi tiết

### Nhóm I — Tính toán & Động lực học xưởng độ
* **[1. Bộ công cụ tính toán kỹ thuật (Mechanic Tools)](/technician/mechanic-tools)**:
  Hướng dẫn thao tác bàn tính 135 công cụ, chế độ nghiệm chứng 12 case study thực tế (Offroad, Audio, Tuning, Racing, RV Camping...).
* **[2. Bách khoa toàn thư lốp & Dấu hiệu mòn lốp](/technician/tire-encyclopedia)**:
  Giải mã toàn bộ ký hiệu lốp OE (Mercedes MO, BMW *, Porsche N...), phân loại gai HT/AT/RT/MT và bảng đối chiếu chẩn đoán góc Camber/Toe qua vệt mòn gai.
* **[3. Quản lý lịch sử & Xuất file báo cáo Excel](/technician/export-excel)**:
  Thao tác lưu thông tin khách hàng, biển số xe, gom các phép tính vào Drawer và trích xuất file Excel hoàn chỉnh có chữ ký xác nhận.

### Nhóm II — Cơ điện tử & Chẩn đoán nâng cao
* **[4. Tính phụ tải điện & Máy phát hiệu năng cao 210A](/technician/alternator-210a-power)**:
  Phân tích rủi ro quá tải máy phát zin khi lắp thêm tời, đèn, pin LiFePO4; giải pháp máy phát 210A CNC Billet 6061 6-phase và kết quả đo dyno giải phóng 5 HP & 22% mô-men xoắn.
* **[5. Chẩn đoán sớm & Logic hợp nhất cảm biến (Sensor Fusion)](/technician/sensor-fusion-diagnostics)**:
  Khung 3 cấp cảnh báo (Đỏ - Cam - Vàng), bản đồ cảm biến OBD2 + Tap analog, phát hiện sớm gioăng quy lát lọt khí, bơm nước yếu, rò rỉ két nước trước khi ECU báo đèn Check Engine.

---

::: tip 🔗 Trải nghiệm công cụ trực tiếp
* Khởi chạy bộ bàn tính kỹ thuật tại [DeepM Engineering Toolbox](https://deepm.vn/tho-may).
* Tất cả công thức toán học và đơn vị đã được chuẩn hóa theo hệ SI và đối chiếu với các nguồn tiêu chuẩn quốc tế (EngineeringToolbox, NASA Aeronautics, Battery University, SKF Rolling Bearings).
:::
