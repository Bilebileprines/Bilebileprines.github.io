/* ===========================================================================
   sections.jsx — 七个章节的视图组件
   =========================================================================== */

const { useState, useEffect, useRef } = React;

/* ===========================================================================
   通用组件 — Placeholder（占位图）
   作用：在没有真实作品图时，显示一个带斜线条纹 + 标签文字的占位框
   参数：
     label   ：占位文字，例如 "MAIN CHARACTER · TURNAROUND"
     ratio   ：宽高比，例如 "16/9"、"3/4"、"4/3"
     style   ：额外样式（用于覆盖 aspectRatio 等）
     className：额外类名
   ★ 替换真实作品时：把 <Placeholder ... /> 整个换成 <img src="..." />
   =========================================================================== */
function Placeholder({ label, ratio = "4/3", style = {}, className = "" }) {
  return (
    <div
      className={"placeholder " + className}
      style={{ aspectRatio: ratio, ...style }}
    >
      <span className="ph-label">{label}</span>
    </div>
  );
}

/* ===========================================================================
   通用组件 — WorkCard（作品卡片）
   结构：上方图片区（带 hover 蒙层）+ 下方标题 / 标签条
   参数：
     title      ：卡片下方主标题（如 "Cogwell · 主角设定"）
     tag        ：右下角小标签（如 "CHAR · 01"）
     ratio      ：图片宽高比
     label      ：占位文字
     hoverLabel ：鼠标悬停时蒙层显示的文字（默认 "PREVIEW"）
     className  ：用于栅格定位（如 "rust-feature" 表示锈城章节的大卡片）
   ★ 替换真实作品：见文末说明
   =========================================================================== */
function WorkCard({ title, tag, ratio = "4/3", label, hoverLabel = "PREVIEW", className = "", style = {}, src, portrait, onClick }) {
  return (
    <div className={"work-card " + className} style={style} data-cursor="hover" onClick={onClick}>
      <div className="wc-img" style={{ aspectRatio: portrait ? "3/5" : ratio }}>
        {src
          ? <img src={src} alt={title} style={{ width: "100%", height: "100%", objectFit: portrait ? "contain" : "cover", display: "block" }} />
          : <Placeholder label={label} ratio={ratio} />
        }
        {onClick && <div className="wc-overlay">{hoverLabel}</div>}
      </div>
      <div className="wc-meta">
        <div className="wc-title">{title}</div>
        <div className="wc-tag">{tag}</div>
      </div>
    </div>
  );
}

/* ===========================================================================
   01 · HERO — 首页封面
   设计要点：
     · 巨大背景字母 "JIAQI"（透明度低，作为背景图层）
     · 主名字 + ANIMATION DIRECTOR 印章
     · 底部三栏 meta：正在播放 / 滚动指引 / 所在地
     · 最底部跑马灯（关键词无限滚动）
   =========================================================================== */
function HeroSection() {
  return (
    <section className="section theme-hero" id="hero" data-cursor-style="default" data-screen-label="01 Hero">
      <div className="hero-bg-letters">JIAQI</div>

      <div className="hero-eyebrow">
        <span className="eyebrow">Portfolio · 2023 — 2026</span>
      </div>

      <div className="hero-stage">
        <div className="hero-title reveal-stagger">
          <div className="eyebrow" style={{ marginBottom: 28 }}>动画 · 概念 · 视觉开发</div>
          <div className="name-row">
            <span className="display h-mega">Jiaqi</span>
            <span className="stamp">ANIMATION DIRECTOR</span>
          </div>
          <div className="name-row" style={{ marginTop: 8 }}>
            <span className="display h-mega">Hu.</span>
            <span className="serif" style={{ fontSize: "clamp(20px,2vw,28px)", fontStyle: "italic" }}>
              胡佳琪
            </span>
          </div>
          <div className="body-l serif" style={{ marginTop: 28, maxWidth: 540, fontStyle: "italic" }}>
            一个在锈迹与森林之间游荡的动画作者 — 收集机械、神祇、与疼痛的形状，
            把它们画成会动的故事。
          </div>
        </div>
      </div>

      <div className="hero-meta">
        <div className="hero-meta-block">
          <div className="eyebrow" style={{ marginBottom: 10 }}>NOW PLAYING</div>
          <div className="body" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: ".08em" }}>
            ► 04 PAIN-SENSOR / TRAILER &nbsp;·&nbsp; 03:24
          </div>
        </div>

        <div className="scroll-cue">
          <span>SCROLL · 向下滑动</span>
          <span className="arrow"></span>
        </div>

        <div className="hero-meta-block" style={{ textAlign: "right" }}>
          <div className="eyebrow" style={{ marginBottom: 10, justifyContent: "flex-end" }}>BASED IN</div>
          <div className="body" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
            BEIJING · CN<br/>
            39.90°N / 116.41°E
          </div>
        </div>
      </div>

      <div className="hero-marquee">
        <div className="track">
          <span>MACHINARIUM</span><span className="dot"></span>
          <span>GHIBLI</span><span className="dot"></span>
          <span>2D ANIMATION</span><span className="dot"></span>
          <span>CHARACTER DESIGN</span><span className="dot"></span>
          <span>STORYBOARD</span><span className="dot"></span>
          <span>VISUAL DEVELOPMENT</span><span className="dot"></span>
          <span>MACHINARIUM</span><span className="dot"></span>
          <span>GHIBLI</span><span className="dot"></span>
          <span>2D ANIMATION</span><span className="dot"></span>
          <span>CHARACTER DESIGN</span><span className="dot"></span>
          <span>STORYBOARD</span><span className="dot"></span>
          <span>VISUAL DEVELOPMENT</span><span className="dot"></span>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   02 · ABOUT — 关于我
   左侧：肖像占位（带胶带装饰）；右侧：自我介绍 + 数据统计
   ★ 替换肖像：把 <Placeholder/> 换成 <img src="images/portrait.jpg"/>
   =========================================================================== */
