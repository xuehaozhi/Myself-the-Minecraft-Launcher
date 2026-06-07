# MC 启动器

一个现代化的 Minecraft 启动器，提供游戏版本管理、Java 环境管理、游戏启动和性能监控功能。

## 功能特性

- 🎮 **游戏版本管理** - 下载、安装和管理 Minecraft 版本
- ☕ **Java 环境管理** - 自动下载、安装和配置 Java 运行环境
- 📊 **性能监控** - 实时监控游戏的 CPU、内存、GPU 和磁盘使用情况
- ⚙️ **游戏设置** - 配置内存分配、版本隔离、JVM 参数等

## 技术栈

- **前端**: React 18 + TypeScript + Tailwind CSS
- **构建工具**: Vite
- **状态管理**: Zustand
- **路由**: React Router DOM
- **图标**: Lucide React

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
.
├── src/
│   ├── components/     # React 组件
│   ├── pages/          # 页面组件
│   ├── store/          # 状态管理
│   ├── utils/          # 工具函数
│   ├── types.ts        # 类型定义
│   ├── App.tsx         # 主应用组件
│   ├── main.tsx        # 应用入口
│   └── index.css       # 全局样式
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript 配置
├── vite.config.ts      # Vite 配置
├── tailwind.config.js  # Tailwind CSS 配置
└── postcss.config.js   # PostCSS 配置
```

## 主要页面

1. **游戏版本** - 浏览、下载和启动 Minecraft 版本
2. **Java 管理** - 管理 Java 运行环境
3. **设置** - 配置游戏启动参数

## 注意事项

- 当前版本仅包含前端 UI，实际的下载、安装和启动功能需要结合 Electron 后端实现
- Java 下载链接已配置，需要确保网络可访问

## License

MIT
