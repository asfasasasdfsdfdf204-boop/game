系统警报：你的计算机内核似乎感染了未知实体“蟲”。主系统引导已被拦截，请扮演系统管理员，利用终端指令、本地文件管理与网络协议知识，定位并彻底清除威胁，出现[SUCCESS] ALL PHYSICAL AND VIRTUAL SECTORS PURGED AND RESTORED.表示成功。一、准备工作（前置环境）在开始游戏前，请确保你的电脑具备以下环境：安装 Node.js（版本不低于 18）：如未安装，请前往 Node.js 官网下载 LTS 版本安装（一路点击“下一步”即可）。下载/解压游戏目录：确保文件夹内包含 main.js、package.json、node_modules 及 run.bat。  二、完整通关路线指南第一阶段：突破系统崩溃阻断 (Safe Boot)触发崩溃：直接双击运行 run.bat，控制台会抛出红色致命错误 0x0000007B 并自动暂停，提示主引导被拦截。  破解方式：
方法 A（修改脚本）：右键编辑 run.bat，将里面的 node main.js 改为 node main.js --recovery 并保存，重新双击启动。
方法 B（命令行启动）：在当前文件夹空白处按住 Shift + 右键，选择“在此处打开 PowerShell/终端”，输入命令 node main.js --recovery 启动。  第二阶段：隐写日志与动态密钥提取 (Log Analysis)观察输出：成功带参数启动后，控制台会提示日志已挂载至 .\System_Logs\sector_0.sys。  破解方式：
进入 System_Logs 文件夹（注意：该文件夹默认被设为了 Windows 隐藏文件夹，需在文件资源管理器顶部勾选“显示隐藏的项目”）。
用cmd输入notepad sector_0.sys打开隐藏的 sector_0.sys，在日志中找到TOKEN ID:，解密出属于你电脑专属的动态密钥 KEY-XXXXXXXXXX。
将这串 KEY-XXXXXXXXXX 复制粘贴回控制台窗口并回车，解锁 Web 终端。  第三阶段：Web 抓包与身份伪造 (HTTP Hijacking)访问终端：密钥输入正确后，控制台会提示 Web 应急服务已启动，浏览器打开 http://localhost:8080。此时页面会大红字报错 403 FORBIDDEN，提示当前身份为 Guest。  破解方式：
在浏览器页面按 F12 打开开发者工具，切换到Application标签页点击 Application 之后，，点击左侧 Cookies 旁边的小三角形展开它，下面会出现 http://localhost:8080。  点击那个 http://localhost:8080。  此时右侧会显示 Cookies 的表格：  如果表格里已经有 role 项，双击它的 Value 更改为 admin。  如果表格是空的，直接双击表格空白行的 Name 列输入 role，在 Value 列输入 admin。  
刷新网页，成功进入管理员面板，获取“蟲”寄生文件 kernel.lock 的锁定机制。  第四阶段：物理写保护与终极杀毒 (Kernel Purge)检查进程锁：网页提示“蟲”正通过对 kernel.lock 文件保持写入句柄来维持活性。  破解方式：
回到游戏根目录，找到自动生成的 kernel.lock 文件。
右键点击 kernel.lock -> 属性 -> 勾选“只读”属性 -> 点击确定（剥夺程序的写权限，或者直接在另一个 CMD 窗口运行 attrib +r kernel.lock）。
回到游戏控制台界面，输入命令 purge。
系统将开始注入清理线程，进度条到达 100% 后，物理与虚拟扇区全部恢复，通关成功。  三、常见故障排除 (Troubleshooting)问：双击 run.bat 闪退怎么办？
答：请确认电脑是否已正确安装 Node.js。可在 CMD 中输入 node -v 检查版本。  问：在文件夹里看不到 System_Logs 文件夹？
答：Windows 默认隐藏系统文件夹。点击文件资源管理器顶部的“查看”菜单，勾选“隐藏的项目”即可看到。  问：输入 purge 提示失败？
答：必须确保已经右键将 kernel.lock 改为了“只读”，程序无法写入时才会判定清除成功。  