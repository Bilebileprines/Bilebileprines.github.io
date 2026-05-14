# 胡佳琪作品集网站 · 使用文档

> A portfolio website for animator Jiaqi Hu.
> 七个主题章节，整页滚动色彩切换，强交互。

---

## 📁 项目结构

```
portfolio/
├─ index.html          ← 入口文件，引用所有外部资源
├─ styles.css          ← 所有样式（章节主题色板 / 字体 / 布局 / 动画）
├─ app.jsx             ← 主应用：导航 / 光标 / 滚动监听 / Tweaks 面板
├─ sections.jsx        ← 七个章节组件（Hero / About / Rust / ...）
├─ tweaks-panel.jsx    ← 调试面板组件库（不需要修改）
├─ images/             ← (建议新建) 你的真实作品图片
│  ├─ portrait.jpg
│  ├─ rust/
│  ├─ ghibli/
│  ├─ pain/
│  └─ daily/
├─ videos/             ← (建议新建) 视频片段
└─ README.md           ← 本文档
```

---

## 🚀 本地运行

**必须用本地服务器**（不能直接双击 index.html，因为 JSX 加载会被 CORS 拦截）。

**最简单方式**：VS Code 安装 Live Server 扩展 → 右键 `index.html` → Open with Live Server。

或终端执行：
```bash
python -m http.server 8000   # 然后访问 http://localhost:8000
```

---

## 🖼️ 替换占位图为真实作品 — 完整指南

### 第 1 步：准备图片

1. 在项目根目录新建 `images/` 文件夹
2. 按章节再分子文件夹（推荐结构）：
   ```
   images/
   ├─ portrait.jpg            # 关于我的肖像
   ├─ rust/
   │   ├─ cogwell.jpg         # 主角
   │   ├─ workshop.jpg        # 蒸汽工坊
   │   ├─ city.jpg            # 管道之城
   │   └─ ...
   ├─ ghibli/
   ├─ pain/
   └─ daily/
       ├─ 001.jpg
       ├─ 002.jpg
       └─ ...
   ```
