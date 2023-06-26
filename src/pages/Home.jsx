import React, { useEffect } from "react";
import Post from "../components/Post";
import "./Home.scss";
import useGetFirstMessages from "../hooks/useGetFirstMessages";
import { useState } from "react";

function Home() {
  const [isNewMessagesBelow, setNewMessagesBelow] = useState(true);
  const messages = useGetFirstMessages();
  const messagesReverse = messages.reverse();

  return (
    <div className='postsline'>
      <div className='buttonToFilterPost'>
        Используйте эту кнопку, чтобы отображать новые сообщения {isNewMessagesBelow ? "в конце" : "в начале"} ленты
        <button onClick={() => setNewMessagesBelow((prev) => !prev)}>Фильтр</button>
      </div>
      <div className='posts'>
        {isNewMessagesBelow
          ? messages.map((message, index) => (
              <Post
                message={message}
                key={index}
              />
            ))
          : messagesReverse.map((message, index) => (
              <Post
                message={message}
                key={index}
              />
            ))}
      </div>
    </div>
  );
}

export default Home;
