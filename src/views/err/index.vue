<template>
    <div class="status-page">
        <img class="status-icon" src="@/assets/img/err.png" alt="">
        <div class="status-msg">{{ t('msg.' + code) }}</div>
    </div>
</template>
<script setup>

const route = useRoute()
const { t } = useI18n()

const code = computed(() => route.params.code)

</script>
<style lang="scss" scoped>
.status-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .status-icon {
        width: 188px;
        height: 168px;
        margin-top: 84px;
        padding-left: 20px;
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
        margin-top: 24px;
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
            width: 188px;
            height: 168px;
            margin-top: 84px;
            padding-left: 20px;
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
            margin-top: 24px;
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