# bulls-cows/skills

本仓库内部维护了一些好用的技能，并同步了外部社区的一些实用技能。

- GitHub 仓库：[https://github.com/bulls-cows/skills](https://github.com/bulls-cows/skills)
- Gitee 仓库：[https://gitee.com/bulls-cows/skills](https://gitee.com/bulls-cows/skills)

## 技能列表

- [commit](./skills/commit/SKILL.md)：帮助用户创建规范的 Git 提交
- [create-readme](./skills/create-readme/SKILL.md)：创建或更新项目根目录下的 README.md 文件
- [create-rule](./skills/create-rule/SKILL.md)：创建或更新规则文档，并更新 AGENTS.md 中的引用关系
- [create-skill](./skills/create-skill/SKILL.md)：创建或更新规范的 Claude Skill
- [frontend-design-cn](./skills/frontend-design-cn/SKILL.md)：创建独特的生产级前端界面，具备卓越设计质量
- [init](./skills/init/SKILL.md)：初始化项目 AGENTS.md 文档，用于指导 AI 助手理解项目规范、范围和结构
- [lint](./skills/lint/SKILL.md)：执行代码质量检查，包括 Node 版本验证和 lint 检查
- [lint-and-commit](./skills/lint-and-commit/SKILL.md)：自动执行代码质量检查后提交代码的组合技能
- [plan](./skills/plan/SKILL.md)：Plan-first execution mode that requires user confirmation
- [spec](./skills/spec/SKILL.md)：Specification-first development mode that requires detailed documentation

## 使用方式

### 在 `claude code` 中使用

1. 先在终端执行 `claude` 进入 `claude code` 交互模式

2. 输入 `/plugin` 命令并回车
3. 通过方向键切换到 `Marketplaces` tab 下
4. 首次添加仓库，需要选中 `+ Add Marketplace`，并回车，然后输入 `bulls-cows/skills` 再次回车
5. 选中 `Marketplaces` 列表里的名为 `open-skills` 的插件市场，并回车
6. 从列表里选中需要安装的插件，并回车
7. 重启终端或者 `claude code` 衍生插件，通过 `/<技能名>`（如 `/frontend-design-cn`）就可以召唤技能了！

## 项目结构

- `skills/`：所有技能的根目录
- `.claude-plugin/`：插件市场配置目录
  - `marketplace.json`：技能市场配置文件，定义插件和技能分组
- `README.md`：项目说明文档
- `AGENTS.md`：AI 代理的项目规范说明文档
- `LICENSE.txt`：开源许可证文件

## 协议

本项目采用 [Apache 2.0](./LICENSE.txt) 开源协议。

## 免责声明

本软件按"原样"（AS-IS）提供，不提供任何明示或暗示的保证，包括但不限于对适销性、特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是由于合同、侵权或其他方式引起的，由本软件或其使用或其他交易引起、产生或与之相关的。

使用者应自行承担使用本软件的全部风险。在使用前，请确保充分理解软件的功能和潜在影响，并在当地法律允许的范围内合规使用。
