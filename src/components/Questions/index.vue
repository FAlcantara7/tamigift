<template>
  <div id="content">
    <button v-if="state.startBtn" @click="start">
      Comecar!
    </button>
    <h1 :class="state.clss">{{ state.elemento }}</h1> <br>
  </div>
  <div id="buttons">
    <button v-if="state.showMsg"
    @click="nextText">
    Proximo texto
    </button>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import Textos from '@/assets/textos/textos.json'

export default {
  name: 'theQuestions',
  emits: ['updateIndexMsg'],
  setup (props, { emit }) {
    const state = reactive({
      textoarr: Textos.falas,
      elemento: '',
      indexMsg: 0,
      showMsg: false,
      clss: '',
      startBtn: true,
      audioStart: false
    })

    watch(() => state.indexMsg, (newValue) => {
      emit('updateIndexMsg', newValue) // Emite o valor para a view pai
    })

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

    return {
      state,
      digitar,
      digitarTextosSequencialmente,
      start,
      nextText
    }
  }
}
</script>

<style scoped>
  div {
      display: flex;
      width: 50vw;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: none;
  }

  div:hover {
    scrollbar-width:auto;
  }

  @media (max-width: 768px) {
    div {
      width: 80vw;
    }
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
  }

  @media (max-width: 768px) {
    h1 {
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

  #botao {
    font-family: determination;
  }

  #content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 50vw;
    height: 20vh;
  }

  #buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transform: translateY(20vh);
  }

  button {
    color: #37f725;
    background-color: #000;
    border: solid #37f725 3px;
    padding: 10px 40px;
    font-size: x-large;
  }
</style>
