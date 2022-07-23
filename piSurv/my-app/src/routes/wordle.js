import React from 'react'
import { useState,useEffect} from 'react'
import "./wordle.css"

const WORD_LENGTH = 5

function Wordle() {
    
    const value = "trial"
    const [solution,setSolution] = useState(value)
    const [guesses,setGuesses] =  useState(["","","","","",""])
    const [currentGuess,setCurrentGuess] = useState("")
    const [isGameOver,setIsGameOver] =useState(false)

    useEffect(()=>{
        const handleType = (event) =>{
            if (isGameOver){
                return
            }
            if (event.key ==="Enter"){
                if (currentGuess.length !== 5 ){
                    return
                }
                const newGuesses = [...guesses]
                newGuesses[guesses.findIndex(val => val === "")] = currentGuess
                setGuesses(newGuesses)
                setCurrentGuess("")
                const isCorrect = solution === currentGuess
                if (isCorrect){setIsGameOver(true)}
            }
            if (event.key ==="Backspace"){
                setCurrentGuess(currentGuess.slice(0,-1))
                return
            }
            if (currentGuess.length === 5){
                return
            }
            setCurrentGuess(currentGuess + event.key)
        }
        window.addEventListener('keydown',handleType)
        return () => window.removeEventListener('keydown',handleType)
        },[currentGuess,isGameOver,solution,guesses])



  return (
    <div>
        the truth about life
        <div className='flex flex-col h-[400px] justify-center items-center width-[300px]'>
            {guesses.map((guess, i)=>{
                const isCurrentGuess = i === guesses.findIndex(val => val === "")
                return( 
                <Line guess={isCurrentGuess ? currentGuess: guess ?? ""}
                 isFinal = {!isCurrentGuess && guess !==""}
                 solution={solution}/>
            )
            }
                
            )}
            
        </div>
        
       
        
    </div>
      
   
  )
}


function Line({ guess,isFinal,solution }){
    const tiles =[]
    for (let i =0;i < 5;i++){
        const char = guess[i]
        let className = "tile"
        if(isFinal){
            if(char === solution[i]){
                className += " correct"
            }else if (solution.includes(char)){
                className += " close"
            }else{
                className += " incorrect"
            }
        }
        console.log(guess) 
        tiles.push(<div className={`${className} w-[40px] h-[40px] border shadow-md text-24px uppercase flex justify-center items-center`} key={i}>{char}</div>)
    }
    return(
        <div className='flex gap-1'>
            {tiles}
        </div>
       
    )
}
  


export default Wordle