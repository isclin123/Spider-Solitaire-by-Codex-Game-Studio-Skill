# Spider Solitaire

<p align="center">
  <a href="#english-version"><kbd>English</kbd></a>
  &nbsp;&nbsp;
  <a href="#chinese-version"><kbd>中文</kbd></a>
</p>

<p align="center">
  Built with <a href="https://github.com/isclin123/codex-game-studio-skill"><strong>Codex Game Studio Skill</strong></a>
  ·
  <a href="https://spider-solitaire-isclin.pages.dev/">Live Demo</a>
</p>

---

<a id="english-version"></a>

## English

A mobile-friendly Spider Solitaire web game built with [Codex Game Studio Skill](https://github.com/isclin123/codex-game-studio-skill). It includes animated card movement, touch controls, save/continue support, tutorial slides, background music, sound effects, and 1-suit / 2-suit / 4-suit difficulty modes.

### Live Demo

https://spider-solitaire-isclin.pages.dev/

### Built With

This project was created and polished through iterative work with [Codex Game Studio Skill](https://github.com/isclin123/codex-game-studio-skill). The skill was used to guide gameplay rules, mobile UI, drag behavior, animations, audio, tutorial flow, settings, static deployment, and GitHub publishing.

### Features

- Touch-friendly 10-column Spider Solitaire layout for mobile browsers
- Full-screen start menu, tutorial, settings, and difficulty selection
- Animated dragging, dealing, completed-run collection, and victory sequence
- Real-feel dealing sound effects and button feedback sounds
- Background music with ducking when sound effects play
- Save and continue current game using `localStorage`
- Tutorial carousel with animated examples
- Chinese and English language setting

### Files

- `index.html` - main page
- `app.js` - game logic, UI flow, audio, tutorial, and save system
- `styles.css` - responsive desktop/mobile styling
- `manifest.webmanifest` - PWA metadata
- `assets/` - icon, background music, and sound effects

### Copyright And Usage

Copyright (c) 2026 Sicheng Yi (isclin123). All rights reserved.

This project is publicly viewable for portfolio, demonstration, and personal showcase purposes only. No permission is granted to copy, modify, distribute, sublicense, sell, host, publish, repackage, or use this project, its source code, visual design, audio assets, gameplay implementation, documentation, or related materials without prior written permission.

This is not an open-source project. See [LICENSE](LICENSE) for details.

### Run Locally

Open `index.html` directly in a browser, or serve this folder with any static server:

```powershell
python -m http.server 4173
```

Then open:

http://127.0.0.1:4173/

<p align="right"><a href="#spider-solitaire">Back to language buttons</a></p>

---

<a id="chinese-version"></a>

## 中文

这是一个移动端友好的蜘蛛纸牌网页游戏，使用 [Codex Game Studio Skill](https://github.com/isclin123/codex-game-studio-skill) 完成。它支持触控拖拽、动画发牌、自动收牌、继续游戏、教程轮播、背景音乐、音效，以及 1 花色 / 2 花色 / 4 花色三种难度。

### 在线试玩

https://spider-solitaire-isclin.pages.dev/

### 制作方式

这个项目是通过 [Codex Game Studio Skill](https://github.com/isclin123/codex-game-studio-skill) 逐步完成和打磨的：从蜘蛛纸牌规则、手机端 UI、拖拽交互、动画、音效、教程、设置，到静态部署和 GitHub 发布，都经过了多轮迭代。

### 功能特点

- 适配手机浏览器的 10 列蜘蛛纸牌布局
- 全屏开始界面、教程、设置和难度选择
- 拖牌、补牌、收整副牌、胜利结算都有动画
- 接近真实发牌的音效，以及按钮反馈音效
- 背景音乐支持音效触发时自动压低音量
- 使用 `localStorage` 保存当前牌局，可继续游戏
- 教程使用动画示例轮播展示玩法
- 支持中文和英文界面

### 文件说明

- `index.html` - 主页面
- `app.js` - 游戏逻辑、界面流程、音频、教程和存档系统
- `styles.css` - 桌面端和移动端响应式样式
- `manifest.webmanifest` - PWA 元数据
- `assets/` - 图标、背景音乐和音效

### 版权与使用限制

Copyright (c) 2026 Sicheng Yi (isclin123). All rights reserved.

本项目仅用于作品集展示、演示和个人展示目的。未经版权所有者事先书面许可，任何人不得复制、修改、分发、再授权、出售、托管、发布、重新打包，或以商业/非商业方式使用本项目、源代码、视觉设计、音频素材、玩法实现、文档或相关材料。

本项目不是开源项目。详细条款见 [LICENSE](LICENSE)。

### 本地运行

可以直接用浏览器打开 `index.html`，也可以在当前文件夹启动一个静态服务器：

```powershell
python -m http.server 4173
```

然后打开：

http://127.0.0.1:4173/

<p align="right"><a href="#spider-solitaire">返回语言按钮</a></p>