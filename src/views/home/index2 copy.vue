<template>
    <div class="main">
        <div class="header">
            <div class="left"></div>
            <div class="switch" @click="onSwitch">{{ t('switch') }}</div>
        </div>
        <div class="wallet">
            <div class="logo">
                <img src="@/assets/img/Group_427320641@2x.png" alt="">
                <div>ULLA Wallet</div>
            </div>

            <div class="price">
                <span class="num">
                    {{ commInfo.amount }}
                <span class="unit">{{ unitShow }}{{ !state.switch ? `(${state.unitIcon})` : '' }}</span>
                </span>
            </div>
            <div class="block"></div>

            <div class="input">
                <input v-model="state.inputValue" type="number" @change="() => outGetInfo()">
                <drop-down class="down" v-if="state.switch" v-model="state.downValue" @change="onDownChange"
                    :dataList="downList" :option="{ lable: 'lable', value: 'acronym', icon: 'icon' }" />
                <div v-else class="drop-down">
                    <img src="https://ullafile.oss-cn-chengdu.aliyuncs.com/image/currency/URB.png" alt="">
                    <span>{{ state.symbol }}</span>
                </div>
            </div>
        </div>

        <div v-if="commInfo.channelName" class="channel-opt" @click="routerSwitch('/blackSupplier')">
            <img :src="commInfo.channelIcon" alt="">
            <div class="name">{{ commInfo.channelName }}</div>
            <van-icon name="arrow" size="18" />
        </div>

        <div v-if="commInfo.channelName"
            :class="['next-btn', disabled && 'disabled', state.accordWithDis && 'disabled']" @click="next">
            <van-loading v-if="showLoading" style="margin-right: 10px" type="spinner" size="24px" />
            {{ t('next') }}
        </div>
        <div v-else :class="['next-btn', 'disabled']">{{ t('next') }}</div>
    </div>
</template>
<script setup>
import { useMonepay } from './index'

const {
    t,
    showLoading,
    downList,
    state,
    unitShow,
    outGetInfo,
    onKsysChange,
    onDownChange,
    onSwitch,
    commInfo,
    commParams,
    accordWithPrc,
    onGetInfo,
    onProcessParam,
    routerSwitch,
    disabled,
    next,
    onBack,
    route } = useMonepay()
