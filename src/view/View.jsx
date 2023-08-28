import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../assets/header";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const View = () => {
  const { id, episodeId } = useParams();
  const [mainVideoLink, setMainVideoLink] = useState("");
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const iframeTag = useRef(null)
  const fetchView = async () => {
    const { data } = await axios.get(
      "https://api.consumet.org/anime/gogoanime/servers/" + episodeId
    );
    await setMainVideoLink(data[0].url);
  };
  const info = async () => {
    const { data } = await axios.get(
      "https://api.consumet.org/anime/gogoanime/info/" + id
    );
    await setInfoData(data);
    
    setTimeout(()=>{
      setLoading(true)
    },1000)
  };
  const [iframe,setIframe] = useState(null);
  useEffect( () => {
     fetchView();
     info();
     setIframe({
      height: '100%',
      aspectRatio: 16 / 9,
    })
    
  }, []);
  return (
    <>
      <main className="bg-black" >
        <Header />
        {!loading && <section ref={iframeTag} className=" fixed w-full h-screen z-[40]  flex justify-center items-center">
          <AiOutlineLoading3Quarters className="text-[70px] animate-spin text-black"/>
          
        </section>}
        {loading && <section className={"mt-[70px] px-14 py-20  text-gray-50"}>
         
         <div>
         {infoData.title && <h1 className="w-full bg-violet-500 text-2xl px-5 py-3 font-bold rounded-t">
              {episodeId}
             
             </h1>}
         
           <div className="py-5 px-4 border-x border-b border-violet-500 ">
           <iframe style={iframe} allowfullscreen="" webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true"
               src={mainVideoLink} width="100%" height="100%"
               className="w-full  border border-violet-500  rounded"
           ></iframe>
           <h1 className="mt-10 text-gray-400">Episodes:</h1>
         <div className="grid grid-cols-10 gap-3  p-3 ">
           {infoData.episodes &&
             infoData.episodes.map((value, index) => (
               <a
                 href={`/view/${id}/${value.id}`}
                 key={index}
                 className={
                   value.id == episodeId
                     ? "px-8 text-center py-2 text-sm rounded bg-violet-900 font-bold"
                     : "px-8 text-center py-2 text-sm rounded bg-violet-500"
                 }
               >
                 {index + 1}
               </a>
             ))}
         </div>
           </div>
         </div>
         

         {infoData.episodes && (
           <div className=" text-white mt-10 ">
             <h1 className="w-full bg-violet-500 px-5 py-3 font-bold rounded-t">
               Anime Info
             </h1>
             <div className=" py-5 px-2 border-x border-b border-violet-500 flex">
               <img
                 src={infoData.image ? infoData.image : ""}
                 className="rounded min-w-[300px] aspect-auto object-cover"
                 alt=""
               />
               <div className="px-5 grid gap-y-4 h-fit">
                 <h1 className="font-semibold text-xl font-serif">
                   <span className="text-violet-400">Title: </span>
                   {infoData.title}
                 </h1>
                 <h1 className="font-normal text-gray-400 text-base font-serif">
                   <span className="text-violet-400 font-semibold text-xl">
                     Total Episode:{" "}
                   </span>
                   {infoData.totalEpisodes}
                 </h1>
                 <h1 className=" text-xl font-serif text-gray-400 font-thin">
                   <span className="text-violet-400 font-semibold">
                     Gender:{" "}
                   </span>
                   {infoData.genres.map((value) => value + " ,")}
                 </h1>
                 <h1 className="font-normal text-gray-400 text-base font-serif">
                   <span className="text-violet-400 font-semibold text-xl">
                     Release Date:{" "}
                   </span>
                   {infoData.releaseDate}
                 </h1>
                 <h1 className="font-normal text-gray-400 text-base font-serif">
                   <span className="text-violet-400 font-semibold text-xl">
                     Sub or Dub:{" "}
                   </span>
                   {infoData.subOrDub}
                 </h1>
                 <h1 className="font-normal text-gray-400 text-base ">
                   <span className="text-violet-400 font-semibold font-serif text-xl">
                     Description: <br />
                   </span>
                   {infoData.description}
                 </h1>
               </div>
             </div>
           </div>
         )}
       </section>}
      </main>
    </>
  );
};

export default View;
