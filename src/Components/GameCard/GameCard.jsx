import React from 'react'

const GameCard = ({value,onSquareClick}) => {
   
     
  return (
    <>
       <div onClick={onSquareClick}  className="game-cards">{value}</div>
    </>
  )
}

export default GameCard
