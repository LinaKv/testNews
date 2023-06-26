import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function useGetFirstMessages() {
  const [messages, setMessages] = useState([]);

  async function fetchMessages(index) {
    try {
      const url = "http://a0830433.xsph.ru/";
      const formData = new FormData();
      formData.append("actionName", "MessagesLoad");
      formData.append("messageId", index);

      const response = await axios.post(url, formData);
      const data = response.data;

      if (index === 0) {
        setMessages(data.Messages);
      } else if (data.Messages) {
        setMessages((prev) => [...prev, ...data.Messages]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMessages(0);
  }, []);

  useEffect(() => {
    const int = setInterval(() => {
      if (messages[messages.length - 1]) {
        fetchMessages(messages[messages.length - 1].id);
      }
    }, 5000);

    return () => {
      clearInterval(int);
    };
  }, [messages]);

  return messages;
}

export default useGetFirstMessages;
