<template>
    <div id="startScreen">
      <audio :src="audioBack" ref="audioPlayer1" autoplay loop></audio>
      <div id="content">
          <button v-if="state.startBtn" @click="start">
          Ler Mensagem
          </button>
          <p :class="state.clss">{{ state.elemento }}</p> <br>
      </div>
    </div>
</template>

<script>
import Textos from '@/assets/textos/textos.json'
import { reactive, ref } from 'vue'

export default {
  setup () {
    const state = reactive({
      textoarr: Textos.carta,
      elemento: '',
      indexMsg: 0,
      showMsg: false,
      clss: '',
      startBtn: true
    })

    const audioBack = require('@/sounds/His Theme.mp3')
    const audioPlayer1 = ref(null)

    function digitar (texto, indice, callback) {
      if (indice < texto.length) {
        state.elemento += texto.charAt(indice)
        indice++
        setTimeout(() => digitar(texto, indice, callback), 100)
      } else {
        callback()
      }
    }

    function digitarTextosSequencialmente (index) {
      state.showMsg = false
      state.clss = ''
      if (index < state.textoarr.length) {
        state.elemento = ''
        digitar(state.textoarr[index], 0, () => { state.showMsg = true })
        state.indexMsg += 1
      } else {
        state.showMsg = false
        state.elemento = ''
      }
    }

    function start () {
      setTimeout(() => digitarTextosSequencialmente(state.indexMsg), 1000)
      state.startBtn = !state.startBtn
    }

    function nextText () {
      state.showMsg = false
      state.clss = 'desaparecer'
      setTimeout(() => digitarTextosSequencialmente(state.indexMsg), 3000)
    }

    const playAudio1 = () => {
      audioPlayer1.value.play()
    }

    const pauseAudio1 = () => {
      audioPlayer1.value.pause()
    }

    return {
      state,
      digitar,
      digitarTextosSequencialmente,
      start,
      nextText,
      audioBack,
      audioPlayer1,
      playAudio1,
      pauseAudio1
    }
  }

}
</script>

<style scoped>
    div {
        display: flex;
        width: 50vw;
        overflow-y: auto;
        overflow-x: auto;
        scrollbar-width: auto;
    }

    div:hover {
    scrollbar-width:auto;
    }

    p {
    font-family: determination;
    opacity: 1;
    color: white;
    text-shadow: 2px 2px 0px #666666,
    -2px -2px 0px #666666,
    2px -2px 0px #666666,
    -2px 2px 0px #666666;
    font-size: 5vh;
    overflow-y: auto;
    overflow-x: auto;
    padding: 20px;
    }

    @media (max-width: 768px) {
    p {
        font-size: 3vh;
    }
    }

    .desaparecer {
    opacity: 0;
    transition: opacity 3s;
    }

    .aparecer {
    opacity: 1;
    }

    #content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    width: 50vw;
    height: 80vh;
    overflow-y: auto;
    overflow-x: auto;
    background-image: url("../../img/letterb.gif");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
    }

    @media (max-width: 768px) {
        #content {
            width: 80vw;
        }
        }

    button {
    color: #37f725;
    background-color: #000;
    border: solid #37f725 3px;
    padding: 10px 40px;
    font-size: x-large;
    }

    @font-face {
        font-family: 'determination';
        src: url('../../fonts/determination-extended.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }

      * {
        margin: 0;
        padding: 0;
        font-family: determination;
        text-shadow: 2px 2px 0px #666666,
        -2px -2px 0px #666666,
        2px -2px 0px #666666,
        -2px 2px 0px #666666;
        color: white;
      }

      #startScreen {
        width: 100vw;
        height: 100vh;
        background-color: #f5f0c9;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0;
        margin: 0;
        background-image: url("../../img/pngegg.png");
        background-size: 50vw;
      }

</style>
