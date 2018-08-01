<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  mounted () {
    this.loadLocalOpenId().then(() => {
      console.log('index openId', this.openId)
      this.checkSubmit(this.openId).then((res) => {
        console.log('index res', res)
        // this.$router.push('/end')
      })
    }, () => {
      console.log('createCard failed')
    })
  },
  methods: {
    ...mapActions({
      loadLocalOpenId: 'user/LOAD_LOCAL_OPENID',
      checkSubmit: 'user/CHECK_SUBMIT'
    })
  },
  computed: {
    ...mapGetters({
      openId: 'user/openId'
    })
  }
}
</script>

<style>
html,body{
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  font-size: 0;
  position: relative;
  /* margin-top: 60px; */
}
</style>
