require('dotenv').config({path: '.env.prod'});

module.exports = {
  apps: [
    {
      name: 'rika-app',
      script: './build/index.js',
      exec_mode: 'cluster',
      instances: 'max',
      watch: ['build'],
      watch_delay: 3000,
      ignore_watch: ['node_modules'],
      max_memory_restart: '500M',
      env: {
        PORT: process.env.PORT,
        ENV: 'production',
        HOST: 'https://be.rikahanom.com',
      },
    },
  ],
};
