import { useState } from 'react'
import { Route,Routes } from "react-router-dom";
import * as React from 'react';
import Home from "./view/Home.jsx";

const About = React.lazy(()=> import('./view/About.jsx'))
const View = React.lazy(()=> import('./view/View.jsx'))
const Info = React.lazy(()=> import('./view/Info.jsx'))
const Search = React.lazy(()=> import('./view/Search.jsx'))
// import About from "./view/About.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
          <Route path={'/'} element={<Home/>}></Route> 
          <Route path={'/view/:id/:episodeId'} element={<React.Suspense fallback={<>...</>}><View/></React.Suspense>}></Route>
          <Route path={'/info/:id'} element={<React.Suspense fallback={<>...</>}><Info/></React.Suspense>}></Route>
          <Route path={'/search/:q/:page'} element={<React.Suspense fallback={<>...</>}><Search/></React.Suspense>}></Route>
          {/*<Route path={'/about'} element={<About/>}></Route>*/}
          <Route path={'/about'} element={<React.Suspense fallback={<>...</>}><About/></React.Suspense>}></Route>
      </Routes>
    </>
  )
}

export default App
