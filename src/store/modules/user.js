import { user } from '../types'
import axios from 'axios'
// import router from '../../router'
import wechatreq from '../../plugins/wechatreq.js'
import cache from '../../plugins/cache.js'

const state = {
  openId: '',
  questionList: {},
  counselorList: {}
}

const mutations = {
  [user.SET_OPENID] (state, data) {
    state.openId = data
  },
  [user.SET_WXSHARE] (state) {
    wechatreq.registerwechat()
  },
  [user.SET_QUESTION] (state, data) {
    state.questionList = data
  },
  [user.SET_COUNSELOR] (state, data) {
    state.counselorList = data
  }
}

const actions = {
  [user.GET_COUNSELOR] (context) {
    return new Promise(function (resolve, reject) {
      axios.get('/getCounselor').then(function (response) {
        var res = response.data
        context.commit(user.SET_COUNSELOR, res.data)
        resolve(res)
      }, function (response) {
        reject(new Error())
        console.log('网络错误, 请稍后重试')
      })
    })
  },
  [user.GET_QUESTION] (context) {
    return new Promise(function (resolve, reject) {
      axios.get('/getQuestion').then(function (response) {
        var res = response.data
        context.commit(user.SET_QUESTION, res.data)
        resolve(res)
      }, function (response) {
        reject(new Error())
        console.log('网络错误, 请稍后重试')
      })
    })
  },
  [user.ACTION_POST_DATA] (context, postData) {
    return new Promise(function (resolve, reject) {
     console.log('postData', postData)
      axios.post('/submitAnswer', postData).then(function (response) {
        var res = response.data
        resolve(res)
      }, function (response) {
        reject(new Error())
        console.log('网络错误, 请稍后重试')
      })
    })
  },
  [user.LOAD_LOCAL_OPENID] (context, cb) {
    let openId = cache.fetch('openId', 'LGDC')
    if (openId) {
      context.commit(user.SET_OPENID, openId)
      // context.commit(user.SET_WXSHARE)
      cb && cb()
    } else {
      wechatreq.getopenid((res) => {
        console.log('getopenid res', res)
        cache.store('openId', 'LGDC', JSON.stringify(res).replace(/\"/g, ''))
        context.commit(user.SET_OPENID, res)
        // context.commit(user.SET_WXSHARE)
        cb && cb()
      })
    }
  },
  [user.CHECK_SUBMIT] (context, postData) {
    return new Promise(function (resolve, reject) {
     console.log('postData', postData)
      axios.post('/checkSubmit', postData).then(function (response) {
        var res = response.data
        resolve(res)
      }, function (response) {
        reject(new Error())
        console.log('网络错误, 请稍后重试')
      })
    })
  },
}

const getters = {
  openId (state) {
    return state.openId
  },
  questionList (state) {
    return state.questionList
  },
  counselorList (state) {
    return state.counselorList
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
