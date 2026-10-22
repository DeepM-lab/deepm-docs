<template>
  <div class="interactive-calc-card">
    <div class="calc-header">
      <div class="calc-icon">📅</div>
      <div>
        <h4 class="calc-title">Bàn Tính Tuổi Thọ & Hạn Lốp Xe (Mã DOT 4 Số)</h4>
        <p class="calc-subtitle">Nhập 4 số dập nổi trên hông lốp để kiểm tra ngày xuất xưởng và độ an toàn</p>
      </div>
    </div>

    <div class="dot-input-row">
      <div class="dot-input-box">
        <span class="dot-prefix">DOT</span>
        <input
          v-model="dotInput"
          type="text"
          maxlength="4"
          placeholder="4721"
          @input="handleInput"
          class="dot-field"
        />
      </div>
      <div class="dot-quick-sample">
        <span>Thử nhanh:</span>
        <button type="button" @click="dotInput = '1524'">1524 (Lốp mới 2024)</button>
        <button type="button" @click="dotInput = '4721'">4721 (Lốp 2021)</button>
        <button type="button" @click="dotInput = '3219'">3219 (Lốp cũ 2019)</button>
        <button type="button" @click="dotInput = '1017'">1017 (Hết đát 2017)</button>
      </div>
    </div>

    <!-- Result Box -->
    <div v-if="parsedData" class="dot-result" :class="parsedData.statusClass">
      <div class="dot-result-header">
        <div class="dot-badge">{{ parsedData.badge }}</div>
        <div class="dot-age-highlight">
          <span v-if="parsedData.isFuture || parsedData.isInvalid">Trạng thái: </span>
          <span v-else>Đã xuất xưởng: </span>
          <strong>{{ parsedData.ageText }}</strong>
        </div>
      </div>

      <div class="dot-details-grid">
        <div class="detail-item">
          <span class="detail-label">{{ parsedData.isFuture ? 'Thời điểm ghi trên lốp:' : (parsedData.isInvalid ? 'Mã tuần nhập:' : 'Thời điểm sản xuất:') }}</span>
          <span class="detail-val">Tuần {{ parsedData.week }}<template v-if="parsedData.month > 0"> (Khoảng tháng {{ parsedData.month }}/{{ parsedData.year }})</template></span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Năm dương lịch:</span>
          <span class="detail-val">{{ parsedData.year }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">{{ (parsedData.isFuture || parsedData.isInvalid) ? 'Đánh giá tính hợp lệ:' : 'Tình trạng cao su:' }}</span>
          <span class="detail-val">{{ parsedData.statusDesc }}</span>
        </div>
      </div>

      <div class="dot-advice">
        <strong>Khuyến cáo:</strong> {{ parsedData.advice }}
      </div>
    </div>

    <div v-else-if="dotInput.length > 0 && dotInput.length < 4" class="dot-hint">
      Vui lòng nhập đủ 4 chữ số (ví dụ: <strong>4721</strong>)
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const dotInput = ref('4721');

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/[^0-9]/g, '');
  dotInput.value = target.value;
}

