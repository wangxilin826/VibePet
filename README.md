# VibePet 生产力助手 — Vercel 部署版

桌面宠物 + 待办清单 + 每日复盘，随时随地可用 🐾

---
## 产品demo展示

Netlify（国内可用）：https://69e4bb02cfc8b923c8a1c8f4--kaleidoscopic-kleicha-caa000.netlify.app

Vercel（搭载🪜可用）：https://vibe-pet-eosin.vercel.app

注：以上链接需要使用google浏览器打开

---

## 一键部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/your-username/vibepet-vercel)

> 如果上面按钮无效，直接在 [vercel.com/new](https://vercel.com/new) 导入这个项目

---

## 本地运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

---

## 部署步骤（Vercel）

1. 将整个 `vibepet-vercel` 文件夹上传到你的 GitHub 仓库
2. 登录 [vercel.com](https://vercel.com)，点击 **Add New → Project**
3. 选择 **Import Git Repository**，找到你的仓库，点击 **Import**
4. Vercel 会自动检测到 `vercel.json`，直接点击 **Deploy**
5. 等待 1~2 分钟，获得在线链接 ✅

> 无需配置任何环境变量，开箱即用

---

## 功能说明

| 功能 | 说明 |
|------|------|
| 🐾 桌面宠物 | 可拖拽移动的小狗（Snoopy 风格） |
| ✅ 待办清单 | 任务 / 笔记双模式，支持置顶 |
| 🕐 时间提醒 | 可为任务设定执行时间 |
| 🎉 完成任务 | 宠物开心动画 + 金币音效 |
| 📋 下班打卡 | 一键生成每日复盘文本 |
| 📱 响应式 | 移动端 / 桌面端自适应 |

> **注意**：此版本为 Web 版，右键菜单中的「退出」功能仅在 Electron 桌面端有效。

---

## 与原版的区别

- ✅ 移除了 Electron 桌面端代码（`electron/` 文件夹）
- ✅ 使用本地 Tailwind CSS（不再依赖 CDN）
- ✅ 适配 Vercel 静态部署
- ✅ 数据存储在浏览器 localStorage（本版本无后端）
# VibePet
