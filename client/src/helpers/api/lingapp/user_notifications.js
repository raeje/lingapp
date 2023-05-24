import axios from "axios";
import { getItem } from "../../localStorage";

const LINGAPP_URL = process.env.REACT_APP_LINGAPP_URL;
const CONTENT_TYPE = "application/json;charset=UTF-8";

const getUserNotifications = async () => {
  const Authorization = getItem("Authorization");
  return await axios
    .get(`${LINGAPP_URL}/user_notifications/`, {
      headers: {
        "Content-Type": CONTENT_TYPE,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const updateUserNotification = async (id) => {
  const Authorization = getItem("Authorization");
  return await axios
    .patch(
      `${LINGAPP_URL}/user_notifications/${id}`,
      { is_read: true },
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
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

export { getUserNotifications, updateUserNotification };