const parsedData = computed(() => {
  if (dotInput.value.length !== 4) return null;

  const week = parseInt(dotInput.value.slice(0, 2), 10);
  const rawYear = parseInt(dotInput.value.slice(2, 4), 10);

  if (isNaN(week) || isNaN(rawYear)) return null;

  const fullYear = 2000 + rawYear;

  // 1. Kiểm tra tuần hợp lệ (1 đến 53)
  if (week < 1 || week > 53) {
    return {
      week,
      month: 0,
      year: fullYear,
      ageText: 'Mã không hợp lệ',
      badge: 'MÃ KHÔNG HỢP LỆ (TUẦN SAI)',
      statusClass: 'status-danger',
      statusDesc: `Tuần "${week}" không tồn tại (Một năm tối đa 52 - 53 tuần)`,
      advice: 'Vui lòng kiểm tra lại 2 chữ số đầu tiên biểu thị tuần sản xuất trên hông lốp xe.',
      isFuture: false,
      isInvalid: true,
    };
  }

  const now = new Date();
  // Ước tính ngày sản xuất: Ngày 1/1 của năm + (tuần - 0.5) * 7 ngày (chuẩn DeepM Lab)
  const mfgDate = new Date(fullYear, 0, 1);
  mfgDate.setDate(mfgDate.getDate() + Math.round((week - 0.5) * 7));
  const month = Math.min(12, Math.max(1, mfgDate.getMonth() + 1));

  // 2. Kiểm tra nếu thời điểm sản xuất nằm ở tương lai
  const diffMs = now.getTime() - mfgDate.getTime();
  if (diffMs < 0) {
    return {
      week,
      month,
      year: fullYear,
      ageText: 'Thời điểm tương lai',
      badge: 'CHƯA SẢN XUẤT (TƯƠNG LAI)',
      statusClass: 'status-future',
      statusDesc: `Tuần ${week} năm ${fullYear} chưa diễn ra so với thời điểm hiện tại!`,
      advice: `Thời điểm này chưa xuất hiện trên lịch thực tế. Vui lòng kiểm tra lại 4 chữ số dập nổi cạnh ký hiệu DOT trên thành lốp (hoặc bạn có thể đang đọc nhầm số khác).`,
      isFuture: true,
      isInvalid: false,
    };
  }

  // 3. Tính tuổi chính xác theo năm và tháng theo lịch thực tế (chuẩn DeepM Lab)
  const ageYears = Math.round((diffMs / (365.25 * 24 * 3600 * 1000)) * 10) / 10;

  let years = now.getFullYear() - mfgDate.getFullYear();
  let months = now.getMonth() - mfgDate.getMonth();
  if (now.getDate() < mfgDate.getDate()) {
    months--;
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years < 0) {
    years = 0;
    months = 0;
  }

  const ageText = years > 0 
    ? `${years} năm ${months} tháng tuổi` 
    : months > 0 
      ? `${months} tháng tuổi` 
      : 'Dưới 1 tháng tuổi';

  // 4. Phân loại mức độ an toàn theo tiêu chuẩn quốc tế và DeepM Lab
  let statusClass = 'status-optimal';
  let badge = 'MỚI SẢN XUẤT (TỐI ƯU)';
  let statusDesc = 'Độ đàn hồi dẻo dai, bám đường tuyệt đối';
  let advice = 'Lốp còn rất mới, độ an toàn hoàn hảo. Duy trì bơm đúng áp suất và cân bằng động định kỳ.';

  if (ageYears >= 6) { // >= 6 năm: Hết hạn sử dụng kỹ thuật
    statusClass = 'status-danger';
    badge = 'HẾT HẠN (QUÁ 6 NĂM)';
    statusDesc = 'Cao su đã lão hóa nặng, chai cứng hoàn toàn';
    advice = 'Khuyến nghị thay mới khẩn cấp! Dù gai lốp còn dày, cao su đã mất đàn hồi, nguy cơ nứt rạn hông hoặc tách lớp bố thép khi chạy tốc độ cao là rất lớn.';
  } else if (ageYears >= 5) { // 5 - 6 năm: Cần theo dõi định kỳ
    statusClass = 'status-warning';
    badge = 'CẦN THEO DÕI (5 - 6 NĂM TUỔI)';
    statusDesc = 'Bắt đầu có dấu hiệu chai cứng hoặc rạn chân chim rãnh gai';
    advice = 'Lốp đã đạt 5 - 6 năm tuổi. Dù gai lốp còn dày, hợp chất cao su đã bắt đầu chai cứng, nên mang xe đến garage kiểm tra định kỳ hàng năm.';
  } else if (ageYears >= 3) { // 3 - 5 năm: Đã qua sử dụng, còn tốt
    statusClass = 'status-good';
    badge = 'CÒN HẠN (CHẤT LƯỢNG TỐT)';
    statusDesc = 'Đã qua sử dụng nhưng cao su còn độ đàn hồi tốt';
    advice = 'Lốp trong tình trạng vận hành ổn định. Đảo lốp định kỳ mỗi 8.000 - 10.000 km để đảm bảo 4 bánh mòn đều.';
  }

  return {
    week,
    month,
    year: fullYear,
    ageText,
    badge,
    statusClass,
    statusDesc,
    advice,
    isFuture: false,
    isInvalid: false,
  };
});
</script>

<style scoped>
.interactive-calc-card {
  margin: 1.5rem 0;
  padding: 1.5rem;
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand-soft);
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.15);
}

.calc-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.25rem;
}

.calc-icon {
  font-size: 28px;
  line-height: 1;
}

.calc-title {
  margin: 0 !important;
  font-size: 1.15rem !important;
  color: var(--vp-c-text-1);
  font-weight: 700;
}

.calc-subtitle {
  margin: 2px 0 0 0 !important;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.dot-input-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-bottom: 1.25rem;
}

.dot-input-box {
  display: inline-flex;
  align-items: center;
  border-radius: 10px;
  border: 2px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  overflow: hidden;
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
}

.dot-prefix {
  padding: 8px 12px;
  background: var(--vp-c-brand-1);
  color: #000;
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: 1px;
}

.dot-field {
  padding: 8px 14px;
  width: 90px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 4px;
  text-align: center;
  outline: none;
}

.dot-quick-sample {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.dot-quick-sample button {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dot-quick-sample button:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.dot-result {
  padding: 1.25rem;
  border-radius: 10px;
  border: 1px solid transparent;
}

.dot-result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1rem;
}

.dot-badge {
  font-size: 0.75rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 9999px;
  letter-spacing: 0.5px;
}

.dot-age-highlight {
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.dot-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  padding: 10px 0;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.detail-val {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.dot-advice {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.status-optimal {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.35);
}
.status-optimal .dot-badge {
  background: #22c55e;
  color: #000;
}

.status-good {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.35);
}
.status-good .dot-badge {
  background: #10b981;
  color: #000;
}

.status-warning {
  background: rgba(234, 179, 8, 0.1);
  border-color: rgba(234, 179, 8, 0.35);
}
.status-warning .dot-badge {
  background: #eab308;
  color: #000;
}

.status-high {
  background: rgba(249, 115, 22, 0.1);
  border-color: rgba(249, 115, 22, 0.35);
}
.status-high .dot-badge {
  background: #f97316;
  color: #000;
}

.status-danger {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.35);
}
.status-danger .dot-badge {
  background: #ef4444;
  color: #fff;
}

.status-future {
  background: rgba(244, 63, 94, 0.12);
  border-color: rgba(244, 63, 94, 0.45);
}
.status-future .dot-badge {
  background: #f43f5e;
  color: #fff;
}

.dot-hint {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style>
