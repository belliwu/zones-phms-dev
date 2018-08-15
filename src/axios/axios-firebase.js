import axios from "axios";

const instance = axios.create({
  // baseURL: "https://tmuh-arms-6b123.firebaseio.com"
  baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty"
});

//instance.defaults.headers.common["Something"] = "Something";

export default instance;
