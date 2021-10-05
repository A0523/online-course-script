 
import { Browser } from 'puppeteer-core';
import { Pioneer } from '@pioneerjs/core';
import { IpcMain } from "electron";
import { StartPuppeteer } from "../../puppeteer";
 
import {info} from 'electron-log';
import { CXScript } from '../../puppeteer/cx';
import { ScriptLoginOptions } from '../../types/scripts';
import { IPCEventTypes } from '../../types/events';



export function ScriptsRouter(ipcMain: IpcMain) {
    
    ipcMain
        .on(IPCEventTypes.SCRIPT_LOGIN, (e: any, { script, type, loginConfig, ocrOptions }: ScriptLoginOptions) => {
            StartPuppeteer({
                scripts: [CXScript],
                async callback(browser: Browser, pioneer: Pioneer) {
                    const s: any = pioneer.runnableScripts?.find((s: any) => s.name === script);
                    if (s) {
                        const cx: CXScript = s;
                        await cx.index(type);
                        await cx.login(
                            loginConfig,
                            ocrOptions
                        );
                    }
                },
            });
        })

}