</script>
<style scoped lang="scss">
.main {
    background-color: #0E0E0E;
    height: 100vh;

    .header {
        display: flex;
        justify-content: space-between;
        padding: 20px 16px;
        padding-top: 45px;

        .switch {
            padding: 0 18px;
            line-height: 24px;
            background: linear-gradient(103deg, #AFAFAF 0%, #292929 100%);
            border-radius: 13px;
            opacity: 1;
            color: #fff;
        }
    }

    .wallet {
        width: 338px;
        height: 245px;
        background: linear-gradient(135deg, #2E2E2E 0%, #0E0E0E 100%);
        border-radius: 10px;
        opacity: 1;
        border: 1px solid;
        border-image: rgba(255, 255, 255, 0.5);
        margin: auto;
        margin-top: 30px;
        padding: 17px 19px;
        box-sizing: border-box;
        color: #fff;

        .logo {
            display: flex;
            align-items: center;

            img {
                width: 26px;
                height: 26px;
            }

            div {
                font-size: 16px;
                font-family: Poppins-Medium, Poppins;
                font-weight: 500;
                color: #CACACA;
                line-height: 20px;
                margin-left: 10px;
            }
        }

        .price {
            text-align: center;
            height: 30px;
            font-size: 30px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #CACACA;
            line-height: 30px;
            margin-top: 43px;
            // padding-right: 20px;
            display: flex;
            align-items: center;
            justify-content: center;

            .num {
                // position: relative;
                display: flex;
                align-items: center;
                &::before {
                    content: '≈ ';
                    font-size: 20px;
                    // position: absolute;
                    left: -24px;
                    top: 8px;
                    margin-right: 4px;
                }

                .unit {
                    // position: absolute;
                    font-size: 16px;
                    right: -55px;
                    bottom: 1px;
                    display: inline-block;
                    margin-left: 4px;
                }
            }
        }

        .block {
            width: 308px;
            height: 1px;
            background: linear-gradient(225deg, #d9d9d900 0%, #D9D9D9 50%, #d9d9d900 100%);
            opacity: 1;
            margin: auto;
            margin-top: 50px;
        }

        .input {
            width: 300px;
            height: 37px;
            background: linear-gradient(265deg, #1C1C1C 0%, #323232 100%);
            box-shadow: 0px 4px 12px 0px rgba(27, 27, 27, 0.9), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
            border-radius: 19px 19px 19px 19px;
            opacity: 1;
            margin: auto;
            margin-top: 18px;
            display: flex;
            align-items: center;
            box-sizing: border-box;

            input {
                background-color: transparent;
                border: 0;
                margin-left: 18px;
                font-size: 18px;
                font-family: Rubik-Regular, Rubik;
                font-weight: 400;
                color: #FFFFFF;
                width: 188px;
            }

            .drop-down {
                min-width: 77px;
                height: 20px;
                padding: 5px;
                background: var(--van-theme-color) url('https://ullafile.oss-cn-chengdu.aliyuncs.com/image/currency/URB.png') no-repeat;
                background-size: 20px 20px;
                background-position: 5px 5px;
                border-radius: 5px 5px 5px 5px;
                color: #fff;
                font-size: 12px;
                line-height: 20px;
                display: flex;
                align-items: center;
                background: linear-gradient(180deg, #9A9A9A 0%, #353535 100%);
                border-radius: 15px 15px 15px 15px;

                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 6px;
                }
            }
        }
    }

    .channel-opt {
        display: flex;
        justify-content: space-between;
        padding-left: 22px;
        padding-right: 16px;
        box-sizing: border-box;
        width: 338px;
        height: 64px;
        border-radius: 10px 10px 10px 10px;
        border: 1px solid #E5E5E5;
        align-items: center;
        margin: auto;
        margin-bottom: 26px;
        margin-top: 32px;
        background: #2D2D2D;

        img {
            border-radius: 50%;
            width: 34px;
            height: 34px;
        }

        .name {
            margin-left: 12px;
            flex: 1;
            font-size: 18px;
            font-weight: 500;
            color: #fff;
            line-height: 30px;
        }
    }

    .next-btn {
        background: linear-gradient(180deg, #6C6C6C 0%, rgba(42, 41, 46, 0) 100%);
        text-align: center;
        color: #fff;
        width: 287px;
        line-height: 44px;
        border-radius: 12px 12px 12px 12px;
        font-size: 16px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 30px;
        left: calc((375px - 287px) / 2);

        &:active {
            opacity: .8;
        }

        &.disabled {
            opacity: .6;
        }
    }
}

@media (min-width: 820px) {
    .main {
        background-color: #0E0E0E;
        width: 375px;
        height: 666px !important;
        border-radius: 10px;
        position: relative;

        .header {
            display: flex;
            justify-content: space-between;
            padding: 20px 16px;

            .switch {
                padding: 0 18px;
                line-height: 24px;
                background: linear-gradient(103deg, #AFAFAF 0%, #292929 100%);
                border-radius: 13px;
                opacity: 1;
                color: #fff;
                font-size: 12px;
            }
        }

        .wallet {
            width: 338px;
            height: 245px;
            background: linear-gradient(135deg, #2E2E2E 0%, #0E0E0E 100%);
            border-radius: 10px;
            opacity: 1;
            border: 1px solid;
            border-image: rgba(255, 255, 255, 0.5);
            margin: auto;
            margin-top: 30px;
            padding: 17px 19px;
            box-sizing: border-box;
            color: #fff;

            .logo {
                display: flex;
                align-items: center;

                img {
                    width: 26px;
                    height: 26px;
                }

                div {
                    font-size: 16px;
                    font-family: Poppins-Medium, Poppins;
                    font-weight: 500;
                    color: #CACACA;
                    line-height: 20px;
                    margin-left: 10px;
                }
            }

            .price {
                text-align: center;
                height: 30px;
                font-size: 30px;
                font-family: PingFang SC-Semibold, PingFang SC;
                font-weight: 600;
                color: #CACACA;
                line-height: 30px;
                margin-top: 43px;
                padding-right: 20px;

                .num {
                    position: relative;

                    &::before {
                        content: '≈ ';
                        font-size: 20px;
                        position: absolute;
                        left: -24px;
                        top: 8px;
                    }

                    .unit {
                        position: absolute;
                        font-size: 16px;
                        right: -55px;
                        bottom: 1px;
                    }
                }
            }

            .block {
                width: 308px;
                height: 1px;
                background: linear-gradient(225deg, #d9d9d900 0%, #D9D9D9 50%, #d9d9d900 100%);
                opacity: 1;
                margin: auto;
                margin-top: 50px;
            }

            .input {
                width: 300px;
                height: 37px;
                background: linear-gradient(265deg, #1C1C1C 0%, #323232 100%);
                box-shadow: 0px 4px 12px 0px rgba(27, 27, 27, 0.9), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                border-radius: 19px 19px 19px 19px;
                opacity: 1;
                margin: auto;
                margin-top: 18px;
                display: flex;
                align-items: center;
                box-sizing: border-box;

                input {
                    background-color: transparent;
                    border: 0;
                    margin-left: 18px;
                    font-size: 18px;
                    font-family: Rubik-Regular, Rubik;
                    font-weight: 400;
                    color: #FFFFFF;
                    width: 188px;
                }

                .drop-down {
                    min-width: 77px;
                    height: 20px;
                    padding: 5px;
                    background: var(--van-theme-color) url('https://ullafile.oss-cn-chengdu.aliyuncs.com/image/currency/URB.png') no-repeat;
                    background-size: 20px 20px;
                    background-position: 5px 5px;
                    border-radius: 5px 5px 5px 5px;
                    color: #fff;
                    font-size: 12px;
                    line-height: 20px;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(180deg, #9A9A9A 0%, #353535 100%);
                    border-radius: 15px 15px 15px 15px;

                    img {
                        width: 20px;
                        height: 20px;
                        margin-right: 6px;
                    }
                }
            }
        }

        .channel-opt {
            display: flex;
            justify-content: space-between;
            padding-left: 22px;
            padding-right: 16px;
            box-sizing: border-box;
            width: 338px;
            height: 64px;
            border-radius: 10px 10px 10px 10px;
            border: 1px solid #E5E5E5;
            align-items: center;
            margin: auto;
            margin-bottom: 26px;
            margin-top: 32px;
            background: #2D2D2D;

            img {
                border-radius: 50%;
                width: 34px;
                height: 34px;
            }

            .name {
                margin-left: 12px;
                flex: 1;
                font-size: 18px;
                font-weight: 500;
                color: #fff;
                line-height: 30px;
            }
        }

        .next-btn {
            background: linear-gradient(180deg, #6C6C6C 0%, rgba(42, 41, 46, 0) 100%);
            text-align: center;
            color: #fff;
            width: 287px;
            line-height: 44px;
            border-radius: 12px 12px 12px 12px;
            font-size: 16px;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: 30px;
            left: calc((375px - 287px) / 2);

            &:active {
                opacity: .8;
            }

            &.disabled {
                opacity: .6;
            }
        }
    }
}
</style>
<style lang="scss">
.down {
    .drop-down {
        background: linear-gradient(180deg, #9A9A9A 0%, #353535 100%);
        border-radius: 15px 15px 15px 15px;
    }

    .down-item {
        color: #B9B9B9;

        &.active {
            background-color: #F2F2F2 !important;
            color: #0E0E0E;
        }
    }
}

@media (min-width: 820px) {
    .down {
        .drop-down {
            background: linear-gradient(180deg, #9A9A9A 0%, #353535 100%);
            border-radius: 15px 15px 15px 15px;
        }

        .down-item {
            color: #B9B9B9;

            &.active {
                background-color: #F2F2F2 !important;
                color: #0E0E0E;
            }
        }
    }
}
</style>
