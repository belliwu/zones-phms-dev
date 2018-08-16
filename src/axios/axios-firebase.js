import axios from "axios";

const instance = axios.create({
  baseURL: "https://tmuh-arms-6b123.firebaseio.com"
});

//instance.defaults.headers.common["Something"] = "Something";

export default instance;
