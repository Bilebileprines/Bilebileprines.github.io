/* ===========================================================================
   app.jsx — 主应用程序
   作用：装配整个网站、处理自定义光标、滚动监听、Tweaks 调试面板
   =========================================================================== */

// 从全局的 React（在 index.html 里通过 <script> 加载）解构出常用 hooks
const { useState, useEffect, useRef } = React;

/* ---------------------------------------------------------------------------
   TWEAK_DEFAULTS — Tweaks 面板的默认值
   说明：被 EDITMODE-BEGIN/END 注释包住的 JSON 块会被宿主环境识别为可持久化配置。
        在编辑器右下角打开 Tweaks 面板时，修改这里的值就会写回到这个文件里。
   --------------------------------------------------------------------------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "displayFont": "Permanent Marker",   // 全局展示字体（hero/about 等通用大标题）
  "rustFont": "Bungee Inline",         // 锈城章节专用标题字体
  "rustTitleImg": "images/rust/title-rust.png",                  // 锈城标题图片 URL，留空则使用文字标题
  "transitionSpeed": 800,              // 章节背景色过渡时长（毫秒）
  "density": "regular",                // 作品网格密度：compact / regular / comfy
  "cursorEnabled": true,               // 是否启用自定义鼠标光标
  "grainEnabled": true                 // 是否启用全局噪点纹理叠加
}/*EDITMODE-END*/;

/* 全局 Display 字体可选项（控制 Hero / About / Daily / Contact 等） */
const FONT_OPTIONS = [
  { id: "Permanent Marker", label: "Marker · 手写" },
  { id: "Caveat", label: "Caveat · 草书" },
  { id: "Shadows Into Light", label: "Shadows · 铅笔" },
  { id: "Rubik Mono One", label: "Rubik · 粗黑" }
];

/* 章节列表 — 用于导航栏与左侧章节指示器
   id：必须与 <section> 元素的 id 一致，用于滚动定位与高亮判定 */
const SECTIONS = [
  { id: "hero",    num: "01", zh: "首页",       en: "INDEX" },
  { id: "about",   num: "02", zh: "关于",       en: "ABOUT" },
  { id: "rust",    num: "03", zh: "锈城",       en: "RUST" },
  { id: "ghibli",  num: "04", zh: "守夜人",     en: "GHIBLI" },
  { id: "pain",    num: "05", zh: "疼痛传感器", en: "PAIN" },
  { id: "daily",   num: "06", zh: "日常",       en: "DAILY" },
  { id: "contact", num: "07", zh: "联系",       en: "CONTACT" }
];

/* ===========================================================================
   CustomCursor — 自定义鼠标光标
   原理：用一个小圆点 + 一个外圈圆环跟随鼠标，鼠标移到 [data-cursor] 元素上时
        切换不同形态（hover 放大、drag 拖拽态等）。章节切换时由 useScrollSpy
        统一切换光标的"基础形态"（齿轮 / 树叶 / 油漆 / 铅笔）。
   =========================================================================== */
