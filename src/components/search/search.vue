<template>
		<transition>
			<div class="search">
				<div class="search-wrapper">
					<div class="back-btn">
						<i class="back" @click="back"> < </i>
					</div>
					<search-box @query="queryChange" ref="searchBox"></search-box>
				</div>
				<div class="hot-wrapper" v-show="!query">
					<div class="hot-box">
						<div class="hot-key">
							<h1 class="title">热门搜索</h1>
							<ul>
								<li @click="addQuery(item.k)" v-for="item of hotkey" :key="item.n" class="item">
									<span>{{item.k}}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="search-result" v-show="query">
					<search-result :query="query"></search-result>
				</div>
			</div>
		</transition>
</template>

<script>
	import SearchBox from 'base/search-box/search-box'
	import {getHotKey} from 'api/search'
	import SearchResult from 'components/search-result/search-result'
	export default{
		data(){
			return{
				hotkey: [],
				query: ''
			}
		},
		created(){
			this._getHotKey()
		},
		methods:{
			back(){
				this.$router.back()
			},
			_getHotKey(){
				getHotKey().then((res)=>{
					if(res.code === 0){
						this.hotkey = res.data.hotkey.slice(0,10)
						console.log(this.hotkey)
					}
				})
			},
			queryChange(query){
				this.query = query
			},
			addQuery(query){
				this.$refs.searchBox.setQuery(query) 
			}
		},
		components:{
			SearchBox,
			SearchResult
		}
	}
</script>

<style scoped="scoped" lang="stylus">
	@import "~common/stylus/variable"
	.v-enter-active, .v-leave-active
		transition: all 0.3s
	.v-enter, .v-leave-to
		transform: translate3d(50%,0,0)
		opacity: 0
	.search
		position: fixed
		z-index: 100
		top: 0
		bottom: 0
		width: 100%
		background: $color-background
		.search-wrapper
			padding: 10px 40px 
			background: $color-theme
			.back-btn
				position: absolute
				top: 3px
				left: 6px
				z-index: 50
				.back
					display: block
					padding: 9px
					font-size: $font-size-large-x
					color: #fff
		.hot-wrapper
			position: relative
			margin: 0 auto
			.hot-box
				height: 100%
				overflow: hidden
				.hot-key
					margin: 0 20px 20px 20px 
					.title
						margin: 20px 0
						font-size: $font-size-medium
						color: $color-text
				.item
					padding: 5px 10px
					margin: 0 20px 10px 0
					border-radius: 5px
					border: 0.8px solid #c7c7c7
					font-size: $font-size-medium
					color: $color-text
					display: inline-block
		.search-result
			position: fixed
			top: 45px
			bottom: 0
			width: 100%
</style>
