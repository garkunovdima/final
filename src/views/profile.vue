<template>
  <div>
    <div class="text-center">
      <div>{{ profileInfo.userData ? profileInfo.userData.name : "Name" }}</div>
      <div><img src="@/assets/logo.png" alt="" class="" /></div>
      <div>
        {{ profileInfo.userData ? profileInfo.userData.email : "Email" }}
      </div>
      <div>
        {{ profileInfo.userData ? profileInfo.userData.about : "About" }}
      </div>
    </div>
    <div>
      <button
        @click="isCreatePostField = true"
        v-if="!isCreatePostField"
        class="w-100 btn btn-info"
      >
        Создать новую публикацию
      </button>
      <button
        @click="isCreatePostField = false"
        v-if="isCreatePostField"
        class="w-100 btn btn-danger"
      >
        Отмена
      </button>
      <div v-if="isCreatePostField">
        <crud-component
          @close="crudDialogVisible = false"
          @cancel="crudDialogVisible = false"
          @create="create"
          :crudrule="false"
        ></crud-component>
      </div>
    </div>
    <feed-component :crudrule="crudrule" :data="myPostsArray"></feed-component>
  </div>
</template>
<script>
import crudComponent from "@/components/CrudComponent.vue";
import feedComponent from "@/components/FeedComponent.vue";

export default {
  name: "profile",
  components: {
    crudComponent,
    feedComponent,
  },
  data() {
    return {
      isCreatePostField: false,
      newPost: {
        header: "",
        text: "",
      },
    };
  },
  computed: {
    crudrule() {
      console.log("this.profileInfo.uid", this.profileInfo.uid);
      console.log(
        "this.profileInfo.userData.uid",
        this.profileInfo.userData.uid
      );
      if (this.profileInfo.uid === this.profileInfo.userData.uid) return true;
      else return false;
    },
    profileInfo() {
      return this.$store.getters["user/profileInfo"];
    },
    uid() {
      return this.$route.params.uid;
    },
    myPostsArray() {
      let temp = [];

      if (this.profileInfo.userData) {
        if (this.profileInfo.userData.myPosts) {
          const myPosts = this.profileInfo.userData.myPosts;

          for (let key in myPosts) {
            temp.push(myPosts[key]);
          }

          return temp;
        }
      }
      return [];
    },
  },
  watch: {
    "$route.params.uid": function () {
      console.log("UIDDDD: ", this.$route.params.uid);
      this.$store.dispatch("user/getUser", this.$route.params.uid);
      // this.$store.dispatch("user/getUser", this.uid);
    },
  },
  methods: {
    create(data) {
      console.log("create");

      data.id = new Date().getTime();
      data.author = this.profileInfo.userData.name;
      data.authorLink = this.profileInfo.uid;
      data.date = new Date().toString();

      this.$store.dispatch("posts/createPost", data);
    },
  },
  mounted() {
    this.$store.dispatch("user/getUser", this.$route.params.uid);
    // this.$store.dispatch("user/getUser", this.uid);
  },
};
</script>
<style scoped>
</style>