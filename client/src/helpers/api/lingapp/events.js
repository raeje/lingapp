import axios from "axios";
import { getItem } from "../../localStorage";

const LINGAPP_URL = process.env.REACT_APP_LINGAPP_URL;
const CONTENT_TYPE = "application/json;charset=UTF-8";

const getEvent = async (id) => {
  const Authorization = getItem("Authorization");
  return await axios
    .get(`${LINGAPP_URL}/events/${id}`, {
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

const getGuestList = async (id) => {
  const Authorization = getItem("Authorization");
  return await axios
    .get(`${LINGAPP_URL}/events/${id}/guest_list`, {
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

const getEvents = async () => {
  const Authorization = getItem("Authorization");
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

const createEvent = async ({
  barangay,
  category,
  city,
  description,
  ends_at,
  house,
  landmark,
  maximum_participants,
  name,
  notes,
  starts_at,
  image,
}) => {
  const Authorization = getItem("Authorization");
  return await axios
    .post(
      `${LINGAPP_URL}/events`,
      {
        barangay,
        category,
        city,
        description,
        ends_at,
        house,
        landmark,
        maximum_participants,
        name,
        notes,
        starts_at,
        image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export { getEvent, getEvents, createEvent, getGuestList };
