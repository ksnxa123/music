<template>
  <div id="app">
    <music-header></music-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MusicHeader from 'components/music-header/music-header'
import Player from 'components/player/player'
import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components:{
    MusicHeader,
    Tab,
    Player
  }
}
</script>

<style>
</style>
