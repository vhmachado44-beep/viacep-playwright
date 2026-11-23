const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://viacep.com.br',
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
});
