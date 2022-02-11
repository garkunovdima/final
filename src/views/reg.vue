<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4">
      <div class="text-center">
        <h1>Регистрация</h1>
        <div class="p-2">
          <p>Имя пользователя</p>
          <input v-model="name" class="w-100" type="text" />
        </div>
        <div class="p-2">
          <p>Адрес электронной почты</p>
          <input v-model="email" class="w-100" type="email" />
        </div>
        <div class="p-2">
          <p>Пароль</p>
          <input v-model="password" class="w-100" type="password" />
        </div>
        <div class="p-2">
          <p>О себе</p>
          <textarea v-model="about" class="w-100" name="" id="" rows="10"></textarea>
        </div>
        <div class="p-2">
          <input
            class="w-100"
            @click="register"
            value="Подтвердить регистрацию"
            type="button"
          />
        </div>
      </div>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
export default {
  name: "regPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      about: "",
      acceptText:
        "Я уверен/а в правильности заполненных полей и хочу зарегестрироваться",
    };
  },
  computed: {
    regRule() {
      return (
        this.name.length > 1 &&
        this.password.length >= 6 &&
        this.email.indexOf("@") >= 1
      );
    },
  },
  methods: {
    register() {
      if (confirm(this.acceptText)) {
        if (this.regRule) {
          this.$store.dispatch("user/signIn", {
            name: this.name,
            email: this.email,
            password: this.password,
            about: this.about,
          });
        } else alert("Заполните необходимые поля!");
      }
    },
  },
};
</script>

<style scoped>
p {
  text-align: left;
}
</style>