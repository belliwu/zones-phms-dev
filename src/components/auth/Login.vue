<template>
  <div id="login">
    <div class="login-form">
      <h2>簽到</h2>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email">
        </div>

        <div class="input">
          <label for="password">密碼</label>
          <input type="password" id="password" v-model="password">
        </div>

        <div class="submit">
          <button type="submit" class="myButton">提交</button>
        </div>

        <div class="forgotPasswd" v-if="!feedback">
          <router-link to="/signup">
            <i class="fas fa-lock"></i>
            沒有註冊 ?
          </router-link>
        </div>
      </form>
      <div class="feedback" v-if="feedback">{{feedback}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: "",
        password: "",
        token: ""
      };
    },
    computed: {
      feedback() {
        return !this.$store.getters.feedback
          ? false
          : this.$store.getters.feedback;
      }
    },
    methods: {
      onSubmit() {
        const loginData = {
          userId: null,
          email: this.email,
          password: this.password
        };
        console.log(loginData);

        this.$store.dispatch("login", loginData);
      }
    }
  };
</script>

<style scoped>
  .login-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
    background-color: beige;
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

  .forgotPasswd {
    text-align: center;
  }

  .feedback {
    text-align: center;
    color: red;
  }
</style>
