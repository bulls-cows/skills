/**
 * 简历示例数据 - 全栈开发模板
 *
 * 作为编辑器的默认加载数据，同时作为 fullstack 模板的示例参考。
 */
export const sampleData = {
  template: 'fullstack',
  name: '张三',
  title: '前端负责人 / 中级 Node.js 后端',
  city: '浦东周浦',
  phone: '138****0000',
  email: 'example@example.com',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/username',
    },
    {
      label: '技术博客',
      url: 'https://example.com/blog',
    },
  ],
  summary:
    '<p>8 年前端开发经验，<strong>5 年团队管理/技术带队经验</strong>，有丰富的工程化和项目架构/重构经验。在混合 APP 开发、性能优化、构建工具定制化上有丰富的落地经验。</p><p>经常阅读英文技术书籍和浏览 GitHub。自学能力强，读书时有跳级、保送经历。上海市重点产业领域人才专项奖励获得者。</p>',
  skills: [
    {
      category: '资深前端',
      items: [
        'Vue 全家桶',
        'React 全家桶',
        'uni-app',
        'Fabric.js',
        'Three.js',
        'Echarts',
        '套壳 APP/PC 端',
      ],
    },
    {
      category: '中级后端',
      items: ['Node.js (Koa/Express/Nuxt)', 'MySQL', 'Redis', 'EJS', '简单运维'],
    },
    {
      category: '构建工具',
      items: ['Webpack', 'Vite', 'Rollup'],
    },
    {
      category: '其他',
      items: ['TypeScript', 'ESLint', 'Git'],
    },
  ],
  experience: [
    {
      organization: 'XX数据科技有限公司',
      url: 'https://www.example.com/',
      tags: ['创业', '高新', '专精特新'],
      position: '从 0 搭建团队 | 前端负责人',
      startDate: '2021.12',
      endDate: '2024.01',
      descriptions: [
        '<span class="num">①</span> <strong>从 0 到 1</strong> 搭建前端团队。将研发 bug 中前端 bug 占比从 30% 优化至 10%',
        '<span class="num">②</span> 获得 2022 年上海市重点产业领域人才专项奖励',
        '<span class="num">③</span> 负责团队文档建设、开发任务分配、OKR 建立与落地、面试和绩效考核',
      ],
    },
    {
      organization: 'XX科技有限公司（XX买菜）',
      url: 'https://www.example.com/',
      tags: ['上市', '高新'],
      position: '资深前端',
      startDate: '2021.07',
      endDate: '2021.12',
      descriptions: [
        '<span class="num">①</span> 优化 Webpack 4 项目，负责供应链管理系统中调拨业务的迭代',
      ],
    },
    {
      organization: 'XX财富管理股份有限公司',
      url: 'https://www.example.com/',
      tags: ['上市', '高新'],
      position: '技术带队 | 高级前端',
      startDate: '2018.09',
      endDate: '2021.07',
      descriptions: [
        '<span class="num">①</span> 负责公司核心 APP 内<strong>交易类业务迭代</strong>，处理大部分产线问题',
        '<span class="num">②</span> 在团队内起到<strong>技术带队</strong>的作用，Webpack 3 项目优化',
        '<span class="num">③</span> 显著降低了 APP 中全量/增量 H5 资源包的大小和项目的编译时间',
      ],
    },
    {
      organization: 'XX移动信息技术股份有限公司',
      tags: ['上市', '高新'],
      position: '初级前端',
      startDate: '2015.12',
      endDate: '2018.08',
      descriptions: [
        '<span class="num">①</span> 独立开发和迭代车险比价投保<strong>微信公众号 + PC 端 + 混合 APP</strong> 内 H5 部分',
        '<span class="num">②</span> 获得优秀员工称号',
      ],
    },
  ],
  projects: [
    {
      name: 'XX通 PC 端',
      url: 'https://www.example.com',
      role: '前端负责人',
      techStack: 'Vue3 + Vue-Router + Pinia + Element Plus',
      startDate: '2021.12',
      endDate: '2024.01',
      descriptions: [
        'XX通是一款类似 CAD 的<strong>在线建筑 BIM 编辑平台</strong>，核心工作台页面构件种类多、表单多、充斥着异步事件监听和三级及以上的联动交互，代码工程复杂度和运行时性能要求较高',
        '<span class="num">①</span> 将 C++ 侧暴露的 API（画布操作命令、事件监听、模型数据等）封装成 <strong>SDK</strong>，降低业务开发上手难度',
        '<span class="num">②</span> 在编码时大量应用<strong>设计模式和 OOP 思想</strong>以提高代码可维护性，并对性能做了大量优化',
        '<span class="num">③</span> 组织通用项目模板的开发，提高第三方定制化项目的开发效率',
        '<span class="num">④</span> 负责日常团队 code review，推进 ESLint、TypeScript 在项目中的落地',
      ],
    },
    {
      name: 'XX基金混合 APP',
      role: '技术带队',
      techStack: 'React + React-Router + Redux + 手写样式',
      startDate: '2018.09',
      endDate: '2021.07',
      descriptions: [
        'XX基金是一款支持在线基金交易的混合 APP，在小米应用商店中<strong>下载量超千万</strong>。其中 H5 部分是一个 <strong>400+ 页面的大型 Webpack 项目</strong>',
        '<span class="num">①</span> 通过条件编译等方式将编译时间<strong>从一小时降到一刻钟</strong>',
        '<span class="num">②</span> 稳步推进 ESLint 的落地',
        '<span class="num">③</span> 封装了常用方法库和键盘组件等业务组件',
        '<span class="num">④</span> 指导团队成员，持续性在团队内输出优秀代码实践',
      ],
    },
    {
      name: '日志监控平台',
      url: 'https://www.example.com',
      role: '独立开发',
      techStack: 'Node.js (Koa) + MySQL (Sequelize) + Redis + Vue3',
      startDate: '2022.01',
      endDate: '至今',
      descriptions: [
        '这是一款经过多个项目检验的、<strong>线上运行了一年多的、商业逻辑闭环的正式产品</strong>',
        '<span class="num">①</span> 支持 JS 运行时错误日志、接口日志、用户行为日志、自定义日志、PV、UV、浏览器统计、页面性能日志上报',
        '<span class="num">②</span> 使用 <strong>Rollup</strong> 打包工具构建了客户端日志上报 JS SDK（已开源 better-monitor）',
        '<span class="num">③</span> 使用 JWT 实现鉴权机制，Redis 实现统计数据缓存',
        '<span class="num">④</span> 支持多用户、多项目、会员分级、支付订单管理、邮箱验证',
      ],
    },
    {
      name: '二三维编辑器',
      url: 'https://www.example.com',
      role: '独立开发',
      techStack: 'Node + MySQL + Fabric.js + Three.js',
      startDate: '2021.01',
      endDate: '持续迭代',
      descriptions: [
        '产品底层逻辑是：用户绘制二维俯视图后，通过调整高度、离地高度等三维属性，使其支持切换为<strong>三维立体图</strong>',
        '<span class="num">①</span> 二维部分使用 <strong>Fabric.js</strong> 实现，三维部分使用 <strong>Three.js</strong> 实现',
        '<span class="num">②</span> 支持多边形柱、球体、圆环、圆柱体、胶囊、立方体、长方体等立体形状',
        '<span class="num">③</span> 支持逐点绘制多边形、框选绘制矩形、图层管理、自由涂鸦',
      ],
    },
  ],
  education: [
    {
      school: 'XX药科大学（Top5 药学院校、一本）',
      url: 'https://www.example.edu.cn/',
      major: '理学学士 | 药学(食品药学) | CET-6',
      startDate: '2009.09',
      endDate: '2013.07',
    },
  ],
};
