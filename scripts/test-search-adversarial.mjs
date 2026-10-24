import fs from 'fs';

export function removeDiacritics(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function parseTableFromContainer(htmlSnippet) {
  const containerMatch = htmlSnippet.match(/class=\"table-scroll-container\"[^>]*>([\s\S]*?)<\/div>/i);
  if (!containerMatch) throw new Error('No table-scroll-container found');
  const tableMatch = containerMatch[1].match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) throw new Error('No table inside container found');
  const tableContent = tableMatch[1];
  const theadMatch = tableContent.match(/<thead[^>]*>([\s\S]*?)<\/thead>/i);
  let theadThs = [];
  if (theadMatch) {
    theadThs = [...theadMatch[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((m) =>
      m[1].replace(/<[^>]+>/g, '').trim().toLowerCase()
    );
  }
  const tbodyMatch = tableContent.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i) || [null, tableContent];
  const rowMatches = [...tbodyMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];

  return rowMatches.map((trMatch, rIdx) => {
    const cells = [...trMatch[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) =>
      m[1].replace(/<[^>]+>/g, '').trim().toLowerCase()
    );
    const cellStrings = [];
    cells.forEach((cell, idx) => {
      const text = (typeof cell === 'string' ? cell : (cell.textContent || '')).trim().toLowerCase();
      if (!text) return;
      cellStrings.push(text);
      const colHeader = theadThs[idx];
      if (colHeader && colHeader !== text) {
        cellStrings.push(colHeader + ' ' + text);
      }
      if (colHeader === 'li' && /^\d+$/.test(text)) {
        cellStrings.push('li' + text);
      }
      if (text.includes('★')) {
        cellStrings.push('* star ngoi sao');
      }
      if (text.includes('volkswagen')) cellStrings.push('vw');
      if (text.includes('general motors')) cellStrings.push('gm chevy chevrolet');
      if (text.includes('mercedes')) cellStrings.push('mec mer');
    });
    const raw = cellStrings.join(' ');
    // Bỏ dấu chấm phân cách hàng nghìn (1.000 -> 1000)
    const noThousandDots = raw.replace(/(\d)\.(\d{3})/g, (_m, p1, p2) => p1 + p2);
    // Bỏ hoặc biến đổi dấu gạch nối nối từ (run-flat -> runflat run flat, e-tron -> etron e tron)
    const noHyphen = raw.replace(/([a-zA-Z0-9]+)-([a-zA-Z0-9]+)/g, '$1$2 $1 $2');
    const combined = `${raw} ${noThousandDots} ${noHyphen}`;
    const norm = removeDiacritics(combined);
    return { raw: combined, norm, rIdx };
  });
}

export function normalizeQueryPerfect(input) {
  let q = input.trim().toLowerCase();
  // 1. Tách ký hiệu ngôi sao dính liền (bmw* -> bmw *, *bmw -> * bmw)
  q = q.replace(/([a-zA-Z0-9])\*/g, '$1 *').replace(/\*([a-zA-Z0-9])/g, '* $1');
  // 2. Tách đơn vị dính liền trước (1,000kg -> 1,000 kg, 1.000kg -> 1.000 kg, 551lbs -> 551 lbs)
  q = q.replace(/(\d+(?:[.,]\d+)?)(kg|lbs|bar|psi)\b/gi, (_m, p1, p2) => p1 + ' ' + p2);
  // 3. Chuẩn hóa phân cách hàng nghìn (1,000 / 1.000 -> 1000, 2,840 -> 2840)
  q = q.replace(/(\d+)[,.](\d{3})\b/g, '$1$2');
  // 4. Chuẩn hóa tiền tố Li: 'li 91', 'li91', 'li-91', 'li - 91', 'li.91', 'li: 91' -> 'li91'
  q = q.replace(/\bli[-_.:\s]*(\d+)\b/gi, (_m, p1) => 'li' + p1);
  return q;
}

export function search(rows, queryStr, normFn) {
  const query = normFn(queryStr);
  if (!query) return rows;
  const cleanTokens = query.replace(/[(),:;]/g, ' ').split(/\s+/).filter(Boolean);
  const normTokens = cleanTokens.map((t) => removeDiacritics(t));
  return rows.filter((item) => {
    return cleanTokens.every((token, i) => {
      const normToken = normTokens[i];
      return item.raw.includes(token) || item.norm.includes(normToken);
    });
  });
}

const htmlLi = fs.readFileSync('docs/.vitepress/dist/customer/reading-tire-specs.html', 'utf8');
const rowsLi = parseTableFromContainer(htmlLi);
console.log('Total Li rows parsed from container:', rowsLi.length);

const htmlOE = fs.readFileSync('docs/.vitepress/dist/customer/utqg-oe-markings.html', 'utf8');
const rowsOE = parseTableFromContainer(htmlOE);
console.log('Total OE rows parsed from container:', rowsOE.length);

const testCases = [
  ['li 91', rowsLi, 1, 1],
  ['li91', rowsLi, 1, 1],
  ['li-91', rowsLi, 1, 1],
  ['li - 91', rowsLi, 1, 1],
  ['li.91', rowsLi, 1, 1],
  ['li: 91', rowsLi, 1, 1],
  ['li:91', rowsLi, 1, 1],
  ['li91 615kg', rowsLi, 1, 1],
  ['li60 250kg', rowsLi, 1, 1],
  ['615kg', rowsLi, 1, 1],
  ['615 kg', rowsLi, 1, 1],
  ['1000kg', rowsLi, 2, 2],
  ['1,000kg', rowsLi, 2, 2],
  ['1.000kg', rowsLi, 2, 2],
  ['1,000 kg', rowsLi, 2, 2],
  ['1.000 kg', rowsLi, 2, 2],
  ['2,840kg', rowsLi, 1, 1],
  ['2840 kg', rowsLi, 1, 1],
  ['bmw *', rowsOE, 3, 3],
  ['bmw*', rowsOE, 3, 3],
  ['*', rowsOE, 3, 3],
  ['star', rowsOE, 3, 3],
  ['vw', rowsOE, 1, 1],
  ['gm', rowsOE, 1, 1],
  ['chevy', rowsOE, 1, 1],
  ['mercedes', rowsOE, 5, 5],
  ['mec', rowsOE, 5, 5],
  ['mer', rowsOE, 5, 6],
  ['porsche 911', rowsOE, 1, 1],
  ['taycan', rowsOE, 1, 1],
  ['audi ao', rowsOE, 3, 4],
  ['ao-silent', rowsOE, 1, 1],
  ['ao silent', rowsOE, 1, 1],
  ['aosilent', rowsOE, 1, 1],
  ['ferrari k1', rowsOE, 1, 1],
  ['tesla', rowsOE, 1, 1],
  ['maybach', rowsOE, 1, 1],
  ['run flat', rowsOE, 2, 2],
  ['run-flat', rowsOE, 2, 2],
  ['runflat', rowsOE, 2, 2],
  ['etron', rowsOE, 1, 1],
  ['e-tron', rowsOE, 1, 1],
  ['semislick', rowsOE, 1, 1],
  ['semi-slick', rowsOE, 1, 1],
];

let failed = 0;
testCases.forEach(([q, dataset, minExpected, maxExpected]) => {
  const res = search(dataset, q, normalizeQueryPerfect);
  const pass = res.length >= minExpected && (maxExpected === undefined || res.length <= maxExpected);
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'} [${q}] => found ${res.length} (expected ${minExpected}..${maxExpected})`);
});

console.log(`\nResult: ${testCases.length - failed}/${testCases.length} PASS`);
