module.exports = {
  '*.ts': [
    'eslint {src,test}/**/*.ts --fix',
    'git add',
  ],
};
