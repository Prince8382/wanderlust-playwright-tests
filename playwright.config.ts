import 'dotenv/config';

import {
  defineConfig,
  devices
} from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'http://localhost:8080',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    headless: true,

    actionTimeout: 10000,

    navigationTimeout: 30000
  },

  projects: [
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome']
      }
    }
  ],

  webServer: {
    command:
      'cd ../WanderLust && node app.js',

    url:
      'http://localhost:8080/listings',

    reuseExistingServer:
      !process.env.CI,

    timeout: 120000
  }
});
