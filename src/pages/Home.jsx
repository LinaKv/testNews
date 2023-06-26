import React, { useEffect } from "react";
import Post from "../components/Post/Post";
import "./Home.scss";
import useGetFirstMessages from "../hooks/useGetFirstMessages";
import { useState } from "react";
import axios from "axios";

function Home() {
  const [isNewMessagesBelow, setNewMessagesBelow] = useState(true);
  const [oldMessages, setOldMessages] = useState([]);
  const messages = useGetFirstMessages();

  function renderPost(message, index) {
    const favoriteItemsJSON = localStorage.getItem("favoriteItems");
    const favoriteItems = JSON.parse(favoriteItemsJSON);
    const favorite = favoriteItems?.find((el) => el === message.id);

    return (
      <Post
        message={message}
        key={`${message.id}+${index}`}
        favorite={favorite}
      />
    );
  }

  async function fetchOldMessages() {
    try {
      const url = "http://a0830433.xsph.ru/";
      const formData = new FormData();
      formData.append("actionName", "MessagesLoad");
      formData.append("oldMessages", true);

      const response = await axios.post(url, formData);
      const data = response.data;

      setOldMessages((prev) => [...prev, ...data.Messages]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;

      const windowHeight = window.innerHeight;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const isAtEnd = scrollTop + windowHeight >= scrollHeight;
      if (isAtEnd && !isNewMessagesBelow) {
        fetchOldMessages();
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNewMessagesBelow]);

  return (
    <div className='postsline'>
      <div className='buttonToFilterPost'>
        Сейчас новые посты отображаются {isNewMessagesBelow ? "в конце" : "в начале"} ленты
        <button onClick={() => setNewMessagesBelow((prev) => !prev)}>Изменить</button>
      </div>
      <div className='posts'>
        {isNewMessagesBelow
          ? messages.map((message, index) => renderPost(message, index))
          : messages.toReversed().map((message, index) => renderPost(message, index))}
        {oldMessages && !isNewMessagesBelow ? (
          oldMessages.map((message, index) => (
            <Post
              message={message}
              key={index}
            />
          ))
        ) : (
          <div className='buttonToFilterPost'>
            Сейчас новые посты отображаются {isNewMessagesBelow ? "в конце" : "в начале"} ленты, поэтому старые посты не
            подгружаются
            <button onClick={() => setNewMessagesBelow((prev) => !prev)}>Изменить</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
