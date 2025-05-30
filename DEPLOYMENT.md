# 部署指南 - rythmwrite.space

## 域名配置

你的自定义域名：**rythmwrite.space** (购买于 Namecheap)

## 部署选项

### 选项 1: Netlify (推荐)

1. **连接 GitHub 仓库**
   - 访问 [Netlify](https://netlify.com)
   - 点击 "New site from Git"
   - 连接你的 GitHub 仓库

2. **构建设置**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `18`

3. **自定义域名设置**
   - 在 Netlify 项目设置中，进入 "Domain settings"
   - 点击 "Add custom domain"
   - 输入：`rythmwrite.space`
   - 记录下 Netlify 提供的 DNS 目标地址

4. **Namecheap DNS 配置**
   - 登录 [Namecheap](https://www.namecheap.com)
   - 进入 Domain List，点击你的域名 `rythmwrite.space`
   - 点击 "Manage" 按钮
   - 进入 "Advanced DNS" 标签页
   - 删除所有现有的 A 记录和 CNAME 记录
   - 添加以下记录：
     ```
     类型    主机      值                    TTL
     A       @         104.198.14.52       Automatic
     CNAME   www       your-site-name.netlify.app.   Automatic
     ```
   - 点击保存更改

### 选项 2: Vercel

1. **连接 GitHub 仓库**
   - 访问 [Vercel](https://vercel.com)
   - 导入你的 GitHub 仓库

2. **自定义域名设置**
   - 在项目设置中添加域名：`rythmwrite.space`
   - Vercel 会显示需要配置的 DNS 记录

3. **Namecheap DNS 配置 (Vercel)**
   - 在 Namecheap 的 Advanced DNS 页面
   - 添加 Vercel 提供的 DNS 记录（通常是 A 记录或 CNAME 记录）

## Namecheap 专用说明

### DNS 传播时间
- DNS 更改通常需要 30 分钟到 24 小时生效
- 可以使用 [DNS Checker](https://dnschecker.org) 检查传播状态

### 常见问题解决
1. **如果域名不工作**：
   - 检查 DNS 记录是否正确配置
   - 等待 DNS 传播完成
   - 确保没有冲突的记录

2. **HTTPS 问题**：
   - 部署平台会在域名验证后自动配置 SSL
   - 通常需要几分钟时间

### Namecheap DNS 配置截图指南
1. 登录 Namecheap → Domain List
2. 找到 `rythmwrite.space` → 点击 Manage
3. 切换到 "Advanced DNS" 标签
4. 删除默认的停车页面记录
5. 按照上述表格添加新记录

## SSL 证书

两个平台都会自动为你的自定义域名提供免费的 SSL 证书。

## 环境变量

如果你的应用使用 Spotify API 或其他服务，记得在部署平台设置相应的环境变量：

- `REACT_APP_SPOTIFY_CLIENT_ID`
- `REACT_APP_SPOTIFY_CLIENT_SECRET`
- 其他必要的 API 密钥

## 构建验证

在部署前，确保本地构建成功：

```bash
npm run build
```

构建成功后，可以本地预览：

```bash
npx serve -s build
```

## 文件说明

- `package.json` - 已添加 `homepage` 字段指向你的域名
- `netlify.toml` - Netlify 部署配置
- `vercel.json` - Vercel 部署配置  
- `public/_redirects` - 处理 React Router 路由

## 部署步骤总结

1. ✅ 域名配置文件已创建
2. 🚀 选择部署平台（Netlify 或 Vercel）
3. 🔗 连接 GitHub 仓库并部署
4. 🌐 在 Namecheap 配置 DNS 记录
5. ⏰ 等待 DNS 传播（最多 24 小时）
6. 🔒 验证 HTTPS 证书自动配置
7. ✨ 访问 https://rythmwrite.space 测试

## 注意事项

1. 确保所有环境变量都以 `REACT_APP_` 开头
2. 部署后测试所有路由是否正常工作
3. 检查 HTTPS 是否正确配置
4. 验证音乐播放和 AI 功能是否正常
5. Namecheap 的 DNS 更改可能需要一些时间才能生效 