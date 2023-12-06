import route from '@/router'
import http from '@/api'
import { convertObj } from '@/utils'
import i18n from '@/utils/createI18n'
import { showToast } from 'vant';
import 'vant/es/toast/style';

import useSettingStore from '@/stores/modules/setting'
const settingsStore = useSettingStore()
const t = i18n.global.t

const env = import.meta.env.VITE_USER_NODE_ENV
const baseUrl = import.meta.env.VITE_APP_API_BASEURL

const onRamp = async(params, id) => {
    try {
        const { code, data } = await http.get('/sysRate/getSupportedContract', {
            symbol: params.symbol,
            net: params.net
        })
        if (code === 200) {
            console.log(data)
            if (data === '0') {
                showToast(t('notSupp'));
                return
            }
            const numberPric = params.tokenAmount.toFixed(6)
            const config = {
                // 公司名称
                hostAppName: 'ULLA',
                // 公司logo
                hostLogoUrl: encodeURIComponent('https://ullafile.oss-cn-chengdu.aliyuncs.com/image/avatar/logo.png'),
                // key密钥
                hostApiKey: env === 'production' ? 'gc6htzdz6jz6v72k5aza627thp69q9y2wp399xu3' : 'jags3zsmgjk9z6a799b7of78yuwgz8g8fkq566zq',
                // 交易完成回调借口地址
                webhookStatusUrl: encodeURIComponent(baseUrl + '/callBack/ramp?id=' + id),
                // 交易完成重定向地址
                finalUrl: encodeURIComponent(`${window.location.origin}/#/status/ramp?theme=${settingsStore.themeColorVal}&language=${settingsStore.localeId}`),
                // 固定购买的公司和加密货币
                swapAsset: params.net + '_' + params.symbol,
                // 固定购买数量
                swapAmount: numberPric * 10 ** data,
                // 接受人钱包地址
                userAddress: params.to
            }
            const iframeUrl = env === 'production' ? 'https://buy.ramp.network' : 'https://ri-widget-staging.firebaseapp.com'
            window.location.href = iframeUrl + '?' + convertObj(config)
        }
    } catch (error) {
        console.log(error)
    }
}

export default async function (type, params) {
    try {
        const { code, data } = await http.post('/order/add', {
            toAddress: params.to,
            deliverGoods: '0',
            ...params
        })
        if (code === 200) {
            const id = data.orderId

            switch (type) {
                // case 'Transak':
                //     const network = (net) => {
                //         switch (net) {
                //             case 'TRX':
                //                 return 'tron'

                //             default:
                //                 return net;
                //         }
                //     }
                //     const transakConfig = {
                //         // API Key区分测试和生产
                //         apiKey: env === 'production' ? '9871c91a-c4e0-45ee-baee-33cac8a23149' : '4b2e07a6-c827-448a-9e96-62e2f27acb02',
                //         // 重定向地址
                //         redirectURL: encodeURIComponent(`${window.location.origin}/#/status/transak?theme=${settingsStore.themeColorVal}&language=${settingsStore.localeId}`),
                //         // 钱包地址
                //         walletAddress: params.to,
                //         // 需要去购买的虚拟货币
                //         cryptoCurrencyCode: params.symbol,
                //         // net
                //         network: network(params.net),
                //         // 用什么货币去购买
                //         fiatCurrency: params.currency,
                //         // 填写的法币数量
                //         fiatAmount: params.inputValue,
                //         // 如果为真，则用户将看不到钱包地址输入屏幕，也无法编辑加密货币发送到的地址
                //         disableWalletAddressForm: true,
                //         // 如果为真，则客户将看不到有关加密货币的任何信息。这将完全隐藏与加密相关的所有信息。
                //         isDisableCrypto: true,
                //         // 如果为真，则用户将看不到小部件主屏幕，也就是交换屏幕。这将完全隐藏交易屏幕，用户将无法更改支付方式、加密货币或法定金额。
                //         hideExchangeScreen: true,
                //         // 订单ID
                //         partnerOrderId: id,
                //         // 您希望用户付款的付款方式。用户将无法选择其他付款方式
                //         paymentMethod: 'credit_debit_card',

                //     }
                //     console.log(transakConfig)
                //     route.push({
                //         path: '/transak',
                //         query: {
                //             ...transakConfig
                //         }
                //     })
                //     break;
                // case 'Mercuryo':
                //     window.location.href = data.mercuryoUrl + encodeURIComponent(`${window.location.origin}/#/status/mercuryo?theme=${settingsStore.themeColorVal}&language=${settingsStore.localeId}`)
                //     break;
                // // case 'Ramp':
                // //     onRamp(params, id)
                // //     break;
                // case 'Stripe':
                //     route.push({
                //         path: '/stripe',
                //         query: {
                //             stripeClientSecret: data.stripeClientSecret
                //         }
                //     })
                //     break;
                default:
                    window.location.href = data.url
                    break;
            }

        }

    } catch (error) {
        console.log(error)
    }
}
