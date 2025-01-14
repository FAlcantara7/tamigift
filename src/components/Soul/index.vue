<template>
    <div>
        <img :src="state.imgSource" alt="redsoul" id="float-img">
    </div>
</template>

<script>
import { reactive, watch } from 'vue'

export default {
  name: 'soulComponent',
  setup (props) {
    const state = reactive({
      imgSource: require('../../img/redsoul.webp')
    })
    watch(() => props.eventSoul, (newValue) => {
      if (newValue === 7) {
        state.imgSource = require('../../img/BlueSoul.webp')
      }
    })

    return {
      state
    }
  },
  props: {
    eventSoul: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
#float-img {
    width: auto;
    height: 8vh;
    animation: float 4s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }

div {
    transform: translateY(-20vh) ;
}
</style>
