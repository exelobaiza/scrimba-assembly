import { languages } from "./Languajes"

export default function Languages(props) {
  return (
    <div>
      {props.languages.map((language) => (
        <div style={{backgroundColor:language.backgroundColor, color:language.color} }  key={language.name}>{language.name}</div>
      ))}
    </div>
  )
}