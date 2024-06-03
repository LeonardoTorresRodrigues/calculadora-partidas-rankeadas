const chalk = require('chalk');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log(chalk.blue.bold("Bem-vindo Herói, a Calculadora de Partidas Rankeadas!"));
  
  function obterEntrada(mensagem) {
    return new Promise((resolve) => {
      readline.question(mensagem, (input) => {
        if (input.toLowerCase() === 'sair') {
          console.log(chalk.yellow("Até a próxima!"));
          readline.close();
          process.exit(); // Encerra o programa completamente
        }
        resolve(input);
      });
    });
  }
  
  async function calcularRank() {
    try {
      const wins = await obterEntrada("Quantas vitórias? (ou digite 'sair' para encerrar) ");
      const loses = await obterEntrada("Quantas derrotas? (ou digite 'sair' para encerrar) ");
  
      const winsNum = parseInt(wins, 10);
      const losesNum = parseInt(loses, 10);
  
      if (isNaN(winsNum) || isNaN(losesNum)) {
        console.log(chalk.red("Entrada inválida. Por favor, insira números válidos para vitórias e derrotas."));
        calcularRank();
        return;
      }
  
      let lvl = "Ferro";
      let saldoVitorias = winsNum - losesNum;
  
      if (saldoVitorias < 10) {
        lvl = chalk.gray("Ferro");
      } else if (saldoVitorias <= 20) {
        lvl = chalk.rgb(205, 127, 50)("Bronze");
      } else if (saldoVitorias <= 50) {
        lvl = chalk.gray.bgWhite("Prata");
      } else if (saldoVitorias <= 80) {
        lvl = chalk.yellow("Ouro");
      } else if (saldoVitorias <= 90) {
        lvl = chalk.cyan("Diamante");
      } else if (saldoVitorias <= 100) {
        lvl = chalk.magenta("Lendário");
      } else {
        lvl = chalk.bgRed.white("Imortal");
      }
  
      console.log(`O Herói tem um saldo de ${chalk.green(saldoVitorias)} e está no nível de ${lvl}`);
      calcularRank(); 
    } catch (error) {
      console.error(chalk.red.bold("Ocorreu um erro:", error));
      readline.close();
    }
  }
  
  calcularRank();