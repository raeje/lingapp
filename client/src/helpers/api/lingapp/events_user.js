import axios from "axios";
import { getItem } from "../../localStorage";

const LINGAPP_URL = process.env.REACT_APP_LINGAPP_URL;
const CONTENT_TYPE = "application/json;charset=UTF-8";

const joinEvent = async (event_id) => {
  const Authorization = getItem("Authorization");
  return await axios
    .post(
      `${LINGAPP_URL}/events_users`,
      { event_id },
      {
        headers: {
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

const leaveEvent = async (event_id) => {
  const Authorization = getItem("Authorization");
  return await axios
    .delete(`${LINGAPP_URL}/events_users/${event_id}`, {
      headers: {
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

const updateGuestList = async ({ id, is_approved, has_attended }) => {
  const Authorization = getItem("Authorization");
  return await axios
    .patch(
      `${LINGAPP_URL}/events_users/${id}`,
      {
        id,
        is_approved,
        has_attended,
      },
      {
        headers: {
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

export { joinEvent, leaveEvent, updateGuestList };
