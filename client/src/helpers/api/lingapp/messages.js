import axios from "axios";
import { getItem } from "../../localStorage";

const LINGAPP_URL = process.env.REACT_APP_LINGAPP_URL;

const postMessage = async ({ event_id, body }) => {
  const Authorization = getItem("Authorization");
  return await axios
    .post(
      `${LINGAPP_URL}/messages/`,
      { event_id, body },
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
      console.log(errors);
      return errors.response;
    });
};

export { postMessage };
