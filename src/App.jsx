import { useState } from 'react'
import Display from './components/Display.jsx'
import Historico from './components/Historico.jsx'
import Botao from './components/Botao.jsx'
import { somar, subtrair, multiplicar, dividir, arredondar } from './utils/operacoes.js'

const NUMEROS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']

const OPERADORES = ['+', '-', '×', '÷']

const ERRO = 'Erro'

/**
 * Executa uma operação entre dois números já convertidos.
 *
 * @param {number} a Operando "anterior", guardado no estado.
 * @param {number} b Operando atual, exibido no display.
 * @param {string} operador Rótulo do botão: '+', '-', '×' ou '÷'.
 * @returns {number|null} Resultado arredondado, ou null em divisão por zero.
 */
function calcular(a, b, operador) {
  // O rótulo do botão é a própria chave do operador (ver OPERADORES).
  switch (operador) {
    case '+':
      return arredondar(somar(a, b))
    case '-':
      return arredondar(subtrair(a, b))
    case '×':
      return arredondar(multiplicar(a, b))
    // dividir() devolve null para divisor zero; arredondar() repassa o null.
    case '÷':
      return arredondar(dividir(a, b))
    default:
      // Fallback defensivo: operador desconhecido mantém o número digitado.
      return b
  }
}

export default function App() {
  const [display, setDisplay] = useState('0')
  const [anterior, setAnterior] = useState(null)
  const [operador, setOperador] = useState(null)
  const [novoNumero, setNovoNumero] = useState(true)
  const [historico, setHistorico] = useState([])

  // Mantém só as 3 últimas operações, descartando a mais antiga.
  function registrar(expressao) {
    setHistorico((anteriores) => [...anteriores, expressao].slice(-3))
  }

  function mostrarErro() {
    setDisplay(ERRO)
    setAnterior(null)
    setOperador(null)
    setNovoNumero(true)
  }

  function digitarNumero(n) {
    if (novoNumero) {
      setDisplay(n)
      setNovoNumero(false)
    } else {
      setDisplay(display === '0' ? n : display + n)
    }
  }

  function digitarPonto() {
    if (novoNumero) {
      setDisplay('0.')
      setNovoNumero(false)
      return
    }
    // Só um ponto por número: display guarda apenas o número em edição.
    if (display.includes('.')) return
    setDisplay(display + '.')
  }

  function escolherOperador(op) {
    if (display === ERRO) return
    const atual = Number(display)
    if (anterior !== null && operador && !novoNumero) {
      const resultado = calcular(anterior, atual, operador)
      if (resultado === null) {
        mostrarErro()
        return
      }
      setDisplay(String(resultado))
      setAnterior(resultado)
      registrar(`${anterior} ${operador} ${atual} = ${resultado}`)
    } else {
      setAnterior(atual)
    }
    setOperador(op)
    setNovoNumero(true)
  }

  function igual() {
    if (anterior === null || !operador) return
    const resultado = calcular(anterior, Number(display), operador)
    if (resultado === null) {
      mostrarErro()
      return
    }
    setDisplay(String(resultado))
    registrar(`${anterior} ${operador} ${Number(display)} = ${resultado}`)
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

  return (
    <div className="calculadora">
      <h1>Calculadora</h1>
      <Historico itens={historico} />
      <Display valor={display} />
      <div className="teclado">
        <div className="numeros">
          {NUMEROS.map((n) => (
            <Botao key={n} valor={n} onClick={digitarNumero} />
          ))}
          <Botao valor="." onClick={digitarPonto} />
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
