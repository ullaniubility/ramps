<template>
    <iframe title="Transak On/Off Ramp Widget"
      :src="`${baseUrl}&${convertObj()}`" frameborder="no"
      allowtransparency="true" allowfullscreen="" style="display: block; width: 100vw; height: 100vh;" ref="iframe" @load="loadIframe">
    </iframe>
  </template>
  <script setup>
  import useSettingStore from '@/stores/modules/setting'
  const settingsStore = useSettingStore()
  const route = useRoute()
  const iframe = ref(null);
  const baseUrl = computed(() => {
    return import.meta.env.VITE_USER_NODE_ENV === 'production' ? `https://moneypayweb.ullapay.com/stripe/checkout.html?theme=${settingsStore.themeColorVal}&language=${settingsStore.localeId}` : `http://47.243.202.3:10003/stripe/checkout.html?theme=${settingsStore.themeColorVal}&language=${settingsStore.localeId}`
  })
  const convertObj = () => {
    const data = route.query
    const _result = [];
    for (const key in data) {
      const value = data[key];
      if (value.constructor == Array) {
        value.forEach(function (_value) {
          _result.push(key + "=" + _value);
        });
      } else {
        _result.push(key + '=' + value);
      }
    }
    return _result.join('&');
  }
  const loadIframe = () => {
    iframe.value.contentWindow.addEventListener("message", ({ data }) => {
      const value = JSON.parse(data)
      console.log(value)
      switch (value.type) {
        case 'back':
          window.location.replace(localStorage.getItem('indexPath'))
          break;
      
        default:
          break;
      }
    })
  }
  
  </script>