import axios from 'axios';

//法币
export function getCurrency(){
    return axios.get(`/api/v1/currency/queryFaitList`);
}

//资产列表 
export function getAssetList(data){
    return axios.post(`/api/v1/balance/queryUserBalance`,data);
}


//获取渠道
export function getChannelList(params){
    return axios.get(`/api/v1/payChannel/allChannelEstimateFee`,{params});
}

//创建订单
export function setOrder(data){
    return axios.post(`/api/v1/order/create`,data);
}