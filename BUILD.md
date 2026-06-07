# M2TL 构建说明

## 准备工作

### 1. 安装依赖
```bash
npm install
```

## 开发模式

### 运行 Electron 开发模式
```bash
npm run dev:electron
```
这会启动 Vite 开发服务器和 Electron 窗口。

### 仅运行 Web 开发服务器
```bash
npm run dev
```

## 打包发布

### 1. 生成未打包的目录（用于测试）
```bash
npm run pack
```
输出到 `release/` 目录下对应平台的文件夹（如 `win-unpacked`）

### 2. 完整打包（生成安装程序）

#### Windows 平台
```bash
npm run dist:win
```
生成 `.exe` 安装程序和便携版

#### macOS 平台
```bash
npm run dist:mac
```
生成 `.dmg` 磁盘映像

#### Linux 平台
```bash
npm run dist:linux
```
生成 `.AppImage` 和 `.deb` 包

### 3. 自动检测平台打包
```bash
npm run dist
```

## 添加应用图标

把你的图标文件放到 `build/` 目录下：
- Windows: `build/icon.ico` (256x256)
- macOS: `build/icon.icns` 
- Linux: `build/icon.png` (512x512)

如果没有图标，electron-builder 会使用默认图标。

## 输出位置

所有打包文件会输出到 `release/` 目录。

## 目录结构

```
m2tl/
├─ electron/           # Electron 主进程代码
│  ├─ main.ts         # 主进程入口
│  └─ preload.ts      # 预加载脚本
├─ src/               # React 前端代码
├─ dist/              # 构建后的前端代码
├─ dist-electron/     # 构建后的 Electron 代码
└─ release/           # 打包输出目录
```

## 注意事项

1. 首次打包会下载 Electron 二进制文件，需要网络连接
2. Windows 下打包需要安装 NSIS（electron-builder 会自动处理）
3. 代码签名需要额外配置（可选）
4. 打包前确保运行过 `npm run build` 成功构建代码

