<template>
  <div id="startScreen">
    <form @submit.prevent="login" id="enterForm">
      <h1>Your Birthday</h1>
      <input type="text" maxlength="4" id="strInput" v-model="state.code" />
      <button id="btn-entre" type="submit">Entre</button>
    </form>
    <p id="errorMsg" :class="state.errorClss" v-if="state.errorStatus">{{ state.errorMessage }}</p>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'startScreen',
  setup () {
    const state = reactive({
      code: '',
      errorMessage: '',
      errorStatus: false,
      errorClss: ''
    })
    const router = useRouter()

    const login = () => {
      if (state.code === '1901') {
        sessionStorage.setItem('token', 'seu-token-de-autorizacao')
        router.push({ name: 'MainScreen' })
      } else {
        state.errorStatus = true
        state.errorMessage = 'Código incorreto!'
        state.errorClss = 'blackMsg'
        setTimeout(() => { state.errorStatus = false }, 3000)
      }
    }

    return {
      state,
      router,
      login
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
    font-family: determination;
    text-shadow: 2px 2px 0px #666666,
    -2px -2px 0px #666666,
    2px -2px 0px #666666,
    -2px 2px 0px #666666;
    color: white;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #startScreen {
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #strInput {
    font-size:xx-large;
    width: 20vw;
    height: 10vh;
    margin-bottom: 5vh;
    margin-top: 10vh;
    text-align: center;
    border: solid #37f725 3px;
    background-color: #000;
    text-shadow: 2px 2px 0px #666666,
    -2px -2px 0px #666666,
    2px -2px 0px #666666,
    -2px 2px 0px #666666;
    color: white;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    #strInput {
      width: 80vw;
    }
  }

  #routertes {
    background-color: #000;
    font-family: determination;
    opacity: 1;
    color: white;
    text-shadow: 2px 2px 0px #666666,
    -2px -2px 0px #666666,
    2px -2px 0px #666666,
    -2px 2px 0px #666666;
    font-size: 5vh;
    position: absolute;
    top: 0;
    left: 0;
    text-decoration: none;
  }

  #enterForm {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #errorMsg {
    margin-top: 5vh;
    color: white;
    opacity: 1;
  }

  #btn-entre {
    color: #37f725;
    background-color: #000;
    border: solid #37f725 3px;
    padding: 10px 40px;
    font-size: x-large;
  }

  .blackMsg {
    opacity: 0;
    transition: opacity 3s;
  }

</style>
