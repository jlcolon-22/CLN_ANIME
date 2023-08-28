import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Header from "../assets/header";
import {BsPlayCircle} from 'react-icons/bs'
const Search = () =>{
    const {page , q} = useParams();
    const [searchData, setSearchData] = useState([]);
const s = async () =>{
    const {data} = await axios.get(`https://api.consumet.org/anime/gogoanime/${q}?page=${page}`)
    setSearchData(data)
    console.log(data)
}
useEffect(()=>{
    s()
},[])
    return(
        <>
            <main className="bg-black">
                <Header search={q}/>
                <section className={searchData.results && searchData.results[0] ? 'mt-[70px]  px-14 py-20' : 'mt-[70px] px-14 py-20 h-[calc(100vh-70px)]'}>
                    {/*    LIST OF RECENT ANIME*/}
        <div className="grid grid-cols-4 gap-x-4 gap-y-6 pt-10">
          {searchData.results && searchData.results[0] ? searchData.results.map(value => (
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
                <a href={`/info/${value.id}`}>
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
            
          </div>
          )) : (<div className="text-red-500 text-3xl">No result!</div>)}
        </div>
                </section>
            </main>
        </>
    )
}
export default Search;