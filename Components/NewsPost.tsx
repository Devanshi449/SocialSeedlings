import post from "../styles/Posts.module.css"
import { BiNews } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

interface NewsPostProps {
  id: number;
  username: string;
  userImg: string;
  img: string;
  caption: string;
  like : number;
  blurHash : string;
}

export default function NewsPost({ id, username, userImg, img, caption , like , blurHash}: NewsPostProps)
{
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    console.log(blurHash);
    return (
      <div className={post.newsFeed}>
        <div className={post.newsHeader}>
          <Image
            src={userImg}
            alt=""
            className={post.postImage}
            layout="fill"
            objectFit="contain"
          ></Image>
          <Link
            href={`/user/${username}/?client_id=${process.env.accessKey}`}
            className={post.userName}
          >
            <p className={post.userName}>{username}</p>
          </Link>
          <BiNews className={post.newsIcon} />
        </div>

        {/* <Image
          src={img}
          className={post.img}
          alt="image"
          layout="fill"
          objectFit="contain"
        ></Image> */}
        <Image
          src={img}
          alt=""
          className={post.img}
          layout="fill"
          objectFit="contain"
          onLoadingComplete={() => {
            setIsImageLoaded(true);
          }}
          style={{
            opacity: isImageLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            zIndex: isImageLoaded ? 1 : -1,
          }}
        ></Image>
        {
          <Blurhash
            hash={blurHash}
            className={post.img}
            style={{
              objectFit: "cover",
              opacity: isImageLoaded ? 0.5 : 1,
              transition: "opacity 0.3s ease-in-out",
            }}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        }

        <div className={post.iconBar}>
          <AiFillLike className={post.like} style={{ marginLeft: "0rem" }} />
          <div>{like}</div>
          <FaRegCommentDots className={post.like} />
        </div>

        <div className={post.caption}>
          <span className={post.data}>{username}</span>
          <div className={post.bio}>{caption}</div>
        </div>

        <form className={post.form}>
          <BsEmojiSmile className={post.smileIcon} />
          <input
            type="text"
            placeholder="Add your comment"
            className={post.inputBox}
          />
          <button className={post.button}>Post</button>
        </form>
      </div>
    );
}