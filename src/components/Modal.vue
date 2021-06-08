<template>
  <div v-if="show" class="modal">
    <div class="modal-dialog" :style="{ width: width || '300px' }">
      <div class="modal-header">
        <h3>{{title}}</h3>
        <a @click="$emit('toggle')" class="close-modal" href="javascript:void(0)">
          <i class="fa fa-times"></i>
        </a>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
      title: {
        required: true,
        type: String
      },
      width: {
        required: false,
        type: String
      },
      show: {
        required: false,
        type: Boolean
      }
    }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-dialog {
    background-color: $white;

    .modal-header {
      padding: 10px;
      background-color: $primary;
      color: $white;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .close-modal {
        color: $white;
        font-size: 1.5rem;
      }
    }

    .modal-content {
      padding: 10px;
    }
  }
}
</style>