import { useEffect, useState, useRef } from "react";
import NewsPost from "./NewsPost";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import main from "../styles/Main.module.css";
import Error from "./Error";

export default function HomePage() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [items, setItem] = useState<any>([]);
  const scrollableTargetRef = useRef<HTMLDivElement | null>(null);
  const [cacheData, setCacheData] = useState<any>([]);

  const fetchMoreData = async () => {
   
    setIsLoading(true)
    setError(null)
    try{
    const response = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.accessKey}`);
    setItem(items.concat(response.data));

  }
    catch(error : any)
    {
      setError(error.message)
    }
    finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
      fetchMoreData();
  }, []);

  useEffect(() => {                   /*This is caching, using react persist I have done the caching, 
                                      if there will be any error data will be picked from the localstorage*/
		if (error) { 
			let localData = localStorage.getItem("homeData");
 
			if (localData) {
				setItem(JSON.parse(localData));
			} else {
				setItem([]);
			}
		} else {
			localStorage.setItem("homeData", JSON.stringify(items));
		}
  }, [items]);
 
  
  return (
    <>
      <div ref={scrollableTargetRef}>
          <InfiniteScroll
					style={{
						overflow: "hidden",
					}}
					dataLength={!error ? items.length : cacheData.length}
					hasMore={!error ? true : false} 
					loader={<>Loading...</>}
					next={fetchMoreData}
				>
					<ul style={{listStyleType : "none", marginLeft : "0" ,marginBlockStart: "0",
              marginBlockEnd: "0rem" , paddingInlineStart : "0"}}>
						{error && <p>Error: {error.message}</p>}
						{
			
							error &&
								cacheData.map((item: any) => (
									<li
										key={item.id}
										className={main.newsPosts}
                    style={{margin : "0rem"}}
									>
										<NewsPost
											key={item.id}
											id={item.id}
											username={item.user.username}
											userImg={
												item.user.profile_image.small
											}
											img={item.urls.raw}
											caption={item.alt_description}
											like={item.likes}
										/>
									</li>
								))
						}
						{
							// If there is there and also no cache then error will be shown
							error && cacheData.length === 0 && (
								<p>No data to show</p>
							)
						}
						{items.map((item: any,index : any) => (
							<li key={item.id} className={main.newsPosts}>
								<NewsPost
									key={item.id}
									id={item.id}
									username={item.user.username}
									userImg={item.user.profile_image.small}
									img={item.urls.raw}
									caption={item.alt_description}
									like={item.likes}
								/>
							</li>
              
						))}
					</ul>
				</InfiniteScroll>
        {/* } */}
        {error && <Error errorMessage={error.message} />}
      </div>
    </>
  )
}
