import userProfile from "../../styles/UserProfile.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import main from "../../styles/Main.module.css";
import Image from "next/image";
import post from "../../styles/Posts.module.css";
import { BiNews } from "react-icons/bi";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import Error from "@/Components/Error";
import Loader from "@/Components/Loader";


export default function UserProfile() {
  const theme = useSelector((state: any) => state.data.theme);

  const router = useRouter();
  const username = router.query.UserProfile;

  const [isListView, setisListView] = useState(false);
  const [photo, setPhotos] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [isError, setisError] = useState<any>(null);
  const [isLoading, setisLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/users/${username}/?client_id=${process.env.accessKey}`
      );
      const data = await response.data;
      setUser(data);
      const photoResponse = await axios.get(
        data.links.photos + `/?client_id=${process.env.accessKey}`
      );
      const photoData = await photoResponse.data;
      setPhotos(photoData);
    } catch (error: any) {
      setisError(error.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  if (!user) {
    return <Loader/>;
  }

  return (
    <div
      style={{ backgroundColor: "var(--color-bg)", height: "100%" }}
      className={theme === "light" ? main.light : main.dark}
    >
      {user && (
        <div className={userProfile.imageData}>
          <Image
            loading="lazy"
            src={user.profile_image.large}
            alt="profile Image"
            className={userProfile.profileImage}
            width={100}
            height={100}
          />
          <div className={userProfile.profileText}>{user.username}</div>
          <div className={userProfile.profileName}>
            {user.first_name} {user.last_name}
          </div>
          <div
            className={userProfile.profileCaption}
            style={{ marginTop: "1.2rem" }}
          >
            Bio : <i>{user.bio}</i>
          </div>
          <div className={userProfile.boxes}>
            <div className={userProfile.details}>
              Followers <b>{user.followers_count}</b>
            </div>
            <div style={{ marginLeft: "1rem", display: "block" }}>
              Country{" "}
              <div>
                <b>{user.location}</b>
              </div>
            </div>
            <div style={{ marginLeft: "1rem" }}>
              Following <b>{user.following_count}</b>
            </div>
          </div>
          <button
            onClick={() => setisListView(!isListView)}
            className={userProfile.buttons}
          >
            {isListView ? "Grid View" : "List View"}
          </button>
        </div>
      )}
      {!isListView && (
        <div className={userProfile.imageGallery}>
          {photo.length > 0 ? (
            photo.map((item: any) => (
              <div key={item.id} className={userProfile.userProfilebox}>
                <Image
                  loading="lazy"
                  src={item.urls.small}
                  alt="Image"
                  className={userProfile.imageGalleryImage}
                  width={70}
                  height={70}
                />
                <div className={userProfile.des}>{item.alt_description}</div>
              </div>
            ))
          ) : (
            <div style={{ color: "var(--color-fg)" }}>No user post</div>
          )}
        </div>
      )}

      {isListView && (
        <div className={userProfile.listView}>
          {photo.length > 0 ? (
            photo.map((item: any) => (
              <div
                key={item.id}
                className={userProfile.listBox}
                style={{ marginTop: "1rem" , margin : "auto"}}
              >
                <div>
                  <div
                    className={post.newsHeader}
                    style={{ padding: "0.2rem", textAlign: "start" }}
                  >
                    <Image
                      loading="lazy"
                      src={item.user.profile_image.small}
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
                    <BiNews
                      className={post.newsIcon}
                      style={{ color: "var(--color-fg)" }}
                    />
                  </div>
                  <Image
                    loading="lazy"
                    src={item.urls.regular}
                    alt="Image"
                    className={userProfile.imageimg}
                    width={500}
                    height={500}
                  />
                </div>
                <div className={post.iconBar}>
                  <AiFillLike
                    className={post.like}
                    style={{ marginLeft: "0rem" }}
                  />
                  <div>{item.user.total_likes}</div>
                  <FaRegCommentDots className={post.like} />
                </div>
                <div className={post.caption}>
                  <span className={post.data}>{username}</span>
                  <div className={post.bio}>{item.alt_description}</div>
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
            ))
          ) : (
            <div
              className={userProfile.imageGallery}
              style={{ color: "var(--color-fg)" }}
            >
              No user post
            </div>
          )}
        </div>
      )}
      <div>{isError && <Error errorMessage={isError.message} />}</div>
      <div>{isLoading && <Loader />}</div>
    </div>
  );
}
