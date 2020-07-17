<template>
	<transition>
		<music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import MusicList from 'components/music-list/music-list'
  import {settingSong} from 'common/js/song'
	export default{
		data(){
			return{
				songs: []
			}
		},
		computed:{
			...mapGetters([
				'rank'
			]),
			title(){
				return this.rank.name
			},
			bgImage(){
				return this.rank.coverImgUrl
			}
		},
		created(){
			this._rankDetail(this.rank.tracks)
		},
		methods:{
			_rankDetail(list){
				if(!this.rank.id){
					this.$router.push('/rank')
					return
				}
				let result = []
				list.forEach((item)=>{
					result.push(settingSong(item))
				})
				this.songs = result
			},
			// _formatSong(musicData){
			// 	return ({
			// 		id: musicData.id,
			// 		singer: musicData.ar[0].name,
			// 		name: musicData.name,
			// 		album: musicData.name
			// 	})
			// }
		},
		components:{
			MusicList
		}
	}
</script>

<style scoped="scoped" lang="stylus">
	@import "~common/stylus/variable"
	.v-enter-active,.v-leave-active
		transition: all 0.5s
	.v-enter,.v-leave-to
		transform: translate3d(50%,0,0)
		opacity: 0
</style>
