// @ts-check
const { BrowserWindow, app } = require("electron");

app.disableHardwareAcceleration();

function createWindow() {
    return new BrowserWindow({
        minHeight: 400,
        minWidth: 600,
        center: true,
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            // 关闭拼写矫正
            spellcheck: false,
            webSecurity: true,
            // 开启node
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
}

async function openWindow() {
    const win = createWindow();

    if (!app.isPackaged) {
        /**
         * using `mode` options to prevent issue : {@link https://github.com/electron/electron/issues/32702}
         */
        await win.loadURL("http://localhost:3000");
        win.webContents.openDevTools({ mode: "detach" });
    } else {
        await win.loadFile("./public/index.html");
    }

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    win.show();

    return win;
}

exports.createWindow = createWindow;
exports.openWindow = openWindow;