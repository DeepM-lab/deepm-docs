# 1. Bộ Công Cụ Tính Toán (Mechanic Tools)

Phần mềm **DeepM Engineering Toolbox** tổng hợp **135 công thức tính toán cơ khí ô tô thực nghiệm** được chuẩn hóa vào giao diện trực quan, giúp kỹ thuật viên garage loại bỏ việc phải bấm máy tính tay hoặc nhớ công thức phức tạp.

---

## 📸 Giao diện thực tế bộ công cụ kỹ thuật

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Lab • Automotive Engineering Toolbox (135 Công Thức)</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/technician/technician-tools.webp" alt="Giao diện bộ công cụ thợ máy và kỹ thuật thực tế" />
  </div>
</div>

### Hướng dẫn chi tiết từng điểm chạm:

* <span class="step-badge">1</span> **Nhập Hồ sơ xe & Báo cáo kỹ thuật (Garage Client Record)**:
  * Điền thông tin khách hàng vào thanh hồ sơ đầu trang:
    * **Chủ xe / Khách hàng**: Ví dụ `Anh ABC - DeepM`.
    * **Dòng xe & Động cơ**: Ví dụ `Mitsubishi Triton 4N15 / Land Cruiser LC80 / Ford Ranger 2.0 Bi-Turbo`.
    * **Biển số kiểm soát**: Ví dụ `30K-888.88`.
  * Các thông tin này sẽ được tự động đồng bộ vào đầu file Excel khi bạn xuất báo cáo.

* <span class="step-badge">2</span> **Chọn Chuyên đề kỹ thuật hoặc Tìm kiếm mã Tool**:
  * Bấm vào 12 tab chuyên đề (hoặc gõ mã `DM-001` đến `DM-135` vào ô tìm kiếm nhanh).

* <span class="step-badge">3</span> **Vận hành bàn tính (Calculator)**:
  * Chọn công cụ cần tính ở cột danh sách bên trái (Ví dụ: `[DM-001] Crawl ratio tổng`).
  * Nhập các thông số đầu vào: Tỷ số truyền số 1 hộp số chính, tỷ số truyền số chậm (4L) hộp số phụ, tỷ số truyền cầu sau (Final drive).
  * Hệ thống tính toán trả về ngay **Tỷ số truyền bò tổng thể** kèm phân tích khả năng vượt dốc đá và ghềnh lở mà không cần đệm côn hay ngắt máy.

---

## 📚 Tổng quan 12 Bộ công cụ kỹ thuật (135 Tools)

Toàn bộ 135 công cụ được phân bổ vào 12 lĩnh vực kỹ thuật chuyên sâu theo tiêu chuẩn xưởng độ và garage hiện đại:

