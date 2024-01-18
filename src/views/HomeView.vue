<template>
    <p>{{msg}}</p>
    <p v-html="raw_html"></p>
    <button :disabled="isButtonDisabled">Button</button>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
      return {
          raw_html: "<a href='https://www.baidu.com'>nice</a>",
          isButtonDisabled: true
      }
  }
}
</script>
