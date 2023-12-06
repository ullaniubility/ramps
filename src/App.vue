<template>
  <van-config-provider class="gp-view" :theme="settingsStore.theme" :theme-vars="themeVars">
    <RouterView v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </RouterView>
  </van-config-provider>
</template>
<script setup>
import { ref } from 'vue'
import '@vant/touch-emulator'
import useSettingStore from '@/stores/modules/setting'
const settingsStore = useSettingStore()
const { themeColor, localeId } = storeToRefs(settingsStore)

const themeVars = ref({
  themeColor
})
const { locale } = useI18n()
locale.value = localeId.value
if (
  locale.value === 'ar' ||
  locale.value === 'fa' ||
  locale.value === 'ur'
) {
  document.documentElement.setAttribute('dir', 'rtl')
}
console.log(localeId.value)
</script>
<style lang="scss" scoped>
@media (min-width: 820px) {
  .gp-view {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: #F6F7F9;
  }
}
</style>