| Nhóm | Chuyên đề | Ứng dụng | Số tool | Công thức tiêu biểu | Tài liệu |
| :---: | :--- | :--- | :---: | :--- | :---: |
| **01** | [**Off-road & 4x4**](/technician/tools/01-offroad-4x4) | Độ xe vượt địa hình, thi đấu VOC/HTV | <span class="tool-count-badge">12</span> | Crawl ratio tổng, lực kéo bánh, góc tới/thoát/vượt đỉnh, tời kéo dốc, pin tời | [Chi tiết ➔](/technician/tools/01-offroad-4x4) |
| **02** | [**Car Audio & SPL**](/technician/tools/02-car-audio-spl) | Độ âm thanh SQ/SQL/SPL, đóng thùng sub hơi/kín | <span class="tool-count-badge">12</span> | Thể tích thùng chữ nhật, thể tích $V_b$ theo $Q_{tc}$, tần số cắt $F_3$, cổng hơi, RMS amply | [Chi tiết ➔](/technician/tools/02-car-audio-spl) |
| **03** | [**Camping & RV**](/technician/tools/03-camping-rv) | Xe hoán cải Mobihome, Camper, Caravan | <span class="tool-count-badge">12</span> | Cân bằng năng lượng ngày (Wh), pin LiFePO4, dòng Inverter, PVWatts pin mặt trời | [Chi tiết ➔](/technician/tools/03-camping-rv) |
| **04** | [**Performance & Tuning**](/technician/tools/04-performance-tuning) | Tinh chỉnh động cơ, độ Turbo/Supercharger, map ECU | <span class="tool-count-badge">12</span> | Dung tích $V_d$, tỷ số nén tĩnh $CR$, tốc độ piston $U_p$, BMEP 4 kỳ, lưu lượng kim phun | [Chi tiết ➔](/technician/tools/04-performance-tuning) |
| **05** | [**Drift & Racing**](/technician/tools/05-drift-racing) | Xe chạy track day, đua drift, drag strip 402m | <span class="tool-count-badge">10</span> | Tỷ số truyền tổng, RPM lên số, chuyển tải dọc khi phanh, lực cản khí động $F_d$, Wheel Rate | [Chi tiết ➔](/technician/tools/05-drift-racing) |
| **06** | [**Wheel & Tire**](/technician/tools/06-wheel-tire) | Nâng cấp mâm lốp, độ lồi mâm (ET Offset), canh vè | <span class="tool-count-badge">10</span> | Đường kính danh nghĩa, chu vi lốp, sai số ODO, backspacing, độ ăn sâu mép | [Chi tiết ➔](/technician/tools/06-wheel-tire) |
| **07** | [**Automotive Electrical**](/technician/tools/07-automotive-electrical) | Thợ điện ô tô, nâng cấp máy phát 210A, phân phối tải | <span class="tool-count-badge">12</span> | Công suất DC/cơ máy phát, tỷ số pulley, RPM rotor, tổn hao đồng/diode, sụt áp dây điện | [Chi tiết ➔](/technician/tools/07-automotive-electrical) |
| **08** | [**Battery & Storage**](/technician/tools/08-battery-storage) | Thiết kế pack pin LiFePO4 / Sodium-ion, BMS | <span class="tool-count-badge">12</span> | Cấu hình ghép chuỗi Ns/song song Np, dòng xả C-rate, nội trở, nhiệt lượng Joule $I^2R$, sạc CC | [Chi tiết ➔](/technician/tools/08-battery-storage) |
| **09** | [**Mechanical & Fabrication**](/technician/tools/09-mechanical-fabrication) | Chế tạo cơ khí, gá hàn khung, ben thủy lực nâng hạ | <span class="tool-count-badge">12</span> | Ứng suất uốn $\sigma = My/I$, độ võng dầm $\delta$, lực xi lanh thủy lực, tuổi thọ vòng bi $L_{10}$ | [Chi tiết ➔](/technician/tools/09-mechanical-fabrication) |
| **10** | [**EV & Hybrid**](/technician/tools/10-ev-hybrid) | Hoán cải xe điện (EV Retrofit), xe lai sạc ngoài | <span class="tool-count-badge">10</span> | Công suất/mô-men mô-tơ điện, dòng bus DC cao áp, Wh/km, quãng đường xe điện, phanh tái sinh | [Chi tiết ➔](/technician/tools/10-ev-hybrid) |
| **11** | [**Detailing & Bodywork**](/technician/tools/11-detailing-bodywork) | Sơn phủ chống xước Polyurea, dán cách âm, làm đồng | <span class="tool-count-badge">11</span> | Diện tích bề mặt, độ dày màng sơn DFT/WFT, lượng sơn cần mua, tỷ lệ pha A:B, dẫn nhiệt | [Chi tiết ➔](/technician/tools/11-detailing-bodywork) |
| **12** | [**Garage & Maintenance**](/technician/tools/12-garage-maintenance) | Bảo dưỡng định kỳ, quản lý chi phí vận hành đội xe | <span class="tool-count-badge">10</span> | Quy đổi mô-men siết (lbf.ft → Nm), lực kích nâng xe, áp suất piston ben, tiêu hao xăng dầu | [Chi tiết ➔](/technician/tools/12-garage-maintenance) |

---

## 📐 Nguyên tắc chuẩn hóa công thức & Đơn vị đo lường

Hệ thống tính toán DeepM tuân thủ nghiêm ngặt các nguyên tắc vật lý thực nghiệm:

1. **Hệ đơn vị đo lường SI chuẩn hóa**:
   * Áp suất: **Pa** hoặc **Bar** ($1\text{ Bar} = 100\text{ kPa} = 10^5\text{ Pa}$).
   * Chiều dài / Kích thước: Mặc định milimet (**mm**) đối với lốp mâm cơ khí; mét (**m**) đối với khí động học và hệ treo.
   * Công suất: kilowatt (**kW**) hoặc mã lực (**HP**).
   * Góc: Radian (**rad**) trong tính toán giải tích và Độ (**deg**) khi hiển thị trên giao diện người dùng.
2. **Quy tắc nhập tỷ số hiệu suất**:
   * Các hệ số hiệu suất truyền động ($\eta$), hệ số công suất ($PF$), độ sâu xả pin ($DoD$) bắt buộc nhập dưới dạng thập phân trong khoảng **0.0 đến 1.0** (ví dụ: hiệu suất 85% nhập là `0.85`, không nhập `85`).
3. **Phân loại độ tin cậy của thuật toán**:
   * **Chuẩn hình học / Chuẩn định nghĩa**: Tính toán tuyệt đối theo kích thước hình học giải tích (ví dụ: thể tích thùng loa, đường kính mâm lốp, tỷ số truyền crawl ratio).
   * **Chuẩn mô hình**: Dựa trên mô hình vật lý lý thuyết chuẩn quốc tế (ví dụ: định luật Ohm, mô hình Thiele/Small, Darcy-Weisbach).
   * **Mô hình ước lượng**: Áp dụng hệ số thực nghiệm dành cho kỹ thuật viên xưởng tham khảo trước khi gia công chế tạo thực tế.

---

## 🔬 Chế độ Kiểm thử Nghiệm chứng (Verification Mode)

