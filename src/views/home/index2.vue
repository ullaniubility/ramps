<template>
    <div class="purchase-page">
        <div class="info-container">
            <div class="back-icon">
                <van-icon name="arrow-left" size="26" v-if="route.query.businessId !== '1'" @click="onBack()" />
            </div>
            <!-- <div class="input">
                <div class="num">{{ state.inputValue }}</div>
                <drop-down v-if="state.switch" v-model="state.downValue" @change="onDownChange" :dataList="downList"
                    :option="{ lable: 'lable', value: 'acronym', icon: 'icon' }" />
                <div v-else class="drop-down">
                    <span>{{ state.symbol }}</span>
                </div>
            </div>


            <img @click="onSwitch" class="purchase-icon" src="@/assets/img/Group_427320535.png" alt="">

            <div class="price-show">
                <div class="f"> ≈ </div>
                <div>{{ commInfo.amount }} </div>
                <div class="unit">{{ unitShow }}{{ !state.switch ? `(${state.unitIcon})` : '' }}</div>
            </div> -->

            <div class="select-item">
                <label class="label">{{ t('startpay.pay') }}</label>
                <div class="select" @click="moneyShow = state.switch ? true : false">
                    <span class="amount" :class="{hasValue: state.inputValue > 0}">{{ state.inputValue }}</span>
                    <div class="infos">
                        <div class="icon">
                            <img v-if="state.switch" :src="activeCoin.icon"/>
                            <img v-else src="https://ullafile.oss-cn-chengdu.aliyuncs.com/image/currency/URB.png"/>
                        </div>
                        <div class="name">{{ activeCoin.name }}</div>
                        <div class="right" v-if="state.switch"><img :src="RightIcon"/></div>
                    </div>
                </div>
            </div>

            <!-- <img @click="onSwitch" class="purchase-icon" src="@/assets/img/Group_427320535.png" alt=""> -->

            <div class="select-item" style="margin-bottom: 30px;">
                <label class="label">{{ t('startpay.get') }}</label>
                <div class="select">
                    <span class="amount" :class="{hasValue: state.inputValue > 0}">{{ commInfo.amount }}</span>
                    <div class="infos">
                        <div class="icon" style="position: relative;">
                            <img v-if="activeToken" :src="activeToken.logoUrl"/>
                            <img style="position: absolute;border-radius: 100%; right: -5px;bottom: 0;width: 15px;height: 15px;border: 1px solid white;" v-if="activeToken && activeToken.coinType === 2" :src="activeToken.chainIcon"/>
                        </div>
                        <div class="name MultipleLin">
                            <span>
                                {{ unitShow }}{{ !state.switch ? `(${state.unitIcon})` : '' }}
                            </span>
                            <span>{{ state.net }}</span></div>
                        <div class="right"></div>
                    </div>
                </div>
            </div>
            <!-- <div class="conversion">1 BTC ≈ $24,000.63</div> -->

            <div v-if="commInfo.channelName" class="channel-opt" @click="supplierShow = true">
                <img :src="commInfo.channelIcon" alt="">
                <div class="name">{{ commInfo.channelName }}</div>
                <van-icon name="arrow" size="18" />
            </div>
            <div v-else class="channel-opt">
                <img src="@/assets/img/null.png" alt="">
                <div class="name" style="color: #9A9A9A">{{ t('null') }}</div>
            </div>
        </div>
        <number-keyboard @onKsysChange="onKsysChange">
            <template #footer>
                <div v-if="commInfo.channelName"
                    :class="['next-btn', disabled && 'disabled', state.accordWithDis && 'disabled']" @click="next">
                    <van-loading v-if="showLoading" style="margin-right: 10px" type="spinner" size="24px" />
                    {{ t('next') }}
                </div>
                <div v-else :class="['next-btn', 'disabled']">{{ t('next') }}</div>
            </template>
        </number-keyboard>
        <van-popup position="bottom" style="height: 90vh;border-radius: 10px 10px 0 0; --van-popup-background: #0E0E0E;" v-model:show="moneyShow">
            <Money class="popup" @back="moneyShow = false" :tokenList="downList" @confirm="changeMoney"/>
        </van-popup>
        <van-popup position="bottom" style="height: 90vh;border-radius: 10px 10px 0 0; --van-popup-background: #0E0E0E;" v-model:show="assetsShow">
            <Assets class="popup" @back="assetsShow = false" :tokenList="supportBuyCoin" @confirm="changeAssets"/>
        </van-popup>
        <van-popup position="bottom" style="height: 90vh;border-radius: 10px 10px 0 0; --van-popup-background: #0E0E0E;" v-model:show="supplierShow">
            <Supplier class="popup" @back="supplierShow = false" :tokenList="allChannel" @confirm="changeSupplier"/>
        </van-popup>
    </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue'
import RightIcon from './icons/right.svg'
import http from '@/api'
// import { useI18n } from 'vue-i18n'
import { useMonepay } from './index'

