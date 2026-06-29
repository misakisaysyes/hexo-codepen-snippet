/**
 * semantic-release 自动化发布配置
 *
 * 当代码推送到 master 分支时，GitHub Actions 会自动运行完整的发布流程。
 * 一切基于 Conventional Commits 格式的 commit message：
 *
 *   fix: xxx       → patch 版本 (1.0.0 → 1.0.1)
 *   feat: xxx      → minor 版本 (1.0.0 → 1.1.0)
 *   BREAKING CHANGE → major 版本 (1.0.0 → 2.0.0)
 *
 * @see https://semantic-release.gitbook.io/semantic-release
 */
module.exports = {
  // 仅在 master 分支上触发发布，其他分支的 push 会被忽略
  branches: 'master',

  plugins: [
    // =========================================================================
    // 1. @semantic-release/commit-analyzer（内置，无需安装）
    //    扫描自上次发布以来的所有 commit message，根据 "fix:"、"feat:"、
    //    "BREAKING CHANGE" 等关键字自动计算下一个版本号。
    // =========================================================================
    '@semantic-release/commit-analyzer',

    // =========================================================================
    // 2. @semantic-release/release-notes-generator（内置，无需安装）
    //    根据 commit message 自动生成发布说明（Release Notes），
    //    按 feat / fix / docs 等分类整理，方便用户了解本次更新了什么。
    // =========================================================================
    '@semantic-release/release-notes-generator',

    // =========================================================================
    // 3. @semantic-release/changelog（需在 devDependencies 中单独安装）
    //    将上面生成的 Release Notes 追加写入项目根目录的 CHANGELOG.md 文件中。
    //    这样 CHANGELOG.md 会随每次发布自动积累，无需手动维护。
    // =========================================================================
    '@semantic-release/changelog',

    // =========================================================================
    // 4. @semantic-release/npm（内置，无需安装）
    //    将 package.json 中的 version 更新为新版本号，然后发布到 npm registry。
    //    需要 CI 环境变量中配置 NPM_TOKEN（`.github/workflows/main.yml` 已配置）。
    // =========================================================================
    '@semantic-release/npm',

    // =========================================================================
    // 5. @semantic-release/git（需在 devDependencies 中单独安装）
    //    将本次发布过程中被修改的文件 commit 并 push 回仓库。
    //    - *.js、LICENSE、package.json：版本号变更后的文件
    //    - CHANGELOG.md：@semantic-release/changelog 更新后的文件
    //    - [skip ci]：告诉 CI 不要再次触发构建，避免死循环
    // =========================================================================
    [
      '@semantic-release/git',
      {
        assets: ['*.js', 'LICENSE', 'package.json', 'CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],

    // =========================================================================
    // 6. @semantic-release/github（内置，无需安装）
    //    在 GitHub 仓库的 Releases 页面创建一个 Release，附带 Release Notes，
    //    同时可以上传构建产物（assets），方便用户直接下载。
    //    需要 CI 环境变量中配置 GITHUB_TOKEN。
    // =========================================================================
    '@semantic-release/github',
  ],
};

