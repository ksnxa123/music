<template>
	<div class="music-list">
		<div class="back" @click="back">
			<span class="iconback"> < </span>
		</div>
		<h1 class="title">{{title}}</h1>
		<div class="bg-image" :style="bgStyle" ref="bgImage"></div>
		<scroll class="list" ref="list">
			<div class="song-list-wrapper">
				<song-list @select="selectItem" :songs="songs"></song-list>
			</div>
			<div class="loading-container" v-show="!songs.length">
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>

<script>
	import SongList from 'base/song-list/song-list'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
  import {mapActions} from 'vuex'
	export default {
		props:{
			title:{
				type: String,
				default: ''
			},
			bgImage:{
				type: String,
				default: ''
			},
			songs:{
				type: Array,
				default: []
			}
		},
		methods:{
			back(){
				this.$router.back()
			},
      selectItem(item,index){
        this.clickPlay({
          list: this.songs,
          index: index
        })
      },
      ...mapActions([
        'clickPlay'
      ])
		},
		computed:{
			bgStyle(){
				return `background-image:url(${this.bgImage})`
			}
		},
		mounted(){
			this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
		},
		components:{
			SongList,
			Scroll,
			Loading
		}
	}
</script>

<style scoped="scoped" lang="stylus">
	@import "~common/stylus/variable"
	.music-list
		position: fixed
		top: 0
		left: 0
		right: 0
		bottom: 0
		z-index: 100
		background: $color-background
		.back
			position: absolute
			top: 0
			left: 6px
			z-index: 50
			.iconback
				display: block
				padding: 10px
				font-size: $font-size-large-x
				color: #fff
		.title
			position: absolute
			top: 2px
			left: 10%
			z-index: 40
			width: 80%
			text-overflow: ellipsis
			overflow: hidden
			white-space: nowrap
			text-align: center
			line-height: 40px
			font-size: $font-size-large
			color: #fff
		.bg-image
			position: relative
			width: 100%
			height: 0
			padding-top: 70%
			background-size: cover
			transform-origin: top
		.list
			position: fixed
			top: 0
			bottom: 0
			width: 100%
			background: $color-background
			overflow: hidden
			.song-list-wrapper
				padding: 20px 30px
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
</style>
