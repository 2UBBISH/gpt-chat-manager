# GitHub 上传指南

## 1. 配置 Git 用户信息（如果还没有配置）

请在命令行运行以下命令，替换成你的 GitHub 用户名和邮箱：

```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"
```

## 2. 创建 GitHub 仓库

1. 登录 GitHub (https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `gpt-chat-manager` (或其他你喜欢的名称)
   - Description: `GPT聊天记录分类管理工具 - Electron + React`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
4. 点击 "Create repository"

## 3. 连接本地仓库到 GitHub

GitHub 会显示一个页面，按照以下步骤操作：

```bash
# 添加远程仓库（将 YOUR_USERNAME 替换为你的 GitHub 用户名，REPO_NAME 替换为你的仓库名）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 或者使用 SSH（如果你配置了 SSH key）
# git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
```

## 4. 推送代码到 GitHub

```bash
# 提交代码（如果还没有提交）
git add .
git commit -m "Initial commit: GPT聊天记录管理工具 - Electron + React深色主题界面"

# 推送到 GitHub（首次推送使用 -u 参数）
git push -u origin main
```

如果默认分支是 `master` 而不是 `main`，使用：
```bash
git push -u origin master
```

## 5. 验证

推送成功后，刷新 GitHub 仓库页面，你应该能看到所有代码文件了！

---

**注意**：如果遇到认证问题，GitHub 现在要求使用 Personal Access Token 而不是密码。你可以：
1. 在 GitHub Settings > Developer settings > Personal access tokens 创建 token
2. 推送时使用 token 作为密码

或者使用 GitHub Desktop 等图形化工具来推送代码。
