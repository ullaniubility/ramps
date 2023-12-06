<template>
    <van-config-provider :theme="themeType">
        <!-- <main class="main" :class="{ ios: isIOS }" :style="'--main-color: #' + (route.query.theme || '2EBC84')"> -->
        <main class="main" :class="route.query.isDark === 'dark' ? 'dark direction' : ''">
            <div class="back-icon">
                <!-- <van-icon name="arrow-left" size="26"  @click="onBack()" /> -->
                <van-icon class="icon-left" v-if="route.query.businessId !== '1'"
                            :name="localeId == 'ar' || localeId == 'fa' || localeId == 'ur' ? 'arrow' : 'arrow-left'" size="20" @click="onBack()"></van-icon>
            </div>
            <div class="number">
                <div class="title">
                    {{ t('startpay.pay') }}
                    <div class="dalance" v-if="false">
                        <van-icon name="card" size="18" color="#7E7E7E" />
                        <span v-if="availableCoin.balance" style="margin-left: 10px;color:#7E7E7E ;">{{
                            availableCoin.balance
                        }}</span>
                        <van-loading v-else color="#C7C7C7" size="14" />
                    </div>
                </div>
                <label class="assets" >
                    <div class="info" style="flex: 1; display: flex; height: 100%">
                        <input readonly class="num" v-model="num" is="ui-input" inputmode="decimal"
                            :placeholder="t('startpay.sell')" />
                    </div>

                    <!-- 选择法币 -->
                    <div class="moneyInfo"  v-if="currencyLoad == false" @click="moneyShow = true">
                        <img :src="activeCoin.logo" />
                        <span>
                            {{
                                activeCoin.symbol
                            }}
                        </span>
                        <van-icon class="icon-left"
                            :name="localeId == 'ar' || localeId == 'fa' || localeId == 'ur' ? 'arrow-left' : 'arrow'" size="20"></van-icon>
                    </div>
                    <van-loading v-if="currencyLoad == true" color="#C7C7C7" />
                    <!-- 选择法币 -->
                </label>
            </div>

            <div class="number">
                <div class="title">{{ t('startpay.get') }}</div>
                <div class="assets">
                    <div class="info">
                        <input class="num" readonly :value="selectChannel && selectChannel.amount"
                            :placeholder="t('startpay.get')" />
                    </div>

                    <!-- 选择资产 -->
                    <div class="symbol" v-if="supportBuyCoinLoad == false" @click="assetsShow = true">
                        <div class="icon-box">
                            <img class="icon" :src="availableCoin.projectLogo" />
                            <div v-for="(item2, index) in tokensList">
                                <img v-if="availableCoin.coinType == 2 && item2.chainCode == availableCoin.net"
                                :class="localeId == 'ar' || localeId == 'fa' || localeId == 'ur'?'icon-min-left': 'icon-min'" :src="item2.iconUrl" />
                            </div>
                        </div>
                        <div class="symbol-text">
                            <span>{{ availableCoin.symbol }}</span>
                            <span v-if="availableCoin.coinType == 2" class="sub">{{ availableCoin.net }}</span>
                        </div>
                        <van-icon class="icon-right"
                            :name="localeId == 'ar' || localeId == 'fa' || localeId == 'ur' ? 'arrow-left' : 'arrow'" size="20"></van-icon>
                    </div>
                    <van-loading v-if="supportBuyCoinLoad == true" color="#C7C7C7" />
                </div>
                <!-- 选择资产 -->
            </div>

            <div class="tips" v-if="supportBuyCoin.length != 0">
                {{ selectChannel?.buyEachTimeMin > num ? t('min', { min: formatDecimal(selectChannel?.buyEachTimeMin, 2) }) : ``
                }}
            </div>
            <div class="tips" v-if="supportBuyCoin.length != 0">
                {{ selectChannel?.buyEachTimeMax < num ? t('max', { max: formatDecimal(selectChannel?.buyEachTimeMax, 2) }) : ``
                }} </div>
                    <!-- 供应商 -->
                    <div class="supplier" @click="() => {
                            allChannel.length != 0 ? supplierShow = true : ''
                        }">
                        <div v-if="loading == false" style="width: 100%;">
                            <div class="info" v-if="allChannel.length == 0">
                                <img src="@/assets/img/null.png" alt="">
                                <span class="empty name">{{ t('startpay.supplier.empty') }}</span>
                            </div>
                            <div v-else class="box2">
                                <div class="info">
                                    <img :src="selectChannel.channelIcon" />
                                    <span class="name">{{ selectChannel.channelName }}</span>
                                </div>
                                <van-icon class="icon-right"
                            :name="localeId == 'ar' || localeId == 'fa' || localeId == 'ur' ? 'arrow-left' : 'arrow'" size="20"></van-icon>
                            </div>
                        </div>
                        <van-loading v-if="loading" color="#C7C7C7" />
                    </div>

                    <!-- 供应商 -->

                    <!-- 货币 -->
                    <van-popup position="bottom" class="MoneyBox" style="height: 90vh; border-radius: 10px 10px 0 0"
                        v-model:show="moneyShow">
                        <Money class="popup" v-model:isDark="route.query.isDark" @back="moneyShow = false"
                            :tokenList="currency" @confirm="changeMoney" />
                    </van-popup>
                    <!-- 资产 -->
                    <van-popup position="bottom" class="MoneyBox" style="height: 90vh;border-radius: 10px 10px 0 0;"
                        v-model:show="assetsShow">
                        <Assets v-model:isDark="route.query.isDark" @back="assetsShow = false" :tokenList="supportBuyCoin"
                            @confirm="changeAssets" />
                    </van-popup>
                    <!-- 供应商 -->
                    <van-popup position="bottom" class="MoneyBox" style="height: 90vh; border-radius: 10px 10px 0 0"
                        v-model:show="supplierShow">
                        <Supplier class="popup" v-model:isDark="route.query.isDark" @back="supplierShow = false"
                            :tokenList="allChannel" @confirm="changeSupplier" />
                    </van-popup>

                    <number-keyboard v-model:isDark="route.query.isDark" @onKsysChange="onKsysChange">

                        <template #footer>
                            <van-button :loading="loading" :disabled="disabled"
                                :class="['next-button', disabled && 'disabled']" @click="next">{{
                                    t('next')
                                }}</van-button>
                        </template>
                    </number-keyboard>
        </main>
    </van-config-provider>
