import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:5000/api/`,
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});
