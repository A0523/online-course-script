import { app } from "electron";
import log from "electron-log";
import { CurrentWindow } from ".";
import { Setting, StoreSchema } from "../types";
import { StoreGet, StoreSet } from "../types/setting";
import { Version } from "../types/version";
import { logger } from "../types/logger";
import { basename, join, resolve } from "path";
import { existsSync, mkdirSync } from "fs";
const { info } = logger("setting");

export function InitSetting() {
    const setting: Setting = StoreGet("setting");
    // 版本比较，如果当前版本不比本地版本高，则不更新

    if (setting && setting.version) {
        const update = new Version(app.getVersion()).greaterThan(new Version(setting.version));
        info(update ? "检测到设置版本需要更新!" : "本地设置无需更新");

        if (update) {
            const s = StoreGet("setting");
            const defaultSetting = GetDefaultSetting();
            info("本地设置:", s);
            info("更新设置值:", defaultSetting);
            // 合并设置
            StoreSet("setting", Object.assign({}, s, defaultSetting));
            info("合并后的设置值:", StoreGet("setting"));
        }
    } else {
        const defaultSetting = GetDefaultSetting();
        info("初始化设置值:", defaultSetting);
        // 初始化配置
        StoreSet("setting", defaultSetting);
        StoreSet("tasks", []);
        StoreSet("users", []);
        initPath(defaultSetting.system.path);
    }

    const { path, win } = setting?.system;
    if (path) initPath(path);
    if (win) CurrentWindow?.setAlwaysOnTop(win.isAlwaysOnTop);

    // 清空任务列表
    StoreSet("tasks", []);

    // 设置开机自启
 
}

export function GetDefaultSetting() {
    const initSetting: Setting = {
        version: app.getVersion(),
        common: {
            task: {
                maxTasks: 4,
            },
        },
        script: {
            // 启动设置
            launch: {
                // 浏览器执行路径
                binaryPath: getChromePath() || "",
            },
            // 脚本设置
            script: {
                // 任务间隔3秒
                taskPeriod: 3 * 1000,
                cx: {
                    // 是否形成队列
                    queue: true,
                    // 复习模式
                    review: false,
                    media: {
                        enable: true,
                        playbackRate: 2,
                        mute: true,
                    },
                    ppt: true,
                    book: true,
                    qa: {
                        enable: true,
                        autoReport: true,
                        passRate: 60,
                    },
                    work: {
                        enable: true,
                        autoReport: true,
                    },
                    exam: {
                        enable: true,
                        autoReport: true,
                    },
                },
                zhs: {
                    // 半个小时自动停止
                    autoStop: 0.5,

                    video: {
                        enable: true,
                        playbackRate: 2,
                        mute: true,
                    },
                    qa: {
                        enable: true,
                        autoReport: true,
                    },
                    work: {
                        enable: true,
                        autoReport: true,
                    },
                    exam: {
                        enable: true,
                        autoReport: true,
                    },
                },
            },
            // 信息设置
            account: {
                // 查题码
                queryToken: "",
                // ocr 设置
                ocr: {
                    username: "",
                    password: "",
                },
            },
        },
        system: {
            win: {
                isAlwaysOnTop: CurrentWindow?.isAlwaysOnTop() || true,
           
            },
            path: {
                userData: app.getPath("userData"),
                logs: app.getPath("logs"),
                courseImg: resolve(join(app.getPath("userData"), "./course-img/")),
            },
        },
    };

    return initSetting;
}

function initPath(path: StoreSchema["setting"]["system"]["path"]) {
    if (path) {
        for (const key in path) {
            const p = (path as any)[key];
            info("设置路径:" + key, p);
            // 如果文件夹不存在则创建
            if (!existsSync(p)) {
                info("mkdirs", p);
                mkdirs(p);
            }
            try {
                app.setPath(key, p);
            } catch {}
        }
    }
}

// 获取 chrome 路径
export function getChromePath() {
    let paths = [process.env.ProgramFiles, process.env["ProgramFiles(x86)"], "C:\\Program Files", "C:\\Program Files (x86)"];
    let chromePath = paths.map((p) => join(p || "", "\\Google\\Chrome\\Application\\chrome.exe")).find((p) => existsSync(p));
    info("获取本地chrome浏览器路径:", chromePath);
    return chromePath;
}

export function mkdirs(url: string) {
    if (!existsSync(url)) {
        mkdirs(resolve(url, "../"));
        mkdirSync(url);
    }
}