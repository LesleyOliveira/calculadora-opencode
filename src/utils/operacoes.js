export function somar(a, b) {
  return a + b
}

export function subtrair(a, b) {
  return a - b
}

export function multiplicar(a, b) {
  return a * b
}

// Retorna null quando o divisor é zero; o App traduz isso para "Erro" no display.
export function dividir(a, b) {
  if (b === 0) return null
  return a / b
}
