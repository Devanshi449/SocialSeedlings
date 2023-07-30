// import Link from "next/link";
import Headers from "../../Components/Headers"
import userProfile from "../../styles/UserProfile.module.css"
import { useState , useEffect} from "react";
// import {useLocation}  from "react-router-dom"
import { useRouter } from "next/router";
// import NewsPost from "@/Components/NewsPost";
import axios from "axios";

const posts=[
    {
        id:123,
        username: "hello",
        userImg:"https://links.papareact.com/3ke",
        img1:"https://links.papareact.com/3ke",
        Images: ["https://links.papareact.com/3ke", "https://links.papareact.com/3ke", "https://links.papareact.com/3ke", "https://links.papareact.com/3ke", "https://links.papareact.com/3ke", "https://links.papareact.com/3ke"],
        caption : "I love SocialSeedlings ! I live in India and love reading news daily",
    },
];

export default function UserProfile(){
    
    const router = useRouter();
    const username = router.query.UserProfile;
    console.log(username);

    const [isListView,setisListView]=useState(false);
    const [user,setUser]=useState(null);
    const [isError,setisError]=useState<any>(null);
    const [isLoading,setisLoading]=useState(false);

    const fetchProfile=async()=>{
        try{
        const response=await axios.get(`https://api.unsplash.com/users/${username}/?client_id=YYIQqMVZ9SqnR9ERXMyhIibfGCJ35613-9Axnqjh8lo`)
        const data=await response.data;
        setUser(data);
        }
        catch (error) {
                setisError(error.message);
            } finally {
                setisLoading(false);
            }
        }

    useEffect(()=>{
        fetchProfile();
    },[])

    return(
        <>
        <Headers/>
        {user && 
        <div className={userProfile.imageData}>
            <img src={user.profile_image!.large} alt="profile Image" className={userProfile.profileImage}/>
            <div className={userProfile.profileText}>{user.username?}</div>
            <div className={userProfile.profileText}>{user.first_name}{" "}{user.last_name}</div>
            <div className={userProfile.profileCaption}>{user.bio}</div>
            <div className={userProfile.boxes}>
                <div className={userProfile.details}>
                    No of Followers : {user.followers_count}
                </div>
                <div>
                    Country : {user.location}
                </div>
            </div>
            <button onClick={()=>{setisListView(!isListView)}}>ListView</button>
        </div>
        }
        {!isListView && <div className={userProfile.imageGallery}>
            
            {posts[0].Images.map((image, index) => (
            <div>
                <img key={index} src={image} alt="Image" className={userProfile.imageGalleryImage}/>
                <div>{posts[0].caption}</div>
            </div>
            
            ))}

        </div>} 

            {
            isListView && <div className={userProfile.listView}>
                {posts[0].Images.map((image, index) => (
                    <div><img key={index} src={image} alt="Image" className={userProfile.imageGalleryImage}/>
                    <div>{posts[0].caption}</div>
                    </div>
            ))}
            
        </div>}
        </>
    )
}