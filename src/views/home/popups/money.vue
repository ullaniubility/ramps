<template>
  <div class="container" :class="props.isDark == 'dark' ? 'dark' : ''">
    <div class="header">
      <van-nav-bar v-if="localeId == 'ar' || localeId == 'fa' || localeId == 'ur' " :title="t('startpay.money.title')">
        <template #right>
          <van-icon name="arrow" size="25" @click="emit('back')"/>
        </template>
      </van-nav-bar>

      <van-nav-bar v-else :title="t('startpay.money.title')" left-text="" left-arrow @click-left="emit('back')" />
      <van-search v-model="keyword" :placeholder="t('startpay.money.search')" />
    </div>
    <div class="list">
      <van-cell class="item" v-for="item in list" :key="item" @click="emit('confirm', item)">
        <template #title>
          <!-- {{ item }} -->
          <div class="title">{{ item.symbol }} - {{ item.nationExplain }}</div>
          <!-- <div class="info">{{ item.name }}</div> -->
        </template>
        <template #icon>
          <div class="icon-box">
            <img class="icon" :src="item.logo" />
          </div>
        </template>
      </van-cell>
      <van-empty v-if="!list.length" :image="EmptyIcon" image-size="128" :description="t('startpay.money.empty')" />
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps, computed } from 'vue'
import EmptyIcon from '../icons/empty.svg'
import { useI18n } from 'vue-i18n'
import useSettingStore from '@/stores/modules/setting'

const settingsStore = useSettingStore()
const { localeId } = storeToRefs(settingsStore)


const { t } = useI18n()
const props = defineProps({
  tokenList: {
    type: Array,
    default: () => []
  },
  isDark: {
    type: String,
    default: 'light'
  }
})

const keyword = ref('')
const emit = defineEmits(['back', 'confirm'])

const list = computed(() => {
  const k = (keyword.value || '').toUpperCase()
  return props.tokenList.filter(item => (item.symbol.toUpperCase() || '').toUpperCase().indexOf(k) > -1)
})



</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  --info-color: #C2C2C2;
  --title-color: #333333;

  &.dark {
    --theme-bg: #13131B;
    --text-color: #fff;
    --min-text-color: #8B8B9E;
    --keyboard-bg: #191923;
    --sear-bg: #1E1E2A;
    --sear-border: #33334D;
    --sear-color: #fff;
    --sear-boder: #33334d;
    --sear-border-hover: #33C640;
  }

  --sear-boder:#eaecee;
  --sear-bg:#F6F6F8;
  --sear-border:#EAECEE;
  --sear-color:#1F1F38;
  --sear-border-hover:#33C640;

  --keyboard-bg:#F6F6F8;
  --min-text-color:#8B8B9E;
  --theme-bg:#FFFFFF;
  --text-color:#1F1F38;
}

:deep(.van-field__control) {
  color: var(--sear-color);
  text-align: justify;
}
:deep(.van-hairline--bottom:after) {
  border: none;
}

:deep(.van-search__field) {
  border: 1px solid var(--sear-boder);
  padding: 0;
  margin: 0;
  padding-left: 0;
  color: var(--sear-color);
  background-color: var(--sear-bg);
  border-radius: 8px;
}

:deep(.van-search__field):hover {
  border: 1px solid var(--sear-border-hover);
}

:deep(.van-search__content) {
  background-color: transparent;
}

:deep(.van-search__content) {
  padding: 0;
}

:deep(.van-icon, .van-icon-clear, .van-field_clear) {
  margin-right: 10px;
}

:deep(.van-search__field .van-field__left-icon) {
  margin-left: 10px;
}

:deep(.van-field__control) {
  color: var(--sear-color);
}

:deep(.van-nav-bar__title) {
  color: var(--text-color);
}

:deep(.van-nav-bar .van-icon) {
  color: var(--text-color);
}

.header {
  color: #fff;
  --van-search-background: var(--theme-bg);
  --van-nav-bar-background: var(--theme-bg);
  --van-nav-bar-title-text-color: #fff;
  // --van-nav-bar-title-font-size: 16px;
  // --van-font-bold: 500;
  --van-nav-bar-icon-color: #fff;
  --van-nav-bar-arrow-size: 24px;
  // --van-border-color: var(--van-theme-color);
  // --van-search-content-background: #fff;
  // --van-field-input-text-color: #B0B0B0;
  // --van-cell-value-color: #B0B0B0;
  --van-field-icon-size: 18px;
  background-color: var(--theme-bg);

}

.list {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  background-color: var(--theme-bg);
  padding: 0 16px;

  .item {
    background-color: var(--keyboard-bg);
    border-radius: 8px;
    padding: 0;
    margin: 10px 0;
    width: 100%;
    height: 64px;
    display: flex;
    padding: 0 16px;
    align-items: center;
    box-sizing: border-box;

    &::after {
      display: none;
    }

    .title {
      font-size: 16px;
      color: var(--text-color);
      font-weight: 500;
      margin: 0 10px;
    }

    .info {
      font-size: 12px;
      color: var(--info-color);
      line-height: normal;
    }
  }

  .van-field__control {
    text-align: end;
  }

  .icon-box {
    height: 30px;
    width: 45px;
    overflow: hidden;

    .icon {
      width: 100%;
      height: 100%;
      // border-radius: 100%;

    }
  }

}</style>
