const u = navigator.userAgent;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

export function onBackHome() {
    console.log('调用返回首页')
    try {
        if (isAndroid) {
            window.UllaClient.backToHome()
        } else {
            window.webkit.messageHandlers.backToHome.postMessage(null);
        }
    } catch (error) {
        console.log(error)
    }
    
}

export function onReloadNewPay() {
    console.log('调用继续购买')
    try {
        if (isAndroid) {
            window.UllaClient.reloadNewPay()
        } else {
            window.webkit.messageHandlers.reloadNewPay.postMessage(null);
        }
    } catch (error) {
        console.log(error)
    }
    
}