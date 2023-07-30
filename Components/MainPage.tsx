
import main from "../styles/Main.module.css"
import HomePage from "./HomePage";
import SideProfile from "./SideProfile";
import SuggestionsBox from "./SuggestionsBox";

// import NewsPost from "./NewsPost";

export default function Main()
{
    return(
        <main className={main.bodyNews}>
            <section className={main.pageSection}>
                <HomePage/>
            </section>
            <section className={main.sideSection}>
                <SideProfile/>
                <SuggestionsBox/>
            </section>
        </main>
    )
}