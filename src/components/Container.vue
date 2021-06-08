<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Container",
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 0px;
}

@media screen and (max-width: 500px) {
  .container {
    padding: 20px;
  }
}
</style>