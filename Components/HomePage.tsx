import { useEffect, useState, useRef } from "react";
import NewsPost from "./NewsPost";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import Loader from "./Loader";
import main from "../styles/Main.module.css";
import Error from "./Error";
// import { useDispatch, useSelector } from 'react-redux';
// import { saveData } from "./Action";

export default function HomePage() {
  // const [items, setItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [items, setItem] = useState<any>([]);
  const scrollableTargetRef = useRef<HTMLDivElement | null>(null);
  const [cacheData, setCacheData] = useState<any>([]);

  const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

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

  useEffect(() => {
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
  }, [items, error]);
 
  
  return (
    <>
      <div ref={scrollableTargetRef}>
        {/* {abc.length > 0 && */}
          <InfiniteScroll
					style={{
						overflow: "hidden",
					}}
					dataLength={!error ? items.length : cacheData.length}
					hasMore={!error ? true : false} 
					loader={<>Loading...</>}
					next={fetchMoreData}
				>
					<ul>
						{error && <p>Error: {error.message}</p>}
						{
			
							error &&
								cacheData.map((item: any) => (
									<li
										key={item.id}
										className={main.newsPosts}
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
							// agar error hai aur cache bhi nahi hai toh final error dikha denge
							error && cacheData.length === 0 && (
								<p>No data to show</p>
							)
						}
						{items.map((item: any) => (
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
        {error && <Error/>}
      </div>
    </>
  )
}
