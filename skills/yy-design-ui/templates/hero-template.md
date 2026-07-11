# Hero 区域设计模板

落地页 / 首页 Hero 区域的标准化 HTML 和 CSS 模板。

## HTML 结构

```html
<!-- Hero 区域标准结构 -->
<section class="hero">
  <div class="hero__inner">
    <!-- 左侧：文字内容 -->
    <div class="hero__content">
      <!-- Badge（可选）：带脉冲动画圆点 + 标签文字 -->
      <div class="hero__badge">
        <span class="hero__badge-dot"></span>
        产品标签
      </div>
      <!-- 主标题：56px, font-weight 800, letter-spacing -1px -->
      <h1 class="hero__title">产品名称</h1>
      <!-- 副标题：24px, font-weight 600 -->
      <p class="hero__subtitle">产品一句话描述</p>
      <!-- 描述文字：16px, color #86909c, 限制最大宽度 -->
      <p class="hero__desc">详细的产品价值描述...</p>
      <!-- 操作按钮组 -->
      <div class="hero__actions">
        <a class="btn btn--primary">主要操作</a>
        <a class="btn btn--outline">次要操作</a>
      </div>
    </div>
    <!-- 右侧：视觉展示 -->
    <div class="hero__visual">
      <!-- 拟物卡片：终端风格 + 浮动动画 -->
      <div class="hero-card">
        <div class="hero-card__header">
          <div class="hero-card__dots">
            <span class="hero-card__dot hero-card__dot--red"></span>
            <span class="hero-card__dot hero-card__dot--yellow"></span>
            <span class="hero-card__dot hero-card__dot--green"></span>
          </div>
        </div>
        <div class="hero-card__body">
          <!-- 内容：图表 / 形状 / 网格等可视化元素 -->
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS 样式

### Hero 容器

```css
.hero {
  background: linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%);
  padding: 80px 20px 100px;
  overflow: hidden;
}

.hero__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
}
```

### Badge 标签

```css
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: <主色-浅色背景>;
  color: <主色>;
  font-size: 13px;
  font-weight: 500;
  border-radius: 20px;
  margin-bottom: 20px;
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  background: <主色>;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
```

### 标题与文字

```css
.hero__title {
  font-size: 56px;
  font-weight: 800;
  color: #1d2129;
  margin: 0 0 12px;
  letter-spacing: -1px;
}

.hero__subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #4e5969;
  margin: 0 0 16px;
}

.hero__desc {
  font-size: 16px;
  color: #86909c;
  line-height: 1.8;
  margin: 0 0 32px;
  max-width: 480px;
}

.hero__actions {
  display: flex;
  gap: 16px;
}
```

### 视觉卡片

```css
.hero-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: float 6s ease-in-out infinite;
}

.hero-card__header {
  background: #f7f8fa;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e6eb;
}

.hero-card__dots {
  display: flex;
  gap: 8px;
}

.hero-card__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.hero-card__dot--red {
  background: #ff4d4f;
}
.hero-card__dot--yellow {
  background: #ffc107;
}
.hero-card__dot--green {
  background: #52c41a;
}

.hero-card__body {
  padding: 24px;
}
```

### 按钮

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn--primary {
  background: <主色>;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(<主色>, 0.35);
}

.btn--primary:hover {
  background: <主色-hover>;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(<主色>, 0.45);
}

.btn--outline {
  background: transparent;
  color: #1d2129;
  border: 2px solid #e5e6eb;
}

.btn--outline:hover {
  border-color: <主色>;
  color: <主色>;
  transform: translateY(-2px);
}
```

### Section 通用组件

```css
.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-header__title {
  font-size: 36px;
  font-weight: 700;
  color: #1d2129;
  margin: 0 0 12px;
}

.section-header__desc {
  font-size: 16px;
  color: #86909c;
  margin: 0;
}

.feature-card {
  background: #f7f8fa;
  border-radius: 16px;
  padding: 32px;
  transition: all 0.25s ease;
}

.feature-card:hover {
  background: #ffffff;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}
```

### 关键动画

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
```

### 响应式断点

```css
@media (max-width: 968px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }
  .features__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero__title {
    font-size: 32px;
  }
  .hero__actions {
    flex-direction: column;
  }
  .btn {
    width: 100%;
  }
  .features__grid {
    grid-template-columns: 1fr;
  }
}
```
