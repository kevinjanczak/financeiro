<template>
  <button v-bind="$attrs" v-on="$listeners" :class="classes">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["variant"],
  computed: {
    classes() {
      return {
        btn: true,
        [`btn-${this.variant}`]: true,
      };
    },
  },
};
</script>

<style lang="scss">
.btn {
  color: $white;
  border-radius: 2px;
  outline: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.2s;
}

.btn i {
  margin-right: 5px;
}

.btn-success {
  background-color: $success;
}

.btn-primary {
  background-color: $primary;
}

.btn:hover {
  filter: opacity(90%);
}
</style>