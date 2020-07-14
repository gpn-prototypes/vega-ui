const tasks = (arr) => arr.join(' && ');

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged -c ./lint-staged.config.js',
    'prepare-commit-msg': tasks([
      'exec < /dev/tty',
      'git cz --hook || true',
      'node ./node_modules/@gpn-prototypes/frontend-configs/git/git-commit-message.js',
    ]),
    'pre-push': 'yarn test',
  },
};
