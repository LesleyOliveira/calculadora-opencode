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

// Corta o "lixo" de ponto flutuante do JavaScript (ex.: 0.1 + 0.2) para no
// máximo 12 algarismos significativos, sem arredondar null nem valores infinitos.
export function arredondar(valor) {
  if (valor === null || !Number.isFinite(valor)) return valor
  return Number(valor.toPrecision(12))
}
