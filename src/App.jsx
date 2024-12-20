import { languages } from "./languages"
import { useState } from "react"
function App() {
  const [currentWord, setWord] = useState(Array.from("Refactor"))
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const words = currentWord.map(w=> <span key={w} className="words">{w}</span>)
  const [guessLetter, setGuessLetter] = useState([])

const languageElements = languages.map(lang => {
  const style = {
    backgroundColor: lang.backgroundColor,
    color: lang.color
  }
      return(
      <span className="chip-language" style={style} key={lang.name}>{lang.name}</span>)
  })

  const keyboard = alphabet.split("").map(alpha => {
    const isGuessed = guessLetter.includes(alpha)
    const isCorrect = isGuessed && currentWord.includes(alpha)
    const style = {
      backgroundColor: '#FCBA29' isCorrect ? "green" : "red",
    }
    return(
      <button onClick={() => handleKeyboardClick(alpha)} key={alpha} style={style}>{alpha}</button>
    )
  })

  function handleKeyboardClick(letter) {
    setGuessLetter(prevLetter => prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter])
    console.log(guessLetter)
  }
  console.log(guessLetter)
  return (
    <div>
      <div className="container">
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section>
        <div className="status-container">
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </div>
      </section>
      <section className="languages">
        {languageElements}
      </section>
      <section className="words-container">
        {words}
      </section>
      <section className="keyboard">
        {keyboard}
      </section>
      <button className="new-game">New Game</button>
      </div>
    </div>

  )
}

export default App
