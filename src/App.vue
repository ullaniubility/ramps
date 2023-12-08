<template>
  <van-config-provider class="gp-view" :class="route.query.isDark === 'dark'?'dark' : ''" :theme="settingsStore.theme" :theme-vars="themeVars">
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
import { useRoute } from 'vue-router'
import useSettingStore from '@/stores/modules/setting'
const settingsStore = useSettingStore()
const { themeColor, localeId } = storeToRefs(settingsStore)
const route = useRoute()

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
onMounted(()=>{
  console.log(window.WEB_EMBED_WOWEARN_APP_SETTINGS,'windowwindowwindowwindowwindowwindowwindowwindowwindow')
})
</script>
<style lang="scss" scoped>

@media
(min-width: 820px) {
  .gp-view {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--page-bg);

    &.dark {
      --page-bg: #13131B; //主题
    }

    --page-bg:#FFFFFF;
  }
}
// @media
// (max-width: 400px) {
//   .gp-view {
//     width: 100%;
//     min-height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: var(--page-bg);

//     &.dark {
//       --page-bg: #13131B; //主题
//     }

//     --page-bg:#FFFFFF;
//   }
// }
</style>