</template>
  
<script setup>
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { formatDecimal, tokensList } from '@/utils/index'
import { getAssetList, getCurrency } from '@/api/business'
import Money from '@/views/home/popups/money.vue'
import Assets from '@/views/home/popups/assets.vue'
import Supplier from '@/views/home/popups/supplier.vue'
import { showToast } from 'vant';
import { computed } from 'vue'
import useSettingStore from '@/stores/modules/setting'

const settingsStore = useSettingStore()
const { localeId } = storeToRefs(settingsStore)
const { t } = useI18n()
const route = useRoute()

const supportBuyCoinLoad = ref(true)
const currencyLoad = ref(true)
const keyshow = ref(false)
const loading = ref(false)
const fistLoading = ref(false)
// const collapse = ref(['1'])
const isIOS = ref(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)

const themeType = ref(route.query.dark == 1 ? 'dark' : 'light') //dark | light

const selectChannel = ref(null)
const supplierShow = ref(false)
const moneyShow = ref(false)
const assetsShow = ref(false)
const num = ref(route.query.defaultAmount || 100)
const sourceFiatCurrency = ref({})

//新代码
/**获取URL参数 */
const supportBuyCoin = ref([])//资产列表
const currency = ref([])//法币列表
const urlData = ref({})
const availableCoin = ref({ symbol: 'USDC', net: 'ETH', projectLogo: 'https://ossimg.ullapay.com/5/2f4570aa363645799223317831b688b4.png', coinType: 2 })//资产
const activeCoin = ref({})//法币
const params = ref({})//渠道参数
const allChannel = ref([])//渠道列表
function getQuery() {
    urlData.value.inputValue = route.query.defaultAmount || '100'
    const address = urlData.value.address.split(',')
    const net = urlData.value.net.split(',')
    urlData.value.addressList = []
    address.forEach((element, index) => {
        console.log(element)
        urlData.value.addressList.push({ address: element, net: net[index] })
    });
    //获取资产
    getSupportBuyCoin({ addressList: urlData.value.addressList, buyFlag: 1 })

}
//获取法币列表

const getCurrencyList = () => {
    getCurrency().then(res => {
        if (res.code) {
            currency.value = res.data
            activeCoin.value = currency.value[0]
            params.value = {
                address: availableCoin.value.walletAddress,//地址
                fiat2Token: true,//买true 卖false
                net: availableCoin.value.net,
                sourceFiatCurrency: activeCoin.value.symbol,//法币选择
                sourceValue: num.value,
                symbol: availableCoin.value.symbol
            }
            currencyLoad.value=false
        } else {
            currency.value=[]
            activeCoin.value = { name: 'USD', icon: 'https://ossimg.ullapay.com/5/ac1db2184ef34be4aa5ed72878435bb0.png' }
            currencyLoad.value=false
        }

    }).catch(() => {
        currencyLoad.value=false
        currency.value=[]
  })
}