Để đảm bảo tính chuẩn xác tuyệt đối trước khi ứng dụng vào việc nâng cấp xe đắt tiền, DeepM cung cấp chế độ **Nghiệm chứng (Verification Mode)**. Bảng dưới đây là 12 bài toán kiểm thử mẫu được lập trình sẵn trên hệ thống với tỷ lệ sai lệch bằng 0:

| Chuyên đề | Tên phép thử kiểm nghiệm | Biến đầu vào thực tế | Giá trị tính toán | Mốc chuẩn đối chiếu | Kết quả |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **01. Off-road** | Tỷ số truyền bò Crawl $1 \times 2.7 \times 4.1$ | Số 1: `1.0`, Hộp phụ 4L: `2.7`, Cầu: `4.1` | **11.07** | 11.07 | <span class="badge-pass">PASS</span> |
| **02. Audio** | Thể tích thùng sub chữ nhật $100 \times 80 \times 8$ cm | $L=100$, $W=80$, $H=8$ cm | **64.0 L** | 64.0 L | <span class="badge-pass">PASS</span> |
| **03. Camping** | Năng lượng pin Lithium 24V 200Ah | Điện áp: `24V`, Dung lượng: `200Ah` | **4.800 Wh** | 4.800 Wh | <span class="badge-pass">PASS</span> |
| **04. Tuning** | Dung tích máy 6 xi-lanh ($B=95$mm, $S=85$mm) | Bore: `95mm`, Stroke: `85mm`, Số máy: `6` | **3.615 L** | 3.615 L | <span class="badge-pass">PASS</span> |
| **05. Racing** | Lực cản khí động ở tốc độ 72 km/h ($20$ m/s) | $\rho=1.2$, $C_d=0.3$, $A=2.2\text{ m}^2$, $v=20\text{ m/s}$ | **158.4 N** | 158.4 N | <span class="badge-pass">PASS</span> |
| **06. Fitment** | Đường kính lốp cỡ 285/70R17 | Mâm: `17 inch`, Rộng: `285mm`, Tỷ lệ: `70%` | **830.8 mm** | 830.8 mm | <span class="badge-pass">PASS</span> |
| **07. Electrical** | Công suất máy phát DC 14.4V dòng 390A | Điện áp: `14.4V`, Cường độ dòng: `390A` | **5.616 W** | 5.616 W | <span class="badge-pass">PASS</span> |
| **08. Battery** | Năng lượng pack pin 4S4P cell 3.2V 20Ah | $N_s=4$, $N_p=4$, Cell: `3.2V 20Ah` | **1.024 Wh** | 1.024 Wh | <span class="badge-pass">PASS</span> |
| **09. Mechanical**| Công suất bơm thủy lực 200 bar lưu lượng 10 L/p | Áp suất: `200 bar`, Lưu lượng: `10 L/min` | **3.33 kW** | 3.33 kW | <span class="badge-pass">PASS</span> |
| **10. EV** | Công suất mô-tơ điện 100 Nm tại 3000 rpm | Momen xoắn: `100 Nm`, Tốc độ: `3000 rpm` | **31.42 kW** | 31.42 kW | <span class="badge-pass">PASS</span> |
| **11. Detailing** | Lượng sơn phủ Polyurea sàn xe 12 m² dày 0.5 mm | Diện tích: `12 m²`, Chiều dày ướt: `0.5 mm` | **6.0 L** | 6.0 L | <span class="badge-pass">PASS</span> |
| **12. Garage** | Chi phí xăng cho xe ăn 8L/100km giá 25.000đ/L | Định mức: `8.0 L/100km`, Giá: `25.000đ/L` | **2.000 đ/km** | 2.000 đ/km | <span class="badge-pass">PASS</span> |

---

## 🌐 Nguồn đối chiếu tiêu chuẩn quốc tế

Mỗi thuật toán tính toán trong DeepM Lab được đối chiếu từ 2 nguồn khoa học cơ sở:

* **EngineeringToolbox (Cơ khí & Thủy lực)**: Cơ sở dữ liệu động lực học góc quay, mô-men xoắn, sụt áp dây dẫn DC và tính toán dầm chịu lực kết cấu chassis.
* **NASA Glenn Research Center (Khí động học)**: Phương trình lực cản khí động Drag Equation tiêu chuẩn hàng không vũ trụ ($F_d = \frac{1}{2}\rho C_d A v^2$).
* **Battery University (Năng lượng & Pin Lithium)**: Tiêu chuẩn sạc xả C-rate, ghép mảng pin LiFePO4 / Sodium-ion và bảo vệ tế bào pin qua BMS.
* **SKF Rolling Bearings Guide (Tuổi thọ vòng bi ISO 281)**: Công thức tính toán độ bền mỏi vòng bi ổ lăn moay-ơ trục xe tải và xe đua.
* **NREL PVWatts V8 (Năng lượng mặt trời di động)**: Mô hình ước tính sản lượng giờ nắng đỉnh (Peak Sun Hours) cho tấm pin PV dán nóc xe camper.
