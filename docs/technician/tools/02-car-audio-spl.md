# Chuyên đề 02: Car Audio & SPL (12 Công cụ Tính toán)

> **Mã chuyên đề**: `NHOM-02` | **Dải công cụ**: `DM-013` đến `DM-024`  
> **Đối tượng ứng dụng**: Kỹ thuật viên lắp đặt âm thanh xe hơi chuyên nghiệp, thợ đóng thùng subwoofer SQ/SQL/SPL, chuyên gia cân chỉnh DSP.  
> **Mục tiêu kỹ thuật**: Tính toán thể tích thùng loa kín/thông hơi theo bộ thông số Thiele/Small (T/S Parameters), cổng cộng hưởng Helmholtz, trở kháng mảng loa và công suất/dòng điện ampli.

---

## [DM-013] Thể Tích Thùng Loa Chữ Nhật (Rectangular Enclosure Volume)

> **Phân loại độ tin cậy**: Chuẩn hình học  
> **Nhóm người dùng**: Thợ mộc đóng thùng subwoofer, kỹ thuật viên độ âm thanh

### 1. Công thức toán học (Mathematical Formula)

$$
V_{\text{gross\_L}} = \frac{L_{\text{cm}} \times W_{\text{cm}} \times H_{\text{cm}}}{1000}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $L_{\text{cm}}$ | Chiều dài lọt lòng bên trong vách thùng | centimét (cm) | Kích thước trong, không tính bề dày ván gỗ MDF |
| $W_{\text{cm}}$ | Chiều rộng lọt lòng bên trong vách thùng | centimét (cm) | Kích thước trong sau khi đã trừ độ dày ván gỗ |
| $H_{\text{cm}}$ | Chiều cao lọt lòng bên trong vách thùng | centimét (cm) | Kích thước khoang chứa khí thực tế |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đây là thể tích gộp (Gross Volume). Để ra thể tích hoạt động thực tế (Net Volume $V_b$), thợ bắt buộc phải trừ thể tích chiếm chỗ của nam châm củ loa (thường $1{,}5 - 4{,}5\text{ L}$ cho loa $10-12\text{ inch}$), thể tích giằng gia cố nội bộ và ống thông hơi (port displacement).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Ván thùng loa sub phải dùng gỗ công nghiệp MDF hoặc Plywood chống ẩm có độ dày tối thiểu $18 - 25\text{ mm}$. Dùng ván mỏng vách thùng sẽ bị phập phồng (box flex) gây méo âm thanh và triệt tiêu áp suất âm trầm.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn hình học giải tích
- **Nguồn 1**: [SpeakerFoundry - Subwoofer Enclosure Design](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Speaker Box Enclosure Calculator](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-014] Thể Tích Thùng Kín Theo Hệ Số Phẩm Chất $Q_{tc}$ (Sealed Box Volume for Target $Q_{tc}$)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên căn chỉnh chất âm SQ (Sound Quality)

### 1. Công thức toán học (Mathematical Formula)

$$
V_b = \frac{V_{as}}{\left(\frac{Q_{tc}}{Q_{ts}}\right)^2 - 1}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $V_{as}$ | Thể tích không khí tương đương độ mềm màng nhện | Lít (L) | Thông số Thiele/Small do nhà sản xuất củ loa công bố |
| $Q_{tc}$ | Hệ số phẩm chất tổng của thùng kín mục tiêu | Không thứ nguyên | $Q_{tc} = 0{,}707$ (chuẩn Butterworth phẳng nhất); $0{,}577$ (Bessel - bass êm); $0{,}9 - 1{,}1$ (bass căng nảy) |
| $Q_{ts}$ | Hệ số phẩm chất tổng của củ loa tự do trong không khí | Không thứ nguyên | Thông số Thiele/Small nhà sản xuất (thường $0{,}3 - 0{,}6$) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức chỉ có nghiệm thực nghiệm vật lý khi $Q_{tc} > Q_{ts}$.
- Mô hình T/S tín hiệu nhỏ lý tưởng; chưa tính tới hiện tượng nén không khí phi tuyến ở công suất lớn.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Thiết kế thùng quá nhỏ khiến $Q_{tc} > 1{,}2$ sẽ tạo ra đỉnh dội (peak) rất chói ở dải $60 - 80\text{ Hz}$ và làm suy giảm dải siêu trầm hạ âm ($< 35\text{ Hz}$), đồng thời làm cuộn voice coil nhanh nóng do hành trình bị cản trở.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình Thiele/Small
- **Nguồn 1**: [SpeakerFoundry - Sealed Box Tuning Guidelines](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Sealed Box Q-Factor Parameters](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-015] Hệ Số Phẩm Chất Thùng Kín $Q_{tc}$ (Resulting Sealed Box $Q_{tc}$)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên kiểm tra đáp tuyến âm học thùng loa có sẵn

