import { useEffect, useState } from "react";
import Header from "../assets/header";
import axios from "axios";
import { useParams } from "react-router-dom";
const Info = () =>{
    const { id } = useParams()
    const [infoData, setInfoData] = useState([]);
    const infos = async () => {
        const { data } = await axios.get(
          "https://api.consumet.org/anime/gogoanime/info/" + id
        );
        await setInfoData(data);
        
        // setTimeout(()=>{
        //   setLoading(true)
        // },1000)
      };
    useEffect(()=>{
        infos()
    },[])
    return(
        <>
            <main className="bg-black">
                <Header/>
                <section className="mt-[70px] px-14 py-20 text-white">
                {infoData.episodes && (
           <div className=" text-white mt-10 ">
             <h1 className="w-full bg-violet-500 px-5 py-3 font-bold rounded-t">
               Anime Info
             </h1>
             <div className=" py-5 px-2 border-x border-b border-violet-500 ">
               <div className="flex">
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
               <h1 className="mt-10 text-gray-400">Episodes:</h1>
         <div className="grid grid-cols-10 justify-start w-fit gap-2  p-3 ">
           {infoData.episodes &&
             infoData.episodes.map((value, index) => (
               <a
                 href={`/view/${id}/${value.id}`}
                 key={index}
                 className={
                   value.id == id
                     ? "px-6 w-fit text-center py-2 text-sm rounded bg-violet-900"
                     : " w-[50px] text-center py-2 text-sm rounded bg-violet-500"
                 }
               >
                 {index + 1}
               </a>
             ))}
         </div>
             </div>
           </div>
         )}
                </section>
            </main>
        </>
    )
}
export default Info;