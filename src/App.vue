<template >
  <dialog-component v-if="loginDialogVisible">
    <template v-slot:dialogMain>
      <login-component
        class="shadow"
        @closeLoginComponent="loginDialogVisible = false"
      ></login-component>
    </template>
  </dialog-component>
  <div id="nav" class="container-xl d-flex justify-content-between p-3 py-4">
    <div>
      <router-link to="/">Feed</router-link>
    </div>
    <div>
      <router-link class="mx-2" v-if="profileInfo.authState" :to="goProfile">{{
        profileInfo.profileLink
      }}</router-link>
      <span>
        <span v-if="profileInfo.authState">
          <button @click="logout">Logout</button>
        </span>
        <span v-if="!profileInfo.authState">
          <button @click="$router.push('reg')">reg</button>
          <button @click="loginDialogVisible = true">login</button>
        </span>
      </span>
    </div>
  </div>
  <main class="container">
    <router-view />
  </main>
</template>

<script>
import dialogComponent from "@/./components/DialogComponent.vue";
import loginComponent from "@/./components/LoginComponent.vue";

export default {
  components: {
    dialogComponent,
    loginComponent,
  },
  data() {
    return {
      loginDialogVisible: false,
    };
  },
  computed: {
    profileInfo() {
      return this.$store.getters["user/profileInfo"];
    },
    goProfile() {
      if (this.profileInfo.authState) {
        return "/profile/" + this.profileInfo.uid;
      } else return "/";
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logOut");
    },

    // closeWindow() {
    //   this.loginDialogVisible = false;
    // },
  },
};
</script>

<style>
* {
  background: azure;
}
.shadow {
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
