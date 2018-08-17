import axios from "axios";

const instance = axios.create({
  // below  is not for authunication
  // baseURL: "https://tmuh-arms-6b123.firebaseio.com"
  // below is for authunication
  baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty"
});

// instance.defaults.headers.common["Something"] = "Something";
// instance.defaults.headers.get["Accepts"] = "application/json";

export default instance;
