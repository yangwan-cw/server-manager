# Server Manager

A modern web application for managing and monitoring server infrastructure, built with Vite, React, TypeScript, and Tailwind CSS.

## 技术栈 (Tech Stack)

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios 1.13
- **Package Manager**: pnpm 10

## 功能特性 (Features)

- 📊 服务器列表展示 (Server list display)
- 🎨 美观的响应式UI设计 (Beautiful responsive UI design)
- 🔄 实时状态监控 (Real-time status monitoring)
- 🚀 快速跳转到服务器 (Quick jump to server)
- 📱 移动端适配 (Mobile responsive)
- 🎯 卡片式布局 (Card-based layout)
- 🧭 导航栏 (Navigation bar with logo and name)
- 📋 版本信息展示 (Version info modal with git information)
- 🏷️ 自动版本管理 (Automatic version management from git tags)

## 项目结构 (Project Structure)

```
server-manager/
├── .devcontainer/          # Dev container configuration
│   ├── Dockerfile          # Docker image with Node.js 20 and pnpm
│   └── devcontainer.json   # Dev container settings
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── api/           # API client configuration
│   │   │   ├── axios.ts   # Axios instance setup
│   │   │   └── serverApi.ts # Server API endpoints
│   │   ├── components/    # React components
│   │   │   └── ServerList.tsx # Main server list component
│   │   ├── types/         # TypeScript type definitions
│   │   │   └── server.ts  # Server interface
│   │   ├── App.tsx        # Root component
│   │   ├── main.tsx       # Application entry point
│   │   └── style.css      # Global styles (Tailwind)
│   ├── .env.example       # Environment variables template
│   ├── .env               # Environment variables (gitignored)
│   ├── index.html         # HTML entry point
│   ├── package.json       # Dependencies and scripts
│   ├── postcss.config.js  # PostCSS configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── tsconfig.json      # TypeScript configuration
│   └── vite.config.ts     # Vite configuration
└── README.md              # This file
```

## 安装步骤 (Installation Steps)

### 1. 环境要求 (Prerequisites)

- Node.js 20.x
- pnpm 10.x

### 2. 克隆项目 (Clone Repository)

```bash
git clone https://github.com/yangwan-cw/server-manager.git
cd server-manager
```

### 3. 安装依赖 (Install Dependencies)

```bash
cd frontend
pnpm install
```

### 4. 配置环境变量 (Configure Environment Variables)

复制 `.env.example` 到 `.env` 并根据需要修改：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:3000/api
```

### 5. 启动开发服务器 (Start Development Server)

```bash
pnpm dev
```

应用将在 `http://localhost:5173` 启动

**注意**: 启动时会自动生成版本信息文件 `.env.version`，包含 git hash、提交时间、提交人和版本号（从 git tag 读取）

### 6. 构建生产版本 (Build for Production)

```bash
pnpm build
```

构建产物将输出到 `dist/` 目录

**注意**: 构建时也会自动生成版本信息，确保生产环境中显示正确的版本

### 7. 预览生产构建 (Preview Production Build)

```bash
pnpm preview
```

## 数据字段说明 (Data Fields)

服务器列表包含以下字段：

| 字段 (Field) | 类型 (Type) | 说明 (Description) |
|-------------|------------|-------------------|
| id | string | 服务器唯一标识 (Unique identifier) |
| customer | string | 客户名称 (Customer name) |
| imageName | string | 镜像名称 (Image name) |
| version | string | 版本号 (Version) |
| serverAddress | string | 服务器地址 (Server address) |
| responsible | string | 负责人 (Responsible person) |
| status | string | 机器状态 (Machine status): running, stopped, error, unknown |

## API 集成 (API Integration)

### 配置 API 客户端 (Configure API Client)

API 客户端已在 `src/api/axios.ts` 中配置，使用环境变量 `VITE_API_BASE_URL`。

### API 端点 (API Endpoints)

应用期望以下 API 端点：

1. **获取服务器列表 (Get Server List)**
   ```
   GET /api/servers
   Response: Server[]
   ```

2. **获取单个服务器 (Get Single Server)**
   ```
   GET /api/servers/:id
   Response: Server
   ```

3. **获取服务器状态 (Get Server Status)**
   ```
   GET /api/servers/:id/status
   Response: { status: string }
   ```

### 示例响应 (Example Response)

```json
[
  {
    "id": "1",
    "customer": "Acme Corp",
    "imageName": "nginx",
    "version": "1.21.0",
    "serverAddress": "192.168.1.100",
    "responsible": "John Doe",
    "status": "running"
  }
]
```

## 开发说明 (Development Notes)

### 模拟数据 (Mock Data)

当 API 不可用时，应用会自动使用模拟数据进行展示，方便开发和测试。

### 状态颜色 (Status Colors)

- 🟢 **running**: 绿色 (Green)
- ⚫ **stopped**: 灰色 (Gray)
- 🔴 **error**: 红色 (Red)
- 🟡 **unknown**: 黄色 (Yellow)

### 操作功能 (Operations)

- **跳转 (Jump)**: 点击 "Jump to Server" 按钮会在新标签页打开服务器地址

## 样式定制 (Style Customization)

项目使用 Tailwind CSS，可以在 `tailwind.config.js` 中自定义主题：

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // 添加自定义颜色
      },
    },
  },
}
```

## 版本管理 (Version Management)

### Git Tag 版本号 (Git Tag Versioning)

项目使用 git tag 管理版本号。创建新版本：

```bash
# 创建新的版本标签
git tag v1.0.0

# 推送标签到远程仓库
git push origin v1.0.0
```

版本信息会在构建时自动提取并注入到应用中，可以通过导航栏的 "Version Info" 按钮查看。

### 版本信息包含 (Version Info Includes)

- **Git Hash**: 前 8 位提交哈希值
- **Commit Date**: 提交时间
- **Commit Author**: 提交人
- **Version**: 最新的 git tag（如果没有 tag 则显示 "dev"）

## 浏览器支持 (Browser Support)

- Chrome (最新版 / latest)
- Firefox (最新版 / latest)
- Safari (最新版 / latest)
- Edge (最新版 / latest)

## 故障排除 (Troubleshooting)

### 端口被占用 (Port Already in Use)

如果 5173 端口被占用，可以在 `vite.config.ts` 中修改端口：

```typescript
export default defineConfig({
  server: {
    port: 3000, // 修改为其他端口
  },
})
```

### API 连接失败 (API Connection Failed)

1. 检查 `.env` 文件中的 `VITE_API_BASE_URL` 配置
2. 确保后端服务正在运行
3. 检查浏览器控制台的错误信息

### 样式未生效 (Styles Not Working)

1. 确保 Tailwind CSS 已正确安装
2. 检查 `postcss.config.js` 配置
3. 清除缓存并重启开发服务器：
   ```bash
   rm -rf node_modules/.vite
   pnpm dev
   ```

## 贡献指南 (Contributing)

欢迎提交 Issue 和 Pull Request！

## 许可证 (License)

MIT License

## 联系方式 (Contact)

如有问题，请通过 GitHub Issues 联系。
