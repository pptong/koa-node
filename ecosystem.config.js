module.exports = {
  apps: [{
    script: './dist/index.js',
    watch: false,
    env_uat: {
      PORT: 80,
      HOST: "localhost",
      NODE_ENV: 'uat',
    },
    env_prod: {
      PORT: 443,
      HOST: "localhost",
      NODE_ENV: 'prod',
    },
  }],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
