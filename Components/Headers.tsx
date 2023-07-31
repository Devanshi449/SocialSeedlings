import header from "../styles/Headers.module.css";
import { BiSearch } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/actions/data";
import { RiMoonClearFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function Headers({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: any) => state.data.theme);
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<any>(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/users/Devanshi59/?client_id=${process.env.accessKey}`
      );
      const data = await response.data;
      setUser(data);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {user && (
        <div className={header.navbar}>
          <div className={header.navbox}>
            {/* left */}
            <div className={header.navtitle}>
              <div style={{ fontWeight: "600" }}>SocialSeedlings</div>
            </div>
            {/* middle  */}
            <div className={header.searchWidth}>
              <div className={header.searchBar}>
                <div className={header.iconBar}>
                  <BiSearch className={header.searchIcon} />
                </div>
                <input
                  className={header.searchBox}
                  type="text"
                  placeholder="Search"
                ></input>
              </div>
            </div>
            {/* left  */}
            <div className={header.iconBox}>
              <Link
                href="/"
                style={{ textDecoration: "none", color: "var(--color-fg)" }}
              >
                <AiFillHome className={header.home} />
              </Link>
              <div
                onClick={() => {
                  dispatch(setTheme());
                }}
                style={{ border: "none" }}
              >
                {theme === "light" ? (
                  <BsFillSunFill className={header.home} />
                ) : (
                  <RiMoonClearFill className={header.home} />
                )}
              </div>
              <Link
                href={`/user/Devanshi59/?client_id=${process.env.accessKey}`}
              >
                <Image
                  loading="lazy"
                  src={user.profile_image.small}
                  alt="profile-pic"
                  className={header.profile}
                  width={40}
                  height={40}
                ></Image>
              </Link>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
