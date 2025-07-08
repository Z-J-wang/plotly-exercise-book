// git 的 commit-msg 钩子脚本，用于检查 commit message 格式
// 读取 .git/COMMIT_EDITMSG 文件内容（即，commit message）
const msgPath = process.argv[2]
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /(^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50})|Merge branch/

if (!commitRE.test(msg)) {
  console.error(`
        不合法的 commit 消息格式。
        请查看 git commit 提交规范：https://z-j-wang.github.io/front-end-engineering/git%E7%AF%87-commit%E8%A7%84%E8%8C%83.html
    `)

  process.exit(1)
}
