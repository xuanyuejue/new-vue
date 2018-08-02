<template>
  <div class="counselor">
    <div class="table">
      <ul>
        <li class="coun-title">
          <div class="item item-1">职位</div>
          <div class="item item-2">姓名</div>
          <div class="item item-3">电话</div>
        </li>
        <li class="coun-item" v-for="(i, index) in list" :key="index">
          <div class="item item-1">置业顾问</div>
          <div class="item item-2">{{i.name}}</div>
          <div class="item item-3">{{i.mobile}}<img src="../../static/images/jt.png" alt="" @click="goQuestion(i.id)"></div>
        </li>
      </ul>
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
    this.fetchcon()
  },
  methods: {
    ...mapActions({
      getCounselor: 'user/GET_COUNSELOR',
    }),
    fetchlist () {
      this.list = []
      this.counselorList.map(i => {
        if (i.type == 1) {
          this.list.push(i)
        }
      })
    },
    fetchcon () {
      console.log('index openId sz', this.openId)
      this.getCounselor().then((res) => {
        console.log('res', res)
        this.fetchlist()
        console.log('this.list', this.list)
      }, (err) => {
        console.log('getCounselor failed', err)
      })
    },
    goQuestion (k) {
      this.$router.push({
        path: '/question/'+ k
        })
    }
  },
  computed: {
    ...mapGetters({
      counselorList: 'user/counselorList',
      openId: 'user/openId'
    })
  }
}
</script>

<style scoped>
.counselor{
  text-align: center;
  width: 100%;
  height: 100vh;
  font-size: 13px;
  color: #fff;
  background: url('../../static/images/sz.jpg') no-repeat;
  background-size: cover;
}
ul,li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.table {
  position: absolute;
  top: 22%;
  left: 0;
  padding: 0 8%;
  width: 84%;
  height: 64vh;
  overflow: auto;
}
.table ul {
  border: 1px solid #aaa;
}
li {
  padding: 5px;
}
.table ul li:not(:last-child) {
  border-bottom: 1px solid #aaa;
}
.item{
  display: inline-block;
}
.item-1 {
  width: 30%;
}
.item-2 {
  width: 25%;
}
.item-3 {
  width: 40%;
}
.item-3 img{
  width: 10px;
  margin-left: 5px;
}
</style>
