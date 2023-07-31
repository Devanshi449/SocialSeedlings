// import Link from "next/link";
import Headers from "../../Components/Headers"
import userProfile from "../../styles/UserProfile.module.css"
import { useState , useEffect} from "react";
// import {useLocation}  from "react-router-dom"
import { useRouter } from "next/router";
// import NewsPost from "@/Components/NewsPost";
import axios from "axios";
import { useSelector } from "react-redux";
import main from "../../styles/Main.module.css"
import Image from "next/image";


export default function UserProfile(){

    const theme = useSelector((state: any) => state.data.theme);
    
    const router = useRouter();
    const username = router.query.UserProfile;
    
    const [isListView,setisListView]=useState(false);
    const [photo,setPhotos]=useState<any>([])
    const [user,setUser]=useState<any>(null);
    const [isError,setisError]=useState<any>(null);
    const [isLoading,setisLoading]=useState(false);

    const fetchProfile=async()=>{
        try{
        const response=await axios.get(`https://api.unsplash.com/users/${username}/?client_id=${process.env.accessKey}`)
        const data=await response.data;
        setUser(data);
        const photoResponse=await axios.get(data.links.photos+`/?client_id=${process.env.accessKey}`)
        const photoData=await photoResponse.data;
        setPhotos(photoData);
        }
        catch (error : any) {
                setisError(error.message);
            } finally {
                setisLoading(false);
            }
        }

    useEffect(()=>{
        fetchProfile();
    },[])

    if (!user) {
    return <div>Loading...</div>; 
    }

    return(
        <div style={{backgroundColor:"var(--color-bg)"}} className={theme === 'light' ? main.light : main.dark}>
        <Headers/>
        {user && 
        <div className={userProfile.imageData}>
            <Image src={user.profile_image.large} alt="profile Image" className={userProfile.profileImage} />
            <div className={userProfile.profileText}>Username : {user.username}</div>
            <div className={userProfile.profileText}>Name : {user.first_name}{" "}{user.last_name}</div>
            <div className={userProfile.profileCaption}>Bio : <i>{user.bio}</i></div>
            <div className={userProfile.boxes}>
                <div className={userProfile.details}>
                    No of Followers : <b>{user.followers_count}</b>
                </div>
                <div style={{marginLeft : "1rem"}}>
                    Country : <b>{user.location}</b>
                </div>
            </div>
            <button onClick={() => setisListView(!isListView)} className={userProfile.buttons}>
                {isListView ? "Grid View" : "List View"}
            </button>
        </div>
        }
        {!isListView && (
            <div className={userProfile.imageGallery}>
                {photo.length > 0 ? (
                photo.map((item: any) => (
                    <div key={item.id} className={userProfile.userProfilebox}>
                    <Image src={item.urls.small} alt="Image" className={userProfile.imageGalleryImage} />
                    <div className={userProfile.des}>{item.alt_description}</div>
            </div>
        ))
        ) : ( <div>NoImager post</div>
        )}
        </div>)}

        {
            isListView && (
                <div className={userProfile.listView}>
                {photo.length > 0 ? (
                    photo.map((item: any) => (
                    <div key={item.id} className={userProfile.listBox}>
                        <div>
                        <div style={{fontSize : "1rem" , fontFamily : "fantasy"}}>UserName : {item.user.username}</div>
                        <Image src={item.urls.regular} alt="Image" className={userProfile.imageimg} />
                        </div>
                        <div>{item.alt_description}</div>
                        <div style={{display : "flex" , justifyContent : "center" , alignItems : "center"}}>
                         <div style={{fontWeight : "bold" }}>Likes: <i>{item.user.total_likes}</i></div>
                            <div style={{fontWeight : "bold", marginLeft : "1rem" }}>Location : <i>{item.user.location}</i></div>
                        </div>
                    </div>
                    ))
                ) : (
                    <div>No user post</div>
                )}
    </div>)}
    <div>{isError && <p>An error occured : {isError.message}</p>}</div>
    <div>{isLoading && <p>Page is loading...</p>}</div>

    </div>
    )
}