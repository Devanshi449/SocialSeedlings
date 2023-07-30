import React , { useEffect, useState } from "react"
import main from "../styles/Main.module.css"
import axios from "axios"
import Image from "next/image";
import Link from "next/link";

export default function SideProfile(){
    
    const [user,setUser]=useState<any>(null);
    const [isLoading , setIsLoading]=useState(true);
    const [isError,setIsError]=useState<any>(null);
    
    const fetchProfile=async()=>{
        try{
        const response=await axios.get(`https://api.unsplash.com/users/Devanshi59/?client_id=${process.env.accessKey}`)
        const data=await response.data;
        setUser(data);
        }
        catch (error) {
                setIsError(error);
            } finally {
                setIsLoading(false);
            }
        }

    useEffect(()=>{
        fetchProfile();
    },[])
    
    if(!user) return null;

    return(
        <>{ user &&
            <div className={main.sideProfile}>
            <img src={user.profile_image.small} alt="Profile_pic" className={main.profileImg}></img>
            <div style={{marginLeft : "1rem"}}>
                <Link href={`/user/${user.username}/?client_id=${process.env.accessKey}`} style={{textDecoration : "none", color : "var(--color-fg)"}}><div style={{fontWeight :"bold", fontSize : "large"}}>{user.username}</div></Link>
                <div style={{fontSize : "small", color : "grey", marginTop : "0.2rem"}}>{user.bio}</div>
            </div>
        </div>
        }
        {isError ? <p>Error: {isError.message}</p> : <p></p>}
        </>
    )
}