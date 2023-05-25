import axios from "axios";

const LINGAPP_URL = process.env.REACT_APP_LINGAPP_URL;

const signup = async ({
  firstName,
  lastName,
  role,
  email,
  password,
  passwordConfirmation,
  city,
  barangay,
  house,
  landmark,
}) => {
  return await axios
    .post(`${LINGAPP_URL}/signup`, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirmation: passwordConfirmation,
      role,
      city,
      barangay,
      house,
      landmark,
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
      return errors.response.data;
    });
};

export { signup, login };
