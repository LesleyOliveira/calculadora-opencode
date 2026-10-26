import { useState } from 'react'
import Display from './components/Display.jsx'
import Botao from './components/Botao.jsx'
import { somar, subtrair } from './utils/operacoes.js'

const NUMEROS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']

// TODO: adicionar '*' e '/' quando as operações existirem
const OPERADORES = ['+', '-']

function calcular(a, b, operador) {
  switch (operador) {
    case '+':
      return somar(a, b)
    case '-':
      return subtrair(a, b)
    // TODO: tratar '*' e '/'
    default:
      return b
  }
}

export default function App() {
  const [display, setDisplay] = useState('0')
  const [anterior, setAnterior] = useState(null)
  const [operador, setOperador] = useState(null)
  const [novoNumero, setNovoNumero] = useState(true)

  function digitarNumero(n) {
    if (novoNumero) {
      setDisplay(n)
      setNovoNumero(false)
    } else {
      setDisplay(display === '0' ? n : display + n)
    }
  }

  function escolherOperador(op) {
    const atual = Number(display)
    if (anterior !== null && operador && !novoNumero) {
      const resultado = calcular(anterior, atual, operador)
      setDisplay(String(resultado))
      setAnterior(resultado)
    } else {
      setAnterior(atual)
    }
    setOperador(op)
    setNovoNumero(true)
  }

  function igual() {
    if (anterior === null || !operador) return
    const resultado = calcular(anterior, Number(display), operador)
    setDisplay(String(resultado))
    setAnterior(null)
    setOperador(null)
    setNovoNumero(true)
  }

  function limpar() {
    setDisplay('0')
    setAnterior(null)
    setOperador(null)
    setNovoNumero(true)
  }

  // TODO: botão de ponto decimal ('.')
  // TODO: histórico de operações

  return (
    <div className="calculadora">
      <h1>Calculadora</h1>
      <Display valor={display} />
      <div className="teclado">
        <div className="numeros">
          {NUMEROS.map((n) => (
            <Botao key={n} valor={n} onClick={digitarNumero} />
          ))}
          <Botao valor="C" onClick={limpar} tipo="limpar" />
          <Botao valor="=" onClick={igual} tipo="igual" />
        </div>
        <div className="operadores">
          {OPERADORES.map((op) => (
            <Botao key={op} valor={op} onClick={escolherOperador} tipo="operador" />
          ))}
        </div>
      </div>
    </div>
  )
}
