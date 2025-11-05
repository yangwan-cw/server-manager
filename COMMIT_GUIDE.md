# Git 提交指南 (Git Commit Guide)

## 需要提交的文件 (Files to Commit)

### 根目录 (Root Directory)
- ✅ `.gitignore` - Git 忽略规则
- ✅ `README.md` - 项目文档
- ✅ `COMMIT_GUIDE.md` - 本文件

### Dev Container 配置 (Dev Container Configuration)
- ✅ `.devcontainer/Dockerfile` - Docker 镜像配置
- ✅ `.devcontainer/devcontainer.json` - Dev Container 配置

### 前端项目 (Frontend Project)
- ✅ `frontend/package.json` - 依赖配置
- ✅ `frontend/pnpm-lock.yaml` - 依赖锁定文件
- ✅ `frontend/tsconfig.json` - TypeScript 配置
- ✅ `frontend/vite.config.ts` - Vite 配置
- ✅ `frontend/tailwind.config.js` - Tailwind CSS 配置
- ✅ `frontend/postcss.config.js` - PostCSS 配置
- ✅ `frontend/index.html` - HTML 入口
- ✅ `frontend/.env.example` - 环境变量示例
- ✅ `frontend/.gitignore` - 前端项目忽略规则
- ✅ `frontend/README.md` - 前端项目文档

### 源代码 (Source Code)
- ✅ `frontend/src/main.tsx` - 应用入口
- ✅ `frontend/src/App.tsx` - 根组件
- ✅ `frontend/src/style.css` - 全局样式
- ✅ `frontend/src/types/server.ts` - 类型定义
- ✅ `frontend/src/api/axios.ts` - Axios 配置
- ✅ `frontend/src/api/serverApi.ts` - API 接口
- ✅ `frontend/src/components/ServerList.tsx` - 服务器列表组件

### 静态资源 (Static Assets)
- ✅ `frontend/public/` - 公共资源目录（如果有自定义文件）

## 不需要提交的文件 (Files NOT to Commit)

### 依赖和构建产物 (Dependencies and Build Outputs)
- ❌ `node_modules/` - 依赖包
- ❌ `.pnpm-store/` - pnpm 存储
- ❌ `dist/` - 构建输出
- ❌ `dist-ssr/` - SSR 构建输出

### 环境变量 (Environment Variables)
- ❌ `.env` - 本地环境变量（包含敏感信息）
- ❌ `.env.local` - 本地环境变量
- ❌ `.env.*.local` - 其他本地环境变量

### 日志文件 (Log Files)
- ❌ `*.log` - 所有日志文件
- ❌ `logs/` - 日志目录

### 编辑器和系统文件 (Editor and System Files)
- ❌ `.vscode/` - VSCode 配置（除了 extensions.json）
- ❌ `.idea/` - IntelliJ IDEA 配置
- ❌ `.DS_Store` - macOS 系统文件
- ❌ `Thumbs.db` - Windows 系统文件

## 提交命令 (Commit Commands)

### 1. 查看状态
```bash
git status
```

### 2. 添加文件
```bash
# 添加所有需要的文件
git add .devcontainer/
git add frontend/
git add README.md
git add .gitignore
git add COMMIT_GUIDE.md
```

### 3. 查看将要提交的内容
```bash
git status
git diff --cached
```

### 4. 提交
```bash
git commit -m "feat: initialize server manager frontend project

- Setup Vite + React + TypeScript + Tailwind CSS
- Implement server list component with card layout
- Add API integration with axios
- Configure environment variables
- Add comprehensive documentation

Co-authored-by: Ona <no-reply@ona.com>"
```

### 5. 推送到远程仓库
```bash
git push origin main
```

## 验证清单 (Verification Checklist)

提交前请确认：

- [ ] 所有 `.env` 文件已被 `.gitignore` 忽略
- [ ] `node_modules/` 和 `.pnpm-store/` 已被忽略
- [ ] 构建产物 `dist/` 已被忽略
- [ ] 所有源代码文件已添加
- [ ] 配置文件已添加
- [ ] 文档文件已添加
- [ ] `.env.example` 已添加（不包含敏感信息）
- [ ] 提交信息清晰明确

## 文件大小检查 (File Size Check)

提交前检查文件大小：

```bash
# 查看将要提交的文件大小
git ls-files -s | awk '{print $4, $2}' | sort -k2 -n -r | head -20

# 或使用
du -sh frontend/src/*
```

确保没有大文件（如图片、视频等）被意外提交。
