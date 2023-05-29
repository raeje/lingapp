import axios from "axios";
import { getItem } from "../../localStorage";

const LINGAPP_URL = process.env.REACT_APP_LINGAPP_URL;
const CONTENT_TYPE = "application/json;charset=UTF-8";

const getUser = async (id) => {
  const Authorization = getItem("Authorization");
  return await axios
    .get(`${LINGAPP_URL}/users/${id}`, {
      headers: {
        "Content-Type": CONTENT_TYPE,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const getAchievements = async (user_id) => {
  const Authorization = getItem("Authorization");
  return await axios
    .get(`${LINGAPP_URL}/users/${user_id}/achievements`, {
      headers: {
        "Content-Type": CONTENT_TYPE,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const updateUser = async ({
  id,
  badge_title,
  barangay,
  city,
  email,
  first_name,
  house,
  landmark,
  last_name,
}) => {
  const Authorization = getItem("Authorization");
  return await axios
    .patch(
      `${LINGAPP_URL}/users/${id}`,
      {
        badge_title,
        barangay,
        city,
        email,
        first_name,
        house,
        landmark,
        last_name,
      },
      {
        headers: {
          "Content-Type": CONTENT_TYPE,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

export { getAchievements, getUser, updateUser };
