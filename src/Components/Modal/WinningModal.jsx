import React, { useState, useEffect } from 'react'
import "./WinningModal.scss"
import { useNavigate } from 'react-router-dom'
import CrossColored from "../Logos/CrossColored"
import CircleColored from "../Logos/CircleColored"



const WinningModel = ({ validation, closeWincard,
  resetGame,
  // count,
  winner, selectedOption, userScore, updateUserScore,
  pcScore, updatePcScore
}) => {

  const playAgain = () => {
    closeWincard(false)
    validation(Array(9).fill(null))
    resetGame(Array(9).fill(null))

  }

  const navigate = useNavigate()
  const quitGame = () => {
    navigate("/")
    validation(Array(9).fill(null))
    resetGame(Array(9).fill(null))
    updateUserScore(0)
    localStorage.removeItem("userScore")

  }
  console.log(validation);
  const [winnerLogo, setWinnerLogo] = useState()

  console.log(winner);


  useEffect(() => {
    if (winner === "X") {
      setWinnerLogo(<CrossColored size={25} />)

    }
    else if (winner === "O") {
      setWinnerLogo(<CircleColored size={25} />)
    }



    if (selectedOption === 1) {

      if (winner === "X") {
        updateUserScore(userScore + 1)
      } else if (winner === "O") {
        updatePcScore(pcScore + 1)
      }
    }

    if (selectedOption === 2) {
      if (winner === "O") {
        updateUserScore(userScore + 1)
      } else if (winner === "X") {
        updatePcScore(pcScore + 1)
      }

    }



  }, [])



  return (
    <div id='winningModal'>
      <div id='winningModal-overlay' >
        <div id="winningModalContent">

          <div id='winningModal-text'>
            <div id='winner-logo'>{winnerLogo}</div>
            <p>Takes the round</p>

          </div>

          <div id='winningModal-buttons'>
            <button id='winningModal-quit-btn' className='winningModal-btn' onClick={quitGame}>QUIT</button>
            <button id='winningModal-playAgain-btn' className='winningModal-btn' onClick={playAgain}>PLAY AGAIN</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WinningModel
