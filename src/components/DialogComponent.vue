<template>
  <div class="dialogShadow dialog w-100 border border-danger" @click="closeDialog">
    <div
      class="
        dialogShadow
        d-flex
        flex-column
        justify-content-center
        align-content-center
        border border-info
        h-100
      "
    >
      <slot name="dialogMain" class="dialogMain">dialogMain</slot>
    </div>
  </div>
</template>
<script>
// import Login from '@/components/login.vue'
export default {
  name: "DialogComponent",
  components: {
    // Login,
  },
  props: {
    dialogVisible: { type: Boolean, default: false },
  },
  methods:{
    close() {
      this.$emit("closeDialog");
    },
  }
};
</script>
<style scoped>
.dialog {
  position: fixed;
  height: 100%;
  z-index: 100;
  margin: 0;
  padding: 0;
}
.dialogShadow {
  background: rgba(0, 0, 0, 0.2);
}
.dialogMain{
  background: ghostwhite;
  border-radius: 10px;
}
</style>