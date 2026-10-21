<template>
  <div class="interactive-calc-card">
    <div class="calc-header">
      <div class="calc-icon">🔄</div>
      <div>
        <h4 class="calc-title">Công Cụ Quy Đổi Áp Suất Lốp Tức Thì</h4>
        <p class="calc-subtitle">Nhập một đơn vị bất kỳ để tự động quy đổi sang 3 đơn vị còn lại</p>
      </div>
    </div>

    <div class="calc-grid">
      <!-- PSI -->
      <div class="input-group">
        <label for="input-psi">
          <span>PSI</span>
          <span class="unit-desc">Pound / sq inch</span>
        </label>
        <div class="input-wrapper">
          <input
            id="input-psi"
            type="number"
            step="0.5"
            min="0"
            max="120"
            :value="psiVal"
            @input="updateFromPsi(($event.target as HTMLInputElement).value)"
            placeholder="32.0"
          />
          <span class="input-addon">PSI</span>
        </div>
      </div>

      <!-- Bar -->
      <div class="input-group">
        <label for="input-bar">
          <span>Bar</span>
          <span class="unit-desc">Xe châu Âu</span>
        </label>
        <div class="input-wrapper">
          <input
            id="input-bar"
            type="number"
            step="0.05"
            min="0"
            max="8"
            :value="barVal"
            @input="updateFromBar(($event.target as HTMLInputElement).value)"
            placeholder="2.20"
          />
          <span class="input-addon">bar</span>
        </div>
      </div>

      <!-- kPa -->
      <div class="input-group">
        <label for="input-kpa">
          <span>kPa</span>
          <span class="unit-desc">Xe Nhật / Á</span>
        </label>
        <div class="input-wrapper">
          <input
            id="input-kpa"
            type="number"
            step="5"
            min="0"
            max="800"
            :value="kpaVal"
            @input="updateFromKpa(($event.target as HTMLInputElement).value)"
            placeholder="220"
          />
          <span class="input-addon">kPa</span>
        </div>
      </div>

      <!-- kg/cm2 -->
      <div class="input-group">
        <label for="input-kg">
          <span>kg/cm²</span>
          <span class="unit-desc">Thợ hay gọi "cân"</span>
        </label>
        <div class="input-wrapper">
          <input
            id="input-kg"
            type="number"
            step="0.05"
            min="0"
            max="8"
            :value="kgVal"
            @input="updateFromKg(($event.target as HTMLInputElement).value)"
            placeholder="2.25"
          />
          <span class="input-addon">kg/cm²</span>
        </div>
      </div>
    </div>

    <!-- Quick presets -->
    <div class="presets-section">
      <span class="preset-label">Mốc áp suất thông dụng:</span>
      <div class="preset-buttons">
        <button type="button" @click="setPressure(30)">Sedan nhỏ: 30 PSI (2.07 bar)</button>
        <button type="button" @click="setPressure(32)">Sedan/Hatchback: 32 PSI (2.21 bar)</button>
        <button type="button" @click="setPressure(35)">Crossover/SUV: 35 PSI (2.41 bar)</button>
        <button type="button" @click="setPressure(40)">Tải nặng/Bán tải: 40 PSI (2.76 bar)</button>
      </div>
    </div>

    <!-- Status Gauge -->
    <div v-if="psiNumber > 0" class="pressure-gauge" :class="gaugeClass">
      <div class="gauge-badge">{{ gaugeBadge }}</div>
      <div class="gauge-text">{{ gaugeMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const psiNumber = ref<number>(32);

const psiVal = computed(() => (psiNumber.value ? Number(psiNumber.value.toFixed(1)) : ''));
const barVal = computed(() => (psiNumber.value ? Number((psiNumber.value * 0.0689476).toFixed(2)) : ''));
const kpaVal = computed(() => (psiNumber.value ? Math.round(psiNumber.value * 6.89476) : ''));
const kgVal = computed(() => (psiNumber.value ? Number((psiNumber.value * 0.070307).toFixed(2)) : ''));

function updateFromPsi(val: string) {
  const num = parseFloat(val);
  psiNumber.value = isNaN(num) ? 0 : num;
}

function updateFromBar(val: string) {
  const num = parseFloat(val);
  psiNumber.value = isNaN(num) ? 0 : num / 0.0689476;
}

function updateFromKpa(val: string) {
  const num = parseFloat(val);
  psiNumber.value = isNaN(num) ? 0 : num / 6.89476;
}

function updateFromKg(val: string) {
  const num = parseFloat(val);
  psiNumber.value = isNaN(num) ? 0 : num / 0.070307;
}

function setPressure(psi: number) {
  psiNumber.value = psi;
}

const gaugeClass = computed(() => {
  if (psiNumber.value < 26) return 'gauge-danger';
  if (psiNumber.value < 29) return 'gauge-warning';
  if (psiNumber.value <= 38) return 'gauge-optimal';
  if (psiNumber.value <= 44) return 'gauge-high';
  return 'gauge-danger';
});

const gaugeBadge = computed(() => {
  if (psiNumber.value < 26) return 'LỐP QUÁ NON';
  if (psiNumber.value < 29) return 'HƠI THIẾU ÁP SUẤT';
  if (psiNumber.value <= 38) return 'CHUẨN LÝ TƯỞNG';
  if (psiNumber.value <= 44) return 'HƠI CĂNG / TẢI NẶNG';
  return 'CỰC KỲ NGUY HIỂM';
});

const gaugeMessage = computed(() => {
  if (psiNumber.value < 26) {
    return 'Dưới 26 PSI: Xe nặng lái, nhanh nóng hỏng hông lốp, hao nhiên liệu nghiêm trọng.';
  }
  if (psiNumber.value < 29) {
    return 'Từ 26 - 29 PSI: Lốp hơi mềm, dễ mòn vẹt 2 bên vai lốp khi vận hành dài ngày.';
  }
  if (psiNumber.value <= 38) {
    return 'Từ 29 - 38 PSI: Dải áp suất phổ biến nhất của xe con & SUV đô thị. Êm ái, bám đường, mòn đều.';
  }
  if (psiNumber.value <= 44) {
    return 'Từ 38 - 44 PSI: Phù hợp khi xe chở đủ tải tối đa hoặc xe bán tải chở hàng nặng.';
  }
  return 'Trên 44 PSI: Quá căng! Gai lốp mòn vẹt chính giữa, quãng đường phanh trượt dài, nguy cơ nổ lốp!';
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

.calc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  margin-bottom: 1.25rem;
}

.input-group label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.unit-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  font-weight: normal;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 8px 48px 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  font-weight: 600;
  outline: none;
  transition: all 0.2s ease;
}

.input-wrapper input:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.input-addon {
  position: absolute;
  right: 10px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  pointer-events: none;
}

.presets-section {
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
  margin-bottom: 1rem;
}

.preset-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  display: block;
  margin-bottom: 8px;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.preset-buttons button {
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preset-buttons button:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.pressure-gauge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
}

.gauge-badge {
  font-weight: 700;
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 9999px;
  white-space: nowrap;
}

.gauge-text {
  flex: 1;
  line-height: 1.4;
}

.gauge-optimal {
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #22c55e;
}
.gauge-optimal .gauge-badge {
  background: #22c55e;
  color: #000;
}

.gauge-warning {
  background: rgba(234, 179, 8, 0.12);
  border: 1px solid rgba(234, 179, 8, 0.35);
  color: #eab308;
}
.gauge-warning .gauge-badge {
  background: #eab308;
  color: #000;
}

.gauge-high {
  background: rgba(249, 115, 22, 0.12);
  border: 1px solid rgba(249, 115, 22, 0.35);
  color: #f97316;
}
.gauge-high .gauge-badge {
  background: #f97316;
  color: #000;
}

.gauge-danger {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #ef4444;
}
.gauge-danger .gauge-badge {
  background: #ef4444;
  color: #fff;
}
</style>
