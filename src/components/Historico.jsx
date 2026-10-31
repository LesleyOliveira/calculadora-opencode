export default function Historico({ itens }) {
  // O <ul> é sempre renderizado: a altura reservada no CSS evita que o
  // display "pule" quando o primeiro item aparece.
  return (
    <ul className="historico">
      {itens.map((item, indice) => (
        <li key={indice}>{item}</li>
      ))}
    </ul>
  )
}
