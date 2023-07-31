import post from "../styles/Posts.module.css"
import { BiNews } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Blurhash } from "react-blurhash";
import { useSelector } from "react-redux";

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
    const theme = useSelector((state: any) => state.data.theme);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    return (
      <div className={theme === "light" ? post.light : post.dark}>
        <div className={post.newsHeader}>
          <Image
            loading="lazy"
            src={userImg}
            alt=""
            className={post.postImage}
            height={40}
            width={40}
          ></Image>
          <Link
            href={`/user/${username}/?client_id=${process.env.accessKey}`}
            className={post.userName}
          >
            <p className={post.userName}>{username}</p>
          </Link>
          <BiNews className={post.newsIcon} />
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            loading="lazy"
            src={img}
            alt=""
            className={post.img}
            objectFit="contain"
            height={500}
            width={500}
            onLoadingComplete={() => {
              setIsImageLoaded(true);
            }}
            style={{
              opacity: isImageLoaded ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
              zIndex: isImageLoaded ? 1 : -1,
              position: "absolute",
            }}
          />
          <Blurhash
            hash={blurHash}
            height={500}
            style={{
              width: "100%",
              objectFit: "cover",
              opacity: isImageLoaded ? 0.5 : 1,
              transition: "opacity 0.3s ease-in-out",
              position: "absolute",
              zIndex: isImageLoaded ? -1 : 1,
            }}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
        <div className={post.iconBar}>
          <AiFillLike
            className={post.like}
            style={{ marginLeft: "0rem", color: "var[--color-fg]" }}
          />
          <div>{like}</div>
          <FaRegCommentDots
            className={post.like}
            style={{ color: "var[--color-fg]" }}
          />
        </div>

        <div className={post.caption} style={{ color: "var[--color-fg]" }}>
          <span className={post.data}>{username}</span>
          <div className={post.bio}>{caption}</div>
        </div>

        <form className={post.form}>
          <BsEmojiSmile
            className={post.smileIcon}
            style={{ color: "var[--color-fg]" }}
          />
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