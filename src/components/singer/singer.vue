<template>
  <transition>
    <div class="singer">
      <singer-list :data="singerList" @select="selectSinger"></singer-list>
			<router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import {getSingerList} from "api/singer"
  import Singer from 'common/js/singer'
  import SingerList from 'base/singer-list/singer-list'
	import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_NAME_LENGTH = 10

  const pinyin = require('pinyin')
  export default {
    name: "singer",
    data() {
      return {
        singerList: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
			selectSinger(singer){
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				this.setSinger(singer)
			},
      _getSingerList() {
        getSingerList().then((res) => {
            let list =  res.data.artists
            list.map(item=>{
              let py = pinyin(item.name[0],{
                style:pinyin.STYLE_FIRST_LETTER
              })
              item.Findex = py[0][0].toUpperCase()
            })
            this.singerList = this._singerListSettings(list)
            console.log(this.singerList)
        })
      },
      _singerListSettings(list) {
        let page = {
          hot: {
            title: HOT_NAME,
            lists: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_NAME_LENGTH) {
            page.hot.lists.push(new Singer({
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url
            }))
          }
          const key = item.Findex
          if (!page[key]) {
            page[key] = {
              title: key,
              lists: []
            }
          }
          page[key].lists.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url
          }))
        })
        console.log(page)
        let hot = []
        let nohot = []
        for (let k in page) {
          let value = page[k]
          if (value.title.match(/[a-zA-Z]/)) {
            nohot.push(value)
          } else if (value.title === HOT_NAME) {
            hot.push(value)
          }
        }
        nohot.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(nohot)
      },
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
    },
    components: {
      SingerList
    }
  }
</script>

<style scoped lang="stylus">
  .v-enter-active, .v-leave-active
    transition all 0.1s

  .v-enter, .v-leave-to
    transform translate3d(50%, 0, 0)
    opacity 0

  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>
