module.exports = {
    apps: [
      {
        name: 'backend',
        script: './express/app.js', // 入口文件
        env: {
            NODE_ENV: 'development',
            PORT: 3000
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000
        }
    }
    ]
  };