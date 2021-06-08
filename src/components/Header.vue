<template>
  <header class="header">
    <h2 class="brand">
      <router-link to="/" class="link"> Finanças </router-link>
    </h2>
    <nav class="nav">
      <router-link to="/" exact class="link" active-class="on" href>Dashboard</router-link>
      <router-link to="/payable" class="link" active-class="on" href>Dividas</router-link>
      <router-link to="/receivable" class="link" active-class="on" href>Recebimentos</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss">
.header {
  background-color: $primary;
  height: 60px;
  padding: 0px 20px;
  vertical-align: middle;
  display: flex;
  align-items: baseline;

  & > * {
    line-height: 60px;
  }

  .brand {
    margin-right: 20px;
  }

  .link {
    text-decoration: none;
    color: $white;
  }

  .nav .link {
    margin: 0px 5px;

    &.on {
      color: $success;
    }
  }
}
</style>