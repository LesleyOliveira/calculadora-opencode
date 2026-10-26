export default function Botao({ valor, onClick, tipo = 'numero' }) {
  return (
    <button className={`botao botao-${tipo}`} onClick={() => onClick(valor)}>
      {valor}
    </button>
  )
}
