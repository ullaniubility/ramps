<template>
  <div class="supplier-page">
    <div class="supplier-item" v-for="(e, i) in commInfo" :key="i" @click="onItemClick(e)">
      <img :src="e.channelIcon" alt="">
      <div class="name">
        <div>{{ e.channelName }}</div>
        <div class="err">{{ e.errMsg }}</div>
      </div>
      <div class="info">
        <div>{{ e.amount }} {{ routerParams.fiat2Token ? routerParams.symbol : routerNext.unit }}</div>
        <div class="optimum" v-if="(i === 0)">{{ t("bestRate") }}</div>
      </div>
    </div>
  </div>
  <group-loading v-if="showLoading" />
</template>
<script setup>
import { useMonepay } from './index'

const {
  t,
  route,
  routerParams,
  routerNext,
  showLoading,
  commInfo,
  onGetInfo,
  onItemClick
} = useMonepay()
</script>
<style lang="scss" scoped>
.supplier-page {
  padding: 0 16px;
  background-color: #0E0E0E;
  height: 100vh;

  .supplier-item {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #3D3D3D;

    &:active {
      opacity: .8;
    }

    img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }

    .name {
      flex: 1;
      font-size: 16px;
      margin-left: 11px;
      font-weight: 500;
      color: #fff;
      line-height: 19px;

      .err {
        font-size: 10px;
        color: #FFFFFF;
      }
    }

    .info {
      font-size: 16px;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      color: #FFFFFF;

      .optimum {
        width: 80px;
        text-align: center;
        line-height: 20px;
        background: #FFBE3D;
        border-radius: 4px 4px 4px 4px;
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: 5px;
      }
    }
  }
}

@media (min-width: 820px) {
  .supplier-page {
    padding: 0 16px;
    background-color: #0E0E0E;
    border-radius: 10px;
    width: 375px;
    height: 666px;
    box-sizing: border-box;

    .supplier-item {
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #3D3D3D;

      &:active {
        opacity: .8;
      }

      img {
        width: 34px;
        height: 34px;
        border-radius: 50%;
      }

      .name {
        flex: 1;
        font-size: 16px;
        margin-left: 11px;
        font-weight: 500;
        color: #fff;
        line-height: 19px;

        .err {
          font-size: 10px;
          color: #FFFFFF;
        }
      }

      .info {
        font-size: 16px;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .optimum {
          width: 80px;
          text-align: center;
          line-height: 20px;
          background: #FFBE3D;
          border-radius: 4px 4px 4px 4px;
          font-size: 12px;
          font-weight: 400;
          color: #FFFFFF;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>