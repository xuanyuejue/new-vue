import axios from 'axios'
import wx from 'weixin-js-sdk'
// import {cache} from './toolkit'

function registerwechat (currentPath) {
  var jsApiList = [
    // 所有要调用的 API 都要加到这个列表中
    'checkJsApi', // 判断当前客户端是否支持指定JS接口
    'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    'onMenuShareAppMessage' // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
  ]

  axios.post('/getSignPackage', {
    url: window.location.href.split('#')[0]
  }).then((response) => {
    // console.log(response)
    let res = response['data']['data']
    // alert(JSON.stringify(response))
    wx.config({
      debug: false,
      appId: res.appId,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      signature: res.signature,
      jsApiList: jsApiList
    })
    wxSetShare({
      title: '蓝光地产',
      desc: '蓝光地产问卷调查活动',
      link: 'https://www.unclepang.com/blue/dist/',
      imgUrl: 'https://www.unclepang.com/blue/dist/logo.png'
    })
  }).catch((error) => {
    console.log(error)
  })
}

const wxSetShare = (params) => {
  wx.ready(function () {
    // console.log(params)
    wx.onMenuShareAppMessage({
      title: params.title,
      desc: params.desc,
      link: params.link,
      imgUrl: params.imgUrl,
      trigger: function (res) {
        // alert('用户点击发送给朋友')
        // window.alert(JSON.stringify(params))
      },
      success: function (res) {
        // alert('已分享好友')
      },
      cancel: function (res) {
        // alert('已取消')
      },
      fail: function (res) {
        // alert(JSON.stringify(res));
      }
    })
    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
      title: params.title,
      desc: params.desc,
      link: params.link,
      imgUrl: params.imgUrl,
      trigger: function (res) {
        // alert('用户点击分享到朋友圈');
      },
      success: function (res) {
        // alert('已分享朋友圈');
      },
      cancel: function (res) {
        // alert('已取消');
      },
      fail: function (res) {
        // alert(JSON.stringify(res));
      }
    })
  })
}

export default {
  // 注册页面
  registerwechat,
  // 获取openid
  getopenid (cb) {
    let currentPath = window.location.href.split('#')[0]
    // let appid = cache.fetch('appid', 'HY')
    let redirectURL
    // 1. 如果路径没有code, 就跳转wechat
    if (currentPath.indexOf('code') === -1) {
      // 2. 如果没有缓存的appid，向后端请求appid
      // if (!appid) {
      //   axios.post('/getAppid', {}).then((response) => {
      //     let res = response['data']
      //     cache.store('appid', 'HY', res['data'].appid)
      //     redirectURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res['data'].appid + '&redirect_uri=' + encodeURIComponent(currentPath) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
      //     console.log(redirectURL)
      //     window.location.href = redirectURL
      //   }).catch((error) => {
      //     console.log(error)
      //   })
      // } else {

      // }
      redirectURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f532da52ec936d6&redirect_uri=' + encodeURIComponent(currentPath) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
      // redirectURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f532da52ec936d6&redirect_uri=' + encodeURIComponent(currentPath) + '&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect'
      // console.log('redirectURL', currentPath, redirectURL)
      window.location.href = redirectURL
      // console.log('redirectURL', currentPath, redirectURL)
    } else {
      // console.log(currentPath.substr(currentPath.indexOf('code') + 5, currentPath.indexOf('&state=1') - currentPath.indexOf('code') - 5))
      // alert(currentPath.substr(currentPath.indexOf('code') + 5, currentPath.indexOf('&state=1') - currentPath.indexOf('code') - 5))
      let code = currentPath.substr(currentPath.indexOf('code') + 5, currentPath.indexOf('&state=1') - currentPath.indexOf('code') - 5)
      axios.post('/getWechatInfo', {
        code: code
      }).then((response) => {
        // console.warn('getWechatInfo response',response)
        let res = response['data']
        if (cb) {
          console.log('getWechatInfo res',res)
          cb(res['data'])
          // console.log('getWechatInfo cd',cb)
        }
        // registerwechat(currentPath)
      }).catch((error) => {
        console.log(error)
      })
      // console.log('finish send post req')
    }
  },
  wxSetShare
}
