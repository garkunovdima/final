<template>
  <div class="loginWindow m-auto p-3 text-center">
    <div>
      <div class="text-start">Email</div>
      <input v-model="email" placeholder="Email" type="email" />
    </div>
    <div>
      <div class="text-start">Password</div>
      <input v-model="password" placeholder="Password" type="password" />
    </div>
    <div v-if="error">Ошибка! {{ error }}</div>
    <div>Ещё не зарегестрирован?</div>
    <div><router-link to="/reg">Создать профиль</router-link></div>
    <div>
      <button @click="login" type="submit">Авторизация</button>
      <button @click="close" type="button">Закрыть</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "loginComponent",
  data() {
    return {
      email: "",
      password: "",
      err: "",
    };
  },
  computed: {
    error() {
      return this.err;
    },
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", {
          email: this.email,
          password: this.password,
        })
        .then((answer) => {
          if (answer == "login ok") {
            this.err = "";
          }
        })
        .then(() => this.close())
        .then(()=>this.$router.push('/'))
        .catch((answer) => {
          if (answer.message.includes("login")) {
            this.err = "Пользователь с таким логином не найден.";
          } else if (answer.message.includes("password"))
            this.err = "Неверный пароль.";
          else this.err = "Неизвестная ошибка.";
        });
    },
    close() {
      this.$emit("closeLoginComponent");
    },
  },
};
</script>
<style scoped>
.loginWindow{
  border-radius: 10px;
}
</style>