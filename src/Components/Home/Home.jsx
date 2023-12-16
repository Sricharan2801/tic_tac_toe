import React,{useState} from 'react'
import "./Home.scss"
import { Bounce,ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CrossLogo from '../Logos/CrossLogo';
import CrossColored from "../Logos/CrossColored"
import CircleLogo from "../Logos/CircleLogo"
import CircleColored from "../Logos/CircleColored"





const Home = (props) => {
    const [crossIconBackGround, setCrossIconBackGround] = useState("#192A32")
    const [crossIconFill,setCrossIconFill] = useState("#D9D9D9")
    const [circleIconBackGround, setCircleIconBackGround] = useState("#192A32")
    const [circleIconFill,setCircleIconFill] = useState("#D9D9D9")
    const [status,setStatus] = useState()
  
  
    let value;
  
  
    function selectingCross() {
      setStatus("clickedCross")
      value = 1
      
      props.data(value)
  
      if (crossIconBackGround === "#192A32") {
        setCrossIconBackGround("#fff")
      }
      else {
        setCrossIconBackGround("#192A32")
      }
  
      setCrossIconFill("black")
      setCircleIconBackGround("#192A32")
      setCircleIconFill("#D9D9D9")
  
  
    }
  
    function selectingCircle() {
      setStatus("clickedCircle")
      value = 2
      props.data(value)
  
      if (circleIconBackGround === "#192A32") {
        setCircleIconBackGround("#fff")
      }
      else {
        setCircleIconBackGround("#192A32")
      }
  
      setCircleIconFill("black")
      setCrossIconBackGround("#192A32")
      setCrossIconFill("#D9D9D9")
  
    }
  
  
  
  
  
    const navigate = useNavigate()
    const navigateToGame = () => {
      
      localStorage.setItem("userScore", JSON.stringify(0));
      
      if( status === "clickedCross" || status === "clickedCircle"){
        navigate("tic-tac-toe")
        
      }else{
        toast("please select the option..")
      }
    }
    
    const invite = () => {
      toast("Invite Link Copied")
  
      // Code to copy url to the clip-board
      const url = window.location.href
      navigator.clipboard.writeText(url)
    }
  
    return (
  
      <section id='Home_Container'>
  
        <div id='Home_Container_Display'>
  
          <div id="Game_Options">
           <CrossColored size={25}/>
           <CircleColored size={25}/>
          </div>
  
          <div id="Options_Selection">
            <h4 id="instruction">PICK PLAYER</h4>
  
            <div id='buttons'>
              <button style={{ backgroundColor: crossIconBackGround }} className='choose-option' id='cross' onClick={selectingCross}>
                <CrossLogo fill={crossIconFill} size={23} strokeWidth={7}  />
              </button>
  
              <button style={{ backgroundColor: circleIconBackGround }} className='choose-option' id='circle' onClick={selectingCircle}>
                <CircleLogo fill={circleIconFill} size={26} />
              </button>
            </div>
  
          </div>
  
          <button className='new-game-pc' id='new-game-pc' onClick={navigateToGame}>NEW GAME (VS CPU)</button>
          <button className='new-game-pc' id='new-game-human'>NEW GAME (VS HUMAN ) comming soon</button>
          <button id='invite-button' onClick={invite}>Invite your friend</button>
  
          <ToastContainer
            hideProgressBar={true}
            position='top-right'
            autoClose="1500"
            transition={Bounce}
            toastStyle={{
              backgroundColor: "#192A32",
              color: "#F2B237",
              fontSize: "22px",
              fontFamily: "DM sans",
              fontWeight: "800",
              textAlign: "center",
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
            }} />
        </div>
  
      </section>
    )
  }
  
  export default Home
  