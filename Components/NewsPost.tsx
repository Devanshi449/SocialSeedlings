import post from "../styles/Posts.module.css"
import { BiNews } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

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
            
            <div className={post.newsHeader}>
                <Image src={userImg} alt="" className={post.postImage}>
                </Image>
                <Link href={`/user/${username}/?client_id=${process.env.accessKey}`} className={post.userName}><p className={post.userName}>{username}</p></Link>
                <BiNews className={post.newsIcon}/>
            </div>
            
            <Image src={img} className={post.img} alt="image">
            </Image>
            
            <div className={post.iconBar}>
                <AiFillLike className={post.like} style={{marginLeft : "0rem"}}/>
                <div>{like}</div>
                <FaRegCommentDots className={post.like}/>
            </div>
            
            <div className={post.caption}>
                <span className={post.data}>{username}</span>
                <div className={post.bio}>{caption}</div>
            </div>
            
            <form className={post.form}>
                <BsEmojiSmile className={post.smileIcon}/>
                <input type="text" placeholder="Add your comment" className={post.inputBox}/>
                <button className={post.button}>Post</button>
            </form>
        </div>

    )
}