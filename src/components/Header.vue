<template>
  <header class="header">
    <h2 class="brand">
      <router-link to="/" class="link"> Finanças </router-link>
    </h2>
    <i @click="open = true" class="fa fa-bars menu"></i>
    <nav :class="classes">
      <i @click="open = false" class="fa fa-times close-menu"></i>
      <router-link to="/" exact class="link" @click.native="open = false" active-class="on" href
        >Dashboard</router-link
      >
      <router-link to="/payable" class="link" @click.native="open = false" active-class="on" href
        >Dividas</router-link
      >
      <router-link to="/receivable" class="link" @click.native="open = false" active-class="on" href
        >Recebimentos</router-link
      >
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    open: false,
  }),
  computed: {
    classes() {
      return {
        active: this.open,
        nav: true
      }
    }
  }
};
</script>

<style lang="scss">

@media screen and (max-width: 500px) {
  .header {
    justify-content: space-between;

    .menu {
      display: block !important;
    }

    .nav {
      position: fixed;
      top: 0;
      left: 0;
      padding: 20px;
      right: 0;
      bottom: 0;
      background-color: $primary;
      z-index: 2;
      display: none;

      &.active {
        display: flex !important;
        flex-direction: column;
        align-items: center;
      }

      .close-menu {
        display: block;
      }
    }
  }
}

.header {
  background-color: $primary;
  height: 60px;
  padding: 0px 20px;
  vertical-align: middle;
  display: flex;
  align-items: baseline;

  .menu {
    font-size: 1.3rem;
    color: $white;
    display: none;
  }

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

  .close-menu {
    color: $white;
    font-size: 1.5rem;
    align-self: flex-end;
    margin-bottom: 30px;
    display: none;
  }
}
</style>