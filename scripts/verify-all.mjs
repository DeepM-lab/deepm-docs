#!/usr/bin/env node

/**
 * verify-all.mjs - Kịch bản kiểm thử tự động độc lập 4 tầng (4-Tier E2E Verification Suite)
 * 
 * Dự án: docs-deepm (DeepM Documentation Hub)
 * Framework: Pure Node.js (ESM), không phụ thuộc thêm thư viện ngoài.
 * 
 * Tầng 1: Feature & Specification Coverage
 * Tầng 2: Boundary & Security Leak Check
 * Tầng 3: Cross-Feature & Sidebar Integration
 * Tầng 4: Real-World Build Execution
 * 
 * Cách chạy:
 *   node scripts/verify-all.mjs              # Chạy cả 4 tầng
 *   node scripts/verify-all.mjs --tier=1     # Chạy riêng tầng 1
 *   node scripts/verify-all.mjs --tier=2     # Chạy riêng tầng 2
 *   node scripts/verify-all.mjs --tier=3     # Chạy riêng tầng 3
 *   node scripts/verify-all.mjs --tier=4     # Chạy riêng tầng 4
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

// Màu ANSI cho terminal
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

// Quản lý kết quả
const results = {
  tier1: { name: 'Tier 1: Feature & Specification Coverage', passed: 0, failed: 0, items: [] },
  tier2: { name: 'Tier 2: Boundary & Security Leak Check', passed: 0, failed: 0, items: [] },
  tier3: { name: 'Tier 3: Cross-Feature & Sidebar Integration', passed: 0, failed: 0, items: [] },
  tier4: { name: 'Tier 4: Real-World Build Execution', passed: 0, failed: 0, items: [] },
};

function record(tierKey, name, pass, message = '') {
  const tier = results[tierKey];
  if (pass) {
    tier.passed++;
    tier.items.push({ name, pass: true, message });
    console.log(`  ${c.green}✓ [PASS]${c.reset} ${name}`);
  } else {
    tier.failed++;
    tier.items.push({ name, pass: false, message });
    console.log(`  ${c.red}✗ [FAIL]${c.reset} ${name}${message ? `\n      ${c.red}Chi tiết: ${message}${c.reset}` : ''}`);
  }
}

// ============================================================================
// TIER 1: FEATURE & SPECIFICATION COVERAGE
// ============================================================================
function runTier1() {
  console.log(`\n${c.bold}${c.cyan}====================================================================${c.reset}`);
  console.log(`${c.bold}${c.cyan}  TIER 1: FEATURE & SPECIFICATION COVERAGE VERIFICATION${c.reset}`);
  console.log(`${c.bold}${c.cyan}====================================================================${c.reset}`);

  // 1. Kiểm tra 12 file chuyên đề tools
  const toolsDir = path.join(DOCS_DIR, 'technician', 'tools');
  const expectedFiles = [
    { file: '01-offroad-4x4.md', start: 1, end: 12, count: 12, name: 'Offroad 4x4' },
    { file: '02-car-audio-spl.md', start: 13, end: 24, count: 12, name: 'Car Audio SPL' },
    { file: '03-camping-rv.md', start: 25, end: 36, count: 12, name: 'Camping RV' },
    { file: '04-performance-tuning.md', start: 37, end: 48, count: 12, name: 'Performance Tuning' },
    { file: '05-drift-racing.md', start: 49, end: 58, count: 10, name: 'Drift Racing' },
    { file: '06-wheel-tire.md', start: 59, end: 68, count: 10, name: 'Wheel & Tire' },
    { file: '07-automotive-electrical.md', start: 69, end: 80, count: 12, name: 'Automotive Electrical' },
    { file: '08-battery-storage.md', start: 81, end: 92, count: 12, name: 'Battery Storage' },
    { file: '09-mechanical-fabrication.md', start: 93, end: 104, count: 12, name: 'Mechanical Fabrication' },
    { file: '10-ev-hybrid.md', start: 105, end: 114, count: 10, name: 'EV & Hybrid' },
    { file: '11-detailing-bodywork.md', start: 115, end: 125, count: 11, name: 'Detailing & Bodywork' },
    { file: '12-garage-maintenance.md', start: 126, end: 135, count: 10, name: 'Garage Maintenance' },
  ];

  const toolsDirExists = fs.existsSync(toolsDir) && fs.statSync(toolsDir).isDirectory();
  record('tier1', 'Thư mục docs/technician/tools/ tồn tại', toolsDirExists, toolsDirExists ? '' : `Chưa tìm thấy thư mục: ${toolsDir}`);

  const allFoundTools = new Set();

  for (const group of expectedFiles) {
    const filePath = path.join(toolsDir, group.file);
    const fileExists = fs.existsSync(filePath);
    
    if (!fileExists) {
      record('tier1', `Tệp chuyên đề ${group.file} (${group.name})`, false, `Tệp chưa được tạo tại ${filePath}`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const missingIds = [];
    let foundInGroup = 0;

    for (let id = group.start; id <= group.end; id++) {
      const idStr = `DM-${String(id).padStart(3, '0')}`;
      if (content.includes(idStr)) {
        foundInGroup++;
        allFoundTools.add(idStr);
      } else {
        missingIds.push(idStr);
      }
    }

    const hasKaTeX = content.includes('$') || content.includes('$$');
    const hasVariables = content.includes('|') && (content.includes('Đơn vị') || content.includes('Biến') || content.includes('Ý nghĩa'));
    const isFull = (foundInGroup === group.count) && hasKaTeX && hasVariables;

    let msg = `Đã tìm thấy ${foundInGroup}/${group.count} công cụ`;
    if (missingIds.length > 0) msg += ` (Thiếu: ${missingIds.join(', ')})`;
    if (!hasKaTeX) msg += ' [Thiếu công thức KaTeX]';
    if (!hasVariables) msg += ' [Thiếu bảng biến số]';

    record('tier1', `Tệp chuyên đề ${group.file} (đủ ${group.count} tools: DM-${String(group.start).padStart(3, '0')}..DM-${String(group.end).padStart(3, '0')})`, isFull, isFull ? '' : msg);
  }

  // Tổng hợp đủ 135 công cụ
  const totalFound = allFoundTools.size;
  record('tier1', `Tổng hợp đủ 135 công cụ kỹ thuật (DM-001 đến DM-135)`, totalFound === 135, `Hiện tìm thấy ${totalFound}/135 công cụ`);

  // 2. Kiểm tra Sensor Fusion Diagnostics (F1-F17)
  const sensorPath = path.join(DOCS_DIR, 'technician', 'sensor-fusion-diagnostics.md');
  if (!fs.existsSync(sensorPath)) {
    record('tier1', `Tệp docs/technician/sensor-fusion-diagnostics.md tồn tại`, false, 'Không tìm thấy file');
  } else {
    const sensorContent = fs.readFileSync(sensorPath, 'utf-8');
    const missingF = [];
    for (let i = 1; i <= 17; i++) {
      const fPattern = new RegExp(`\\bF0?${i}\\b`, 'i');
      if (!fPattern.test(sensorContent)) {
        missingF.push(`F${i}`);
      }
    }
    const hasAllF = missingF.length === 0;
    record('tier1', `Bao phủ đầy đủ 17 nhóm hư hỏng tiềm ẩn (F1 đến F17)`, hasAllF, hasAllF ? '' : `Thiếu các nhóm lỗi: ${missingF.join(', ')}`);

    // 3 nguồn cảm biến
    const has3Sources = (sensorContent.includes('OBD2') || sensorContent.includes('Mode 01')) &&
                        (sensorContent.includes('Tap') || sensorContent.includes('trích tín hiệu') || sensorContent.includes('Op-Amp')) &&
                        (sensorContent.includes('Cấy') || sensorContent.includes('chuyên dụng') || sensorContent.includes('Add-on'));
    record('tier1', `Bản đồ 3 nguồn cảm biến (OBD2, Tap trực tiếp bảo vệ Op-Amp, Cảm biến cấy thêm)`, has3Sources, has3Sources ? '' : 'Chưa trình bày đủ 3 nguồn thu thập cảm biến');

    // Quy trình kết nối Garage
    const hasGarageWorkflow = sensorContent.includes('Garage') || sensorContent.includes('gara') || sensorContent.includes('kết nối');
    record('tier1', `Quy trình kết nối Garage & Hỗ trợ từ xa chuẩn bị phụ tùng`, hasGarageWorkflow, hasGarageWorkflow ? '' : 'Chưa có quy trình Garage');
  }

  // 3. Kiểm tra Alternator 210A Power
  const altPath = path.join(DOCS_DIR, 'technician', 'alternator-210a-power.md');
  if (!fs.existsSync(altPath)) {
    record('tier1', `Tệp docs/technician/alternator-210a-power.md tồn tại`, false, 'Không tìm thấy file');
  } else {
    const altContent = fs.readFileSync(altPath, 'utf-8');
    
    // Ma trận dòng xe
    const hasToyota = /Toyota|Land Cruiser|LC80|LC100|Hilux|Fortuner|Prado/i.test(altContent);
    const hasMitsubishi = /Mitsubishi|Triton|Pajero/i.test(altContent);
    const hasFord = /Ford|Ranger|Everest/i.test(altContent);
    const hasNissan = /Nissan|Navara|Patrol/i.test(altContent);
    const hasMatrix = hasToyota && hasMitsubishi && hasFord && hasNissan;
    record('tier1', `Ma trận tương thích dòng xe máy phát 210A (Toyota, Mitsubishi, Ford, Nissan...)`, hasMatrix, hasMatrix ? '' : 'Thiếu một số dòng xe trọng điểm trong bảng tương thích');

    // Chính sách bảo hành & Plug & Play
    const hasWarranty = /bảo hành\s*(?:2|3|2\s*[-–]\s*3)\s*năm/i.test(altContent);
    const hasPlugPlay = /Plug\s*(?:&|and)\s*Play|không cắt\s*(?:trích\s*)?dây/i.test(altContent);
    record('tier1', `Chính sách bảo hành 2–3 năm (off-road) và cam kết Plug & Play`, hasWarranty && hasPlugPlay, `Bảo hành: ${hasWarranty ? 'OK' : 'Thiếu'}, Plug&Play: ${hasPlugPlay ? 'OK' : 'Thiếu'}`);

    // Hồ sơ giải đua & cứu hộ tời
    const hasRacing = /VOC|RFC|HTV/i.test(altContent) && /tời|cứu hộ/i.test(altContent);
    record('tier1', `Hồ sơ thực chiến giải đua lớn (VOC, RFC, HTV) & cứu hộ tời hạng nặng`, hasRacing, hasRacing ? '' : 'Chưa có thông tin giải đua VOC/RFC/HTV hoặc cứu hộ tời');
  }

  // 4. Kiểm tra Tire Encyclopedia & Customer Guide
  const tirePath = path.join(DOCS_DIR, 'technician', 'tire-encyclopedia.md');
  const customerTirePath = path.join(DOCS_DIR, 'customer', 'reading-tire-specs.md');
  const customerOePath = path.join(DOCS_DIR, 'customer', 'utqg-oe-markings.md');

  const tireFiles = [tirePath, customerTirePath, customerOePath].filter(p => fs.existsSync(p));
  const combinedTireContent = tireFiles.map(p => fs.readFileSync(p, 'utf-8')).join('\n');

  // Load Index 60..130
  let loadIndexCoverage = true;
  const missingLi = [];
  for (const li of [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130]) {
    const liRegex = new RegExp(`(?:\\|\\s*|^\\s*)(?:\\*{1,3}|\`)?\\s*${li}\\s*(?:\\*{1,3}|\`)?\\s*\\|`, 'm');
    if (!liRegex.test(combinedTireContent)) {
      missingLi.push(li);
    }
  }
  if (missingLi.length > 3) loadIndexCoverage = false;
  record('tier1', `Bảng tra cứu toàn diện Load Index (bao phủ từ 60 đến 130)`, loadIndexCoverage, loadIndexCoverage ? '' : `Chưa bao phủ đủ dải Load Index (Mẫu thiếu: ${missingLi.join(', ')})`);

  // Speed Rating A1..(Y)
  let speedCoverage = true;
  const sampleSpeeds = ['A1', 'A8', 'B', 'H', 'V', 'W', 'Y', '\\(Y\\)'];
  const missingSpeeds = [];
  for (const s of sampleSpeeds) {
    const spRegex = new RegExp(`(?:\\|\\s*|^\\s*)(?:\\*{1,3}|\`)?\\s*${s}\\s*(?:\\*{1,3}|\`)?\\s*\\|`, 'm');
    if (!spRegex.test(combinedTireContent)) {
      missingSpeeds.push(s.replace(/\\/g, ''));
    }
  }
  if (missingSpeeds.length > 2) speedCoverage = false;
  record('tier1', `Bảng tra cứu toàn diện Speed Rating (bao phủ từ A1 đến (Y))`, speedCoverage, speedCoverage ? '' : `Thiếu một số cấp tốc độ: ${missingSpeeds.join(', ')}`);

  // Flotation conversion
  const hasFlotation = /Flotation|inch|33x12\.5|35x12\.5/i.test(combinedTireContent);
  record('tier1', `Quy đổi kích thước lốp địa hình Flotation (inch sang mm)`, hasFlotation, hasFlotation ? '' : 'Chưa có nội dung quy đổi lốp Flotation');

  // OE markings
  const hasOeMarkings = /OE|Porsche|Ferrari|Mercedes|BMW|Tesla/i.test(combinedTireContent);
  record('tier1', `Bảng giải mã ký hiệu lốp nguyên gốc (OE Markings) các hãng xe sang`, hasOeMarkings, hasOeMarkings ? '' : 'Chưa có giải mã OE Markings');
}

// ============================================================================
// TIER 2: BOUNDARY & SECURITY LEAK CHECK
// ============================================================================
function runTier2() {
  console.log(`\n${c.bold}${c.magenta}====================================================================${c.reset}`);
  console.log(`${c.bold}${c.magenta}  TIER 2: BOUNDARY & SECURITY LEAK CHECK VERIFICATION${c.reset}`);
  console.log(`${c.bold}${c.magenta}====================================================================${c.reset}`);

  // Tìm tất cả các file markdown trong docs/
  function getAllMarkdownFiles(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== '.vitepress' || !entry.name.startsWith('.')) {
          files = files.concat(getAllMarkdownFiles(fullPath));
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const mdFiles = getAllMarkdownFiles(DOCS_DIR);
  console.log(`  ${c.gray}→ Đang quét bảo mật ${mdFiles.length} tệp tài liệu trong docs/...${c.reset}`);

  // Danh mục Blacklist
  const blacklistRules = [
    {
      id: 'SEC-01',
      name: 'Rò rỉ biến điểm số / logic thuật toán (score =, Score =)',
      regex: /\bscore\s*=|Score\s*=/gi,
      severity: 'CRITICAL',
    },
    {
      id: 'SEC-02',
      name: 'Rò rỉ thuật toán tổng hợp F18 (Global Health Score / F18)',
      regex: /\bF18\b|Global Health Score/gi,
      severity: 'CRITICAL',
    },
    {
      id: 'SEC-03',
      name: 'Rò rỉ đơn giá phôi nhôm xưởng (800k, 2tr5, 4tr)',
      regex: /\b800k\b|\b2tr5\b|\b2\.5tr\b|\b4tr\b/gi,
      severity: 'HIGH',
    },
    {
      id: 'SEC-04',
      name: 'Rò rỉ từ ngữ lịch sử giá vốn xưởng (bán lỗ, LỖ ĐIÊN)',
      regex: /bán lỗ|LỖ ĐIÊN/gi,
      severity: 'HIGH',
    },
    {
      id: 'SEC-05',
      name: 'Rò rỉ số điện thoại cá nhân (0379878888)',
      regex: /0379\s*878\s*888|0379\.878\.888|0379878888/g,
      severity: 'CRITICAL',
    },
    {
      id: 'SEC-06',
      name: 'Rò rỉ số tài khoản ngân hàng nội bộ (0851000023456)',
      regex: /0851000023456/g,
      severity: 'CRITICAL',
    },
  ];

  let totalLeaksFound = 0;
  for (const rule of blacklistRules) {
    const violations = [];

    for (const filePath of mdFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const line = lines[lineIdx];
        if (rule.regex.test(line)) {
          const relPath = path.relative(ROOT_DIR, filePath);
          violations.push(`${relPath}:${lineIdx + 1} -> "${line.trim().substring(0, 80)}"`);
        }
      }
    }

    const passed = violations.length === 0;
    if (!passed) totalLeaksFound += violations.length;

    record(
      'tier2',
      `[${rule.id}] ${rule.name}`,
      passed,
      passed ? '' : `Phát hiện ${violations.length} vi phạm:\n        ${violations.join('\n        ')}`
    );
  }

  // 7. Kiểm tra cú pháp KaTeX an toàn
  // - Ký tự `|` chưa escape trong inline math bên trong dòng bảng Markdown
  const katexTablePipeViolations = [];
  const unclosedMathViolations = [];

  for (const filePath of mdFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const relPath = path.relative(ROOT_DIR, filePath);

    // Kiểm tra $$ chẵn lẻ
    const doubleDollarCount = (content.match(/\$\$/g) || []).length;
    if (doubleDollarCount % 2 !== 0) {
      unclosedMathViolations.push(`${relPath}: Số lượng dấu $$ không chẵn (${doubleDollarCount} dấu)`);
    }

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const line = lines[lineIdx];
      // Nếu là dòng bảng Markdown (bắt đầu bằng |)
      if (line.trim().startsWith('|')) {
        // Tìm xem có inline math $ ... $ nào chứa ký tự | không được escape không
        const inlineMathMatches = line.match(/\$([^\$]+)\$/g);
        if (inlineMathMatches) {
          for (const mathExpr of inlineMathMatches) {
            // Nếu chứa | mà không phải \| và không dùng \vert hay \mid
            const inner = mathExpr.slice(1, -1);
            if (inner.includes('|') && !inner.includes('\\|') && !inner.includes('\\vert') && !inner.includes('\\mid')) {
              katexTablePipeViolations.push(`${relPath}:${lineIdx + 1} -> ${mathExpr}`);
            }
          }
        }
      }
    }
  }

  record(
    'tier2',
    `[KATEX-01] Cú pháp KaTeX bảng Markdown: Không dùng '|' trần làm vỡ cột bảng (dùng \\vert hoặc \\mid)`,
    katexTablePipeViolations.length === 0,
    katexTablePipeViolations.length === 0 ? '' : `Phát hiện dấu | chưa escape trong KaTeX bảng:\n        ${katexTablePipeViolations.join('\n        ')}`
  );

  record(
    'tier2',
    `[KATEX-02] Tính toàn vẹn đóng mở công thức khối ($$ ... $$)`,
    unclosedMathViolations.length === 0,
    unclosedMathViolations.length === 0 ? '' : `Phát hiện lỗi không đóng $$:\n        ${unclosedMathViolations.join('\n        ')}`
  );
}

// ============================================================================
// TIER 3: CROSS-FEATURE & SIDEBAR INTEGRATION
// ============================================================================
function runTier3() {
  console.log(`\n${c.bold}${c.yellow}====================================================================${c.reset}`);
  console.log(`${c.bold}${c.yellow}  TIER 3: CROSS-FEATURE & SIDEBAR INTEGRATION VERIFICATION${c.reset}`);
  console.log(`${c.bold}${c.yellow}====================================================================${c.reset}`);

  // 1. Kiểm tra config.mts
  const configPath = path.join(DOCS_DIR, '.vitepress', 'config.mts');
  if (!fs.existsSync(configPath)) {
    record('tier3', 'Tệp docs/.vitepress/config.mts tồn tại', false, 'Không tìm thấy file');
    return;
  }

  const configContent = fs.readFileSync(configPath, 'utf-8');

  const expectedToolRoutes = [
    '01-offroad-4x4',
    '02-car-audio-spl',
    '03-camping-rv',
    '04-performance-tuning',
    '05-drift-racing',
    '06-wheel-tire',
    '07-automotive-electrical',
    '08-battery-storage',
    '09-mechanical-fabrication',
    '10-ev-hybrid',
    '11-detailing-bodywork',
    '12-garage-maintenance',
  ];

  const missingSidebarRoutes = [];
  for (const route of expectedToolRoutes) {
    if (!configContent.includes(route)) {
      missingSidebarRoutes.push(route);
    }
  }

  const sidebarOk = missingSidebarRoutes.length === 0;
  record(
    'tier3',
    'Cấu hình Sidebar docs/.vitepress/config.mts chứa đủ liên kết 12 chuyên đề tools',
    sidebarOk,
    sidebarOk ? '' : `Thiếu các routes trong config.mts: ${missingSidebarRoutes.join(', ')}`
  );

  // 2. Kiểm tra mechanic-tools.md liên kết 12 chuyên đề
  const mechanicToolsPath = path.join(DOCS_DIR, 'technician', 'mechanic-tools.md');
  if (!fs.existsSync(mechanicToolsPath)) {
    record('tier3', 'Tệp docs/technician/mechanic-tools.md tồn tại', false, 'Không tìm thấy file');
  } else {
    const mechContent = fs.readFileSync(mechanicToolsPath, 'utf-8');
    const missingMechLinks = [];
    for (const route of expectedToolRoutes) {
      if (!mechContent.includes(route)) {
        missingMechLinks.push(route);
      }
    }
    const mechOk = missingMechLinks.length === 0;
    record(
      'tier3',
      'Trang mục lục docs/technician/mechanic-tools.md liên kết thông suốt 12 chuyên đề',
      mechOk,
      mechOk ? '' : `Thiếu liên kết tới: ${missingMechLinks.join(', ')}`
    );
  }
}

// ============================================================================
// TIER 4: REAL-WORLD BUILD EXECUTION
// ============================================================================
function runTier4() {
  console.log(`\n${c.bold}${c.green}====================================================================${c.reset}`);
  console.log(`${c.bold}${c.green}  TIER 4: REAL-WORLD BUILD EXECUTION (pnpm build)${c.reset}`);
  console.log(`${c.bold}${c.green}====================================================================${c.reset}`);

  console.log(`  ${c.gray}→ Đang thực thi build VitePress: pnpm build tại ${ROOT_DIR}...${c.reset}`);
  const startTime = Date.now();

  const isWin = process.platform === 'win32';
  const command = isWin ? 'cmd.exe' : 'pnpm';
  const args = isWin ? ['/c', 'pnpm build'] : ['build'];

  const buildProcess = spawnSync(command, args, {
    cwd: ROOT_DIR,
    encoding: 'utf-8',
    stdio: 'pipe',
    shell: false,
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  const exitCode = buildProcess.status;
  const stdout = buildProcess.stdout || '';
  const stderr = buildProcess.stderr || '';

  const buildSuccess = exitCode === 0;
  const outputCombined = stdout + '\n' + stderr;

  let details = `Exit Code: ${exitCode} (${durationSec}s)`;
  if (!buildSuccess) {
    // Trích xuất 10 dòng lỗi cuối cùng
    const errorLines = outputCombined.split('\n').filter(l => l.trim()).slice(-10).join('\n        ');
    details += `\n        ${errorLines}`;
  }

  record(
    'tier4',
    `Thực thi VitePress Build hoàn tất với Exit Code 0 (${durationSec}s)`,
    buildSuccess,
    buildSuccess ? '' : details
  );

  // Kiểm tra thư mục dist được sinh ra
  const distDir = path.join(DOCS_DIR, '.vitepress', 'dist');
  const indexHtml = path.join(distDir, 'index.html');
  const distOk = fs.existsSync(distDir) && fs.existsSync(indexHtml);

  record(
    'tier4',
    'Thư mục đầu ra docs/.vitepress/dist được tạo đầy đủ với index.html',
    distOk,
    distOk ? '' : `Không tìm thấy file: ${indexHtml}`
  );
}

// ============================================================================
// MAIN RUNNER & REPORT SUMMARY
// ============================================================================
function main() {
  const args = process.argv.slice(2);
  const tierArg = args.find(a => a.startsWith('--tier='));
  const targetTier = tierArg ? parseInt(tierArg.split('=')[1], 10) : 0;

  console.log(`${c.bold}${c.blue}╔══════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.bold}${c.blue}║          DEEPM DOCS — 4-TIER AUTOMATED E2E VERIFICATION SUITE         ║${c.reset}`);
  console.log(`${c.bold}${c.blue}╚══════════════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log(`${c.gray}Thời gian: ${new Date().toISOString()} | Thư mục: ${ROOT_DIR}${c.reset}`);

  if (targetTier === 0 || targetTier === 1) runTier1();
  if (targetTier === 0 || targetTier === 2) runTier2();
  if (targetTier === 0 || targetTier === 3) runTier3();
  if (targetTier === 0 || targetTier === 4) runTier4();

  // Bảng tổng kết
  console.log(`\n${c.bold}====================================================================${c.reset}`);
  console.log(`${c.bold}                       BẢNG TỔNG KẾT KIỂM THỬ                       ${c.reset}`);
  console.log(`${c.bold}====================================================================${c.reset}`);

  let totalPassed = 0;
  let totalFailed = 0;

  for (const [key, t] of Object.entries(results)) {
    if (t.items.length === 0) continue;
    const color = t.failed === 0 ? c.green : c.red;
    console.log(`  ${color}${t.name.padEnd(50)}: ${t.passed} PASS, ${t.failed} FAIL${c.reset}`);
    totalPassed += t.passed;
    totalFailed += t.failed;
  }

  console.log(`${c.bold}--------------------------------------------------------------------${c.reset}`);
  const grandColor = totalFailed === 0 ? c.green : c.red;
  console.log(`  ${grandColor}${c.bold}TỔNG CỘNG: ${totalPassed} PASS, ${totalFailed} FAIL / ${totalPassed + totalFailed} TESTS${c.reset}`);
  console.log(`${c.bold}====================================================================${c.reset}\n`);

  if (totalFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
