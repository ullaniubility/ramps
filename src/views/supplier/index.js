import channel from '@/utils/channel'
import { formatDecimal } from '@/utils'

export function useMonepay() {
  const route = useRoute()
  const { t } = useI18n()

  const routerParams = JSON.parse(route.query.params)
  const routerNext = JSON.parse(route.query.next)

  const showLoading = ref(false)

  const commInfo = ref({})
  const onGetInfo = async () => {
    try {
      const params = {
        ...routerParams
      }
      const { code, data } = await http.get('/payEstimate/allChannelEstimateFee', params)

      if (code === 200) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          element.price = element.amount

          let prc = Number(routerParams.value)
          // 不符合最小值
          if (element.buyEachTimeMin > prc) {
            element.errMsg = t('noAccordWithMin') + formatDecimal(element.buyEachTimeMin * routerNext.rate, 2) + routerNext.legalUnit
          }
          if (element.buyEachTimeMax < prc) {
            element.errMsg = t('noAccordWithMax') + formatDecimal(element.buyEachTimeMax * routerNext.rate, 2) + routerNext.legalUnit
          }
        }
        if (!routerParams.fiat2Token) {
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            element.amount = element.amount * routerNext.rate
          }
        }
        commInfo.value = data
      }
    } catch (error) {
      console.log(error)
    }

  }
  onGetInfo()
  const onItemClick = (e) => {
    if (e.errMsg) {
      return
    }
    const data = routerNext
    data.channelIdent = e.channelIdent
    data.tokenAmount = e.amount
    showLoading.value = true
    setTimeout(() => {
      showLoading.value = false
    }, 5000)
    channel(e.channelIdent, data)
  }
  return {
    t,
    route,
    routerParams,
    routerNext,
    showLoading,
    commInfo,
    onGetInfo,
    onItemClick
  }
}
