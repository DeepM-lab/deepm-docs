<template>
  <div class="table-interactive-card">
    <div class="table-interactive-toolbar">
      <div class="table-search-box">
        <span class="table-search-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          :value="searchQuery"
          type="text"
          class="table-search-input"
          :placeholder="placeholder || 'Tìm kiếm nhanh (số Li, kg, tên xe...)'"
          aria-label="Lọc nhanh bảng tra cứu"
          role="searchbox"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          @input="handleInput"
          @keydown.esc="clearSearch"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="table-search-clear"
          title="Xóa tìm kiếm (Esc)"
          aria-label="Xóa tìm kiếm"
          @click="clearSearch"
        >
          ✕
        </button>
      </div>

      <div
        v-if="isMounted && totalRows > 0"
        class="table-meta-badge"
        role="status"
        aria-live="polite"
      >
        <span v-if="searchQuery.trim()">
          Hiển thị <strong>{{ visibleRows }}</strong> / {{ totalRows }} dòng
        </span>
        <span v-else>
          Toàn bộ <strong>{{ totalRows }}</strong> dòng tra cứu
        </span>
      </div>
    </div>

    <div
      ref="scrollContainer"
      class="table-scroll-container"
      :style="{ maxHeight: maxHeight || '460px' }"
    >
      <slot />

      <div
        v-if="isMounted && searchQuery.trim() && visibleRows === 0"
        class="table-empty-state"
      >
        <div class="table-empty-icon">🔍</div>
        <div class="table-empty-title">Không tìm thấy kết quả phù hợp</div>
        <div class="table-empty-desc">
          Không có dòng nào khớp với từ khóa "<strong>{{ searchQuery }}</strong>". Vui lòng kiểm tra lại số liệu hoặc tên hãng xe.
        </div>
        <button type="button" class="table-reset-btn" @click="clearSearch">
          Hiện lại toàn bộ bảng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    maxHeight?: string;
  }>(),
  {
    placeholder: 'Tìm kiếm nhanh (số Li, kg, tên xe...)',
    maxHeight: '460px',
  }
);

const searchQuery = ref('');
const isMounted = ref(false);
const totalRows = ref(0);
const visibleRows = ref(0);
const scrollContainer = ref<HTMLElement | null>(null);

let rowData: { raw: string; norm: string; el: HTMLTableRowElement }[] = [];
let rafId: number | null = null;
let initTimer: ReturnType<typeof setTimeout> | null = null;

function removeDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function initTable() {
  if (!scrollContainer.value) return;
  const table = scrollContainer.value.querySelector('table');
  if (!table) return;

  // Trích xuất tiêu đề cột thead để làm giàu từ khóa tìm kiếm (ví dụ: tìm "Li 90", "tải 600kg")
  const theadThs = Array.from(table.querySelectorAll('thead th')).map((th) =>
    (th.textContent || '').trim().toLowerCase()
  );

  const tbody = table.querySelector('tbody') || table;
  const rows = Array.from(tbody.querySelectorAll('tr')).filter(
    (tr) => !tr.closest('thead')
  ) as HTMLTableRowElement[];

  rowData = rows.map((tr) => {
    const cells = Array.from(tr.querySelectorAll('td, th'));
    const cellStrings: string[] = [];

    cells.forEach((cell, idx) => {
      const text = (cell.textContent || '').trim().toLowerCase();
      if (!text) return;
      cellStrings.push(text);

      const colHeader = theadThs[idx];
      if (colHeader && colHeader !== text) {
        cellStrings.push(`${colHeader} ${text}`);
      }

      // Làm giàu thêm dạng viết liền: "li" + số (ví dụ: li91, li60)
      if (colHeader === 'li' && /^\d+$/.test(text)) {
        cellStrings.push(`li${text}`);
      }

      // Hỗ trợ ký hiệu ngôi sao BMW: nếu ô có "★", thêm ký tự "*" và "star"
      if (text.includes('★')) {
        cellStrings.push('* star ngoi sao');
      }

      // Hỗ trợ tên viết tắt hãng xe phổ biến (Volkswagen -> VW, General Motors -> GM)
      if (text.includes('volkswagen')) {
        cellStrings.push('vw');
      }
      if (text.includes('general motors')) {
        cellStrings.push('gm chevy chevrolet');
      }
      if (text.includes('mercedes')) {
        cellStrings.push('mec mer');
      }
    });

    // Nối dữ liệu từng ô có dấu cách phân cách để tránh dính liền text giữa các cột liền kề
    const raw = cellStrings.join(' ');
    // Bỏ dấu chấm ngăn cách hàng nghìn (1.000 -> 1000, 2.840 -> 2840) giúp tìm kiếm cả có chấm lẫn không chấm
    const noThousandDots = raw.replace(/(\d)\.(\d{3})/g, (_m, p1, p2) => p1 + p2);
    // Bổ sung các biến thể gạch nối liền (run-flat -> runflat run flat, e-tron -> etron e tron, semi-slick -> semislick semi slick)
    const noHyphen = raw.replace(/([a-zA-Z0-9]+)-([a-zA-Z0-9]+)/g, '$1$2 $1 $2');
    const combined = `${raw} ${noThousandDots} ${noHyphen}`;
    const norm = removeDiacritics(combined);

    return { raw: combined, norm, el: tr };
  });

  totalRows.value = rows.length;
  visibleRows.value = rows.length;
}

