import post from "../styles/Posts.module.css"
import { BiNews } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import Image from "next/image";

interface NewsPostProps {
  id: number;
  username: string;
  userImg: string;
  img: string;
  caption: string;
  like : number;
}

export default function NewsPost({ id, username, userImg, img, caption , like}: NewsPostProps)
{
    return(
        <div className={post.newsFeed}>
            {/* // header  */}
            <div className={post.newsHeader}>
                <Image src={userImg} alt="" className={post.postImage}>
                </Image>
                <p className={post.userName}>{username}</p>
                <BiNews className={post.newsIcon}/>
            </div>
        {/* // img  */}
            <Image src={img} className={post.img} alt="image">
            </Image>
        {/* // buttons  */}
        <div className={post.iconBar}>
            <AiFillLike className={post.like} style={{marginLeft : "0rem"}}/>
            <div>{like}</div>
            <FaRegCommentDots className={post.like}/>
        </div>
        {/* // caption  */}
        <p className={post.caption}>
            <span className={post.data}>{username}</span>
            {caption}
        </p>
        {/* // comments  */}
        {/* // input box  */}
        <form className={post.form}>
            <BsEmojiSmile className={post.smileIcon}/>
            <input type="text" placeholder="Add your comment" className={post.inputBox}/>
            <button className={post.button}>Post</button>
        </form>
        </div>

    )
}