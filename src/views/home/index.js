import downData from '@/utils/currencyAbbreviation.js'
import channel from '@/utils/channel'
import { formatDecimal } from '@/utils'
import { showToast } from 'vant';
import { ref, onMounted, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

export function useMonepay() {
    const route = useRoute()
    const router = useRouter()
    const showLoading = ref(false)

    const { t } = useI18n()

    const downList = computed(() => {
        const list = []
        for (const key in downData) {
            list.push({
                lable: key,
                icon: `https://ullafile.oss-cn-chengdu.aliyuncs.com/image/currency/${key}.png`,
                ...downData[key]
            })
        }
        return list
    })

    const state = reactive({
        net: route.query.net,
        symbol: route.query.symbol,
        switch: true,
        inputValue: route.query.defaultAmount || '100',
        downValue: downList.value[0].acronym,
        unitIcon: downList.value[0].unit,
        unitName: downList.value[0].name,

        rate: 1,
        accordWithDis: false,
        inputState: false
    })

    const unitShow = computed(() => {
        if (state.switch) {
            return route.query.symbol
        } else {
            return state.downValue
        }
    })

    function debounce(fn, delay) {
        let timer = null;
        return function(...args) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        }
    }

    const outGetInfo = debounce(() => {
        onGetInfo()
    }, 600)

    // 键盘事件
    const onKsysChange = (key) => {
        state.inputState = true
        const val = String(state.inputValue)
        if (!val) {
            return
        }

        if (key !== 'del') {
            // 输入
            // 如果输入的是小数点
            if (key === '.') {
                // 如果已经存在小数点，就不让再次输入小数点
                if (val.indexOf(".") != -1) {
                    return
                }
            }
            // 如果首位是0
            if (state.inputValue[0] === '0' && state.inputValue[1] !== '.') {
                // 再次输入0
                if (key === '0') {
                    return
                } else {
                    if (key !== '.') {
                        // 输入别的数字
                        state.inputValue = val.slice(1, val.length)
                        state.inputValue = state.inputValue + key
                        outGetInfo()
                        return
                    }
                }
            }
            state.inputValue = val + key
        } else {
            // 删除
            state.inputValue = val.slice(0, val.length - 1)
            if (state.inputValue === '') {
                state.inputValue = '0'
            }
        }
        outGetInfo()
    }

    const changeInpputValue = val => state.inputValue = val

    // 下拉切换事件
    const onDownChange = (row) => {
        state.rate = row.rate
        let number = formatDecimal(state.inputValue / row.rate, 6)
        state.unitIcon = row.unit
        state.unitName = row.name
        onGetInfo(number)
    }

    // 中间切换按钮
    const onSwitch = () => {
        if (state.inputValue == '0') {
            return
        }
        state.switch = !state.switch
        commParams.value.fiat2Token = state.switch
        // const bVal = state.inputValue
        state.inputValue = commInfo.value.amount
        // commInfo.value.amount = bVal
        onGetInfo()
    }

    const commInfo = ref({
        amount: 0
    })
    const allChannel = ref([])
    const commParams = ref({})
    // 判断符合区间的币
    const accordWithPrc = () => {
        let prc = 0
        if (state.switch) {
            prc = formatDecimal(state.inputValue / state.rate, 6)
        } else {
            prc = commInfo.value.price
        }
        // 不符合最小值
        if (commInfo.value.buyEachTimeMin > prc) {
            showToast(t('noAccordWithMin') + formatDecimal(commInfo.value.buyEachTimeMin * state.rate, 2) + state.unitName)
            state.accordWithDis = true
            return
        }
        if (commInfo.value.buyEachTimeMax < prc) {
            showToast(t('noAccordWithMax') + formatDecimal(commInfo.value.buyEachTimeMax * state.rate, 2) + state.unitName)
            state.accordWithDis = true
            return
        }
        state.accordWithDis = false
    }

    let onGetInfoCancel
    const onGetInfo = async (number) => {
        // 始终取消之前的请求否则会导致问题
        if (onGetInfoCancel) {
            onGetInfoCancel()
        }
        const CancelToken = axios.CancelToken;
        try {
            let priceNum = ''
            if (number) {
                priceNum = number
            } else {
                priceNum = state.switch ? formatDecimal(state.inputValue / state.rate, 6) : state.inputValue
            }
            console.log(state)
            const params = {
                fiat2Token: state.switch,
                net: state.net,
                // value: String(priceNum),
                symbol: state.symbol,
                address: route.query.to,
                sourceFiatCurrency: state.unitName,
                sourceValue: state.inputValue
            }
            const { code, data } = await http.get('/payEstimate/allChannelEstimateFee', params, {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    onGetInfoCancel = c;
                  })
            })
            state.inputState = false
            if (code === 200) {
                if (!state.switch) {
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        element.price = element.amount
                        element.amount = element.amount * state.rate
                    }
                }
                commInfo.value = {...(data[0] || {})}
                allChannel.value = [...data] || []
                // commInfo.value.amount = formatDecimal(commInfo.value.amount, 8)
                commParams.value = params
                accordWithPrc()
            }
        } catch (error) {
            console.log(error)
        }

    }

    onGetInfo()

    // 处理所需参数
    const onProcessParam = () => {
        console.log(route.query)
        return {
            net: state.net,
            value: commParams.value.value,
            currency: state.unitName,
            to: route.query.to,
            symbol: route.query.symbol,
            channelIdent: commInfo.value.channelIdent,
            businessId: route.query.businessId,
            businessUserId: route.query.businessUserId,
            type: 'buy',
            channelId: commInfo.value.channelId,
            tokenAmount: commInfo.value.amount,
            conversionPrice: commInfo.value.conversionPrice,

            inputValue: state.switch ? state.inputValue : commInfo.value.amount,
            rate: state.rate,
            unit: unitShow.value + state.unitIcon,
            legalUnit: state.downValue
        }
    }

    const routerSwitch = (url) => {
        if (disabled.value) {
            return
        }
        router.push({
            path: url,
            query: {
                params: JSON.stringify(commParams.value),
                next: JSON.stringify(onProcessParam())
            }
        })
    }

    const disabled = computed(() => {
        if (Number(state.inputValue) === 0) {
            return true
        }
        if (state.inputState) {
            return true
        }
        if (showLoading.value) {
            return true
        }
        // 包含小数点
        if (String(state.inputValue).indexOf('.') !== -1) {
            if (String(state.inputValue).split('.')[0].length > 18) {
                return true
            }
            if (String(state.inputValue).split('.')[1].length > 18) {
                return true
            }
            return false
        } else {
            if (String(state.inputValue).length > 18) {
                return true
            }
            return false
        }
    })

    const changeChannelIdent = item => {
        commInfo.value.channelIdent = item.channelIdent
        commInfo.value.channelName = item.channelName
        commInfo.value.channelIcon = item.channelIcon
        commInfo.value.amount = item.amount
    }

    const next = () => {
        if (disabled.value) {
            return
        }
        if (state.accordWithDis) {
            return
        }
        showLoading.value = true
        setTimeout(() => {
            showLoading.value = false
        }, 5000)
        channel(commInfo.value.channelIdent, onProcessParam())
    }

    onMounted(() => {
        localStorage.setItem('indexPath', window.location.href)
    })

    const onBack = (url = 'https://h5.iearnbot.com/pages/home/top-up/buy-coins') => {
        window.location.href = url
    }

    return {
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
        allChannel,
        changeChannelIdent,
        commParams,
        accordWithPrc,
        onGetInfo,
        onProcessParam,
        routerSwitch,
        disabled,
        next,
        onBack,
        route,
        changeInpputValue
    }

}
