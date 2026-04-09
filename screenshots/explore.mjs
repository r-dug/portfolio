import { chromium } from 'playwright';

const SHOTS = '/home/richard/Documents/personal_projects/portfolio/screenshots';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  // ---- Portfolio site ----
  console.log('--- Portfolio site ---');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${SHOTS}/portfolio_home.png`, fullPage: true });
  console.log('Portfolio home captured');

  await page.click('text=View Projects');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${SHOTS}/portfolio_projects.png`, fullPage: true });
  console.log('Portfolio projects captured');

  await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${SHOTS}/portfolio_about.png`, fullPage: true });
  console.log('Portfolio about captured');

  // Navigate to each project page
  const projectSlugs = ['tutorail', 'bounty-os', 'neonatal-ai', 'fungus-classifier', 'federated-learning', 'style-mimicry'];
  for (const slug of projectSlugs) {
    try {
      await page.goto(`http://localhost:5173/projects/${slug}`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `${SHOTS}/portfolio_project_${slug}.png`, fullPage: true });
      console.log(`Portfolio project ${slug} captured`);
    } catch (e) {
      console.log(`Failed to capture ${slug}: ${e.message}`);
    }
  }

  // ---- TutorAIL live site ----
  console.log('\n--- TutorAIL live site ---');
  try {
    await page.goto('https://tutorail.app', { waitUntil: 'networkidle', timeout: 15000 });
    await page.screenshot({ path: `${SHOTS}/tutorail_landing.png`, fullPage: true });
    console.log('TutorAIL landing captured');

    // Check for login/signup
    const loginBtn = page.locator('text=Log in').or(page.locator('text=Sign in')).or(page.locator('text=Login'));
    if (await loginBtn.count() > 0) {
      await loginBtn.first().click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `${SHOTS}/tutorail_login.png`, fullPage: true });
      console.log('TutorAIL login captured');
    }

    // Try signup flow
    const signupBtn = page.locator('text=Sign up').or(page.locator('text=Register')).or(page.locator('text=Create account'));
    if (await signupBtn.count() > 0) {
      await signupBtn.first().click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `${SHOTS}/tutorail_signup.png`, fullPage: true });
      console.log('TutorAIL signup captured');
    }
  } catch (e) {
    console.log(`TutorAIL site error: ${e.message}`);
  }

  await browser.close();
  console.log('\nDone!');
})();
