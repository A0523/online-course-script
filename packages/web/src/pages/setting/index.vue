<template>
    <div class="w-100">
        <div class="setting text-center p-2 col-12 col-md-10 col-lg-8">
            <Card title="基本设置">
                <Description label="开机自启">
                    <a-switch
                        size="small"
                        v-model:checked="store['auto-launch']"
                    ></a-switch>
                </Description>

                <Description label="窗口大小">
                    <a-input-number
                        size="small"
                        v-model:value="store.win.size"
                        :step="0.1"
                        :min="0"
                        :max="10"
                    ></a-input-number>
                </Description>
            </Card>

            <Card title="浏览器默认设置">
                <Description label="浏览器路径">
                    <a-input
                        size="small"
                        v-model:value="launchOptions.executablePath"
                    ></a-input>
                </Description>
                <Description label="隐身模式">
                    <a-switch
                        size="small"
                        v-model:checked="launchOptions.headless"
                    ></a-switch>
                </Description>
                <Description label="无痕浏览">
                    <a-switch
                        size="small"
                        v-model:checked="store.script.userDataDir"
                    ></a-switch>
                </Description>
            </Card>

            <Card title="路径设置">
                <Path label="工作区路径" name="workspace" :setting="true" />
                <Path label="配置路径" name="config-path" />
                <Path label="数据路径" name="user-data-path" />
                <Path label="日志路径" name="logs-path" />
                <Path label="二进制文件" name="exe-path" />
            </Card>

            <div class="mt-4">
                <a-popconfirm
                    title="确认重置您的设置，并重新启动软件吗？"
                    ok-text="确认"
                    cancel-text="取消"
                    @confirm="reset"
                >
                    <a-button shape="round" size="small" danger> 重置设置 </a-button>
                </a-popconfirm>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from "../../components/Card.vue";
import Description from "../../components/Description.vue";
import Path from "../../components/Path.vue";
import { store } from "../../store";
import { remote } from "../../utils/remote";
import { LaunchOptions } from "@ocsjs/scripts";

const launchOptions = store.script.launchOptions as LaunchOptions;

function reset() {
    store.version = undefined;

    remote.app.call("relaunch");
    remote.app.call("exit", 0);
}
</script>

<style scope lang="less">
.setting {
    margin: 0 auto;
    min-height: 500px;
}
</style>
