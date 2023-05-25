import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { getMessages } from "../helpers/api/lingapp/events";
import { postMessage } from "../helpers/api/lingapp/messages";
import { useJwt } from "react-jwt";
import { getItem } from "../helpers/localStorage";
import logo from "../images/logo-with-title.png";
import { toast } from "react-toastify";

const POLLING_TIMEOUT_SECS =
  Number(process.env.REACT_APP_POLLING_TIMEOUT_SECS) || 10;

const EventChat = () => {
  const { id } = useParams();
  const { decodedToken } = useJwt(getItem("Authorization"));
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      setCounter(counter + 1);
      fetchData();
    }, POLLING_TIMEOUT_SECS * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  const fetchData = async () => {
    try {
      const response = await getMessages(id);
      setMessages(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  const sendMessage = async () => {
    const body = document.querySelector("#message").value;
    const response = await postMessage({ event_id: id, body });

    if (response.status === 201) {
      fetchData();
      document.querySelector("#message").value = "";
    } else {
      toast.error(response.data.errors.base[0]);
    }
  };

  const elapsedTime = (date) => {
    const currentTime = new Date();
    const createTime = new Date(date);
    const elapsed = Math.floor((currentTime - createTime) / 1000);

    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const remainingSeconds = elapsed % 60;

    const hoursFormat = hours ? `${hours.toString().padStart(2, "0")}h` : "";
    const minutesFormat = minutes
      ? `${minutes.toString().padStart(2, "0")}m`
      : "";
    const remainingSecondsFormat = remainingSeconds
      ? `${remainingSeconds.toString().padStart(2, "0")}s`
      : "";
    return `${hoursFormat} ${minutesFormat} ${remainingSecondsFormat} ago`;
  };

  const MessageBubble = ({ message, isCurrentUser }) => {
    const containerModifier = isCurrentUser ? "justify-end" : "justify-start";
    const bubbleModifier = isCurrentUser ? "bg-red-500 text-white" : "bg-white";

    const NameAndTimeElapsed = ({ message, isCurrentUser }) => {
      return (
        <div
          className="flex gap-1 absolute -top-1 bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10
        px-1 rounded-sm"
        >
          <span className="text-xs font-bold ">
            {isCurrentUser ? "ME" : message.user_full_name}
          </span>
          <span className="text-xs text-gray-700">
            {elapsedTime(message.created_at)}
          </span>
        </div>
      );
    };

    return (
      <div
        className={`messages-container w-full z-20 flex relative ${containerModifier}`}
      >
        <NameAndTimeElapsed message={message} isCurrentUser={isCurrentUser} />
        <span
          className={`w-fit max-w-xs flex text-md px-3 py-2 my-3 rounded-2xl shadow-md shadow-gray-600 ${bubbleModifier}`}
        >
          {message.body}
        </span>
      </div>
    );
  };

  return (
    <div className="h-96 w-full bg-white mb-1 flex flex-col p-2">
      <div
        className="h-5/6 w-full flex flex-col px-2 overflow-y-scroll relative bg-cover bg-no-repeat bg-center bg-image bg-opacity-75"
        style={{ backgroundImage: `url(${logo})` }}
        ref={messagesContainerRef}
      >
        {messages.map((message) => {
          return (
            <MessageBubble
              message={message}
              isCurrentUser={decodedToken?.user_id === message.user_id}
            />
          );
        })}
      </div>
      <div className="h-1/6 w-full p-2 bg-gray-100 rounded-xl flex">
        <textarea
          id="message"
          rows="1"
          className="h-full w-full bg-white text-red-600 rounded-xl p-3 text-sm placeholder-gray-500"
          placeholder="Write your message here..."
        />
        <button onClick={sendMessage}>
          <PaperAirplaneIcon className="h-6 w-6 text-red-500 mx-2" />
        </button>
      </div>
    </div>
  );
};

export default EventChat;
