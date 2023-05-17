import axios from "axios";
import { getItem } from "../../localStorage";

const LINGAPP_URL = process.env.REACT_APP_LINGAPP_URL;
const CONTENT_TYPE = "application/json;charset=UTF-8";
const Authorization = getItem("Authorization");

const getEvents = async () => {
  return await axios
    .get(`${LINGAPP_URL}/events`, {
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

export { getEvents };
