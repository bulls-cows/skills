# 技术栈定位路线

只选择当前章节需要的技术栈路线；混合项目在运行时边界处分别核对，不默认跨语言调用是同进程同步调用。以下定位规则优先于通用路线，项目明确规约优先于本文件。

## Android / JVM

从 settings/build Gradle、Manifest、Application/Activity 或服务入口确定模块和变体；继续追踪 ViewModel/Presenter、Repository、协议模块与测试。核对当前地区、构建变体及硬件连接条件，不能凭目录存在就说模块在当前应用启用。生成 JS 包、AAR 或外部 SDK 缺少源码时标注边界。

## JavaScript / TypeScript / Web

从 package.json、工作区配置与启动脚本区分浏览器、服务端、SSR 和独立脚本。前端沿路由/组件 → 状态/请求 → API；后端沿入口/路由 → 服务 → 存储/消息消费者。跨 API、WebSocket、队列或进程时记录传输契约，核对别名实际定义。

## Python

从 pyproject.toml/requirements、模块入口、CLI 或 Web app 实例开始，追踪参数、配置、核心函数、I/O 和测试；区分脚本、服务和库，核对环境依赖及运行副作用。

## 其他技术栈与兜底

根据根级 manifest、构建文件、源码扩展名与启动入口建立路线；例如 Go 的 main/module、Rust 的 Cargo/bin、.NET 的 project/Program。未知框架不猜约定，从实际调用方和符号引用向下跟踪，记录未取得源码或动态绑定造成的证据缺口。
