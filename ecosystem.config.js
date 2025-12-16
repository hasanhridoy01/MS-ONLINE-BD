module.exports = {
  apps: [
    {
      name: 'web.msonlinebd',
      // FIX 1: Point directly to the Next.js start script (required for PM2 clustering)
      script: 'node_modules/next/dist/bin/next',
      // FIX 2: Pass 'start' as the argument to the Next.js script
      args: 'start',
      
      env: {
        NODE_ENV: 'production',
        PORT: '3000', 
        HOSTNAME: '127.0.0.1' // This is fine for local binding
      },
      instances: '4',
      exec_mode: 'cluster', // Excellent choice for Next.js
      max_memory_restart: '512M',
      out_file: '/var/log/pm2/web-out.log',
      error_file: '/var/log/pm2/web-err.log',
      merge_logs: true,
      autorestart: true,
      watch: false
    }
  ]
}
