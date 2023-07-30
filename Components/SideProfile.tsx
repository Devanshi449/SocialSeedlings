import React , { useEffect, useState } from "react"
import main from "../styles/Main.module.css"
import axios from "axios"
import Image from "next/image";

export default function SideProfile(){
    
    const [user,setUser]=useState<any>(null);
    const [isLoading , setIsLoading]=useState(true);
    const [isError,setIsError]=useState<any>(null);
    
    const fetchProfile=async()=>{
        try{
        const response=await axios.get("https://api.unsplash.com/users/Devanshi59/?client_id=YYIQqMVZ9SqnR9ERXMyhIibfGCJ35613-9Axnqjh8lo")
        const data=await response.data;
        setUser(data);
        }
        catch (error) {
                setIsError(error);
            } finally {
                setIsLoading(false);
            }
        }

    // useEffect(()=>{
    //     fetchProfile();
    // },[])
    
    // if(!user) return null;

    return(
        <>{ user &&
            <div className={main.sideProfile}>
            <Image src={user.profile_image.small} alt="Profile_pic" className={main.profileImg}></Image>
            <div style={{marginLeft : "1rem"}}>
                <div style={{fontWeight :"bold", fontSize : "large"}}>{user.username}</div>
                <div style={{fontSize : "small", color : "grey", marginTop : "0.2rem"}}>{user.bio}</div>
            </div>
        </div>
        }
        {isError ? <p>Error: {isError.message}</p> : <p></p>}
        </>
    )
}