function normalizeQuery(input: string): string {
  let q = input.trim().toLowerCase();
  // 1. Tách ký hiệu ngôi sao dính liền (bmw* -> bmw *, *bmw -> * bmw)
  q = q.replace(/([a-zA-Z0-9])\*/g, '$1 *').replace(/\*([a-zA-Z0-9])/g, '* $1');
  // 2. Tách đơn vị dính liền trước, hỗ trợ cả dấu chấm lẫn dấu phẩy (1,000kg -> 1,000 kg, 1.000kg -> 1.000 kg, 551lbs -> 551 lbs)
  q = q.replace(/(\d+(?:[.,]\d+)?)(kg|lbs|bar|psi)\b/gi, (_m, p1, p2) => `${p1} ${p2}`);
  // 3. Chuẩn hóa dấu phân cách hàng nghìn (1,000 / 1.000 -> 1000, 2,840 -> 2840)
  q = q.replace(/(\d+)[,.](\d{3})\b/g, '$1$2');
  // 4. Chuẩn hóa chỉ số Li: 'li 91', 'li91', 'li-91', 'li - 91', 'li.91', 'li: 91' -> 'li91'
  // Khớp chính xác mã Li được lập chỉ mục, triệt tiêu false-positive với các số ngẫu nhiên khác trong bảng
  q = q.replace(/\bli[-_.:\s]*(\d+)\b/gi, (_m, p1) => `li${p1}`);
  return q;
}

function handleSearch() {
  const query = normalizeQuery(searchQuery.value);
  if (!query) {
    rowData.forEach((item) => {
      item.el.style.display = '';
    });
    visibleRows.value = rowData.length;
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = 0;
    }
    return;
  }

  // Tokenize cụm từ tìm kiếm, loại bỏ dấu câu thừa nhưng giữ ký tự dấu sao/cộng
  const cleanTokens = query.replace(/[(),:;]/g, ' ').split(/\s+/).filter(Boolean);
  const normTokens = cleanTokens.map((t) => removeDiacritics(t));
  let count = 0;

  rowData.forEach((item) => {
    // Mọi từ khóa (token) trong truy vấn phải xuất hiện trong chuỗi gốc hoặc chuỗi chuẩn hóa
    const matches = cleanTokens.every((token, i) => {
      const normToken = normTokens[i];
      return item.raw.includes(token) || item.norm.includes(normToken);
    });

    if (matches) {
      item.el.style.display = '';
      count++;
    } else {
      item.el.style.display = 'none';
    }
  });

  visibleRows.value = count;
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0;
  }
}

function scheduleSearch() {
  if (typeof window === 'undefined') {
    handleSearch();
    return;
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }
  rafId = requestAnimationFrame(() => {
    handleSearch();
    rafId = null;
  });
}

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  searchQuery.value = target ? target.value : '';
}

watch(searchQuery, () => {
  scheduleSearch();
});

function clearSearch() {
  searchQuery.value = '';
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  handleSearch();
}

onMounted(() => {
  isMounted.value = true;
  nextTick(() => {
    initTable();
    // Bổ sung kiểm tra an toàn nếu slot table bị trễ trong quá trình hydration
    if (totalRows.value === 0) {
      initTimer = setTimeout(initTable, 100);
    }
  });
});

onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }
  if (initTimer) {
    clearTimeout(initTimer);
  }
});
</script>
