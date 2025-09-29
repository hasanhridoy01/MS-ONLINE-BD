module.exports = {
  apps: [
    {
      name: 'web.msonlinebd',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        HOSTNAME: '127.0.0.1'
      },
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      out_file: '/var/log/pm2/web-out.log',
      error_file: '/var/log/pm2/web-err.log',
      merge_logs: true,
      autorestart: true,
      watch: false
    }
  ]
}
