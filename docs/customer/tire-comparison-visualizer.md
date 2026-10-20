# 2. So Sánh & Mô Phỏng Lên Mâm (Tire Visualizer)

Khi bạn muốn thay đổi kích cỡ lốp hoặc nâng cấp mâm xe (ví dụ từ mâm 16 inch lên 17 inch hay 18 inch), việc so sánh trực quan là cực kỳ quan trọng để đảm bảo bánh xe không bị cạ quẹt vào vòm bánh xe hoặc giảm xóc.

---

## 📸 Giao diện trực quan mô phỏng 2 lốp đè lên nhau

<div class="doc-screenshot-frame">
  <div class="doc-screenshot-bar">
    <span class="doc-dot red"></span>
    <span class="doc-dot yellow"></span>
    <span class="doc-dot green"></span>
    <span class="doc-screenshot-title">DeepM Lab • 2. So sánh lốp Zin vs Độ (Geometric Delta)</span>
  </div>
  <div class="doc-screenshot-body">
    <img src="/images/customer/customer-visualizer.webp" alt="Giao diện mô phỏng và so sánh lốp Zin vs Độ thực tế" />
  </div>
</div>

### Hướng dẫn chi tiết từng điểm chạm:

* <span class="step-badge">1</span> **Nhập thông số Lốp nguyên bản (Zin)**:
  * Điền 3 thông số của lốp đang dùng: **Rộng (mm)**, **Tỷ lệ (%)**, **Mâm (inch)** (Ví dụ: `205 / 55 / 16`).
  * Hệ thống tự động tính ra đường kính bánh xe nguyên bản ($631.9\text{ mm}$) và chu vi lăn bánh ($1985.2\text{ mm}$).

* <span class="step-badge">2</span> **Nhập thông số Lốp mới dự kiến lên**:
  * Điền kích thước lốp mới mà bạn muốn nâng cấp (Ví dụ: `225 / 50 / 17`).
  * Xem ngay đường kính mới ($656.8\text{ mm}$) và chu vi mới ($2063.4\text{ mm}$).

* <span class="step-badge">3</span> **Đọc bảng Kết quả đối sánh kỹ thuật (Geometric Delta)**:
  * **Chênh lệch đường kính**: Thể hiện bánh xe to ra bao nhiêu ($+24.9\text{ mm}$, tương ứng $+3.94\%$).
  * **Độ nâng khoảng sáng gầm**: Gầm xe sẽ tự động được nâng cao thêm $+12.4\text{ mm}$ do bán kính lốp lớn hơn.
  * **Chênh lệch vòng quay bánh xe trên 1 km**: Bánh mới to hơn sẽ quay ít hơn (chỉ $485\text{ vòng/km}$ so với $504\text{ vòng/km}$ của lốp cũ).

---

## 📐 Nguyên tắc vàng khi lên mâm (Plus Sizing Guide)

Khi bạn tăng đường kính mâm xe (Inches), bạn bắt buộc phải **hạ tỷ lệ biên dạng hông lốp (%)** xuống để giữ cho đường kính tổng thể của bánh xe gần như không đổi.

```
Ví dụ nguyên tắc bù trừ kích thước:
- Lốp Zin:     205 / 55 R16  -->  Đường kính: 631.9 mm
- Lên mâm 17": 225 / 45 R17  -->  Đường kính: 634.3 mm (Lệch chỉ +0.38% - CỰC KỲ AN TOÀN)
```

::: tip 💡 Lời khuyên từ chuyên gia DeepM
Nếu bạn chỉ đổi mâm mà không hạ tỷ lệ hông lốp tương ứng (ví dụ từ `205/55R16` lên `225/50R17`), đường kính tổng thể sẽ tăng tới $+3.94\%$. Mức sai lệch này vượt ngưỡng an toàn khuyến nghị $+3\%$, có thể gây cạ lốp khi đánh hết lái hoặc chở tải nặng.
:::
