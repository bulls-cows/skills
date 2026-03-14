# AGENTS.md

## Scope

- 本仓库默认语言: Markdown, JSON
- 允许修改目录: skills/, .claude-plugin/, README.md, AGENTS.md, LICENSE.txt
- 禁止修改目录: 无

## Quality Gate

- 改动后必须执行:
  - 验证 SKILL.md 格式（YAML 头部 + Markdown 正文）
  - 验证 marketplace.json 的 JSON 格式以及其中的 skills 清单是否符合项目根目录下 skills 目录里的实际情况，以及是否按字母顺序排序
  - 检验项目根目录下 README.md 中的技能列表是否符合项目根目录下 skills 目录里的实际情况，以及是否按字母顺序排序
  - 验证技能路径是否正确
  - 修复上述验证过程中发现的错误

## Delivery Format

- 修改后先说明修改原因和影响范围
- 所有文件引用都要带路径和行号
- 对于技能变更，说明变更后对用户的影响

## Project Structure

- skills/: 所有技能的根目录
- .claude-plugin/: 插件市场配置目录
  - marketplace.json: 技能市场配置文件，定义插件和技能分组
- README.md: 项目说明文档
- AGENTS.md: 本文件，AI 代理的项目规范说明文档
- LICENSE.txt: 开源许可证文件
