import { CurrentWindow } from "..";
import { randomUUID } from "crypto";
import EventEmitter from "events";

import { EventFormat } from "../../types";

import { StoreGet, StoreSet } from "../../types/setting";
import { BaseTask, TaskStatus, TaskType } from "./types";
import { logger } from "../../types/logger";
import { OCSNotify } from "../events/ocs.event";
const { info, error, success, warn } = logger("task");

const notify = new OCSNotify("task", "任务系统");
/**
 * 任务
 */
export class Task extends EventEmitter implements BaseTask {
    id: string;
    name: string;
    status: TaskStatus;
    needBlock: boolean;
    msg: string;
    timeout: number;
    createTime: number;
    // 子任务
    children?: Task;

    constructor({ name, needBlock, id, status, msg, timeout, createTime }: TaskType) {
        super();
        this.id = id || randomUUID().replace(/-/g, "");
        this.needBlock = needBlock || false;
        this.status = status || "wait";
        this.name = name;
        this.msg = msg || "";
        this.timeout = timeout || 0;
        this.createTime = createTime || Date.now();
    }

    onFinish(listener: (...args: any[]) => void) {
        this.on("finish", listener);
    }

    onProcess(listener: (...args: any[]) => void) {
        this.on("process", listener);
    }

    onError(listener: (...args: any[]) => void) {
        this.on("error", listener);
    }

    eventFormat(status: TaskStatus, ...str: string[]) {
        return EventFormat("task", status, ...str);
    }

    finish(value?: any) {
        success(this.name, value);
        this.status = "finish";
        CurrentWindow?.webContents.send(this.eventFormat("finish", this.id), value);
        this.emit(this.eventFormat("finish"));
        success("finish", this.toString());
    }

    process(msg?: string) {
        info(this.name, msg || "");
        this.change("process", msg || "");
    }

    error(msg?: string) {
        error(this.name, msg || "");
        this.change("error", msg || "");
    }

    warn(msg?: string) {
        warn(this.name, msg || "");
        this.change("warn", msg || "");
    }

    change(status: TaskStatus, msg: string) {
        console.log(status, msg);

        this.status = status;
        this.msg = msg;
        CurrentWindow?.webContents.send(this.eventFormat(status, this.id), msg || "");
        this.emit(this.eventFormat(status));
        error(status, this.toString());
    }

    update() {
        let localTasks = StoreGet("tasks");
        localTasks.splice(
            localTasks.findIndex((t) => t.id === this.id),
            1,
            this.toString()
        );
        StoreSet("tasks", localTasks);
        info("task更新", this.toString());
    }

    remove() {
        let localTasks = StoreGet("tasks");
        localTasks.splice(
            localTasks.findIndex((t) => t.id === this.id),
            1
        );
        StoreSet("tasks", localTasks);
        info("task移除", this.toString());
    }

    // 格式化此对象，可序列化
    toString(withChildren: boolean = true): any {
        let task: Task = Object.assign({}, this);

        function str(task: Task): any {
            let { id, name, status, msg, needBlock, timeout, createTime, children } = task;
            if (children) {
                children = str(children);
            }
            if (withChildren) {
                return { id, name, status, msg, needBlock, timeout, createTime, children };
            } else {
                return { id, name, status, msg, needBlock, timeout, createTime };
            }
        }
        return str(task);
    }
}