import Money from './popups/money.vue'
import Assets from './popups/assets.vue'
import Supplier from './popups/supplier.vue'

const moneyShow = ref(false)
const assetsShow = ref(false)
const supplierShow = ref(false)
const availableList = ref([])
const supportBuyCoin = ref([])
const availableActive = ref({})
const availableCoin = ref({})
const changeMoney = item => {
    moneyShow.value = false
    // availableActive.value= item
    downValue.value = item.acronym
    onDownChange(item)
    activeCoin.value = downList.value.find(d => {
        return d.acronym === item.acronym
    })
}

const changeSupplier = item => {
    changeChannelIdent(item)
    supplierShow.value = false
}

const downValue = ref()

const activeCoin = ref({})

const allTokens = ref([])

const activeToken = ref(null)

const changeAssets = item => {
    assetsShow.value = false
    availableCoin.value= item
}

onMounted(async () => {
    // 项目默认禁止页面滚动？不动以前逻辑，设置初始化显示方式
    document.body.style.overflow = 'initial'
    // getAvailableList()
    // getSupportBuyCoin()
    // FetchRate()
    // onGetInfo()
    downValue.value = state.downValue
    // activeCoin.value = downList.value.find(item => {
    //     return item.acronym === state.downValue
    // })

    const res = await http.post('/token/chainBaseToken', {}, {
        baseURL: import.meta.env.VITE_APP_WALLET_API_BASEURL
    })

    allTokens.value = (res.data || []).map(item => item.tokens).flat()
    activeToken.value = allTokens.value.find(item => {
        return item.net === state.net && item.symbol === state.symbol
    })
})

const getAvailableList = async () => {
    try {
        const res = await http.get('/sysRate/getAvailableList')
        availableList.value = res.data
        availableActive.value = res.data[0]
    } catch (error) {

    }
}

const getSupportBuyCoin = async () => {
    try {
        const res = await http.get('/sysChannel/getSupportBuyCoin')
        supportBuyCoin.value = res.data
        availableCoin.value = res.data[0]
    } catch (error) {

    }
}

onUnmounted(() => {
    // 还原页面滚动方式
    document.body.style.overflow = ''
})

const FetchRate = async () => {
    const res = await http.post('/exchange/pairs/getHashRatedetails', {
        symbols: 'ETH'
    }, {
        baseURL: '/'
    })
}

const {
    t,
    showLoading,
    downList,
    state,
    unitShow,
    outGetInfo,
    onKsysChange,
    onDownChange,
    changeChannelIdent,
    onSwitch,
    commInfo,
    allChannel,
    commParams,
    accordWithPrc,
    onGetInfo,
    onProcessParam,
    routerSwitch,
    changeInpputValue,
    disabled,
    next,
    onBack,
    route } = useMonepay()
</script>

