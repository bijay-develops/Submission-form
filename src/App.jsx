import { useState } from 'react'
import './App.css'
import sendEmail from './components/Submit'

function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState('male')
  const [subjects, setSubjects] = useState({
    english: true,
    maths: false,
    physics: false,
  })
  const [resume, setResume] = useState(null)
  const [url, setUrl] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [about, setAbout] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    const formData = {
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
    }

    const result = await sendEmail(formData)
    setSubmitMessage(result.message)
    setIsSubmitting(false)

    if (result.success) {
      handleReset()
    }
  }

  const handleSubjectChange = (sub) => {
    setSubjects((prev) => ({
      ...prev,
      [sub]: !prev[sub],
    }))
  }

  const handleReset = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setContact('')
    setGender('male')
    setSubjects({
      english: true,
      maths: false,
      physics: false,
    })
    setResume(null)
    setUrl('')
    setSelectedOption('')
    setAbout('')
  }

  return (
    <div className="App">
      <h1>Form in React</h1>
      {submitMessage && (
        <div className={`message ${submitMessage.includes('success') ? 'success' : 'error'}`}>
          {submitMessage}
        </div>
      )}
      <fieldset>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name *</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            required
          />

          <label htmlFor="lastname">Last Name *</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            required
          />

          <label htmlFor="email">Enter Email *</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <label htmlFor="contact">Contact *</label>
          <input
            type="tel"
            name="contact"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter Mobile number"
            required
          />

          <label>Gender *</label>
          <div className="radio-group">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </div>

          <label>Subjects</label>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="subjects"
              id="english"
              checked={subjects.english}
              onChange={() => handleSubjectChange('english')}
            />
            English
            <input
              type="checkbox"
              name="subjects"
              id="maths"
              checked={subjects.maths}
              onChange={() => handleSubjectChange('maths')}
            />
            Maths
            <input
              type="checkbox"
              name="subjects"
              id="physics"
              checked={subjects.physics}
              onChange={() => handleSubjectChange('physics')}
            />
            Physics
          </div>

          <label htmlFor="file">Upload Resume *</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />

          <label htmlFor="url">Enter URL *</label>
          <input
            type="url"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter url"
            required
          />

          <label htmlFor="select">Select your choice</label>
          <select
            name="select"
            id="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Select One</option>
            <optgroup label="Frontend">
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
            </optgroup>
            <optgroup label="Backend">
              <option value="node">Node</option>
              <option value="php">PHP</option>
              <option value="python">Python</option>
            </optgroup>
            <optgroup label="Database">
              <option value="mysql">MySQL</option>
              <option value="mongodb">MongoDB</option>
            </optgroup>
          </select>

          <label htmlFor="about">About</label>
          <textarea
            name="about"
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About yourself"
            required
          />

          <div className="buttons">
            <button type="reset" onClick={handleReset} disabled={isSubmitting}>
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

export default App
