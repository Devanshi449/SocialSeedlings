import { useEffect, useState, useRef } from "react";
import NewsPost from "./NewsPost";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import Loader from "./Loader";
import main from "../styles/Main.module.css"
// import { useDispatch, useSelector } from 'react-redux';
// import { saveData } from "./Action";

export default function HomePage() {
  const [items, setItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [page, setPage] = useState(1);

  const [abc, setItem] = useState<any>([]);
  const scrollableTargetRef = useRef<HTMLDivElement | null>(null);

  const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};


//   const fetchData = async (n: number) => {
//     console.log("calllelllllllllllllll")

//     setIsLoading(true);
//     setError(null);
    
//     try {
//       // Create an array of promises for the asynchronous fetch operations
//       const fetchPromises = Array.from({ length: n }, async (_, index) => {
//         const response = await axios.get(`https://api.unsplash.com/photos/random/?client_id=igg45lZk9odXVoDtXqeS8s35S17Het_5yw2AjTh8d4M`);
//         const data = await response.data;
//         return data;
//       });
//       const fetchedData = await Promise.all(fetchPromises);

//       // Update the state with the fetched data
//       setItems(prevItems => [...prevItems, ...fetchedData]);
//       setPage(prevPage => prevPage + n);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  // const dispatch = useDispatch();

  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    let counter=0;
    const response = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.accessKey}`);
    setItem(abc.concat(response.data));
    // if(counter<4)
    // {
    //   counter++;
    //   console.log(response.data)
    //   // dispatch(saveData(response.data));
    // }
    // setTimeout(() => {
    //   setItem(abc.concat(Array.from({ length: 20 })));
    // }, 1500);
  };

  useEffect(() => {
    // for (let i = 0; i<= 10; i++) {
        fetchMoreData();
    // }
  }, []);

  return (
    <>
      <div ref={scrollableTargetRef}>
        {/* {abc.length > 0 && */}
          <InfiniteScroll
            dataLength={abc.length}
            // next={() => { }} // Don't need this, as we will trigger the fetch in handleScroll function
            hasMore={true} // Don't load more data if loading or error state is true
            loader={<>Loading...</>}
            // next={() => fetchData(5)}
            next={fetchMoreData}
            // height={300}
            // endMessage={<p>No more data to load.</p>}
            // scrollableTarget={scrollableTargetRef.current}
            // style={{ overflow: "hidden" }} // Hide the default scrollbar
            // onScroll={handleScroll} // Listen for scroll events
          >
            {/* {abc.map((i, index) => (
                <div style={style} key={index}>
                div - #{index}
                </div>
            ))} */}
            <ul >
              {abc.map((item :any) => (
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
        {/* {error && <p>Error: {error.message}</p>} */}
      </div>
    </>
  )
}
