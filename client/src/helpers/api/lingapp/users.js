import axios from "axios";

const LINGAPP_URL = process.env.REACT_APP_LINGAPP_URL;

const me = async () => {
  return await axios
    .get(`${LINGAPP_URL}/users/me`)
    .then((response) => {
      return response;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

export { me };
