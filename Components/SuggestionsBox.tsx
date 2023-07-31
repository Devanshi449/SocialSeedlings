import { Key } from "react";
// import Suggestions from "./Suggestions";
import suggestion from "../styles/Suggestion.module.css"
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function SuggestionsBox()
{
    const user=useSelector((state : any)=>state.data.user)
    const [isLoading , setIsLoading]=useState(true);
    const [isError,setIsError]=useState<any>(null);
    
    if(!user) return null;
    return (
      <>
        <div className={suggestion.box}>
          <div className={suggestion.heading}>
            <h3 className={suggestion.title}>Suggestions for you</h3>
          </div>
        </div>

        <>
          <>
            {user && (
              <div className={suggestion.Profilebox}>
                <>
                  <Image
                    src={user.profile_image.small}
                    loading="lazy"
                    alt="Profile_pic"
                    className={suggestion.image}
                    width={35}
                    height={35}
                  ></Image>
                  <div style={{ marginLeft: "1.3rem" }}>
                    <Link
                      href={`/user/${user.username}/?client_id=${process.env.accessKey}`}
                      style={{
                        textDecoration: "none",
                        color: "var(--color-fg)",
                      }}
                    >
                      <div style={{ fontWeight: "bold", fontSize: "large" }}>
                        {user.username}
                      </div>
                    </Link>
                    <div
                      style={{
                        fontSize: "small",
                        color: "grey",
                        marginTop: "0.2rem",
                      }}
                    >
                      {user.bio}
                    </div>
                  </div>
                </>
              </div>
            )}
          </>
        </>
        <>
          <>
            {user && (
              <div className={suggestion.Profilebox}>
                <>
                  <Image
                    loading="lazy"
                    src={user.profile_image.small}
                    alt="Profile_pic"
                    className={suggestion.image}
                    width={35}
                    height={35}
                  ></Image>
                  <div style={{ marginLeft: "1.3rem" }}>
                    <Link
                      href={`/user/${user.username}/?client_id=${process.env.accessKey}`}
                      style={{
                        textDecoration: "none",
                        color: "var(--color-fg)",
                      }}
                    >
                      <div style={{ fontWeight: "bold", fontSize: "large" }}>
                        {user.username}
                      </div>
                    </Link>
                    <div
                      style={{
                        fontSize: "small",
                        color: "grey",
                        marginTop: "0.2rem",
                      }}
                    >
                      {user.bio}
                    </div>
                  </div>
                </>
              </div>
            )}
          </>
        </>
      </>
    );
}