import { Key } from "react";
// import Suggestions from "./Suggestions";
import suggestion from "../styles/Suggestion.module.css"
import Image from "next/image";

const posts=[
    {
        id:123,
        username: "hello",
        userImg:"https://links.papareact.com/3ke",
        img:"https://links.papareact.com/3ke",
        caption : "I love SocialSeedlings",
    },

    {
        id:124,
        username: "hello",
        userImg:"https://links.papareact.com/3ke",
        img:"https://links.papareact.com/3ke",
        caption : "I love SocialSeedlings",
    },
    {
        id:124,
        username: "hello",
        userImg:"https://links.papareact.com/3ke",
        img:"https://links.papareact.com/3ke",
        caption : "I love SocialSeedlings",
    },
];


export default function SuggestionsBox()
{
    return(
        <>
            <div className={suggestion.box}>
                <div className={suggestion.heading}>
                    <h3 className={suggestion.title}>Suggestions for you</h3>
                </div>
            </div>

            <>
            {
                posts.map((item)=>{
                    return(
                        <div key={item.id} className={suggestion.Profilebox}>
                        <Image src={item.img} className={suggestion.image} alt="Image"></Image>
                        <div className={suggestion.profileData}>
                            <h2 className={suggestion.profileName}>{item.username}</h2>
                            <h3 className={suggestion.profileBio}>{item.caption}</h3>
                        </div>
                    </div>
                    )
                })
            }
            </>
        </>

    )
}