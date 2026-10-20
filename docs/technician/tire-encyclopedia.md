# 2. Bách Khoa Toàn Thư Thuật Ngữ Lốp (Encyclopedia)

Bách khoa toàn thư lốp xe của DeepM Lab là thư viện tra cứu tiêu chuẩn công nghiệp, giúp thợ máy và kỹ thuật viên nhanh chóng giải nghĩa các ký hiệu đặc biệt của từng hãng xe và chẩn đoán chính xác nguyên nhân mòn lốp bất thường.

---

## 📸 Giao diện tra cứu Bách khoa toàn thư

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Lab • 3. Cẩm nang kỹ thuật & Dấu hiệu báo mòn lốp</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/technician/technician-encyclopedia.webp" alt="Giao diện tra cứu bách khoa toàn thư lốp xe thực tế" />
  </div>
</div>

### Hướng dẫn chi tiết từng điểm chạm:

* <span class="step-badge">1</span> **Tra cứu Ký hiệu nhà sản xuất thiết bị gốc (OE Markings)**:
  * Nhiều dòng xe cao cấp yêu cầu lốp phát triển riêng với kết cấu bố và hợp chất cao su đặc thù:
    * `MO` / `MOE`: Mercedes-Benz Original (MOE có tính năng chạy xịt Run-flat).
    * `*` (Dấu hoa thị): BMW / MINI Original.
    * `AO` / `RO1`: Audi Original / Audi Sport quattro.
    * `N0`, `N1`, `N2`: Porsche Original Spec.
    * `T0`, `T1`: Tesla Spec (tích hợp đệm mút triệt tiêu tiếng ồn trong lòng lốp).

* <span class="step-badge">2</span> **Phân loại gai địa hình (Terrain Tech Specs)**:
  * `H/T (Highway Terrain)`: 80% đường phố / 20% đường xấu, êm ái, phanh ướt tốt.
  * `A/T (All-Terrain)`: 50% On-road / 50% Off-road, gai đan xen, hông gia cường chống đá chém.
  * `R/T (Rugged Terrain)`: Cầu nối giữa A/T và M/T, gai hông hầm hố nhưng chạy phố ít ồn.
  * `M/T (Mud Terrain)`: 15% phố / 85% bùn lầy địa hình gắt, rãnh gai sâu tự thoát bùn.

* <span class="step-badge">3</span> **Cẩm nang chẩn đoán dấu hiệu mòn lốp bất thường**:
  * Chẩn đoán sai lệch góc đặt bánh xe dựa trên bề mặt lốp:

| Hiện tượng mòn | Nguyên nhân kỹ thuật | Hướng xử lý của xưởng |
| :--- | :--- | :--- |
| **Mòn mép trong (Inner wear)** | Góc Camber âm quá lớn (Negative Camber) hoặc rơ rotuyn | Cân chỉnh lại góc Camber, kiểm tra bạc đạn càng A |
| **Mòn mép ngoài (Outer wear)** | Góc Camber dương quá lớn hoặc vào cua gấp liên tục | Giảm bớt góc Camber dương |
| **Mòn răng cưa / Lông nhím** | Sai độ chụm (Toe-in hoặc Toe-out không chuẩn) | Căn chỉnh lại thanh giằng lái và góc Toe |
| **Mòn giữa mặt lốp** | Bơm quá áp suất tiêu chuẩn (Over-inflation) kéo dài | Hạ áp suất về đúng khuyến nghị nhà sản xuất |
| **Mòn 2 bên vai lốp** | Thiếu áp suất (Under-inflation) hoặc chở quá tải | Bơm bổ sung áp suất, kiểm tra xì van chân không |
| **Mòn lõm từng đốm (Cupping)** | Phuộc giảm xóc bị chảy dầu, mất cân bằng động bánh | Thay thế phuộc nhún và cân mâm chì bấm |

::: tip 💡 Mẹo tư vấn khách hàng
Khi phát hiện lốp có hiện tượng mòn mép hoặc mòn lông nhím, hãy tư vấn khách hàng kết hợp **Cân chỉnh thước lái góc đặt bánh xe (Alignment)** và **Cân bằng động mâm lốp (Wheel Balancing)** ngay để tránh phải thay lốp mới sớm.
:::
