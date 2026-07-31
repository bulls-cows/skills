# 技术栈源码路由

本资源只用于快速定位证据入口，不替代目标项目自身的规约和架构文档。先执行通用定位，再加载命中的技术栈规则；特定规则与通用规则冲突时，以目标项目规约和特定技术栈的实际组织方式为准。

## 通用定位

1. 从根目录 manifest、工作区配置和启动命令判断项目形态与运行时。
2. 从用户可见入口反向搜索路由、命令、事件、组件或导出符号。
3. 沿 import、调用、依赖注入、消息主题、接口路径或数据字段追踪直接上下游。
4. 优先读取源契约和生成配置，不把生成产物当作权威实现。
5. 从测试定位边界条件、错误语义和默认行为，但不把 mock 行为当成生产实现。
6. 遇到同名新旧实现时，从实际注册、导入或配置选择确认当前生效版本。

需要优先识别的通用入口：

- 根级说明：`README*`、`AGENTS.md`、`docs/`、架构决策和模块说明
- 构建与运行：Makefile、Taskfile、容器配置、CI 配置和启动脚本
- 契约：OpenAPI、GraphQL、Protocol Buffers、JSON Schema、数据库迁移和消息定义
- 入口：HTTP 路由、CLI 命令、应用启动、任务消费者、定时任务和前端路由
- 验证：单元测试、集成测试、端到端测试和固定样本

## Python

优先检查：

- `pyproject.toml`、`requirements*.txt`、`setup.py`、`setup.cfg`
- `src/<package>/`、顶层包目录、`__main__.py` 和 console scripts
- FastAPI/Flask/Django 路由、Celery task、Typer/Click 命令
- `tests/`、`pytest.ini` 和 `conftest.py`

追踪规则：

- 从装饰器、路由注册、命令注册或公开导出进入业务层
- 区分同步函数、协程、线程池、进程池和任务队列边界
- 检查 dataclass、Pydantic model、TypedDict 或 ORM model 的字段转换
- 配置同时检查环境变量加载、settings 对象和模块导入时默认值

## JavaScript 与 TypeScript

优先检查：

- `package.json`、锁文件、workspace 配置、`tsconfig*.json`
- `src/main.*`、`src/index.*`、框架入口、服务端启动文件和 exports
- 前端路由、状态管理、API client、服务端 controller/router/handler
- `test/`、`tests/`、`__tests__/`、`*.test.*` 和 `*.spec.*`

追踪规则：

- 区分构建时 import、浏览器运行时调用和服务端运行时调用
- 追踪组件事件、store action、hook、请求封装和响应映射
- 检查类型声明是否只在编译期存在，避免把 interface 当作运行时校验
- monorepo 中通过 workspace 依赖、exports 和路径别名确认包边界

## Java 与 Kotlin

优先检查：

- `pom.xml`、`build.gradle*`、`settings.gradle*`
- `src/main/java`、`src/main/kotlin`、应用启动类和模块配置
- Controller、Service、Repository、消息监听器和批处理入口
- `src/test/` 及测试资源

追踪规则：

- 从注解路由、Bean 注册或接口实现定位实际类
- 检查 DTO、Entity、Mapper 和序列化配置之间的字段映射
- 区分事务边界、异步执行器、线程池和消息消费事务
- 多模块项目从依赖声明和包导入确认调用方向

## Go

优先检查：

- `go.mod`、`go.work`、`cmd/`、`internal/` 和 `pkg/`
- `main.go`、HTTP/gRPC 路由注册、命令初始化和 worker 启动
- `*_test.go`、接口定义和生成指令

追踪规则：

- 从 `main` 和构造函数定位依赖装配
- 沿 interface 的实际实现和传入位置确认运行时类型
- 检查 goroutine、channel、context 取消和资源关闭语义
- 对生成代码回到 schema、proto 或生成注释中的源文件

## Rust

优先检查：

- `Cargo.toml`、workspace members、`src/main.rs` 和 `src/lib.rs`
- `bin/`、模块声明、公开导出、Web 路由和异步任务入口
- `tests/`、模块内测试和 feature 配置

追踪规则：

- 从 crate 入口和 feature gate 确认实际编译路径
- 沿 trait 实现、泛型约束和构造位置确认具体实现
- 检查 `Result` 错误传播、生命周期、所有权转移和异步 runtime 边界
- 区分 build script、过程宏生成和运行时代码

## 混合语言与跨服务项目

分别为每个运行时建立局部调用链，再通过以下证据连接：

- HTTP/gRPC 接口路径和请求响应结构
- 消息主题、事件名和 payload schema
- 子进程命令、标准输入输出和退出码
- 数据库表、共享文件、对象存储键或缓存 key
- FFI、WebView bridge、插件协议或生成 SDK

不要把源码级共享依赖和运行时通信混为一谈。

## 通用兜底

未命中上述技术栈时：

1. 读取根级构建文件和最接近入口的说明文档。
2. 搜索主函数、公开导出、路由注册、命令注册和测试入口。
3. 从用户可观察的输入与输出字段反向定位处理函数。
4. 通过调用点、符号引用和配置注册确认实际执行路径。
5. 无法确认语言特有语义时，只记录可直接证明的调用和数据关系，并列为未确认项。
