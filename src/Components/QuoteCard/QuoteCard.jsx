import React, { useState, useEffect } from 'react'
import "./quoteCard.scss"
import axios from "axios"

const QuoteCard = () => {

    const [id, setId] = useState(1)
    const [post, setPost] = useState()
    const [intervalId, setIntervalId] = useState(0)


    useEffect(() => {

        let interval = setInterval(() => {
            setIntervalId(intervalId + 1)

            if (intervalId === 59) {
                
                setId(prev => prev + 1)
                setIntervalId(0)
                
            }

        }, 1000)

        axios.get(`https://api.adviceslip.com/advice/${id}`)
            .then(responce => {
                let res = responce.data
                setPost(res.slip.advice)
            })
            .catch(error => setPost("Oops Something went wrong..."))

        return () => {
            clearInterval(interval)
        }
    },[intervalId])


    return (
        <section id='QuoteCard_Container'>

            <div id="Quote_Container">

                <p id='Quote-Container-Heading'>Quote #{id}</p>
                <p id='Quote'>"{post}"</p>
                <div id='circle'>
                    <div id='Outer-Square'>
                        <div className="Inner-Circle"></div>
                        <div className="Inner-Circle" id='Inner-Circle-2'></div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default QuoteCard
