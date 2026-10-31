# Calculadora

Calculadora web para as quatro operações básicas, feita com React 18 e Vite 6
em JavaScript puro (sem TypeScript). A interface fica toda em uma única página,
sem backend.

## Funcionalidades

- Adição (`+`), subtração (`-`), multiplicação (`×`) e divisão (`÷`)
- Ponto decimal com validação: apenas um ponto por número
- `C` limpa o cálculo e `=` finaliza a operação pendente
- Divisão por zero mostra `Erro` no display e reinicia a operação
- Resultados limitados a 12 algarismos significativos, evitando ruído de
  ponto flutuante (ex.: `0.1 + 0.2` aparece como `0.3`)

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (já vem com o Node.js)

## Instalação

```bash
git clone https://github.com/LesleyOliveira/calculadora-opencode.git
cd calculadora-opencode
npm install
```

## Como rodar

```bash
npm run dev
```

O Vite sobe o servidor de desenvolvimento com HMR em
`http://localhost:5173` (a porta é indicada no terminal).

### Build de produção

```bash
npm run build    # gera os arquivos em dist/
npm run preview  # serve o build localmente para conferência
```

## Estrutura do projeto

```
src/
├── main.jsx              # ponto de entrada; monta <App /> em #root
├── App.jsx               # estado do cálculo e ligação dos botões
├── components/
│   ├── Display.jsx       # exibe o número/resultado
│   └── Botao.jsx         # botão genérico (chama onClick com o próprio rótulo)
├── utils/
│   └── operacoes.js      # funções puras de aritmética
└── index.css             # estilos globais
```

## Como o cálculo funciona

O estado do cálculo não é uma expressão interpretada: `App.jsx` mantém o
número em edição (`display`), o operando anterior (`anterior`), o operador
pendente (`operador`) e uma flag (`novoNumero`) que decide se o próximo
dígito substitui ou concatena no display. Escolher um operador com uma conta
pendente já resolve a operação parcial; `=` resolve e encerra.

## Observações

- Não há testes automatizados, linter, formatter ou typechecker configurados.
  Não existem os comandos `npm test` nem `npm run lint`.
- Histórico de operações está previsto como TODO em `src/App.jsx`.
