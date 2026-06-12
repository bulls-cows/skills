# Shell 注释规范

适用文件：`.sh`、`.bash`、`.zsh`、`Makefile`（仅注释格式参考）

## 注释语法

- 行注释：`#`
- 无原生块注释语法，连续 `#` 代替

## 文件头注释

脚本顶部说明用途、用法和依赖：

```bash
#!/usr/bin/env bash
# deploy.sh - 部署前端项目到生产环境
#
# 用法：./deploy.sh [--staging|--production] [--skip-test]
#
# 依赖：rsync, ssh, node >= 18
```

## 函数文档

函数定义上方用 `#` 注释说明用途、参数和返回值：

```bash
# 计算订单折扣金额
#
# 参数：
#   $1 - 商品原价（元）
#   $2 - 客户等级（1-5）
#   $3 - 促销码（可选）
#
# 输出：
#   折扣金额（元），无折扣时输出 0
calculate_discount() {
    local price=$1
    local level=$2
    local promo_code=${3:-}
    # ...
}
```

简短函数可使用单行注释：

```bash
# 检查命令是否可用
has_command() {
    command -v "$1" &>/dev/null
}
```

## 区块注释

用连续 `#` 行分隔和标注逻辑区块：

```bash
# ========== 环境检查 ==========

# 检查 Node.js 版本是否满足最低要求
node_version=$(node --version)

# ========== 构建项目 ==========

# 生产环境使用压缩构建
if [[ "$env" == "production" ]]; then
    npm run build
fi
```

## 条件和循环

对非直观的条件判断添加注释：

```bash
# 仅在主分支且非 CI 环境时执行部署
if [[ "$BRANCH" == "main" ]] && [[ -z "$CI" ]]; then
    deploy
fi
```

## 特殊变量

对含义不明显的位置参数和特殊变量添加注释：

```bash
local input_file=$1    # 待处理的输入文件路径
local output_dir=$2    # 输出目录路径
local dry_run=${3:-0}  # 试运行模式：0=实际执行，1=仅打印命令
```

## 避免的注释

```bash
# ❌ 重复命令含义
# echo hello world
echo "hello world"

# ❌ 对显而易见的逻辑加注释
# 如果变量为空
if [[ -z "$var" ]]; then

# ❌ 使用 : <<'EOF' 伪块注释（可读性差）
: <<'EOF'
多行注释内容
EOF
```
