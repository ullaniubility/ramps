<template>
  <div class="container" :class="props.isDark==='dark'?'dark':''">
    <div class="header">
      <van-nav-bar v-if="localeId == 'ar' || localeId == 'fa' || localeId == 'ur'" :title="t('startpay.supplier.title')">
        <template #right>
          <van-icon name="arrow" size="25" @click="emit('back')" />
        </template>
      </van-nav-bar>
      <van-nav-bar v-else :title="t('startpay.supplier.title')" left-text="" left-arrow @click-left="emit('back')" />
      <!-- <van-search v-model="keyword" placeholder="搜索"/> -->
    </div>
    <div class="list">
      <div class="tips" v-if="list.length">{{ t('startpay.supplier.tips') }}</div>
      <van-cell v-for="item, index in list" :key="item" @click="emit('confirm', item)" class="item"  >
        <template #title>
          <div class="title">{{ item.channelName }}</div>
        </template>
        <template #icon>
          <img v-if="item.channelIcon" class="icon" :src="item.channelIcon" />
            <div v-else class="error-icon">
              <img :src="props.isDark === 'dark'? emptyDark:empty" alt="">
            </div>
          <!-- <img class="icon" :src="item.channelIcon==''&&props.isDark === 'dark'?emptyDark:item.channelIcon==''&&props.isDark === 'light'?empty:item.channelIcon " /> -->
          <!-- <van-image width="38" height="38" round :error-icon="props.isDark === 'dark'?emptyDark:empty" :src="item.channelIcon"/> -->
          <!-- <img class="icon" src="https://ossimg.ullapay.com/5,5/f40fe4b1c4314e0bbbb4c358b46bf8a7.png"/> -->
        </template>
        <template #value>
          <div class="title">{{ item.amount }}</div>
          <div v-if="index === 0" class="base">{{ t('startpay.supplier.bast') }}</div>
        </template>
      </van-cell>
      <van-empty
        v-if="!list.length"
        :image="EmptyIcon"
        image-size="128"
        :description="t('startpay.supplier.empty')"
      />
    </div>
  </div>
</template>
<script setup>
  import { ref, defineEmits, defineProps, computed } from 'vue'
  import EmptyIcon from '../icons/empty.svg'
import { useI18n } from 'vue-i18n'
import useSettingStore from '@/stores/modules/setting'
import empty from '@/assets/img/empty.png'
import emptyDark from '@/assets/img/empty-dark.png'

const settingsStore = useSettingStore()
const { localeId } = storeToRefs(settingsStore)

const { t } = useI18n()
  const props = defineProps({
    tokenList: {
      type: Array,
      default: () => []
    },
    isDark:{
      type:String,
      default:'light'
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
.container{
  display: flex;
  flex-direction: column;
  height: 100%;
  --item-bg: #F8F8F8;
  --title-color: #333333;
  --tips-bg: #efefef;
  &.dark{
    --theme-bg: #13131B;
    --text-color: #fff;
    --min-text-color: #8B8B9E;
    --keyboard-bg: #191923;
    --sear-bg: #1E1E2A;
    --sear-border: #33334D;
    --sear-color: #fff;
    --sear-boder:#33334d;
    --error-icon: #2B2A39;
    --sear-border-hover: #33C640;
  }
  --error-icon:#EAEAEA;
  --sear-boder:#eaecee;
  --sear-bg:#F6F6F8;
  --sear-border:#EAECEE;
  --sear-color:#1F1F38;
  --sear-border-hover:#33C640;
  
  
}
:deep(.van-field__control){
  text-align: end;
}

:deep(.van-hairline--bottom:after){
  border: none;
}
:deep(.van-search__field){
  border: 1px solid var(--sear-boder);
  padding: 0 ;
  margin: 0;
  padding-left:0;
  color: var(--sear-color);
  background-color: var(--sear-bg);
  border-radius: 8px;
}
:deep(.van-search__field):hover{
  border: 1px solid var(--sear-border-hover);
}
:deep(.van-search__content){
  background-color: transparent;
}
:deep(.van-search__content){
  padding: 0;
}
:deep(.van-icon , .van-icon-clear , .van-field_clear){
  margin-right: 10px;
}
:deep(.van-search__field .van-field__left-icon){
  margin-left: 10px;
}
:deep(.van-field__control){
  color: var(--sear-color);
}
:deep(.van-nav-bar__title){
  color: var(--text-color);
}

:deep(.van-nav-bar .van-icon){
  color: var(--text-color);
  
}
:deep(.van-nav-bar__title .van-ellipsis){
  color: var(--sear-color);
}
.header{
  color: var(--sear-color);
  --van-search-background: var(--theme-bg);
  --van-nav-bar-background: var(--theme-bg);
  --van-nav-bar-title-text-color: var(--sear-color);
  // --van-nav-bar-title-font-size: 16px;
  // --van-font-bold: 500;
  --van-nav-bar-icon-color: var(--sear-color);
  --van-nav-bar-arrow-size: 24px;
  // --van-border-color: var(--van-theme-color);
  // --van-search-content-background: #fff;
  // --van-field-input-text-color: #B0B0B0;
  // --van-cell-value-color: #B0B0B0;
  --van-field-icon-size: 18px;
  background-color: var(--theme-bg);
}
.list{
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  background-color: var(--theme-bg);
  padding: 0 16px;
  .tips{
    font-size: 14px;
    color: #979797;
    padding: 16px;
    padding-bottom: 0;
  }
  .item{
    background-color: var(--sear-bg);
    border-radius: 8px;
    padding: 0;
    margin: 10px 0;
    width: 100%;
    height: 64px;
    display: flex;
    padding:  0 16px;
    align-items: center;
    box-sizing: border-box;
    &::after{
      display: none;
    }
    :deep(.van-cell__value) {
      text-align: end;
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: flex-end;
    }
    .title{
      font-size: 16px;
      color: var(--sear-color);
      font-weight: 500;
      margin: 0 10px;
    }
    .base{
      background-color: var(--sear-boder);
      width: 80px;
      height: 20px;
      line-height: 20px;
      border-radius: 4px;
      font-size: 12px;
      color: var(--sear-border-hover);
      text-align: center;
    }
    .info{
      font-size: 12px;
      color: var(--info-color);
      line-height: normal;
    }
  }
  .icon{
    width: 38px;
    height: 38px;
    border-radius: 100%;
    // margin-right: 16px;
  }
}
.error-icon {
      display: inline-block;
      width: 38px;
      height: 38px;
      border-radius: 100%;
      overflow: hidden;
      border: 1px solid var(--error-icon);
      display: flex;
      align-items:center;
      justify-content: center;
      img{
        width: 35%;
        height: 35%;
      }
    }
</style>
