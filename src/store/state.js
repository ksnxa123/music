import {playMode} from 'common/js/config'

const state = {
	singer: {},
	recommend: {},
	rank: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

export default state
