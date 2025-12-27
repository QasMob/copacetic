import {use, useState} from 'react'
import ProgressBar from "../ProgressBar"
import { isEncountered, shuffle } from '../../utils'
import DEFINITIONS from '../../utils/VOCAB.json'

export default function Challenge(props){


    const {day, daysWords, handleChangePage, handleIncrementAttempts, handleCompleteDay, PLAN} = props

    
    const [wordIndex, setWordIndex] = useState(0)
    const [inputVal, setInputVal] = useState('')
    const [showDefiniton, setShowDefinition] = useState(false)
    const [listToLearn, setListToLearn] = useState([
        ...daysWords,
        ...shuffle(daysWords),
        ...shuffle(daysWords),
        ...shuffle(daysWords),
    ])


    const word = listToLearn[wordIndex]
    const isNewWord = showDefiniton || (!isEncountered(day, word) && wordIndex < daysWords.length)

    const definition = DEFINITIONS[word]


    function giveUp(){
        setListToLearn([...listToLearn, word])
        setShowDefinition(true)
    }



    return (
      <section id="challenge">
        <h1>{word}</h1>
        {isNewWord && (<p>{definition}</p>)}
        <div className="helper">
            <div>
                 {[...Array(definition.length).keys().map((char, elementIdx) => {

                    const styleToApply = inputVal.length < char + 1 ?
                     '' :  
                     inputVal.split('')[elementIdx].toLowerCase() == definition.split('')[elementIdx].toLowerCase() 
                     ? 'correct' : 'incorrect'
                    return (
                        <div className={' ' + styleToApply} key={elementIdx}></div>
                    )
                 })]}
            </div>
            <input value={inputVal} onChange={(e) => {

                if (e.target.value.length == definition.length && e.target.value.length > inputVal.length){
                 
                    handleIncrementAttempts()
                 
                    if (e.target.value.toLocaleLowerCase() == definition.toLowerCase()){
                           if (wordIndex >= listToLearn.length - 1){
                            handleCompleteDay()
                            return
                           } 
                           setWordIndex(wordIndex + 1)
                           setShowDefinition(false)
                           setInputVal('')
                           return
                    }
                }

                setInputVal(e.target.value)
            }}  type="text" placeholder="Enter the definition" />
        </div>

        <div className="challenge-btns">
            <button onClick={() => {handleChangePage(1)}} className="card-button-secondary">
                <h6>Quit</h6>
            </button>
            <button onClick={giveUp} className="card-button-primary">
                <h6>I forgot</h6>
            </button>
        </div>
        <ProgressBar remainder={wordIndex * 100 / listToLearn.length} text={`${wordIndex} / ${listToLearn.length}`}/>
      </section>
    )
} 