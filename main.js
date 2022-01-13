const { app, BrowserWindow, dialog, shell, ipcMain: ipc } = require("electron");
const path = require("path");
const createServer = require("./server");

const Servers = {};

app.whenReady().then(() => {
    if (require("electron-squirrel-startup")) return;
    if (process.platform === "win32") copyExample();

    createWindow();

    // MacOS 在關掉程式視窗後還是會在背景執行，所以在這種狀況下我們也要再建立新的視窗
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    // darwin 就是 MacOS，例外是因為它背景執行的特性，不需要直接退出
    if (process.platform !== "darwin") app.quit();
});

// agent.js 會送來請求，我們開原生的 Dialog 再把選取的結果傳回去
ipc.on("select-folder", async (evt) => {
    const path = await dialog.showOpenDialog({
        properties: ["openDirectory"],
        title: "請選擇資料夾位置",
        defaultPath: process.cwd(),
    });
    evt.sender.send("selected-folder", path);
});

ipc.on("select-logfile", async (evt) => {
    const path = await dialog.showOpenDialog({
        properties: ["openFile"],
        title: "請選擇 Log 檔位置",
        defaultPath: process.cwd() + "/log.txt",
    });
    evt.sender.send("selected-logfile", path);
});

ipc.on("server-launch", async (evt, config) => {
    console.log("server-launch", config);
    Servers[config.port] = createServer(config, {
        info: (msg) => evt.sender.send("log-info", msg),
        success: (msg) => evt.sender.send("log-success", msg),
        error: (msg) => evt.sender.send("log-error", msg),
        warn: (msg) => evt.sender.send("log-warn", msg),
    });
    if (Servers[config.port] === null) {
        delete Servers[config.port];
        evt.sender.send("log-error", "啟動伺服器失敗");
        evt.sender.send("server-stopped");
    }
});

ipc.on("server-stop", async (evt, port) => {
    console.log("server-stop", port);
    await Servers[port]();
    delete Servers[port];
    evt.sender.send("server-stopped");
});

function createWindow() {
    // 建立新視窗
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        // agent.js 是一個類似 Extension 的檔案，它可以存取頁面以及 Node.js 的東西
        webPreferences: { preload: path.join(__dirname, "agent.js") },
    });

    // 在視窗中載入 app.html
    win.loadFile("app.html");

    // 開發階段啟用 Chromium 的開發者工具
    // win.webContents.openDevTools();

    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: "deny" };
    });
}

function copyExample() {
    const fs = require("fs");
    const path = require("path");

    if (!fs.existsSync(path.join(process.cwd(), "www")) && fs.existsSync(path.join(process.cwd(), "resources", "app", "www")))
        copyFolderSync(path.join(process.cwd(), "resources", "app", "www"), path.join(process.cwd()));

    function copyFileSync(source, target) {
        let targetFile = target;
        if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) targetFile = path.join(target, path.basename(source));
        fs.writeFileSync(targetFile, fs.readFileSync(source));
    }

    function copyFolderSync(source, target) {
        const targetFolder = path.join(target, path.basename(source));
        if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder);

        if (fs.lstatSync(source).isDirectory()) {
            fs.readdirSync(source).forEach((file) => {
                const curSource = path.join(source, file);
                if (fs.lstatSync(curSource).isDirectory()) copyFolderSync(curSource, targetFolder);
                else copyFileSync(curSource, targetFolder);
            });
        }
    }
}
