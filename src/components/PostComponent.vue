<template>
  <div class="">
    <dialog-component class="crudDialog" v-if="crudDialogVisible">
      <template v-slot:dialogMain>
        <div class="crudflex p-4">
          <div>
            <crud-component
              @close="crudDialogVisible = false"
              @cancel="crudDialogVisible = false"
              @save="save"
              :crudrule="crudrule"
              :post="post"
            ></crud-component>
          </div>
        </div>
      </template>
    </dialog-component>
    <button v-if="crudrule" @click="crudDialogVisible=true" class="btn btn-info">Редактировать публикацию</button>
    <button v-if="crudrule" @click="deletePost" class="btn btn-danger">Удалить</button>
    <div class="post_data post shadow my-3 p-3">
      <div>post id: {{ post.id }}</div>
      <div class="h2">{{ post.header }}</div>
      <div>
        <span>{{ post.date }} </span>
        <span v-if="post.author && post.date"> / </span>
        <router-link :to="{ path: `/profile/${post.authorLink}` }">{{
          post.author
        }}</router-link>
      </div>
      <div>{{ post.text }}</div>
    </div>
    <div class="buttons"></div>
  </div>
</template>
<script>
import dialogComponent from "@/./components/DialogComponent.vue";
import crudComponent from "@/./components/CrudComponent.vue";

export default {
  name: "PostComponent",
  components: {
    dialogComponent,
    crudComponent,
  },
  props: {
    crudrule: { type: Boolean, default: false },
    post: { type: Object },
  },
  data() {
    return {
      crudDialogVisible: false,
    };
  },
  methods: {
    deletePost(){
      if(confirm('Вы уверены, что хотите удалить публикацию?')){
        this.$store.dispatch('posts/deletePost', this.post);
      }
    },
    save(data) {
      console.log("SAVE in POST: ", data);
      console.log(this.post);
      this.$store.dispatch("posts/updatePost", {
        id: this.post.id,
        header: data.header,
        text: data.text,
      });
    },
  },
};
</script>
<style>
.crudflex {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: auto;
  border-radius: 10px;
}
.crudDialog {
  position: fixed;
  top: 0;
  left: 0;
}
.post,
.post * {
  background: white;
}
</style>