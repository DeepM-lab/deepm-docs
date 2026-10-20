import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const MKT_DIR = path.resolve(__dirname, '../docs/public/images/marketing');

async function captureMarketing() {
  console.log('Capturing Marketing screens with mock_session cookie...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1.5 });

  try {
    await page.setCookie({
      name: 'mock_session',
      value: 'admin',
      domain: 'localhost',
      path: '/'
    });

    // 1. Submit Post Page
    console.log('1. Capturing Submit Post...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({
      path: path.join(MKT_DIR, 'marketing-submit.png'),
      clip: { x: 140, y: 70, width: 1160, height: 880 }
    });

    // 2. My Posts Page
    console.log('2. Capturing My Posts...');
    await page.goto('http://localhost:3000/my-posts', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({
      path: path.join(MKT_DIR, 'marketing-myposts.png'),
      clip: { x: 100, y: 70, width: 1240, height: 880 }
    });

    // 3. Admin Dashboard
    console.log('3. Capturing Admin Dashboard...');
    await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: path.join(MKT_DIR, 'admin-dashboard.png'),
      clip: { x: 40, y: 60, width: 1360, height: 880 }
    });

    // 4. Admin Staff Management
    console.log('4. Capturing Admin Staff...');
    await page.goto('http://localhost:3000/admin/staff', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: path.join(MKT_DIR, 'admin-staff.png'),
      clip: { x: 60, y: 60, width: 1320, height: 880 }
    });

    console.log('All Marketing screens captured successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
}

captureMarketing();
