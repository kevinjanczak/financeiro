<template>
  <div id="app">
      <Header/>
      <Container>
        <router-view></router-view>
      </Container>
  </div>
</template>

<script>
import Container from './components/Container.vue'
import Header from './components/Header.vue'
export default {
  components: { Header, Container },

}
</script>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body, input, textarea {
    font-family: Poppins, Arial, sans-serif;
  }

  .title {
    margin-bottom: 20px;
  }
</style>
