<template>
  <div class="dashboard">
    <h1>That is the Dasboard !</h1>
    <p>You should only get here if you are authenticated !</p>
    <p>Your Email address is {{email}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dashboard",
  data() {
    return {
      email: ""
    };
  },
  created() {
    axios
      .get("/user.json")
      .then(res => {
        console.log(res);
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        console.log(users);
        this.email = users[0].email;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  margin-top: 20px auto;
}

p {
  color: red;
}
</style>