//获取资产列表
const getSupportBuyCoin = (val) => {
    console.log(val, '传参数')
    getAssetList(val).then(res => {
        const data = res.data
        data.forEach((item) => {
            if (item.balance != 0) {
                supportBuyCoin.value.push(item)
            }
        })
        availableCoin.value = supportBuyCoin.value[0]
        params.value = {
            address: availableCoin.value.walletAddress,//地址
            fiat2Token: true,//买true 卖false
            net: availableCoin.value.net,
            sourceFiatCurrency: activeCoin.value.symbol,//法币选择
            sourceValue: num.value,
            symbol: availableCoin.value.symbol
        }
        supportBuyCoinLoad.value=false
        if (num.value) {
            numChange() //获取渠道列表
        }
    }).catch(() => {
        supportBuyCoin.value=[]
        loading.value = false
        supportBuyCoinLoad.value=false
    })
}
//选择资产
const changeAssets = item => {
    assetsShow.value = false
    availableCoin.value = item
    params.value = {
        address: availableCoin.value.walletAddress,//地址
        fiat2Token: true,//买true 卖false
        net: availableCoin.value.net,
        sourceFiatCurrency: activeCoin.value.symbol,//法币选择
        sourceValue: num.value,
        symbol: availableCoin.value.symbol
    }
    numChange()
}

//选择法币
const changeMoney = item => {
    moneyShow.value = false
    activeCoin.value = item
    params.value = {
        address: availableCoin.value.walletAddress,//地址
        fiat2Token: true,//买true 卖false
        net: availableCoin.value.net,
        sourceFiatCurrency: activeCoin.value.symbol,//法币选择
        sourceValue: num.value,
        symbol: availableCoin.value.symbol
    }
    numChange()
}
onMounted(() => {
    urlData.value = route.query
    getQuery()//获取路由参数
    getCurrencyList()//获取法币列表

})
//新代码

// 键盘事件
const onKsysChange = (key) => {
    const val = num.value
    // if (!val) {
    //     return
    // }

    if (key !== 'del') {
        // 输入
        // 如果输入的是小数点
        if (key === '.') {
            // 如果已经存在小数点，就不让再次输入小数点
            if (val.indexOf('.') != -1) {
                return
            }
        }
        // 如果首位是0
        if (num.value[0] === '0' && num.value[1] !== '.') {
            // 再次输入0
            if (key === '0') {
                return
            } else {
                if (key !== '.') {
                    // 输入别的数字
                    num.value = val.slice(1, val.length)
                    num.value = num.value + key
                    numChange()
                    return
                }
            }
        }
        num.value = val + key
    } else {
        // 删除
        num.value = val.toString().slice(0, -1)
        console.log(num.value)
        if (num.value === '') {
            num.value = 0
        }
    }
    params.value = {
        address: availableCoin.value.walletAddress,//地址
        fiat2Token: true,//买true 卖false
        net: availableCoin.value.net,
        sourceFiatCurrency: activeCoin.value.symbol,//法币选择
        sourceValue: num.value,
        symbol: availableCoin.value.symbol
    }
    numChange()
}

onMounted(() => {
    if (num.value) {
        numChange()
    }
    document.body.style.overflow = 'initial'
    // sourceFiatCurrency.value = downList.value[0]
})

onUnmounted(() => {
    // 还原页面滚动方式
    document.body.style.overflow = ''
})

const disabled = computed(() => {
    return !num.value || loading.value
})



const changeSupplier = (val) => {
    selectChannel.value = val
    supplierShow.value = false
}

//获取渠道
let onGetInfoCancel
const onGetInfo = async () => {
    // 始终取消之前的请求否则会导致问题
    if (onGetInfoCancel) {
        onGetInfoCancel()
    }
    const CancelToken = axios.CancelToken
    fistLoading.value = true
    loading.value = true
    try {
        const { code, data } = await http.get('/api/v1/payChannel/allChannelEstimateFee', params.value, {
            cancelToken: new CancelToken(function executor(c) {
                onGetInfoCancel = c
            }),
        })
        if (code == 200 && data) {
            selectChannel.value = data[0]
            allChannel.value = data
            if (data.length == 0) {
                showToast(t('null'))
            }

        }
    } catch (error) {
        console.log(error)
    }
    fistLoading.value = false
    loading.value = false
}

