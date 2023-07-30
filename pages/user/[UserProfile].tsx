// import Link from "next/link";
import Headers from "../../Components/Headers"
import userProfile from "../../styles/UserProfile.module.css"
import { useState , useEffect} from "react";
// import {useLocation}  from "react-router-dom"
import { useRouter } from "next/router";
// import NewsPost from "@/Components/NewsPost";
import axios from "axios";
import Image from "next/image";

export default function UserProfile(){
    
    const router = useRouter();
    const username = router.query.UserProfile;
    // console.log(username);

    const [isListView,setisListView]=useState(false);
    const [photo,setPhotos]=useState<any>([])
    const [user,setUser]=useState<any>(null);
    const [isError,setisError]=useState<any>(null);
    const [isLoading,setisLoading]=useState(false);

    const fetchProfile=async()=>{
        try{
        const response=await fetch(`https://api.unsplash.com/users/${username}/?client_id=${process.env.accessKey}`)
        const data=await response.json();
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
        <>
        <Headers/>
        {user && 
        <div className={userProfile.imageData}>
            <img src={user.profile_image.large} alt="profile Image" className={userProfile.profileImage} />
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
                {/* <div>
                    Total posts : {photo.user.total_photos}
                </div> */}
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
                    <img src={item.urls.small} alt="Image" className={userProfile.imageGalleryImage} />
                    <div className={userProfile.des}>{item.alt_description}</div>
            </div>
        ))
        ) : ( <div>No user post</div>
        )}
        </div>)}

        {
            isListView && (
                <div className={userProfile.listView}>
                {photo.length > 0 ? (
                    photo.map((item: any) => (
                    <div key={item.id} className={userProfile.listBox}>
                        <div>
                        <div>UserName : {item.user.username}</div>
                        <img src={item.urls.regular} alt="Image" className={userProfile.imageGalleryImage} />
                        </div>
                        <div>{item.alt_description}</div>
                        <div style={{display : "flex" , justifyContent : "center" , alignItems : "center"}}>
                            <div>Likes : {item.user.total_likes}</div>
                            <div>Location : {item.user.location}</div>
                        </div>
                    </div>
                    ))
                ) : (
                    <div>No user post</div>
                )}
    </div>)}
    <div>{isError && <p>AN ERROR OCCURED</p>}</div>
    <div>{isLoading && <p>PAGE IS LOADING</p>}</div>

    </>
    )
}