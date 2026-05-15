/* ===========================================================================
   content.js — 作品集内容数据中心
   ---------------------------------------------------------------------------
   ★ 本文件是你日常更新作品集时的 ★
   ★ 唯一需要修改的地方            ★
   ---------------------------------------------------------------------------
   修改方式：
     1. 把图片放到 images/ 文件夹（推荐按章节分子文件夹）
     2. 把视频放到 videos/ 文件夹
     3. 在下面对应章节的 works 数组里，给每项填 src 路径
        没有真实素材时留空字符串 ""，会自动显示占位条纹图
     4. 保存即可，无需改其他文件

   src 路径写法：
     · 相对路径：  "images/rust/cogwell.jpg"
     · 绝对 URL： "https://example.com/your-image.jpg"

   isVideo: true  → 把 src 当做 .mp4/.webm 视频文件，hover 自动循环播放
   ---------------------------------------------------------------------------
   每个作品对象的字段：
     src        : 图片 / 视频路径，留空 "" 显示占位
     title      : 卡片下方主标题
     tag        : 卡片右下角小标签
     ratio      : 宽高比，如 "16/10" / "3/4" / "21/9"
     label      : src 留空时占位图上显示的文字
     hoverLabel : 鼠标悬停蒙层文字（默认 "PREVIEW"）
     className  : 网格定位类（不要改，配合 CSS 控制大小）
     isVideo    : 视频文件填 true，否则不填
   =========================================================================== */