function debounce(fn, delay) {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

const numChange = debounce(() => {
    onGetInfo()
}, 600)

const next = async () => {
    if (num.value <= 0 || !num.value) {
        return
    }
    loading.value = true

    setTimeout(() => (loading.value = false), 5000)
    try {
        const channelInfo = selectChannel.value

        // selectChannel渠道 activeCoin法币 availableCoin资产
        const { code, data } = await http.post('/api/v1/order/create', {
            channelIdent: channelInfo.channelIdent,//渠道标识-渠道唯一的标识
            conversionPrice: channelInfo.conversionPrice,//换算价格，即虚拟币的实时价格-渠道费用计算会返回该值
            currency: activeCoin.value.symbol,//金额种类
            currencyAcronym: activeCoin.value.symbol,//币种缩写
            currencyLogo: activeCoin.value.logo,//币种logo
            currencyUnit: activeCoin.value.unit,//	币种单位
            // fromAddress: "",//钱包地址-卖必传-买不传
            inputValue: num.value,//inputValue
            localeId: urlData.value.language,//语言
            net: availableCoin.value.net,//链的net
            // reUrl: "",//订单支付后(仅支付，并不是完成)跳转的URL-部分支付渠道支持
            symbol: availableCoin.value.symbol,//symbol
            symbolLogo: availableCoin.value.projectLogo,//代币logo
            toAddress: availableCoin.value.coinType == 2 ? availableCoin.value.contractAddress : availableCoin.value.walletAddress,//钱包地址
            tokenAmount: channelInfo.amount,//预计到账金额
            type: "buy"//	购买类型:buy买 sell卖
        })

        if (code == 200) {
            window.location.href = data.url
        }
    } catch (error) {
        console.log(error)
    }
}
const onBack = (url = 'https://h5.iearnbot.com/pages/home/top-up/buy-coins') => {
    window.location.href = url
}
</script>
  
<style lang="scss">
@media (min-height: 615px),
(min-width: 575px) {

    body {
        box-sizing: border-box;
        padding: 0;
    }

    .van-overlay {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100% !important;
        height: 100%;
    }

    :deep(.van-overlay) {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 375px !important;
        height: 100%;
    }

    :deep(.van-popup--bottom) {
        width: 375px;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }

    .main {
        position: relative;
        margin: auto;
        width: 375px;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);
    }

    .MoneyBox {
        position: absolute;
        left: 0;
        bottom: 0;

    }
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
@media (max-height: 615px),
(max-width: 575px) {

    body {
        box-sizing: border-box;
        padding: 0;
    }

    :deep(.van-overlay) {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 100%;
    }

    :deep(.van-popup--bottom) {
        width: 100%;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }

    .main {
        margin: 0;
        width: 100%;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);
    }

    .MoneyBox {
        position: absolute;
        left: 0;
        bottom: 0;

    }
}


.van-theme-light {
    --assets-background-color: #f8f8f8;
    --assets-color: #333333;
    --assets-title-color: #979797;
    --supplier-border-color: #e5e5e5;
    --supplier-span-color: #333333;
    --mian-color: #2ebc84;
    --van-number-keyboard-button-background: var(--mian-color);
    --van-number-keyboard-background: #fff;
    --van-number-keyboard-key-background: var(--assets-background-color);
}

.van-theme-dark {
    --assets-background-color: rgba(255, 255, 255, 0.1);
    --assets-color: rgba(255, 255, 255, 1);
    --assets-title-color: rgba(255, 255, 255, 0.8);
    --supplier-border-color: rgba(255, 255, 255, 0.2);
    --supplier-span-color: rgba(255, 255, 255, 1);
    --mian-color: #2ebc84;
    --van-number-keyboard-button-background: var(--mian-color);
    --van-number-keyboard-background: black;
    --van-number-keyboard-key-background: var(--assets-background-color);

    .keyboard .key-item {
        background-color: #2e2e2e;
        color: white;

        img {
            content: url('../home/icons/backspace.svg');
        }
    }

    .popup {
        --item-bg: #181818;
        --info-color: #ffffff;
        --title-color: #ffffff;
        --tips-bg: #2b2b2b;
        --van-search-background: #2d2d2d;

        .header {
            --van-search-content-background: #2d2d2d;
            --van-nav-bar-background: #1c1c1c;
            --van-search-background: #1c1c1c;
            --van-border-color: #1c1c1c;
        }
    }
}

.ios {
    .popup {
        .list {
            padding-bottom: 50px;
        }
    }
}

