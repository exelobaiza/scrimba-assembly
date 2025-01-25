import { languages } from "./languages"
import { useState } from "react"
import { clsx } from "clsx"

function App() {
  const [currentWord, setWord] = useState(Array.from("react"))
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessLetter, setGuessLetter] = useState([])
  const words = currentWord.map(word=> <span key={word} className="words">{guessLetter.includes(word) ? word : ""}</span>)

  const wrongGuessCount = guessLetter.filter(letter => !currentWord.includes(letter)).length
  const isGameLost = wrongGuessCount >= languages.length - 1 
  const isGameWon = currentWord.every(letter => guessLetter.includes(letter))
  const isGameOver = isGameLost || isGameWon
  console.log(isGameLost)

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
        <div className={`status-container ${isGameWon ? "win" : "lost"}`}>
          <h2>{ isGameWon && "You win!" || isGameLost && "Game over!" }</h2>
          <p>{ isGameWon && "Well done! 🎉" || isGameLost && "You lose! Better start learning Assembly 😭" }</p>
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
      { isGameOver && <button className="new-game">New Game</button>}
      </div>
    </div>

  )
}

export default App