<style lang="scss" scoped>
.purchase-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    --van-background-2: #0E0E0E;
    background-color: var(--van-background-2);
    .back-icon {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info-container{
        flex: 1;
    }

    :deep(.number-keyboard) {
        position: static;
    }

    .input {
        width: 330px;
        height: 30px;
        border-radius: 10px 10px 10px 10px;
        opacity: 1;
        border: 1px solid var(--van-theme-color);
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        padding-left: 10px;
        // padding-right: 10px;
        font-size: 18px;
        margin-top: 10px;
        background: #FBFBFC;

        .num {
            width: 230px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .drop-down {
            min-width: 47px;
            height: 20px;
            padding: 5px;
            background: var(--van-theme-color) url('https://ullafile.oss-cn-chengdu.aliyuncs.com/image/currency/URB.png') no-repeat;
            background-size: 20px 20px;
            background-position: 5px 5px;
            padding-left: 30px;
            border-radius: 5px 5px 5px 5px;
            color: #fff;
            font-size: 12px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .purchase-icon {
        width: 41px;
        height: 41px;
        display: block;
        margin: auto;
        margin-top: 13px;
        margin-bottom: 16px;

        &:active {
            opacity: .8;
        }
    }

    .price-show {
        height: 30px;
        font-size: 30px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 30px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-wrap: wrap;

        .f {
            font-size: 20px;
            margin-right: 5px;
        }

        .unit {
            font-size: 18px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #555555;
            line-height: 20px;
            margin-left: 5px;
        }
    }

    .next-btn {
        // background-color: var(--van-theme-color);
        background-image: linear-gradient(180deg, #6C6C6C 0%, rgba(42,41,46,0) 100%);;
        text-align: center;
        color: #FEFEFE;
        width: 287px;
        line-height: 44px;
        border-radius: 12px 12px 12px 12px;
        font-size: 16px;
        margin: auto;
        margin-bottom: 42px;
        margin-top: 38px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:active {
            opacity: .8;
        }

        &.disabled {
            opacity: .6;
        }
    }

    .channel-opt {
        display: flex;
        justify-content: space-between;
        padding-left: 32px;
        padding-right: 16px;
        box-sizing: border-box;
        // width: 359px;
        height: 55px;
        border-radius: 10px 10px 10px 10px;
        // border: 1px solid #E5E5E5;
        align-items: center;
        margin: 0 18px;
        margin-bottom: 26px;
        background-color: #2D2D2D;

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
            color: white;
            line-height: 30px;
        }
        .van-icon-arrow{
            color: white;
        }
    }

    :deep(.number-keyboard){
        .keyboard .key-item{
            background-color: #2E2E2E;
            color: white;
            img{
                content: url('./icons/backspace.svg');
            }
        }
    }
}

@media (min-width: 820px) {
    .purchase-page {
        width: 375px;
        height: 666px;
        background-color: #fff;
        border-radius: 10px;
        position: relative;

        .back-icon {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .input {
            width: 330px;
            height: 30px;
            border-radius: 10px 10px 10px 10px;
            opacity: 1;
            border: 1px solid var(--van-theme-color);
            margin: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px;
            padding-left: 10px;
            font-size: 18px;
            margin-top: 10px;
            background: #FBFBFC;

            .num {
                width: 230px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .drop-down {
                min-width: 47px;
                height: 20px;
                padding: 5px;
                background: var(--van-theme-color) url('@/assets/img/home_icon_bnb.png') no-repeat;
                background-size: 20px 20px;
                background-position: 5px 5px;
                padding-left: 30px;
                border-radius: 5px 5px 5px 5px;
                color: #fff;
                font-size: 12px;
                line-height: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        .purchase-icon {
            width: 41px;
            height: 41px;
            display: block;
            margin: auto;
            margin-top: 13px;
            margin-bottom: 16px;

            &:active {
                opacity: .8;
            }
        }

        .price-show {
            height: 30px;
            font-size: 30px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #333333;
            line-height: 30px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            flex-wrap: wrap;

            .f {
                font-size: 20px;
                margin-right: 5px;
            }

            .unit {
                font-size: 18px;
                font-family: PingFang SC-Semibold, PingFang SC;
                font-weight: 600;
                color: #555555;
                line-height: 20px;
                margin-left: 5px;
            }
        }

        .next-btn {
            background-color: var(--van-theme-color);
            text-align: center;
            color: #fff;
            width: 287px;
            line-height: 44px;
            border-radius: 12px 12px 12px 12px;
            font-size: 16px;
            margin: auto;
            margin-bottom: 42px;
            margin-top: 38px;
            display: flex;
            justify-content: center;
            align-items: center;

            &:active {
                opacity: .8;
            }

            &.disabled {
                opacity: .6;
            }
        }

        .channel-opt {
            display: flex;
            justify-content: space-between;
            padding-left: 32px;
            padding-right: 16px;
            box-sizing: border-box;
            width: 359px;
            height: 68px;
            border-radius: 10px 10px 10px 10px;
            border: 1px solid #E5E5E5;
            align-items: center;
            margin: auto;
            margin-bottom: 26px;

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
                color: #333333;
                line-height: 30px;
            }
        }
    }
}
.select-item{
    padding: 0 18px;
    box-sizing: border-box;
    // width: 359px;
    // margin: auto;
    margin-bottom: 30px;
    .label{
        color: #979797;
        font-size: 14px;
    }
    .select{
        background: linear-gradient(135deg, #2E2E2E 0%, #0E0E0E 100%);
        border-radius: 10px;
        padding: 17px 10px;
        padding-right: 15px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 9px;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        overflow: hidden;
        position: relative;
        height: 60px;
        .infos{
            display: flex;
            align-items: center;
            .icon{
                width: 30px;
                height: 30px;
                border-radius: 100%;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }
            .name{
                color: white;
                font-size: 16px;
                font-weight: 500;
                display: block;
                margin: 0 10px;
                &.MultipleLin{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    span{
                        &:last-child{
                            color: #BDBDBD;
                            font-size: 12px;
                            display: block;
                            margin-top: 4px;
                        }
                    }
                }
            }
            .right{
                width: 16px;
                height: 16px;
            }
        }
        .amount{
            color: white;
            font-size: 20px;
            font-weight: 500;
            border: 1px solid #fff;
            // &.hasValue{
            //     color: #333333;
            // }
        }
    }
}
.conversion{
    font-size: 14px;
    color: #979797;
    margin-top: 10px;
    margin-bottom: 30px;
    padding: 0 18px;
}
.popup{
    --item-bg: #181818;
    --info-color: #FFFFFF;
    --title-color: #FFFFFF;
    --tips-bg: #2B2B2B;
    --van-search-background: #2D2D2D;

    :deep(.header) {
        --van-search-content-background: #2D2D2D;
        --van-nav-bar-background: #1C1C1C;
        --van-search-background: #1C1C1C;
        --van-border-color: #1C1C1C;
    }

}
</style>
