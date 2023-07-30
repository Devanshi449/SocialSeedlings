import header from "../styles/Headers.module.css"
import {BiSearch} from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import {BsFillSunFill} from "react-icons/bs";
import { useEffect ,useState } from "react";
import axios from "axios"
import Image from "next/image";

export default function Headers()
{
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

    useEffect(()=>{
        fetchProfile();
    },[])
    
    return(
        <>
        {
            user && 
            <div className={header.navbar}>
            <div className={header.navbox}>
                {/* left */}
                <div className={header.navtitle}>
                    <div style={{fontWeight : "600"}}>
                        SocialSeedlings
                    </div>
                </div>
                {/* right  */}
                <div className={header.searchWidth}>
                    <div className={header.searchBar}>
                    <div className={header.iconBar}>
                        <BiSearch className={header.searchIcon}/>
                       </div>
                       <input className={header.searchBox} type="text" placeholder="Search"></input>
                    </div>
                </div>
                {/* left  */}
                <div className={header.iconBox}>
                    <AiFillHome className={header.home}/>
                    {/* <FiMenu className={header.menu} /> */}
                    <BsFillSunFill className={header.home}/>

                    <Image src={user.profile_image.small} alt="profile-pic" className={header.profile}></Image>

                </div>

            </div>
        </div>
        }</>
    )
}