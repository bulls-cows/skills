# 输入示例

本文档展示用户请求创建技能的典型输入示例。

## 示例 1：创建简单技能

```text
请帮我创建一个代码格式化技能，用于在提交代码前自动格式化代码。
```

## 示例 2：创建带模板的技能

```text
我需要创建一个生成 README 的技能，要求：
1. 自动读取项目的 package.json 或 Cargo.toml 获取项目信息
2. 生成包含项目名称、描述、安装方法、使用说明的标准 README
3. 支持自定义徽章和贡献指南
```

## 示例 3：更新现有技能

```text
现有的 lint-code 技能触发太频繁了，请帮我调整它的 description，让它只在用户明确说"检查代码质量"时才触发。
```

## 示例 4：创建复杂技能

```text
创建一个 API 测试技能，需要：
1. 支持读取 OpenAPI/Swagger 规范文件
2. 自动生成测试用例
3. 执行测试并生成报告
4. 报告格式包含：通过率、失败详情、性能指标
```

## 示例 5：显式调用技能创建

```text
Use the create-skill skill to help me create a new skill for database migration management.
```