### 1. Công thức toán học (Mathematical Formula)

$$
Q_{tc} = Q_{ts} \times \sqrt{1 + \frac{V_{as}}{V_b}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $Q_{ts}$ | Hệ số phẩm chất tổng tự do của loa | Không thứ nguyên | Thông số T/S từ nhà sản xuất |
| $V_{as}$ | Thể tích tương đương của loa | Lít (L) | Thông số T/S từ nhà sản xuất |
| $V_b$ | Thể tích thực tế của khoang thùng loa | Lít (L) | Thể tích khí thuần sau khi đã trừ củ loa |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Bỏ qua rò rỉ khí qua các khe hở bắt vít hoặc mối ghép gỗ.
- Nhồi bông tiêu âm (Dacron/Polyfill) có thể làm tăng thể tích âm học biểu kiến $V_b$ lên khoảng $10 - 20\%$, từ đó làm giảm nhẹ $Q_{tc}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Thùng loa phải kín khít $100\%$. Nếu thùng bị hở ron, áp suất khí thoát ra tạo tiếng xì méo âm (chuffing) và triệt tiêu khả năng kiểm soát đệm khí của nón loa.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình Thiele/Small
- **Nguồn 1**: [SpeakerFoundry - Acoustic Modeling](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Subwoofer Box Calculation](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-016] Tần Số Cộng Hưởng Thùng Kín $F_c$ (Sealed Resonant Frequency)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên căn chỉnh dải tần cắt Subwoofer

### 1. Công thức toán học (Mathematical Formula)

$$
F_c = F_s \times \sqrt{1 + \frac{V_{as}}{V_b}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $F_s$ | Tần số cộng hưởng tự do của củ loa | Hertz (Hz) | Thông số T/S nhà sản xuất (thường $22 - 38\text{ Hz}$ cho loa trầm) |
| $V_{as}$ | Thể tích tương đương của loa | Lít (L) | Thể tích khí đàn hồi tương đương hệ treo loa |
| $V_b$ | Thể tích thùng kín | Lít (L) | Dung tích khoang kín bên trong |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- $F_c$ luôn luôn lớn hơn $F_s$ do độ đàn hồi của khối không khí kín trong thùng cộng thêm vào hệ treo màng nhện.
- Chưa tính ảnh hưởng cộng hưởng khoang cabin ô tô (Cabin Gain).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Nếu chọn củ loa có $F_s$ quá cao ($> 45\text{ Hz}$) đóng vào thùng nhỏ, $F_c$ bị đẩy vọt lên $> 65\text{ Hz}$, loa sẽ hoàn toàn mất khả năng tái tạo các nốt trầm sâu của đàn Contrabass hoặc nhạc điện tử EDM.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình Thiele/Small
- **Nguồn 1**: [SpeakerFoundry - Resonance Frequency Formulas](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Speaker Box Enclosure](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-017] Tần Số Cắt Suy Giảm -3dB Thùng Kín $F_3$ (Half-Power Cutoff Frequency)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ sư âm học ô tô, chuyên gia đo đạc RTA

### 1. Công thức toán học (Mathematical Formula)

$$
a = \frac{1}{Q_{tc}^2} - 2, \quad F_3 = F_c \times \sqrt{\frac{a + \sqrt{a^2 + 4}}{2}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $F_c$ | Tần số cộng hưởng của loa trong thùng | Hz | Tính từ công thức DM-016 |
| $Q_{tc}$ | Hệ số phẩm chất thùng loa kín | Không thứ nguyên | Tính từ công thức DM-015 |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Đáp tuyến bộ lọc High-Pass bậc 2 lý tưởng trong không gian bán cầu (half-space).
- Trên ô tô thực tế, hiện tượng Cabin Gain bắt đầu nâng dải tần thấp từ khoảng $50 - 60\text{ Hz}$ với độ dốc $+12\text{ dB/octave}$, bù đắp hoàn toàn sự suy giảm của thùng kín bên dưới $F_3$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Không nên tăng Gain Equalizer ở tần số dưới $F_3$ quá nhiều ($> +6\text{ dB}$) vì sẽ khiến ampli nhanh chóng bị cắt ngọn sóng (clipping) và làm cháy cuộn voice coil.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình bộ lọc âm học bậc 2
- **Nguồn 1**: [SpeakerFoundry - Enclosure Transfer Function](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Subwoofer Calculators](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-018] Tần Số Cộng Hưởng Thùng Thông Hơi Ported $F_b$ (Helmholtz Tuning Frequency)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên đóng thùng loa hơi (Bass Reflex / Ported Box)

### 1. Công thức toán học (Mathematical Formula)

$$
F_b = \frac{c}{2\pi} \times \sqrt{\frac{S_p}{V_b \times L_{\text{eff}}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $c$ | Tốc độ truyền âm thanh trong không khí | m/s | Lấy $343\text{ m/s}$ ở nhiệt độ phòng $20^\circ\text{C}$ |
| $S_p$ | Tiết diện diện tích mặt cắt của cổng hơi | m² | Đổi từ cm² sang m²: $S_p = \frac{S_{\text{cm}^2}}{10000}$ |
| $V_b$ | Thể tích làm việc hữu ích của thùng loa | m³ | Đổi từ Lít sang m³: $V_b = \frac{V_{\text{L}}}{1000}$ |
| $L_{\text{eff}}$ | Chiều dài hữu hiệu của ống hơi | m | Chiều dài vật lý cộng phần bù loe đầu ống |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Áp dụng nguyên lý bình cộng hưởng Helmholtz cổ điển.
- Chiều dài hữu hiệu $L_{\text{eff}}$ phải tính thêm phần mở rộng miệng ống (end correction): Với ống tròn miệng bằng là $+0{,}6 \times r$ mỗi đầu; với miệng loe (flared port) khoảng $+0{,}3 \times r$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Dưới tần số $F_b$, thùng loa mất hoàn toàn lớp đệm khí kiểm soát màng loa. Kỹ thuật viên bắt buộc phải cài bộ lọc cận âm (Subsonic / Infrasonic High-Pass Filter) trên DSP ở ngưỡng cắt dưới $F_b$ khoảng $3 - 5\text{ Hz}$ để tránh đập vỡ nón loa (bottoming out).
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình Helmholtz
- **Nguồn 1**: [SpeakerFoundry - Ported Box Tuning](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Bass Reflex Enclosure Design](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-019] Chiều Dài Cổng Hơi Hữu Hiệu (Effective Port Length)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Thợ thi công họng thông hơi thùng sub xe ô tô

### 1. Công thức toán học (Mathematical Formula)

$$
L_{\text{eff}} = \frac{S_p}{V_b \times \left(\frac{2\pi F_b}{c}\right)^2}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $S_p$ | Diện tích mặt cắt ngang của cổng hơi | m² | $S_p = \frac{\pi \times d^2}{4}$ (với ống tròn) |
| $V_b$ | Thể tích khoang thùng loa | m³ | Thể tích chứa khí hữu hiệu |
| $F_b$ | Tần số cộng hưởng mục tiêu | Hz | Thường căn chỉnh từ $30 - 38\text{ Hz}$ cho nghe nhạc xe hơi |
| $c$ | Tốc độ âm thanh | m/s | Chuẩn $343\text{ m/s}$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tiết diện cổng hơi $S_p$ phải đủ lớn để tốc độ gió trong ống không vượt quá $15 - 20\text{ m/s}$ ở công suất đỉnh, tránh gây ra tiếng phì phò khó chịu.
- Chiều dài cắt ván thực tế = $L_{\text{eff}} - \Delta L_{\text{end\_correction}}$.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Đặt miệng trong của cổng hơi quá sát vách thùng đối diện ($< 1$ lần đường kính ống) sẽ làm tắc nghẽn luồng khí, khiến tần số cộng hưởng thực tế bị lệch khỏi thiết kế và gây nén khí làm giảm áp lực bass.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình âm học Helmholtz
- **Nguồn 1**: [SpeakerFoundry - Port Calculation & Velocity](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Port Length Calculator](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-020] Trở Kháng Loa Mắc Song Song (Parallel Speaker Impedance)

> **Phân loại độ tin cậy**: Ước lượng danh định  
> **Nhóm người dùng**: Thợ đấu dây loa sub đôi/loa cánh cửa vào ampli

### 1. Công thức toán học (Mathematical Formula)

$$
R_{\text{eq}} = \frac{1}{\sum \frac{1}{R_i}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $R_i$ | Trở kháng danh định của từng loa con | Ohm ($\Omega$) | Thường là $2\Omega$, $4\Omega$, $8\Omega$ hoặc cuộn dây âm kép (DVC: $2\Omega+2\Omega$, $4\Omega+4\Omega$) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Công thức sử dụng giá trị trở kháng danh định (Nominal Impedance).
- Trong thực tế, trở kháng loa là một đại lượng phức $Z(f)$ biến thiên mạnh theo tần số và có điểm cực tiểu $R_{\text{min}}$ (thường gần bằng điện trở thuần $R_e$ của cuộn dây).
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Tuyệt đối không đấu song song các củ loa khiến $R_{\text{eq}}$ tụt xuống dưới mức tải tối thiểu cho phép của ampli (ví dụ: ampli Mono block chỉ chịu tải tối thiểu $1\Omega$ mà đấu xuống $0{,}5\Omega$). Ampli sẽ kích hoạt mạch bảo vệ quá dòng (Protect) hoặc bốc khói sò công suất MOSFET.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Ước lượng dựa trên lý thuyết mạch điện
- **Nguồn 1**: [SpeakerFoundry - Multi-Driver Wiring](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Speaker Impedance Matching](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-021] Điện Áp Hiệu Dụng Ngõ Ra Ampli $V_{\text{rms}}$ (Amplifier RMS AC Output Voltage)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên chỉnh Gain ampli bằng đồng hồ vạn năng DMM

### 1. Công thức toán học (Mathematical Formula)

$$
V_{\text{rms}} = \sqrt{P_{\text{rms}} \times R_{\text{load}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{rms}}$ | Công suất hiệu dụng định mức của ampli | Watt (W) | Công suất công bố của ampli tại trở kháng tương ứng |
| $R_{\text{load}}$ | Trở kháng danh định của tải loa kết nối | Ohm ($\Omega$) | Trở kháng dàn loa đấu vào ampli ($1\Omega$, $2\Omega$, $4\Omega$) |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Áp dụng khi kiểm chuẩn Gain ampli bằng file sóng sin chuẩn ($50\text{ Hz}$ cho loa sub, $1000\text{ Hz}$ cho loa mid/treble) trên tải thuần trở.
- Với tín hiệu nhạc thực tế (có hệ số crest factor $10 - 20\text{ dB}$), điện áp RMS tức thời sẽ thấp hơn nhiều.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Khi căn chỉnh Gain bằng đồng hồ số DMM đo cọc loa ngõ ra, bắt buộc phải tháo dây loa ra khỏi thùng sub để tránh màng loa đánh quá công suất làm rách nhện hoặc thủng tai người đo.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình điện xoay chiều AC
- **Nguồn 1**: [SpeakerFoundry - Amplifier Gain Calibration](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - RMS Voltage and Power](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-022] Cường Độ Dòng Điện Hiệu Dụng Ra Loa $I_{\text{rms}}$ (Amplifier RMS Current)

> **Phân loại độ tin cậy**: Chuẩn mô hình  
> **Nhóm người dùng**: Kỹ thuật viên chọn tiết diện dây loa (Speaker Wire Gauge)

### 1. Công thức toán học (Mathematical Formula)

$$
I_{\text{rms}} = \sqrt{\frac{P_{\text{rms}}}{R_{\text{load}}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{rms}}$ | Công suất RMS ra tải | Watt (W) | Công suất liên tục của kênh ampli |
| $R_{\text{load}}$ | Trở kháng của tải loa | Ohm ($\Omega$) | Trở kháng danh định mảng loa |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Giả thiết tải thuần trở tương đương; dùng để chọn kích cỡ dây loa chịu dòng liên tục.
- Hệ số suy hao Damping Factor của ampli sẽ bị suy giảm nghiêm trọng nếu dây loa quá dài hoặc tiết diện dây quá nhỏ.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Với các dàn loa sub thi đấu SPL công suất $3000 - 5000\text{ W}$ ở tải $1\Omega$, dòng điện ra củ loa lên tới $55 - 70\text{ A}$. Dùng dây loa nhỏ ($16 - 18\text{ AWG}$) sẽ làm nóng rực chảy lớp vỏ nhựa PVC và sinh nguy cơ chập cháy trong thùng xe. Bắt buộc dùng dây loa đồng OFC tối thiểu $10 - 12\text{ AWG}$.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn mô hình định luật Ohm AC
- **Nguồn 1**: [SpeakerFoundry - Speaker Wiring Gauge](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Current and Power Relations](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-023] Mức Tăng Áp Suất Âm Thanh Theo Công Suất $\Delta\text{SPL}$ (Power SPL Gain)

> **Phân loại độ tin cậy**: Chuẩn lý tưởng  
> **Nhóm người dùng**: Kỹ thuật viên tư vấn nâng cấp ampli và độ nhạy loa

### 1. Công thức toán học (Mathematical Formula)

$$
\Delta\text{SPL}_{\text{dB}} = 10 \times \log_{10}\left(\frac{P_2}{P_1}\right)
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_1$ | Mức công suất ampli ban đầu | Watt (W) | $P_1 > 0$ |
| $P_2$ | Mức công suất ampli mới sau khi nâng cấp | Watt (W) | $P_2 > 0$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Quy tắc vàng âm học: Nhân đôi công suất ($P_2 = 2 P_1$) chỉ làm tăng áp suất âm thanh thêm $+3\text{ dB}$. Để tai người cảm nhận âm lượng to gấp đôi, cần mức tăng khoảng $+10\text{ dB}$ (tức phải tăng công suất gấp 10 lần).
- Chưa tính hiện tượng nén nhiệt cuộn âm (Thermal Power Compression) làm suy hao $1 - 3\text{ dB}$ khi củ loa bị nung nóng.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Không cố nâng công suất ampli lên gấp 4 lần để mong âm thanh to hơn rõ rệt nếu củ loa đã chạm ngưỡng công suất chịu đựng (Thermal Power Handling). Nhiệt lượng tích tụ không kịp giải phóng sẽ làm bung keo dán cuộn coil.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Chuẩn định nghĩa Logarithm Decibel
- **Nguồn 1**: [SpeakerFoundry - Acoustic SPL Principles](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Power vs Decibel Gain](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)

---

## [DM-024] Dòng Điện DC Nuôi Ampli Ước Tính (Amplifier DC Current Draw)

> **Phân loại độ tin cậy**: Mô hình ước lượng  
> **Nhóm người dùng**: Thợ điện xe hơi, kỹ thuật viên chọn cầu chì chính và dây nguồn B+

### 1. Công thức toán học (Mathematical Formula)

$$
I_{\text{DC}} = \frac{P_{\text{audio}}}{V_{\text{DC}} \times \eta_{\text{amp}}}
$$

### 2. Bảng biến số đầu vào & Đơn vị tính (SI Units)

| Ký hiệu biến | Tên đại lượng vật lý | Đơn vị SI | Ý nghĩa kỹ thuật & Dải khuyến nghị |
| :---: | :--- | :---: | :--- |
| $P_{\text{audio}}$ | Tổng công suất âm thanh hiệu dụng đầu ra | Watt (W) | Tổng công suất tất cả các kênh ampli |
| $V_{\text{DC}}$ | Điện áp DC nguồn bình ắc quy khi nổ máy | Volt (V) | Thường từ $13{,}8 - 14{,}4\text{V}$; khi xe tắt máy chỉ còn $12{,}0 - 12{,}5\text{V}$ |
| $\eta_{\text{amp}}$ | Hiệu suất chuyển đổi của bộ khuếch đại ampli | Thập phân ($0..1$) | Ampli Class D: $0{,}75 - 0{,}85$; Ampli Class AB: $0{,}50 - 0{,}60$ |

### 3. Phạm vi áp dụng & Cảnh báo an toàn (Safety & Limitations)

::: warning ⚠️ Giới hạn & Giả định kỹ thuật
- Tín hiệu âm nhạc biến động liên tục; dòng điện trung bình khi nghe nhạc thường chỉ bằng $1/3$ đến $1/2$ dòng điện cực đại khi đo sóng sin liên tục.
- Tuy nhiên, cầu chì và dây cáp nguồn bắt buộc phải thiết kế chịu được dòng đỉnh kéo dài.
:::

::: danger 🛑 Cảnh báo an toàn thực chiến
- Bắt buộc phải gắn cầu chì chính (Main Fuse Holder) cách cọc dương bình ắc quy không quá $30 - 45\text{ cm}$. Nếu cáp nguồn B+ đi luồn qua vách ngăn cabin bị cọ rách vỏ mà không có cầu chì đầu nguồn, dòng ngắn mạch hàng nghìn Ampe từ bình sẽ đốt cháy toàn bộ xe chỉ trong 60 giây.
:::

### 4. Phân loại độ tin cậy & Nguồn tham khảo đối chiếu

- **Phân loại**: Mô hình ước lượng cân bằng công suất điện
- **Nguồn 1**: [SpeakerFoundry - Amplifier Power & Fusing](https://speakerfoundry.com/cabinets/)
- **Nguồn 2**: [DIYAudio - Power Supply Sizing](https://www.diyaudioandvideo.com/Calculator/SpeakerBoxEnclosure/)
