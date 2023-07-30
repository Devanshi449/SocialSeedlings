import Headers from "@/Components/Headers";
import userProfile from "../styles/UserProfile.module.css"
// import NewsPost from "@/Components/NewsPost";
import HomePage from "@/Components/HomePage";

const posts=[
    {
        id:123,
        username: "hello",
        userImg:"https://links.papareact.com/3ke",
        img:"https://links.papareact.com/3ke",
        Images: ["https://links.papareact.com/3ke", "https://links.papareact.com/3ke", "https://links.papareact.com/3ke", "https://links.papareact.com/3ke", "https://links.papareact.com/3ke", "https://links.papareact.com/3ke"],
        caption : "I love SocialSeedlings ! I live in India and love reading news daily",
    },
];

export default function ListView()
{
    return(
        <div>
            <Headers/>
            <div className={userProfile.listProfile}>
                <img src={posts[0].img} alt="image" className={userProfile.listProfile}/>
                <div className={userProfile.listUsername}>{posts[0].username}</div>
            </div>
            {/* <NewsPost id={0} username={""} userImg={""} img={""} caption={""} like={0}/> */}
            <HomePage/>
        </div>
    )
}