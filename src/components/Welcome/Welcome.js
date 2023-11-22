import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Welcome.css'
function Welcome() {
  const navigate = useNavigate();

  function handleLessonsNav(){
    navigate("/lessons")
  }

  function handleMusicToolNav(){
    navigate("/musictool")
  }

  function handleSignupNav () {
    navigate("/signup")
  }

 
    return (
    <div className='button-container'>
        <div className='btn-group'>
        <button  onClick={handleLessonsNav} className='lm-button'>Lesson/Topics</button>
        <p className='lm-button-on-hover'>Lesson and Topics that will introduce you to music production and show you how to use the music tool</p>
        </div>
        <div className='btn-group'>
        <button  onClick={handleMusicToolNav} className='lm-button'>Music Tool</button>
        <p className='lm-button-on-hover'>Already know what you're doing? Head straight to Music Tool</p>
        </div>
        <div className='btn-group'>
        <button  onClick={handleSignupNav} className='lm-button'>Sign up</button>
        <p className='lm-button-on-hover'> Sign up to save music sequences and so much more!! </p>
        </div>
    </div>
  )
}

export default Welcome