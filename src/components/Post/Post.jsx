import React, { useEffect } from "react";
import "./Post.scss";
import { ReactComponent as Avatar } from "../../attachments/avatar.svg";
import { ReactComponent as Arrow } from "../../attachments/arrow.svg";
import { ReactComponent as Fav } from "../../attachments/fav.svg";
import { ReactComponent as FavCh } from "../../attachments/favCh.svg";
import { ReactComponent as Settings } from "../../attachments/settings.svg";
import { ReactComponent as Window } from "../../attachments/window.svg";
import { useState } from "react";

function Post({ message, favorite }) {
  const [isShortenedVersion, setIsShortenedVersion] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const { author, content, channel, id, date, attachments } = message;

  const [years, time] = date.split(" ");
  const [hours, minutes, seconds] = time.split(":");

  useEffect(() => {
    if (favorite) {
      setIsFavorite(true);
    }
  }, [favorite]);

  function toggleFavorite() {
    const savedFav = JSON.parse(localStorage.getItem("favoriteItems")) || [];
    let newFav = [];
    if (isFavorite) {
      newFav = savedFav.filter((item) => item !== id);
    } else {
      newFav = [...savedFav, id];
    }

    localStorage.setItem("favoriteItems", JSON.stringify(newFav));

    setIsFavorite((prev) => !prev);
  }

  return (
    <div
      className='post'
      id={id}
    >
      <div className='avatar'>
        <Avatar />
        <div className='time'>
          {hours}:{minutes}
        </div>
      </div>
      <div className='content'>
        <div className='user'>
          <div className='userInfo'>
            <div className='name'>{author}</div>
            <div className='channel'>{channel}</div>
          </div>

          <div className='icons'>
            <Arrow />
            <Window />
            <Settings className='settings' />
            {isFavorite ? (
              <FavCh
                className='fav'
                onClick={toggleFavorite}
              />
            ) : (
              <Fav
                className='fav'
                onClick={toggleFavorite}
              />
            )}
          </div>
        </div>
        <div className='text'>
          <div className={isShortenedVersion ? "textOfPostShortenedVersion" : "textOfPostFullVersion"}>{content}</div>
          {content.length > 326 ? (
            <button
              className='showMore'
              onClick={() => setIsShortenedVersion((prev) => !prev)}
            >
              {isShortenedVersion ? "Далее" : "Свернуть"}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className='attachments'>
          {attachments[0]?.type === "image" ? (
            <div className='img'>
              <img
                src={attachments[0].url}
                alt=''
              />
            </div>
          ) : attachments[0]?.type === "video" ? (
            <video
              controls
              src={attachments[0].url}
            />
          ) : (
            ""
          )}
        </div>
        <div className='hesh'>
          <p>#Новое</p>
          <p>#Эксперт</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
