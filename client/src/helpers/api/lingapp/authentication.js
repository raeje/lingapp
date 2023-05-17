import axios from "axios";

const LINGAPP_URL = process.env.REACT_APP_LINGAPP_URL;

const signup = async ({
  name,
  role,
  email,
  password,
  password_confirmation,
}) => {
  return await axios
    .post(`${LINGAPP_URL}/signup`, {
      name,
      email,
      password,
      password_confirmation,
      role,
    })
    .then((response) => {
      return response;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const login = async ({ email, password }) => {
  return await axios
    .put(`${LINGAPP_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      return response;
    })
    .catch((errors) => {
      return errors;
    });
};

export { signup, login };
