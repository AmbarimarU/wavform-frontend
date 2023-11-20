import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Lessons.css'

function Lessons() {
    const navigate = useNavigate();
  
    function handleNotesNav(){
      navigate("/lessons/notes")
    }
  
    function handleRhythmNav(){
      navigate("/lessons/rhythm")
    }
  
   
      return (
      <div className='lessons-button-container'>
          <div className='btn-group'>
          <button  onClick={handleNotesNav} className='lessons-button'>Notes</button>
          <p className='lessons-button-on-hover'> Use the interactive piano to learn about notes</p>
          </div>
          <div className='btn-group'>
          <button  onClick={handleRhythmNav} className='lessons-button'>Rhythm</button>
          <p className='lessons-button-on-hover'>Will something clever to place here </p>
          </div>
      </div>
    )
  }

export default Lessons