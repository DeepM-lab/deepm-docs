import puppeteer from 'puppeteer-core';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const MKT_DIR = path.resolve(__dirname, '../docs/public/images/marketing');

// Tài khoản đăng nhập nội bộ (chỉ chạy local để lấy phiên)
const LOGIN_EMAIL = process.env.LOGIN_EMAIL || 'admin@deepm.vn';
const LOGIN_PASS = process.env.LOGIN_PASS || '';

async function maskPII(page) {
  await page.evaluate(() => {
    // 1. Regex phát hiện TẤT CẢ các email trên trang
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
    const emailMapping = {};
    let staffCount = 1;

    // 2. Duyệt qua tất cả text node trong toàn bộ DOM
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    const textNodes = [];
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    textNodes.forEach(tNode => {
      let val = tNode.nodeValue;
      if (!val) return;

      // Ẩn tất cả email thành email mẫu doanh nghiệp chuẩn
      val = val.replace(emailRegex, (matchedEmail) => {
        const lower = matchedEmail.toLowerCase();
        if (lower.includes('admin') || lower.includes('deepmlab') || lower.includes('vuonghongky')) {
          return 'admin@deepm.vn';
        }
        if (!emailMapping[lower]) {
          emailMapping[lower] = `staff0${staffCount++}@deepm.vn`;
        }
        return emailMapping[lower];
      });

      // Ẩn các từ khóa tên cá nhân
      val = val
        .replace(/Vương Hồng Kỳ/gi, 'Nguyễn Văn Admin')
        .replace(/deepmlab/gi, 'DeepM Team');

      tNode.nodeValue = val;
    });

    // 3. Chuẩn hóa tên và avatar trong bảng nhân sự và danh sách bài đăng
    const sampleNames = [
      'Nguyễn Văn Admin',
      'Trần Thị Marketing',
      'Lê Hoàng Content',
      'Phạm Minh Media',
      'Võ Kỹ Thuật'
    ];
    const sampleAvatars = ['A', 'T', 'L', 'P', 'V'];

    document.querySelectorAll('table tbody tr').forEach((row, idx) => {
      // Họ tên
      const nameEl = row.querySelector('p.font-semibold, p.font-medium');
      if (nameEl) {
        const isMe = nameEl.innerText.includes('Bạn') || idx === 0;
        const assignedName = sampleNames[idx % sampleNames.length];
        if (isMe) {
          nameEl.innerHTML = `${assignedName} <span class="rounded-md bg-indigo-50 border border-indigo-200/80 px-1.5 py-0.2 text-[10px] font-bold text-indigo-700">Bạn</span>`;
        } else {
          nameEl.innerText = assignedName;
        }
      }

      // Avatar chữ cái
      const avatarEl = row.querySelector('div.flex.h-9.w-9, div.flex.h-7.w-7');
      if (avatarEl) {
        avatarEl.innerText = sampleAvatars[idx % sampleAvatars.length];
      }
    });

    // 4. Dropdown lọc nhân viên (select options)
    document.querySelectorAll('select option').forEach((opt, idx) => {
      if (opt.text) {
        opt.text = opt.text.replace(emailRegex, () => `staff0${idx}@deepm.vn`);
      }
    });

    // 5. Input / textarea
    document.querySelectorAll('input, textarea').forEach(el => {
      if (el.value) {
        el.value = el.value.replace(emailRegex, 'staff@deepm.vn');
      }
    });
  });
}

async function convertToWebp(pngPath) {
  const webpPath = pngPath.replace(/\.png$/, '.webp');
  await sharp(pngPath)
    .webp({ quality: 85 })
    .toFile(webpPath);
  console.log(`Converted -> ${path.basename(webpPath)}`);
}

async function captureMarketing() {
  console.log('Khởi chạy trình duyệt tự động đăng nhập & chụp 4 màn hình...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1.5 });

  try {
    // BƯỚC 1: Đăng nhập vào hệ thống
    console.log('1. Đang truy cập trang đăng nhập...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Điền form đăng nhập
    console.log('2. Đang điền tài khoản quản trị...');
    await page.type('input[type="email"]', LOGIN_EMAIL);
    await page.type('input[type="password"]', LOGIN_PASS);
    await new Promise(r => setTimeout(r, 500));

    // Bấm nút đăng nhập
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {})
    ]);
    await new Promise(r => setTimeout(r, 2500));

    console.log('URL hiện tại sau đăng nhập:', page.url());

    // 1. Submit Post Page (Trang chủ)
    console.log('3. Chụp màn hình Submit Post...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await maskPII(page);
    const p1 = path.join(MKT_DIR, 'marketing-submit.png');
    await page.screenshot({
      path: p1,
      clip: { x: 140, y: 70, width: 1160, height: 880 }
    });
    await convertToWebp(p1);

    // 2. My Posts Page
    console.log('4. Chụp màn hình My Posts...');
    await page.goto('http://localhost:3000/my-posts', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await maskPII(page);
    const p2 = path.join(MKT_DIR, 'marketing-myposts.png');
    await page.screenshot({
      path: p2,
      clip: { x: 100, y: 70, width: 1240, height: 880 }
    });
    await convertToWebp(p2);

    // 3. Admin Dashboard
    console.log('5. Chụp màn hình Admin Dashboard (/admin)...');
    await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2500));
    await maskPII(page);
    const p3 = path.join(MKT_DIR, 'admin-dashboard.png');
    await page.screenshot({
      path: p3,
      clip: { x: 40, y: 60, width: 1360, height: 880 }
    });
    await convertToWebp(p3);

    // 4. Admin Staff Management
    console.log('6. Chụp màn hình Admin Staff (/admin/staff)...');
    await page.goto('http://localhost:3000/admin/staff', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2500));
    await maskPII(page);
    const p4 = path.join(MKT_DIR, 'admin-staff.png');
    await page.screenshot({
      path: p4,
      clip: { x: 60, y: 60, width: 1320, height: 880 }
    });
    await convertToWebp(p4);

    console.log('HOÀN TẤT: Cả 4 màn hình riêng biệt đã được chụp và bảo vệ 100% email nhân viên!');
  } catch (err) {
    console.error('Lỗi trong quá trình chụp:', err);
  } finally {
    await browser.close();
  }
}

captureMarketing();
