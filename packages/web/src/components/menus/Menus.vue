<template>
    <a-menu>
        <template v-for="item in data" :key="item.key">
            <a-menu-divider v-if="item.divide" />
            <template v-if="!item.children">
                <a-menu-item
                    :key="item.title"
                    :selectable="false"
                    v-if="!item.hide"
                    @click="click(item)"
                    :disabled="item.disable"
                >
                    <template #icon>
                        <Icon :type="item.icon" />
                    </template>
                    {{ item.title }}
                </a-menu-item>
            </template>
            <template v-else>
                <SubMenus :menu="item" :key="item.title" />
            </template>
        </template>
    </a-menu>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { MenuItem } from ".";
import SubMenus from "./SubMenus.vue";

export interface MenusProps {
    data: MenuItem[];
}

const props = withDefaults(defineProps<MenusProps>(), {
    data: [] as any,
});
const { data } = toRefs(props);
const emits = defineEmits<{
    (e: "error", error: Error): void;
}>();

function click(item: MenuItem) {
    try {
        item.onClick?.(item);
    } catch (e) {
        emits("error", e as Error);
    }
}
</script>

<style scope lang="less"></style>
