import { getUrlParams } from '@/utils'
const urlParams = getUrlParams() || sessionStorage
const useSettingStore = defineStore(
  // 唯一ID
  'setting',
  {
    state: () => ({
      theme: 'light',
      routerParams: getUrlParams(),
      themeColorVal: urlParams.theme ? `${urlParams.theme}` : '2EBC84',
      themeColor: urlParams.theme ? `#${urlParams.theme}` : '#2EBC84',
      localeId: urlParams.language || 'zh-Hans',
      token:urlParams.Authorization || ''
    }),
    getters: {
    },
    actions: {
      onSetTheme(val) {
        this.themeColor = val
      }
    },
  },
)

export default useSettingStore