import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState('')
  const [subjects, setSubjects] = useState({
    english: true,
    maths: false,
    physics: false,
  });
  const [resume, setResume] = useState('')
  const [url, setUrl] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
     console.log(
      firstName,
      lastName,
      email,
      contact,
      gender,
      selectedOption,
      subjects,
      resume,
      url,
      about
     )
  }

const handleSubjectChange =() => {
  setSubjects((prev) => ({
    ...prev,
    [sub]: !prev[sub],
  }))
}

  return (
    <>
      
    </>
  )
}

export default App