function CustomCursor({ enabled }) {
  const dotRef  = useRef(null);             // 中心实心点 DOM 引用
  const ringRef = useRef(null);             // 外圈圆环 DOM 引用
  const target  = useRef({ x: 0, y: 0 });   // 鼠标实时坐标
  const ring    = useRef({ x: 0, y: 0 });   // 圆环平滑跟随坐标
  const rotRef  = useRef(0);                // 齿轮形态时的旋转角度

  useEffect(() => {
    // 关闭自定义光标时恢复系统默认箭头
    if (!enabled) {
      document.body.style.cursor = "auto";
      return;
    }
    document.body.style.cursor = "none";

    // 鼠标移动：实时更新中心点位置 + 记录目标坐标供圆环平滑跟随
    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      }
    };
    // 鼠标进入带 data-cursor 属性的元素：附加对应类名以改变形态
    const onOver = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) document.body.classList.add("cursor-" + t.getAttribute("data-cursor"));
    };
    // 鼠标离开：移除该形态类名
    const onOut = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) document.body.classList.remove("cursor-" + t.getAttribute("data-cursor"));
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // 用 requestAnimationFrame 让圆环以缓动方式追上鼠标，并让齿轮持续旋转
    let raf;
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      rotRef.current = (rotRef.current + 0.6) % 360;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`;
        document.documentElement.style.setProperty("--cursor-rot", rotRef.current + "deg");
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // 卸载时清理所有监听器与动画帧
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef}  className="cursor-dot"></div>
      <div ref={ringRef} className="cursor-ring"></div>
    </>
  );
}

/* ===========================================================================
   useReveal — 滚动入场动画
   作用：为带 .reveal / .reveal-stagger 类的元素，在进入视口时添加 .in 类
        触发 CSS 中预设的渐入 + 上移过渡。
   =========================================================================== */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ===========================================================================
   useScrollSpy — 当前激活章节探测
   策略：选取「视口中心点所处的章节」为激活章节。当章节比视口高时也能稳定判定。
        同时根据该章节的 data-cursor-style 属性切换光标基础形态。
   返回：当前激活章节的 id，例如 "rust" / "ghibli"
   =========================================================================== */
function useScrollSpy() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section.section"));
    let raf = null;

    const compute = () => {
      raf = null;
      const viewportMid = window.innerHeight / 2;     // 视口竖直中线
      let bestId = sections[0]?.id || "hero";
      let bestDist = Infinity;
      let bestCursor = null;

      // 找到「视口中线最接近哪个章节」
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        const top = r.top, bottom = r.bottom;
        let dist;
        if (top <= viewportMid && bottom >= viewportMid) {
          dist = 0;                                    // 中线在章节内 → 完美命中
        } else {
          dist = Math.min(Math.abs(top - viewportMid),
                          Math.abs(bottom - viewportMid));
        }
        if (dist < bestDist) {
          bestDist = dist;
          bestId = s.id;
          bestCursor = s.getAttribute("data-cursor-style");
        }
      }
      setActive(bestId);

      // 移除上一章节的光标形态类，再添加当前章节的
      document.body.classList.remove("cursor-cog", "cursor-leaf", "cursor-paint", "cursor-pencil");
      if (bestCursor && bestCursor !== "default") {
        document.body.classList.add("cursor-" + bestCursor);
      }
    };

    // 用 requestAnimationFrame 节流滚动事件，避免每个像素都重算
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return active;
}

/* ===========================================================================
   Nav — 顶部导航栏（固定定位 + difference 混合模式，自动黑白反色）
   =========================================================================== */
function Nav({ active }) {
  return (
    <nav className="nav">
      <div className="nav-logo" data-cursor="hover">Jiaqi Hu.</div>
      <div className="nav-links">
        {/* 首页不放在导航中 → slice(1) */}
        {SECTIONS.slice(1).map(s => (
          <a key={s.id}
             href={"#" + s.id}
             className={active === s.id ? "active" : ""}
             data-cursor="hover">
            {s.num} {s.en}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ===========================================================================
   ChapterIndicator — 左侧章节进度指示器（固定竖直位置）
   =========================================================================== */
function ChapterIndicator({ active }) {
  return (
    <div className="chapter-indicator">
      {SECTIONS.map(s => (
        <a key={s.id}
           href={"#" + s.id}
           className={"ci-dot " + (active === s.id ? "active" : "")}
           style={{ color: "inherit", textDecoration: "none" }}
           data-cursor="hover">
          {s.num} · {s.en}
        </a>
      ))}
    </div>
  );
}

/* ===========================================================================
   App — 主组件，把以上所有部件组合起来
   =========================================================================== */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);   // Tweaks 状态 + 持久化
  const active = useScrollSpy();                      // 当前激活章节
  useReveal();                                        // 激活滚动入场动画

  // 把 Tweaks 值同步到 CSS 变量 / DOM 属性，让样式随之响应
  useEffect(() => {
    document.documentElement.style.setProperty("--display-font", `"${t.displayFont}", "Caveat", cursive`);
    document.documentElement.style.setProperty("--rust-display", `"${t.rustFont}"`);
    document.documentElement.style.setProperty("--trans-ms", t.transitionSpeed + "ms");
    document.body.setAttribute("data-density", t.density);
  }, [t]);

  // 用 Tweaks 中的过渡速度动态生成一段 CSS（注入到 <style> 中）
  const dynamicCSS = `
    .section { transition: background-color ${t.transitionSpeed}ms cubic-bezier(.7,0,.3,1), color ${t.transitionSpeed}ms !important; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: dynamicCSS }}></style>

      <CustomCursor enabled={t.cursorEnabled} />
      {t.grainEnabled && <div className="grain"></div>}

      <Nav active={active} />

      {/* ============= 七个章节按顺序排列，全局滚动联动 ============= */}
      <main>
        <HeroSection />
        <AboutSection />
        <RustSection rustTitleImg={t.rustTitleImg} />
        <GhibliSection />
        <PainSection data={content.pain} />
        <DailySection />
        <ContactSection />
      </main>

      {/* ============= 右下角 Tweaks 调试面板 ============= */}
      <TweaksPanel>
        <TweakSection label="Type · 字体" />
        <TweakSelect label="Display 字体"
          value={t.displayFont}
          options={FONT_OPTIONS.map(f => ({ value: f.id, label: f.label }))}
          onChange={(v) => setTweak("displayFont", v)} />
        <TweakSelect label="锈城标题字体"
          value={t.rustFont}
          options={[
            { value: "Bungee Inline",       label: "Bungee Inline · 工业管道" },
            { value: "Faster One",          label: "Faster One · 赛博金属" },
            { value: "Wallpoet",            label: "Wallpoet · 切角铭牌" },
            { value: "Audiowide",           label: "Audiowide · 蒸汽朋克" },
            { value: "VT323",               label: "VT323 · 老式终端" },
            { value: "Black Ops One",       label: "Black Ops · 军事印刷" },
            { value: "Major Mono Display",  label: "Major Mono · 极简等宽" }
          ]}
          onChange={(v) => setTweak("rustFont", v)} />
        <TweakText label="锈城标题图 (URL)"
          value={t.rustTitleImg}
          placeholder="留空使用文字 / paste image URL"
          onChange={(v) => setTweak("rustTitleImg", v)} />

        <TweakSection label="Motion · 过渡" />
        <TweakSlider label="过渡速度"
          value={t.transitionSpeed}
          min={200} max={2000} step={100} unit="ms"
          onChange={(v) => setTweak("transitionSpeed", v)} />

        <TweakSection label="Layout · 排版" />
        <TweakRadio label="网格密度"
          value={t.density}
          options={[
            { value: "compact", label: "紧凑" },
            { value: "regular", label: "标准" },
            { value: "comfy",   label: "宽松" }
          ]}
          onChange={(v) => setTweak("density", v)} />

        <TweakSection label="Effects · 效果" />
        <TweakToggle label="自定义光标"
          value={t.cursorEnabled}
          onChange={(v) => setTweak("cursorEnabled", v)} />
        <TweakToggle label="噪点纹理"
          value={t.grainEnabled}
          onChange={(v) => setTweak("grainEnabled", v)} />
      </TweaksPanel>
    </>
  );
}

// 把 App 渲染到 index.html 中的 <div id="root"></div>
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
