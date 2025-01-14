<template>
  <div :style="state.zindex" :class="state.blackBefore" :id="state.blackAfter"></div>
  <div :id="state.zid" class="whiteAfter"></div>
  <div :class="state.clssBack" id="screen">
    <audio ref="audioPlayer1" :src="audioStart" autoplay loop ></audio>
    <audio ref="audioPlayer2" :src="audioSource" loop></audio>
    <audio ref="audioPlayer3" :src="audioExit"></audio>
    <soulComponent :eventSoul="state.idMsg" />
    <theQuestions @updateIndexMsg="getIdMsg"/>
  </div>

</template>

<script>
import soulComponent from '../../components/Soul'
import theQuestions from '../../components/Questions'
import { reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'mainScreen',
  components: {
    soulComponent,
    theQuestions
  },
  setup () {
    const state = reactive({
      idMsg: 0,
      clssBack: '',
      blackBefore: '',
      blackAfter: '',
      zindex: '',
      zid: ''
    })

    const router = useRouter()

    const audioStart = require('@/sounds/Menu.mp3')
    const audioPlayer1 = ref(null)
    const audioSource = require('@/sounds/ANOTHER HIM.mp3')
    const audioPlayer2 = ref(null)
    const audioExit = require('@/sounds/Exit.mp3')
    const audioPlayer3 = ref(null)

    const playAudio1 = () => {
      audioPlayer1.value.play()
    }

    const pauseAudio1 = () => {
      audioPlayer1.value.pause()
    }

    const playAudio2 = () => {
      audioPlayer2.value.play()
    }

    const pauseAudio2 = () => {
      audioPlayer2.value.pause()
    }

    const playAudio3 = () => {
      audioPlayer3.value.play()
    }

    const pauseAudio3 = () => {
      audioPlayer3.value.pause()
    }

    watch(() => state.idMsg, (ev) => {
      if (ev === 7) {
        state.clssBack = 'bg-image'
        state.blackBefore = 'blackBefore'
        state.blackAfter = 'blackAfter'
        setTimeout(() => getB(), 1000)
        setTimeout(() => zedit(), 2000)
        pauseAudio1()
        playAudio2()
      }
      if (ev === 17) {
        setTimeout(() => zidedit(), 7000)
        setTimeout(() => pauseAudio2(), 7000)
        setTimeout(() => playAudio3(), 7000)
        setTimeout(() => router.push({ name: 'MsgScreen' }), 12000)
      }
    })

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('token')
    })

    function getB () {
      state.blackAfter = 'blackAfter'
    }

    function getIdMsg (valor) {
      state.idMsg = valor
    }

    function zedit () {
      state.zindex = 'z-index: -1'
    }

    function zidedit () {
      state.zid = 'zidWhite'
    }

    function strMusicToogle () {
      setTimeout(() => playAudio1(), 100)
    }

    return {
      state,
      getIdMsg,
      getB,
      zedit,
      zidedit,
      audioStart,
      audioPlayer1,
      audioSource,
      audioPlayer2,
      audioExit,
      audioPlayer3,
      playAudio1,
      pauseAudio1,
      playAudio2,
      pauseAudio2,
      playAudio3,
      pauseAudio3,
      strMusicToogle
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'determination';
  src: url('../../fonts/determination-extended.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: determination;
}

body, html {
  height: 100%;
}

h1 {
  font-family: determination;
  opacity: 1;
  color: white;
  text-shadow: 2px 2px 0px #666666,
  -2px -2px 0px #666666,
  2px -2px 0px #666666,
  -2px 2px 0px #666666;
  font-size: 5vh;
  text-align: center;
}

#screen {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 0;
}

.bg-image {
  background-image: url("../../img/background.gif");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.blackBefore {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 1;
  opacity: 1;
}

#blackAfter {
  opacity: 0;
  transition: opacity 3s;
}

.whiteAfter {
  position: absolute;
  opacity: 0;
  background-color: #fff;
  z-index: -50;
  width: 100vw;
  height: 100vh;
}

#zidWhite {
  opacity: 1;
  z-index: 50;
  transition: opacity 5s;
}

</style>
