<template>
  <div id="signup">
    <div class="signup-form">
      <h2>註冊</h2>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email">
        </div>

        <div class="input">
          <label for="password">密碼</label>
          <input type="password" id="password" v-model="password">
        </div>

        <div class="input">
          <label for="confirm-password">確認密碼</label>
          <input type="password" id="confirm-password" v-model="confirmPassword">
        </div>

        <div class="submit">
          <button type="submit" class="myButton">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    onSubmit() {
      const signupData = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      console.log("BELLIWU>>> 1.Signup submit() : ", signupData);

      // Store response data to vuex store
      this.$store
        .dispatch("signup", signupData)
        .then(() => {
          // 接收 resolve
          console.log(
            "BELLIWU>>> 4. Signup: get Promise resolve AND Routes to Dashbpard page ..."
          );
          // 使用 $router.push 轉跳到 Dashboard Page
          this.$router.push("/dashboard");
        })
        .catch(() => {
          // 接收 reject
          console.log("BELLIWU>>>4. Signup: error get Promise reject!");
        });
    }
  }
};
</script>

<style scoped>
.signup-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

h2 {
  text-align: center;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.submit {
  text-align: center;
}

.submit button {
  border: 1px solid #521751;
  border-radius: 5px;
  color: #521751;
  margin: 15px auto;
  padding: 5px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
