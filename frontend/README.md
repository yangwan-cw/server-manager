# Frontend - Server Manager

## 快速开始 (Quick Start)

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

访问 http://localhost:5173

### 构建生产版本
```bash
pnpm build
```

### 预览生产构建
```bash
pnpm preview
```

## 环境变量配置

创建 `.env` 文件（参考 `.env.example`）：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 项目特点

- ✅ 使用 Vite 7 作为构建工具，开发体验极佳
- ✅ React 19 + TypeScript 5，类型安全
- ✅ Tailwind CSS 4，快速构建美观界面
- ✅ Axios 配置完善，支持拦截器
- ✅ 响应式设计，支持移动端
- ✅ 卡片式布局，信息展示清晰
- ✅ 状态颜色区分，一目了然
- ✅ 模拟数据支持，方便开发测试

## 目录结构

```
src/
├── api/              # API 相关
│   ├── axios.ts      # Axios 实例配置
│   └── serverApi.ts  # 服务器 API 接口
├── components/       # 组件
│   └── ServerList.tsx # 服务器列表组件
├── types/           # 类型定义
│   └── server.ts    # 服务器类型
├── App.tsx          # 根组件
├── main.tsx         # 入口文件
└── style.css        # 全局样式
```

## 技术细节

### TypeScript 配置

项目使用严格的 TypeScript 配置，确保类型安全。

### Tailwind CSS

使用 Tailwind CSS 的 utility-first 方式编写样式，配置文件：
- `tailwind.config.js` - Tailwind 配置
- `postcss.config.js` - PostCSS 配置

### API 集成

API 客户端使用 Axios，配置了：
- 基础 URL（从环境变量读取）
- 超时时间（10秒）
- 响应拦截器（错误处理）

### 组件设计

`ServerList` 组件特点：
- 自动获取服务器列表
- 加载状态显示
- 错误处理（显示警告并使用模拟数据）
- 响应式网格布局
- 状态颜色标识
- 跳转功能

## 开发建议

1. **API 开发**：先使用模拟数据开发前端，后端 API 准备好后再集成
2. **样式调整**：使用 Tailwind 的 utility classes，避免写自定义 CSS
3. **类型安全**：充分利用 TypeScript，为所有数据定义类型
4. **组件拆分**：如果组件变大，考虑拆分成更小的子组件
5. **状态管理**：目前使用 React Hooks，如需要可以引入 Zustand 或 Redux

## 常见问题

### Q: 如何修改端口？
A: 在 `vite.config.ts` 中修改 `server.port`

### Q: 如何添加新的 API 接口？
A: 在 `src/api/serverApi.ts` 中添加新的方法

### Q: 如何自定义主题颜色？
A: 在 `tailwind.config.js` 的 `theme.extend.colors` 中添加

### Q: 为什么看不到真实数据？
A: 检查：
1. `.env` 文件中的 API 地址是否正确
2. 后端服务是否启动
3. 浏览器控制台是否有错误信息
