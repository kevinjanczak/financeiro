<template>
  <div class="input-container">
    <fieldset class="input-wrapper">
      <input
        :name="name"
        :id="name"
        placeholder=" "
        :type="type || 'text'"
        class="input"
        :value="realValue"
        @input="realValue = $event.target.value"
      />
      <label class="label">{{ label }}</label>
    </fieldset>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "update:value",
  },
  name: "Input",
  props: {
    name: {
      required: false,
    },
    type: {
      required: false,
    },
    label: {
      required: false,
    },
    value: {
      required: false,
    },
  },
  computed: {
    realValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:value", value);
      },
    },
  },
};
</script>

<style lang="scss">
.input-container {
  margin-top: 10px;
  margin-bottom: 15px;
}

.input-wrapper {
  padding-top: calc(0.8rem + 2px);
}

.input-container .input-wrapper {
  border: none;
  position: relative;
}

.input-wrapper .input {
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #000;
  outline: none;
  border-radius: 0;
  font-size: 16px;
  padding-top: 2px;
  padding-bottom: 2px;
  width: 100%;
}

.input-wrapper .label {
  position: absolute;
  left: 0;
  transition: 0.2s;
  top: 1rem;
  pointer-events: none;
}

.input:focus + .label,
.input:not(:placeholder-shown) + .label {
  font-size: 0.8rem;
  transform: translateY(calc(calc(0.8rem + 2px) * -1));
}

.input-wrapper::after {
  content: " ";
  background-color: $primary;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  transform: scaleX(0);
  transition: 0.2s;
}

.input-wrapper:focus-within::after {
  transform: scaleX(1);
}

.input:focus + .label {
  color: $primary;
}
</style>