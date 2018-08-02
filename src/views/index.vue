<template>
  <div class="pages">
    <div class="btnpage">
      <div class="btn" @click="btnclick(1)"></div>
      <div class="btn" @click="btnclick(2)"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: '',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.loadLocalOpenId().then((r) => {
      // console.log('index openId', that.openId, r)
    }, () => {
      console.log('createCard failed')
    })
  },
  methods: {
    ...mapActions({
      loadLocalOpenId: 'user/LOAD_LOCAL_OPENID',
      checkSubmit: 'user/CHECK_SUBMIT'
    }),
    check (i) {
      let pd = {
        openid: i
      }
      this.checkSubmit(pd).then((res) => {
        // console.log('index res', res)
        if (res.code == 402 ){
          this.$router.push('/end')
        }
      })
    },
    btnclick (t) {
      if (t == 1) {
        //嵊州
        this.$router.push('/counselorsz')
      } else if (t == 2) {
        //余姚
        this.$router.push('/counseloryy')
      }
    }
  },
  computed: {
    ...mapGetters({
      openId: 'user/openId'
    })
  },
  watch: {
    openId: function (newval,oldval) {
        // console.log('index openId wt', this.openId, newval)
        this.check(this.openId)
    }
  }
}
</script>

<style scoped>
.pages{
  width: 100%;
  height: 100vh;
  font-size: 13px;
  color: #fff;
  background: url('../../static/images/index-bg.jpg') no-repeat;
  background-size: cover;
  position: relative;
}
.btnpage {
  /* background: #fff; */
  position: absolute;
  top: 30%;
  left: 24%;
  width: 55%;
}
.btn{
  height: 15vh;
  background: transparent;
  /* border: 1px solid red; */
  margin-bottom: 10vh;
}
</style>