3. 图片建议：
   - 格式：**JPG**（照片/复杂插画）或 **WebP**（最佳压缩）
   - 尺寸：**长边 ≤ 2000px**，部署后加载更快
   - 大小：每张 **≤ 500KB**（用 [tinypng.com](https://tinypng.com) 压缩）

### 第 2 步：替换作品卡片中的占位图

打开 `sections.jsx`，找到 `WorkCard` 组件（约第 40 行），里面这行就是占位：

```jsx
<Placeholder label={label} ratio={ratio} />
```

**最简方案**：让 WorkCard 接收 `src` 参数。把 WorkCard 改成：

```jsx
function WorkCard({ src, title, tag, ratio = "4/3", label, hoverLabel = "PREVIEW", className = "", style = {} }) {
  return (
    <div className={"work-card " + className} style={style} data-cursor="hover">
      <div className="wc-img" style={{ aspectRatio: ratio }}>
        {src
          ? <img src={src} alt={title}
                 style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <Placeholder label={label} ratio={ratio} />}
        <div className="wc-overlay">{hoverLabel}</div>
      </div>
      <div className="wc-meta">
        <div className="wc-title">{title}</div>
        <div className="wc-tag">{tag}</div>
      </div>
    </div>
  );
}
```

然后在用到 `WorkCard` 的地方加 `src` 属性即可，例如：

```jsx
{/* 改前 */}
<WorkCard className="rust-feature" title="Cogwell · 主角设定" tag="CHAR · 01"
          ratio="16/10" label="MAIN CHARACTER · TURNAROUND" />

{/* 改后 */}
<WorkCard className="rust-feature" title="Cogwell · 主角设定" tag="CHAR · 01"
          ratio="16/10" src="images/rust/cogwell.jpg" />
```

> 已加 `src` 的卡片会显示真实图片，未加 `src` 的卡片继续显示占位条纹。可以一张一张慢慢替换。

### 第 3 步：替换悬停 GIF（hover 时播放）

如果你有 GIF / 短视频片段想做 hover 预览，用 `<video>`：

```jsx
<div className="wc-img" style={{ aspectRatio: ratio }}>
  <video src="videos/rust/clip-01.mp4"
         autoPlay loop muted playsInline
         style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  <div className="wc-overlay">PLAY</div>
</div>
```

或者只在悬停时播放 GIF（更高级，需加 hover 事件，可以下次让我帮你加）。

### 第 4 步：替换 About 章节的肖像

`sections.jsx` 中找到 `AboutSection`，里面这行：

```jsx
<Placeholder label="PORTRAIT · 3:4" ratio="3/4" style={{ width: "100%", height: "100%" }} />
```

替换成：

```jsx
<img src="images/portrait.jpg" alt="Jiaqi Hu"
     style={{ width: "100%", height: "100%", objectFit: "cover" }} />
```

### 第 5 步：替换疼痛传感器的成片视频

`sections.jsx` → `PainSection` → 找到 `<div className="ph-fake-video">...</div>` 整块，替换为：

```jsx
<video src="videos/pain-sensor.mp4"
       controls poster="images/pain/cover.jpg"
       style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
```

或嵌入 Vimeo / Bilibili：

```jsx
<iframe src="https://player.vimeo.com/video/你的视频ID"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        allow="autoplay; fullscreen" allowFullScreen></iframe>
```

### 第 6 步：替换日常练习的速写图

`sections.jsx` → `DailySection` → 找到 `items` 数组，给每项加 `src` 字段：

```jsx
const items = [
  { id: 1, x: 60, y: 80, w: 150, h: 200, r: -4, cap: "GESTURE · 03/12", src: "images/daily/001.jpg" },
  ...
];
```

然后把 `.dc-thumb` 里的 `placeholder` 换成：

```jsx
<div className="dc-thumb" style={{ aspectRatio: c.h ? `${c.w}/${c.h-30}` : "1" }}>
  <img src={c.src} alt=""
       style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
</div>
```

### 第 7 步：替换锈城标题图

最简单 — 在右下角 Tweaks 面板里 → 「锈城标题图 (URL)」字段直接粘贴图片 URL（如 `images/rust/title.png`），无需改代码。

---

## 📝 修改个人信息

### 修改名字 / 介绍文案

- **Hero 章节**（首页大字 + 介绍）：`sections.jsx` → `HeroSection`
- **About 章节**（自我介绍）：`sections.jsx` → `AboutSection`
- **统计数据**（项目数 / 练习数 / 起始年份）：`AboutSection` 里的 `.about-stats`

### 修改联系方式

`sections.jsx` → `ContactSection` → 修改 `<a href="mailto:...">`、`@账号`、各社交媒体链接。

### 修改章节标题 / 简介

每个 Section 内部都有 `.sec-title-row`（中文标题）和 `.sec-tagline`（小标语），直接改文字。

---

## 🎨 修改配色

`styles.css` 中找 `.theme-rust` / `.theme-ghibli` / `.theme-pain` 等块，每个章节的颜色由这些 CSS 变量控制：

```css
.theme-rust {
  --bg:     #2a1a10;   /* 背景色 */
  --fg:     #ffc63a;   /* 主文字色 */
  --accent: #ffb627;   /* 强调色 */
  --line:   rgba(255,198,58,.28);   /* 分割线 */
}
```

---

## 🔧 Tweaks 调试面板

页面右下角点开，可实时调整：
- Display 字体 / 锈城标题字体 / 锈城标题图 URL
- 章节切换过渡速度
- 网格密度（紧凑 / 标准 / 宽松）
- 自定义光标开关 / 噪点纹理开关

调整后会自动写回 `app.jsx` 中的 `TWEAK_DEFAULTS` 默认值。

---

## 🌐 部署到 GitHub Pages

1. 注册 GitHub → 创建仓库，命名为 `你的用户名.github.io`
2. 上传所有项目文件（包括 `images/`、`videos/`）
3. Settings → Pages → Source 选 `main` 分支根目录 → Save
4. 1–3 分钟后访问 `https://你的用户名.github.io`

修改作品后，重新上传文件即自动更新上线。

---

## ❓ 常见问题

**Q：图片加载失败 / 显示占位？**
A：检查 `src` 路径是否正确（区分大小写！），文件是否真的在那里。

**Q：滚动太快 / 太慢？**
A：Tweaks 面板「过渡速度」滑条调节。

**Q：手机上某些交互不工作？**
A：自定义光标和拖拽功能在触屏设备上自动降级，属正常表现。

**Q：想加新的章节？**
A：在 `sections.jsx` 仿照现有章节写一个 `function NewSection()`，在 `app.jsx` 的 `<main>` 中加入，并在 `SECTIONS` 数组里登记。

---

需要进一步定制？告诉我你的需求即可。
