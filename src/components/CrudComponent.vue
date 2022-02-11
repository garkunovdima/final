<template>
  <div
    class="dialogShadow dialog w-100 shadow" style="background:white"
    @click="closeDialog"
  >
    <div>
      <div>Заголовок</div>
      <div><input v-model="header" class="w-100" type="text" /></div>
      <div>Текст</div>
      <div><textarea v-model="text" class="w-100" rows="10"></textarea></div>
      <div class="d-flex flex-column">
        <button @click="cancel" class="btn btn-danger my-2">Отмена</button>
        <button v-if="crudrule" class="btn btn-success my-2" @click="save">
          Сохранить
        </button>
        <button v-if="!crudrule" class="btn btn-success my-2" @click="create">
          Создать
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CrudComponent",
  props: {
    post: { type: Object },
    crudrule: { type: Boolean, default: false },
  },
  data() {
    return {
      header: "",
      text: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    cancel() {
      this.$emit("cancel");
      this.close();
    },
    save() {
      if (confirm("Сохранить изменения")) {
        this.$emit("save", { header: this.header, text: this.text });
        this.close();
      }
    },
    create() {
      if (confirm("Опубликовать новую публикацию?")) {
        this.$emit("create", { header: this.header, text: this.text });
        this.close();
      }
    },
  },
  mounted() {
    if (this.post && this.crudrule) {
      console.log("if TRUE");
      this.header = this.post.header;
      this.text = this.post.text;
    }
  },
};
</script>
<style scoped>
</style>