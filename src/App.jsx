import { languages } from "./languages"
function App() {

const languageElements = languages.map(lang => {
  const style = {
    backgroundColor: lang.backgroundColor,
    color: lang.color
  }
      return(
      <span className="chip-language" style={style} key={lang.name}>{lang.name}</span>)
  })

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
      </div>
    </div>

  )
}

export default App
