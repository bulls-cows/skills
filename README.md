# bulls-cows/skills

本仓库内部维护了一些好用的技能，并同步了外部社区的一些实用技能。

- 国际仓库[https://github.com/bulls-cows/skills](https://github.com/bulls-cows/skills)
- 国内仓库[https://gitee.com/bulls-cows/skills](https://gitee.com/bulls-cows/skills)

## 技能清单（本仓库内部维护）

### [frontend-design-cn](./skills/frontend-design-cn/SKILL.md)
创建独特的生产级前端界面，具备卓越设计质量。当用户需要构建网页组件、页面、应用或界面时使用（如网站、落地页、仪表板、React 组件、HTML/CSS 布局，或美化任何 Web UI）。生成富有创意、精致打磨的代码和 UI 设计，摆脱千篇一律的 AI 审美。

- **出处**：此技能根据 [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) 技能汉化而来，并根据国内的常用技术栈和审美风格进行了调整。
- **许可**：Apache License 2.0

### [git-commit](./skills/git-commit/SKILL.md)
帮助用户创建规范的 Git 提交。当用户想要提交代码、保存更改、创建 commit，或者说类似"提交这些更改"、"commit 代码"、"保存到 git"等内容时使用此技能。此技能会分析代码变更、理解对话上下文中的改动意图，生成符合传统格式（type(scope): description）的中文提交信息，并智能选择需要暂存的文件。即使用户只是简单地说"提交"或"commit"，也应该使用此技能来确保提交信息的质量。

### [lint](./skills/lint/SKILL.md)
执行代码质量检查，包括 Node 版本验证和 lint 检查。当发现 lint 错误时会尝试自动修复。

### [lint-and-commit](./skills/lint-and-commit/SKILL.md)
自动执行代码质量检查后提交代码的组合技能。当用户想要在提交前确保代码质量时使用，比如说"检查代码并提交"、"提交前先检查"、"lint 并提交"、"先检查再 commit"、"代码检查后提交"等。此技能会先执行完整的 lint 检查（包括 Node 版本验证），如果发现错误会尝试自动修复，然后再执行规范的 git 提交流程。

### [skill-creator](./skills/skill-creator/SKILL.md)
创建新技能、修改和改进现有技能，并衡量技能性能。用于：从头创建技能、编辑或优化现有技能、运行评估测试技能、进行方差分析的性能基准测试，或优化技能描述以提高触发准确性。

- **出处**：此技能由 [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) 汉化而来，补充了 markdown 文档 YAML 头部的书写规范。
- **许可**：Apache License 2.0

### [update-ai-docs](./skills/update-ai-docs/SKILL.md)
总结编码过程中的最佳实践经验并更新到项目文档中，供 AI 参考，避免再犯类似错误。支持智能选择合适的文档位置，优先更新现有文档而不是创建新文件。

## 技能清单（来自外部仓库，只进行同步）

略。

## 使用方式

### 在 `claude code` 中使用

1. 先在终端执行 `claude` 进入 `claude code` 交互模式。
2. 输入 `/plugin` 命令并回车。
3. 通过方向键切换到 `Marketplaces` tab下。
4. 首次添加仓库，需要选中 `+ Add Marketplace`，并回车，然后输入 `bulls-cows/skills` 再次回车。
5. 选中 `Marketplaces` 列表里的名为 `bulls-cows-skills` 的插件市场，并回车。
6. 从列表里选中需要安装的插件，并回车。
7. 重启终端或者 `claude code` 衍生插件，通过 `/<技能名>`（如 `/frontend-design-cn`）就可以召唤技能了！

## 开发方式

### 使用 Claude Code 进行技能开发

同样也是先添加到市场了，然后安装使用其中的技能。区别是添加市场时，只需要填写路径 `./` 然后回车即可（前提你是在项目根目录下执行 `claude` 命令）。

## 协议

本项目采用 [Apache 2.0](./LICENSE.txt) 开源协议。

## 免责声明

本软件按"原样"（AS-IS）提供，不提供任何明示或暗示的保证，包括但不限于对适销性、特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是由于合同、侵权或其他方式引起的，由本软件或本软件的使用或其他交易引起、产生或与之相关的。

使用者应自行承担使用本软件的全部风险。在使用前，请确保充分理解软件的功能和潜在影响，并在当地法律允许的范围内合规使用。
