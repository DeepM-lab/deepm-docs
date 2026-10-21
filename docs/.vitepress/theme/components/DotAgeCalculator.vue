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
          Đã xuất xưởng: <strong>{{ parsedData.ageText }}</strong>
        </div>
      </div>

      <div class="dot-details-grid">
        <div class="detail-item">
          <span class="detail-label">Thời điểm sản xuất:</span>
          <span class="detail-val">Tuần {{ parsedData.week }} (Khoảng tháng {{ parsedData.month }}/{{ parsedData.year }})</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Năm dương lịch:</span>
          <span class="detail-val">{{ parsedData.year }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Tình trạng cao su:</span>
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
  if (week < 1 || week > 53) return null;

  const fullYear = 2000 + rawYear;
  // approximate month
  const month = Math.min(12, Math.max(1, Math.ceil(week / 4.33)));

  // Current date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  let totalMonths = (currentYear - fullYear) * 12 + (currentMonth - month);
  if (totalMonths < 0) totalMonths = 0;

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  let ageText = '';
  if (years > 0 && remainingMonths > 0) {
    ageText = `${years} năm ${remainingMonths} tháng`;
  } else if (years > 0) {
    ageText = `${years} năm`;
  } else {
    ageText = `${remainingMonths} tháng`;
  }

  // Classify safety
  let statusClass = 'status-optimal';
  let badge = 'CAO SU TỐI ƯU (DƯỚI 3 NĂM)';
  let statusDesc = 'Độ đàn hồi dẻo dai, bám đường tuyệt đối';
  let advice = 'Lốp còn rất mới, độ an toàn hoàn hảo. Duy trì bơm đúng áp suất và cân bằng động định kỳ.';

  if (totalMonths >= 72) { // 6+ years
    statusClass = 'status-danger';
    badge = 'HẾT HẠN AN TOÀN (TRÊN 6 NĂM)';
    statusDesc = 'Cao su đã lão hóa nặng, chai cứng hoàn toàn';
    advice = 'Khuyến nghị thay mới khẩn cấp! Dù gai lốp còn dày, nguy cơ tách lớp bố thép và nổ lốp ở tốc độ cao là rất lớn.';
  } else if (totalMonths >= 60) { // 5-6 years
    statusClass = 'status-high';
    badge = 'LÃO HÓA (5 - 6 NĂM)';
    statusDesc = 'Bắt đầu có vết rạn chân chim, giảm bám đường ướt';
    advice = 'Cần mang xe đến garage để kỹ thuật viên kiểm tra độ đàn hồi, rạn nứt rãnh gai và lên kế hoạch thay lốp.';
  } else if (totalMonths >= 36) { // 3-5 years
    statusClass = 'status-warning';
    badge = 'BÌNH THƯỜNG (3 - 5 NĂM)';
    statusDesc = 'Cao su bắt đầu có dấu hiệu lão hóa tự nhiên';
    advice = 'Theo dõi kiểm tra 6 tháng/lần. Đảo lốp định kỳ mỗi 8.000 - 10.000 km để đảm bảo 4 bánh mòn đều.';
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

.dot-hint {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style>