.main {
    position: relative;
    padding: 24px 18px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    background-color: var(--page-bg);

    &.dark {
        --page-bg: #13131B; //主题
        --input-bg: #191923; //输入框背景
        --input-number: #E2E2E7; //输入框文字默认颜色
        --text-theme-color: #E2E2E7; //主题文字
        --icon-text: #E2E2E7; //箭头颜色
        --input-number-no: #8B8B9E;
        --btn-border: #1E1E2C;
        --bth-bg: #00B811;
        --bth-bg-disabled: #343442;
        --btn-color: #C0C0CC;
        --tips-text: #D33D4F;
    }

    --tips-text:#D33D4F;
    --btn-color:#58586A;
    --bth-bg:#00B811;
    --bth-bg-disabled: #E8E8ED;
    --btn-border:#E6E8EA;
    --input-number-no:#737386;
    --page-bg:#FFFFFF;
    --icon-text:#8A8A97; //箭头颜色
    --input-bg:#F6F6F9; //输入框背景
    --input-number:#1F1F38; //输入框文字默认颜色
    --text-theme-color:#1F1F36; //主题文字
    box-sizing: border-box;


}

.tips {
    margin-top: 10px;
    color: var(--tips-text);
}

.icon-right,
.icon-left {
    color: var(--icon-text);
}

.assets {
    box-sizing: border-box;
    height: 60px;
    border-radius: 10px;
    background-color: var(--input-bg);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    color: var(--input-number);
    font-size: 16px;
    line-height: 19px;

    .num {
        width: 100%;
        // height: 100%;
        border: none;
        background-color: transparent;
    }

    .symbol {
        display: flex;
        align-items: center;



        .icon-box {
            width: 30px;
            height: 30px;
            border-radius: 100%;
            // margin: 0 16px;
            box-sizing: border-box;
            position: relative;

            .icon-min {
                border: 1px solid #fff;
                height: 15px;
                width: 15px;
                border-radius: 100%;
                position: absolute;
                bottom: 0;
                right: -50%;
                transform: translateX(-50%);
            }

            .icon {
                width: 30px;
                height: 30px;
            }
        }

        .symbol-text {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin: 0 10px
        }

        span.sub {
            opacity: 0.6;
            font-size: 12px;
        }
    }
}

.number {
    margin-top: 18px;

    .title {
        color: var(--text-theme-color);
        font-size: 14px;
        margin-bottom: 10px;
        padding-left: 14px;
        display: flex;
        justify-content: space-between;
    }

    .dalance {
        display: flex;

    }
}

.supplier {
    display: flex;
    justify-content: space-between;
    height: 68px;
    margin-top: 20px;
    width: 100%;
    align-items: center;
    padding: 14px;
    padding-left: 32px;
    padding-right: 16px;
    border: 1px solid var(--btn-border);
    border-radius: 10px;
    box-sizing: border-box;

    .box2 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .icon-right {
        color: var(--icon-text);
    }

    img {
        border-radius: 50%;
        width: 34px;
        height: 34px;
    }

    .empty {
        font-size: 14px;
    }

    .name {
        margin:0 12px;
        flex: 1;
        font-size: 18px;
        font-weight: 500;
        color: var(--input-number);
        line-height: 30px;
    }

    .info {
        display: flex;
        align-items: center;

        img {
            width: 34px;
            height: 34px;
            border-radius: 100%;
        }

    }
}

.next-button {
    background-color: var(--bth-bg);
    width: 287px;
    height: 44px;
    border-radius: 12px;
    box-sizing: border-box;
    font-size: 16px;
    color: #fefefe;
    margin: auto;
    border: none;
    display: block;
    margin-top: 40px;

    &:active {
        opacity: .8;
    }

    &.disabled {
        // opacity: .6;
        color: var(--btn-color);
        background-color: var(--bth-bg-disabled);
    }
}

.summary {
    margin-top: 40px;

    >header {
        font-size: 14px;
        color: #979797;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .collapse {
        background-color: #f8f8f8;
        border-radius: 10px;
        padding: 8px;
        margin-top: 16px;
        --van-collapse-item-content-background: transparent;
        --van-cell-background: transparent;
        --van-border-color: transparent;
    }
}

.moneyInfo {
    display: flex;
    align-items: center;

    span {
        margin: 0 10px;
    }

    img {
        margin: 0 16px;
        height: 30px;
        display: block;
    }
}

.ios {
    .number-keyboard {
        padding-bottom: 50px;
    }
}

.number-keyboard {
    position: static;
    margin-top: 20px;
}</style>
  