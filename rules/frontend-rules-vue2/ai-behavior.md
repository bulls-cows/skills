# AI 行为与交互约束

本模块定义 AI 在对话和文件操作中的"红线"与"行为模式"。

## 行为准则

- 直接输出：允许直接在对话中输出文字说明、总结或代码片段，无需总是生成文件。
- 文档生成：
  - ✅ 允许修改代码中的注释和 JSDoc
  - 🚫 禁止未经用户明确要求就创建 README、说明文档等
- 修改权限：
  - ✅ 允许修改代码中的注释、JSDoc 以及 src/api、src/apis、src/components、src/constants、src/layouts、src/styles、src/views、src/pages 目录下的文件。
  - 🚫 禁止严禁修改上述目录以外的任何文件（除非用户明确指定）。
