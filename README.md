# GPT 聊天记录管理工具

基于 Electron + React 的 GPT 聊天记录分类管理应用（Windows 端 Demo）

## 功能特性

- 📁 多级目录分类管理
- 💬 聊天记录查看和历史浏览
- 🎨 现代化的用户界面
- 🔍 按分类筛选聊天记录

## 技术栈

- **Electron** - 桌面应用框架
- **React** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Lucide React** - 图标库

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run electron:dev
```

这将同时启动 Vite 开发服务器和 Electron 应用。

### 构建应用

```bash
npm run electron:build
```

## 项目结构

```
.
├── electron/          # Electron 主进程代码
│   ├── main.ts       # 主进程入口
│   └── preload.ts    # 预加载脚本
├── src/              # React 前端代码
│   ├── components/   # React 组件
│   ├── data/         # 模拟数据
│   ├── styles/       # 样式文件
│   ├── types/        # TypeScript 类型定义
│   ├── App.tsx       # 主应用组件
│   └── main.tsx      # React 入口
├── index.html        # HTML 模板
└── package.json      # 项目配置
```

## 界面预览

应用采用三栏布局：
- **左侧**：分类目录树（支持多级目录）
- **中间**：聊天记录列表
- **右侧**：聊天详情展示

## 后续开发建议

1. 数据持久化（SQLite 或本地文件存储）
2. 导入 GPT 聊天记录功能
3. 搜索功能
4. 导出功能
5. 移动端适配（React Native）

