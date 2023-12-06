const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { MD5 } = require('./md5')
const { config } = require('./config')

const defaultPath = path.resolve(__dirname, '../src/locales')
let locales = JSON.parse(fs.readFileSync(`${defaultPath}/${config.from}.json`, 'utf-8'))

const onDataHandle = () => {
    const value = []
    for (const key in locales) {
        value.push(locales[key])
    }

    return value.join('\n')
}

const returnFun = async (to) => {
    const appid = '20221212001494300';
    const key = 'eFUeHvRXVm8MuqYBhgn7';
    const salt = (new Date).getTime();
    const query = onDataHandle();

    const from = 'zh';
    const str1 = appid + query + salt + key;
    const sign = MD5(str1);

    const { data } = await axios({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        type: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            q: query,
            appid: appid,
            salt: salt,
            from: from,
            to: to.baiduLoca,
            sign: sign
        }
    })
    const resValue = data.trans_result
    if (!resValue) {
        console.log(`to: ${JSON.stringify(to)}, msg: ${JSON.stringify(data)}`)
        return
    }
    const returnData = {}
    Object.keys(locales).forEach((key, index) => {
        returnData[key] = resValue[index].dst
    })

    fs.writeFile(`${defaultPath}/${to.locaFile}.json`, JSON.stringify(returnData), (err) => {
        if (err) {
            console.log(to.locaFile + '文件写入失败:', err)
        } else {
            console.log(to.locaFile + '语言文件创建成功')
        }
    })
}

const start = () => {
    for (let i = 0; i < config.to.length; i++) {
        const item = config.to[i]
        returnFun(item)
    }
}

start()