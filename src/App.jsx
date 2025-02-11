import { languages } from "./languages"
import { useState } from "react"
import { clsx } from "clsx"
import { getFarewellText, getWords } from "./utils"

function App() {
  const [currentWord, setWord] = useState(getWords())
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessLetter, setGuessLetter] = useState([])
  

  const wrongGuessCount = guessLetter.filter(letter => !currentWord.includes(letter)).length
  const isGameLost = wrongGuessCount >= languages.length - 1 
  const isGameWon = currentWord.split('').every(letter => guessLetter.includes(letter))
  const isGameOver = isGameLost || isGameWon
  const lastGuessedLetter = guessLetter[guessLetter.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  const words = currentWord.split('').map(word=> {
        const shouldReveralLetter = isGameLost || guessLetter.includes(word)
        const letterClassName = clsx(
        isGameLost && !guessLetter.includes(word) && "missed-letter"
      )
          return(
          <span key={word} className={letterClassName}>{shouldReveralLetter ? word : "" }</span>
        )
        })

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
      <button onClick={() => handleKeyboardClick(alpha)} 
      className={className} 
      disabled={isGameOver}
      key={alpha}>
        {alpha}
      </button>
    )
  })
  const gameStatusClass = clsx("status-container", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
})
  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
        return (
          <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
          </p>
      )
    }

    if (isGameWon) {
        return (
            <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </>
        )
    } if (isGameLost) {
        return (
            <>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
        )
    }
}

  function handleKeyboardClick(letter) {
    setGuessLetter(prevLetter => prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter])
  }
  function newGame() {
    setWord(getWords())
    setGuessLetter([])
  }
  return (
    <div>
      <div className="container">
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className={gameStatusClass}>
        {renderGameStatus()}
      </section>
      <section className="languages">
        {languageElements}
      </section>
      <section className="words">
        {words}
      </section>
      <section className="keyboard">
        {keyboard }
      </section>
      { isGameOver && <button className="new-game" onClick={newGame}>New Game</button>}
      </div>
    </div>

  )
}

export default App
