import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Header from "../assets/header";
import { BsPlayCircle } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Recent = ({ recentList, clickTypeFunction, clickPageFunction }) => {
  return (
    <>
      <section className={"w-full"}>
        <div className={"flex items-center gap-x-2"}>
          <button
            className={
              "py-2 px-6 text-sm bg-violet-500 font-bold text-white rounded h-fit"
            }
            onClick={()=> clickTypeFunction(1)}
          >
            ALL
          </button>
          <button
            className={
              "py-2 px-6 text-sm bg-transparent hover:bg-violet-500 hover:text-white transition-colors ease-linear duration-300 font-bold text-gray-400 rounded h-fit"
            }
            onClick={()=> clickTypeFunction(2)}
          >
            ENGLISH DUB
          </button>
          <button
            className={
              "py-2 px-6 text-sm bg-transparent hover:bg-violet-500 hover:text-white transition-colors ease-linear duration-300 font-bold text-gray-400 rounded h-fit"
            }
            onClick={()=> clickTypeFunction(3)}
          >
            CHINESE DUB
          </button>
        </div>
        {/*    LIST OF RECENT ANIME*/}
        <div className="grid grid-cols-4 gap-x-4 gap-y-6 pt-10">
          {recentList.results && recentList.results.map((value) => (
            <div key={value.id} className={"grid gap-y-2 "}>
              <div className="relative group">
                <img
                  src={value.image}
                  className={
                    "h-[230px] w-full object-cover border-2 border-violet-500 rounded"
                  }
                  alt=""
                />
                <div className="absolute w-full h-full flex opacity-0 group-hover:opacity-100 transition-opacity  duration-500 justify-center items-center bg-[#0009] top-0">
                  <a href={`/view/${value.id}/${value.episodeId}`}>
                    <BsPlayCircle className="text-[40px] hover:text-[70px] hover:text-white transition-all ease-linear text-gray-400" />
                  </a>
                </div>
              </div>
              <h1
                className={
                  "text-white text-sm line-clamp-2  h-[40px] overflow-hidden  text-center w-full px-2 font-semibold cursor-pointer hover:underline"
                }
              >
                {value.title}
              </h1>
              <small className="text-violet-600 text-center">
                Episode {value.episodeNumber}
              </small>
            </div>
          ))}
          
        </div>
        <div className="flex gap-x-3 py-4 bg-[#ffffff1f] px-4 rounded mt-10 justify-between w-full">
            <button disabled={recentList.currentPage == '1' ? true : false} className={recentList.currentPage == '1' ? 'bg-violet-600 opacity-40 text-sm px-7 py-2 rounded' : 'bg-violet-600 text-white text-sm px-7 py-2 rounded'} onClick={() => clickPageFunction(0)}>PREV</button>
            <button disabled={recentList.hasNextPage ? false : true} className={recentList.hasNextPage ? 'bg-violet-600 text-white   text-sm px-7 py-2 rounded' : 'bg-violet-600 text-sm px-7 opacity-40 py-2 rounded'} onClick={() => clickPageFunction(1)}>NEXT</button>
          </div>
      </section>
    </>
  );
};
const TopAnime = ({topRating}) => {
  
  return (
    <>
      <section className={"min-w-[300px] max-w-[300px] h-fit "}>
        <h1 className="bg-violet-500 text-center text-white text-xl leading-loose font-semibold">Top Rating Anime</h1>
        <div className="border border-gray-500 py-3 px-2 grid gap-y-2">
           {topRating.results && topRating.results.map((value,index)=> <a href={`/info/${value.id}`} key={index} className="text-violet-500 hover:text-white transition-colors ease-linear duration-200">{index + 1}. {value.title}</a>)}
        </div>
      </section>
    </>
  );
};
const Home = () => {
  const [recent, setRecent] = useState([]);
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type,setType] = useState(1);
  const [page,setPage] = useState(1);
  const scrollTop = useRef(null)
  const fetchRecent = async () => {
    try {
      const { data } = await axios.get(
        `https://api.consumet.org/anime/gogoanime/recent-episodes?type=${type}&page=${page}`
      );
      
      await setRecent(data);
      await fetchRating()
      
    } catch (err) {
      throw new Error(err.message);
    }
  };
  const fetchRating = async () =>{
    const {data} = await axios.get('https://api.consumet.org/anime/gogoanime/top-airing');
    await setTop(data);
  }
  const changeType = async (newType) =>{
      setType(newType);
      
  }
  const changePage = async (newPage) =>{
    if(newPage)
    {
      setPage(newPage => newPage + 1)
    }else{
      setPage(newPage => newPage - 1);
    }
    
  }
  useEffect(()=>{
      fetchRecent()
      console.log('ss')
  },[type])
  useEffect(()=>{
    fetchRecent()
    scrollTop.current?.scrollIntoView({ behavior: 'smooth' });
},[page])
  useEffect(() => {
    fetchRecent();
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);
  return (
    <>
      <main className={"bg-black"}>
        <Header />
        {!loading && (
          <section className=" fixed w-full h-screen z-[40] flex justify-center items-center">
            <AiOutlineLoading3Quarters className="text-[70px] animate-spin text-black" />
          </section>
        )}
        {loading && (
          <main ref={scrollTop} className={"mt-[70px] px-14 py-20 flex gap-x-10"}>
            {/*left*/}
            {recent.results && <Recent recentList={recent} clickTypeFunction={changeType} clickPageFunction={changePage} />}
            {/*top anime*/}
            <TopAnime topRating={top} />
          </main>
        )}
      </main>
    </>
  );
};

export default Home;
