<template>
    <div class="status-page">
        <img class="status-icon" src="@/assets/img/Group_427319381@2x.png" alt="">
        <div class="status">{{ t('completed') }}</div>
        <div class="status-msg">{{ t('statusMsg') }}</div>
        <div class="next-btn" @click="onBtnClick()">{{ t('confirm') }}</div>
        <div class="next-btn home" @click="backHome()"
            style="background-color: transparent; border: 1px solid #BDBDBD; color: #333;">{{ t('backHome') }}</div>
    </div>
</template>
<script setup>
import { onBackHome, onReloadNewPay } from '@/utils/bridge'
import useSettingStore from '@/stores/modules/setting'
const settingsStore = useSettingStore()

const route = useRoute()
const { t, locale } = useI18n()

locale.value = route.params.loca
settingsStore.onSetTheme('#' + route.params.color)

const IsPC = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flagPc = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flagPc = false;
            break;
        }
    }
    return flagPc;
}
const onBtnClick = () => {
    if (IsPC()) {
        window.location.replace(localStorage.getItem('indexPath'))
    } else {
        onReloadNewPay()
    }
}

const backHome = () => {
    onBackHome()
}
</script>
<style lang="scss" scoped>
.status-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .status-icon {
        width: 80px;
        height: 80px;
        margin-top: 21px;
    }

    .status {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        margin-top: 8px;
        margin-bottom: 24px;
    }

    .status-msg {
        width: 210px;
        font-size: 14px;
        font-weight: 400;
        color: #C2C2C2;
        line-height: 17px;
        text-align: center;
        margin-bottom: 64px;
    }

    .next-btn {
        background-color: var(--van-theme-color);
        text-align: center;
        color: #fff;
        width: 287px;
        line-height: 44px;
        border-radius: 12px 12px 12px 12px;
        font-size: 16px;
        margin-bottom: 30px;

        &:active {
            opacity: .8;
        }
    }
}

@media (min-width: 820px) {
    .status-page {
        background-color: #fff;
        border-radius: 10px;
        width: 375px;
        height: 666px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .status-icon {
            width: 80px;
            height: 80px;
            margin-top: 21px;
        }

        .status {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            margin-top: 8px;
            margin-bottom: 24px;
        }

        .status-msg {
            width: 210px;
            font-size: 14px;
            font-weight: 400;
            color: #C2C2C2;
            line-height: 17px;
            text-align: center;
            margin-bottom: 64px;
        }

        .next-btn {
            background-color: var(--van-theme-color);
            text-align: center;
            color: #fff;
            width: 287px;
            line-height: 44px;
            border-radius: 12px 12px 12px 12px;
            font-size: 16px;
            margin-bottom: 30px;

            &:active {
                opacity: .8;
            }
        }

        .home {
            display: none;
        }
    }
}
</style>