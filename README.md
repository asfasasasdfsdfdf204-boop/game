# 🐛 蟲 (Infection-v2.6)

> 一个基于终端的交互式解谜游戏 —— 扮演系统管理员，定位并清除内核感染。

你的计算机内核被未知实体"蟲"感染，主系统引导已被拦截。利用终端指令、本地文件管理与网络协议知识，穿越四个阶段，定位并彻底清除威胁。

---

## 🎮 游戏特性

- **终端沉浸式体验** — 模拟真实系统崩溃、安全模式启动、内核转储等场景
- **四阶段递进解谜** — 每个阶段考察不同的计算机安全技能
- **动态密钥系统** — 解密密钥基于你的电脑用户名生成，每台机器独一无二
- **真实文件系统交互** — 需要在 Windows 文件资源管理器中操作隐藏文件和文件权限
- **Web 抓包与身份伪造** — 通过浏览器开发者工具修改 Cookie 完成权限提升
- **物理写保护机制** — 利用 Windows 文件只读属性实现游戏内"杀毒"

## 📋 环境要求

- **操作系统**：Windows 10/11（游戏依赖 Windows 文件属性机制）
- **Node.js**：≥ 18（[下载 LTS 版本](https://nodejs.org/)）
- **浏览器**：Chrome / Edge / Firefox（需支持开发者工具）

## 🚀 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/asfasasasdfsdfdf204-boop/game.git
cd game

# 2. 安装依赖
npm install

# 3. 启动游戏
node main.js
```

或者直接双击 `run.bat` 启动。

## 🕹️ 通关流程

### 第一阶段：突破系统崩溃阻断
直接运行会看到红色致命错误 `0x0000007B`。你需要找到方法进入安全模式启动扫描器。

<details>
<summary>💡 提示（点击展开）</summary>

修改启动参数，添加 `--recovery` 标志进入紧急恢复模式。
</details>

### 第二阶段：隐写日志与动态密钥
扫描器会在隐藏的系统文件夹中生成日志文件。找到它，提取属于你电脑的专属解密密钥。

<details>
<summary>💡 提示（点击展开）</summary>

`System_Logs` 文件夹被设置为 Windows 隐藏文件夹，需要在文件资源管理器中开启"显示隐藏的项目"。
</details>

### 第三阶段：Web 抓包与身份伪造
解锁 Web 终端后，访问 `http://localhost:8080` 会看到 403 禁止访问。你需要伪造管理员身份。

<details>
<summary>💡 提示（点击展开）</summary>

按 F12 打开浏览器开发者工具，在 Application → Cookies 中修改身份标识。
</details>

### 第四阶段：物理写保护与终极杀毒
管理员面板揭示了"蟲"的存活机制。剥夺它的写入权限，然后执行清除指令。

<details>
<summary>💡 提示（点击展开）</summary>

将 `kernel.lock` 文件设为只读属性，然后在控制台输入 `purge`。
</details>

---

出现以下信息表示通关成功：
```
[SUCCESS] ALL PHYSICAL AND VIRTUAL SECTORS PURGED AND RESTORED.
```

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| Node.js | 运行时环境 |
| Express | Web 服务器（管理员面板） |
| Crypto | 动态密钥生成（SHA-256） |
| Windows API | 文件属性操作（attrib 命令） |
| ANSI Escape | 终端彩色输出 |

## 📁 项目结构

```
game/
├── main.js          # 游戏主程序（崩溃模拟、密钥验证、Web 服务器、Shell 交互）
├── test.js          # 单元测试（密钥生成、Cookie 解析）
├── help.md          # 完整通关指南
├── run.bat          # Windows 启动脚本
├── package.json     # 项目配置
└── .gitignore
```

## 🧪 运行测试

```bash
node test.js
```

验证动态密钥生成算法和 Cookie 解析工具的正确性。

## 📖 完整攻略

详见 [help.md](help.md)（包含详细通关步骤和常见故障排除）。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC License

---

⭐ 如果你觉得这个项目有趣，欢迎点个 Star！