function AboutSection() {
  return (
    <section className="section theme-about" id="about" data-cursor-style="default" data-screen-label="02 About">
      <div className="sec-header">
        <div>
          <div className="sec-num">02 / 07 — INTRODUCTION</div>
          <div className="sec-title-row">
            <span className="sec-zh">关于</span>
            <span className="sec-en">/ ABOUT</span>
          </div>
        </div>
        <div className="sec-meta">
          ANIMATION · ILLUSTRATION<br/>
          STUDENT &amp; INDEPENDENT MAKER
        </div>
      </div>

      <div className="about-grid">
        <div className="about-portrait reveal">
          <div className="tape"></div>
          <div className="tape t2"></div>
          <img
            src="images/about/大杂烩.jpeg"
            alt="胡佳琪 · 作品宇宙"
            className="about-collage"
          />
          <div className="about-portrait-cap">CHARACTER UNIVERSE · 作品宇宙</div>
        </div>

        <div className="about-text reveal" style={{ "--delay": ".15s" }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>HELLO · 你好</div>
          <h2 className="display h-1">我画会呼吸的画面，<br/>让静止的东西开始发声。</h2>
          <p className="body-l" style={{ marginTop: 28 }}>
            我是胡佳琪，一名以动画为母语的视觉作者。我的作品在<em>锈迹斑斑的机械世界</em>
            与<em>湿润的森林精灵</em>之间往返，常常以一帧帧手绘去寻找
            — 那种"东西活过来的瞬间"。
          </p>
          <p className="body">
            目前研究方向集中在二维角色动画、视觉前期开发与短片导演。
            我喜欢拼贴、Risograph 印刷、老相机的颗粒，以及任何会咯吱作响的东西。
          </p>

          <div className="about-stats">
            <div>
              <div className="stat-num">3</div>
              <div className="stat-lbl">主题项目<br/>THEMED PROJECTS</div>
            </div>
            <div>
              <div className="stat-num">120+</div>
              <div className="stat-lbl">日常练习<br/>DAILY SKETCHES</div>
            </div>
            <div>
              <div className="stat-num">2023</div>
              <div className="stat-lbl">起始年份<br/>SINCE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============= 03 · 锈城 RUST ============= */
/* ===========================================================================
   03 · 锈城 RUST — 机械迷城风格作品
   背景：深棕底 / 金色字 / Bungee Inline 工业字体
   网格：12 列 mosaic 布局，feature 卡片占 7 列 × 2 行
   参数：
     rustTitleImg — 标题图 URL；非空则替换文字标题，留空使用 "锈城" 文字
   =========================================================================== */
const RUST_IMAGES = [
  { src: "images/rust/cover.jpg",              title: "封面主题",   tag: "KEY VISUAL",        ratio: "16/9", portrait: false },
  { src: "images/rust/scene-1.jpg",            title: "场景一",     tag: "ENVIRONMENT · 01",  ratio: "16/9", portrait: false },
  { src: "images/rust/scene-2.jpg",            title: "场景二",     tag: "ENVIRONMENT · 02",  ratio: "3/5",  portrait: true  },
  { src: "images/rust/ayao.jpg",               title: "阿瑶",       tag: "CHARACTER · 01",    ratio: "16/9", portrait: false },
  { src: "images/rust/abao-guishu.jpg",        title: "阿保和贵叔", tag: "CHARACTER · 02",    ratio: "16/9", portrait: false },
  { src: "images/rust/steam-photographer.jpg", title: "蒸汽售像员", tag: "CHARACTER · 03",    ratio: "16/9", portrait: false },
  { src: "images/rust/photo-cost.jpg",         title: "照片的代价", tag: "ILLUSTRATION",      ratio: "16/9", portrait: false },
  { src: "images/rust/storyboard.jpg",         title: "分镜",       tag: "STORYBOARD",        ratio: "16/9", portrait: false },
];

const RUST_VISIBLE = [RUST_IMAGES[0], RUST_IMAGES[1], RUST_IMAGES[2], RUST_IMAGES[3], RUST_IMAGES[4], RUST_IMAGES[5]];

/* ---------- 锈城拼图马赛克 ----------
   8 张作品图按 grid-template-areas 紧密拼接：
     a 封面(6×3)  b 场景1(4×2)  c 场景2 竖图(2×4)
     d 阿瑶(4×2)
     e 阿保和贵叔(3×3)  f 蒸汽(3×3)  g 未完成(6×2)
     h 分镜(12×2 横幅)
   每张图都是完整矩形卡片，块之间有 1px 缝隙形成接缝感
------------------------------------- */
function RustPuzzle({ images, onPieceClick }) {
  const slots = [
    { area: "a", img: images[0], label: "KEY VISUAL" },
    { area: "b", img: images[1], label: "ENV · 01" },
    { area: "c", img: images[2], label: "ENV · 02" },
    { area: "d", img: images[3], label: "CHAR · 01" },
    { area: "e", img: images[4], label: "CHAR · 02" },
    { area: "f", img: images[5], label: "CHAR · 03" },
    { area: "g", img: images[6], label: "CHAR · 04" },
    { area: "h", img: images[7], label: "STORYBOARD" },
  ];

  return (
    <div className="rust-puzzle-wrap">
      <div className="rust-puzzle-grid">
        {slots.map((s, i) => (
          <div
            key={s.area}
            className={`rpz-tile rpz-${s.area}`}
            data-cursor="hover"
            onClick={() => onPieceClick && onPieceClick(i)}
            style={{ "--delay": `${i * 80}ms` }}
          >
            <div className="rpz-img-wrap">
              <img src={s.img.src} alt={s.img.title} loading="lazy" />
              <div className="rpz-hover-overlay">
                <span className="rpz-hover-label">查看大图</span>
              </div>
            </div>
            <div className="rpz-meta">
              <span className="rpz-title">{s.img.title}</span>
              <span className="rpz-tag">{s.img.tag}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="rust-puzzle-hint">
        <span className="rpz-dot"></span>
        八块咬合 · 点击任一碎片预览大图
      </div>
    </div>
  );
}

function RustSection({ rustTitleImg }) {
  const [lbIdx, setLbIdx] = useState(null); // null = closed; number = current image index
  const [lbExtra, setLbExtra] = useState(null); // URL of an extra (non-puzzle) image to preview

  // Keyboard nav while lightbox open
  useEffect(() => {
    if (lbIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLbIdx(null);
      else if (e.key === "ArrowLeft")  setLbIdx(i => (i - 1 + RUST_IMAGES.length) % RUST_IMAGES.length);
      else if (e.key === "ArrowRight") setLbIdx(i => (i + 1) % RUST_IMAGES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbIdx]);

  useEffect(() => {
    if (!lbExtra) return;
    const onKey = (e) => { if (e.key === "Escape") setLbExtra(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbExtra]);

  return (
    <section className="section theme-rust" id="rust" data-cursor-style="cog" data-screen-label="03 Rust City">
      {/* decorative cogs SVG */}
      <svg className="rust-cogs" style={{ top: 60, right: 40, width: 220, height: 220 }} viewBox="0 0 100 100">
        <g fill="none" stroke="#f0c674" strokeWidth="0.5">
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="28" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="14" />
          {Array.from({length:12}).map((_,i)=>{
            const a = (i/12)*Math.PI*2;
            const x1 = 50+Math.cos(a)*35, y1 = 50+Math.sin(a)*35;
            const x2 = 50+Math.cos(a)*42, y2 = 50+Math.sin(a)*42;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="2" />;
          })}
        </g>
      </svg>
      <div className="rust-pipe" style={{ top: "30%", left: 0, right: 0 }}></div>
      <div className="rust-pipe" style={{ bottom: "20%", left: 0, right: 0, height: 1, opacity: .4 }}></div>

      <div className="sec-header">
        <div>
          <div className="sec-num">03 / 07 — PROJECT 01</div>
          <div className="sec-title-row">
            {rustTitleImg
              ? <img src={rustTitleImg} alt="锈城" className="rust-title-img" />
              : <span className="sec-zh">锈城</span>}
            <span className="sec-en">/ RUST CITY · MACHINARIUM-INSPIRED</span>
          </div>
          <div className="sec-tagline">
            "在永不停歇的齿轮深处，一只小小的螺丝学会了做梦。"
          </div>
        </div>
        <div className="sec-meta">
          2024 — COMPLETED<br/>
          CHARACTER · ENVIRONMENT<br/>
          8 DELIVERABLES
        </div>
      </div>

      <div className="reveal-stagger">
        <RustPuzzle images={RUST_IMAGES} onPieceClick={(i) => setLbIdx(i)} />
      </div>

      {/* ──── 创意阐述：售像所 - 记忆档案馆 ──── */}
      <div className="rust-creative reveal">
        <div className="rc-left">
          <div className="rc-eyebrow">
            <div className="rc-eyebrow-en">Creative Presentation</div>
            <div className="rc-eyebrow-zh">创意阐述</div>
          </div>

          <div className="rc-pill">售像所 — 记忆档案馆</div>

          <div className="rc-bigtitle">
            <span>WORLD</span>
            <span>BACK-</span>
            <span>GROUND</span>
          </div>

          <div className="rc-tagline">
            "如果你记得这是谁，告诉我。<br/>
            我在替人保管记忆。"
          </div>
        </div>

        <div className="rc-right">
          <div className="rc-artwork" data-cursor="hover" onClick={() => {
            // 复用 puzzle 的 lightbox 体系：单独显示 world-bg 大图
            setLbExtra("images/rust/world-bg.jpg");
          }}>
            <img src="images/rust/world-bg.jpg" alt="售像所 · 世界观设定" />
            <div className="rc-artwork-tag">CONCEPT ART · 售像所内景</div>
          </div>

          <div className="rc-body">
            <p>
              在一个人与机器深度融合的蒸汽时代城市"锈城"，
              <em>记忆</em>像煤炭一样成为稀缺资源。过度机械化让居民逐渐遗忘自己人形态的模样。
            </p>
            <p>
              九岁的人类女孩<em>阿瑶</em>，手持一架黄铜老式相机，是城中最后一位"售像师"——
              既为机械化严重的居民拍摄肖像（这是他们记住"自己曾经是谁"的唯一方式），
              也售卖那些她从城市各个角落"捡"来的、无人认领的旧照片。
            </p>
            <p>
              当城市上空永不停息的巨大机械心停止跳动、所有机器人开始程序崩溃时，
              阿瑶发现，她那台从不使用电池的老相机，
              <em>似乎是启动一切的关键。</em>
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox — 单图大图预览 */}
      {lbIdx !== null && (() => {
        const cur = RUST_IMAGES[lbIdx];
        const prev = () => setLbIdx(i => (i - 1 + RUST_IMAGES.length) % RUST_IMAGES.length);
        const next = () => setLbIdx(i => (i + 1) % RUST_IMAGES.length);
        return (
          <div className="rust-lightbox single" onClick={() => setLbIdx(null)}>
            <div className="rust-lb-close" onClick={() => setLbIdx(null)}>✕</div>
            <div className="rust-lb-title">锈城 · RUST CITY · {lbIdx + 1} / {RUST_IMAGES.length}</div>

            <button className="rust-lb-arrow prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="prev">‹</button>
            <button className="rust-lb-arrow next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="next">›</button>

            <div className="rust-lb-single" onClick={e => e.stopPropagation()}>
              <img src={cur.src} alt={cur.title} key={cur.src} />
              <div className="rust-lb-single-caption">
                <span className="lb-caption-title">{cur.title}</span>
                <span className="lb-caption-tag">{cur.tag}</span>
              </div>
            </div>

            {/* 缩略图 strip */}
            <div className="rust-lb-thumbs" onClick={e => e.stopPropagation()}>
              {RUST_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className={"rust-lb-thumb" + (i === lbIdx ? " active" : "")}
                  onClick={() => setLbIdx(i)}
                >
                  <img src={img.src} alt={img.title} />
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* 创意阐述大图 lightbox */}
      {lbExtra && (
        <div className="rust-lightbox single" onClick={() => setLbExtra(null)}>
          <div className="rust-lb-close" onClick={() => setLbExtra(null)}>✕</div>
          <div className="rust-lb-single" onClick={e => e.stopPropagation()}>
            <img src={lbExtra} alt="" />
          </div>
        </div>
      )}
    </section>
  );
}

/* ===========================================================================
   04 · 守夜人 GHIBLI — 吉卜力风格作品
   背景：浅薄荷绿 / 深绿字 / Ma Shan Zheng 流畅手写体
   底部装饰：两层山丘剪影（SVG 路径）
   =========================================================================== */
function GhibliSection() {
  return (
    <section className="section theme-ghibli" id="ghibli" data-cursor-style="leaf" data-screen-label="04 Night Watcher">
      {/* 萤火虫 */}
      <div className="ghibli-fireflies">
        {[
          { top: "15%", left: "8%",  dur: "2.8s", delay: "0s"    },
          { top: "25%", left: "22%", dur: "3.5s", delay: "0.7s"  },
          { top: "10%", left: "55%", dur: "2.4s", delay: "1.2s"  },
          { top: "35%", left: "70%", dur: "3.1s", delay: "0.3s"  },
          { top: "20%", left: "88%", dur: "2.9s", delay: "1.8s"  },
          { top: "42%", left: "12%", dur: "3.3s", delay: "0.5s"  },
          { top: "30%", left: "42%", dur: "2.6s", delay: "2.1s"  },
          { top: "18%", left: "65%", dur: "3.7s", delay: "1.0s"  },
        ].map((f, i) => (
          <div key={i} className="ghibli-firefly"
            style={{ top: f.top, left: f.left, "--fd": f.dur, "--fd2": f.delay }} />
        ))}
      </div>

      {/* hill silhouette */}
      <svg className="ghibli-hill" viewBox="0 0 1200 320" preserveAspectRatio="none">
        <path d="M0 240 Q 200 180 400 220 T 800 200 T 1200 230 L 1200 320 L 0 320 Z"
              fill="#5a7a3e" opacity="0.18"/>
        <path d="M0 280 Q 300 230 600 260 T 1200 270 L 1200 320 L 0 320 Z"
              fill="#5a7a3e" opacity="0.28"/>
      </svg>

      <div className="sec-header">
        <div>
          <div className="sec-num">04 / 07 — PROJECT 02</div>
          <div className="sec-title-row">
            <span className="sec-zh">守夜人</span>
            <span className="sec-en">/ THE NIGHT WATCHER · GHIBLI-INSPIRED</span>
          </div>
          <div className="sec-tagline">
            "山神在云雾里点亮一盏灯，等迷路的孩子回家。"
          </div>
        </div>
        <div className="sec-meta">
          2024 — COMPLETED<br/>
          CHARACTER · BACKGROUND<br/>
          3 DELIVERABLES
        </div>
      </div>

      <div className="work-grid g-mosaic reveal-stagger" style={{ position: "relative", zIndex: 2 }}>
        <WorkCard className="ghibli-feature" title="封面主题" tag="KEY VISUAL" ratio="16/9" label="COVER ART" src="images/ghibli/封面主题.jpg" />
        <WorkCard className="ghibli-side" title="妖怪线稿" tag="CHAR LINEUP" ratio="16/9" label="CHARACTER LINEUP" src="images/ghibli/妖怪线稿.png" />
        <WorkCard className="ghibli-side" title="星野" tag="ENV · 02" ratio="16/9" label="STAR FIELD · ENVIRONMENT" src="images/ghibli/星野.jpg" />
      </div>
    </section>
  );
}

/* ===========================================================================
   05 · 疼痛传感器 PAIN — 4-Tab 布局
   壹·视觉概念  贰·场景设计 & 人物设计  叁·分镜  肆·成片
   =========================================================================== */
function PainSection({ data }) {
  const [tab, setTab] = useState("concept");
  const [fading, setFading] = useState(false);
  const [animIdx, setAnimIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [envIdx, setEnvIdx] = useState(0);
  const [sbLightbox, setSbLightbox] = useState(null);
  const animTimer = useRef(null);

  const switchTab = (id) => {
    if (id === tab) return;
    setFading(true);
    setTimeout(() => {
      setTab(id);
      // 新 tab 显示前设为 opacity:0，等 fade 完再设回 1，触发表格内动画
      const el = document.getElementById("pain");
      if (el) {
        const activeContent = el.querySelector(".pain-tab-content");
        if (activeContent) activeContent.style.opacity = "0";
      }
      setFading(false);
      // 等 fade-in 动画完成，再触发表格内 reveal 动画
      setTimeout(() => {
        const section = document.getElementById("pain");
        if (!section) return;
        const active = section.querySelector(".pain-tab-content");
        if (active) active.style.opacity = "";
        section.querySelectorAll(".pain-tab-content.active .reveal, .pain-tab-content.active .reveal-stagger").forEach(el => {
          el.classList.remove("in");
          void el.offsetWidth;
          el.classList.add("in");
        });
      }, 420);
    }, 300);
  };

  // 初始化：默认激活的 concept 标签页，进场时直接触发动画

  const animImgs = data.animatic;

  const startAnimTimer = () => {
    clearInterval(animTimer.current);
    animTimer.current = setInterval(() => {
      setAnimIdx(i => (i + 1) % animImgs.length);
    }, 5000);
  };

  useEffect(() => {
    startAnimTimer();
    return () => clearInterval(animTimer.current);
  }, []);

  const prevAnim = () => {
    clearInterval(animTimer.current);
    setAnimIdx(i => (i - 1 + animImgs.length) % animImgs.length);
    startAnimTimer();
  };
  const nextAnim = () => {
    clearInterval(animTimer.current);
    setAnimIdx(i => (i + 1) % animImgs.length);
    startAnimTimer();
  };

  const characters = data.characters;

  // 场景设计轮播
  const VISIBLE_ENV = 1;
  const maxEnvIdx = Math.max(0, data.environment.length - VISIBLE_ENV);
  const prevEnv = () => setEnvIdx(i => Math.max(0, i - 1));
  const nextEnv = () => setEnvIdx(i => Math.min(maxEnvIdx, i + 1));

  return (
    <section className="section theme-pain" id="pain" data-cursor-style="paint" data-screen-label="05 Pain Sensor">
      <div className="pain-bg-letter">痛</div>

      <div className="sec-header">
        <div>
          <div className="sec-num">05 / 07 — PROJECT 03</div>
          <div className="sec-title-row">
            <span className="sec-zh">疼痛传感器</span>
            <span className="sec-en">/ PAIN SENSOR · 2D SHORT FILM</span>
          </div>
          <div className="sec-tagline">
            {data.tagline}
          </div>
        </div>
        <div className="sec-meta">
          {data.meta.map((m, i) => <span key={i}>{m}<br/></span>)}
        </div>
      </div>

      {/* ── Tab 切换栏 ── */}
      <div className="pain-tab-bar">
        {[
          { id: "concept",    zh: "壹", en: "视觉概念" },
          { id: "scene",     zh: "贰", en: "场景&人物" },
          { id: "storyboard",zh: "叁", en: "分镜" },
          { id: "film",      zh: "肆", en: "成片" },
        ].map(t => (
          <button
            key={t.id}
            className={"pain-tab-btn" + (tab === t.id ? " active" : "")}
            onClick={() => switchTab(t.id)}
            data-cursor="hover"
          >
            {t.zh} <span className="tab-btn-sub">{t.en}</span>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════
          Tab 1 — 视觉概念
          ══════════════════════════════════════ */}
      <div className={"pain-tab-content" + (tab === "concept" ? " active" : "") + (fading ? " tab-fade" : "")}>

        {/* 单张视觉概念图 · 居中放大 */}
        <div className="pain-concept-single reveal" style={{ marginBottom: 32 }}>
          {(data.concept[1] && data.concept[1].src
            ? <img src={data.concept[1].src} alt={data.concept[1].label} className="pain-concept-single-img" />
            : <Placeholder label={data.concept[1]?.label || "STORY KEY ART"} ratio="16/9" />
          )}
        </div>

        {/* 创意来源卡片 */}
        <div className="pain-inspiration-card reveal">
          <div className="insp-label">CREATIVE INSPIRATION · 创意来源</div>
          <div className="insp-quote">{data.inspiration.quote}</div>
          <div className="insp-story">
            {data.inspiration.story.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          Tab 2 — 场景设计 & 人物设计
          ══════════════════════════════════════ */}
      <div className={"pain-tab-content" + (tab === "scene" ? " active" : "") + (fading ? " tab-fade" : "")}>

        {/* 场景设计轮播 */}
        <div className="pain-scene-section reveal">
          <div className="pain-scene-label">ENVIRONMENT DESIGN · 场景设计</div>
          <div className="env-carousel-wrap">
            <button className="env-arrow prev" onClick={prevEnv} data-cursor="hover">‹</button>

            <div className="env-carousel">
              {data.environment.slice(envIdx, envIdx + VISIBLE_ENV).map((item, i) => (
                <div key={item.label} className="env-card" data-cursor="hover">
                  <div className="env-card-img-wrap">
                    {item.src
                      ? <img src={item.src} alt={item.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                      : <Placeholder label={item.label} ratio="16/9" />
                    }
                    <div className="env-card-meta">
                      <div className="env-card-title">{item.title}</div>
                      <div className="env-card-tag">{item.tag}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="env-arrow next" onClick={nextEnv} data-cursor="hover">›</button>
          </div>

          {/* 页码指示器 */}
          <div className="env-dots">
            {Array.from({ length: maxEnvIdx + 1 }).map((_, i) => (
              <div key={i} className={"env-dot" + (envIdx === i ? " active" : "")} />
            ))}
          </div>
        </div>

        {/* 人物设计：两人各2张并排，用tab切换 */}
        <div className="pain-character-section reveal">
          <div className="pain-scene-label">CHARACTER DESIGN · 人物设计</div>

          {/* Tab 切换两人 */}
          <div className="char-tab-bar">
            {characters.map((c, i) => (
              <button
                key={i}
                className={"char-tab-btn" + (charIdx === i ? " active" : "")}
                onClick={() => setCharIdx(i)}
                data-cursor="hover"
              >
                {c.name} <span className="char-tab-role">{c.role.split("/")[1]?.trim()}</span>
              </button>
            ))}
          </div>

          {/* 当前选中人物 */}
          {characters[charIdx] && (
            <div className="char-detail">
              {/* 2张图并排 */}
              <div className="char-imgs-row">
                {characters[charIdx].imgs.map((item, i) => (
                  <div key={i} className="char-img-block" data-cursor="hover">
                    {item.src
                      ? <img src={item.src} alt={item.label} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                      : <Placeholder label={item.label} ratio="3/4" />
                    }
                    <div className="char-img-label">{item.label}</div>
                  </div>
                ))}
              </div>
              {/* 人物信息 */}
              <div className="char-info-block">
                <div className="character-name">{characters[charIdx].name}</div>
                <div className="character-role">{characters[charIdx].role}</div>
                <div className="character-bio">{characters[charIdx].bio}</div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ══════════════════════════════════════
          Tab 3 — 分镜
          ══════════════════════════════════════ */}
      <div className={"pain-tab-content" + (tab === "storyboard" ? " active" : "") + (fading ? " tab-fade" : "")}>
        <div className="animatic-layout reveal-stagger">
          {/* 动态分镜大图 */}
          <div>
            <div className="pain-scene-label" style={{ marginBottom: 12 }}>STORYBOARD · 动态分镜</div>
            <div className="animatic-carousel">
              <button className="animatic-arrow prev" onClick={prevAnim} data-cursor="hover">‹</button>

              {animImgs.map((item, i) => (
                <div key={i} className={"animatic-slide" + (animIdx === i ? " active" : "")}>
                  {item.src
                    ? <img src={item.src} alt={item.label} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                    : <Placeholder label={item.label} ratio="16/9" />
                  }
                </div>
              ))}

              <button className="animatic-arrow next" onClick={nextAnim} data-cursor="hover">›</button>

              <div className="animatic-dots">
                {animImgs.map((_, i) => (
                  <div key={i} className={"animatic-dot" + (animIdx === i ? " active" : "")} />
                ))}
              </div>
            </div>
          </div>

          {/* 静态分镜缩略图 */}
          <div>
            <div className="pain-scene-label" style={{ marginBottom: 12 }}>STORYBOARD · 静态分镜</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[1,2,3,4,5,6].map(n => (
                <div key={n} style={{ border: "2px solid #5c3818", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setSbLightbox(n)}>
                  <img
                    src={"images/pain/storyboard/静态分镜" + n + ".jpg"}
                    alt={"静态分镜 " + n}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 静态分镜 Lightbox */}
          {sbLightbox && (
            <div className="sb-lightbox" onClick={() => setSbLightbox(null)}>
              <div className="sb-lightbox-inner" onClick={e => e.stopPropagation()}>
                <button className="sb-lightbox-close" onClick={() => setSbLightbox(null)}>×</button>
                <button className="sb-lightbox-prev" onClick={() => setSbLightbox(p => p > 1 ? p - 1 : 6)}>‹</button>
                <img
                  src={"images/pain/storyboard/静态分镜" + sbLightbox + ".jpg"}
                  alt={"静态分镜 " + sbLightbox}
                />
                <button className="sb-lightbox-next" onClick={() => setSbLightbox(p => p < 6 ? p + 1 : 1)}>›</button>
                <div className="sb-lightbox-counter">{sbLightbox} / 6</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          Tab 4 — 成片
          ══════════════════════════════════════ */}
      <div className={"pain-tab-content" + (tab === "film" ? " active" : "") + (fading ? " tab-fade" : "")}>
        <div className="film-layout reveal">
          {/* 视频 */}
          <div className="film-video-wrap">
            {data.finalFilm.videoSrc ? (
              <video
                controls
                style={{ width: "100%", display: "block", aspectRatio: "16/9" }}
                src={data.finalFilm.videoSrc}
                poster={data.finalFilm.poster}
              />
            ) : (
              <div style={{ aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #8b4a1c 0%, #c0704a 100%)" }}>
                <div style={{ textAlign: "center", color: "#f5ede0" }}>
                  <div style={{ fontSize: 64 }}>▶</div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", marginTop: 16 }}>
                    FINAL FILM · 03:24 · CLICK TO PLAY
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 故事梗概 · 视频下方 */}
          <div className="film-synopsis-section">
            <div className="film-synopsis-label">故事梗概</div>
            <div className="film-synopsis">{data.finalFilm.synopsis}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   06 · 日常练习 DAILY — 自由拖拽画布
   交互：每张速写卡片可用鼠标拖拽到画布任意位置
   实现：
     · items 数组定义初始位置 / 尺寸 / 旋转 / 标题
     · onMouseDown 启动拖拽，全局监听 mousemove 更新位置
   ★ 替换练习图：把 .dc-thumb 里的 placeholder 换成 <img src="images/daily/01.jpg" />
     建议在 items 数组里加一个 src 字段，集中管理图片路径
   =========================================================================== */
function DailySection() {
  const items = [
    { id: 1,  src: "images/daily/wx-01.jpg",       x:  40, y:  40, w: 220, h: 154, r: -4, cap: "CHARACTER · 01" },
    { id: 2,  src: "images/daily/image15.jpeg",    x: 290, y:  70, w: 200, h: 142, r:  3, cap: "FACE STUDY · 02" },
    { id: 3,  src: "images/daily/image37.png",     x: 530, y:  40, w: 240, h: 200, r: -2, cap: "PROPS · 03" },
    { id: 4,  src: "images/daily/wx-02.jpg",       x: 810, y:  80, w: 200, h: 142, r:  5, cap: "CHARACTER · 04" },
    { id: 5,  src: "images/daily/image103.jpeg",   x:1040, y:  50, w: 180, h: 131, r: -3, cap: "GESTURE · 05" },

    { id: 6,  src: "images/daily/wx-03.jpg",       x:  80, y: 250, w: 200, h: 142, r:  2, cap: "CHARACTER · 06" },
    { id: 7,  src: "images/daily/image24.jpeg",    x: 320, y: 280, w: 220, h: 154, r: -5, cap: "COLOR · 07" },
    { id: 8,  src: "images/daily/image27.png",     x: 580, y: 260, w: 200, h: 142, r:  4, cap: "ENV · 08" },
    { id: 9,  src: "images/daily/image28.png",     x: 820, y: 290, w: 200, h: 142, r: -2, cap: "STUDY · 09" },
    { id: 10, src: "images/daily/image65.jpeg",    x:1050, y: 260, w: 180, h: 131, r:  3, cap: "MOOD · 10" },

    { id: 11, src: "images/daily/wx-04.jpg",       x: 180, y: 460, w: 220, h: 154, r: -3, cap: "CHARACTER · 11" },
    { id: 12, src: "images/daily/image97.jpeg",    x: 470, y: 440, w: 240, h: 165, r:  4, cap: "MOOD STUDY · 12" },
  ];

  const [cards, setCards] = useState(items);
  const [lbIdx, setLbIdx] = useState(null);
  const dragRef = useRef(null);
  const draggedRef = useRef(false); // 区分拖拽 vs 点击

  // 键盘导航 lightbox
  useEffect(() => {
    if (lbIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLbIdx(null);
      else if (e.key === "ArrowLeft")  setLbIdx(i => (i - 1 + items.length) % items.length);
      else if (e.key === "ArrowRight") setLbIdx(i => (i + 1) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbIdx]);

  const onMouseDown = (e, id) => {
    e.preventDefault();
    const card = cards.find(c => c.id === id);
    const startX = e.clientX, startY = e.clientY;
    const ox = card.x, oy = card.y;
    dragRef.current = id;
    draggedRef.current = false;
    document.body.classList.add("cursor-drag");

    const onMove = (ev) => {
      const dx = ev.clientX - startX, dy = ev.clientY - startY;
      // 超过 5px 阈值才算拖拽
      if (!draggedRef.current && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        draggedRef.current = true;
      }
      if (draggedRef.current) {
        setCards(prev => prev.map(c => c.id === id ? { ...c, x: ox+dx, y: oy+dy } : c));
      }
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      const wasClick = !draggedRef.current;
      dragRef.current = null;
      draggedRef.current = false;
      document.body.classList.remove("cursor-drag");
      if (wasClick) {
        // 找到 id 对应在 items 数组的索引
        const idx = items.findIndex(it => it.id === id);
        if (idx >= 0) setLbIdx(idx);
      }
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <section className="section theme-daily" id="daily" data-cursor-style="pencil" data-screen-label="06 Daily">
      <div className="sec-header">
        <div>
          <div className="sec-num">06 / 07 — SKETCHBOOK</div>
          <div className="sec-title-row">
            <span className="sec-zh">日常练习</span>
            <span className="sec-en">/ DAILY · 120+ SKETCHES</span>
          </div>
          <div className="sec-tagline">
            "每天画一点点，是养一只动物的方式。"
          </div>
        </div>
        <div className="sec-meta">
          ONGOING · DAILY<br/>
          DRAG TO REARRANGE · 拖拽探索<br/>
          REFRESHED WEEKLY
        </div>
      </div>

      <div className="daily-canvas">
        <div className="daily-hint">DRAG 拖拽 · CLICK 看大图 · {cards.length} ITEMS</div>
        {cards.map((c, i) => (
          <div
            key={c.id}
            className={"daily-card " + (dragRef.current === c.id ? "dragging" : "")}
            data-cursor="drag"
            style={{
              left: c.x, top: c.y,
              width: c.w,
              transform: `rotate(${c.r}deg)`,
              zIndex: 10 + i
            }}
            onMouseDown={(e) => onMouseDown(e, c.id)}
          >
            {c.src ? (
              <div
                className="dc-thumb dc-thumb-img"
                style={{ aspectRatio: c.h ? `${c.w}/${c.h-30}` : "1" }}
              >
                <img src={c.src} alt={c.cap} draggable="false" />
              </div>
            ) : (
              <div
                className="dc-thumb placeholder"
                style={{
                  "--ph-color": "rgba(26,22,17,.1)",
                  "--ph-bg": ["#e8dec7","#d4dac0","#e6cfb8","#cbd1da","#e0c8c8","#dcd5bc","#cdd6cb"][c.id % 7],
                  aspectRatio: c.h ? `${c.w}/${c.h-30}` : "1"
                }}
              >
                <span className="ph-label">#{c.id.toString().padStart(3,"0")}</span>
              </div>
            )}
            <div className="dc-cap">{c.cap}</div>
          </div>
        ))}
      </div>

      {/* Lightbox — 点击放大预览 */}
      {lbIdx !== null && (() => {
        const cur = items[lbIdx];
        const prev = () => setLbIdx(i => (i - 1 + items.length) % items.length);
        const next = () => setLbIdx(i => (i + 1) % items.length);
        return (
          <div className="daily-lightbox" onClick={() => setLbIdx(null)}>
            <div className="daily-lb-close" onClick={() => setLbIdx(null)}>✕</div>
            <div className="daily-lb-title">日常练习 · DAILY · {lbIdx + 1} / {items.length}</div>

            <button className="daily-lb-arrow prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="prev">‹</button>
            <button className="daily-lb-arrow next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="next">›</button>

            <div className="daily-lb-frame" onClick={e => e.stopPropagation()}>
              <img src={cur.src} alt={cur.cap} key={cur.src} />
              <div className="daily-lb-caption">{cur.cap}</div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}

/* ===========================================================================
   07 · CONTACT — 联系方式
   左侧：大尺寸 CTA 文字；右侧：联系渠道列表
   ★ 修改个人信息：把 mailto:、@账号、URL 都改成你自己的
   =========================================================================== */
function ContactSection() {
  return (
    <section className="section theme-contact" id="contact" data-cursor-style="default" data-screen-label="07 Contact">
      <div className="sec-header">
        <div>
          <div className="sec-num">07 / 07 — END</div>
        </div>
        <div className="sec-meta">
          OPEN FOR · 合作邀约<br/>
          FREELANCE / COMMISSION / FILM
        </div>
      </div>

      <div className="contact-grid">
        <div className="reveal">
          <div className="eyebrow" style={{ marginBottom: 28 }}>SAY HELLO · 打个招呼</div>
          <div className="contact-cta">
            一起<br/>
            做点<br/>
            <em>会动的</em><br/>
            东西吧。
          </div>
        </div>

        <div className="contact-channels reveal" style={{ "--delay": ".15s" }}>
          <a className="contact-channel" href="mailto:guyue2439004174@163.com" data-cursor="hover">
            <div>
              <div className="cc-label">EMAIL · 邮箱</div>
              <div style={{ marginTop: 4 }}>guyue2439004174@163.com</div>
            </div>
            <span style={{ fontSize: 18 }}>→</span>
          </a>
          <a className="contact-channel"
             href="https://github.com/Bilebileprines?tab=repositories"
             target="_blank" rel="noopener noreferrer"
             data-cursor="hover">
            <div>
              <div className="cc-label">GITHUB · 代码</div>
              <div style={{ marginTop: 4 }}>github.com/Bilebileprines</div>
            </div>
            <span style={{ fontSize: 18 }}>↗</span>
          </a>
          <div className="contact-channel static" data-cursor="default">
            <div>
              <div className="cc-label">XIAOHONGSHU · 小红书</div>
              <div style={{ marginTop: 4 }}>四喜丸子</div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-foot">
        <span>© 2026 JIAQI HU — 胡佳琪</span>
        <span>SITE · BUILT WITH 🖌</span>
        <span>BACK TO TOP ↑</span>
      </div>
    </section>
  );
}

// 把所有章节组件挂到 window 上，让 app.jsx 可以引用
// （多个 type="text/babel" 脚本之间默认不共享作用域，必须显式挂全局）
Object.assign(window, {
  HeroSection, AboutSection, RustSection, GhibliSection,
  PainSection, DailySection, ContactSection
});
