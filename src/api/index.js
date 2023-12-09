import axios from 'axios'
import { showToast, showLoadingToast, closeToast } from 'vant';
import 'vant/es/toast/style';
import route from '@/router';
import { useRoute } from 'vue-router'
import useSettingStore from '@/stores/modules/setting'
import i18n from '@/utils/createI18n'
const t = i18n.global.t
const routes = useRoute()
const settingsStore = useSettingStore()
const { token } = storeToRefs(settingsStore)

axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASEURL
axios.defaults.timeout = 20 * 1000

axios.defaults.headers['Version'] = '1.0.0'
axios.defaults.headers['Authorization']=routes?.query?.Authorization||token.value;
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截
axios.interceptors.request.use(
  config => {
    const t = new Date().valueOf()
    config.headers['t'] = t
    config.headers['ulla'] = sessionStorage.getItem('ulla') || 'null'
    // showLoadingToast({
    //   duration: 0,
    //   forbidClick: true
    // });
    return config
  },
  error => {
    return error
  }
)

// 响应拦截
axios.interceptors.response.use(
  ({ data ,config}) => {
    // closeToast();
    if (data?.code === 904) {
      route.replace({
        path: '/err/' + data.code,
      })
      return
    }
    console.log(config)
    if (data?.code !== 200) {
      if(data?.code==400&&config.url=="/api/v1/payChannel/allChannelEstimateFee"){
        showToast( data.msg )
      }else{
        showToast( t('msg.' + data.code) ||data.msg);
      }
    }
    return Promise.resolve(data)
  },
  err => {
    // closeToast();
    console.log(err)
    return Promise.reject(err)
  }
)

export default {
  get: (url, params, options = {}) => {
    return axios.get(url, { params, ...options })
  },

  post: (url, params, options = {}) => {
    return axios.post(url, params, options)
  },

  axios
}
