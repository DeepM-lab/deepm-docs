import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const CUSTOMER_DIR = path.resolve(__dirname, '../docs/public/images/customer');
const TECH_DIR = path.resolve(__dirname, '../docs/public/images/technician');

async function captureDeepMLab() {
  console.log('Capturing DeepM Lab screenshots with exact localStorage state...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1.5 });

  try {
    // 1. Decoder
    console.log('1. Customer Decoder...');
    await page.goto('http://localhost:5173/');
    await page.evaluate(() => {
      localStorage.setItem('deepm_active_tab', JSON.stringify('tire'));
      localStorage.setItem('deepm_tire_mode', JSON.stringify('decode'));
    });
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(CUSTOMER_DIR, 'customer-decoder.png'),
      clip: { x: 40, y: 150, width: 1360, height: 820 }
    });

    // 2. Visualizer
    console.log('2. Customer Visualizer (So sánh)...');
    await page.evaluate(() => {
      localStorage.setItem('deepm_active_tab', JSON.stringify('tire'));
      localStorage.setItem('deepm_tire_mode', JSON.stringify('compare'));
    });
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(CUSTOMER_DIR, 'customer-visualizer.png'),
      clip: { x: 40, y: 150, width: 1360, height: 840 }
    });

    // 3. Speedometer Error Table
    console.log('3. Speedometer Error...');
    await page.evaluate(() => {
      window.scrollBy(0, 520);
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(CUSTOMER_DIR, 'customer-speedometer.png'),
      clip: { x: 40, y: 120, width: 1360, height: 800 }
    });

    // 4. Technician Mechanic Tools
    console.log('4. Technician Mechanic Tools...');
    await page.evaluate(() => {
      localStorage.setItem('deepm_active_tab', JSON.stringify('mechanic'));
      localStorage.setItem('deepm_mech_mode', JSON.stringify('calculator'));
    });
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(TECH_DIR, 'technician-tools.png'),
      clip: { x: 40, y: 120, width: 1360, height: 840 }
    });

    // 5. Technician Excel Export & History
    console.log('5. Technician Excel...');
    await page.evaluate(() => {
      window.scrollBy(0, 480);
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(TECH_DIR, 'technician-excel.png'),
      clip: { x: 40, y: 120, width: 1360, height: 820 }
    });

    // 6. Technician Encyclopedia
    console.log('6. Technician Encyclopedia...');
    await page.evaluate(() => {
      localStorage.setItem('deepm_active_tab', JSON.stringify('tire'));
      localStorage.setItem('deepm_tire_mode', JSON.stringify('knowledge'));
    });
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(TECH_DIR, 'technician-encyclopedia.png'),
      clip: { x: 40, y: 150, width: 1360, height: 840 }
    });

    console.log('DeepM Lab screenshots captured successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
}

captureDeepMLab();
