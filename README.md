# GPT 聊天记录管理工具

基于 Electron + React 的 GPT 聊天记录分类管理应用（Windows 端 Demo）

## 功能特性

- 🔐 **动态登录** - 支持 ChatGPT.com 动态登录
- 📋 **聊天记录获取** - 自动获取 ChatGPT 历史聊天记录
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
│   ├── main.ts       # 主进程入口（包含 ChatGPT 登录和记录获取逻辑）
│   └── preload.ts    # 预加载脚本（IPC 通信桥接）
├── src/              # React 前端代码
│   ├── components/   # React 组件
│   ├── data/         # 模拟数据
│   ├── services/     # 服务层（ChatGPT API 调用）
│   ├── styles/       # 样式文件
│   ├── types/        # TypeScript 类型定义
│   ├── App.tsx       # 主应用组件
│   └── main.tsx      # React 入口
├── index.html        # HTML 模板
└── package.json      # 项目配置
```

## 核心实现

### 1. 动态登录功能

- 使用 Electron BrowserWindow 创建独立的登录窗口
- 配置 `partition: 'persist:chatgpt'` 实现会话持久化
- 支持多种 ChatGPT 域名登录检测
- 自动检测登录成功状态

### 2. 聊天记录获取

- 实现 IPC 通信机制 `chatgpt:get-chat-records`
- 支持从已登录会话中获取历史聊天记录
- 针对特定聊天记录标题进行精准获取
- 包含错误处理和重试机制

### 3. IPC 通信

| 通道名称 | 方向 | 功能描述 |
|---------|------|----------|
| `chatgpt:login` | Renderer → Main | 触发登录流程 |
| `chatgpt:login-success` | Main → Renderer | 登录成功通知 |
| `chatgpt:get-chat-records` | Renderer → Main | 获取聊天记录 |

## 当前进度

### ✅ 已完成

1. **登录功能** - 实现了完整的 ChatGPT 动态登录流程
2. **会话管理** - 配置了持久化会话存储
3. **聊天记录获取** - 实现了从 ChatGPT 页面获取历史记录的功能
4. **IPC 通信** - 建立了主进程和渲染进程的通信机制
5. **目标记录获取** - 实现了针对特定标题 "wsl 比起虚拟机优劣" 的聊天记录获取

### 📋 待优化

1. 完善聊天记录解析逻辑，支持更多聊天场景
2. 优化登录检测机制，提高可靠性
3. 添加错误处理和用户提示
4. 实现完整的聊天记录列表展示

## 界面预览

应用采用三栏布局：
- **左侧**：分类目录树（支持多级目录）
- **中间**：聊天记录列表
- **右侧**：聊天详情展示

## 后续开发建议

1. 数据持久化（SQLite 或本地文件存储）
2. 完善聊天记录解析和格式化
3. 搜索功能增强
4. 导出功能实现
5. 移动端适配（React Native）

