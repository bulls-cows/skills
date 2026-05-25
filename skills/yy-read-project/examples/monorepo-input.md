# 输入示例：monorepo 局部阅读

本文档展示 `yy-read-project` 在 monorepo 局部阅读场景下的典型输入。

## 示例 1：只看某个子项目

```text
请用 yy-read-project 看一下这个 monorepo 里的 `apps/admin`。
我不需要你把所有子项目都展开，只要说明它在整个仓库里的位置、直接依赖哪些 package、和后端或协议层怎么接。
```

## 示例 2：只看某条协作链路

```text
这个仓库看起来是 monorepo。请只帮我梳理 `apps/web` 到 `packages/contracts` 再到后端服务的这条链路。
重点看共享契约、运行时通信和各层职责。
```
