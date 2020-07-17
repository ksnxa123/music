import Vue from 'vue'
import Router from 'vue-router'
import Recommend from "components/recommend/recommend"
import Rank from "components/rank/rank"
import Singer from "components/singer/singer"
import SingerDetail from 'components/singer-detail/singer-detail'
import RecommendDetail from 'components/recommend-detail/recommend-detail'
import RankDetail from 'components/rank-detail/rank-detail'
import Search from 'components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
			children:[
				{
					path: ':id',
					component: RecommendDetail
				}
			]
    },
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/rank',
      component: Rank,
			children:[
				{
					path: ':id',
					component: RankDetail
				}
			]
    },
    {
      path: '/singer',
      component: Singer,
			children:[
				{
					path: ':id',
					component: SingerDetail
				}
			]
    },
		{
			path: '/search',
			component: Search
		}
  ]
})
