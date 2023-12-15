//代币数组
import ethIcon from '@/assets/tokensIcon/ETH.png'
import btcIcon from '@/assets/tokensIcon/BTC.png'
import trxIcon from '@/assets/tokensIcon/TRX.png'
import maticIcon from '@/assets/tokensIcon/MATIC.png'
import hecoIcon from '@/assets/tokensIcon/HECO.png'
import bscIcon from '@/assets/tokensIcon/BSC.png'
import ftmIcon from '@/assets/tokensIcon/FTM.png'
import arbIcon from '@/assets/tokensIcon/ARB.png'
import avaxIcon from '@/assets/tokensIcon/AVAX.png'
import opIcon from '@/assets/tokensIcon/OP.png'
import celoIcon from '@/assets/tokensIcon/CELO.png'
import aptIcon from '@/assets/tokensIcon/APT.png'
import wowIcon from '@/assets/tokensIcon/WOW.png'


export const tokensList = [
  {
    chainName: 'Ethereum',
    chainCode: 'ETH',
    iconUrl: ethIcon
  },
  {
    chainName: 'Bitcoin',
    chainCode: 'BTC',
    iconUrl: btcIcon
  },
  {
    chainName: 'Tron',
    chainCode: 'TRX',
    iconUrl: trxIcon
  },{
    chainName: 'Polygon',
    chainCode: 'MATIC',
    iconUrl: maticIcon
  },{
    chainName: 'HECO',
    chainCode: 'HECO',
    iconUrl: hecoIcon
  },{
    chainName: 'Binance',
    chainCode: 'BSC',
    iconUrl: bscIcon
  },{
    chainName: 'Fantom',
    chainCode: 'FTM',
    iconUrl: ftmIcon
  },{
    chainName: 'ARB',
    chainCode: 'ARB',
    iconUrl: arbIcon
  },{
    chainName: 'Avalanche',
    chainCode: 'AVAX',
    iconUrl: avaxIcon
  },{
    chainName: 'Optimism Ethereum',
    chainCode: 'OP',
    iconUrl: opIcon
  },{
    chainName: 'CELO',
    chainCode: 'CELO',
    iconUrl: celoIcon
  },{
    chainName: 'Aptos',
    chainCode: 'APT',
    iconUrl: aptIcon
  },{
    chainName: 'WOW',
    chainCode: 'WOW',
    iconUrl: wowIcon
  },
]



// 封装精确的获取数据类型
export function getType(source) {
  return Object.prototype.toString.call(source).slice(8, -1)
}

// 深拷贝
export function deepCopy(source) {
  let res = null
  if (getType(source) === 'Array') {
    res = []
  } else if (getType(source) === 'Object') {
    res = {}
  } else {
    return source
  }

  // 2.循环赋值
  for (const key in source) {
    if (getType(source[key]) === 'Array' || 'Object') {
      // 如果要复制的值还是一个数组，或者是一个对象，直接等于就还是一个浅拷贝，
      res[key] = deepCopy(source[key]) // 如果数组赋值还是一个对象
    } else {
      res[key] = source[key]
    }
  }
  return res
}

/**
 * @format yyyy-MM-dd hh:mm:ss
 * @param {String} format
 * @param {Date} date
 * @returns 2022-01-01 12:00:00
 */
export function dateFormat(format, date = new Date()) {
  var args = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var i in args) {
    var n = args[i]
    if (new RegExp('(' + i + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ('00' + n).substr(('' + n).length))
  }
  return format
}

/**
 * 保留*位小数不四舍五入
 * @param {Number, String} num
 * @param {Number} decimal
 * @returns
 */
export function formatDecimal(num, decimal = 2) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  return parseFloat(num)
}

// 获取地址上的url参数
export function getUrlParams() {
  const data = window.location.href
  const val = {}
  if (data.indexOf('?') !== -1) {
    const allParamsArr = data.split('?')[1].split('&')
    if (allParamsArr.length !== 0) {
      for (let i = 0; i < allParamsArr.length; i++) {
        val[allParamsArr[i].split('=')[0]] = allParamsArr[i].split('=')[1]
      }
      return val
    }
  }
}

// 获取地址上的url参数 存到sessionStorage
export function setUrlParamsStorage() {
  const data = window.location.href
  if (data.indexOf('?') !== -1) {
    const allParamsArr = data.split('?')[1].split('&')
    if (allParamsArr.length !== 0) {
      for (let i = 0; i < allParamsArr.length; i++) {
        sessionStorage.setItem(allParamsArr[i].split('=')[0], allParamsArr[i].split('=')[1])
      }
    }
  }
}

// 对象转url参数
export function convertObj(data) {
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

//科学计数法
export function transferToNumber(inputNumber) {
  if (isNaN(inputNumber)) {
    return inputNumber
  }
  inputNumber = '' + inputNumber
  inputNumber = parseFloat(inputNumber)
  let eformat = inputNumber.toExponential() // 转换为标准的科学计数法形式（字符串）
  let tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/) // 分离出小数值和指数值
  let number = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]))
  return number
}