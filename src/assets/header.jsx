import axios from "axios";
import { useEffect, useState } from "react";

const Header = ({search}) =>{
    const active = 'text-gray-50 font-semibold tracking-wider text-sm hover:text-gray-50 transition-colors ease-out duration-300';
    const notActive = 'text-gray-400 text-sm tracking-wider hover:text-gray-50 transition-colors east-linear duration-300';
    const [q,setQ] = useState('');
    
    const onKeYuP = (e) =>{
        if(e.key == 'Enter')
        {
            window.location = `/search/${q}/1`
        }
    }
    useEffect(()=>{
       if(search)
       {
        setQ(search)
       }
    },[])
    return(
        <>
            <header className="flex items-center px-16 bg-[#1d2429] fixed top-0 left-0 z-50 w-full h-[70px] shadow shadow-gray-700 ">
                <div className={'w-fit'}>
                    <a href="/" className="font-semibold text-3xl text-violet-500 whitespace-nowrap ">CLNANIME</a>
                </div>
                <div className={'w-full flex items-center justify-end gap-x-10'}>
                    <div>
                        <span className={' flex items-center gapx-2'}>
                            <input type="text" value={q}  onChange={(e)=> setQ(e.target.value)} onKeyPress={onKeYuP} className={'text-sm text-gray-600 px-2 py-2.5 rounded bg-gray-100 w-[300px]'} placeholder={'Search...'} />
                            {/*<CiSearch className={'text-3xl'}/>*/}
                         </span>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;