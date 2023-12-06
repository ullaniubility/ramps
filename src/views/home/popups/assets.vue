<template>
  <div class="container" :class="props.isDark === 'dark' ? 'dark' : ''">
    <div class="header">
      <van-nav-bar v-if="localeId == 'ar' || localeId == 'fa' || localeId == 'ur'" :title="t('startpay.assets.title')">
        <template #right>
          <van-icon name="arrow" size="25" @click="emit('back')" />
        </template>
      </van-nav-bar>
      <van-nav-bar v-else :title="t('startpay.assets.title')" left-text="" left-arrow @click-left="emit('back')" />
      <van-search v-model="keyword" :placeholder="t('startpay.assets.search')" />
    </div>
    <div class="list">
      <van-cell class="item" v-for="item in list" :key="item" @click="emit('confirm', item)">
        <template #title>
          <div class="title">{{ item.symbol }}</div>
          <div class="info" v-if="item.coinType == 2">{{ item.net }}</div>
        </template>

        <template #icon>
          <div class="icon-box">
            <img class="icon" :src="item.projectLogo" />
            <div v-for="(item2, index) in tokensList">
              <img v-if="item.coinType == 2 && item2.chainCode == item.net" :class="localeId == 'ar' || localeId == 'fa' || localeId == 'ur'?'icon-min-left': 'icon-min'"
                :src="item2.iconUrl" />
            </div>

            <!-- <img v-if="item.coinType==2" class="icon-min" src="https://www.bjxku.com/uploads/images/img/2021/0702/1625211889103391.png" /> -->
          </div>
        </template>
        <template #value>
          <div class="title">{{ formatDecimal(item.balance, 8) }}</div>
          <div v-if="item.balanceAmount != '0'" class="info">${{ formatDecimal(item.balanceAmount, 2) }}</div>
        </template>
      </van-cell>
      <van-empty v-if="!list.length" :image="EmptyIcon" image-size="128" :description="t('startpay.assets.empty')" />
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps, computed } from 'vue'
import EmptyIcon from '../icons/empty.svg'
import { useI18n } from 'vue-i18n'
import { formatDecimal, tokensList } from '@/utils/index'
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
  return props.tokenList.filter(item => (item.symbol || '').toUpperCase().indexOf(k) > -1)
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  --item-bg: #F8F8F8;
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
  text-align: justify;
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
    background-color: var(--sear-bg);
    border-radius: 8px;
    padding: 0;
    margin: 10px 0;
    width: 100%;
    height: 64px;
    display: flex;
    padding: 0 16px;
    align-items: center;
    box-sizing: border-box;

    :deep(.van-cell__value) {
      text-align: end;
    }

    &::after {
      display: none;
    }

    .title {
      font-size: 16px;
      color: var(--text-color);
      font-weight: 500;
      margin: 0 16px;
    }

    .info {
      font-size: 12px;
      margin: 0 16px;
      color: var(--min-text-color);
      line-height: normal;
    }
  }

  .icon-box {
    width: 38px;
    height: 38px;
    border-radius: 100%;
    box-sizing: border-box;
    position: relative;

    .icon-min {
      border: 1px solid #fff;
      height: 20px;
      width: 20px;
      border-radius: 100%;
      position: absolute;
      bottom: 0;
      right: -50%;
      transform: translateX(-50%);
    }

    .icon-min-left {
      border: 1px solid #fff;
      height: 20px;
      width: 20px;
      border-radius: 100%;
      position: absolute;
      bottom: 0;
      left: -50%;
      transform: translateX(50%);
    }

    .icon {
      width: 38px;
      height: 38px;
    }
  }


}
</style>
