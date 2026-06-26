# words
Search for words by given criteria

- TODO Just copying this here for now; move it somewhere else

## Playwright Testing: Termux & GitHub Actions Setup
This guide provides a lightweight, framework-free architecture that allows you to write, organize, and execute Playwright tests both natively inside Termux (Android) and seamlessly within GitHub Actions (Ubuntu). [1, 2] 
By utilizing vanilla Node.js scripts instead of the official @playwright/test runner, we successfully bypass the strict Android platform block completely.
------------------------------
## 🛠️ Configuration## 1. File Structure
Organize your workspace so your core test logic remains clean and decoupled from the browser orchestration layer:

```
your-project/
├── .env                  # Local device paths (git-ignored)
├── package.json          # Node shortcuts and dependencies
├── run-tests.js          # Main browser orchestrator
└── tests/                # Test suites directory
    ├── homePage.js
    └── search.js
```

## 2. Dependencies
Ensure your project contains the appropriate packages. The playwright-core library handles native system browser routing inside Android, while the standard playwright bundle downloads dependencies on GitHub.
Run this inside your Termux project directory:

pkg update && pkg install tur-repo nodejs-lts chromium -y
npm install playwright playwright-core dotenv

## 3. Environment Variables (.env)
Create a .env file in your root folder. This file ensures Playwright avoids binary downloads locally and maps directly to your phone's native browser compilation path:

PLAYWRIGHT_BROWSERS_PATH=0
CHROMIUM_PATH=/data/data/com.termux/files/usr/bin/chromium-browser

(Make sure to append .env to your .gitignore file so your personal device paths are not committed to GitHub).
## 4. Direct Shortcuts (package.json)
Update your scripts object. To prevent Playwright from crashing immediately on Android, our custom execution snippet tricks Node's initialization memory layout into evaluating the platform as linux right before reading your files:

"scripts": {
  "test": "node --eval \"Object.defineProperty(process, 'platform', { value: 'linux' }); require('./run-tests.js')\"",
  "test:ci": "node run-tests.js"
}

------------------------------
## 📝 Writing Your Tests## 1. Writing Individual Test Files
Individual tests are placed inside the tests/ directory. Rather than executing on execution, each file exports an asynchronous function module that accepts Playwright's shared operational page instance:
## tests/homePage.js [3] 

module.exports = async function(page) {
  console.log('📖 Running Home Page Test...');
  await page.goto('https://example.com');
  
  const title = await page.title();
  if (!title.includes('Example Domain')) {
    throw new Error(`Home page title mismatch: Got "${title}"`);
  }
  console.log('✅ Home Page Test Passed!');
};

## tests/search.js

module.exports = async function(page) {
  console.log('🔍 Running Link Verification Test...');
  await page.goto('https://example.com');
  
  const hasLink = await page.locator('a').count() > 0;
  if (!hasLink) {
    throw new Error('Search test failed: No anchor links found on page');
  }
  console.log('✅ Link Verification Test Passed!');
};

## 2. The Orchestrator Script (run-tests.js)
Create a central execution module in your root folder. This file handles environment parsing, provisions the browser instance safely, loops over your test files sequentially, and outputs appropriate exit signals:

const { chromium } = require('playwright-core');const path = require('path');const fs = require('fs');
// Load environment variables from local config if it existsconst envPath = path.resolve(process.cwd(), '.env');if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

(async () => {
  const isTermux = !!process.env.CHROMIUM_PATH;
  console.log(`🚀 Starting execution. Environment: ${isTermux ? 'Termux' : 'GitHub Actions'}`);

  const launchOptions = {
    executablePath: isTermux ? process.env.CHROMIUM_PATH : undefined,
    args: isTermux ? ['--no-sandbox', '--disable-setuid-sandbox'] : []
  };

  let browser;
  try {
    browser = await chromium.launch(launchOptions);
    const context = await browser.newContext();
    const page = await context.newPage();

    // Dynamically query all test modules from the tests subfolder
    const testsDir = path.resolve(__dirname, 'tests');
    const testFiles = fs.readdirSync(testsDir).filter(file => file.endsWith('.js'));

    console.log(`📋 Found ${testFiles.length} test suites to execute.\n`);

    for (const file of testFiles) {
      console.log(`----------------------------------------`);
      console.log(`🏃 Executing: ${file}`);
      
      const runTestFile = require(path.resolve(testsDir, file));
      await runTestFile(page); // Share browser state cleanly down to the module
    }

    console.log(`\n🎉 All suites processed successfully!`);

  } catch (error) {
    console.error(`\n❌ Execution halted due to critical error:\n`, error.stack || error.message);
    process.exitCode = 1; // Explicit fail flag returned to terminal or GitHub pipeline
  } finally {
    if (browser) {
      await browser.close();
      console.log('🏁 Browser connections severed cleanly.');
    }
  }
})();

------------------------------
## 🏃 Running Your Tests## Inside Termux (Locally)
Simply utilize your package runner script. The inline evaluator safely masks your operating system environment dynamically at initialization:

npm test

## Inside GitHub Actions (CI)
Create a .github/workflows/playwright.yml file in your repository. Since GitHub boots straight into native Linux hardware, it runs standard automated execution pathways without needing target evaluation hacks: [4, 5] 

name: Playwright Testson:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'

    - name: Install Dependencies
      run: npm ci

    - name: Download Standard Playwright Binaries
      run: npx playwright install chromium --with-deps

    - name: Run Test Suites
      run: npm run test:ci

------------------------------
If you'd like to extend this architecture further, let me know if you need to generate automated screenshots on failures, or if you want to implement independent page contexts so that cookies and sessions are completely wiped between individual test files!

[1] [https://dzone.com](https://dzone.com/articles/playwright-github-allure-test-automation)
[2] [https://www.youtube.com](https://www.youtube.com/watch?v=qX_t6F4ne_U)
[3] [https://mam16muk.medium.com](https://mam16muk.medium.com/my-playwright-test-automation-framework-for-uis-and-apis-1caa9a3a7b6c)
[4] [https://abigailarmijo.substack.com](https://abigailarmijo.substack.com/p/run-your-playwright-tests-with-github)
[5] [https://mastersoftwaretesting.com](https://mastersoftwaretesting.com/automation-academy/ci-cd-integration/github-actions-test-automation)
