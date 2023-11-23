import React from 'react'
import "./Modal.scss"
import { useNavigate } from 'react-router-dom'

const Modal = ({ validation, closeModal, resetGame, text }) => {
  const playAgain = () => {
    closeModal(false)
    validation(Array(9).fill(null))
    resetGame(Array(9).fill(null))
  }

  const navigate = useNavigate()
  const quitGame = () => {
    navigate("/")
    validation(Array(9).fill(null))
    resetGame(Array(9).fill(null))
  }


  return (
    <div id='modal'>
      <div id='overlay' >
        <div id="modalContent">
          <p id='modal-text'>{text}</p>

          <div id='modal-buttons'>
            <button id='modal-playAgain-btn' className='modal-btn' onClick={playAgain}>PLAY AGAIN</button>
            <button id='modal-quit-btn' className='modal-btn' onClick={quitGame}>QUIT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Modal
