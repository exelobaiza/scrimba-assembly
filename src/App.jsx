import { languages } from "./languages"
import { useState } from "react"
import { clsx } from "clsx"

/**
 * Goal: Add in the incorrect guesses mechanism to the game
 * 
 * Challenge: When mapping over the languages, determine how
 * many of them have been "lost" and add the "lost" class if
 * so.
 * 
 * Hint: use the wrongGuessCount combined with the index of
 * the item in the array while inside the languages.map code
 */

function App() {
  const [currentWord, setWord] = useState(Array.from("react"))
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessLetter, setGuessLetter] = useState([])
  const words = currentWord.map(word=> <span key={word} className="words">{guessLetter.includes(word) ? word : ""}</span>)

  const wrongGuessCount = guessLetter.filter(letter => !currentWord.includes(letter)).length
  console.log(wrongGuessCount)

const languageElements = languages.map((lang, index) => {
  const isLanguageLost = wrongGuessCount > index
  const style = {
    backgroundColor: lang.backgroundColor,
    color: lang.color
  }
      return(
      <span className={`chip-language ${isLanguageLost ? "lost" : ""}`} style={style} key={lang.name}>{lang.name}</span>)
  })

  const keyboard = alphabet.split("").map(alpha => {
    const isGuessed = guessLetter.includes(alpha)
    const isCorrect = isGuessed && currentWord.includes(alpha)
    const isWrong = isGuessed && !currentWord.includes(alpha)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })
    return(
      <button onClick={() => handleKeyboardClick(alpha)} className={className} key={alpha}>{alpha}</button>
    )
  })

  function handleKeyboardClick(letter) {
    setGuessLetter(prevLetter => prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter])
  }
  return (
    <div>
      <div className="container">
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section>
        <div className="status-container">
          
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
        {keyboard }
      </section>
      <button className="new-game">New Game</button>
      </div>
    </div>

  )
}

export default App
