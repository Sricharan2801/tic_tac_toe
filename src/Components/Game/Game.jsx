import React, { useEffect, useState } from 'react'
import "./Game.scss"
import Modal from "../Modal/Modal"
import GameCard from "../GameCard/GameCard"
import CircleLogo from "../Logos/CircleLogo"
import CrossLogo from "../Logos/CrossLogo"
import CircleColored from "../Logos/CircleColored"
import CrossColored from "../Logos/CrossColored"
import WinningModal from "../Modal/WinningModal"



let winner = "A";


const Game = ({ turnUpdate }) => {



    // Load selectedOption from localStorage or default to the received prop
    const [selectedOption, setSelectedOption] = useState(() => {
        const storedOption = localStorage.getItem('selectedOption');
        const parsedOption = parseInt(storedOption, 10);
        return !isNaN(parsedOption) ? parsedOption : (!isNaN(turnUpdate) ? parseInt(turnUpdate, 10) : null);
    });

    // useEffect to update localStorage when selectedOption changes
    useEffect(() => {
        localStorage.setItem('selectedOption', selectedOption);
    }, [selectedOption]);

    // useEffect to update selectedOption when turnUpdate changes
    useEffect(() => {
        const parsedTurnUpdate = parseInt(turnUpdate, 10);
        setSelectedOption(!isNaN(parsedTurnUpdate) ? parsedTurnUpdate : 1);
    }, [turnUpdate]);







    // State for userChoice, pcChoice, and currentTurn

    const [currentTurn, setCurrentTurn] = useState();

    // useEffect to update choices and currentTurn when selectedOption changes
    useEffect(() => {
        if (selectedOption === 1) {

            setCurrentTurn(<CrossLogo fill="#D9D9D9" size={18} strokeWidth={5} />);
        }
        if (selectedOption === 2) {

            setCurrentTurn(<CircleLogo fill="#D9D9D9" size={18} />);
        }
    }, [selectedOption]);





    // Modal displays when re-fresh button is clicked.
    const [modal, setModal] = useState(false);
    const displayModal = () => {
        setModal(!modal)

    }


    const [winCard, setWinCard] = useState(false);
    const finalWinner = () => {
        setWinCard(!winCard)
    }



    // Game-Logic

    const [squares, setSquares] = useState(Array(9).fill(null))

    const [validation, setValidation] = useState(Array(9).fill(null))

    const [userScore, setUserScore] = useState(0)
    const [pcScore, setPcScore] = useState(0)
    const [tie, setTie] = useState(0);
    const [isGameTied, setIsGameTied] = useState(false)


    const emptyIndices = (array) => {
        let emptyElements = [];
        for (let i = 0; i < array.length; i++) {
            if (!array[i]) {
                emptyElements.push(i)
            }
        }
        return emptyElements;
    }

    const getRandomIndex = (array) => {
        let randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }






    const handleClick = (i) => {
        let copySquares = squares.slice()

        // let indexToBlock = []


        //     switch (i) {
        //         case 0:
        //             indexToBlock = [3, 4, 1]
        //             break;
        //         case 1:
        //             indexToBlock = [0, 2, 4]
        //             break;
        //         case 2:
        //             indexToBlock = [1, 5, 4]
        //             break;

        //         case 3:
        //             indexToBlock = [0, 6, 4]
        //             break;
        //         case 4:
        //             indexToBlock = [1,0,2,6,3,7,8,5]
        //             break;
        //         case 5:
        //             indexToBlock = [2, 8, 4]
        //             break;
        //         case 6:
        //             indexToBlock = [3, 7, 4]
        //             break;
        //         case 7:
        //             indexToBlock = [6, 8, 4]
        //             break;
        //         case 8:
        //             indexToBlock = [5, 7, 4]
        //             break;


        //     }


        // console.log(indexToBlock)

        // function checkIndexes(arr, indexes) {
        //     const results = [];

        //     indexes.forEach((index) => {

        //         if (index >= 0 && index < arr.length) {


        //             if (arr[index] === null) {
        //                 results.push(index)
        //             }
        //         }
        //     });

        //     return results;
        // }

        // const checkResults = checkIndexes(copySquares, indexToBlock);
        // console.log("available:", checkResults);




        if (squares[i]) {
            return;
        }



        if (selectedOption === 1) {
            copySquares[i] = <CrossColored size={25} />
            setSquares(copySquares)
            validation[i] = "X"

            setTimeout(() => {
                setCurrentTurn(<CrossLogo fill="#D9D9D9" size={18} strokeWidth={5} />)
            }, 1000)

            pcTurn()
            function pcTurn() {

                setTimeout(() => {

                    let emptyElements = emptyIndices(copySquares)

                    let randomIndex = getRandomIndex(emptyElements)
                    console.log(randomIndex);
                    copySquares[randomIndex] = <CircleColored size={25} />
                    validation[randomIndex] = "O"
                    setSquares(copySquares)
                    setCurrentTurn(<CircleLogo fill="#D9D9D9" size={18} />)

                }, 500)
            }
        }

        if (selectedOption === 2) {
            copySquares[i] = <CircleColored size={25} />
            validation[i] = "O"
            setSquares(copySquares)
            setTimeout(() => {
                setCurrentTurn(<CircleLogo fill="#D9D9D9" size={18} />)
            }, 1000)

            pcTurn()
            function pcTurn() {

                setTimeout(() => {
                    let emptyElements = emptyIndices(copySquares)
                    let randomIndex = getRandomIndex(emptyElements)
                    copySquares[randomIndex] = <CrossColored size={25} />
                    setSquares(copySquares)
                    validation[randomIndex] = "X"
                    setCurrentTurn(<CrossLogo fill="#D9D9D9" size={18} strokeWidth={5} />)

                }, 500)
            }

        }
        calculateWinner()
    }

    // Code to decide the winner of the game.

    const calculateWinner = () => {
        const winningPossibilities = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let isTie = true
        for (let i = 0; i < winningPossibilities.length; i++) {
            const [a, b, c] = winningPossibilities[i];
            if (
                validation[a] === validation[b] &&
                validation[a] === validation[c] &&
                validation[a]
            ) {
                finalWinner();
                winner = validation[a];
                isTie = false; // If there's a winner, it's not a tie
            }
        }

        // Check for a tie only if it hasn't been detected before
        if (isTie && validation.every((item) => item !== null)) {
            // If all squares are filled and there's no winner
            setTie((prevTie) => prevTie + 1);
            setIsGameTied(!isGameTied)
        }
    };




    return (
        <section id='Game-Container'>
            <div id="Game_Display">
                <div id="details-container">
                    <div id="game-icons">
                        <CrossColored size={25} />
                        <CircleColored size={25} />
                    </div>

                    <div id="turn-container">
                        <div id='current-turn-logo'>{currentTurn}</div>
                        <h4 id='current-turn'>TURN</h4>
                    </div>

                    <button id='retry-container' onClick={displayModal} >
                        <img src="/src/Icons/retry.svg" alt="" />
                    </button>
                </div>


                <div id='game-space'>
                    <div className='game-rows' id='game-row-one'>

                        <GameCard value={squares[0]} onSquareClick={() => handleClick(0)} />
                        <GameCard value={squares[1]} onSquareClick={() => handleClick(1)} />
                        <GameCard value={squares[2]} onSquareClick={() => handleClick(2)} />

                    </div>
                    <div className='game-rows' id='game-row-two'>

                        <GameCard value={squares[3]} onSquareClick={() => handleClick(3)} />
                        <GameCard value={squares[4]} onSquareClick={() => handleClick(4)} />
                        <GameCard value={squares[5]} onSquareClick={() => handleClick(5)} />

                    </div>
                    <div className='game-rows' id='game-row-three'>

                        <GameCard value={squares[6]} onSquareClick={() => handleClick(6)} />
                        <GameCard value={squares[7]} onSquareClick={() => handleClick(7)} />
                        <GameCard value={squares[8]} onSquareClick={() => handleClick(8)} />

                    </div>
                </div>

                <div id='result-cards-container'>
                    <div id='user-result-card' className="result-cards">

                        <p id='user'>(YOU)</p>
                        <p id='user-score'>{userScore}</p>

                    </div>
                    <div id='game-tie-card' className="result-cards">
                        <p id='game-tie'>TIES</p>
                        <p id='game-tie-number'>{tie}</p>

                    </div>
                    <div id='pc-result-card' className="result-cards">
                        <p id='pc'>(CPU)</p>
                        <p id='pc-score'>{pcScore}</p>

                    </div>
                </div>

                {
                    modal ?
                        <Modal
                            validation={setValidation} closeModal={setModal}
                            resetGame={setSquares} text={"Do you want to quit ?"}

                        /> : null
                }

                {
                    winCard ?
                        <WinningModal
                            validation={setValidation} closeWincard={setWinCard}
                            resetGame={setSquares} winner={winner}
                            selectedOption={selectedOption} userScore={userScore}
                            updateUserScore={setUserScore} pcScore={pcScore}
                            updatePcScore={setPcScore}
                        />
                        : null
                }

                {
                    isGameTied ?
                        <Modal text={"Game Tied!!"} closeModal={setIsGameTied}
                            validation={setValidation} resetGame={setSquares} /> : null
                }
            </div>
        </section>
    )
}





export default Game
