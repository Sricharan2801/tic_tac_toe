import React, { useState,useEffect } from 'react'
import "./App.css"
import QuoteCard from './Components/QuoteCard/QuoteCard'
import Game from "./Components/Game/Game"
import Home from './Components/Home/Home'
import { Routes, Route } from 'react-router-dom'



const App = () => {
  const [pick, setPick] = useState(JSON.parse(localStorage.getItem("userPick")) || null);


  const homeData = (input) => {
    setPick(input)
    
  }

  useEffect(() => {
    if (pick !== undefined) {
      localStorage.setItem("userPick", JSON.stringify(pick));
    }
  }, [pick]);
  
  return (
    <section id="Main_Container">

      <QuoteCard />

      <Routes>
        <Route path="/" element={<Home data={homeData} />} />
        <Route path="/tic-tac-toe" element={<Game turnUpdate={pick} />} />
      </Routes>


    </section>
  )
}

export default App
