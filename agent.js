const { ipcRenderer: ipc } = require("electron");

// #region File Selector
ipc.on("selected-folder", (evt, path) => {
    if (path.canceled) return;
    document.querySelector("#folder").value = path.filePaths[0];
});
ipc.on("selected-logfile", (evt, path) => {
    if (path.canceled) return;
    document.querySelector("#logfile").value = path.filePaths[0];
});
// #endregion

// #region Log IPC
ipc.on("log-info", async (evt, msg) => {
    const logs = document.querySelector("#logs");
    const log = document.createElement("div");
    log.classList.add("log", "info");
    log.innerHTML = urlify(msg);
    logs.appendChild(log);
    if (logs.scrollHeight - logs.scrollTop <= logs.clientHeight + 120) log.scrollIntoView({ behavior: "smooth" });
});

ipc.on("log-success", async (evt, msg) => {
    const logs = document.querySelector("#logs");
    const log = document.createElement("div");
    log.classList.add("log", "success");
    log.innerHTML = urlify(msg);
    logs.appendChild(log);
    if (logs.scrollHeight - logs.scrollTop <= logs.clientHeight + 120) log.scrollIntoView({ behavior: "smooth" });
});

ipc.on("log-error", async (evt, msg) => {
    const logs = document.querySelector("#logs");
    const log = document.createElement("div");
    log.classList.add("log", "error");
    log.innerHTML = urlify(msg);
    logs.appendChild(log);
    if (logs.scrollHeight - logs.scrollTop <= logs.clientHeight + 120) log.scrollIntoView({ behavior: "smooth" });
});

ipc.on("log-warn", async (evt, msg) => {
    const logs = document.querySelector("#logs");
    const log = document.createElement("div");
    log.classList.add("log", "warn");
    log.innerHTML = urlify(msg);
    logs.appendChild(log);
    if (logs.scrollHeight - logs.scrollTop <= logs.clientHeight + 120) log.scrollIntoView({ behavior: "smooth" });
});
// #endregion

ipc.on("server-stopped", async (evt) => {
    document.querySelector("#launch").classList.remove("launched");
    document.querySelector("#launch").innerHTML = "啟動";
});

// 當 DOM 載入完成後填上初始值
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#folder").value = process.cwd() + "/www";
    document.querySelector("#port").value = "80";
    document.querySelector("#log").checked = false;
    document.querySelector("#logfile").value = process.cwd() + "/log.txt";

    registerListener();
});

function registerListener() {
    // 選擇資料夾，用 ipc 與 main.js 溝通
    document.querySelector("#folder-select").addEventListener("click", () => {
        ipc.send("select-folder");
    });
    document.querySelector("#logfile-select").addEventListener("click", () => {
        ipc.send("select-logfile");
    });

    document.querySelector("#launch").addEventListener("click", async () => {
        if (document.querySelector("#launch").classList.contains("launched")) {
            ipc.send("server-stop", +document.querySelector("#port").value);
            return;
        } else {
            // 取得輸入值
            const folder = document.querySelector("#folder").value;
            const port = +document.querySelector("#port").value;
            const log = document.querySelector("#log").checked;
            const logfile = document.querySelector("#logfile").value;

            // 將輸入值傳給 main.js
            ipc.send("server-launch", { folder, port, log, logfile });
            document.querySelector("#launch").classList.add("launched");
            document.querySelector("#launch").innerHTML = "停止";
        }
    });
}

function urlify(text) {
    return text.replace(/(https?:\/\/[^\s]+)/g, `<a href="$1" target="_blank" style="text-decoration: none; color: inhert;">$1</a>`);
}
