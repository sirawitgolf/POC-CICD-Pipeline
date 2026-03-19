module.exports = {
  extends: ['@commitlint/config-conventional'],

  // ใช้ default ignore + เพิ่มของเรา
  defaultIgnores: true,

  ignores: [
    (msg) =>
      msg.startsWith('Merge') || // merge commit
      msg.startsWith('Revert') || // revert auto
      msg.startsWith('Pull request') || // github style
      msg.includes('[skip-lint]') // optional
  ],
  
  // เขียนซ้ำไว้ ✔️ (เพื่อกันพลาด)
  rules: {
    // ปรับตามทีมได้
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'ci',
        'build',
        'perf',
        'revert',
      ],
    ],

    'subject-case': [0], // ปิด rule เรื่องตัวพิมพ์
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
  },
};