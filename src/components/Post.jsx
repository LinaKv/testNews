import React from "react";
import "./Post.scss";
import { ReactComponent as Avatar } from "../attachments/avatar.svg";
import { ReactComponent as Arrow } from "../attachments/arrow.svg";
import { ReactComponent as Fav } from "../attachments/fav.svg";
import { ReactComponent as Settings } from "../attachments/settings.svg";
import { ReactComponent as Window } from "../attachments/window.svg";
import { useState } from "react";

function Post({ message }) {
  const [isShortenedVersion, setIsShortenedVersion] = useState(true);

  const { author, content, channel, id, date, attachments } = message;

  const [years, time] = date.split(" ");
  const [hours, minutes, seconds] = time.split(":");

  return (
    <div className='post'>
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
            <Fav className='fav' />
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
      </div>
    </div>
  );
}

export default Post;
