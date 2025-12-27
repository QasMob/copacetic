import Layout from "./components/layouts/Layout"
import Welcome from "./components/layouts/Welcome"
import DashBoard from './components/layouts/Dashboard'
import Challenge from './components/layouts/Challenge'
import { useState, useEffect, use } from "react"
import WORDS from './utils/VOCAB.json'
import {countdownIn24Hours, getWordByIndex, PLAN} from './utils'

function App() {


  const [selectedPage, setSelectedPage] = useState(0)

  const [name, setName] = useState('')
  const [day, setDay] = useState(1)
  const [dateTime, setDateTime] = useState(null)
  const [history, setHistory] = useState({})
  const [attempts, setAttempts] = useState(0)


  
  const daysWords = PLAN[day].map((idx) => {
    return (
      getWordByIndex(WORDS, idx).word
    )
  })
  

  function handleChangePage(pageIndex){
    setSelectedPage(pageIndex)
  }

  function handleCreateAccount(){
    // guard clause
    if (!name) {return}

    localStorage.setItem('username', name)
    handleChangePage(1)

  }


  function handleCompleteDay(){
    const newDay = day + 1
    const newDatetime = Date.now()
    setDay(newDay)
    setDateTime(newDatetime)
    localStorage.setItem('day', 
      JSON.stringify({day: newDay, dateTime: newDatetime})
    )
    setSelectedPage(1)
  }

  function handleIncrementAttempts(){
    const newRecord = attempts + 1;
    localStorage.setItem('attempts', newRecord)
    setAttempts(newRecord)
  }



  useEffect(() => {
    if (!localStorage) {return}

    if(localStorage.getItem('username')){
      setName(localStorage.getItem('username'))
      setSelectedPage(1)
    }



    if (localStorage.getItem('attempts')){
      setAttempts(parseInt(localStorage.getItem('attempts')))
    }


    if(localStorage.getItem('history')){
      setHistory(JSON.parse(localStorage.getItem('history')))
    }

    if(localStorage.getItem('day')){
     const {day:d, dateTime: dt } = JSON.parse(localStorage.getItem('day'))

     setDateTime(dt)
     setDay(d)

     if (d > 1 && dt){
      const diff = countdownIn24Hours(dt)
      if (diff < 0) {
        let newHistory = {...history}
        const timestamp = new Date(dt)
        const formattedTimeStamp = timestamp.toString().split(' ').slice(1, 4).join(' ')

        newHistory[formattedTimeStamp] = d
        setHistory(newHistory)
        setDay(1)
        setDateTime(null)
        setAttempts(0)

        localStorage.setItem('attempts', 0)
        localStorage.setItem('history', JSON.stringify(newHistory))
        localStorage.setItem('day', JSON.stringify({
          day: 1, dateTime: null
        }))


      }
     }


    }

  }, [])


  const pages = {
    0: <Welcome name={name} setName={setName} handleCreateAccount={handleCreateAccount}/>,
    1: <DashBoard history={history} name={name} attempts={attempts} PLAN={PLAN} day={day} handleChangePage={handleChangePage} daysWords={daysWords} datetime={dateTime}/>,
    2: <Challenge day ={day} daysWords={daysWords} handleChangePage={handleChangePage} handleIncrementAttempts={handleIncrementAttempts} handleCompleteDay={handleCompleteDay} PLAN={PLAN}/>
  }
 
  return (
    <Layout> 
      {pages[selectedPage]}
    </Layout>
  )
}

export default App