const CONTENT = {

  /* ========================================================================
     个人信息 / About 章节
     ======================================================================== */
  about: {
    portrait: "",                          // 肖像图：例如 "images/portrait.jpg"
    name_zh: "胡佳琪",
    name_en: "Jiaqi Hu",
    location: "BEIJING · CN",
    coords: "39.90°N / 116.41°E",
    bio_lead: "我画会呼吸的画面，让静止的东西开始发声。",
    bio_p1: "我是胡佳琪，一名以动画为母语的视觉作者。我的作品在锈迹斑斑的机械世界与湿润的森林精灵之间往返，常常以一帧帧手绘去寻找 — 那种「东西活过来的瞬间」。",
    bio_p2: "目前研究方向集中在二维角色动画、视觉前期开发与短片导演。我喜欢拼贴、Risograph 印刷、老相机的颗粒，以及任何会咯吱作响的东西。",
    stats: [
      { num: "3",    lbl_zh: "主题项目", lbl_en: "THEMED PROJECTS" },
      { num: "10+",  lbl_zh: "日常练习", lbl_en: "DAILY SKETCHES" },
      { num: "2023", lbl_zh: "起始年份", lbl_en: "SINCE" }
    ]
  },

  /* ========================================================================
     03 · 锈城 RUST CITY — 机械迷城风格
     ======================================================================== */
  rust: {
    titleImg: "",
    tagline: "「在永不停歇的齿轮深处，一只小小的螺丝学会了做梦。」",
    meta: ["2024 — COMPLETED", "CHARACTER · ENVIRONMENT", "8 DELIVERABLES"],
    works: [
      { className: "rust-feature", src: "images/rust/封面.jpg",          title: "封面主题", tag: "KEY VISUAL",          ratio: "16/9" },
      { className: "rust-tile-a",  src: "images/rust/场景1.jpg",         title: "场景一",   tag: "ENVIRONMENT · 01",   ratio: "16/9" },
      { className: "rust-tile-b",  src: "images/rust/场景2.jpg",         title: "场景二",   tag: "ENVIRONMENT · 02",   ratio: "3/5",  portrait: true  },
      { className: "rust-tile-c",  src: "images/rust/阿瑶.jpg",          title: "阿瑶",     tag: "CHARACTER · 01",    ratio: "16/9" },
      { className: "rust-tile-d",  src: "images/rust/阿保和贵叔.jpg",    title: "阿保和贵叔", tag: "CHARACTER · 02",   ratio: "16/9" },
      { className: "rust-tile-e",  src: "images/rust/蒸汽售像员.jpg",    title: "蒸汽售像员", tag: "CHARACTER · 03",  ratio: "16/9" },
    ]
  },

  /* ========================================================================
     04 · 守夜人 GHIBLI — 吉卜力风格
     ======================================================================== */
  ghibli: {
    tagline: "「山神在云雾里点亮一盏灯，等迷路的孩子回家。」",
    meta: ["2024 — COMPLETED", "CHARACTER · BACKGROUND", "3 DELIVERABLES"],
    works: [
      { className: "ghibli-feature", src: "images/ghibli/封面主题.jpg", title: "封面主题", tag: "KEY VISUAL", ratio: "16/9", label: "COVER ART" },
      { className: "ghibli-side",    src: "images/ghibli/妖怪线稿.png", title: "妖怪线稿", tag: "CHAR LINEUP", ratio: "16/9", label: "CHARACTER LINEUP" },
      { className: "ghibli-side",    src: "images/ghibli/星野.jpg",     title: "星野",      tag: "ENV · 02",   ratio: "16/9", label: "STAR FIELD · ENVIRONMENT" }
    ]
  },

  /* ========================================================================
     05 · 疼痛传感器 PAIN — 二维短片
     ======================================================================== */
  pain: {
    tagline: "世间悲喜，各不相通——但有没有一种痛，能让两颗心彼此相连？",
    meta: ["2023 · 03:24 SHORT", "DIRECTED · ANIMATED · WRITTEN", "OFFICIAL SELECTION (PENDING)"],

    // 创意来源
    inspiration: {
      quote: "世间最痛，莫过于离别。",
      story: [
        "一位不通情感的民间发明家，执着于用机械量化人类的一切——包括痛苦。他外表冷峻，内心却渴望理解他人的情感世界。正是这种渴望驱使他去研发「疼痛传感器」，而最终的目标是造出「情绪传感器」，让每一个感受不到情感的人，都能学会与他人共情。",
        "他在天桥上救下了一位企图轻生的路人，并邀请他成为助手。在朝夕相处中，两人的羁绊日益加深。然而当机器终于完成之际，助手却意外离世。那一刻，发明家终于明白——<strong>世间最痛，莫过于离别。</strong>"
      ]
    },

    // 视觉概念图片（2张）
    concept: [
      { src: "images/pain/concept/封面1.png", label: "KEY VISUAL · 主视觉" },
      { src: "images/pain/concept/封面2.jpg", label: "STORY KEY ART · 故事主视觉" },
    ],

    // 场景设计（16张）
    environment: [
      { src: "images/pain/environment/实验装置1.jpg",  title: "实验装置",         tag: "ENV · 01" },
      { src: "images/pain/environment/实验装置2.jpg",  title: "实验装置",         tag: "ENV · 02" },
      { src: "images/pain/environment/实验装置3.jpg",  title: "实验装置",         tag: "ENV · 03" },
      { src: "images/pain/environment/实验装置5.jpg",  title: "实验装置",         tag: "ENV · 04" },
      { src: "images/pain/environment/房间角度1.jpg",  title: "发明家房间",       tag: "ENV · 05" },
      { src: "images/pain/environment/房间角度2.jpg",  title: "发明家房间",       tag: "ENV · 06" },
      { src: "images/pain/environment/房间角度3.jpg",  title: "发明家房间",       tag: "ENV · 07" },
      { src: "images/pain/environment/房间角度4.jpg",  title: "发明家房间",       tag: "ENV · 08" },
      { src: "images/pain/environment/房间角度5.jpg",  title: "发明家房间",       tag: "ENV · 09" },
      { src: "images/pain/environment/窗外1.jpg",      title: "窗外",             tag: "ENV · 10" },
      { src: "images/pain/environment/客厅1.jpg",      title: "客厅",             tag: "ENV · 11" },
      { src: "images/pain/environment/家门口.jpg",     title: "家门口",           tag: "ENV · 12" },
      { src: "images/pain/environment/门洞.jpg",       title: "门洞",             tag: "ENV · 13" },
      { src: "images/pain/environment/天桥1.jpg",     title: "天桥",             tag: "ENV · 14" },
      { src: "images/pain/environment/住宅远景.jpg",   title: "住宅远景",         tag: "ENV · 15" },
      { src: "images/pain/environment/小区白天.jpg",   title: "小区 · 白天",     tag: "ENV · 16" },
      { src: "images/pain/environment/小区晚上.jpg",   title: "小区 · 晚上",     tag: "ENV · 17" },
      { src: "images/pain/environment/车中.jpg",       title: "车中",             tag: "ENV · 18" },
    ],

    // 人物设计（2组，每组2张）
    characters: [
      {
        name: "发明家",
        role: "SCIENTIST / 主角",
        imgs: [
          { src: "images/pain/characters/发明家整体.png", label: "整体外观 · TURNS" },
          { src: "images/pain/characters/发明家细节.png", label: "细节拆解 · BREAKDOWN" },
        ],
        bio: "一位不通情感的民间发明家，执着于用机械量化人类的一切——包括痛苦。他外表冷峻，内心却渴望理解他人的情感世界。正是这种渴望驱使他去研发「疼痛传感器」，而最终的目标是造出「情绪传感器」，让每一个感受不到情感的人，都能学会与他人共情。"
      },
      {
        name: "助理",
        role: "ASSISTANT / 核心角色",
        imgs: [
          { src: "images/pain/characters/助手整体.png", label: "整体外观 · TURNS" },
          { src: "images/pain/characters/助手细节.png", label: "细节拆解 · BREAKDOWN" },
        ],
        bio: "一位曾企图轻生的路人，被发明家意外救下。他成为了研发「疼痛传感器」的助手，在朝夕相处中渐渐打开心门。他代表着最真实的疼痛——不是机器可以量化的数字，而是生命的重量与情感的羁绊。机器完成之际，他的意外离世，让发明家真正理解了什么是最高等级的痛——离别。"
      }
    ],

    // 动态分镜（7个GIF，按故事顺序 07-03-01-02-04-06-05）
    animatic: [
      { src: "images/pain/animatic/电梯开.GIF",             label: "ANIMATIC · 01 · 电梯" },
      { src: "images/pain/animatic/助手天台吹风.GIF",       label: "ANIMATIC · 02 · 天台" },
      { src: "images/pain/animatic/发明家路过天台.GIF",    label: "ANIMATIC · 03 · 偶遇" },
      { src: "images/pain/animatic/发明家跑出天台.GIF",   label: "ANIMATIC · 04 · 奔赴" },
      { src: "images/pain/animatic/两个角色进门.GIF",     label: "ANIMATIC · 05 · 进门" },
      { src: "images/pain/animatic/角色日常.GIF",           label: "ANIMATIC · 06 · 日常" },
      { src: "images/pain/animatic/指针跳动.GIF",           label: "ANIMATIC · 07 · 突破" },
    ],

    // 成片
    finalFilm: {
      videoSrc:    "images/pain/vedios/疼痛传感器成片.MP4",
      poster:      "images/pain/vedios/cover.png",     // 视频首帧封面
      coverImage: "images/pain/vedios/poster.jpg",    // 右侧信息卡海报
      synopsis: "一位不懂共情的民间发明家，无意间拦下了一位企图轻生的路人，并邀请他成为自己研发「疼痛传感器」的助手。在朝夕相处中，发明家向他袒露了自己的终极目标——造出「情绪传感器」，帮助那些感受不到情感的人，学会与他人共情。两人的羁绊日益加深，然而当机器终于完成之际，助手却意外离世。那一刻，发明家终于明白——世间最痛，莫过于离别。"
    }
  },

  /* ========================================================================
     06 · 日常练习 DAILY — 自由拖拽画布
     想加更多卡片：往 sketches 数组里复制粘贴一项即可
     ======================================================================== */
  daily: {
    tagline: "「每天画一点点，是养一只动物的方式。」",
    meta: ["ONGOING · DAILY", "DRAG TO REARRANGE · 拖拽探索", "REFRESHED WEEKLY"],
    sketches: [
      { id: 1, x:  60, y:  80, w: 150, h: 200, r: -4, cap: "GESTURE · 03/12",   src: "" },
      { id: 2, x: 240, y:  50, w: 180, h: 180, r:  3, cap: "INK STUDY · 04/02", src: "" },
      { id: 3, x: 460, y: 110, w: 200, h: 240, r: -2, cap: "COLOR · 04/15",     src: "" },
      { id: 4, x: 700, y:  60, w: 170, h: 220, r:  5, cap: "CHAR DESIGN · 05/01", src: "" },
      { id: 5, x: 920, y: 130, w: 160, h: 180, r: -3, cap: "ANIMAL · 05/12",    src: "" },
      { id: 6, x: 100, y: 340, w: 200, h: 160, r:  2, cap: "ENV THUMB · 05/20", src: "" },
      { id: 7, x: 360, y: 360, w: 220, h: 200, r: -5, cap: "MOOD STUDY · 06/03", src: "" },
      { id: 8, x: 640, y: 380, w: 170, h: 200, r:  4, cap: "HANDS · 06/14",     src: "" },
      { id: 9, x: 880, y: 380, w: 200, h: 170, r: -2, cap: "MACHINE · 06/22",   src: "" }
    ]
  },

  /* ========================================================================
     07 · CONTACT — 联系方式
     ======================================================================== */
  contact: {
    cta_lines: ["一起", "做点", "<em>会动的</em>", "东西吧。"],
    channels: [
      { label: "EMAIL · 邮箱",          value: "guyue2439004174@163.com", href: "mailto:guyue2439004174@163.com",                                     arrow: "→" },
      { label: "GITHUB · 代码",         value: "github.com/Bilebileprines", href: "https://github.com/Bilebileprines?tab=repositories",                arrow: "↗" },
      { label: "XIAOHONGSHU · 小红书",  value: "四喜丸子",                  href: null,                                                                 arrow: "" }
    ],
    copyright: "© 2026 JIAQI HU — 胡佳琪"
  }

};

// 暴露到全局，让 sections.jsx 和 app.jsx 能直接读 window.CONTENT / window.content
window.CONTENT = CONTENT;
window.content = CONTENT;
