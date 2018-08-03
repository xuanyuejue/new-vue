<template>
<div>
  <div class="ques">
    <div class="posi">
      <div class="q">
        <div class="q-item" v-for="(item, index) in listArr" :key="index">
          <div class="question-line">
            <img src="../../static/images/jt.png" alt="">
            {{item.question}}
          </div>
          <div class="answer-line">
            <label>
              <input type="radio" v-model="listArr[index]['listId']" value="是">是
            </label>
            <label>
              <input type="radio" v-model="listArr[index]['listId']" value="否">否
            </label>
          </div>
        </div>
      </div>
      <div class="btn" >
        <img src="../../static/images/subbtn.png" @click="submitcase">
      </div>
    </div>
  </div>
  <!-- alert -->
  <div class="alert1" v-if="alerts">
    <div class="alert1-pages">
      <div class="alert1-con">需填写完所有题目，才能完成提交</div>
      <div class="alert1-btn">
        <span class="alert1-btn-1" @click="sure">确定</span>
      </div>
    </div>
  </div>
  <!-- confirm -->
  <div class="confirm1" v-if="confirms">
    <div class="confirm1-pages">
      <div class="confirm1-con">
        <div class="c-line">
          姓名
          <div class="c-line-i">
          <input type="text" v-model="subname"></div>
        </div>
        <div class="c-line">
          电话
          <div class="c-line-i">
          <input type="text" v-model="submoblie" maxlength="11" minlength="11"></div>
        </div>
      </div>
      <div class="confirm1-btn">
        <button :disabled="confirmbtn" @click="confirmdata">提交</button>
      </div>
      <div class="tips">请留下您的联系方式，以便客服进行回访。</div>
    </div>
  </div>
  <!-- confirm-alert -->
  <div class="alert2" v-if="confirma">
    <div class="alert2-pages">
      <div class="alert2-con">{{msg}}</div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: '',
  data () {
    return {
      listArr: [],
      list: [],
      alerts: false,
      confirms: false,
      confirmbtn: false,
      confirma:false,
      subname: '',
      submoblie: '',
      msg: ''
    }
  },
  mounted () {
    this.fetchque()
  },
  methods: {
    ...mapActions({
      getQuestion: 'user/GET_QUESTION',
      postdataaction: 'user/ACTION_POST_DATA'
    }),
    fetchlist () {
      this.list = this.questionList
    },
    fetchque () {
      this.getQuestion().then((res) => {
        this.listArr = this.questionList.map((value, index) => {
          return {listId: '',
                  ...value}
        })
      }, (err) => {
        console.log('getQuestion failed', err)
      })
    },
    sure () {
      this.alerts = false
    },
    submitcase () {
      let pd = {}
      this.listArr.map((value, index) => {
        pd[index+1] = value.listId
      })
      for (let k in pd) {
        if (!pd[k]) {
          this.alerts = true
          return 
        }
      }
      this.confirms = true
    },
    confirmdata () {
      let pd = {}
      this.listArr.map((value, index) => {
        pd[index+1] = value.listId
      })
      if (!this.subname || !this.submoblie) {
        // this.confirmbtn = true
        this.msg = '请填写姓名和电话'
        this.confirma = true
        this.confirmbtn = true
        setTimeout(()=>{
          this.confirma = false
          this.confirmbtn = false
        },1000)
        return
      }
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.submoblie)) {
        this.msg = '手机号码错误'
        this.confirma = true
        this.confirmbtn = true
        setTimeout(()=>{
          this.confirma = false
          this.confirmbtn = false
        },1000)
        return
        }
      let postdata = {
        answer: JSON.stringify(pd),
        name: this.subname,
        mobile: this.submoblie,
        uid: this.getUid,
        openid: this.openId
        // name: '52',
        // mobile: '13212341234',
        // uid: this.getUid,
        // openid: 'o38Gns49iF-oyNchoZhMPb_o3zT4'
      }
      console.log('data',pd)
      console.log('data',postdata)
      this.postdataaction(postdata).then((res)=>{
        console.log('postadata res', res)
        this.$router.push('/end')
      })
    }
  },
  computed: {
    ...mapGetters({
      openId: 'user/openId',
      questionList: 'user/questionList'
    }),
    getUid () {
      return this.$route.params.uid
    }
  },
  watch: {
    subname: function (newval,oldval) {
      if (newval != oldval) {
        this.confirmbtn = false
      }
    },
    submoblie: function (newval,oldval) {
      if (newval != oldval) {
        this.confirmbtn = false
      }
    }
  }
}
</script>

<style scoped>
.ques{
  width: 100%;
  height: 100vh;
  font-size: 13px;
  color: #fff;
  background: url('../../static/images/ques-bg.jpg') no-repeat;
  background-size: cover;
  position: relative;
}
.posi {
  position: absolute;
  top: 25%;
  left: 0px
}
.q {
  height: 50vh;
  overflow: auto;
  margin-bottom: 4%;
}
.q-item {
  padding: 5px 8%;
}
.question-line {
  padding-bottom: 8px;
}
.question-line  img{
  width: 8px;
}
.answer-line label{
  display: inline-block;
  width: 49%;
  text-align: center;
}
.btn{
  text-align: center;
}
.btn img {
  width: 25%;
}
.alert1{
  font-size: 14px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .5)
}
.alert1-pages {
  background: #fff;
  width: 60%;
  padding: 5%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 90px;
  margin: auto;

}
.alert1-con {
  padding: 15px 0

}
.alert1-btn{
  text-align: right;
}
.alert1-btn-1{
  color: #40b23f;
}
.confirm1{
  font-size: 15px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .5)
}
.confirm1-pages {
  background: #fff;
  width: 60%;
  padding: 5%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 160px;
  margin: auto;
  border-radius: 10px;

}
.confirm1-con {
  padding: 10px 0

}
.c-line {
  padding: 5px 0;
  text-align: center;
}
.c-line-i{
  display: inline-block;
  margin-left: 5px;
  border: 1px solid #777;
}
.c-line-i input{
  outline: none;
  font-size: 16px;
  padding: 5px;
  border: 0;
  width: 130px;
}
.confirm1-btn{
  text-align: center;
}
.confirm1-btn button{
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
  padding: 5px 20px;
  background: #f7921f
}
.tips {
  padding: 8px 0;
  font-size: 12px;
  text-align: center;
}
.alert2{
  font-size: 14px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.alert2-pages {
  background: #000;
  color: #fff;
  width: 50%;
  padding: 3%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  line-height: 20px;
  height: 20px;
  border-radius: 8px;
  text-align: center;

}
</style>
